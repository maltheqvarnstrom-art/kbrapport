'use client';

import { useState } from 'react';
import { 
  Filter, 
  ChevronDown, 
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Sidebar() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    rating: true,
    position: true,
    year: true,
    club: false
  });

  const toggle = (section: string) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="w-72 flex flex-col px-8 py-4 space-y-8 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          Filter
        </h3>
        <button className="text-slate-400 hover:text-slate-900 transition-colors">
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Rating Filter (like Price) */}
      <div className="space-y-4">
        <button 
          onClick={() => toggle('rating')}
          className="flex items-center justify-between w-full text-sm font-bold text-slate-900 group"
        >
          Evaluation
          {expanded.rating ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>
        {expanded.rating && (
          <div className="space-y-3 pt-2">
            {['A', 'B', 'C', 'D'].map((rating) => (
              <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded-md border-[#e8e1da] text-[#003d88] focus:ring-[#003d88]/20 transition-all cursor-pointer" />
                <span className="text-sm text-slate-600 group-hover:text-slate-900">Rating {rating}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="h-[1px] bg-[#e8e1da]"></div>

      {/* Position Filter (like Brand) */}
      <div className="space-y-4">
        <button 
          onClick={() => toggle('position')}
          className="flex items-center justify-between w-full text-sm font-bold text-slate-900"
        >
          Position
          {expanded.position ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>
        {expanded.position && (
          <div className="space-y-3 pt-2">
            <div className="relative mb-4">
              <input 
                type="text" 
                placeholder="Search position..." 
                className="w-full bg-[#efe9e4] border-none rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-[#003d88]/20"
              />
            </div>
            {['Goalkeeper', 'Defender', 'Midfielder', 'Forward'].map((pos) => (
              <label key={pos} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded-md border-[#e8e1da] text-[#003d88] focus:ring-[#003d88]/20 transition-all cursor-pointer" />
                <span className="text-sm text-slate-600 group-hover:text-slate-900">{pos}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="h-[1px] bg-[#e8e1da]"></div>

      {/* Year/Age Filter */}
      <div className="space-y-4">
        <button 
          onClick={() => toggle('year')}
          className="flex items-center justify-between w-full text-sm font-bold text-slate-900"
        >
          Year (Årgang)
          {expanded.year ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>
        {expanded.year && (
          <div className="space-y-3 pt-2">
            {['2009', '2010', '2011', '2012'].map((year) => (
              <label key={year} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded-md border-[#e8e1da] text-[#003d88] focus:ring-[#003d88]/20 transition-all cursor-pointer" />
                <span className="text-sm text-slate-600 group-hover:text-slate-900">{year}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="h-[1px] bg-[#e8e1da]"></div>

      {/* Club Filter */}
      <div className="space-y-4 pb-8">
        <button 
          onClick={() => toggle('club')}
          className="flex items-center justify-between w-full text-sm font-bold text-slate-900"
        >
          Clubs
          {expanded.club ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>
      </div>
    </aside>
  );
}
