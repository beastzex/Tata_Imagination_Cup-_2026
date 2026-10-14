'use client';

import React, { useState, useEffect } from 'react';

export const PhoneFrame: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [hasApproved, setHasApproved] = useState<boolean>(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setStep(3);
      setHasApproved(true);
      return;
    }

    const t1 = setTimeout(() => setIsTyping(true), 500);
    const t2 = setTimeout(() => {
      setIsTyping(false);
      setStep(1);
    }, 1600);

    const t3 = setTimeout(() => setIsTyping(true), 2600);
    const t4 = setTimeout(() => {
      setIsTyping(false);
      setStep(2);
    }, 3900);

    const t5 = setTimeout(() => {
      setHasApproved(true);
      setStep(3);
    }, 5800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] mx-auto select-none">
      {/* Sleek phone chassis */}
      <div className="relative rounded-[40px] bg-slate-900 p-3 border border-slate-300 shadow-2xl">
        {/* Top Speaker / Dynamic Island */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-20" />

        {/* Screen glass - Light theme WhatsApp */}
        <div className="relative rounded-[32px] bg-[#F8FAFC] overflow-hidden border border-slate-200 h-[520px] flex flex-col justify-between">
          {/* WhatsApp Header */}
          <div className="pt-7 pb-3 px-4 bg-[#F0F2F5] border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#005691] to-[#00A3E0] flex items-center justify-center text-xs font-bold text-white shadow-xs">
                TS
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-none mb-1 flex items-center gap-1">
                  <span>Tata Dukaan Saathi</span>
                  <span className="text-[10px] text-emerald-600 font-bold">✓</span>
                </h4>
                <p className="text-[10px] text-[#005691] leading-none font-medium">
                  टाटा दुकान साथी • online
                </p>
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">WhatsApp</span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3.5 space-y-3 overflow-y-auto font-sans bg-[#F1F5F9]/60">
            <div className="text-center">
              <span className="text-[10px] text-slate-500 bg-white/90 px-2.5 py-0.5 rounded-full border border-slate-200 shadow-xs">
                TODAY, 7:30 AM
              </span>
            </div>

            {/* Message 1: Morning Voice Pulse */}
            {step >= 1 && (
              <div className="animate-fadeIn max-w-[92%] bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-3 text-xs text-slate-800 space-y-1.5 leading-relaxed shadow-xs">
                <p>
                  Namaste Ramesh ji! Yesterday&apos;s sales were{' '}
                  <span className="text-[#005691] font-mono font-bold">₹19,500 (+14%)</span>.
                </p>
                <p className="text-slate-600 text-[11px]">
                  Tata Pay UPI share was 78%. Evening pantry rush expected between <span className="text-slate-900 font-semibold">6:00 - 8:30 PM</span>.
                </p>
                <div className="text-right text-[9px] text-slate-400 font-mono">7:30 AM</div>
              </div>
            )}

            {/* Message 2: Confirm-Before-Order Voice Guardrail */}
            {step >= 2 && (
              <div className="animate-fadeIn max-w-[92%] bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-3 text-xs text-slate-800 space-y-2.5 leading-relaxed shadow-xs">
                <div className="bg-[#EBF6FC] p-2 rounded-xl border border-[#BCE1F5] text-[11px] text-[#005691] space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <span>📞 Voice Readback Confirmation:</span>
                  </div>
                  <p className="italic">
                    &quot;Tata Salt (2 pkts left) and Tetley Green Tea kal khatam ho jayenge. 20 packet namak aur 5 Tetley. Pakka karun?&quot;
                  </p>
                </div>

                <p className="text-slate-600 text-[11px]">
                  Distributor: <span className="font-semibold text-slate-800">Tata Consumer Direct Hub</span> (Kanpur)
                </p>

                {/* Confirm Guardrail Action Button */}
                <div className="pt-1">
                  <button
                    disabled={hasApproved}
                    onClick={() => {
                      setHasApproved(true);
                      setStep(3);
                    }}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold tracking-tight transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                      hasApproved
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                        : 'bg-gradient-to-r from-[#005691] to-[#00A3E0] text-white hover:opacity-95 active:scale-[0.98]'
                    }`}
                  >
                    {hasApproved ? '✓ Order Confirmed & Routed' : 'हाँ, आर्डर पक्का करो (₹3,420)'}
                  </button>
                </div>
                <div className="text-right text-[9px] text-slate-400 font-mono">7:31 AM</div>
              </div>
            )}

            {/* Message 3: Merchant Reply & Receipt */}
            {step >= 3 && (
              <div className="animate-fadeIn space-y-2">
                <div className="flex justify-end">
                  <div className="max-w-[75%] bg-[#D9FDD3] border border-[#B8F0AF] rounded-2xl rounded-tr-sm p-3 text-xs text-slate-900 leading-relaxed shadow-xs">
                    <p className="font-semibold">हाँ, आर्डर भेज दो।</p>
                    <div className="flex items-center justify-end gap-1 text-[9px] text-teal-700 font-mono mt-1">
                      <span>7:32 AM</span>
                      <span className="font-bold">✓✓</span>
                    </div>
                  </div>
                </div>

                <div className="max-w-[92%] bg-white border border-emerald-200 rounded-2xl rounded-tl-sm p-3 text-xs text-slate-800 space-y-1 shadow-xs">
                  <p className="font-bold text-emerald-800 flex items-center gap-1">
                    <span>✅ Order Dispatched to Distributor:</span>
                  </p>
                  <p className="text-[11px] text-slate-600">
                    PO #ORD-TCP-9921 confirmed. Delivery Slot A (Tomorrow 9:30 AM). Zero stockout guaranteed!
                  </p>
                  <div className="text-right text-[9px] text-slate-400 font-mono">7:32 AM</div>
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1 bg-white border border-slate-200 w-14 p-2 rounded-full shadow-xs">
                <span className="w-1.5 h-1.5 bg-[#005691] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#005691] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#005691] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Bottom Bar with Mic */}
          <div className="p-3 bg-[#F0F2F5] border-t border-slate-200 flex items-center gap-2 text-[11px] text-slate-500">
            <div className="flex-1 bg-white border border-slate-200 rounded-full px-3 py-1.5 font-sans text-slate-600 shadow-xs flex items-center justify-between">
              <span>Hindi voice note or text...</span>
              <span className="text-[10px] font-mono text-[#005691]">हिन्दी</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#005691] text-white flex items-center justify-center text-sm shadow-xs cursor-pointer hover:bg-[#003B66]">
              🎙️
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
