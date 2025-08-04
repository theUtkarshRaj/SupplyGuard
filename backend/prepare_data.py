import pandas as pd
import spacy
from geopy.geocoders import Nominatim
from tqdm import tqdm
import json
import os

# Load spaCy model and geocoder
nlp = spacy.load("en_core_web_sm")
geolocator = Nominatim(user_agent="supplyguard")

region_map = {
    "Taiwan": "Asia-Pacific",
    "China": "Asia-Pacific",
    "USA": "North America",
    "India": "Asia-Pacific",
    "Germany": "Europe",
    "UK": "Europe",
    "Australia": "Asia-Pacific"
}

def get_region(location):
    return region_map.get(location, "Global")

def get_lat_lng(place):
    try:
        loc = geolocator.geocode(place, timeout=10)
        if loc:
            return loc.latitude, loc.longitude
    except:
        return None, None
    return None, None

def get_risk_level(score):
    if score >= 0.75:
        return 'High'
    elif score >= 0.4:
        return 'Medium'
    return 'Low'

def enrich_articles(df):
    print("🧠 Enriching articles with NER...")
    enriched = []

    for idx, row in tqdm(df.iterrows(), total=len(df)):
        text = row['content'] if pd.notna(row['content']) else row['title']
        doc = nlp(text)

        org = next((ent.text for ent in doc.ents if ent.label_ == "ORG"), "Unknown Supplier")
        location = next((ent.text for ent in doc.ents if ent.label_ == "GPE"), "Unknown Location")
        lat, lng = get_lat_lng(location)
        region = get_region(location)

        dummy_score = round(0.6 + 0.3 * (idx % 3) / 2, 2)
        risk_level = get_risk_level(dummy_score)

        enriched.append({
            "id": f"S{str(idx+1).zfill(3)}",
            "name": org,
            "region": region,
            "location": location,
            "riskScore": dummy_score,
            "riskLevel": risk_level,
            "financialScore": None,
            "geopoliticalRisk": None,
            "esgCompliance": None,
            "recentNews": row['title'],
            "action": None,
            "category": "Electronics" if "chip" in text.lower() or "semiconductor" in text.lower() else "General",
            "lastUpdated": row['publishedAt'],
            "trend": "increasing",
            "lat": lat,
            "lng": lng,
            "predictedRisk": None,
            "llmSummary": None
        })

    return enriched

def main():
    # Ensure ./data directory exists
    os.makedirs("data", exist_ok=True)

    input_path = os.path.join("data", "cleaned_news.csv")
    output_path = os.path.join("data", "prepared_suppliers.json")

    if not os.path.exists(input_path):
        print("❌ cleaned_news.csv not found in ./data/. Please run main.py first.")
        return

    df = pd.read_csv(input_path)
    enriched = enrich_articles(df)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(enriched, f, indent=2, ensure_ascii=False)

    print(f"✅ Prepared {len(enriched)} suppliers → saved to {output_path}")

if __name__ == "__main__":
    main()
