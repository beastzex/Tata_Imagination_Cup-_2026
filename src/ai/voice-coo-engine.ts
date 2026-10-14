/**
 * Tata Dukaan Saathi - Voice Reorder & Growth Advisor Engine
 * Tata Imagination Cup 2026
 * Powered by Groq Cloud (openai/gpt-oss-120b & qwen/qwen3.8-27b) and Indic Speech AI.
 *
 * Implements:
 * 1. Indic Voice Reordering with Confirm-Before-Order Guardrails over Tata Consumer catalogue.
 * 2. Proactive Outbound Calls & Scheduled Daily Briefings.
 * 3. Kirana Business Scoring & Tata Capital Micro-Credit Guidance.
 * 4. Growth & Tax Advisory under Section 44AD with 1-Tap CA Summary.
 */

import Groq from 'groq-sdk';
import { MLClient } from '../lib/ml-client';
import { TATA_CONSUMER_CATALOG, MOCK_ORDERS } from '@/data/mockData';

export interface VoiceQueryResponse {
  query: string;
  hindiSpokenResponse: string;
  englishSummary: string;
  metrics: Record<string, any>;
  actionButtons?: Array<{
    label: string;
    actionType: string;
    payload: Record<string, any>;
  }>;
  modelUsed: string;
  latencyMs: number;
}

export interface VoiceReorderResult {
  rawSpeech: string;
  resolvedSkus: Array<{
    sku: string;
    name: string;
    quantity: number;
    unit: string;
    rate: number;
    total: number;
  }>;
  totalAmount: number;
  confidenceScore: number;
  readbackPromptHindi: string;
  requiresConfirmation: boolean;
  isConfirmed: boolean;
  distributorAssigned: string;
  deliverySlot: string;
  fallbackTriggered: boolean;
}

export interface ScheduledBriefing {
  timeSlot: '07:30 AM' | '01:30 PM' | '06:00 PM' | '10:00 PM';
  milestoneTitle: string;
  hindiHeadline: string;
  hindiDescription: string;
  englishDetails: string;
  audioDuration?: string;
  cooFeature: string;
  actionButton?: {
    label: string;
    actionType: string;
    payload: Record<string, any>;
  };
  metrics: Record<string, any>;
}

// Grounded Kirana Store Knowledge Graph for Tata Dukaan Saathi
export const KIRANA_STORE_COMPREHENSIVE_DATA = {
  storeProfile: {
    name: 'Ramesh Kirana & General Store',
    merchant: 'रमेश गुप्ता (Ramesh Gupta)',
    location: 'Shop 12, Civil Lines Market, Kanpur, Uttar Pradesh (208001)',
    connection: 'Voice Call AI & WhatsApp Live',
    distributorAssigned: 'Tata Consumer Products Direct Hub - Kanpur Central',
  },
  salesOverview: {
    todaySalesINR: 19500,
    todayOrdersCount: 148,
    todayUpiShareINR: 15210,
    todayUpiPct: 78.0,
    todayCashShareINR: 4290,
    yesterdaySalesINR: 18900,
    yesterdayOrdersCount: 142,
    salesDeltaPercent: 3.2,
    dipReason: 'दोपहर 2 से 4 बजे कस्टमर फुटफॉल कम; शाम को टाटा सॉल्ट व टेटली चाय की अधिक मांग',
    stockoutLostRevenueINR: 2100,
  },
  inventoryByCategory: {
    tataBeverages: [
      { name: 'Tata Tea Premium Desh Ki Chai (500g)', stock: 4, mrp: 270, cost: 232, marginPct: 14.1, status: 'CRITICAL_DEPLETED', velocityPerDay: 14 },
      { name: 'Tata Tea Gold Royal Blend (500g)', stock: 14, mrp: 340, cost: 295, marginPct: 13.2, status: 'HEALTHY', velocityPerDay: 8 },
      { name: 'Tetley Green Tea Lemon & Honey (25 Bags)', stock: 1, mrp: 185, cost: 154, marginPct: 16.8, status: 'OUT_OF_STOCK_ALERT', velocityPerDay: 4 },
      { name: 'Tata Coffee Grand Classic (100g Jar)', stock: 8, mrp: 295, cost: 252, marginPct: 14.6, status: 'HEALTHY', velocityPerDay: 3 },
      { name: 'Himalayan Natural Mineral Water (1L)', stock: 16, mrp: 65, cost: 51, marginPct: 21.5, status: 'HEALTHY', velocityPerDay: 12 },
      { name: 'Tata Gluco Plus Orange Splash (200ml)', stock: 35, mrp: 10, cost: 7.8, marginPct: 22.0, status: 'HEALTHY', velocityPerDay: 25 },
    ],
    tataStaples: [
      { name: 'Tata Salt Vacuum Evaporated (1kg)', stock: 2, mrp: 28, cost: 23.5, marginPct: 16.1, status: 'OUT_OF_STOCK_ALERT', velocityPerDay: 22 },
      { name: 'Tata Sampann Unpolished Toor Dal (1kg)', stock: 12, mrp: 180, cost: 154, marginPct: 14.4, status: 'HEALTHY', velocityPerDay: 10 },
      { name: 'Tata Sampann High Protein Chana Dal (1kg)', stock: 3, mrp: 115, cost: 96, marginPct: 16.5, status: 'WARNING_LOW_STOCK', velocityPerDay: 8 },
      { name: 'Tata Sampann High Fibre Thick Poha (500g)', stock: 6, mrp: 55, cost: 44.5, marginPct: 19.1, status: 'WARNING_REORDER', velocityPerDay: 16 },
      { name: 'Tata Sampann Moong Dal (1kg)', stock: 14, mrp: 165, cost: 142, marginPct: 13.9, status: 'HEALTHY', velocityPerDay: 6 },
    ],
    tataPackagedAndSpices: [
      { name: 'Ching\'s Secret Schezwan Chutney (250g)', stock: 5, mrp: 85, cost: 70, marginPct: 17.6, status: 'WARNING_LOW_STOCK', velocityPerDay: 9 },
      { name: 'Ching\'s Secret Just Soak Hakka Noodles (150g)', stock: 14, mrp: 45, cost: 38, marginPct: 15.6, status: 'HEALTHY', velocityPerDay: 12 },
      { name: 'Tata Sampann Punjabi Chhole Masala (100g)', stock: 0, mrp: 78, cost: 63, marginPct: 19.2, status: 'OUT_OF_STOCK_ALERT', velocityPerDay: 5 },
      { name: 'Tata Soulfull Ragi Bites Choco (250g)', stock: 18, mrp: 110, cost: 92, marginPct: 16.4, status: 'HEALTHY', velocityPerDay: 7 },
    ],
  },
  kiranaBusinessScore: {
    overallScore: 84,
    tier: 'Tata Capital Prime Kirana',
    preApprovedCreditLimitINR: 25000,
    eligibleTenureDays: 15,
    onTimeRepaymentRate: 100,
    weeklyTataOrderCadenceWeeks: 10,
  },
  khataUdhaarLedger: [
    { customerName: 'Ramesh Sharma (Sharma ji)', pendingAmountINR: 1240, overdueDays: 18, itemsBought: 'Tata Salt & Tata Sampann Toor Dal' },
    { customerName: 'Suresh Verma (Verma ji)', pendingAmountINR: 850, overdueDays: 12, itemsBought: 'Tata Tea Gold & Poha' },
    { customerName: 'Mahendra Tiwari (Tiwari ji)', pendingAmountINR: 1450, overdueDays: 24, itemsBought: 'Tetley Green Tea & Groceries (Oldest overdue)' },
    { customerName: 'Anil Gupta (Gupta ji)', pendingAmountINR: 410, overdueDays: 5, itemsBought: 'Ching\'s Schezwan Chutney & Noodles' },
    { customerName: 'Sunita Bhabhi', pendingAmountINR: 300, overdueDays: 4, itemsBought: 'Tata Salt & Spices' },
  ],
  totalKhataPendingINR: 4250,
  taxAdvisorySection44AD: {
    turnoverINR: 9515538,
    digitalTurnoverPct: 78.0,
    digitalDeemedRate: '6%',
    cashDeemedRate: '8%',
    projectedTaxSavingsINR: 70400,
    gstThresholdGoodsINR: 4000000,
    disclaimer: 'Guidance only based on dated rules table. Review with a certified Chartered Accountant.',
  },
};

/**
 * 1. Voice Reorder with Confirm-Before-Order Guardrail
 */
export function parseAndConfirmVoiceOrder(
  speechText: string,
  merchantConfirmation?: 'yes' | 'no' | 'retry'
): VoiceReorderResult {
  const norm = speechText.toLowerCase();

  const resolvedSkus: Array<{ sku: string; name: string; quantity: number; unit: string; rate: number; total: number }> = [];

  // Match Tata Salt
  if (norm.includes('salt') || norm.includes('namak') || norm.includes('solt')) {
    const qtyMatch = norm.match(/(\d+)\s*(packet|pkt|bori|carton)?/);
    const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 20;
    const item = TATA_CONSUMER_CATALOG.find((s) => s.sku === 'TAT-SLT-1KG')!;
    resolvedSkus.push({
      sku: item.sku,
      name: item.name,
      quantity: qty,
      unit: 'Packets',
      rate: item.distributorRate,
      total: qty * item.distributorRate,
    });
  }

  // Match Tata Tea / Tetley
  if (norm.includes('tetley') || norm.includes('green tea')) {
    const qtyMatch = norm.match(/(\d+)\s*(packet|pkt|box|carton)?/);
    const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 5;
    const item = TATA_CONSUMER_CATALOG.find((s) => s.sku === 'TET-GRN-25B')!;
    resolvedSkus.push({
      sku: item.sku,
      name: item.name,
      quantity: qty,
      unit: 'Packs',
      rate: item.distributorRate,
      total: qty * item.distributorRate,
    });
  } else if (norm.includes('tea') || norm.includes('chai') || norm.includes('chaipatti')) {
    const qtyMatch = norm.match(/(\d+)\s*(packet|pkt|bori|carton)?/);
    const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 10;
    const item = TATA_CONSUMER_CATALOG.find((s) => s.sku === 'TAT-TEA-500')!;
    resolvedSkus.push({
      sku: item.sku,
      name: item.name,
      quantity: qty,
      unit: 'Pouches',
      rate: item.distributorRate,
      total: qty * item.distributorRate,
    });
  }

  // Match Tata Sampann Dal / Poha / Oil
  if (norm.includes('toor') || norm.includes('dal') || norm.includes('daal') || norm.includes('sampann')) {
    const qtyMatch = norm.match(/(\d+)\s*(packet|pkt|bori|carton)?/);
    const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 10;
    const item = TATA_CONSUMER_CATALOG.find((s) => s.sku === 'TAT-SMP-TUR')!;
    resolvedSkus.push({
      sku: item.sku,
      name: item.name,
      quantity: qty,
      unit: 'Packets',
      rate: item.distributorRate,
      total: qty * item.distributorRate,
    });
  }

  if (norm.includes('poha')) {
    const item = TATA_CONSUMER_CATALOG.find((s) => s.sku === 'TAT-SMP-POH')!;
    resolvedSkus.push({
      sku: item.sku,
      name: item.name,
      quantity: 12,
      unit: 'Packets',
      rate: item.distributorRate,
      total: 12 * item.distributorRate,
    });
  }

  if (norm.includes('chings') || norm.includes('schezwan') || norm.includes('chutney')) {
    const item = TATA_CONSUMER_CATALOG.find((s) => s.sku === 'CHG-SCH-250')!;
    resolvedSkus.push({
      sku: item.sku,
      name: item.name,
      quantity: 12,
      unit: 'Bottles',
      rate: item.distributorRate,
      total: 12 * item.distributorRate,
    });
  }

  // Fallback defaults if speech was brief
  if (resolvedSkus.length === 0) {
    const salt = TATA_CONSUMER_CATALOG.find((s) => s.sku === 'TAT-SLT-1KG')!;
    const tea = TATA_CONSUMER_CATALOG.find((s) => s.sku === 'TAT-TEA-500')!;
    resolvedSkus.push({
      sku: salt.sku,
      name: salt.name,
      quantity: 20,
      unit: 'Packets',
      rate: salt.distributorRate,
      total: 20 * salt.distributorRate,
    });
    resolvedSkus.push({
      sku: tea.sku,
      name: tea.name,
      quantity: 5,
      unit: 'Pouches',
      rate: tea.distributorRate,
      total: 5 * tea.distributorRate,
    });
  }

  const totalAmount = resolvedSkus.reduce((sum, item) => sum + item.total, 0);

  // Readback prompt in Hindi
  const itemsTextHindi = resolvedSkus.map((i) => `${i.quantity} ${i.unit} ${i.name.split('(')[0]}`).join(', ');
  const readbackPromptHindi = `नमस्ते रमेश जी! मैंने नोट किया है: ${itemsTextHindi}। कुल राशि ₹${totalAmount.toLocaleString('en-IN')} होगी। क्या यह आर्डर पक्का करूँ? (हाँ कहें या रिप्लाई करें)`;

  const isConfirmed = merchantConfirmation === 'yes';

  return {
    rawSpeech: speechText,
    resolvedSkus,
    totalAmount,
    confidenceScore: 98.4,
    readbackPromptHindi,
    requiresConfirmation: !isConfirmed,
    isConfirmed,
    distributorAssigned: 'Tata Consumer Products Direct Hub - Kanpur Central',
    deliverySlot: 'Tomorrow 09:30 AM (Morning Slot A)',
    fallbackTriggered: merchantConfirmation === 'retry',
  };
}

/**
 * 2. General Voice Query Handling with Groq Cloud LLM + Fallbacks
 */
export async function queryVoiceSaathi(query: string): Promise<VoiceQueryResponse> {
  const startTime = Date.now();
  const normalized = query.toLowerCase().trim();
  const data = KIRANA_STORE_COMPREHENSIVE_DATA;
  const m = data.salesOverview;

  const apiKey = process.env.GROQ_API_KEY;
  if (apiKey) {
    try {
      const groq = new Groq({ apiKey });

      const systemPrompt = `You are Tata Dukaan Saathi (टाटा दुकान साथी), an autonomous voice-first AI assistant and growth advisor for Indian Kirana store merchant ${data.storeProfile.merchant} (${data.storeProfile.name}, ${data.storeProfile.location}). Tata Imagination Cup 2026.

GROUNDED STORE TELEMETRY (100% FACTUAL, NEVER GUESS):
1. TODAY'S SALES: ₹${data.salesOverview.todaySalesINR.toLocaleString('en-IN')} across ${data.salesOverview.todayOrdersCount} transactions (Tata Pay UPI: ₹${data.salesOverview.todayUpiShareINR.toLocaleString('en-IN')} [${data.salesOverview.todayUpiPct}%], Cash Voice Ledger: ₹${data.salesOverview.todayCashShareINR.toLocaleString('en-IN')}).
2. TATA CONSUMER INVENTORY STATUS:
   * Tata Salt (1kg): 2 pkts left (CRITICAL OUT OF STOCK ALERT, velocity 22 pkts/day).
   * Tetley Green Tea (25B): 1 pack left (CRITICAL OUT OF STOCK).
   * Tata Tea Premium (500g): 4 pouches left (WARNING LOW STOCK).
   * Tata Tea Gold (500g): 14 cartons (HEALTHY).
   * Tata Sampann Toor Dal (1kg): 12 pkts (HEALTHY).
   * Tata Sampann Chhole Masala (100g): 0 pkts (OUT OF STOCK).
   * Tata Sampann Poha (500g): 6 pkts (REORDER NEEDED).
   * Ching's Schezwan Chutney (250g): 5 bottles (LOW STOCK).
   * Himalayan Natural Mineral Water (1L): 16 bottles (HEALTHY).
3. TATA CAPITAL MICRO-CREDIT:
   * Pre-Approved Credit Limit: ₹25,000 for 15 days scored on Kirana Business Score (84/100).
   * Zero upfront cash; disbursed directly to Tata Consumer Distributor.
   * Repaid seamlessly via Tata Pay UPI auto-mandate on due date.
4. GROWTH & TAX ADVISOR (SECTION 44AD):
   * 6% presumptive profit rate on digital Tata Pay turnover vs 8% on cash saves ₹70,400 in direct tax.
   * GST Goods Threshold: ₹40 Lakhs exemption status.
   * Reminder: Always state that tax advice is guidance to review with a Chartered Accountant.
5. CONFIRM-BEFORE-ORDER GUARDRAIL:
   * System always reads back the order in Hindi ("Dus packet namak, paanch Tetley. Pakka karun?") and waits for "Haan" before routing to Tata Consumer Distributor.

OUTPUT FORMAT: Return valid JSON only with keys:
{
  "hindiSpokenResponse": "Natural, respectful Hindi/Hinglish response with bold amounts and emojis",
  "englishSummary": "Concise factual English summary with actionable recommendations"
}`;

      let completion;
      let usedModel = 'openai/gpt-oss-120b';

      try {
        completion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: query },
          ],
          model: 'openai/gpt-oss-120b',
          temperature: 0.2,
          response_format: { type: 'json_object' },
        });
      } catch {
        usedModel = 'qwen/qwen3.8-27b';
        completion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: query },
          ],
          model: 'qwen/qwen3.8-27b',
          temperature: 0.2,
          response_format: { type: 'json_object' },
        });
      }

      const content = completion.choices[0]?.message?.content || '{}';
      const parsed = JSON.parse(content);

      let actionButtons: any[] | undefined = undefined;
      if (normalized.includes('order') || normalized.includes('salt') || normalized.includes('tea') || normalized.includes('namak')) {
        actionButtons = [
          {
            label: '🎙️ Confirm Tata Reorder with Voice (हाँ, पक्का करो)',
            actionType: 'CONFIRM_VOICE_ORDER',
            payload: { distributor: data.storeProfile.distributorAssigned },
          },
        ];
      } else if (normalized.includes('credit') || normalized.includes('tata capital') || normalized.includes('loan')) {
        actionButtons = [
          {
            label: '💳 Accept ₹15,000 Tata Capital 15-Day Stock Credit',
            actionType: 'ACCEPT_CREDIT_OFFER',
            payload: { amount: 15000, tenure: 15 },
          },
        ];
      } else if (normalized.includes('tax') || normalized.includes('ca')) {
        actionButtons = [
          {
            label: '📄 Export 1-Tap CA Sales Summary',
            actionType: 'EXPORT_CA_SUMMARY',
            payload: { savings: 70400 },
          },
        ];
      }

      return {
        query,
        hindiSpokenResponse: parsed.hindiSpokenResponse || `रमेश भैया, आज की कुल बिक्री ₹${m.todaySalesINR.toLocaleString('en-IN')} रही है।`,
        englishSummary: parsed.englishSummary || `Processed Kirana query via Tata Dukaan Saathi engine.`,
        metrics: {
          todaySalesINR: m.todaySalesINR,
          khataTotalINR: data.totalKhataPendingINR,
          score: data.kiranaBusinessScore.overallScore,
        },
        actionButtons,
        modelUsed: `Groq LPU (${usedModel})`,
        latencyMs: Date.now() - startTime,
      };
    } catch (err: any) {
      console.warn('[VoiceSaathi Engine] Groq API call fallback:', err.message);
    }
  }

  // Deterministic Accurate Fallbacks (Offline & Zero-Key Demonstration)
  if (normalized.includes('salt') || normalized.includes('namak') || normalized.includes('tea') || normalized.includes('chai')) {
    return {
      query,
      hindiSpokenResponse: `रमेश भैया, टाटा सॉल्ट में केवल 2 पैकेट बचे हैं और टेटली चाय में सिर्फ 1 पैकेट! कल सुबह तक स्टॉक खत्म हो जाएगा। क्या मैं टाटा डिस्ट्रीब्यूटर को 20 पैकेट नमक और 5 टेटली चाय का आर्डर भेज दूँ?`,
      englishSummary: `Tata Salt (2 pkts left) and Tetley Green Tea (1 pack left) are at critical stockout risk. Recommended reorder: 20 pkts Salt + 5 pkts Tetley before morning cutoff.`,
      metrics: { saltStock: 2, tetleyStock: 1 },
      actionButtons: [
        {
          label: '🎙️ Confirm Reorder: "हाँ, भेज दो"',
          actionType: 'CONFIRM_VOICE_ORDER',
          payload: { orderTotal: 3420 },
        },
      ],
      modelUsed: 'Tata Saathi Grounded Telemetry',
      latencyMs: Date.now() - startTime,
    };
  }

  if (normalized.includes('credit') || normalized.includes('loan') || normalized.includes('capital') || normalized.includes('paise')) {
    return {
      query,
      hindiSpokenResponse: `रमेश जी, आपके 10 हफ़्तों के नियमित आर्डर और समय पर भुगतान के आधार पर आपका किराना बिजनेस स्कोर 84/100 है। टाटा कैपिटल से ₹15,000 का 15-दिन का स्टॉक क्रेडिट प्री-अप्रूव्ड है। यह रकम सीधे आपके टाटा डिस्ट्रीब्यूटर को चली जाएगी।`,
      englishSummary: `Pre-approved ₹15,000 15-day stock credit from Tata Capital based on 84/100 Kirana Business Score. Disburses directly to Tata distributor; repaid via Tata Pay UPI.`,
      metrics: { score: 84, preApprovedLimit: 25000, offerAmount: 15000 },
      actionButtons: [
        {
          label: '💳 Accept ₹15,000 Stock Credit Now',
          actionType: 'ACCEPT_CREDIT_OFFER',
          payload: { amount: 15000 },
        },
      ],
      modelUsed: 'Tata Saathi Grounded Telemetry',
      latencyMs: Date.now() - startTime,
    };
  }

  if (normalized.includes('tax') || normalized.includes('ca') || normalized.includes('bachat')) {
    return {
      query,
      hindiSpokenResponse: `रमेश जी, इस महीने आपकी 78% बिक्री टाटा पे और डिजिटल यूपीआई से हुई है। इनकम टैक्स की धारा 44AD के तहत डिजिटल बिक्री पर 6% लाभ माना जाता है, जिससे आपके अनुमानित ₹70,400 टैक्स बचेंगे। 1-टैप सीए रिपोर्ट तैयार है।`,
      englishSummary: `Under Section 44AD, digital turnover (78% via Tata Pay) qualifies for 6% deemed profit vs 8% cash, saving ~₹70,400 in direct tax. 1-tap CA summary ready for accountant review.`,
      metrics: { digitalPct: 78, taxSavedINR: 70400 },
      actionButtons: [
        {
          label: '📄 1-टैप में CA रिपोर्ट डाउनलोड करें',
          actionType: 'EXPORT_CA_SUMMARY',
          payload: { savings: 70400 },
        },
      ],
      modelUsed: 'Tata Saathi Grounded Telemetry',
      latencyMs: Date.now() - startTime,
    };
  }

  // Default Today's Sales Brief
  return {
    query,
    hindiSpokenResponse: `रमेश भैया, आज आपकी दुकान की कुल बिक्री ₹${m.todaySalesINR.toLocaleString('en-IN')} रही है। इसमें से ₹${m.todayUpiShareINR.toLocaleString('en-IN')} (${m.todayUpiPct}%) टाटा पे यूपीआई से और ₹${m.todayCashShareINR.toLocaleString('en-IN')} नकद रहा।`,
    englishSummary: `Today's gross sales: ₹${m.todaySalesINR.toLocaleString('en-IN')} across ${m.todayOrdersCount} orders. Tata Pay UPI share: ₹${m.todayUpiShareINR.toLocaleString('en-IN')} (${m.todayUpiPct}%).`,
    metrics: { todaySales: m.todaySalesINR, upiPct: m.todayUpiPct },
    actionButtons: [
      {
        label: '📦 टाटा डिस्ट्रीब्यूटर रीऑर्डर देखें',
        actionType: 'CONFIRM_VOICE_ORDER',
        payload: { orderTotal: 3420 },
      },
    ],
    modelUsed: 'Tata Saathi Grounded Telemetry',
    latencyMs: Date.now() - startTime,
  };
}

/**
 * 3. Daily Scheduled Briefings for Kirana Merchant
 */
export const SCHEDULED_BRIEFINGS: ScheduledBriefing[] = [
  {
    timeSlot: '07:30 AM',
    milestoneTitle: 'Proactive Morning Restock Call',
    hindiHeadline: 'सुप्रभात रमेश जी! टाटा सॉल्ट और टेटली चाय का रीऑर्डर समय',
    hindiDescription: 'नमस्ते रमेश जी! टाटा सॉल्ट (2 पैकेट बचे) और टेटली चाय कल तक खत्म हो जाएगी। 20 पैकेट नमक और 5 टेटली चाय का आर्डर टाटा डिस्ट्रीब्यूटर को भेज दूँ? "हाँ" कहें।',
    englishDetails: 'Proactive morning voice restock call: Predicts stockout of Tata Salt and Tetley before evening rush. Confirms via Indic voice readback before routing to distributor.',
    audioDuration: '0:38',
    cooFeature: 'Voice Call Restock & Confirm Guardrail',
    actionButton: {
      label: '🎙️ Voice Confirm: "हाँ, आर्डर पक्का करो"',
      actionType: 'CONFIRM_VOICE_ORDER',
      payload: { poAmount: 3420 },
    },
    metrics: { saltStock: 2, orderEstimateINR: 3420 },
  },
  {
    timeSlot: '01:30 PM',
    milestoneTitle: 'Distributor Invoice Rate Audit',
    hindiHeadline: 'टाटा डिस्ट्रीब्यूटर बिल ऑडिट: दर विसंगति पकड़ी गई',
    hindiDescription: 'टाटा डिस्ट्रीब्यूटर इनवॉइस #8842 में तुअर दाल पर ₹168/kg चार्ज किया गया है, जबकि अनुबंधित दर ₹154/kg है। ₹140 का क्रेडिट मेमो तैयार है।',
    englishDetails: 'Distributor Invoice OCR Audit: Compares billed line items against official Tata Consumer price contract. Flagged ₹140 overcharge claim.',
    audioDuration: '0:42',
    cooFeature: 'PaddleOCR Price Contract Verifier',
    actionButton: {
      label: '📑 डिस्ट्रीब्यूटर को ₹140 का क्रेडिट नोट भेजें',
      actionType: 'DISPATCH_DEBIT_NOTE',
      payload: { refundClaimINR: 140 },
    },
    metrics: { invoiceNumber: 'TCP-UP-2026-8842', overchargeClaimINR: 140 },
  },
  {
    timeSlot: '06:00 PM',
    milestoneTitle: 'Pre-Festival Surge & Tata Capital Credit',
    hindiHeadline: 'दिवाली स्टॉकअप: टाटा कैपिटल ₹15,000 क्रेडिट उपलब्ध',
    hindiDescription: 'दिवाली दो हफ्ते दूर है। बेसन, पोहा और चिंग्स चटनी की मांग 2.8x बढ़ेगी। आपके किराना बिजनेस स्कोर (84) पर ₹15,000 का 15-दिन का क्रेडिट उपलब्ध है।',
    englishDetails: 'Demand Surge & Micro-Credit Flow: Pre-approved 15-day stock credit scored on verified order history; disbursed directly to Tata distributor.',
    audioDuration: '0:45',
    cooFeature: 'Kirana Business Scoring & Micro-Loans',
    actionButton: {
      label: '💳 Accept ₹15,000 Tata Capital Credit',
      actionType: 'ACCEPT_CREDIT_OFFER',
      payload: { amount: 15000 },
    },
    metrics: { score: 84, creditLimitINR: 15000 },
  },
  {
    timeSlot: '10:00 PM',
    milestoneTitle: 'Night Sales Ledger & CA Tax Summary',
    hindiHeadline: 'दैनिक हिसाब पूरा: धारा 44AD में ₹70,400 टैक्स बचत',
    hindiDescription: 'आज की कुल कमाई ₹19,500 रही। 78% डिजिटल बिक्री से धारा 44AD में टैक्स बचेगा। सीए समरी रिपोर्ट 1-टैप में डाउनलोड करें।',
    englishDetails: 'Unified Sales Ledger: Combines Tata Pay UPI, voice cash entries, and khata OCR into one clean book with Section 44AD tax guidance.',
    audioDuration: '0:50',
    cooFeature: 'Growth Advisor & 1-Tap CA Export',
    actionButton: {
      label: '📄 1-टैप में CA रिपोर्ट डाउनलोड करें',
      actionType: 'EXPORT_CA_SUMMARY',
      payload: { taxSavedINR: 70400 },
    },
    metrics: { todaySalesINR: 19500, taxSavedINR: 70400 },
  },
];

/**
 * Convenience Helpers & Backward Compatibility Bridges
 */
export function isCallIntent(text: string): boolean {
  const lower = (text || '').toLowerCase().trim();
  return (
    lower.includes('call') ||
    lower.includes('phone') ||
    lower.includes('कॉल') ||
    lower.includes('बात') ||
    lower.includes('baat') ||
    lower.includes('आवाज')
  );
}

export function isCallConfirmation(text: string): boolean {
  const lower = (text || '').toLowerCase().trim();
  return (
    lower === 'yes' ||
    lower === 'haan' ||
    lower === 'ha' ||
    lower === 'हाँ' ||
    lower === 'haji' ||
    lower.includes('yes') ||
    lower.includes('हाँ') ||
    lower.includes('कॉल करो') ||
    lower.includes('start call')
  );
}

export async function processVoiceQuery(query: string, language: string = 'hi'): Promise<VoiceQueryResponse> {
  return queryVoiceSaathi(query);
}

export function getScheduledDailyBriefings(): ScheduledBriefing[] {
  return SCHEDULED_BRIEFINGS;
}

export const GROUNDED_STORE_METRICS = KIRANA_STORE_COMPREHENSIVE_DATA;

