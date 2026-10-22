import React, { useState } from 'react';
import { 
  Home, 
  PieChart, 
  CalendarDays, 
  Landmark, 
  Plus, 
  FileText, 
  Eye, 
  EyeOff, 
  TrendingUp, 
  Search, 
  Utensils, 
  GraduationCap, 
  Users, 
  Building2, 
  Zap, 
  Sparkles, 
  Leaf, 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  CheckCircle2, 
  Smartphone,
  ChevronRight,
  Filter,
  Download,
  Printer
} from 'lucide-react';
import { formatRupiah, formatShortRupiah, formatDateIndo } from '../utils/formatters';

export default function DesktopView({
  transactions,
  activities,
  onOpenAddModal,
  onOpenAddActivityModal,
  onOpenReportModal,
  onOpenAddExpenseForActivity,
  onSwitchToMockupMode,
  onResetData
}) {
  const [activeMenu, setActiveMenu] = useState('overview'); // 'overview', 'analytics', 'activities', 'profile'
  const [hideBalance, setHideBalance] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Calculations
  const incomeTx = transactions.filter(t => t.type === 'income');
  const expenseTx = transactions.filter(t => t.type === 'expense');

  const totalIncome = incomeTx.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expenseTx.reduce((acc, curr) => acc + curr.amount, 0);
  const currentBalance = totalIncome - totalExpense;

  // Specific Categories
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

  // Filtered transactions
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.note && t.note.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Grouping for Donut Chart
  const expenseCategoryMap = {};
  expenseTx.forEach(item => {
    expenseCategoryMap[item.category] = (expenseCategoryMap[item.category] || 0) + item.amount;
  });

  const palette = ['#0D2B1D', '#2A7A50', '#5BBF88', '#D4A373', '#805AD5', '#3182CE'];
  const categoryStats = Object.keys(expenseCategoryMap).map((catName, idx) => {
    const amount = expenseCategoryMap[catName];
    const percentage = totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;
    return {
      name: catName,
      amount,
      percentage,
      color: palette[idx % palette.length]
    };
  }).sort((a, b) => b.amount - a.amount);

  // SVG Donut
  const size = 160;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulativeAngle = 0;
  const donutSlices = categoryStats.map((cat) => {
    const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativeAngle / 100) * circumference);
    cumulativeAngle += cat.percentage;
    return { ...cat, strokeDasharray, strokeDashoffset };
  });

  // Monthly trend
  const monthlyTrend = [
    { month: 'Mei', amount: 14500000 },
    { month: 'Jun', amount: 18200000 },
    { month: 'Jul', amount: 16800000 },
    { month: 'Ags', amount: 19400000 },
    { month: 'Sep', amount: 17200000 },
    { month: 'Okt', amount: totalExpense, active: true },
  ];
  const maxTrend = Math.max(...monthlyTrend.map(m => m.amount), 25000000);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Konsumsi Dapur':
        return <Utensils size={16} className="text-emerald-700" />;
      case 'SPP Bulanan Santri':
        return <GraduationCap size={16} className="text-emerald-700" />;
      case 'Bisyarah Guru/Asatidz':
        return <Users size={16} className="text-emerald-700" />;
      case 'Pengeluaran untuk Pembangunan':
        return <Building2 size={16} className="text-amber-700" />;
      case 'Operasional & Listrik':
        return <Zap size={16} className="text-blue-700" />;
      default:
        return <Sparkles size={16} className="text-emerald-700" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F2] flex text-gray-900 font-sans">
      {/* Left Sidebar */}
      <aside className="w-64 bg-forest-900 text-white flex flex-col justify-between p-5 shrink-0 shadow-xl">
        <div>
          {/* Institution Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-white/10">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-300 font-extrabold text-lg shadow-inner">
              🕌
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-tight text-white leading-tight">
                Al-Barkah Ponpes
              </h2>
              <span className="text-[10px] text-emerald-300 font-medium block">
                Sistem Keuangan & Kegiatan
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            <button
              onClick={() => setActiveMenu('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                activeMenu === 'overview'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shadow-sm'
                  : 'text-emerald-100/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Home size={18} />
              <span>Beranda & Transaksi Kas</span>
            </button>

            <button
              onClick={() => setActiveMenu('analytics')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                activeMenu === 'analytics'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shadow-sm'
                  : 'text-emerald-100/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <PieChart size={18} />
              <span>Analisis & Anggaran</span>
            </button>

            <button
              onClick={() => setActiveMenu('activities')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                activeMenu === 'activities'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shadow-sm'
                  : 'text-emerald-100/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <CalendarDays size={18} />
              <span>Agenda Kegiatan Santri</span>
            </button>

            <button
              onClick={() => setActiveMenu('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                activeMenu === 'profile'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shadow-sm'
                  : 'text-emerald-100/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Landmark size={18} />
              <span>Profil & Lembaga</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <span className="text-[10px] text-emerald-200/70 block">Rekening Kas Utama</span>
            <span className="font-bold text-white block">BSI (Bank Syariah)</span>
            <span className="text-[10px] font-mono text-emerald-300">7120-9938-21</span>
          </div>

          <button
            onClick={onSwitchToMockupMode}
            className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/10"
            title="Buka tampilan frame presentasi HP"
          >
            <Smartphone size={14} />
            <span>Mode Mockup HP</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-8 py-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 block">Assalamu'alaikum Warahmatullah,</span>
            <h1 className="text-lg font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              Pengurus Pondok Pesantren
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                420 Santri Aktif
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReportModal}
              className="py-2.5 px-4 rounded-2xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <Printer size={15} />
              <span>Cetak Laporan</span>
            </button>

            <button
              onClick={onOpenAddActivityModal}
              className="py-2.5 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>Jadwal Kegiatan</span>
            </button>

            <button
              onClick={() => onOpenAddModal('income')}
              className="py-2.5 px-4 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>Catat Kas Transaksi</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-8 space-y-8 max-w-7xl">
          {/* TAB 1: OVERVIEW (BERANDA & TRANSAKSI) */}
          {(activeMenu === 'overview' || activeMenu === 'analytics') && (
            <>
              {/* 4 Primary KPI Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Saldo Kas Utama Card */}
                <div className="p-5 rounded-3xl bg-forest-900 text-white shadow-float relative overflow-hidden flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Total Saldo Kas
                    </span>
                    <button
                      onClick={() => setHideBalance(!hideBalance)}
                      className="text-emerald-300 hover:text-white transition-colors"
                      title={hideBalance ? "Tampilkan" : "Sembunyikan"}
                    >
                      {hideBalance ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-white tracking-tight">
                      {hideBalance ? 'Rp ••••••••••' : formatRupiah(currentBalance)}
                    </div>
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-white/10 px-2 py-0.5 rounded-full mt-2">
                      <TrendingUp size={11} />
                      <span>+12.6% vs bulan lalu</span>
                    </div>
                  </div>
                </div>

                {/* SPP Bulanan Santri Card */}
                <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      SPP Bulanan Santri
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <GraduationCap size={16} />
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-emerald-900 tracking-tight">
                      {formatRupiah(sppTotal)}
                    </div>
                    <span className="text-[11px] text-gray-400 mt-1 block">
                      Pemasukan kas santri bulan berjalan
                    </span>
                  </div>
                </div>

                {/* Konsumsi Dapur Card */}
                <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Konsumsi Dapur Santri
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Utensils size={16} />
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-gray-900 tracking-tight">
                      {formatRupiah(dapurTotal)}
                    </div>
                    <span className="text-[11px] text-gray-400 mt-1 block">
                      Bahan pokok & operasional makan santri
                    </span>
                  </div>
                </div>

                {/* Bisyarah & Pembangunan Card */}
                <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Bisyarah & Pembangunan
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                      <Building2 size={16} />
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-gray-900 tracking-tight">
                      {formatRupiah(bisyarahTotal + pembangunanTotal)}
                    </div>
                    <span className="text-[11px] text-gray-400 mt-1 block">
                      Honor asatidz & material gedung
                    </span>
                  </div>
                </div>
              </div>

              {/* Two Column Grid for Desktop: Transactions Table & Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left (7 Columns): Transactions Table */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 tracking-tight">
                        Riwayat Transaksi Kas
                      </h3>
                      <p className="text-xs text-gray-400">Daftar arus kas masuk dan keluar pondok</p>
                    </div>

                    {/* Filter Category & Search */}
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Cari transaksi..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="py-1.5 pl-8 pr-3 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
                        />
                        <Search size={14} className="absolute left-2.5 top-2 text-gray-400" />
                      </div>

                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="py-1.5 px-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-700"
                      >
                        <option value="all">Semua Pos</option>
                        <option value="SPP Bulanan Santri">SPP Bulanan Santri</option>
                        <option value="Konsumsi Dapur">Konsumsi Dapur</option>
                        <option value="Bisyarah Guru/Asatidz">Bisyarah Guru/Asatidz</option>
                        <option value="Pengeluaran untuk Pembangunan">Pembangunan</option>
                      </select>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] font-bold">
                          <th className="pb-3 font-semibold">Transaksi</th>
                          <th className="pb-3 font-semibold">Pos Kategori</th>
                          <th className="pb-3 font-semibold">Tanggal</th>
                          <th className="pb-3 font-semibold">Metode</th>
                          <th className="pb-3 text-right font-semibold">Nominal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filteredTransactions.slice(0, 8).map((tx) => (
                          <tr key={tx.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="py-3 pr-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                                  {getCategoryIcon(tx.category)}
                                </div>
                                <div>
                                  <span className="font-bold text-gray-900 block line-clamp-1">{tx.title}</span>
                                  {tx.note && (
                                    <span className="text-[10px] text-gray-400 block line-clamp-1">{tx.note}</span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">
                                {tx.category}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-gray-500 text-[11px] whitespace-nowrap">
                              {formatDateIndo(tx.date)}
                            </td>
                            <td className="py-3 px-2 text-gray-500 text-[11px] whitespace-nowrap">
                              {tx.method || 'Kas Tunai'}
                            </td>
                            <td className="py-3 pl-2 text-right whitespace-nowrap font-bold">
                              <span className={tx.type === 'income' ? 'text-emerald-700' : 'text-gray-900'}>
                                {tx.type === 'income' ? `+ ${formatRupiah(tx.amount)}` : `- ${formatRupiah(tx.amount)}`}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right (5 Columns): Donut Chart & Pagu Anggaran */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Donut Chart Box */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                          Proporsi Belanja Kas
                        </h3>
                        <p className="text-[11px] text-gray-400">Alokasi anggaran berdasarkan pos prioritas</p>
                      </div>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200">
                        Okt 2026
                      </span>
                    </div>

                    {/* Donut SVG */}
                    <div className="relative flex items-center justify-center my-4">
                      <svg width={size} height={size} className="transform -rotate-90">
                        <circle
                          cx={size / 2}
                          cy={size / 2}
                          r={radius}
                          fill="transparent"
                          stroke="#EEF2EE"
                          strokeWidth={strokeWidth}
                        />
                        {donutSlices.map((slice, i) => (
                          <circle
                            key={i}
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="transparent"
                            stroke={slice.color}
                            strokeWidth={strokeWidth}
                            strokeDasharray={slice.strokeDasharray}
                            strokeDashoffset={slice.strokeDashoffset}
                            strokeLinecap="round"
                          />
                        ))}
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                        <span className="text-base font-extrabold text-gray-900 font-sans">
                          {formatShortRupiah(totalExpense)}
                        </span>
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                          Total Belanja
                        </span>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="space-y-2 pt-3 border-t border-gray-100">
                      {categoryStats.map((cat, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                            <span className="font-semibold text-gray-700 text-[11px]">{cat.name}</span>
                          </div>
                          <span className="font-bold text-gray-900 text-[11px]">{cat.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Leaf Budget Banner */}
                  <div className="p-4 rounded-3xl bg-[#EAF5EF] border border-[#CDE8D8] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#D2EBDC] flex items-center justify-center text-emerald-800 shrink-0">
                        <Leaf size={20} className="fill-emerald-800/20" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-emerald-950">
                          Pagu Anggaran Terkendali (12% di bawah pagu)
                        </h4>
                        <p className="text-[11px] text-emerald-800/80 mt-0.5">
                          Pos konsumsi dapur santri dan pembangunan berjalan efisien sesuai amanah.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: ACTIVITIES / KEGIATAN SANTRI */}
          {(activeMenu === 'activities' || activeMenu === 'overview') && (
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 tracking-tight">
                    Agenda & Kegiatan Santri Pondok Pesantren
                  </h3>
                  <p className="text-xs text-gray-400">Jadwal pengajian, PHBI, ro'an kerja bakti, dan realisasi anggaran</p>
                </div>
                <button
                  onClick={onOpenAddActivityModal}
                  className="py-2 px-3.5 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Tambah Kegiatan</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {activities.map((act) => {
                  const pct = act.budget > 0 ? Math.min(100, Math.round((act.spent / act.budget) * 100)) : 0;
                  return (
                    <div key={act.id} className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/70 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                            {act.category}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {act.status}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 mb-1">{act.title}</h4>
                        <p className="text-[11px] text-gray-500 mb-3 line-clamp-2">{act.description}</p>

                        <div className="space-y-1 text-[11px] text-gray-600 mb-3 bg-white p-2.5 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} className="text-emerald-700" />
                            <span>{act.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-emerald-700" />
                            <span>{act.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User size={12} className="text-emerald-700" />
                            <span className="font-semibold text-gray-800">PJ: {act.leader}</span>
                          </div>
                        </div>
                      </div>

                      {/* Budget vs Expense */}
                      <div>
                        <div className="flex justify-between text-[11px] font-bold mb-1">
                          <span className="text-gray-500">Anggaran:</span>
                          <span>{formatRupiah(act.spent)} / {formatRupiah(act.budget)}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden mb-2">
                          <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <button
                          onClick={() => onOpenAddExpenseForActivity(act)}
                          className="w-full py-1.5 rounded-xl bg-white border border-gray-200 text-forest-900 hover:bg-forest-50 text-[11px] font-bold transition-all"
                        >
                          + Catat Biaya Kegiatan
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: PROFIL LEMBAGA */}
          {activeMenu === 'profile' && (
            <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm max-w-3xl">
              <h3 className="text-base font-bold text-gray-900 mb-4">Profil Lembaga Pondok Pesantren</h3>
              <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-400 block text-[10px] font-bold uppercase">Nama Pondok</span>
                  <span className="text-sm font-bold text-gray-900 mt-1 block">Pondok Pesantren Al-Barkah</span>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-400 block text-[10px] font-bold uppercase">Pengasuh</span>
                  <span className="text-sm font-bold text-gray-900 mt-1 block">K.H. Sholehuddin, M.Pd.</span>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-400 block text-[10px] font-bold uppercase">Nomor Statistik (NSPP)</span>
                  <span className="text-sm font-bold text-gray-900 mt-1 block">510032040089</span>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-400 block text-[10px] font-bold uppercase">Jumlah Santri Mukim</span>
                  <span className="text-sm font-bold text-gray-900 mt-1 block">420 Santri (Putra & Putri)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={onResetData}
                  className="py-2.5 px-4 rounded-2xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-all"
                >
                  Reset ke Data Awal
                </button>
                <button
                  onClick={onOpenReportModal}
                  className="py-2.5 px-4 rounded-2xl bg-forest-900 text-white hover:bg-forest-800 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Printer size={15} />
                  <span>Cetak Buku Kas Pondok</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
