# 🛠️ Setup & Evaluation Guide: Tata Dukaan Saathi
### *Tata Imagination Cup 2026 · Functional Prototype & Judge Walkthrough*

---

## ⚡ Quick Start (Under 3 Minutes)

The Tata Dukaan Saathi platform is designed with **zero-dependency fallback modes**, allowing judges and developers to run the complete end-to-end full stack prototype locally without setting up PostgreSQL, Redis, Kafka, or external paid APIs!

### Prerequisites
* **Node.js**: v18.0.0 or higher (v20+ LTS recommended)
* **npm**: v9.0.0 or higher
* **Python**: v3.10 or higher (optional, only needed if re-training ML models)

---

## 1. Frontend Web Application Setup

### Step 1.1: Clone & Navigate
```bash
git clone https://github.com/beastzex/Tata_Imagination_Cup-_2026.git
cd Tata_Imagination_Cup-_2026
```

### Step 1.2: Environment Configuration
Copy the sanitized environment template:
```bash
cp .env.example .env.local
```
*(All API keys in `.env.example` are pre-configured to use deterministic local mock fallbacks. You do not need to provide real Twilio or Groq keys to run the prototype! If you have a free Groq API key, you can optionally paste it into `GROQ_API_KEY` for live LLM responses).*

### Step 1.3: Install Dependencies & Run
```bash
npm install
npm run dev
```

### Step 1.4: Open in Browser
Visit **[http://localhost:3000](http://localhost:3000)**.
* **Landing Page (`/`)**: Executive pitch, interactive story timeline, live Voice Simulator, Tata Group moat bento, and ROI calculator.
* **Merchant Dashboard (`/dashboard`)**: Full enterprise co-pilot portal with real-time telemetry, Prophet demand curves, XGBoost stockout predictions, and Virtual CA.

---

## 2. (Optional) Enterprise Backend Setup

The backend can run in two modes:
1. **Zero-Dependency In-Memory Mode (Default)**: Uses fast in-memory stores and embedded event buses.
2. **Distributed Microservices Mode**: Uses PostgreSQL, Redis BullMQ, and Apache Kafka via Docker.

### Running in In-Memory Mode
```bash
cd backend
npm install
npm run dev
```
The backend server will start on **[http://localhost:4000](http://localhost:4000)**.

### Verifying Backend Health
```bash
curl http://localhost:4000/health
# Response: {"status":"healthy","timestamp":"...","uptime":12.4}
```

---

## 3. (Optional) Machine Learning Pipeline Verification

The serialized ML model artifacts are already included in `ml/models/`. If you wish to re-generate the dataset or retrain the models from scratch:

```bash
# Ensure Python virtual environment is active
pip install numpy pandas scikit-learn prophet xgboost joblib

# 1. Generate 55,000 realistic Kirana transactions
python ml/generate_kirana_dataset.py

# 2. Train Prophet Diurnal Demand Forecaster
python ml/train_prophet.py

# 3. Train XGBoost 24-Hour Stockout Classifier
python ml/train_xgboost.py

# 4. Train RFM Customer Segmentation K-Means Model
python ml/train_rfm.py

# 5. Compile Master Model Evaluation Report
python ml/run_training_pipeline.py
```
Outputs are serialized to:
* `ml/models/prophet_forecast_curve.json`
* `ml/models/xgboost_inventory_model.joblib`
* `ml/models/rfm_segments.json`
* `ml/models/ml_evaluation_report.json`

---

## 🎯 Step-by-Step Judge Evaluation Tour

When evaluating the functional prototype, follow this structured demo flow:

### 1. The Landing Page & Voice Lab (`/`)
1. **Hero Section**: Observe the voice-first value proposition, live telemetry counters, and Tata Consumer portfolio badges.
2. **"A Day with Saathi" Timeline**: Scroll to the merchant story section to see how Ramesh Ji interacts with Saathi across 07:30 AM, 01:30 PM, 03:00 PM, 06:00 PM, and 10:00 PM.
3. **Interactive Voice Simulator Lab**:
   * Click **"Scenario 1: Voice Reorder Readback"**: Observe the natural Hindi voice prompt, speech transcription, audio readback, and the **Confirm-Before-Order guardrail**.
   * Click **"Scenario 2: Distributor Rate Audit"**: See how Saathi detects a ₹140 price discrepancy on a paper bill.
   * Click **"Scenario 3: Tata Capital Sachet Credit"**: View algorithmic credit approval based on the Kirana Business Score.
   * Click **"Scenario 4: Shelf Vision Scan"**: See low-stock detection from a mobile camera photo.
4. **Tata Group Synergy Bento**: Review the 4-quadrant strategic moat (Consumer, Capital, Pay, TCS).
5. **Interactive Unit Economics Calculator**: Adjust the sliders for store count (up to 300,000) and basket size to observe the 2.88x cost-to-serve coverage ratio.

### 2. The Enterprise Merchant Dashboard (`/dashboard`)
Click **"Live Portal"** in the top navigation to enter the merchant operating system:
1. **Overview Tab**: Real-time sales velocity, morning target tracking, diurnal peak indicators, and live Tata Pay UPI streams.
2. **Prophet Demand Forecaster Tab**: Interactive hour-by-hour forecast curve showing the morning breakfast peak (8–10 AM) and evening dinner peak (6–9 PM).
3. **XGBoost Stockout Defense Tab**: View 15 Tata Consumer SKUs ranked by 24-hour stockout risk with distributor lead-time indicators.
4. **What-If Inventory Simulator Tab**: Drag the weather slider to "Heavy Monsoon Rain" or toggle "IPL Evening Match" to see real-time demand surge predictions.
5. **Virtual CA & Wealth Advisor Tab**:
   * Review the Section 44AD presumptive tax savings breakdown (6% digital vs 8% cash).
   * Click quick prompts like *"Section 44AD में Tata Pay QR डिजिटल पेमेंट से मेरा कितना इनकम टैक्स बचेगा?"* to see bilingual Hindi/English advice.
   * Click **"Export CA Audit Report"** to copy the formatted compliance certificate.
6. **Shelf & Invoice Vision Audits Tab**: Inspect sample bill OCR scans and shelf stock audits.
7. **RFM Khata & Churn Ledger Tab**: Explore 1,200 neighborhood customers categorized into Champions, Regular Shoppers, and At-Risk Udhaar accounts with 1-click WhatsApp payment reminders.
8. **WhatsApp AI Teammate Tab**: Test real-time conversational chat, 1-tap distributor order dispatches, and the full-screen Hindi voice calling simulator!

---

## 🔒 Security Best Practices for Evaluators

* `.env.local` is strictly ignored by Git and never committed.
* No actual credentials or banking tokens are required to evaluate the prototype.
* All external network calls automatically degrade to deterministic local mocks when offline.
