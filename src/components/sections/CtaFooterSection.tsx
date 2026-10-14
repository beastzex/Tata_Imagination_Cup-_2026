'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export const CtaFooterSection: React.FC = () => {
  const handleStart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-gradient-to-b from-[#F4F9FD] via-[#FAF9F6] to-[#EDF5FB] text-left border-t border-slate-200/80">
      {/* Quiet Close CTA Section */}
      <div className="py-24 sm:py-32 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-left space-y-6">
          <span className="text-xs font-mono text-[#005691] font-bold tracking-wide">
            DEPLOY ALONGSIDE INDIA&apos;S KIRANAS
          </span>
          <h2 className="text-3xl sm:text-5xl font-headline font-bold text-slate-900 tracking-tight leading-[1.15]">
            Empower small kiranas. <br />
            Zero software to install.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans max-w-xl leading-relaxed">
            Tata Dukaan Saathi integrates seamlessly through normal phone calls, WhatsApp voice notes, and Tata Pay. It creates a closed loop where Tata Consumer supplies goods, Tata Capital supplies credit, Tata Pay powers settlement, and TCS scales the technology.
          </p>

          <div className="pt-4">
            <Button variant="saffron-beam" onClick={handleStart}>
              Back to Top & Explore Live Prototype ↑
            </Button>
          </div>
        </div>
      </div>

      {/* Minimal Bottom Bar */}
      <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#005691]" />
          <span className="font-semibold text-slate-700">Tata Dukaan Saathi</span>
          <span>• Tata Imagination Cup 2026</span>
        </div>
        <div>
          Round 3: Idea Pitch & Functional Prototype
        </div>
      </div>
    </footer>
  );
};
