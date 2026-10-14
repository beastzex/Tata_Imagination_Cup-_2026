'use client';

import React from 'react';
import { SmoothScroll } from '@/components/common/SmoothScroll';
import { HeroSection } from '@/components/sections/HeroSection';
import { TelemetryStrip } from '@/components/ui/TelemetryStrip';
import { MerchantStorySection } from '@/components/sections/MerchantStorySection';
import { SimulatorSection } from '@/components/sections/SimulatorSection';
import { GrowthLoopSection } from '@/components/sections/GrowthLoopSection';
import { EcosystemBentoSection } from '@/components/sections/EcosystemBentoSection';
import { RoiCalculatorSection } from '@/components/sections/RoiCalculatorSection';
import { AgentGraphSection } from '@/components/sections/AgentGraphSection';
import { AiModelTelemetrySection } from '@/components/sections/AiModelTelemetrySection';
import { HealthScoreSection } from '@/components/sections/HealthScoreSection';
import { ProofStripSection } from '@/components/sections/ProofStripSection';
import { CtaFooterSection } from '@/components/sections/CtaFooterSection';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white text-[#0F1E36] font-sans antialiased selection:bg-[#005691] selection:text-white">
        {/* Minimal Top Header on Pure White */}
        <header className="w-full border-b border-[#DCE8F6] bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#005691] to-[#00A3E0] flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
                  T
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-lg font-extrabold tracking-tight text-[#003B66] leading-none">
                    Tata Dukaan<span className="text-[#00A3E0]">Saathi</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">टाटा दुकान साथी</span>
                </div>
              </Link>
              <span className="hidden md:inline text-[10px] font-mono text-[#005691] bg-[#EBF6FC] border border-[#BCE1F5] px-2.5 py-0.5 rounded-full font-semibold">
                Tata Imagination Cup 2026 • Idea Pitch
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-6 text-xs text-slate-600 font-medium">
              <a href="#story" className="hover:text-[#005691] transition-colors">A Day with Saathi</a>
              <a href="#simulator" className="hover:text-[#005691] transition-colors">Voice Lab</a>
              <a href="#ecosystem" className="hover:text-[#005691] transition-colors">Tata Group Moat</a>
              <a href="#roi-calculator" className="hover:text-[#005691] transition-colors">Unit Economics</a>
              <a href="#agent-graph" className="hover:text-[#005691] transition-colors">6-Layer Architecture</a>
              <a href="#ai-models" className="hover:text-[#005691] transition-colors font-semibold text-[#005691]">ML Models</a>
              <Link href="/dashboard" className="text-[#00A3E0] font-bold hover:underline flex items-center gap-1">
                <span>Live Portal</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] animate-ping" />
              </Link>
            </nav>

            <div className="flex items-center gap-2.5">
              <Link
                href="/dashboard"
                className="text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-[#005691] to-[#00A3E0] hover:opacity-95 text-white transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>🚀 Merchant & Distributor Portal</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content with seamless gradient blending between sections */}
        <main>
          {/* 1. HERO (Voice-first Kirana Assistant, WhatsApp Sequence, Tata Ecosystem Loop) */}
          <HeroSection />

          {/* 2. LIVE TELEMETRY STRIP (12M Kiranas, ₹3,000 Incremental Tata Sales, 90%+ Accuracy, ₹5k-₹25k Credit) */}
          <TelemetryStrip />

          {/* 3. MERCHANT STORY ("A Day with Saathi" - Ramesh Ji Daily Timeline from Proposal) */}
          <div id="story">
            <MerchantStorySection />
          </div>

          {/* 4. INTERACTIVE VOICE & WHATSAPP SIMULATOR LAB (Confirm-Before-Order, Tata Catalogue, Voice Notes) */}
          <div id="simulator">
            <SimulatorSection />
          </div>

          {/* 5. THE AUTONOMOUS GROWTH FLYWHEEL (Order -> Supply -> Kirana Score -> Credit -> Bigger Orders) */}
          <GrowthLoopSection />

          {/* 6. TATA GROUP SYNERGY MOAT (Tata Consumer, Tata Capital, Tata Pay/Neu, TCS) */}
          <div id="ecosystem">
            <EcosystemBentoSection />
          </div>

          {/* 7. INTERACTIVE UNIT ECONOMICS & SCALE CALCULATOR (300,000 Stores, ₹1,080 Cr Incremental GMV) */}
          <div id="roi-calculator">
            <RoiCalculatorSection />
          </div>

          {/* 8. ARCHITECTURE: 6-LAYER HEXAGONAL ENGINE (3D Rotating Node Graph) */}
          <div id="agent-graph">
            <AgentGraphSection />
          </div>

          {/* 9. REAL ML MODEL TELEMETRY & VERIFICATION (Prophet, XGBoost Stockout, RFM, Groq LPU) */}
          <div id="ai-models">
            <AiModelTelemetrySection />
          </div>

          {/* 10. KIRANA BUSINESS SCORE (Tata Capital Underwriting: Cashflow, Stockout Resistance, Tata Loyalty) */}
          <div id="health-score">
            <HealthScoreSection />
          </div>

          {/* 11. 90-DAY PILOT ROADMAP & KPIs (500 Stores, 60% WAU, 25-30% Fewer Stockouts) */}
          <div id="proof">
            <ProofStripSection />
          </div>

          {/* 12. CTA / FOOTER */}
          <CtaFooterSection />
        </main>

        {/* Persistent Floating Quick-Switch to Dashboard Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#003B66] hover:bg-[#002847] text-white font-bold text-xs shadow-2xl border border-sky-400/30 transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A3E0] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00A3E0]" />
            </span>
            <span>Switch to Merchant Portal</span>
            <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-mono group-hover:bg-[#00A3E0]">
              Live ↗
            </span>
          </Link>
        </div>
      </div>
    </SmoothScroll>
  );
}
