import { supabase } from '@/lib/supabase';
import DataPageLayout from '@/components/DataPageLayout';

export const dynamic = 'force-dynamic';

async function getClubs() {
  const { data } = await supabase
    .from('clubs')
    .select('*')
    .order('name', { ascending: true });
  return data || [];
}

export default async function KlubberPage() {
  const clubs = await getClubs();

  return (
    <DataPageLayout 
      title="Klubber" 
      subtitle={`Total: ${clubs.length} clubs found.`}
      statsView={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="sprout-card">
              <h3 className="text-lg font-bold mb-4">Regional Distribution</h3>
              <p className="text-sm text-slate-500">Visualization coming soon...</p>
           </div>
        </div>
      }
    >
      <table className="minimal-table">
        <thead className="sticky top-0 z-10">
          <tr className="border-b border-[#e8e1da] shadow-sm">
            <th className="px-4 py-2">Klub Navn</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Område</th>
            <th className="px-4 py-2">Scouts</th>
            <th className="px-4 py-2 text-emerald-600">Segmenter</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1f5f9]">
          {clubs.map((club) => (
            <tr key={club.id} className="group transition-colors">
              <td className="px-4 py-1.5">{club.name}</td>
              <td className="px-4 py-1.5">
                <span className="text-[10px] font-bold text-slate-400 tracking-widest">
                  {club.status || 'Aktiv'}
                </span>
              </td>
              <td className="px-4 py-1.5 font-medium">{club.omraade || ''}</td>
              <td className="px-4 py-1.5 font-medium">{club.scouts || ''}</td>
              <td className="px-4 py-1.5 text-slate-500 font-medium">{club.segmenter || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DataPageLayout>
  );
}
