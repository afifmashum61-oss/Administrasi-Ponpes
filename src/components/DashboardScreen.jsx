import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Search, 
  Bell, 
  Plus, 
  ArrowUpRight, 
  ArrowLeftRight, 
  MoreHorizontal, 
  ArrowRight,
  TrendingUp,
  Utensils,
  GraduationCap,
  Users,
  Building2,
  Zap,
  CalendarDays,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

export default function DashboardScreen({ 
  transactions, 
  onOpenAddModal, 
  onOpenReportModal, 
  onNavigateToTab,
  onSelectTransaction 
}) {
  const [hideBalance, setHideBalance] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  // Filtered transactions for quick search
  const filteredTransactions = transactions.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Icon mapping according to pesantren categories
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Konsumsi Dapur':
        return <Utensils size={18} className="text-emerald-700" />;
      case 'SPP Bulanan Santri':
        return <GraduationCap size={18} className="text-emerald-700" />;
      case 'Bisyarah Guru/Asatidz':
        return <Users size={18} className="text-emerald-700" />;
      case 'Pengeluaran untuk Pembangunan':
        return <Building2 size={18} className="text-amber-700" />;
      case 'Operasional & Listrik':
        return <Zap size={18} className="text-blue-700" />;
      default:
        return <Sparkles size={18} className="text-emerald-700" />;
    }
  };

  const getCategoryBg = (category) => {
    switch (category) {
      case 'Konsumsi Dapur':
        return 'bg-emerald-100/70 border border-emerald-200/50';
      case 'SPP Bulanan Santri':
        return 'bg-emerald-100/70 border border-emerald-200/50';
      case 'Bisyarah Guru/Asatidz':
        return 'bg-emerald-100/70 border border-emerald-200/50';
      case 'Pengeluaran untuk Pembangunan':
        return 'bg-amber-100/70 border border-amber-200/50';
      default:
        return 'bg-gray-100 border border-gray-200/50';
    }
  };

  return (
    <div className="pb-24 px-5 pt-3">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="text-xs font-semibold text-gray-500 block tracking-tight">Assalamu'alaikum,</span>
          <h2 className="text-base font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
            Pengurus Pondok
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {showSearchInput ? (
            <div className="relative animate-in fade-in zoom-in-95 duration-150">
              <input
                type="text"
                placeholder="Cari transaksi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                onBlur={() => !searchQuery && setShowSearchInput(false)}
                className="w-40 py-1.5 px-3 text-xs rounded-full bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>
          ) : (
            <button 
              onClick={() => setShowSearchInput(true)}
              className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
              title="Cari transaksi"
            >
              <Search size={18} />
            </button>
          )}

          <div className="relative">
            <button 
              onClick={() => onNavigateToTab('activities')}
              className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
              title="Notifikasi & Agenda"
            >
              <Bell size={18} />
            </button>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white" />
          </div>
        </div>
      </div>

      {/* Main Forest Green Card (Total Balance) - Matches Mockup Screen 2 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#123824] via-[#0E2E1F] to-[#081B12] text-white p-5 shadow-float mb-6">
        {/* Subtle decorative mesh rings */}
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />
        <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-emerald-400/10 blur-lg pointer-events-none" />

        {/* Top Card Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Total Saldo Kas</span>
            <button 
              onClick={() => setHideBalance(!hideBalance)}
              className="ml-1 text-emerald-300 hover:text-white transition-colors"
              title={hideBalance ? "Tampilkan Saldo" : "Sembunyikan Saldo"}
            >
              {hideBalance ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          <div className="flex items-center gap-1 text-emerald-300/80">
            <BarChart3 size={18} />
          </div>
        </div>

        {/* Balance Display */}
        <div className="mb-4">
          <div className="text-3xl font-extrabold tracking-tight font-sans text-white">
            {hideBalance ? 'Rp ••••••••••' : formatRupiah(currentBalance)}
          </div>
        </div>

        {/* Bottom Card Row */}
        <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-400/20 text-emerald-300 font-semibold text-[11px]">
            <TrendingUp size={12} />
            <span>+12.6% vs bulan lalu</span>
          </div>

          <div className="text-[11px] text-emerald-200/80">
            <span>Infaq & SPP Terkumpul</span>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons (4 Squircles) - Matches Mockup Screen 2 */}
      <div className="grid grid-cols-4 gap-3 mb-7">
        <button
          onClick={() => onOpenAddModal('income')}
          className="flex flex-col items-center group"
        >
          <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200/70 shadow-sm flex items-center justify-center text-gray-800 group-hover:bg-forest-50 group-hover:border-forest-200 group-hover:text-forest-800 group-active:scale-95 transition-all">
            <Plus size={22} className="stroke-[2.2]" />
          </div>
          <span className="mt-2 text-[11px] font-semibold text-gray-700 text-center leading-tight">
            Kas Masuk
          </span>
        </button>

        <button
          onClick={() => onOpenAddModal('expense')}
          className="flex flex-col items-center group"
        >
          <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200/70 shadow-sm flex items-center justify-center text-gray-800 group-hover:bg-forest-50 group-hover:border-forest-200 group-hover:text-forest-800 group-active:scale-95 transition-all">
            <ArrowUpRight size={22} className="stroke-[2.2]" />
          </div>
          <span className="mt-2 text-[11px] font-semibold text-gray-700 text-center leading-tight">
            Kas Keluar
          </span>
        </button>

        <button
          onClick={() => onNavigateToTab('activities')}
          className="flex flex-col items-center group"
        >
          <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200/70 shadow-sm flex items-center justify-center text-gray-800 group-hover:bg-forest-50 group-hover:border-forest-200 group-hover:text-forest-800 group-active:scale-95 transition-all">
            <ArrowLeftRight size={20} className="stroke-[2.2]" />
          </div>
          <span className="mt-2 text-[11px] font-semibold text-gray-700 text-center leading-tight">
            Kegiatan
          </span>
        </button>

        <button
          onClick={onOpenReportModal}
          className="flex flex-col items-center group"
        >
          <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200/70 shadow-sm flex items-center justify-center text-gray-800 group-hover:bg-forest-50 group-hover:border-forest-200 group-hover:text-forest-800 group-active:scale-95 transition-all">
            <MoreHorizontal size={22} className="stroke-[2.2]" />
          </div>
          <span className="mt-2 text-[11px] font-semibold text-gray-700 text-center leading-tight">
            Laporan
          </span>
        </button>
      </div>

      {/* Summary Mini Cards (SPP & Konsumsi Dapur Highlight) */}
      <div className="grid grid-cols-2 gap-3 mb-7">
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100/80">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
            Total Pemasukan (SPP & Infaq)
          </span>
          <div className="text-sm font-extrabold text-emerald-950 font-sans">
            {formatRupiah(totalIncome)}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100/80">
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
            Total Pengeluaran Pesantren
          </span>
          <div className="text-sm font-extrabold text-amber-950 font-sans">
            {formatRupiah(totalExpense)}
          </div>
        </div>
      </div>

      {/* Recent Transactions Section - Matches Mockup Screen 2 */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm font-bold text-gray-900 tracking-tight">
            Transaksi Terkini
          </h3>
          <button 
            onClick={() => onNavigateToTab('analytics')}
            className="text-xs font-semibold text-forest-700 hover:text-forest-900 flex items-center gap-1 group"
          >
            <span>Lihat Analisis</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-gray-100">
            <p className="text-xs text-gray-500">Tidak ada transaksi ditemukan.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredTransactions.slice(0, 6).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectTransaction && onSelectTransaction(item)}
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-gray-200 hover:shadow transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${getCategoryBg(item.category)}`}>
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-semibold text-gray-500">
                        {item.category}
                      </span>
                      <span className="text-gray-300 text-[10px]">•</span>
                      <span className="text-[10px] text-gray-400">
                        {formatDateIndo(item.date)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-xs font-bold font-sans ${
                    item.type === 'income' ? 'text-emerald-700' : 'text-gray-900'
                  }`}>
                    {item.type === 'income' ? `+ ${formatRupiah(item.amount)}` : `- ${formatRupiah(item.amount)}`}
                  </span>
                  <span className="block text-[9px] text-gray-400 mt-0.5 font-medium">
                    {item.method || 'Kas'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
