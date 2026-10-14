import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tata Dukaan Saathi | Voice-First AI Reorder, Growth & Credit for 12M Kiranas',
  description:
    'A voice-first AI assistant that lets any kirana reorder stock, grow sales, save tax under Section 44AD, and access small-ticket stock credit from Tata Capital, powered by Tata Consumer Products, Tata Pay, and TCS. Built for Tata Imagination Cup 2026.',
  keywords: [
    'Tata Dukaan Saathi',
    'Tata Imagination Cup 2026',
    'Tata Consumer Products',
    'Tata Capital',
    'Tata Pay',
    'TCS',
    'Kirana AI',
    'Voice AI Reorder',
    'Confirm Before Order',
    'Kirana Business Score',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-white text-slate-900">
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-[#005691] selection:text-white">
        {children}
      </body>
    </html>
  );
}
