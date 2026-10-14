'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Scenario {
  id: string;
  tabLabel: string;
  problemBadge: string;
  agentUsed: string;
  waMessage: string;
  waDetail: string;
  buttonText: string;
  approvedText: string;
  recoveryStat: string;
  merchantReply: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'voice-reorder',
    tabLabel: 'Voice Reorder & Readback',
    problemBadge: 'Saathi Voice Reorder Agent',
    agentUsed: 'Indic Whisper + Tata SKU Fuzzy Match',
    waMessage: '📞 Voice Reorder Summary: "20 packet Tata Salt aur 5 packet Tetley chai patti. Pakka karun?"',
    waDetail: 'Resolved from natural Hindi speech. Guardrail mandates explicit confirmation before routing to distributor.',
    buttonText: 'हाँ, आर्डर पक्का करो (₹3,420)',
    approvedText: '✓ Confirmed! Order #ORD-TCP-9921 sent to Tata Hub',
    recoveryStat: '₹3,420 Protected',
    merchantReply: 'Haan, pakka karo',
  },
  {
    id: 'invoice-audit',
    tabLabel: 'Distributor Rate Audit',
    problemBadge: 'Invoice OCR Rate Verifier',
    agentUsed: 'PaddleOCR + Agreed Rate Card',
    waMessage: '🧾 Price Discrepancy Found: Distributor invoice billed Tata Sampann Toor Dal at ₹168/kg vs agreed ₹154/kg.',
    waDetail: 'Overcharge: ₹14/kg across 10 kg (₹140 loss). Send credit note claim to Tata Distributor rep?',
    buttonText: 'डिस्ट्रीब्यूटर को ₹140 का क्रेडिट नोट दावा भेजें',
    approvedText: '✓ Credit Claim #CR-8842 Dispatched to Rep',
    recoveryStat: '₹140 Recovered',
    merchantReply: 'Bhejo claim turant',
  },
  {
    id: 'tata-credit',
    tabLabel: 'Tata Capital Micro-Credit',
    problemBadge: 'Kirana Business Scoring Engine',
    agentUsed: 'Tata Capital Policy Engine + Score 84',
    waMessage: '💳 Festival Stock Alert: Pre-approved ₹15,000 instant 15-day stock credit available from Tata Capital.',
    waDetail: 'Underwritten on 10 weeks of verified order history. Disbursed directly to Tata Distributor; repaid via Tata Pay UPI.',
    buttonText: 'Accept ₹15,000 Stock Credit Line',
    approvedText: '✓ ₹15,000 Disbursed to Tata Wholesaler',
    recoveryStat: '₹15,000 Liquidity',
    merchantReply: 'Haan, accept kiya',
  },
  {
    id: 'shelf-vision',
    tabLabel: 'Shelf Empty Slot Scan',
    problemBadge: 'Shelf Vision & Restock Agent',
    agentUsed: 'Computer Vision + YOLOv10 Rack Audit',
    waMessage: '📸 Shelf Photo Scan: 2 empty slots detected on Tata Sampann rack (Chhole Masala & Chana Dal).',
    waDetail: 'Zero stock detected on evening fast movers. Auto-drafted replenishment PO before morning cutoff.',
    buttonText: 'टाटा डिस्ट्रीब्यूटर को रीस्टॉक PO भेजें (₹1,850)',
    approvedText: '✓ Restock PO Scheduled for Slot A (9:30 AM)',
    recoveryStat: 'Zero Stockout',
    merchantReply: 'Bhej do kal subah',
  },
];

export const SimulatorSection: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('voice-reorder');
  const [approvedStates, setApprovedStates] = useState<Record<string, boolean>>({});

  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];
  const isApproved = approvedStates[scenario.id] || false;

  const handleApprove = () => {
    setApprovedStates((prev) => ({ ...prev, [scenario.id]: true }));
  };

  return (
    <section id="simulator" className="py-24 sm:py-32 px-4 sm:px-8 border-b border-slate-200/80 bg-gradient-to-b from-[#F4F9FD] via-[#FAFAFA] to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-left mb-12 space-y-3">
          <div className="text-xs font-mono text-[#005691] font-bold tracking-wide">
            LIVE INTERACTIVE TEST LAB / VOICE & WHATSAPP EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-950 tracking-tight">
            Experience the voice & WhatsApp loop.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-xl leading-relaxed">
            Select a real-world kirana situation below. Watch how Tata Dukaan Saathi turns spoken words and phone photos into structured orders, verified rate claims, and instant stock credit.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveScenarioId(s.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold font-sans transition-all cursor-pointer ${
                activeScenarioId === s.id
                  ? 'bg-[#005691] text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {s.tabLabel}
            </button>
          ))}
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: AI Model Intelligence Card */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono text-[#005691] font-bold">
                  {scenario.problemBadge}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Engine: {scenario.agentUsed}
                </span>
              </div>

              <h3 className="text-xl font-headline font-bold text-slate-900">
                {scenario.tabLabel}
              </h3>

              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Autonomous Saathi engine cross-references speech transcription with the official Tata Consumer catalogue and contracted distributor pricing.
              </p>

              <div className="p-3.5 rounded-xl bg-[#EBF6FC] border border-[#BCE1F5] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-[#005691] font-semibold">PREVENTED VALUE</div>
                  <div className="text-lg font-telemetry font-bold text-[#003B66]">
                    {scenario.recoveryStat}
                  </div>
                </div>
                <div className="text-xs font-mono text-[#005691] bg-white/90 px-2.5 py-1 rounded-full border border-[#BCE1F5]">
                  Zero manual typing
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-900">Safe by Design Principle:</div>
              <p className="text-[11px] leading-relaxed">
                Never act on a guess. Every order is read back and confirmed by the shopkeeper. Low-confidence matches trigger clarifying questions; after two misses, routes to the distributor rep.
              </p>
            </div>
          </div>

          {/* Right Column: Live Interactive WhatsApp Bubble */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#F0F2F5] border border-slate-200 shadow-md overflow-hidden text-left">
              {/* WhatsApp Mockup Header */}
              <div className="px-4 py-3 bg-[#EAEBED] border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#005691] to-[#00A3E0] flex items-center justify-center text-xs font-bold text-white shadow-xs">
                    TS
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-none mb-0.5">
                      Tata Dukaan Saathi
                    </div>
                    <div className="text-[10px] text-[#005691] font-mono font-medium leading-none">
                      टाटा दुकान साथी • Active
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-500">Verified Partner</span>
              </div>

              {/* Chat Thread */}
              <div className="p-5 space-y-4 bg-[#F8FAFC]/70 min-h-[300px] flex flex-col justify-center font-sans">
                {/* AI Prompt Bubble */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="max-w-[92%] bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 shadow-xs space-y-2.5"
                  >
                    <p className="text-xs font-bold text-slate-900 leading-relaxed">
                      {scenario.waMessage}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {scenario.waDetail}
                    </p>

                    {/* Interactive Action Button */}
                    <div className="pt-2">
                      <button
                        onClick={handleApprove}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-tight transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isApproved
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                            : 'bg-gradient-to-r from-[#005691] to-[#00A3E0] text-white hover:opacity-95 shadow-sm active:scale-[0.99]'
                        }`}
                      >
                        {isApproved ? scenario.approvedText : scenario.buttonText}
                      </button>
                    </div>
                    <div className="text-right text-[9px] text-slate-400 font-mono">11:32 AM</div>
                  </motion.div>
                </AnimatePresence>

                {/* Merchant Reply Bubble when approved */}
                {isApproved && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[70%] bg-[#D9FDD3] border border-[#B8F0AF] rounded-2xl rounded-tr-sm p-3 text-xs text-slate-900 shadow-xs">
                      <p className="font-semibold">{scenario.merchantReply}</p>
                      <div className="flex items-center justify-end gap-1 text-[9px] text-teal-700 font-mono mt-1">
                        <span>11:33 AM</span>
                        <span className="font-bold">✓✓</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
