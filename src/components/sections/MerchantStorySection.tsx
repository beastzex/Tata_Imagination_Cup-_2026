'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineMoment {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  badge: string;
  audioText: string;
  actionTaken: string;
  impact: string;
}

const MOMENTS: TimelineMoment[] = [
  {
    id: 'morning',
    time: '07:30 AM',
    title: 'Voice Reorder Call (The Wedge)',
    subtitle: 'Saathi calls Ramesh ji in Hindi before the shutters open with proactive restock suggestions.',
    badge: 'Inbound/Outbound Phone Call',
    audioText: '“नमस्ते रमेश जी! टाटा सॉल्ट और टेटली कल तक खत्म हो जायेंगे। कितने पैकेट भेज दूँ?” — रमेश जी: “दस पैकेट नमक, पांच टेटली।” — साथी: “दस पैकेट नमक, पांच टेटली. पक्का करूँ?” — “हाँ।”',
    actionTaken: 'Confirm-before-order readback passed; order routed to assigned Tata distributor before morning opening.',
    impact: 'Zero typing. Order placed in under 90 seconds.',
  },
  {
    id: 'invoice',
    time: '01:30 PM',
    title: 'Distributor Invoice Rate Audit',
    subtitle: 'Ramesh ji snaps a photo of the distributor delivery challan. AI checks agreed rate cards.',
    badge: 'Multimodal OCR Audit',
    audioText: '“टाटा डिस्ट्रीब्यूटर इनवॉइस में तुअर दाल पर ₹14 प्रति किलो अधिक चार्ज लगा है। ₹140 का क्रेडिट नोट दावा तैयार है।”',
    actionTaken: 'PaddleOCR compared invoice line-items with Tata Consumer contracted wholesale rate card.',
    impact: '₹140 overcharge detected & recovered.',
  },
  {
    id: 'credit',
    time: '06:00 PM',
    title: 'Pre-Festival Surge & Tata Capital Credit',
    subtitle: 'Festival calendar alert signals 2.8x surge for Tata Sampann staples & Ching\'s.',
    badge: 'Tata Capital Micro-Credit',
    audioText: '“दिवाली दो हफ्ते दूर है। किराना बिजनेस स्कोर (84/100) के आधार पर टाटा कैपिटल से ₹15,000 का 15-दिन का स्टॉक क्रेडिट उपलब्ध है।”',
    actionTaken: '1-tap acceptance directly disburses capital to the Tata distributor; zero upfront cash outlay.',
    impact: '₹15,000 instant stock credit unlocked.',
  },
  {
    id: 'advisor',
    time: '10:00 PM',
    title: 'Growth Advisor & 1-Tap CA Summary',
    subtitle: 'Combines online (Tata Pay / UPI) and offline cash into one unified sales ledger.',
    badge: 'Virtual CA & Growth Advisor',
    audioText: '“आज की कुल बिक्री ₹19,500 हुई। धारा 44AD के तहत डिजिटल बिक्री पर 6% प्रिजम्प्टिव टैक्स से ₹70,400 की बचत होगी। सीए रिपोर्ट तैयार है।”',
    actionTaken: 'Formatted clean accounting summary for merchant\'s Chartered Accountant with standard disclaimer.',
    impact: '₹70,400 projected tax savings identified.',
  },
];

export const MerchantStorySection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const current = MOMENTS[activeIdx];

  return (
    <section id="story" className="py-24 sm:py-32 px-4 sm:px-8 border-b border-slate-200/80 bg-gradient-to-b from-[#F4F9FD] via-white to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-left mb-14 space-y-3">
          <div className="text-xs font-mono text-[#005691] font-bold tracking-wide">
            REAL KIRANA WORKFLOW / A DAY WITH SAATHI
          </div>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-slate-950 tracking-tight">
            A day alongside Ramesh Ji.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl leading-relaxed">
            Ramesh never downloads an app. He never types a product code. He simply answers a normal phone call or speaks on WhatsApp, while Tata Dukaan Saathi runs stock forecasting, distributor routing, and credit in the background.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Editorial Store Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-4/3 bg-slate-100 group">
              <Image
                src="/images/merchant-portrait.jpg"
                alt="Ramesh Ji in front of his Kirana Store"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-sm font-bold">Ramesh Gupta, Proprietor</div>
                <div className="text-xs text-slate-200 font-sans">Ramesh Kirana & General Store, Kanpur (Tata Pilot District)</div>
              </div>
            </div>

            {/* Overlapping Inset Image */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-48 h-36 rounded-xl overflow-hidden border-2 border-white shadow-xl bg-slate-100">
              <Image
                src="/images/kirana-store.jpg"
                alt="Organized Kirana store shelves"
                fill
                sizes="192px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Interactive Timeline Experience */}
          <div className="lg:col-span-6 space-y-6">
            {/* Time selector pills */}
            <div className="flex flex-wrap gap-2 pb-2">
              {MOMENTS.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                    activeIdx === idx
                      ? 'bg-[#005691] text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {m.time}
                </button>
              ))}
            </div>

            {/* Animated Moment Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#005691] font-bold bg-[#EBF6FC] border border-[#BCE1F5] px-2.5 py-0.5 rounded-full">
                    {current.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-medium">
                    {current.time}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-headline font-bold text-slate-900">
                    {current.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-sans mt-1 leading-relaxed">
                    {current.subtitle}
                  </p>
                </div>

                {/* Simulated Audio/Notification Pill */}
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs text-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#005691] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-ping" />
                    Saathi Indic Voice Engine / WhatsApp Audio
                  </div>
                  <p className="italic font-sans text-slate-800 leading-relaxed">
                    {current.audioText}
                  </p>
                </div>

                {/* Outcome & Impact */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">ACTION TAKEN</div>
                    <div className="text-slate-700 font-sans font-medium">{current.actionTaken}</div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <div className="text-[11px] font-mono text-[#005691] font-bold">OUTCOME</div>
                    <div className="font-telemetry font-bold text-[#005691]">{current.impact}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
