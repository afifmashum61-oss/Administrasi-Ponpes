import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  Leaf, 
  ChevronRight, 
  TrendingDown, 
  TrendingUp,
  PieChart,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronDown
} from 'lucide-react';
import { formatRupiah, formatShortRupiah } from '../utils/formatters';

export default function AnalyticsScreen({ 
  transactions, 
  onBackToDashboard, 
  onOpenReportModal 
}) {
  const [activeTab, setActiveTab] = useState('expense'); // 'expense', 'income', 'savings', 'goals'
  const [selectedMonth, setSelectedMonth] = useState('Okt 2026');

  // Filter transactions
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const incomeTransactions = transactions.filter(t => t.type === 'income');

  const totalExpense = expenseTransactions.reduce((acc, curr) => acc + curr.amount, 0);
  const totalIncome = incomeTransactions.reduce((acc, curr) => acc + curr.amount, 0);

  // Group by categories
  const currentDataset = activeTab === 'expense' ? expenseTransactions : incomeTransactions;
  const currentTotal = activeTab === 'expense' ? totalExpense : totalIncome;

  const categoryMap = {};
  currentDataset.forEach(item => {
    categoryMap[item.category] = (categoryMap[item.category] || 0) + item.amount;
  });

  // Color palette for segments
  const palette = [
    { color: '#0D2B1D', light: '#E2F1E8' }, // deep forest green
    { color: '#2A7A50', light: '#E8F5EE' }, // medium emerald
    { color: '#5BBF88', light: '#EEF8F2' }, // mint
    { color: '#D4A373', light: '#FAF4EF' }, // warm sand / gold
    { color: '#805AD5', light: '#F3E8FF' }, // purple
    { color: '#3182CE', light: '#EBF8FF' }, // blue
  ];

  const categoryStats = Object.keys(categoryMap).map((catName, index) => {
    const amount = categoryMap[catName];
    const percentage = currentTotal > 0 ? Math.round((amount / currentTotal) * 100) : 0;
    const pColor = palette[index % palette.length];
    return {
      name: catName,
      amount,
      percentage,
      color: pColor.color,
      light: pColor.light
    };
  }).sort((a, b) => b.amount - a.amount);

  // Monthly trend mock data
  const monthlyTrend = [
    { month: 'Mei', amount: 14500000 },
    { month: 'Jun', amount: 18200000 },
    { month: 'Jul', amount: 16800000 },
    { month: 'Ags', amount: 19400000 },
    { month: 'Sep', amount: 17200000 },
    { month: 'Okt', amount: totalExpense, active: true },
  ];
  const maxTrend = Math.max(...monthlyTrend.map(m => m.amount), 25000000);

  // Calculate SVG Donut parameters
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeAngle = 0;
  const donutSlices = categoryStats.map((cat) => {
    const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativeAngle / 100) * circumference);
    cumulativeAngle += cat.percentage;
    return {
      ...cat,
      strokeDasharray,
      strokeDashoffset
    };
  });

  return (
    <div className="pb-28 px-5 pt-3">
      {/* Top Header - Matches Mockup Screen 3 */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onBackToDashboard}
          className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
        >
          <ChevronLeft size={20} />
        </button>

        <h2 className="text-base font-bold text-gray-900 tracking-tight">
          Analisis Keuangan
        </h2>

        <button 
          onClick={onOpenReportModal}
          className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
          title="Filter Tanggal & Cetak"
        >
          <Calendar size={18} />
        </button>
      </div>

      {/* Pill Filter Tabs - Matches Mockup Screen 3 */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-gray-200/60 rounded-2xl shadow-sm mb-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('expense')}
          className={`flex-1 min-w-[76px] py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
            activeTab === 'expense'
              ? 'bg-forest-900 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Pengeluaran
        </button>
        <button
          onClick={() => setActiveTab('income')}
          className={`flex-1 min-w-[76px] py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
            activeTab === 'income'
              ? 'bg-forest-900 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Pemasukan
        </button>
        <button
          onClick={() => setActiveTab('savings')}
          className={`flex-1 min-w-[76px] py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
            activeTab === 'savings'
              ? 'bg-forest-900 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Kas Santri
        </button>
        <button
          onClick={() => setActiveTab('goals')}
          className={`flex-1 min-w-[76px] py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
            activeTab === 'goals'
              ? 'bg-forest-900 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Anggaran
        </button>
      </div>

      {/* Donut Chart Card */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-900 tracking-tight">
            {activeTab === 'expense' ? 'Pengeluaran Berdasarkan Pos' : 'Pemasukan Kas Pesantren'}
          </h3>
          <div className="flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200/60 px-2.5 py-1 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
            <span>{selectedMonth}</span>
            <ChevronDown size={14} />
          </div>
        </div>

        {/* Donut SVG with center text */}
        <div className="relative flex items-center justify-center my-3">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#E8ECE9"
              strokeWidth={strokeWidth}
            />
            {/* Slices */}
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
                className="transition-all duration-700 ease-out hover:opacity-80"
              />
            ))}
          </svg>

          {/* Centered label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-base font-extrabold text-gray-900 font-sans tracking-tight">
              {formatShortRupiah(currentTotal)}
            </span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
              Total {activeTab === 'expense' ? 'Dikeluarkan' : 'Diterima'}
            </span>
          </div>
        </div>

        {/* Legend Grid (2 columns) - Matches Mockup Screen 3 */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mt-5 pt-4 border-t border-gray-100">
          {categoryStats.map((cat, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 truncate pr-1">
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0" 
                  style={{ backgroundColor: cat.color }}
                />
                <span className="font-semibold text-gray-700 truncate text-[11px]">
                  {cat.name}
                </span>
              </div>
              <span className="font-bold text-gray-900 text-[11px] shrink-0">
                {cat.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Green Leaf Banner (Budget Compliance Notification) - Matches Mockup Screen 3 */}
      <div 
        onClick={onOpenReportModal}
        className="flex items-center justify-between p-4 rounded-3xl bg-[#EAF5EF] border border-[#CDE8D8] shadow-sm mb-5 cursor-pointer hover:bg-[#E2F0E8] transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#D2EBDC] flex items-center justify-center text-emerald-800 shrink-0">
            <Leaf size={20} className="fill-emerald-800/20" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-950">
              12% di bawah pagu anggaran!
            </h4>
            <p className="text-[11px] text-emerald-800/80 mt-0.5 leading-snug">
              Alhamdulillah, belanja dapur dan pos pembangunan sangat terkendali bulan ini.
            </p>
          </div>
        </div>
        <ChevronRight size={18} className="text-emerald-700 shrink-0 ml-1" />
      </div>

      {/* Monthly Trend Section (Bar Chart) - Matches Mockup Screen 3 */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-900 tracking-tight">
            Tren Pengeluaran Bulanan
          </h3>
          <span className="text-[11px] font-semibold text-gray-400">
            Mei - Okt 2026
          </span>
        </div>

        {/* Bar chart canvas */}
        <div className="relative pt-6 pb-2">
          {/* Active tooltip badge */}
          <div className="absolute top-0 right-1 px-2.5 py-1 rounded-lg bg-forest-900 text-white text-[10px] font-bold shadow-md">
            {formatShortRupiah(totalExpense)}
          </div>

          <div className="flex items-end justify-between h-36 gap-2 pt-2 border-b border-gray-100 pb-2">
            {monthlyTrend.map((item, idx) => {
              const heightPct = Math.max(15, Math.round((item.amount / maxTrend) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full h-28 flex items-end justify-center">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full max-w-[26px] rounded-lg transition-all duration-500 ${
                        item.active
                          ? 'bg-forest-900 shadow-md ring-2 ring-forest-700/20'
                          : 'bg-[#C3D5CA] hover:bg-[#A8C2B2]'
                      }`}
                      title={`${item.month}: ${formatRupiah(item.amount)}`}
                    />
                  </div>
                  <span className={`text-[10px] font-bold ${
                    item.active ? 'text-forest-950 font-extrabold' : 'text-gray-400'
                  }`}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-3 text-[10px] text-gray-400">
            <span>Rata-rata: Rp 17,6 Jt / bulan</span>
            <span className="font-semibold text-emerald-700">Audit Sesuai SOP Pesantren</span>
          </div>
        </div>
      </div>
    </div>
  );
}
