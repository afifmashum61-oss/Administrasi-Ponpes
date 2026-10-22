import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, User, DollarSign, Check } from 'lucide-react';

export default function ActivityModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Kajian & Akademik');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('Masjid Jami\' Pondok');
  const [leader, setLeader] = useState('');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState('Persiapan');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const categories = [
    'Kajian & Akademik',
    'Acara Akbar / PHBI',
    'Kebersihan & Asrama (Ro\'an)',
    'Ekstrakurikuler & Olahraga',
    'Munaqasyah & Ujian Tahfidz'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !leader) return;

    onSave({
      id: 'act-' + Date.now(),
      title,
      category,
      date: date || 'Akan diumumkan',
      location,
      leader,
      budget: Number(budget) || 0,
      spent: 0,
      status,
      description: description || 'Kegiatan pembinaan dan kebersamaan santri pondok.'
    });

    onClose();
    // reset form
    setTitle('');
    setLeader('');
    setBudget('');
    setDescription('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-forest-900 text-white">
          <div>
            <h3 className="text-sm font-bold">Tambah Agenda Kegiatan Santri</h3>
            <p className="text-[11px] text-emerald-200">Jadwal & Rencana Anggaran Pesantren</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Judul Kegiatan */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
              Nama Kegiatan Santri *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: PHBI Peringatan Isra Mi'raj / Imtihan Akhir Sanah"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-2.5 px-3.5 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
              Kategori Kegiatan
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full py-2.5 px-3.5 text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Waktu & Lokasi */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                Jadwal / Waktu Pelaksanaan
              </label>
              <input
                type="text"
                placeholder="Contoh: 28 Okt 2026, 20:00"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full py-2.5 px-3 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                Lokasi Kegiatan
              </label>
              <input
                type="text"
                placeholder="Masjid / Aula / Lapangan"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full py-2.5 px-3 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>
          </div>

          {/* Penanggung Jawab & Anggaran */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                Penanggung Jawab (PJ) *
              </label>
              <input
                type="text"
                required
                placeholder="Ustadz / Mudabbir"
                value={leader}
                onChange={(e) => setLeader(e.target.value)}
                className="w-full py-2.5 px-3 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                Rencana Pagu Anggaran
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-gray-400 font-bold">Rp</span>
                <input
                  type="number"
                  placeholder="0"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full py-2.5 pl-9 pr-3 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-600 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
              Deskripsi Singkat / Keperluan
            </label>
            <textarea
              rows={2}
              placeholder="Rincian acara, susunan panitia santri, atau kebutuhan perlengkapan"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full py-2 px-3.5 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
            />
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Check size={16} />
              <span>Jadwalkan Kegiatan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
