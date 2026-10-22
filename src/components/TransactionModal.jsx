import React, { useState, useEffect } from 'react';
import { X, Plus, ArrowUpRight, ArrowDownLeft, Check } from 'lucide-react';

export default function TransactionModal({ isOpen, onClose, onSave, initialType = 'income', prefillData = null }) {
  const [type, setType] = useState(initialType);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [method, setMethod] = useState('Kas Tunai');
  const [note, setNote] = useState('');

  const incomeCategories = [
    'SPP Bulanan Santri',
    'Infaq & Wakaf Pembangunan',
    'Sumbangan Donatur',
    'Unit Usaha / Koperasi'
  ];

  const expenseCategories = [
    'Konsumsi Dapur',
    'Bisyarah Guru/Asatidz',
    'Pengeluaran untuk Pembangunan',
    'Operasional & Listrik',
    'Kegiatan Santri'
  ];

  useEffect(() => {
    if (isOpen) {
      setType(initialType);
      if (prefillData) {
        setTitle(prefillData.title || '');
        setCategory(prefillData.category || (initialType === 'income' ? incomeCategories[0] : expenseCategories[0]));
        setAmount(prefillData.amount ? String(prefillData.amount) : '');
        setNote(prefillData.note || '');
      } else {
        setTitle('');
        setCategory(initialType === 'income' ? incomeCategories[0] : expenseCategories[0]);
        setAmount('');
        setNote('');
      }
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [isOpen, initialType, prefillData]);

  // When type changes, update default category
  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(newType === 'income' ? incomeCategories[0] : expenseCategories[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || Number(amount) <= 0) return;

    onSave({
      id: 'tx-' + Date.now(),
      title,
      category,
      type,
      amount: Number(amount),
      date,
      method,
      note
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-forest-900 text-white">
          <div>
            <h3 className="text-sm font-bold">Catat Transaksi Kas</h3>
            <p className="text-[11px] text-emerald-200">Administrasi Keuangan Pondok Pesantren</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Type Selector (Pemasukan vs Pengeluaran) */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-2xl">
            <button
              type="button"
              onClick={() => handleTypeChange('income')}
              className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                type === 'income'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ArrowDownLeft size={15} />
              <span>Kas Masuk (SPP/Infaq)</span>
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('expense')}
              className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                type === 'expense'
                  ? 'bg-forest-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ArrowUpRight size={15} />
              <span>Kas Keluar (Belanja)</span>
            </button>
          </div>

          {/* Nominal Input */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
              Nominal (Rupiah) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-xs font-bold text-gray-400">Rp</span>
              <input
                type="number"
                required
                min="1000"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full py-2.5 pl-11 pr-4 text-sm font-extrabold text-gray-900 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>
          </div>

          {/* Kategori Khusus Pesantren */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
              Pos Kategori *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full py-2.5 px-3.5 text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
            >
              {(type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Judul Transaksi */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
              Keterangan / Nama Transaksi *
            </label>
            <input
              type="text"
              required
              placeholder={type === 'income' ? 'Contoh: SPP Syahriah Santri Kelas 2' : 'Contoh: Belanja Beras & Sayur Dapur Utama'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-2.5 px-3.5 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
            />
          </div>

          {/* Grid Tanggal & Metode */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                Tanggal
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full py-2.5 px-3 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                Metode Kas
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full py-2.5 px-3 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
              >
                <option value="Kas Tunai">Kas Tunai Bendahara</option>
                <option value="Transfer Bank Syariah">Transfer BSI (Bank Syariah)</option>
                <option value="QRIS / Digital">QRIS Masjid / Pondok</option>
              </select>
            </div>
          </div>

          {/* Catatan / Rincian Tambahan */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
              Catatan Nota / Jumlah Santri / Supplier
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Nota No. 481, Toko Bangunan Berkah / Untuk 25 santri"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full py-2 px-3.5 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
            />
          </div>

          {/* Action Buttons */}
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
              <span>Simpan Catatan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
