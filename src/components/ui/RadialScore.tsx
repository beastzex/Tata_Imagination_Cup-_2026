'use client';

import React, { useState, useEffect, useRef } from 'react';

export const RadialScore: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [score, setScore] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const targetScore = 84;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setScore(targetScore);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1200;
          const steps = 30;
          const interval = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            setScore(Math.round(progress * targetScore));

            if (currentStep >= steps) {
              clearInterval(timer);
              setScore(targetScore);
            }
          }, interval);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div ref={containerRef} className="w-full max-w-xl">
      {/* Large Radial Circular Progress Element */}
      <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
        <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            {/* Background track circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#DCE8F6"
              strokeWidth="8"
            />
            {/* Active Tata Blue Arc */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#005691"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-100 ease-out"
            />
          </svg>

          {/* Center Score Number */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-telemetry font-bold text-slate-900 tracking-tight tabular-nums">
              {score}
            </span>
            <span className="text-[11px] font-mono text-[#005691] font-bold">/100</span>
          </div>
        </div>

        {/* Narrative Side Text */}
        <div className="text-left space-y-1.5">
          <div className="text-xs font-mono text-[#005691] font-bold tracking-wide">
            Tata Capital Status: Prime Kirana (Pre-Approved ₹25k)
          </div>
          <h3 className="text-lg font-headline font-bold text-slate-900">
            Kirana Business Score
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-md">
            Scored on verified voice orders, regular stock reorders, and disciplined repayments. Eliminates balance sheets, GST returns, or collateral requirements for small kiranas.
          </p>
        </div>
      </div>

      {/* 4 Flat Horizontal Weighted Bars */}
      <div className="space-y-4 text-xs font-sans">
        <div className="border-t border-slate-200 pt-3">
          <div className="flex justify-between items-center text-slate-900 font-medium">
            <span>Weekly Tata Order Cadence (30% weight)</span>
            <span className="font-telemetry text-[#005691] font-bold">92/100</span>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-3">
          <div className="flex justify-between items-center text-slate-900 font-medium">
            <span>Cash Flow Regularity & Tata Pay (25% weight)</span>
            <span className="font-telemetry text-[#005691] font-bold">88/100</span>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-3">
          <div className="flex justify-between items-center text-slate-900 font-medium">
            <span>On-Time Repayment Discipline (25% weight)</span>
            <span className="font-telemetry text-emerald-700 font-bold">95/100</span>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-3">
          <div className="flex justify-between items-center text-slate-900 font-medium">
            <span>Stockout Aversion Velocity (20% weight)</span>
            <span className="font-telemetry text-[#00A3E0] font-bold">81/100</span>
          </div>
        </div>
      </div>
    </div>
  );
};
