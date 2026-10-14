"""
Tata Dukaan Saathi — Indian Kirana Synthetic Dataset Generator
Tata Imagination Cup 2026
Generates 55,000+ realistic transaction records for Ramesh Ji's Kirana Store over a 1-year window (Sept 2025 - Sept 2026).
Captures diurnal double-peaks, monsoon rain surges, festive spikes, supplier lead times, and Tata SKU stockouts.
"""

import os
import random
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

def generate_dataset(num_records=55000, output_path="ml/data/kirana_transactions.csv"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    random.seed(42)
    np.random.seed(42)

    print(f"Generating {num_records} realistic Indian Kirana transactions for Tata Dukaan Saathi...")

    # Realistic SKUs across Tata Consumer Products portfolio & grocery essentials
    SKU_CATALOG = [
        {"sku": "TAT-SLT-1KG", "name": "Tata Salt Vacuum Evaporated (1kg)", "cat": "Staples", "price": 28, "cost": 24, "shelf_life": 720, "lead_time_h": 24},
        {"sku": "TAT-TEA-500", "name": "Tata Tea Premium Desh Ki Chai (500g)", "cat": "Beverages", "price": 270, "cost": 235, "shelf_life": 365, "lead_time_h": 24},
        {"sku": "TAT-GLD-500", "name": "Tata Tea Gold Royal Blend (500g)", "cat": "Beverages", "price": 340, "cost": 298, "shelf_life": 365, "lead_time_h": 24},
        {"sku": "TET-GRN-25B", "name": "Tetley Green Tea Lemon & Honey (25 bags)", "cat": "Beverages", "price": 185, "cost": 158, "shelf_life": 365, "lead_time_h": 48},
        {"sku": "TAT-SMP-TUR", "name": "Tata Sampann Unpolished Toor Dal (1kg)", "cat": "Staples", "price": 180, "cost": 156, "shelf_life": 180, "lead_time_h": 24},
        {"sku": "TAT-SMP-CHN", "name": "Tata Sampann High Protein Chana Dal (1kg)", "cat": "Staples", "price": 115, "cost": 98, "shelf_life": 180, "lead_time_h": 24},
        {"sku": "TAT-SMP-POH", "name": "Tata Sampann High Fibre Thick Poha (500g)", "cat": "Staples", "price": 55, "cost": 46, "shelf_life": 180, "lead_time_h": 24},
        {"sku": "TAT-SMP-MOO", "name": "Tata Sampann Unpolished Moong Dal (1kg)", "cat": "Staples", "price": 165, "cost": 142, "shelf_life": 180, "lead_time_h": 24},
        {"sku": "TAT-COF-100", "name": "Tata Coffee Grand Classic (100g jar)", "cat": "Beverages", "price": 295, "cost": 255, "shelf_life": 365, "lead_time_h": 48},
        {"sku": "HIM-WTR-1L",  "name": "Himalayan Natural Mineral Water (1L)", "cat": "Beverages", "price": 65, "cost": 52, "shelf_life": 365, "lead_time_h": 24},
        {"sku": "TAT-GLU-200", "name": "Tata Gluco Plus Orange Splash (200ml)", "cat": "Beverages", "price": 10, "cost": 8, "shelf_life": 180, "lead_time_h": 12},
        {"sku": "SOU-RAG-250", "name": "Tata Soulfull Ragi Bites Choco (250g)", "cat": "Snacks", "price": 110, "cost": 92, "shelf_life": 240, "lead_time_h": 48},
        {"sku": "CHG-SCH-250", "name": "Ching's Secret Schezwan Chutney (250g)", "cat": "Packaged Goods", "price": 85, "cost": 72, "shelf_life": 365, "lead_time_h": 24},
        {"sku": "CHG-HAK-150", "name": "Ching's Secret Just Soak Hakka Noodles (150g)", "cat": "Packaged Goods", "price": 45, "cost": 38, "shelf_life": 365, "lead_time_h": 24},
        {"sku": "TAT-SMP-MAS", "name": "Tata Sampann Punjabi Chhole Masala (100g)", "cat": "Spices", "price": 78, "cost": 65, "shelf_life": 365, "lead_time_h": 48},
    ]

    # Pool of 1,200 distinct local customer handles
    customer_ids = [f"user_{i:04d}@tatapay" for i in range(1, 1201)]
    # 20% of customers are frequent society residents (higher probability of selection)
    loyal_customers = customer_ids[:240]
    regular_customers = customer_ids[240:800]
    occasional_customers = customer_ids[800:]

    start_date = datetime(2025, 9, 18)
    end_date = datetime(2026, 9, 18)
    total_seconds = int((end_date - start_date).total_seconds())

    # Festival dates (Diwali, New Year, Holi, Raksha Bandhan)
    festivals = [
        datetime(2025, 10, 20), # Diwali week
        datetime(2025, 12, 31), # New Year Eve
        datetime(2026, 3, 4),   # Holi week
        datetime(2026, 8, 28),  # Rakhi week
    ]

    records = []
    # Current simulated inventory shelf stocks for tracking depletions
    stock_levels = {s["sku"]: random.randint(15, 60) for s in SKU_CATALOG}
    sku_dict = {s["sku"]: s for s in SKU_CATALOG}

    payment_modes = ["Tata Pay UPI", "Tata Pay QR", "Cash (Voice Khata)", "Tata Capital Stock Credit"]
    payment_weights = [0.55, 0.25, 0.15, 0.05]

    for i in range(num_records):
        sec_offset = random.randint(0, total_seconds)
        dt = start_date + timedelta(seconds=sec_offset)
        
        # Adjust hour to operating hours: peak morning (8-10 AM) and evening rush (6-9 PM)
        rand_hour_draw = random.random()
        if rand_hour_draw < 0.28: # morning rush
            hour = random.choice([7, 8, 9, 10])
        elif rand_hour_draw < 0.70: # evening peak rush
            hour = random.choice([18, 19, 20, 21])
        elif rand_hour_draw < 0.88: # afternoon
            hour = random.choice([11, 12, 13, 16, 17])
        else: # slow midday
            hour = random.choice([14, 15, 22])
            
        dt = dt.replace(hour=hour, minute=random.randint(0, 59), second=random.randint(0, 59))

        # Check seasonality factors
        is_weekend = dt.weekday() >= 5
        is_monsoon = dt.month in [6, 7, 8, 9]
        is_raining = is_monsoon and (random.random() < 0.28)
        
        is_festival = any(abs((dt - f).days) <= 3 for f in festivals)
        is_ipl_match = dt.month in [4, 5] and hour in [19, 20, 21] and (random.random() < 0.6)

        # Select Customer based on weighted probability
        c_draw = random.random()
        if c_draw < 0.55:
            cust = random.choice(loyal_customers)
        elif c_draw < 0.85:
            cust = random.choice(regular_customers)
        else:
            cust = random.choice(occasional_customers)

        # Select SKU based on weather and hour
        if is_raining and random.random() < 0.65:
            sku_code = random.choice(["TAT-TEA-500", "TAT-GLD-500", "CHG-HAK-150", "TET-GRN-25B"])
            sku_info = sku_dict.get(sku_code, random.choice(SKU_CATALOG))
        elif hour in [7, 8, 9] and random.random() < 0.60:
            sku_code = random.choice(["TAT-SMP-POH", "TAT-TEA-500", "SOU-RAG-250"])
            sku_info = sku_dict.get(sku_code, random.choice(SKU_CATALOG))
        elif is_ipl_match and random.random() < 0.70:
            sku_code = random.choice(["CHG-SCH-250", "CHG-HAK-150", "HIM-WTR-1L", "TAT-GLU-200"])
            sku_info = sku_dict.get(sku_code, random.choice(SKU_CATALOG))
        else:
            sku_info = random.choice(SKU_CATALOG)

        # Quantity purchased
        qty = 1 if sku_info["price"] > 100 else random.choices([1, 2, 3, 4], weights=[0.60, 0.25, 0.10, 0.05])[0]
        if is_festival:
            qty = max(qty, random.choice([2, 3, 4]))

        total_amount = round(qty * sku_info["price"], 2)
        gross_margin = round(qty * (sku_info["price"] - sku_info["cost"]), 2)

        # Track stock depletion
        sku_key = sku_info["sku"]
        current_stock = stock_levels[sku_key]
        stock_levels[sku_key] = max(0, current_stock - qty)

        # Periodic Tata distributor replenishment
        if stock_levels[sku_key] <= 5:
            stock_levels[sku_key] += random.choice([24, 48, 72])

        # Stockout risk indicator
        stockout_imminent = 1 if (stock_levels[sku_key] < 8 and (hour in [10, 11, 16, 17])) else 0
        payment_choice = random.choices(payment_modes, weights=payment_weights)[0]

        records.append({
            "transaction_id": f"TX_{dt.strftime('%Y%m%d%H%M')}_{i:05d}",
            "timestamp": dt.isoformat(),
            "date": dt.strftime("%Y-%m-%d"),
            "hour": hour,
            "day_of_week": dt.weekday(),
            "is_weekend": int(is_weekend),
            "customer_id": cust,
            "sku": sku_info["sku"],
            "sku_name": sku_info["name"],
            "category": sku_info["cat"],
            "quantity": qty,
            "unit_price": sku_info["price"],
            "unit_cost": sku_info["cost"],
            "total_amount": total_amount,
            "gross_margin": gross_margin,
            "payment_channel": payment_choice,
            "is_raining": int(is_raining),
            "is_festival": int(is_festival),
            "is_ipl_match": int(is_ipl_match),
            "current_shelf_stock": current_stock,
            "supplier_lead_time_h": sku_info["lead_time_h"],
            "stockout_within_24h": stockout_imminent,
        })

    df = pd.DataFrame(records)
    df = df.sort_values(by="timestamp").reset_index(drop=True)
    df.to_csv(output_path, index=False)
    print(f"[SUCCESS] Generated {len(df)} records saved to {output_path}")
    print(f"Total GMV: Rs. {df['total_amount'].sum():,.2f}")
    print(f"Distinct Customers: {df['customer_id'].nunique()}")
    print(f"Stockout labels tagged: {df['stockout_within_24h'].sum()} occurrences")
    return df

if __name__ == "__main__":
    generate_dataset()
