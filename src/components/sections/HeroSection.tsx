'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { ParallaxBadge } from '@/components/ui/ParallaxBadge';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const handleScrollToDemo = () => {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full pt-14 pb-24 sm:pt-24 sm:pb-32 px-4 sm:px-8 border-b border-slate-200/80 bg-gradient-to-b from-white via-[#F4F9FD] to-[#EDF5FB] overflow-hidden">
      {/* Subtle organic light aura in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,86,145,0.08),rgba(0,163,224,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 text-left space-y-6"
        >
          {/* Small subhead above headline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#BCE1F5] shadow-xs text-xs font-mono text-[#005691]">
            <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
            टाटा दुकान साथी • TATA DUKAAN SAATHI
          </div>

          {/* Two-line headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-slate-950 leading-[1.12] tracking-tight pb-2">
            A voice-first AI assistant <br className="hidden sm:inline" />
            for India&apos;s 12 million kiranas.
          </h1>

          {/* Plain-language subline */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans max-w-xl">
            A shopkeeper talks to Saathi in Hindi or their regional language on a normal phone call or WhatsApp voice note. Reorder stock, prevent stockouts, save tax under Section 44AD, and unlock instant stock credit powered by Tata Consumer Products, Tata Capital, and Tata Pay.
          </p>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-[#005691] hover:bg-[#003B66] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>🚀 Open Live Operations Portal</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </Link>
            <Button variant="saffron" onClick={handleScrollToDemo}>
              See It in Action
            </Button>
            <a
              href="#simulator"
              className="text-xs font-semibold text-slate-700 hover:text-[#005691] transition-colors underline underline-offset-4 flex items-center gap-1"
            >
              Try Voice Reorder Lab →
            </a>
          </div>

          {/* Micro trust indicators */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-600 font-sans border-t border-slate-200/70">
            <div className="flex items-center gap-1.5">
              <span className="text-[#005691] font-bold">✓</span> No app download or typing
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#005691] font-bold">✓</span> Confirm-before-order safety
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#005691] font-bold">✓</span> Backed by Tata Consumer & Tata Capital
            </div>
          </div>
        </motion.div>

        {/* Right Column: Phone frame with live sequenced conversation + Parallax Badges */}
        <div className="relative w-full lg:w-auto shrink-0 flex justify-center">
          {/* Parallax Floating Badge 1: Top Left */}
          <ParallaxBadge
            speed={-15}
            className="-top-4 -left-6 sm:-left-10 hidden sm:flex"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
              ↑
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-900 leading-none">₹3,400 Tata Stock Protected</div>
              <div className="text-[10px] text-slate-500 leading-none mt-0.5">Voice reorder confirmed</div>
            </div>
          </ParallaxBadge>

          {/* Parallax Floating Badge 2: Bottom Right */}
          <ParallaxBadge
            speed={20}
            className="-bottom-4 -right-4 sm:-right-8 hidden sm:flex"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#00A3E0] animate-pulse" />
            <div>
              <div className="text-[11px] font-semibold text-slate-900 leading-none">Tata Capital Instant Credit</div>
              <div className="text-[10px] text-[#005691] font-mono leading-none mt-0.5">₹15,000 Pre-approved (15 days)</div>
            </div>
          </ParallaxBadge>

          <PhoneFrame />
        </div>
      </div>
    </section>
  );
};
