import React from 'react';
import { X, Printer, Download, CheckCircle, FileText, Calendar, Building, Landmark } from 'lucide-react';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

export default function ReportModal({ isOpen, onClose, transactions, activities }) {
  if (!isOpen) return null;

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  // Breakdown by the user requested key categories
  const sppTotal = transactions
    .filter(t => t.category === 'SPP Bulanan Santri')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const dapurTotal = transactions
    .filter(t => t.category === 'Konsumsi Dapur')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const bisyarahTotal = transactions
    .filter(t => t.category === 'Bisyarah Guru/Asatidz')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pembangunanTotal = transactions
    .filter(t => t.category === 'Pengeluaran untuk Pembangunan' && t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-forest-900 text-white border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-emerald-300" />
            <div>
              <h3 className="text-sm font-bold">Laporan Rekapitulasi Kas & Kegiatan</h3>
              <p className="text-[11px] text-emerald-200">Pondok Pesantren • Periode Oktober 2026</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 print:p-0">
          {/* Official Letterhead */}
          <div className="text-center pb-4 border-b border-gray-200">
            <h2 className="text-base font-extrabold text-gray-900 uppercase tracking-wider">
              Laporan Pertanggungjawaban Keuangan & Kegiatan
            </h2>
            <p className="text-xs font-semibold text-emerald-800">
              PONDOK PESANTREN SALAF & TAHFIDZ AL-QUR'AN
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Tercetak otomatis pada: {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
            </p>
          </div>

          {/* Saldo Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">Total Pemasukan</span>
              <span className="text-xs font-extrabold text-emerald-950 mt-1 block">
                {formatRupiah(totalIncome)}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100 text-center">
              <span className="text-[10px] font-bold text-amber-800 uppercase block">Total Belanja</span>
              <span className="text-xs font-extrabold text-amber-950 mt-1 block">
                {formatRupiah(totalExpense)}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-forest-900 text-white text-center">
              <span className="text-[10px] font-semibold text-emerald-200 uppercase block">Saldo Kas Terkini</span>
              <span className="text-xs font-extrabold text-white mt-1 block">
                {formatRupiah(balance)}
              </span>
            </div>
          </div>

          {/* Breakdown Pos Utama (Kategori Spesifik Pesantren) */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <h4 className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wider">
              Rincian Pos Kategori Prioritas Pesantren
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-gray-200/60">
                <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  SPP Bulanan Santri (Pemasukan)
                </span>
                <span className="font-bold text-emerald-800">{formatRupiah(sppTotal)}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-gray-200/60">
                <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-800" />
                  Konsumsi Dapur & Konsumsi Santri
                </span>
                <span className="font-bold text-gray-900">{formatRupiah(dapurTotal)}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-gray-200/60">
                <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Bisyarah Guru / Asatidz
                </span>
                <span className="font-bold text-gray-900">{formatRupiah(bisyarahTotal)}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  Pengeluaran untuk Pembangunan
                </span>
                <span className="font-bold text-amber-900">{formatRupiah(pembangunanTotal)}</span>
              </div>
            </div>
          </div>

          {/* Ringkasan Agenda Kegiatan */}
          <div>
            <h4 className="text-xs font-bold text-gray-800 mb-2 uppercase tracking-wider">
              Status Kegiatan Santri ({activities.length} Agenda)
            </h4>
            <div className="space-y-1.5">
              {activities.slice(0, 4).map(act => (
                <div key={act.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-white border border-gray-100">
                  <div>
                    <span className="font-bold text-gray-900">{act.title}</span>
                    <span className="text-[10px] text-gray-400 block">{act.date} • PJ: {act.leader}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-semibold text-forest-700">{act.status}</span>
                    <span className="text-[10px] text-gray-500 block font-medium">Realisasi: {formatRupiah(act.spent)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[11px] text-gray-500">
            Amanah, Transparan, & Akuntabel
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer size={15} />
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
