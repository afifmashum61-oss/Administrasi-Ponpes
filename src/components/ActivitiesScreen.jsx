import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  MapPin, 
  User, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search,
  BookOpen,
  DollarSign,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

export default function ActivitiesScreen({ 
  activities, 
  onOpenAddActivityModal,
  onOpenAddExpenseForActivity 
}) {
  const [filterStatus, setFilterStatus] = useState('all'); // all, Berjalan, Persiapan, Rencana, Selesai
  const [search, setSearch] = useState('');

  const filtered = activities.filter(act => {
    const matchStatus = filterStatus === 'all' || act.status === filterStatus;
    const matchSearch = act.title.toLowerCase().includes(search.toLowerCase()) ||
                        act.category.toLowerCase().includes(search.toLowerCase()) ||
                        act.leader.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Berjalan':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Sedang Berjalan
          </span>
        );
      case 'Persiapan':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock size={10} />
            Tahap Persiapan
          </span>
        );
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
            <CheckCircle2 size={10} />
            Selesai
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <AlertCircle size={10} />
            Direncanakan
          </span>
        );
    }
  };

  return (
    <div className="pb-28 px-5 pt-3">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold text-gray-500 block">Agenda & Tarbiyah</span>
          <h2 className="text-base font-bold text-gray-900 tracking-tight">
            Kegiatan Pesantren
          </h2>
        </div>

        <button
          onClick={onOpenAddActivityModal}
          className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold shadow-md active:scale-95 transition-all"
        >
          <Plus size={15} />
          <span>Kegiatan Baru</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Cari kajian, PHBI, ro'an, atau penanggung jawab..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-2.5 pl-9 pr-4 text-xs rounded-2xl bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-forest-600 text-gray-800"
        />
        <Search size={15} className="absolute left-3.5 top-3 text-gray-400" />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-gray-200/60 rounded-2xl shadow-sm mb-5 overflow-x-auto no-scrollbar">
        {['all', 'Berjalan', 'Persiapan', 'Rencana'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all text-center whitespace-nowrap ${
              filterStatus === st
                ? 'bg-forest-900 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {st === 'all' ? 'Semua' : st}
          </button>
        ))}
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-gray-100">
            <BookOpen size={28} className="mx-auto text-gray-300 mb-2" />
            <p className="text-xs text-gray-500 font-medium">Belum ada agenda kegiatan yang cocok.</p>
          </div>
        ) : (
          filtered.map((item) => {
            const pct = item.budget > 0 ? Math.min(100, Math.round((item.spent / item.budget) * 100)) : 0;
            return (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-bold text-forest-700 tracking-wide uppercase block">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                  <div>
                    {getStatusBadge(item.status)}
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-gray-50/80 border border-gray-100 text-[11px] text-gray-600 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-emerald-700 shrink-0" />
                    <span className="truncate">{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-emerald-700 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <User size={13} className="text-emerald-700 shrink-0" />
                    <span className="font-medium text-gray-800">PJ: {item.leader}</span>
                  </div>
                </div>

                {/* Budget vs Expense Progress */}
                <div className="pt-1">
                  <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                    <span className="text-gray-500 text-[11px]">Realisasi Anggaran</span>
                    <span className="font-bold text-gray-900 text-[11px]">
                      {formatRupiah(item.spent)} <span className="text-gray-400 font-normal">/ {formatRupiah(item.budget)}</span>
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        pct > 90 ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-gray-400">
                    <span>{pct}% Terpakai</span>
                    <span className="text-emerald-700 font-semibold">Sisa: {formatRupiah(Math.max(0, item.budget - item.spent))}</span>
                  </div>
                </div>

                {/* Bottom Quick Action for this activity */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-end">
                  <button
                    onClick={() => onOpenAddExpenseForActivity && onOpenAddExpenseForActivity(item)}
                    className="text-[11px] font-bold text-forest-800 hover:text-forest-950 inline-flex items-center gap-1 bg-forest-50 px-3 py-1.5 rounded-xl border border-forest-100 hover:bg-forest-100 transition-colors"
                  >
                    <Plus size={13} />
                    <span>Catat Biaya Kegiatan Ini</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
