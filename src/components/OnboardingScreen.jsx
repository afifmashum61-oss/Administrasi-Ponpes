import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function OnboardingScreen({ onGetStarted }) {
  return (
    <div className="relative min-h-[720px] h-full flex flex-col justify-between p-6 bg-gradient-to-b from-[#123824] via-[#0D2B1D] to-[#071910] text-white rounded-[38px] overflow-hidden select-none">
      {/* Background soft ambient glows */}
      <div className="absolute top-10 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-24 -left-16 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header / Progress */}
      <div className="flex items-center justify-between pt-2 z-10">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold tracking-wider text-emerald-200/90 font-mono">01 / 03</span>
          <div className="w-14 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-emerald-400 rounded-full" />
          </div>
        </div>
        <button 
          onClick={onGetStarted}
          className="text-xs font-medium text-emerald-200/80 hover:text-white transition-colors px-2 py-1"
        >
          Lewati
        </button>
      </div>

      {/* Center Hero Typography */}
      <div className="my-auto pt-4 z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[11px] font-medium text-emerald-300 mb-4 backdrop-blur-sm">
          <Sparkles size={12} className="text-emerald-300" />
          <span>Sistem Terpadu Pondok Pesantren</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white leading-[1.15]">
          Kelola Berkah, <br />
          <span className="text-emerald-300">Menata Amanah</span>
        </h1>
        
        <p className="mt-3 text-sm text-emerald-100/75 leading-relaxed max-w-[280px]">
          Catat SPP santri, konsumsi dapur, bisyarah asatidz, pembangunan hingga kegiatan santri — rapi dalam satu genggaman.
        </p>

        {/* 3D Wallet & Card Graphic Simulation */}
        <div className="relative mt-8 mb-4 flex items-center justify-center">
          {/* Decorative layered cards */}
          <div className="relative w-64 h-48 flex items-center justify-center">
            {/* Ambient shadow disk */}
            <div className="absolute bottom-2 w-48 h-8 bg-black/40 rounded-full blur-md" />

            {/* Back Card (Credit / SPP Santri Card) */}
            <div className="absolute top-2 w-48 h-28 rounded-2xl bg-gradient-to-tr from-[#98A39C] to-[#BAC5BD] p-3 text-gray-800 shadow-xl border border-white/20 transform -rotate-6 transition-transform hover:-rotate-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold tracking-wider uppercase text-gray-700">KARTU SANTRI</span>
                <div className="w-6 h-4 rounded bg-amber-400/80 flex items-center justify-center text-[7px] font-bold text-amber-900">
                  CHIP
                </div>
              </div>
              <div className="mt-4 text-xs font-mono tracking-widest text-gray-800 font-semibold">
                •••• 8824
              </div>
              <div className="mt-2 text-[9px] text-gray-600 font-medium">
                PONDOK PESANTREN
              </div>
            </div>

            {/* Front Wallet 3D Element */}
            <div className="relative z-10 w-44 h-36 rounded-2xl bg-gradient-to-b from-[#1E5739] via-[#14422A] to-[#0A2617] border border-emerald-400/40 p-4 shadow-2xl flex flex-col justify-between transform rotate-3 hover:rotate-0 transition-transform">
              <div className="flex justify-between items-center">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-300/30 flex items-center justify-center">
                  <ShieldCheck size={16} className="text-emerald-300" />
                </div>
                <div className="w-5 h-5 rounded-full bg-amber-300/90 border border-amber-200/50 shadow-inner flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-600" />
                </div>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-wider text-emerald-200/70 font-semibold block">Kas Utama</span>
                <span className="text-sm font-bold text-white tracking-wide">Pondok Pesantren</span>
              </div>

              {/* Stitching effect */}
              <div className="absolute inset-1.5 border border-dashed border-emerald-400/20 rounded-xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-2 pb-2 z-10">
        <button
          onClick={onGetStarted}
          className="w-full py-4 px-6 rounded-full bg-white text-forest-900 font-semibold text-sm shadow-lg hover:bg-emerald-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          <span>Mulai Sekarang</span>
          <ArrowRight size={18} className="text-forest-900 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
