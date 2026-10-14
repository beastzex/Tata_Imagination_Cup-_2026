import prophetData from '../../ml/models/prophet_forecast_curve.json';
import xgboostData from '../../ml/models/xgboost_predictions.json';
import rfmData from '../../ml/models/rfm_segments.json';
import evalReport from '../../ml/models/ml_evaluation_report.json';

export interface ProphetPoint {
  timestamp: string;
  hour: string;
  predicted_revenue: number;
  lower_bound: number;
  upper_bound: number;
  trend: number;
  rain_impact: number;
}

export interface StockoutPrediction {
  sku: string;
  sku_name: string;
  category: string;
  unit_price: number;
  current_shelf_stock: number;
  stockout_risk_score: number;
  predicted_stockout_within_24h: boolean;
  lead_time_h: number;
}

export interface RfmCluster {
  cluster_id: number;
  label: string;
  count: number;
  pct_of_customers: number;
  avg_recency_days: number;
  avg_frequency_orders: number;
  avg_monetary_spend: number;
  retention_strategy: string;
  action_urgency: string;
}

export const MLClient = {
  getEvaluationReport() {
    return evalReport;
  },

  getProphetForecast(): { metrics: typeof prophetData.metrics; curve: ProphetPoint[] } {
    return prophetData as any;
  },

  getXGBoostPredictions(): {
    metrics: typeof xgboostData.metrics;
    feature_importances: typeof xgboostData.feature_importances;
    top_stockout_risks: StockoutPrediction[];
    sku_predictions: any[];
  } {
    const rawList = (xgboostData as any).sku_predictions || [];
    const mapped: StockoutPrediction[] = rawList.map((item: any) => ({
      sku: item.sku,
      sku_name: item.name,
      category: item.category,
      unit_price: item.unit_price || 120,
      current_shelf_stock: item.current_stock,
      stockout_risk_score: item.stockout_probability_pct,
      predicted_stockout_within_24h: item.risk_category !== 'HEALTHY',
      lead_time_h: item.supplier_lead_time_h,
    }));
    return {
      metrics: xgboostData.metrics,
      feature_importances: xgboostData.feature_importances,
      top_stockout_risks: mapped,
      sku_predictions: rawList,
    };
  },

  getRfmSegments(): {
    metrics: typeof rfmData.metrics;
    clusters: RfmCluster[];
  } {
    return rfmData as any;
  },

  getDiurnalPeakRush(): { morningRush: string; eveningRush: string; peakHour: string; peakGmv: number } {
    const curve = prophetData.curve;
    const peak = [...curve].sort((a, b) => b.predicted_revenue - a.predicted_revenue)[0];
    return {
      morningRush: '07:30 - 10:30 AM (Morning chai, breakfast poha & staples)',
      eveningRush: '18:00 - 21:00 PM (Evening pantry, spices, snacks & tea)',
      peakHour: peak ? peak.hour : '19:00',
      peakGmv: peak ? peak.predicted_revenue : 2840,
    };
  },

  getFootfallForecast() {
    return {
      morningRush: { timeWindow: '07:30 - 10:30 AM', expectedFootfall: 52, gmvINR: 3850, topItems: 'Tata Tea Premium, Tata Sampann Poha, Tata Salt' },
      afternoonLull: { timeWindow: '12:00 - 16:00 PM', expectedFootfall: 20, gmvINR: 2150, note: 'Low footfall lull — ideal window for Saathi voice reordering & distributor restock delivery' },
      eveningRush: { timeWindow: '18:00 - 20:30 PM', expectedFootfall: 76, gmvINR: 8400, peakHour: '19:00', billPaceSec: 85, note: 'Peak rush! Tata Tea Gold, Ching\'s Hakka Noodles & snacks' },
      nightClosing: { timeWindow: '21:00 - 22:30 PM', expectedFootfall: 22, gmvINR: 2850, note: 'Daily khata balancing, voice cash reconciliations & night briefing' },
      totalDayFootfall: 170,
      totalDayProjectedGmvINR: 19500,
    };
  },

  simulateWhatIfOrder(skuOrName: string, quantity: number) {
    const catalog: Record<string, { name: string; wholesaleCost: number; retailPrice: number; dailyVelocity: number; category: string; maxShelfLifeDays: number }> = {
      salt: { name: 'Tata Salt Vacuum Evaporated 1kg', wholesaleCost: 23.5, retailPrice: 28, dailyVelocity: 22, category: 'Staples', maxShelfLifeDays: 720 },
      tea: { name: 'Tata Tea Premium 500g', wholesaleCost: 232, retailPrice: 270, dailyVelocity: 14, category: 'Beverages', maxShelfLifeDays: 365 },
      gold: { name: 'Tata Tea Gold Royal Blend 500g', wholesaleCost: 295, retailPrice: 340, dailyVelocity: 8, category: 'Beverages', maxShelfLifeDays: 365 },
      tetley: { name: 'Tetley Green Tea Lemon & Honey 25 Bags', wholesaleCost: 154, retailPrice: 185, dailyVelocity: 4, category: 'Beverages', maxShelfLifeDays: 365 },
      dal: { name: 'Tata Sampann Unpolished Toor Dal 1kg', wholesaleCost: 154, retailPrice: 180, dailyVelocity: 10, category: 'Staples', maxShelfLifeDays: 180 },
      poha: { name: 'Tata Sampann Thick Poha 500g', wholesaleCost: 44.5, retailPrice: 55, dailyVelocity: 16, category: 'Staples', maxShelfLifeDays: 180 },
      coffee: { name: 'Tata Coffee Grand Classic 100g', wholesaleCost: 252, retailPrice: 295, dailyVelocity: 3, category: 'Beverages', maxShelfLifeDays: 365 },
      water: { name: 'Himalayan Natural Mineral Water 1L', wholesaleCost: 51, retailPrice: 65, dailyVelocity: 12, category: 'Beverages', maxShelfLifeDays: 365 },
      chings: { name: 'Ching\'s Secret Schezwan Chutney 250g', wholesaleCost: 70, retailPrice: 85, dailyVelocity: 9, category: 'Packaged Goods', maxShelfLifeDays: 365 },
    };

    const key = Object.keys(catalog).find((k) => skuOrName.toLowerCase().includes(k)) || 'salt';
    const item = catalog[key];

    const daysToSellOut = Number((quantity / item.dailyVelocity).toFixed(1));
    const capitalRequired = quantity * item.wholesaleCost;
    const projectedRevenue = quantity * item.retailPrice;
    const grossProfit = projectedRevenue - capitalRequired;
    const marginPercent = Number(((grossProfit / projectedRevenue) * 100).toFixed(1));

    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    let recommendation = '';

    if (daysToSellOut > item.maxShelfLifeDays) {
      riskLevel = 'HIGH';
      recommendation = `High spoilage risk! Shelf life is ${item.maxShelfLifeDays} days, but order will take ${daysToSellOut} days to sell. Reduce order quantity to ${Math.floor(item.dailyVelocity * 15)} units.`;
    } else if (daysToSellOut > 14 && item.category !== 'Staples') {
      riskLevel = 'MEDIUM';
      recommendation = `Capital lockup risk! ₹${capitalRequired.toLocaleString('en-IN')} will be locked for ${daysToSellOut} days. Recommended optimal batch: ${item.dailyVelocity * 7} units (7-day buffer).`;
    } else {
      riskLevel = 'LOW';
      recommendation = `Optimal high-velocity reorder! Stock will sell out in ${daysToSellOut} days with ₹${grossProfit.toLocaleString('en-IN')} projected gross margin (${marginPercent}%). Eligible for Tata Capital 15-day stock credit.`;
    }

    return {
      item: item.name,
      quantity,
      dailyVelocity: item.dailyVelocity,
      daysToSellOut,
      capitalRequired,
      projectedRevenue,
      grossProfit,
      marginPercent,
      riskLevel,
      recommendation,
    };
  },

  getVirtualCaTaxAndWealth() {
    const annualTurnover = 9515538; // ₹95.1L from synthetic dataset
    const digitalTurnoverPct = 78; // 78% via Tata Pay / UPI
    const cashTurnoverPct = 22;

    // Presumptive Tax under Section 44AD: 6% on digital, 8% on cash
    const presumptiveDigitalProfit = (annualTurnover * (digitalTurnoverPct / 100)) * 0.06;
    const presumptiveCashProfit = (annualTurnover * (cashTurnoverPct / 100)) * 0.08;
    const totalPresumptiveProfit = presumptiveDigitalProfit + presumptiveCashProfit;

    // Tax without 44AD digital benefit (flat 8% on all turnover)
    const flatProfit = annualTurnover * 0.08;
    const annualDirectTaxSavedINR = Math.round((flatProfit - totalPresumptiveProfit) * 0.3);

    // GST Threshold & Composition guidance
    const gstExemptionThresholdINR = 4000000; // ₹40 Lakhs for goods
    const regularGstComplianceCostSaved = 36000;

    // Tata Digital Auto-Sweep / Liquid Fund yield (6.8% p.a.)
    const averageIdleDailyBalance = 42000;
    const dailySweepAnnualInterestINR = Math.round(averageIdleDailyBalance * 0.068);

    return {
      annualTurnoverINR: annualTurnover,
      section44ad: {
        digitalUpiRate: '6% (Save 2% vs Cash)',
        cashRate: '8%',
        digitalTurnoverINR: Math.round(annualTurnover * 0.78),
        taxableProfitDeclared: Math.round(totalPresumptiveProfit),
        annualTaxSavedINR: annualDirectTaxSavedINR,
        recommendation: 'Encourage customer payments via Tata Pay / UPI QR to maximize the Section 44AD lower 6% deemed profit benefit.',
      },
      gstComposition: {
        thresholdStatus: annualTurnover > gstExemptionThresholdINR ? 'Registered (> ₹40 Lakhs Threshold)' : 'Exempt',
        taxRate: '1% Composition Scheme (0.5% CGST + 0.5% SGST)',
        caAuditFeeSavedINR: regularGstComplianceCostSaved,
        benefit: 'Quarterly simplified CMP-08 filing. No tedious line-by-line invoice matching required.',
      },
      wealthAdvisory: {
        recommendedTool: 'Tata Digital Merchant Auto-Sweep / Liquid Reserve (6.8% p.a.)',
        idleFloatBalanceINR: averageIdleDailyBalance,
        annualPassiveIncomeINR: dailySweepAnnualInterestINR,
        liquidityWindow: 'T+0 Instant working capital withdrawal for distributor reorders',
      },
      totalAnnualMerchantGainINR: annualDirectTaxSavedINR + regularGstComplianceCostSaved + dailySweepAnnualInterestINR,
    };
  },

  getKiranaBusinessScore() {
    return {
      score: 84,
      maxScore: 100,
      tier: 'Tata Capital Prime Kirana',
      preApprovedLimitINR: 25000,
      activeDrawdownINR: 0,
      availableLimitINR: 25000,
      tenureDays: 15,
      interestFreeGraceDays: 15,
      repaymentMethod: 'Tata Pay UPI Auto-Mandate',
      disbursementChannel: 'Direct settlement to Tata Consumer Distributor',
      factors: [
        { label: 'Weekly Order Regularity (Tata SKUs)', score: 92, weight: 30 },
        { label: 'Cash Flow Visibility (Tata Pay + Voice Khata)', score: 88, weight: 25 },
        { label: 'Zero Default Repayment History', score: 95, weight: 25 },
        { label: 'Stockout Aversion Velocity', score: 80, weight: 20 },
      ],
    };
  },

  getStoreSummary() {
    return {
      storeName: 'Ramesh Kirana & General Store',
      merchantName: 'रमेश गुप्ता (Ramesh Gupta)',
      merchantId: 'TATA_SAATHI_KIRANA_01',
      pincode: '208001',
      city: 'Kanpur, Uttar Pradesh (Pilot Cluster)',
      distributorAssigned: 'Tata Consumer Products Direct Hub - Kanpur Central',
      connectionStatus: 'Voice Call AI & WhatsApp Connected',
      totalTransactions: 55000,
      annualGmvINR: 9515538,
      todayProjectedSalesINR: 19500,
      currentDaySalesSoFarINR: 13420,
      todayTransactionsCount: 124,
      avgBasketSizeINR: 172,
      stockoutsAvertedThisWeekINR: 4200,
      dormantRecoveryThisMonthINR: 6800,
      wholesaleOverchargeRecoveredINR: 1450,
    };
  }
};
