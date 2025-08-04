from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
from pathlib import Path

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://supplyguard-12mp.onrender.com"],  # Your Vite frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data folder
DATA_DIR = Path(__file__).parent / "data"

# ------------------------
# Pydantic Models
# ------------------------

class Supplier(BaseModel):
    id: str
    name: str
    region: str
    location: str
    riskScore: float
    riskLevel: str
    financialScore: Optional[float] = None
    geopoliticalRisk: Optional[float] = None
    esgCompliance: Optional[float] = None
    recentNews: str
    action: Optional[str] = None
    category: str
    lastUpdated: str
    trend: str
    lat: float
    lng: float
    predictedRisk: Optional[float] = None
    llmSummary: Optional[str] = None

class Alert(BaseModel):
    id: int
    supplier: str
    type: str
    severity: str
    message: str
    timestamp: str
    impact: str

class News(BaseModel):
    id: int
    headline: str
    source: str
    timestamp: str
    relevantSuppliers: List[str]
    impact: str
    date: str

# ------------------------
# Endpoints
# ------------------------

@app.get("/api/suppliers", response_model=List[Supplier])
def get_suppliers():
    with open(DATA_DIR / "suppliers.json", encoding="utf-8") as f:
        return json.load(f)

@app.get("/api/alerts", response_model=List[Alert])
def get_alerts():
    with open(DATA_DIR / "alerts.json", encoding="utf-8") as f:
        return json.load(f)

@app.get("/api/news", response_model=List[News])
def get_news():
    with open(DATA_DIR / "news.json", encoding="utf-8") as f:
        return json.load(f)
