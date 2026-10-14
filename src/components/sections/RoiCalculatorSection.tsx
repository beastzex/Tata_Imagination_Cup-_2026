'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const RoiCalculatorSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'shopkeeper' | 'tata'>('shopkeeper');
  const [storeCount, setStoreCount] = useState<number>(20000);
  const [dailyTx, setDailyTx] = useState<number>(140);
  const [basketSize, setBasketSize] = useState<number>(180);

  // Kirana Shopkeeper Economics
  const monthlyRevenue = dailyTx * basketSize * 30;
  const stockoutSavings = Math.round(monthlyRevenue * 0.045);
  const taxSavingsMonthly = Math.round(70400 / 12);
  const rateDiscrepancyRecovered = 1450;
  const totalShopkeeperGain = stockoutSavings + taxSavingsMonthly + rateDiscrepancyRecovered;

  // Tata Group Economics (from Proposal Section 10)
  const incrementalTataSalesAnnual = Math.round((storeCount * 3000 * 12) / 10000000); // in Crores
  const tataConsumerMarginCr = Number((incrementalTataSalesAnnual * 0.12).toFixed(1)); // 12% contribution margin
  const costToServeCr = Number(((storeCount * 125 * 12) / 10000000).toFixed(1)); // ₹125/store/mo
  const netTataProfitCr = Number((tataConsumerMarginCr - costToServeCr).toFixed(1));
  const creditBookCr = Math.round((storeCount * 0.3 * 15000) / 10000000); // 30% take-up @ ₹15k average

  return (
    <section id="roi-calculator" className="py-24 sm:py-32 px-4 sm:px-8 border-b border-slate-200/80 bg-gradient-to-b from-[#F4F9FD] via-white to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="text-left space-y-3">
            <div className="text-xs font-mono text-[#005691] font-bold tracking-wide">
              UNIT ECONOMICS & SCALE / PROPOSAL CHAPTER 10
            </div>
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-950 tracking-tight">
              Unit economics that fund themselves.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-xl leading-relaxed">
              Free to the shopkeeper. Tata Consumer’s incremental sales contribution (₹300 to ₹450 per store) covers the ₹100 to ₹150 monthly cost to serve by 2 to 3 times.
            </p>
          </div>

          {/* Perspective Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold shrink-0">
            <button
              onClick={() => setViewMode('shopkeeper')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                viewMode === 'shopkeeper'
                  ? 'bg-white text-[#005691] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kirana Shopkeeper View
            </button>
            <button
              onClick={() => setViewMode('tata')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                viewMode === 'tata'
                  ? 'bg-white text-[#005691] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tata Group Ecosystem View
            </button>
          </div>
        </div>

        {viewMode === 'shopkeeper' ? (
          /* Shopkeeper View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Sliders */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 text-left">
              {/* Slider 1 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="font-semibold text-slate-800">Daily Customer Transactions</span>
                  <span className="font-telemetry font-bold text-[#005691] text-sm">{dailyTx} visits/day</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="400"
                  step="10"
                  value={dailyTx}
                  onChange={(e) => setDailyTx(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#005691]"
                />
              </div>

              {/* Slider 2 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="font-semibold text-slate-800">Average Basket Size</span>
                  <span className="font-telemetry font-bold text-[#005691] text-sm">₹{basketSize}</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="600"
                  step="20"
                  value={basketSize}
                  onChange={(e) => setBasketSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#005691]"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>Estimated Monthly Kirana GMV:</span>
                <span className="font-telemetry font-bold text-slate-800">₹{(monthlyRevenue).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Right Column: Calculated Gains */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white via-[#F8FAFC] to-[#EBF6FC] border border-[#BCE1F5] shadow-md space-y-6 text-left">
              <div>
                <span className="text-xs font-mono text-[#005691] font-bold bg-[#EBF6FC] border border-[#BCE1F5] px-3 py-1 rounded-full">
                  MONTHLY STORE IMPACT (FREE FOR SHOPKEEPER)
                </span>
                <div className="mt-4">
                  <div className="text-xs text-slate-600 font-sans">Net Value Unlocked per Month:</div>
                  <motion.div
                    key={totalShopkeeperGain}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="text-4xl sm:text-5xl font-telemetry font-bold text-[#005691] tracking-tight mt-1"
                  >
                    ₹{totalShopkeeperGain.toLocaleString('en-IN')}
                    <span className="text-sm font-sans font-normal text-slate-600"> / month</span>
                  </motion.div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 pt-4 border-t border-slate-200 text-xs font-sans">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Stockout Revenue Preserved (Tata SKUs):</span>
                  <span className="font-telemetry font-semibold text-slate-900">+₹{stockoutSavings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Presumptive Tax Savings (Sec 44AD @ 6% Digital):</span>
                  <span className="font-telemetry font-semibold text-slate-900">+₹{taxSavingsMonthly.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Distributor Rate Discrepancies Reclaimed (OCR):</span>
                  <span className="font-telemetry font-semibold text-slate-900">+₹{rateDiscrepancyRecovered.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Annualized */}
              <div className="p-4 rounded-xl bg-white border border-[#BCE1F5] shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-slate-500 font-medium">ANNUAL SHOPKEEPER BENEFIT</div>
                  <div className="text-xl font-telemetry font-bold text-slate-900">
                    ₹{(totalShopkeeperGain * 12).toLocaleString('en-IN')}
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800">
                  Zero Upfront Cost
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Tata Group Ecosystem View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Scale Horizon */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 text-left">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="font-semibold text-slate-800">Target Stores Enrolled (Horizon)</span>
                  <span className="font-telemetry font-bold text-[#005691] text-sm">{storeCount.toLocaleString('en-IN')} stores</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="300000"
                  step="5000"
                  value={storeCount}
                  onChange={(e) => setStoreCount(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#005691]"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>500 (Pilot)</span>
                  <span>20,000 (Yr 1)</span>
                  <span>100,000 (Yr 2)</span>
                  <span>300,000 (Yr 3)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs space-y-2 text-slate-700">
                <div className="font-bold text-slate-900">Illustrative Planning Assumptions (Sec 10.2):</div>
                <p className="text-[11px]">
                  • Cost to serve: ~₹125/store/month (telephony, WhatsApp Cloud, hosting)<br />
                  • Incremental Tata portfolio sales: ~₹3,000/store/month<br />
                  • Gross margin contribution to Tata Consumer: 12%<br />
                  • Coverage of cost to serve: <strong>2.88x</strong>
                </p>
              </div>
            </div>

            {/* Right Column: Group Impact */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white via-[#F8FAFC] to-[#EBF6FC] border border-[#BCE1F5] shadow-md space-y-6 text-left">
              <div>
                <span className="text-xs font-mono text-[#005691] font-bold bg-[#EBF6FC] border border-[#BCE1F5] px-3 py-1 rounded-full">
                  ANNUAL TATA GROUP CONTRIBUTION
                </span>
                <div className="mt-4">
                  <div className="text-xs text-slate-600 font-sans">Incremental Annual Tata Portfolio Sales:</div>
                  <motion.div
                    key={incrementalTataSalesAnnual}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="text-4xl sm:text-5xl font-telemetry font-bold text-[#005691] tracking-tight mt-1"
                  >
                    ₹{incrementalTataSalesAnnual} Cr
                    <span className="text-sm font-sans font-normal text-slate-600"> / year</span>
                  </motion.div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200 text-xs font-sans">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Tata Consumer Margin Contribution (12%):</span>
                  <span className="font-telemetry font-semibold text-emerald-800">+₹{tataConsumerMarginCr} Cr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Platform Cost to Serve (TCS Cloud & Telephony):</span>
                  <span className="font-telemetry font-semibold text-slate-600">-₹{costToServeCr} Cr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Tata Capital Stock Credit Book (30% take-up):</span>
                  <span className="font-telemetry font-semibold text-[#00A3E0]">₹{creditBookCr} Cr Book</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#BCE1F5] shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-slate-500 font-medium">NET GROUP PROFIT CONTRIBUTION</div>
                  <div className="text-xl font-telemetry font-bold text-emerald-700">
                    +₹{netTataProfitCr} Crore / yr
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#EBF6FC] text-[#005691]">
                  2.9x Cost Coverage
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
