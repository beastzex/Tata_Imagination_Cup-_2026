'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const EcosystemBentoSection: React.FC = () => {
  return (
    <section id="ecosystem" className="py-24 sm:py-32 px-4 sm:px-8 border-b border-slate-200/80 bg-gradient-to-b from-white via-[#F4F9FD] to-[#EDF5FB]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-left mb-16 space-y-3">
          <div className="text-xs font-mono text-[#005691] font-bold tracking-wide">
            THE TATA ADVANTAGE / CLOSED-LOOP ECOSYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-950 tracking-tight">
            Why only Tata can build this.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl leading-relaxed">
            Rivals can copy a voice bot. A voice bot is a feature anyone can build. The true moat is the combination of owned supply, owned credit, owned payment rails, and owned enterprise scale.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 text-left">
          {/* Pillar 1: Tata Consumer Products */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-2xl bg-white border border-[#DCE8F6] shadow-sm overflow-hidden flex flex-col justify-between"
          >
            <div className="relative h-64 sm:h-72 w-full bg-slate-100 overflow-hidden">
              <Image
                src="/images/soundbox-counter.jpg"
                alt="Tata Consumer products on Kirana Counter"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-[11px] font-mono text-[#005691] bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#BCE1F5] font-bold shadow-xs">
                  Pillar 1 • Tata Consumer Products
                </span>
              </div>
            </div>

            <div className="p-6 pt-2 space-y-2">
              <h3 className="text-xl font-headline font-bold text-slate-900">
                Owned Supply & Last-Mile Demand Visibility
              </h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Direct integration with Tata Consumer distributors ensures structured order fulfillment for flagship brands: Tata Salt, Tata Tea, Tetley, Tata Sampann pulses, and Ching&apos;s Secret. The brand gets real-time shelf demand data across 12M endpoints.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
                <span>✓ Zero-stockout replenishment</span>
                <span>✓ Direct distributor routing</span>
                <span>✓ Official trade schemes</span>
              </div>
            </div>
          </motion.div>

          {/* Pillar 2: Tata Capital */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 rounded-2xl bg-white border border-[#DCE8F6] shadow-sm p-6 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <span className="text-xs font-mono text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                Pillar 2 • Tata Capital
              </span>
              <h3 className="text-xl font-headline font-bold text-slate-900">
                Kirana Business Score & Micro-Credit
              </h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Every confirmed voice order and repayment builds a verified cash-flow record. Tata Capital unlocks small-ticket stock credit (₹5,000 to ₹25,000 for 15 days) right inside the chat, disbursed directly to the distributor.
              </p>
            </div>

            {/* Visual Underwriting Chip */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 font-mono text-[11px] space-y-2 text-slate-600">
              <div className="flex justify-between text-[#005691] font-bold">
                <span>KIRANA BUSINESS SCORE: 84/100</span>
                <span className="text-emerald-600">PRE-APPROVED</span>
              </div>
              <div className="text-slate-500">
                Limit: ₹25,000 • 15-Day Cycle • Zero Paperwork
              </div>
              <div className="text-slate-500">
                Underwriting: 10-Week Order Regularity & Zero Defaults
              </div>
            </div>
          </motion.div>

          {/* Pillar 3: Tata Pay & Tata Neu */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 rounded-2xl bg-white border border-[#DCE8F6] shadow-sm p-6 space-y-3"
          >
            <span className="text-xs font-mono text-[#005691] font-bold bg-[#EBF6FC] px-2.5 py-0.5 rounded-full border border-[#BCE1F5]">
              Pillar 3 • Tata Pay / Tata Neu
            </span>
            <h3 className="text-xl font-headline font-bold text-slate-900">
              Merchant UPI Settlement & Auto-Repayment Rails
            </h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Tata Pay handles daily counter UPI collections, soundbox chime confirmations, and automated loan repayments linked to distributor settlement. Merchants earn NeuCoins loyalty on fast-turnover FMCG reorders.
            </p>
            <div className="pt-2 text-xs font-mono text-[#005691] font-medium">
              → UPI mandate auto-clears 15-day stock loans on due date
            </div>
          </motion.div>

          {/* Pillar 4: TCS (Tata Consultancy Services) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-6 rounded-2xl bg-white border border-[#DCE8F6] shadow-sm p-6 space-y-3"
          >
            <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Pillar 4 • TCS Scale & Speech AI
            </span>
            <h3 className="text-xl font-headline font-bold text-slate-900">
              Cloud Scale, Indic ASR & Distributor ERP Adapters
            </h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              TCS provides enterprise-grade hexagonal cloud infrastructure, Bhashini-backed Indic speech recognizers fine-tuned on shopkeeper dialects (Hindi, Marathi, Gujarati, Tamil), and integrations to distributor ERPs.
            </p>
            <div className="pt-2 text-xs font-mono text-emerald-700 font-medium">
              → Scalable to 300,000 stores with sub-200ms latency
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
