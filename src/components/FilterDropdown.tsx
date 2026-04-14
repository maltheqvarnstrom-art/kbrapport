'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedValues: Set<string>;
  onChange: (values: Set<string>) => void;
}

export default function FilterDropdown({ label, options, selectedValues, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleOption = (option: string) => {
    const next = new Set(selectedValues);
    if (next.has(option)) {
      next.delete(option);
    } else {
      next.add(option);
    }
    onChange(next);
  };

  const hasSelection = selectedValues.size > 0;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between min-w-[80px] h-[26px] px-2.5 rounded-lg text-xs transition-colors ${
          hasSelection 
            ? 'bg-[#003d88]/10 text-[#003d88] font-semibold' 
            : 'bg-slate-100 text-slate-500 font-medium hover:bg-slate-200'
        }`}
      >
        <div className="flex items-center gap-1.5">
            {label}
            {hasSelection && <span className="flex items-center justify-center bg-[#003d88] text-white text-[9px] w-3.5 h-3.5 rounded-full">{selectedValues.size}</span>}
        </div>
        <ChevronDown className="h-4 w-4 text-slate-400 ml-1.5" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-[#e8e1da] rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="p-2 border-b border-[#e8e1da]">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Søg..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f1f5f9] text-sm border-none rounded-md py-1.5 pl-8 pr-3 focus:outline-none focus:ring-1 focus:ring-[#003d88]/30"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto p-1 minimal-scrollbar">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-xs text-slate-500 text-center">Ingen resultater pt</div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleOption(option)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-slate-50 rounded-md transition-colors"
                >
                  <span className="truncate text-slate-700">{option}</span>
                  {selectedValues.has(option) && <Check className="h-4 w-4 text-[#003d88] shrink-0" />}
                </button>
              ))
            )}
          </div>
          {hasSelection && (
             <div className="p-2 border-t border-[#e8e1da] bg-slate-50">
               <button 
                 onClick={() => { onChange(new Set()); setIsOpen(false); }}
                 className="w-full py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
               >
                 Ryd filter
               </button>
             </div>
          )}
        </div>
      )}
    </div>
  );
}
