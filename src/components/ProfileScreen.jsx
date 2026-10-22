import React from 'react';
import { 
  Building2, 
  Users, 
  CreditCard, 
  ShieldCheck, 
  Download, 
  RotateCcw, 
  HelpCircle,
  ChevronRight,
  BookMarked,
  PhoneCall
} from 'lucide-react';

export default function ProfileScreen({ 
  transactionsCount, 
  activitiesCount, 
  onResetData, 
  onOpenReportModal 
}) {
  return (
    <div className="pb-28 px-5 pt-3">
      {/* Header */}
      <div className="mb-5">
        <span className="text-xs font-semibold text-gray-500 block">Profil Lembaga</span>
        <h2 className="text-base font-bold text-gray-900 tracking-tight">
          Pondok Pesantren
        </h2>
      </div>

      {/* Pesantren Card Profile */}
      <div className="p-5 rounded-3xl bg-forest-900 text-white shadow-float mb-5 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />
        
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-300 font-extrabold text-xl shadow-inner">
            🕌
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Pondok Pesantren Al-Barkah
            </h3>
            <p className="text-xs text-emerald-200/80">Salaf & Tahfidzul Qur'an Terpadu</p>
            <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-emerald-300 bg-white/10 px-2 py-0.5 rounded-full">
              <ShieldCheck size={11} />
              <span>NSPP: 510032040089</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs">
          <div>
            <span className="text-[10px] text-emerald-200/70 block">Pengasuh Pondok</span>
            <span className="font-bold text-white">K.H. Sholehuddin, M.Pd.</span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-200/70 block">Total Santri Aktif</span>
            <span className="font-bold text-white">420 Santri (Putra & Putri)</span>
          </div>
        </div>
      </div>

      {/* Statistics Quick Counter */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
            Catatan Transaksi
          </span>
          <span className="text-base font-extrabold text-forest-900 mt-0.5 block">
            {transactionsCount} Transaksi
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
            Agenda Kegiatan
          </span>
          <span className="text-base font-extrabold text-forest-900 mt-0.5 block">
            {activitiesCount} Kegiatan
          </span>
        </div>
      </div>

      {/* Menu Settings */}
      <div className="bg-white rounded-3xl p-3 border border-gray-100 shadow-sm space-y-1 mb-5">
        <button 
          onClick={onOpenReportModal}
          className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Download size={16} />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-800 block">Unduh / Cetak Laporan Keuangan</span>
              <span className="text-[10px] text-gray-400">Format siap cetak untuk rapat pengurus & wali santri</span>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>

        <div className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
              <CreditCard size={16} />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-800 block">Rekening Kas Utama Pondok</span>
              <span className="text-[10px] text-gray-400">BSI (Bank Syariah Indonesia) - No: 7120993821</span>
            </div>
          </div>
        </div>

        <button 
          onClick={onResetData}
          className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-rose-50 transition-colors text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center group-hover:bg-rose-100">
              <RotateCcw size={16} />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-700 block">Reset ke Data Contoh Awal</span>
              <span className="text-[10px] text-gray-400">Mengembalikan data simulasi pesantren</span>
            </div>
          </div>
          <ChevronRight size={16} className="text-rose-400" />
        </button>
      </div>

      <div className="text-center text-[10px] text-gray-400 py-2">
        Aplikasi Web Pengelolaan Kas & Kegiatan Pondok Pesantren v1.0.0
      </div>
    </div>
  );
}
