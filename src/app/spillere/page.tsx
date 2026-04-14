import { supabase } from '@/lib/supabase';
import SpillereTable from './SpillereTable';

export const dynamic = 'force-dynamic';

async function getPlayers() {
  const { data } = await supabase
    .from('players')
    .select('*')
    .order('player_name', { ascending: true });
  return data || [];
}

export default async function SpillerePage() {
  const players = await getPlayers();

  const statsView = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <div className="sprout-card">
          <h3 className="text-lg font-bold mb-4">Rating Distribution</h3>
          <div className="h-64 flex items-end gap-2 px-4 pb-4 border-b border-[#e8e1da]">
            {['A', 'B+', 'B', 'C+', 'C'].map((letter) => {
              const count = players.filter(p => p.rating_letter === letter).length;
              const height = (count / players.length) * 500;
              return (
                <div key={letter} className="flex-1 flex flex-col items-center gap-2">
                   <div className="w-full bg-[#003d88] rounded-t-xl" style={{ height: `${height}px` }}></div>
                   <span className="text-xs font-bold text-slate-500">{letter}</span>
                </div>
              );
            })}
          </div>
       </div>
       <div className="sprout-card">
          <h3 className="text-lg font-bold mb-4">Year Distribution</h3>
          <p className="text-sm text-slate-500">Visualization coming soon...</p>
       </div>
    </div>
  );

  return <SpillereTable initialPlayers={players} statsView={statsView} />;
}
