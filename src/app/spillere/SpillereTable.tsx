'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import FilterDropdown from '@/components/FilterDropdown';
import DataPageLayout from '@/components/DataPageLayout';
import { Search } from 'lucide-react';

interface Player {
  id: string;
  player_name: string;
  name?: string;
  club: string;
  year: string;
  position: string;
  quarter: string;
  preffered_foot: string;
  rating_letter: string;
  avg_rating: string | number;
  avg_prediction: string | number;
  created_at_excel: string;
}

interface SpillereTableProps {
  initialPlayers: Player[];
  statsView: React.ReactNode;
}

export default function SpillereTable({ initialPlayers, statsView }: SpillereTableProps) {
  // Filter States
  const [selectedClubs, setSelectedClubs] = useState<Set<string>>(new Set());
  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set());
  const [selectedPositions, setSelectedPositions] = useState<Set<string>>(new Set());
  const [selectedRatings, setSelectedRatings] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique options for dropdowns dynamically
  const clubOptions = useMemo(() => Array.from(new Set(initialPlayers.map(p => p.club).filter(Boolean))).sort(), [initialPlayers]);
  const yearOptions = useMemo(() => Array.from(new Set(initialPlayers.map(p => p.year).filter(Boolean))).sort(), [initialPlayers]);
  const positionOptions = useMemo(() => Array.from(new Set(initialPlayers.map(p => p.position).filter(Boolean))).sort(), [initialPlayers]);
  const ratingOptions = useMemo(() => ['A', 'B+', 'B', 'C+', 'C'], []);

  // Compute filtered players
  const filteredPlayers = useMemo(() => {
    return initialPlayers.filter(player => {
      const matchClub = selectedClubs.size === 0 || selectedClubs.has(player.club);
      const matchYear = selectedYears.size === 0 || selectedYears.has(player.year);
      const matchPosition = selectedPositions.size === 0 || selectedPositions.has(player.position);
      const matchRating = selectedRatings.size === 0 || selectedRatings.has(player.rating_letter);
      
      const searchStr = searchQuery.toLowerCase();
      const displayName = player.player_name || player.name || '';
      const matchSearch = searchStr === '' || 
        displayName.toLowerCase().includes(searchStr) || 
        (player.club && player.club.toLowerCase().includes(searchStr));

      return matchClub && matchYear && matchPosition && matchRating && matchSearch;
    });
  }, [initialPlayers, selectedClubs, selectedYears, selectedPositions, selectedRatings, searchQuery]);

  const toolbar = (
    <div className="flex flex-wrap items-center gap-2 w-full">
         <div className="relative w-[220px] mr-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Søg..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-lg py-1 pl-8 pr-3 text-xs font-medium text-slate-600 placeholder:text-slate-400 focus:outline-none focus:bg-slate-200 transition-all h-[26px]"
            />
         </div>
         <FilterDropdown label="Klub" options={clubOptions} selectedValues={selectedClubs} onChange={setSelectedClubs} />
         <FilterDropdown label="Årgang" options={yearOptions} selectedValues={selectedYears} onChange={setSelectedYears} />
         <FilterDropdown label="Position" options={positionOptions} selectedValues={selectedPositions} onChange={setSelectedPositions} />
         <FilterDropdown label="Rating" options={ratingOptions} selectedValues={selectedRatings} onChange={setSelectedRatings} />
         
         {(selectedClubs.size > 0 || selectedYears.size > 0 || selectedPositions.size > 0 || selectedRatings.size > 0 || searchQuery !== '') && (
            <button 
              onClick={() => {
                setSelectedClubs(new Set());
                setSelectedYears(new Set());
                setSelectedPositions(new Set());
                setSelectedRatings(new Set());
                setSearchQuery('');
              }}
              className="ml-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-800 transition-colors"
            >
              Ryd alle
            </button>
         )}
      </div>
  );

  return (
    <DataPageLayout 
      title="Spillere" 
      subtitle={`Viser ${filteredPlayers.length} ud af ${initialPlayers.length} registrerede spillere.`}
      statsView={statsView}
      toolbar={toolbar}
    >
      <table className="minimal-table">
        <thead className="sticky top-0 z-10 bg-white">
          <tr className="border-b border-[#e8e1da] shadow-sm">
            <th className="px-4 py-2">Navn</th>
            <th className="px-4 py-2">Klub</th>
            <th className="px-4 py-2">Årgang</th>
            <th className="px-4 py-2">Pos</th>
            <th className="px-4 py-2">Fod</th>
            <th className="px-4 py-2">Qrt</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Avg. Rating</th>
            <th className="px-4 py-2">Avg. Pred</th>
            <th className="px-4 py-2">Dato</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1f5f9]">
          {filteredPlayers.slice(0, 100).map((player) => {
            const ratingMap: Record<string, string> = { 'A': '5', 'B+': '4', 'B': '3', 'C+': '2', 'C': '1' };
            const numericRating = ratingMap[player.rating_letter || ''] || '-';
            
            // Clean up the name display if it contains the full string
            const displayName = player.player_name || player.name || 'Unknown Player';
            const pureName = displayName.includes(' - ') ? displayName.split(' - ')[0] : displayName;

            return (
              <tr key={player.id} className="group transition-colors">
                <td className="px-4 py-1.5 font-medium whitespace-nowrap">
                  <Link href={`/spillere/${player.id}`} className="hover:underline transition-colors block">
                    {pureName}
                  </Link>
                </td>
                <td className="px-4 py-1.5 font-medium">{player.club || ''}</td>
                <td className="px-4 py-1.5 font-medium">{player.year || ''}</td>
                <td className="px-4 py-1.5 font-medium">
                   {player.position || ''}
                </td>
                <td className="px-4 py-1.5 text-slate-500 font-medium">{player.preffered_foot || ''}</td>
                <td className="px-4 py-1.5 font-medium">{player.quarter || ''}</td>
                <td className="px-4 py-1.5 font-medium">
                  {player.rating_letter ? (
                    <div className="flex items-center">
                      <span className="text-[#334155] w-6 inline-block">{player.rating_letter}</span>
                      <span className="text-slate-300 font-normal prose-sm">/ {numericRating}</span>
                    </div>
                  ) : ''}
                </td>
                <td className="px-4 py-1.5 font-medium">
                  {player.avg_rating && !isNaN(Number(player.avg_rating)) ? Number(player.avg_rating).toFixed(1) : ''}
                </td>
                <td className="px-4 py-1.5 font-medium">
                  {player.avg_prediction && !isNaN(Number(player.avg_prediction)) ? Number(player.avg_prediction).toFixed(1) : ''}
                </td>
                <td className="px-4 py-1.5 text-slate-400 font-medium">
                  {player.created_at_excel ? new Date(player.created_at_excel).toLocaleDateString('da-DK') : ''}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </DataPageLayout>
  );
}
