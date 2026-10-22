// Initial data for Pesantren Cashflow & Activities

export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-1',
    title: 'Konsumsi Dapur Santri',
    category: 'Konsumsi Dapur',
    type: 'expense',
    amount: 3250000,
    date: '2026-10-22',
    note: 'Belanja bahan pokok (beras, sayur, lauk) untuk dapur umum 350 santri',
    method: 'Kas Tunai'
  },
  {
    id: 'tx-2',
    title: 'SPP Syahriah Kelas 3 Aliyah',
    category: 'SPP Bulanan Santri',
    type: 'income',
    amount: 14500000,
    date: '2026-10-21',
    note: 'Pembayaran SPP 29 santri (@Rp 500.000)',
    method: 'Transfer Bank Syariah'
  },
  {
    id: 'tx-3',
    title: 'Bisyarah Ustadz & Guru Tahfidz',
    category: 'Bisyarah Guru/Asatidz',
    type: 'expense',
    amount: 8750000,
    date: '2026-10-20',
    note: 'Honor bulanan 7 pengajar tahfidz dan asatidz kitab kuning',
    method: 'Transfer Bank Syariah'
  },
  {
    id: 'tx-4',
    title: 'Bahan Bangunan Asrama Baru',
    category: 'Pengeluaran untuk Pembangunan',
    type: 'expense',
    amount: 6800000,
    date: '2026-10-18',
    note: 'Semen 80 sak, pasir pasang, dan besi beton untuk lantai 2 asrama',
    method: 'Kas Tunai'
  },
  {
    id: 'tx-5',
    title: 'SPP Syahriah Santri Tsanawiyah',
    category: 'SPP Bulanan Santri',
    type: 'income',
    amount: 19200000,
    date: '2026-10-17',
    note: 'Pembayaran SPP 48 santri Tsanawiyah',
    method: 'Transfer Bank Syariah'
  },
  {
    id: 'tx-6',
    title: 'Belanja Gas & Dapur Tambahan',
    category: 'Konsumsi Dapur',
    type: 'expense',
    amount: 850000,
    date: '2026-10-16',
    note: 'Isi ulang 6 tabung gas LPG 12kg dapur santri putri',
    method: 'Kas Tunai'
  },
  {
    id: 'tx-7',
    title: 'Infaq Pembangunan Asrama',
    category: 'Pengeluaran untuk Pembangunan', // Or Donasi Pembangunan
    type: 'income',
    amount: 7500000,
    date: '2026-10-15',
    note: 'Infaq jariyah dari H. Ridwan (Wali santri alumni)',
    method: 'Transfer Bank Syariah'
  },
  {
    id: 'tx-8',
    title: 'Bisyarah Guru Ekstrakurikuler',
    category: 'Bisyarah Guru/Asatidz',
    type: 'expense',
    amount: 2200000,
    date: '2026-10-14',
    note: 'Honor pelatih hadroh, kaligrafi, dan beladiri santri',
    method: 'Kas Tunai'
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: 'act-1',
    title: 'Kajian Kitab Fathul Qorib Mingguan',
    category: 'Kajian & Akademik',
    date: 'Setiap Malam Kamis, 20:00 WIB',
    location: 'Masjid Jami\' Pondok',
    leader: 'K.H. Ahmad Dahlan, Lc.',
    budget: 600000,
    spent: 450000,
    status: 'Berjalan',
    participants: 'Seluruh Santri Ula & Wustha',
    description: 'Pengajian rutin fiqih madzhab Syafi\'i serta tanya jawab keagamaan.'
  },
  {
    id: 'act-2',
    title: 'Peringatan Hari Santri & PHBI',
    category: 'Acara Akbar / PHBI',
    date: '24 Oktober 2026',
    location: 'Halaman Utama & Gedung Serbaguna',
    leader: 'Ustadz Muhammad Fatih',
    budget: 7500000,
    spent: 6100000,
    status: 'Persiapan',
    participants: '420 Santri, Alumni, & Wali Santri',
    description: 'Upacara bendera Hari Santri, lomba khitobah 3 bahasa, dan shalawat akbar.'
  },
  {
    id: 'act-3',
    title: 'Ro\'an Akbar & Sanitasi Asrama',
    category: 'Kebersihan & Asrama',
    date: '26 Oktober 2026, 07:30 WIB',
    location: 'Komplek Asrama Putra & Putri',
    leader: 'Lurah Pondok (Kang Wildan)',
    budget: 850000,
    spent: 700000,
    status: 'Persiapan',
    participants: 'Seluruh Pengurus & Santri',
    description: 'Kerja bakti pembersihan saluran air, penataan taman, dan pengecatan gerbang pondok.'
  },
  {
    id: 'act-4',
    title: 'Munaqasyah Tahfidz Juz 30 & 5 Juz',
    category: 'Kajian & Akademik',
    date: '02 November 2026',
    location: 'Aula Tahfidz Al-Qur\'an',
    leader: 'Ustadzah Nurul Hidayah, Al-Hafidzah',
    budget: 2500000,
    spent: 0,
    status: 'Rencana',
    participants: '45 Santri Peserta Ujian',
    description: 'Ujian tasmi\' sekali duduk dihadapan dewan juri dan wali santri.'
  }
];

export const EXPENSE_CATEGORIES = [
  { name: 'Konsumsi Dapur', color: '#1B4D3E', lightColor: '#D3E8DE', percentage: 38 },
  { name: 'Bisyarah Guru/Asatidz', color: '#38A169', lightColor: '#C6F6D5', percentage: 28 },
  { name: 'Pengeluaran untuk Pembangunan', color: '#B7791F', lightColor: '#FEFCBF', percentage: 20 },
  { name: 'Operasional & Listrik', color: '#718096', lightColor: '#E2E8F0', percentage: 8 },
  { name: 'Kegiatan Santri', color: '#805AD5', lightColor: '#E9D8FD', percentage: 6 }
];

export const INCOME_CATEGORIES = [
  { name: 'SPP Bulanan Santri', color: '#1B4D3E' },
  { name: 'Infaq & Wakaf Pembangunan', color: '#38A169' },
  { name: 'Sumbangan Donatur', color: '#B7791F' },
  { name: 'Unit Usaha / Koperasi', color: '#319795' }
];
