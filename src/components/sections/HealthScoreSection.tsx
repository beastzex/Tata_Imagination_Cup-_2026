'use client';

import React from 'react';
import { RadialScore } from '@/components/ui/RadialScore';

export const HealthScoreSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 border-b border-slate-200/80 bg-gradient-to-b from-[#F4F9FD] via-white to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
        {/* Left narrative */}
        <div className="flex-1 text-left space-y-3">
          <div className="text-xs font-mono text-[#005691] font-bold tracking-wide">
            TATA CAPITAL UNDERWRITING / PHASE 3
          </div>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-900 tracking-tight">
            Kirana Business Score (0-100)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed max-w-md">
            Lenders historically treat kiranas as high-risk black boxes. By auditing 8 to 12 weeks of confirmed voice orders, Tata Pay settlements, and disciplined repayments, Tata Dukaan Saathi builds a verified credit profile that unlocks pre-approved ₹5,000 to ₹25,000 stock credit from Tata Capital with zero paperwork.
          </p>
          <div className="pt-2 text-xs font-mono text-[#005691] font-medium">
            → Repaid via Tata Pay / UPI auto-mandate linked to distributor settlement
          </div>
        </div>

        {/* Right Radial & 4 Weighted Bars */}
        <div className="w-full md:w-auto">
          <RadialScore />
        </div>
      </div>
    </section>
  );
};
