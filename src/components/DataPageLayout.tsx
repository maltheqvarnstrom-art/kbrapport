'use client';

import { useState } from 'react';
import { 
  Table as TableIcon, 
  BarChart3, 
  ChevronRight, 
  Search, 
  Filter 
} from 'lucide-react';

interface DataPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  statsView: React.ReactNode;
  toolbar?: React.ReactNode;
}

export default function DataPageLayout({ title, subtitle, children, statsView, toolbar }: DataPageLayoutProps) {
  const [view, setView] = useState<'table' | 'stats'>('table');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between gap-4">
        {/* Left side: Toolbar (Filters) */}
        <div className="flex-1">
          {toolbar}
        </div>
        
        {/* Right side: View Toggle */}
        <div className="flex items-center justify-end bg-slate-100 p-0.5 rounded-lg w-fit shrink-0 h-[26px]">
          <button 
            onClick={() => setView('table')}
            className={`flex items-center justify-center w-7 h-[22px] rounded-md transition-all ${
              view === 'table' ? 'bg-white text-[#003d88] shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
            title="Tabel"
          >
            <TableIcon className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setView('stats')}
            className={`flex items-center justify-center w-7 h-[22px] rounded-md transition-all ${
              view === 'stats' ? 'bg-white text-[#003d88] shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
            title="Statistik"
          >
            <BarChart3 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {view === 'table' ? (
        <div className="bg-white border-y border-[#e8e1da]">
          <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-280px)] minimal-scrollbar">
            {children}
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in-95 duration-500">
          {statsView}
        </div>
      )}
    </div>
  );
}
