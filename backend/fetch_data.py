# fetch_data.py
import requests
import pandas as pd
import os
from dotenv import load_dotenv

# Load API keys
load_dotenv()
GNEWS_API_KEY = os.getenv('GNEWS_API_KEY')
NEWSDATA_API_KEY = os.getenv('NEWSDATA_API_KEY')

# Ensure output directory exists
os.makedirs("data", exist_ok=True)

def fetch_gnews():
    print("🌐 Fetching GNews articles...")
    try:
        response = requests.get(
            'https://gnews.io/api/v4/search',
            params={
                'q': 'supply chain disruption',
                'lang': 'en',
                'max': 50,
                'token': GNEWS_API_KEY
            }
        )
        data = response.json()
        return data.get('articles', [])
    except Exception as e:
        print("❌ GNews error:", e)
        return []

def fetch_newsdata():
    print("🌐 Fetching NewsData.io articles...")
    try:
        response = requests.get(
            'https://newsdata.io/api/1/news',
            params={
                'apikey': NEWSDATA_API_KEY,
                'q': 'supply chain disruption',
                'language': 'en'
            }
        )
        data = response.json()
        return data.get('results', [])
    except Exception as e:
        print("❌ NewsData error:", e)
        return []

def clean_and_save(articles):
    print("🧹 Cleaning and saving articles...")

    rows = []
    for article in articles:
        row = {
            'title': article.get('title'),
            'description': article.get('description') or article.get('content'),
            'content': article.get('content') or article.get('description'),
            'publishedAt': article.get('publishedAt') or article.get('pubDate') or article.get('date'),
            'url': article.get('url'),
            'image': article.get('image_url') or article.get('image'),
            'source_name': (
                article.get('source', {}).get('name') or
                article.get('source_id') or
                article.get('source')
            )
        }
        if row['title'] and row['content']:
            rows.append(row)

    df = pd.DataFrame(rows)
    df.drop_duplicates(subset=['title', 'content'], inplace=True)
    df.to_csv("data/cleaned_news.csv", index=False)
    print(f"✅ Saved {len(df)} unique articles to data/cleaned_news.csv")

def main():
    gnews_articles = fetch_gnews()
    newsdata_articles = fetch_newsdata()

    all_articles = gnews_articles + newsdata_articles
    clean_and_save(all_articles)

if __name__ == "__main__":
    main()
