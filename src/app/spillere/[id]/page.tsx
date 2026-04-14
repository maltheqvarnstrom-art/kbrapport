import { supabase } from '@/lib/supabase';
import { 
  ChevronLeft, 
  User, 
  Shield, 
  MapPin, 
  Calendar, 
  Move,
  Dna,
  FileText,
  TrendingUp,
  Star
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getPlayerDetails(id: string) {
  const { data: player } = await supabase
    .from('players')
    .select('*')
    .eq('id', id)
    .single();

  if (!player) return null;

  // Fetch related notes (by player name)
  const { data: notes } = await supabase
    .from('notes')
    .select('*')
    .eq('player', player.player_name || player.name)
    .order('date', { ascending: false });

  // Fetch related predictions
  const { data: predictions } = await supabase
    .from('predictions')
    .select('*')
    .eq('player', player.player_name || player.name)
    .order('date', { ascending: false });

  return { player, notes, predictions };
}

export default async function PlayerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getPlayerDetails(id);

  if (!data) return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold">Player not found</h2>
      <Link href="/spillere" className="text-blue-600 hover:underline mt-4 inline-block">Back to database</Link>
    </div>
  );

  const { player, notes, predictions } = data;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link href="/spillere" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all group">
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Database
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="sprout-card flex flex-col items-center py-10">
            <div className="h-32 w-32 rounded-full bg-[#efe9e4] flex items-center justify-center text-[#003d88] text-4xl font-bold shadow-inner mb-6">
              {player.player_name?.substring(0, 2).toUpperCase() || '??'}
            </div>
            <h1 className="text-2xl font-bold text-slate-900 font-[family-name:var(--font-fck-sans)] text-center">
              {player.player_name || player.name}
            </h1>
            <p className="text-[#003d88] font-bold text-sm bg-[#003d88]/10 px-3 py-1 rounded-full mt-2">
              {player.unique_id}
            </p>

            <div className="w-full mt-10 space-y-4 px-4">
              <div className="flex items-center justify-between text-sm py-2 border-b border-[#e8e1da]/50">
                <span className="text-slate-400 flex items-center gap-2"><Shield className="h-4 w-4" /> Club</span>
                <span className="font-bold text-slate-900">{player.club || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between text-sm py-2 border-b border-[#e8e1da]/50">
                <span className="text-slate-400 flex items-center gap-2"><Move className="h-4 w-4" /> Position</span>
                <span className="font-bold text-slate-900">{player.position || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between text-sm py-2 border-b border-[#e8e1da]/50">
                <span className="text-slate-400 flex items-center gap-2"><Calendar className="h-4 w-4" /> Year</span>
                <span className="font-bold text-slate-900">{player.year || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between text-sm py-2">
                <span className="text-slate-400 flex items-center gap-2"><Dna className="h-4 w-4" /> Preferred Foot</span>
                <span className="font-bold text-slate-900">{player.preferred_foot || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="sprout-card bg-[#003d88] text-white">
             <h3 className="text-lg font-bold mb-4 opacity-80">Final Evaluation</h3>
             <div className="flex items-end justify-between">
                <span className="text-7xl font-bold font-[family-name:var(--font-fck-sans)]">{player.rating_letter || '-'}</span>
                <div className="text-right">
                   <p className="text-xs font-bold opacity-60 uppercase mb-1">Avg Prediction</p>
                   <p className="text-2xl font-bold">{player.avg_prediction || '0.0'}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: History & Stats */}
        <div className="lg:col-span-2 space-y-8">
           {/* Technical Stats from Predictions */}
           <div className="sprout-card">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-slate-400" />
                Technical Analysis
              </h3>
              {predictions && predictions.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                   {[
                     { label: 'Technical', value: predictions[0].technical },
                     { label: 'Tactical', value: predictions[0].tactical },
                     { label: 'Mental', value: predictions[0].mental },
                     { label: 'Physical', value: predictions[0].physics }
                   ].map(stat => (
                     <div key={stat.label} className="text-center p-4 bg-[#fdfaf7] rounded-2xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                        <p className="text-3xl font-bold text-[#003d88]">{stat.value || '-'}</p>
                     </div>
                   ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">No prediction data available for this player.</p>
              )}
           </div>

           {/* History of Notes */}
           <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-400" />
                Scouting History
              </h3>
              <div className="space-y-4">
                {notes && notes.length > 0 ? (
                  notes.map((note) => (
                    <div key={note.id} className="sprout-card">
                       <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                             <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-[10px]">
                                {note.scout?.substring(0, 2).toUpperCase()}
                             </div>
                             <div>
                                <p className="text-sm font-bold text-slate-900">{note.scout}</p>
                                <p className="text-[10px] text-slate-400">{new Date(note.date).toLocaleDateString('en-GB')}</p>
                             </div>
                          </div>
                          <div className="h-8 w-8 rounded-lg bg-[#efe9e4] flex items-center justify-center font-bold text-[#003d88]">
                             {note.rating_letter}
                          </div>
                       </div>
                       <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          {note.player_description}
                       </p>
                       {note.characteristics && (
                         <div className="mt-4 pt-4 border-t border-[#e8e1da]/50">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Character Profile</p>
                            <p className="text-xs text-slate-500">{note.characteristics}</p>
                         </div>
                       )}
                    </div>
                  ))
                ) : (
                  <div className="sprout-card text-center py-12 text-slate-500">
                    No scouting notes found for this player.
                  </div>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
