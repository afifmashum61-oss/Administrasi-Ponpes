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
import DesktopView from './components/DesktopView';
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
  Signal,
  ArrowLeft
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

  // Automatic Device Detection:
  // On screen >= 1024px -> 'desktop'
  // On screen < 1024px -> 'mobile'
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      return 'desktop';
    }
    return 'mobile';
  });

  // Keep responsive when user resizes window or rotates device
  useEffect(() => {
    const handleResize = () => {
      // Only auto-switch if not explicitly on showcase mode
      if (viewMode !== 'mockup-triple') {
        if (window.innerWidth >= 1024 && viewMode === 'mobile') {
          setViewMode('desktop');
        } else if (window.innerWidth < 1024 && viewMode === 'desktop') {
          setViewMode('mobile');
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  // Mobile navigation tab: 'home', 'analytics', 'activities', 'profile', 'onboarding'
  const [mobileTab, setMobileTab] = useState('home');

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

  // Render Mobile Screen Content
  const renderMobileScreenContent = () => {
    switch (mobileTab) {
      case 'onboarding':
        return (
          <OnboardingScreen 
            onGetStarted={() => setMobileTab('home')} 
          />
        );
      case 'analytics':
        return (
          <AnalyticsScreen
            transactions={transactions}
            onBackToDashboard={() => setMobileTab('home')}
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
            onNavigateToTab={(t) => setMobileTab(t)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F0] text-gray-900 font-sans">
      {/* 1. DESKTOP FULL-SCREEN VIEW (Auto active on PC/Laptop) */}
      {viewMode === 'desktop' && (
        <DesktopView
          transactions={transactions}
          activities={activities}
          onOpenAddModal={(type) => {
            setTxModalType(type);
            setTxPrefill(null);
            setIsTxModalOpen(true);
          }}
          onOpenAddActivityModal={() => setIsActModalOpen(true)}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onOpenAddExpenseForActivity={handleOpenAddExpenseForActivity}
          onSwitchToMockupMode={() => setViewMode('mockup-triple')}
          onResetData={handleResetData}
        />
      )}

      {/* 2. MOBILE VIEW (Auto active on Smartphone/HP) */}
      {viewMode === 'mobile' && (
        <div className="w-full min-h-screen bg-[#F7F8F6] flex flex-col justify-between max-w-lg mx-auto shadow-sm">
          {/* Top Status Bar indicator on mobile */}
          <div className="pt-2 px-5 flex items-center justify-between text-xs text-gray-500 pb-1">
            <span className="font-bold text-[11px] text-forest-900">Al-Barkah Ponpes</span>
            <div className="flex items-center gap-2">
              {/* Option to switch to desktop or onboarding preview */}
              <button
                onClick={() => setViewMode('desktop')}
                className="text-[10px] text-gray-500 hover:text-forest-900 underline font-medium"
              >
                Versi Desktop
              </button>
            </div>
          </div>

          {/* Main Mobile Screen View */}
          <main className="flex-1 overflow-y-auto">
            {renderMobileScreenContent()}
          </main>

          {/* Floating Mobile Bottom Nav */}
          {mobileTab !== 'onboarding' && (
            <BottomNav
              activeTab={mobileTab}
              onTabChange={(t) => setMobileTab(t)}
              onQuickAction={() => {
                setTxModalType('income');
                setTxPrefill(null);
                setIsTxModalOpen(true);
              }}
            />
          )}
        </div>
      )}

      {/* 3. OPTIONAL SHOWCASE / MOCKUP TRIPLE VIEW (When requested by user) */}
      {viewMode === 'mockup-triple' && (
        <div className="min-h-screen bg-[#F3F4EE] p-6 flex flex-col items-center">
          {/* Header Bar with Back to Desktop */}
          <div className="w-full max-w-6xl flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
            <button
              onClick={() => setViewMode('desktop')}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-forest-900 text-white text-xs font-bold shadow-sm hover:bg-forest-800 transition-all"
            >
              <ArrowLeft size={16} />
              <span>Kembali ke Tampilan Desktop</span>
            </button>
            <span className="text-xs font-bold text-gray-500">
              Pratinjau Presentasi Mockup 3 Layar
            </span>
          </div>

          {/* 3 Side-by-Side Smartphones Frame Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-center">
            {/* Phone 1: Onboarding */}
            <div className="w-[360px] h-[760px] rounded-[52px] p-3.5 bg-gradient-to-b from-gray-800 to-gray-950 border-[6px] border-[#223329] shadow-2xl flex flex-col">
              <div className="w-full h-full rounded-[40px] overflow-hidden bg-[#0D2B1D]">
                <OnboardingScreen onGetStarted={() => setViewMode('desktop')} />
              </div>
            </div>

            {/* Phone 2: Dashboard */}
            <div className="w-[360px] h-[760px] rounded-[52px] p-3.5 bg-white border-[6px] border-gray-300 shadow-2xl flex flex-col relative">
              <div className="w-full h-full rounded-[40px] overflow-hidden bg-[#F7F8F6] pb-20 overflow-y-auto no-scrollbar">
                <DashboardScreen
                  transactions={transactions}
                  onOpenAddModal={(type) => {
                    setTxModalType(type);
                    setTxPrefill(null);
                    setIsTxModalOpen(true);
                  }}
                  onOpenReportModal={() => setIsReportModalOpen(true)}
                  onNavigateToTab={(t) => setMobileTab(t)}
                />
              </div>
            </div>

            {/* Phone 3: Analytics */}
            <div className="w-[360px] h-[760px] rounded-[52px] p-3.5 bg-white border-[6px] border-gray-300 shadow-2xl flex flex-col relative">
              <div className="w-full h-full rounded-[40px] overflow-hidden bg-[#F7F8F6] pb-20 overflow-y-auto no-scrollbar">
                <AnalyticsScreen
                  transactions={transactions}
                  onBackToDashboard={() => setMobileTab('home')}
                  onOpenReportModal={() => setIsReportModalOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

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
