// ====================================================================
// Tata Dukaan Saathi — Enterprise Type Definitions
// Tata Imagination Cup 2026
// ====================================================================

export type AgentId = 
  | 'reorder' 
  | 'demand' 
  | 'inventory' 
  | 'vision' 
  | 'advisor' 
  | 'credit' 
  | 'distributor' 
  | 'execution';

export interface AgentInfo {
  id: AgentId;
  name: string;
  role: string;
  avatar: string;
  model: 'Groq GPT-OSS 120B' | 'Qwen Fast Multilingual' | 'Prophet ML' | 'XGBoost / LightGBM' | 'Vision AI (YOLO/Florence-2)' | 'Tata Capital Scoring Policy';
  specialty: string;
  status: 'active' | 'analyzing' | 'idle' | 'executing';
  confidence: number;
  lastAction: string;
}

export interface MerchantHealthMetric {
  title: string;
  score: number; // 0-100
  trend: 'up' | 'down' | 'neutral';
  change: string;
  description: string;
  rating: 'Exceptional' | 'Healthy' | 'Moderate' | 'Critical';
}

export interface KiranaBusinessScoreData {
  overallScore: number; // e.g. 84/100
  tier: 'Tata Capital Prime Kirana' | 'Growth Verified' | 'Emerging Merchant' | 'Probationary';
  creditEligibility: 'Pre-Approved ₹25,000 (15-Day Stock Credit)' | 'Pre-Approved ₹10,000' | 'Eligible after 4 weeks';
  summary: string;
  metrics: {
    cashFlowDiscipline: MerchantHealthMetric;
    tataOrderVelocity: MerchantHealthMetric;
    stockoutResistance: MerchantHealthMetric;
    repaymentHistory: MerchantHealthMetric;
    digitalSalesRatio: MerchantHealthMetric;
    forecastAccuracy: MerchantHealthMetric;
  };
}

export type MerchantHealthScoreData = KiranaBusinessScoreData;

export interface LostRevenueFactor {
  cause: string;
  lostAmount: number;
  impactPercent: number;
  explanation: string;
  remedyAction: string;
  agentResponsible: AgentId;
}

export interface LostRevenueData {
  expectedRevenue: number;
  actualRevenue: number;
  potentialLost: number;
  detectionPeriod: string;
  confidenceScore: number;
  factors: LostRevenueFactor[];
  recoveryStatus: 'Recoverable with 1-click voice reorder' | 'Partial Recovery' | 'Historical Insight';
}

export interface ExplainableFactor {
  title: string;
  value: string;
  weight: number; // percentage
  source: 'Tata Pay UPI Stream' | 'Weather API' | 'Festival Calendar' | 'Tata Consumer Network' | 'Shelf Vision';
}

export interface Recommendation {
  id: string;
  agentId: AgentId;
  agentName: string;
  title: string;
  actionText: string;
  impactBadge: string;
  urgency: 'Immediate' | 'Today' | 'This Week';
  reason: string;
  confidenceScore: number; // 0-100
  supportingFactors: ExplainableFactor[];
  executed: boolean;
  actionPayload: {
    channel: 'WhatsApp' | 'Phone Call' | 'Distributor Adapter' | 'Tata Pay UPI';
    preview: string;
    recipient?: string;
    amount?: number;
  };
}

export interface InvoiceLineItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unit: string;
  purchaseCost: number;
  agreedRateCardPrice: number;
  overchargeFlag?: boolean;
  mrp: number;
  marginPercent: number;
  confidence: number;
  bbox?: [number, number, number, number];
}

export interface SupplierInvoice {
  id: string;
  distributorName: string;
  distributorPhone: string;
  invoiceNumber: string;
  date: string;
  totalAmount: number;
  gstin: string;
  paymentTerms: string;
  items: InvoiceLineItem[];
  imageUrl?: string;
  parsedAt: string;
  rateDiscrepancyAmount?: number;
  status: 'Audited & Verified' | 'Overcharge Detected' | 'Pending Verification';
}

export interface ShelfVisionDetection {
  id: string;
  productName: string;
  category: string;
  detectedCount: number;
  capacity: number;
  stockLevel: 'Adequate (>70%)' | 'Low (<30%)' | 'Empty (0%)';
  urgency: 'normal' | 'warning' | 'critical';
  bbox: [number, number, number, number];
  reorderSuggestion?: number;
}

export interface ShelfAngleScan {
  angleId: 'top_rack' | 'eye_level' | 'bottom_rack';
  title: string;
  subtitle: string;
  timestamp: string;
  utilizationRate: number;
  emptySlotsCount: number;
  detections: ShelfVisionDetection[];
}

export interface DailyTimelineStep {
  time: string;
  label: string;
  phase: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  icon: string;
  headline: string;
  voiceHindi: string;
  voiceEnglish: string;
  soundboxVoiceHindi?: string;
  soundboxVoiceEnglish?: string;
  whatsappMessage: string;
  agentInteraction: string;
  actionsDone: string[];
  metrics: {
    revenue: string;
    projected: string;
    footfall: string;
  };
}

export interface ExecutedActionLog {
  id: string;
  timestamp: string;
  agentId: AgentId;
  agentName: string;
  actionTitle: string;
  channel: 'WhatsApp' | 'Phone Call' | 'Tata Pay UPI' | 'Tata Distributor PO' | 'Distributor Adapter' | 'Supplier PO' | 'Soundbox' | 'Voice Box';
  status: 'Completed' | 'In Flight' | 'Awaiting Confirmation';
  outcome: string;
}

export interface RoiSimulationParams {
  businessType: 'kirana' | 'fmcg_retail' | 'general_store';
  monthlyRevenue: number;
  avgBasketSize: number;
  supplierCount: number;
  repeatCustomerRate: number;
}

export interface RoiSimulationResults {
  extraMonthlyProfit: number;
  annualProfitIncrease: number;
  stockoutReductionRate: number;
  unlockedWorkingCapital: number;
  retentionLiftPercent: number;
  hoursSavedWeekly: number;
  paybackDays: number;
}

// === TATA SPECIFIC TYPES ===
export interface TataSku {
  sku: string;
  name: string;
  brand: 'Tata Salt' | 'Tata Tea' | 'Tetley' | 'Tata Sampann' | 'Tata Coffee' | 'Himalayan' | 'Ching\'s Secret' | 'Soulfull' | 'Tata Gluco+';
  category: 'Staples' | 'Beverages' | 'Packaged Goods' | 'Snacks' | 'Spices';
  packSize: string;
  mrp: number;
  distributorRate: number;
  unit: string;
  fastMover: boolean;
  leadTimeHours: number;
}

export interface TataDistributorOrder {
  orderId: string;
  merchantId: string;
  merchantName: string;
  storeName: string;
  distributorName: string;
  items: Array<{
    sku: string;
    name: string;
    quantity: number;
    unit: string;
    rate: number;
    total: number;
  }>;
  totalAmount: number;
  deliverySlot: string;
  status: 'draft' | 'pending_confirmation' | 'confirmed' | 'routed_to_distributor' | 'dispatched' | 'delivered';
  paymentMode: 'Tata Pay UPI' | 'Tata Capital 15-Day Stock Credit' | 'Cash on Delivery';
  confirmedVia: 'Voice Call (Confirmed)' | 'WhatsApp Voice Note (Confirmed)' | 'Dashboard';
  createdAt: string;
}

export interface TataCapitalCreditOffer {
  offerId: string;
  merchantId: string;
  preApprovedLimitINR: number;
  offeredAmountINR: number;
  tenureDays: number;
  interestRateAnnual: number;
  feeAmountINR: number;
  purpose: 'Restock Tata Consumer SKUs for Festival Peak';
  repaymentDueDate: string;
  repaymentChannel: 'Tata Pay UPI Auto-Mandate';
  disbursementMode: 'Direct settlement to Tata Consumer Distributor';
  status: 'Available' | 'Accepted' | 'Disbursed' | 'Repaid';
}

export interface VirtualCaReport {
  merchantName: string;
  period: string;
  totalTurnoverINR: number;
  digitalTurnoverINR: number; // Tata Pay & UPI
  cashTurnoverINR: number;
  digitalPercentage: number;
  presumptiveTaxSection: 'Section 44AD (Presumptive Taxation Scheme)';
  deemedProfitDigitalRate: '6%';
  deemedProfitCashRate: '8%';
  calculatedTaxableProfitINR: number;
  estimatedTaxSavedINR: number;
  gstStatus: 'Exempt (< ₹40 Lakhs Annual Goods Threshold)' | 'Applicable';
  complianceChecklist: string[];
  disclaimer: 'Guidance only. Based on dated rules table. Must be reviewed with a certified Chartered Accountant.';
}
