# llm_processor.py (Hugging Face version)
import os
import json
import requests
from dotenv import load_dotenv
from pathlib import Path
from tqdm import tqdm

# Load environment variables
load_dotenv()
HF_API_KEY = os.getenv("HF_API_KEY")

# Hugging Face Model
MODEL_NAME = "facebook/bart-large-cnn"
HF_URL = f"https://api-inference.huggingface.co/models/{MODEL_NAME}"
HEADERS = {"Authorization": f"Bearer {HF_API_KEY}"}

# Path to data folder
DATA_DIR = Path(__file__).parent / "data"
INPUT_FILE = DATA_DIR / "prepared_suppliers.json"
OUTPUT_SUPPLIERS = DATA_DIR / "suppliers.json"
OUTPUT_ALERTS = DATA_DIR / "alerts.json"
OUTPUT_NEWS = DATA_DIR / "news.json"

def summarize_text(text: str) -> str:
    payload = {
        "inputs": text,
        "options": {"wait_for_model": True}
    }

    try:
        response = requests.post(HF_URL, headers=HEADERS, json=payload)
        response.raise_for_status()
        result = response.json()
        return result[0]["summary_text"]
    except Exception as e:
        print(f"❌ HuggingFace API error: {e}")
        print(f"Raw response: {response.text}")
        return "LLM summarization failed."

def generate_alerts_and_news(suppliers):
    alerts = []
    news_items = []

    for i, sup in enumerate(suppliers):
        alert = {
            "id": i + 1,
            "supplier": sup["name"],
            "type": "Disruption",
            "severity": sup["riskLevel"],
            "message": sup["recentNews"],
            "timestamp": sup["lastUpdated"],
            "impact": "Operational"
        }
        news = {
            "id": i + 1,
            "headline": sup["recentNews"],
            "source": "GNews",
            "timestamp": sup["lastUpdated"],
            "relevantSuppliers": [sup["name"]],
            "impact": "Medium",
            "date": sup["lastUpdated"]
        }
        alerts.append(alert)
        news_items.append(news)

    return alerts, news_items

def main():
    if not INPUT_FILE.exists():
        print("❌ prepared_suppliers.json not found. Run prepare_data.py first.")
        return

    print("🤖 Enriching suppliers using Hugging Face...")

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        suppliers = json.load(f)

    for sup in tqdm(suppliers):
        news_text = sup["recentNews"]
        summary = summarize_text(news_text)
        sup["llmSummary"] = summary

    # Save enriched suppliers
    with open(OUTPUT_SUPPLIERS, "w", encoding="utf-8") as f:
        json.dump(suppliers, f, indent=2, ensure_ascii=False)

    # Generate alerts and news
    alerts, news_items = generate_alerts_and_news(suppliers)

    with open(OUTPUT_ALERTS, "w", encoding="utf-8") as f:
        json.dump(alerts, f, indent=2, ensure_ascii=False)

    with open(OUTPUT_NEWS, "w", encoding="utf-8") as f:
        json.dump(news_items, f, indent=2, ensure_ascii=False)

    print("✅ All files updated: suppliers.json, alerts.json, news.json")

if __name__ == "__main__":
    main()
