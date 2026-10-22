import React from 'react';
import { Home, PieChart, ArrowLeftRight, CalendarDays, User, Plus } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange, onQuickAction }) {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-[390px] z-40">
      <div className="bg-white/95 backdrop-blur-xl rounded-full border border-gray-200/80 shadow-2xl px-3 py-2 flex items-center justify-between">
        {/* Tab 1: Home */}
        <button
          onClick={() => onTabChange('home')}
          className="flex-1 flex flex-col items-center justify-center py-1 group relative"
        >
          <Home 
            size={20} 
            className={`transition-colors ${
              activeTab === 'home' ? 'text-forest-900 stroke-[2.4]' : 'text-gray-400 group-hover:text-gray-600'
            }`} 
          />
          <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${
            activeTab === 'home' ? 'text-forest-900 font-bold' : 'text-gray-400'
          }`}>
            Beranda
          </span>
          {activeTab === 'home' && (
            <span className="w-1 h-1 rounded-full bg-forest-900 absolute -bottom-0.5" />
          )}
        </button>

        {/* Tab 2: Analytics */}
        <button
          onClick={() => onTabChange('analytics')}
          className="flex-1 flex flex-col items-center justify-center py-1 group relative"
        >
          <PieChart 
            size={20} 
            className={`transition-colors ${
              activeTab === 'analytics' ? 'text-forest-900 stroke-[2.4]' : 'text-gray-400 group-hover:text-gray-600'
            }`} 
          />
          <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${
            activeTab === 'analytics' ? 'text-forest-900 font-bold' : 'text-gray-400'
          }`}>
            Analisis
          </span>
          {activeTab === 'analytics' && (
            <span className="w-1 h-1 rounded-full bg-forest-900 absolute -bottom-0.5" />
          )}
        </button>

        {/* Center Floating Action Button (Matches Mockup exact circular dark green FAB) */}
        <div className="flex-shrink-0 -mt-5 px-1">
          <button
            onClick={onQuickAction}
            className="w-12 h-12 rounded-full bg-forest-900 hover:bg-forest-800 text-white shadow-float flex items-center justify-center active:scale-90 transition-all border-2 border-white ring-2 ring-forest-900/10"
            title="Catat Transaksi Kas Cepat"
          >
            <Plus size={22} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Tab 3: Activities */}
        <button
          onClick={() => onTabChange('activities')}
          className="flex-1 flex flex-col items-center justify-center py-1 group relative"
        >
          <CalendarDays 
            size={20} 
            className={`transition-colors ${
              activeTab === 'activities' ? 'text-forest-900 stroke-[2.4]' : 'text-gray-400 group-hover:text-gray-600'
            }`} 
          />
          <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${
            activeTab === 'activities' ? 'text-forest-900 font-bold' : 'text-gray-400'
          }`}>
            Kegiatan
          </span>
          {activeTab === 'activities' && (
            <span className="w-1 h-1 rounded-full bg-forest-900 absolute -bottom-0.5" />
          )}
        </button>

        {/* Tab 4: Profile / Settings */}
        <button
          onClick={() => onTabChange('profile')}
          className="flex-1 flex flex-col items-center justify-center py-1 group relative"
        >
          <User 
            size={20} 
            className={`transition-colors ${
              activeTab === 'profile' ? 'text-forest-900 stroke-[2.4]' : 'text-gray-400 group-hover:text-gray-600'
            }`} 
          />
          <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${
            activeTab === 'profile' ? 'text-forest-900 font-bold' : 'text-gray-400'
          }`}>
            Profil
          </span>
          {activeTab === 'profile' && (
            <span className="w-1 h-1 rounded-full bg-forest-900 absolute -bottom-0.5" />
          )}
        </button>
      </div>
    </div>
  );
}
