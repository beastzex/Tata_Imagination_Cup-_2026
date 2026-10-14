'use client';

import React, { useState, useEffect, useRef } from 'react';

export const TelemetryStrip: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [kiranaCount, setKiranaCount] = useState(0);
  const [incrementalSales, setIncrementalSales] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [stockoutReduction, setStockoutReduction] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setKiranaCount(12);
      setIncrementalSales(3000);
      setAccuracy(92);
      setStockoutReduction(28);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1400;
          const steps = 30;
          const interval = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            setKiranaCount(Math.round(progress * 12));
            setIncrementalSales(Math.round(progress * 3000));
            setAccuracy(Math.round(progress * 92));
            setStockoutReduction(Math.round(progress * 28));

            if (currentStep >= steps) {
              clearInterval(timer);
              setKiranaCount(12);
              setIncrementalSales(3000);
              setAccuracy(92);
              setStockoutReduction(28);
            }
          }, interval);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#F4F9FD] border-y border-[#DCE8F6] py-7 px-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {/* Metric 1 */}
        <div className="flex flex-col">
          <div className="text-2xl sm:text-3xl font-telemetry font-bold text-[#005691] tabular-nums tracking-tight">
            {kiranaCount}M+
          </div>
          <div className="text-xs text-slate-700 mt-1 font-sans font-semibold">
            Indian Kirana Stores
          </div>
          <div className="text-[11px] text-slate-500 font-sans">
            Operating on phone calls & paper ledgers
          </div>
        </div>

        {/* Metric 2 */}
        <div className="flex flex-col border-l border-slate-200/80 pl-4 sm:pl-6">
          <div className="text-2xl sm:text-3xl font-telemetry font-bold text-[#005691] tabular-nums tracking-tight">
            +₹{incrementalSales.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-700 mt-1 font-sans font-semibold">
            Monthly Incremental Tata Sales
          </div>
          <div className="text-[11px] text-slate-500 font-sans">
            Per store from zero-stockout voice reorders
          </div>
        </div>

        {/* Metric 3 */}
        <div className="flex flex-col border-l border-slate-200/80 pl-4 sm:pl-6">
          <div className="text-2xl sm:text-3xl font-telemetry font-bold text-emerald-700 tabular-nums tracking-tight">
            {accuracy}%
          </div>
          <div className="text-xs text-slate-700 mt-1 font-sans font-semibold">
            First-Pass Voice Accuracy
          </div>
          <div className="text-[11px] text-slate-500 font-sans">
            With confirm-before-order readback
          </div>
        </div>

        {/* Metric 4 */}
        <div className="flex flex-col border-l border-slate-200/80 pl-4 sm:pl-6">
          <div className="text-2xl sm:text-3xl font-telemetry font-bold text-[#00A3E0] tabular-nums tracking-tight">
            -{stockoutReduction}%
          </div>
          <div className="text-xs text-slate-700 mt-1 font-sans font-semibold">
            Fewer Stockouts on Tracked SKUs
          </div>
          <div className="text-[11px] text-slate-500 font-sans">
            Validated in 90-day 500-store pilot design
          </div>
        </div>
      </div>
    </div>
  );
};
