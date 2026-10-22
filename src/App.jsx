import React, { useState, useEffect } from 'react';
import { 
  INITIAL_TRANSACTIONS, 
  INITIAL_ACTIVITIES 
} from './data/mockData';
import OnboardingScreen from './components/OnboardingScreen';
import DashboardScreen from './components/DashboardScreen';
import AnalyticsScreen from './components/AnalyticsScreen';
import ActivitiesScreen from './components/ActivitiesScreen';
import ProfileScreen from './components/ProfileScreen';
import BottomNav from './components/BottomNav';
import TransactionModal from './components/TransactionModal';
import ActivityModal from './components/ActivityModal';
import ReportModal from './components/ReportModal';
import { 
  Smartphone, 
  Monitor, 
  Columns, 
  Sparkles, 
  RotateCcw,
  Plus,
  Wifi,
  Battery,
  Signal
} from 'lucide-react';

export default function App() {
  // Persistence state
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('pesantren_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('pesantren_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  useEffect(() => {
    localStorage.setItem('pesantren_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('pesantren_activities', JSON.stringify(activities));
  }, [activities]);

  // Navigation & View mode
  // 'mockup-single', 'mockup-triple', 'desktop'
  const [viewMode, setViewMode] = useState('mockup-triple');
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'analytics', 'activities', 'profile', 'onboarding'

  // Modals state
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [txModalType, setTxModalType] = useState('income');
  const [txPrefill, setTxPrefill] = useState(null);

  const [isActModalOpen, setIsActModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Handlers
  const handleAddTransaction = (newTx) => {
    setTransactions([newTx, ...transactions]);

    // If transaction is linked to an activity expense, update that activity spent
    if (newTx.type === 'expense' && newTx.activityId) {
      setActivities(prev => prev.map(act => {
        if (act.id === newTx.activityId) {
          return { ...act, spent: act.spent + newTx.amount };
        }
        return act;
      }));
    }
  };

  const handleAddActivity = (newAct) => {
    setActivities([newAct, ...activities]);
  };

  const handleOpenAddExpenseForActivity = (activity) => {
    setTxModalType('expense');
    setTxPrefill({
      title: `Operasional Kegiatan: ${activity.title}`,
      category: 'Kegiatan Santri',
      amount: '',
      note: `Untuk keperluan ${activity.title} (PJ: ${activity.leader})`,
      activityId: activity.id
    });
    setIsTxModalOpen(true);
  };

  const handleResetData = () => {
    if (window.confirm('Kembalikan semua data ke simulasi awal pondok pesantren?')) {
      setTransactions(INITIAL_TRANSACTIONS);
      setActivities(INITIAL_ACTIVITIES);
      localStorage.removeItem('pesantren_transactions');
      localStorage.removeItem('pesantren_activities');
    }
  };

  // Render Mobile Device Screen content
  const renderScreenContent = (tab) => {
    switch (tab) {
      case 'onboarding':
        return (
          <OnboardingScreen 
            onGetStarted={() => setActiveTab('home')} 
          />
        );
      case 'analytics':
        return (
          <AnalyticsScreen
            transactions={transactions}
            onBackToDashboard={() => setActiveTab('home')}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        );
      case 'activities':
        return (
          <ActivitiesScreen
            activities={activities}
            onOpenAddActivityModal={() => setIsActModalOpen(true)}
            onOpenAddExpenseForActivity={handleOpenAddExpenseForActivity}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            transactionsCount={transactions.length}
            activitiesCount={activities.length}
            onResetData={handleResetData}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        );
      case 'home':
      default:
        return (
          <DashboardScreen
            transactions={transactions}
            onOpenAddModal={(type) => {
              setTxModalType(type);
              setTxPrefill(null);
              setIsTxModalOpen(true);
            }}
            onOpenReportModal={() => setIsReportModalOpen(true)}
            onNavigateToTab={(t) => setActiveTab(t)}
          />
        );
    }
  };

  // Smartphone Mockup Frame component
  const PhoneMockupFrame = ({ tab, title, hideNav = false, isActive = false, onSelect }) => {
    const isDark = tab === 'onboarding';

    return (
      <div 
        onClick={onSelect}
        className={`flex flex-col items-center transition-all duration-300 ${
          onSelect ? 'cursor-pointer hover:scale-[1.01]' : ''
        }`}
      >
        {/* Device Container */}
        <div className={`relative w-[360px] h-[760px] rounded-[52px] p-3.5 shadow-2xl transition-all ${
          isDark 
            ? 'bg-gradient-to-b from-gray-800 to-gray-950 border-[6px] border-[#223329]' 
            : 'bg-white border-[6px] border-gray-300/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]'
        }`}>
          {/* Inner Screen */}
          <div className={`relative w-full h-full rounded-[40px] overflow-hidden flex flex-col ${
            isDark ? 'bg-[#0D2B1D]' : 'bg-[#F7F8F6]'
          }`}>
            {/* Status Bar */}
            <div className={`pt-3 px-6 flex items-center justify-between text-xs z-30 select-none ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              <span className="font-semibold text-[13px] tracking-tight">9:41</span>
              {/* Dynamic Island / Notch */}
              <div className="w-24 h-5 rounded-full bg-black mx-auto flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-950/80 border border-emerald-800/40" />
              </div>
              <div className="flex items-center gap-1.5 opacity-90">
                <Signal size={12} />
                <Wifi size={12} />
                <Battery size={13} />
              </div>
            </div>

            {/* Scrollable Screen Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative pt-1">
              {renderScreenContent(tab)}
            </div>

            {/* Bottom Nav Bar (if not onboarding) */}
            {!hideNav && tab !== 'onboarding' && (
              <BottomNav
                activeTab={tab}
                onTabChange={(newTab) => setActiveTab(newTab)}
                onQuickAction={() => {
                  setTxModalType('income');
                  setTxPrefill(null);
                  setIsTxModalOpen(true);
                }}
              />
            )}
          </div>
        </div>

        {/* Caption */}
        {title && (
          <div className="mt-4 text-center">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-white/80 border border-gray-200/60 shadow-sm text-forest-900">
              {title}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F4EE] text-gray-900 flex flex-col font-sans">
      {/* Top Universal App Control Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/70 px-4 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-forest-900 text-white flex items-center justify-center font-bold text-base shadow-sm">
              🌿
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-forest-950 tracking-tight leading-tight">
                Pesantren Cashflow & Kegiatan
              </h1>
              <p className="text-[11px] text-gray-500">
                Tata Kelola SPP, Konsumsi Dapur, Bisyarah & Pembangunan
              </p>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1.5 bg-gray-100/90 p-1 rounded-2xl border border-gray-200/60">
            <button
              onClick={() => setViewMode('mockup-triple')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'mockup-triple'
                  ? 'bg-forest-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Tampilkan 3 layar HP berdampingan persis seperti foto yang dilampirkan"
            >
              <Columns size={14} />
              <span className="hidden sm:inline">Mockup 3 Layar (Sesuai Foto)</span>
              <span className="sm:hidden">3 Layar</span>
            </button>

            <button
              onClick={() => setViewMode('mockup-single')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'mockup-single'
                  ? 'bg-forest-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Tampilan HP Tunggal Interaktif"
            >
              <Smartphone size={14} />
              <span className="hidden sm:inline">HP Interaktif</span>
              <span className="sm:hidden">Interaktif</span>
            </button>

            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'desktop'
                  ? 'bg-forest-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Tampilan Dashboard Komputer Penuh"
            >
              <Monitor size={14} />
              <span className="hidden sm:inline">Dashboard Komputer</span>
              <span className="sm:hidden">Desktop</span>
            </button>
          </div>

          {/* Right Action: Quick Add & Report */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setTxModalType('income');
                setTxPrefill(null);
                setIsTxModalOpen(true);
              }}
              className="inline-flex items-center gap-1 py-1.5 px-3 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold shadow-sm transition-all"
            >
              <Plus size={14} />
              <span>Catat Kas</span>
            </button>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="py-1.5 px-3 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold shadow-xs transition-all"
            >
              Laporan
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-x-auto">
        {/* VIEW 1: TRIPLE MOCKUP SHOWCASE (Exactly matching user's photo!) */}
        {viewMode === 'mockup-triple' && (
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center animate-in fade-in duration-300">
            {/* Guide Info */}
            <div className="mb-6 text-center max-w-xl">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold mb-2">
                <Sparkles size={13} />
                Desain Visual 1:1 Mengikuti Gambar Referensi
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                Preview Mockup Tiga Layar Utama
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                Layar 1 (Onboarding), Layar 2 (Beranda & Transaksi Kategori), Layar 3 (Analisis Donut & Anggaran).
                Klik layar mana saja untuk mencobanya secara langsung!
              </p>
            </div>

            {/* 3 Side-by-Side Smartphones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-center">
              {/* Screen 1: Onboarding */}
              <PhoneMockupFrame 
                tab="onboarding" 
                title="Layar 1 • Onboarding / Welcome"
                hideNav={true}
              />

              {/* Screen 2: Dashboard */}
              <PhoneMockupFrame 
                tab="home" 
                title="Layar 2 • Beranda & Transaksi Kas"
              />

              {/* Screen 3: Analytics */}
              <PhoneMockupFrame 
                tab="analytics" 
                title="Layar 3 • Analisis & Evaluasi Anggaran"
              />
            </div>
          </div>
        )}

        {/* VIEW 2: SINGLE INTERACTIVE MOBILE SIMULATOR */}
        {viewMode === 'mockup-single' && (
          <div className="w-full max-w-md mx-auto flex flex-col items-center animate-in fade-in duration-300">
            {/* Sub-tab switcher to quickly toggle screens */}
            <div className="flex items-center gap-2 mb-5 p-1 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <button
                onClick={() => setActiveTab('onboarding')}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'onboarding' ? 'bg-forest-900 text-white' : 'text-gray-600'
                }`}
              >
                Onboarding
              </button>
              <button
                onClick={() => setActiveTab('home')}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'home' ? 'bg-forest-900 text-white' : 'text-gray-600'
                }`}
              >
                Beranda
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'analytics' ? 'bg-forest-900 text-white' : 'text-gray-600'
                }`}
              >
                Analisis
              </button>
              <button
                onClick={() => setActiveTab('activities')}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'activities' ? 'bg-forest-900 text-white' : 'text-gray-600'
                }`}
              >
                Kegiatan
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'profile' ? 'bg-forest-900 text-white' : 'text-gray-600'
                }`}
              >
                Profil
              </button>
            </div>

            <PhoneMockupFrame 
              tab={activeTab} 
              hideNav={activeTab === 'onboarding'}
            />
          </div>
        )}

        {/* VIEW 3: DESKTOP FULL DASHBOARD */}
        {viewMode === 'desktop' && (
          <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-200/80 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-forest-700 tracking-wider uppercase block">
                  Dashboard Administrasi Terpadu
                </span>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  Pondok Pesantren Al-Barkah
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Pengelolaan SPP Santri, Konsumsi Dapur, Bisyarah Guru & Pembangunan
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsActModalOpen(true)}
                  className="py-2.5 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-200 transition-all flex items-center gap-1.5"
                >
                  <Plus size={15} />
                  <span>Jadwal Kegiatan Baru</span>
                </button>
                <button
                  onClick={() => {
                    setTxModalType('income');
                    setTxPrefill(null);
                    setIsTxModalOpen(true);
                  }}
                  className="py-2.5 px-4 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus size={15} />
                  <span>Catat Transaksi Kas</span>
                </button>
              </div>
            </div>

            {/* Desktop 2-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Dashboard & Analytics widgets */}
              <div className="lg:col-span-7 space-y-6">
                <DashboardScreen
                  transactions={transactions}
                  onOpenAddModal={(type) => {
                    setTxModalType(type);
                    setTxPrefill(null);
                    setIsTxModalOpen(true);
                  }}
                  onOpenReportModal={() => setIsReportModalOpen(true)}
                  onNavigateToTab={(t) => setActiveTab(t)}
                />
              </div>

              {/* Right Column: Analytics Donut & Activities */}
              <div className="lg:col-span-5 space-y-6">
                <AnalyticsScreen
                  transactions={transactions}
                  onBackToDashboard={() => setActiveTab('home')}
                  onOpenReportModal={() => setIsReportModalOpen(true)}
                />

                <div className="pt-2">
                  <ActivitiesScreen
                    activities={activities}
                    onOpenAddActivityModal={() => setIsActModalOpen(true)}
                    onOpenAddExpenseForActivity={handleOpenAddExpenseForActivity}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Universal Interactive Modals */}
      <TransactionModal
        isOpen={isTxModalOpen}
        onClose={() => setIsTxModalOpen(false)}
        onSave={handleAddTransaction}
        initialType={txModalType}
        prefillData={txPrefill}
      />

      <ActivityModal
        isOpen={isActModalOpen}
        onClose={() => setIsActModalOpen(false)}
        onSave={handleAddActivity}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        transactions={transactions}
        activities={activities}
      />
    </div>
  );
}
