import { supabase } from '@/lib/supabase';
import DataPageLayout from '@/components/DataPageLayout';

export const dynamic = 'force-dynamic';

async function getNotes() {
  const { data } = await supabase
    .from('notes')
    .select('*')
    .order('date', { ascending: false })
    .limit(100);
  return data || [];
}

export default async function NoterPage() {
  const notes = await getNotes();

  return (
    <DataPageLayout 
      title="Noter" 
      subtitle="Latest scouting notes and individual player evaluations."
      statsView={
        <div className="sprout-card">
           <h3 className="text-lg font-bold mb-4">Note Frequency</h3>
           <p className="text-sm text-slate-500">Visualization coming soon...</p>
        </div>
      }
    >
      <table className="minimal-table">
        <thead className="sticky top-0 z-10">
          <tr className="border-b border-[#e8e1da] shadow-sm">
            <th className="px-4 py-2">Dato</th>
            <th className="px-4 py-2">Navn</th>
            <th className="px-4 py-2">Scout</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Beskrivelse</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1f5f9]">
          {notes.map((note) => {
             const ratingMap: Record<string, string> = { 'A': '5', 'B+': '4', 'B': '3', 'C+': '2', 'C': '1' };
             const numericRating = ratingMap[note.rating_letter || ''] || '-';
             
             return (
              <tr key={note.id} className="group transition-colors">
                <td className="px-4 py-1.5 font-medium whitespace-nowrap">
                  {note.created_at_excel ? new Date(note.created_at_excel).toLocaleDateString('da-DK') : ''}
                </td>
                <td className="px-4 py-1.5 font-medium whitespace-nowrap">{note.player}</td>
                <td className="px-4 py-1.5 font-medium whitespace-nowrap">{note.scout}</td>
                <td className="px-4 py-1.5 font-medium">
                  {note.rating_letter ? (
                    <div className="flex items-center">
                      <span className="text-[#334155] w-6 inline-block">{note.rating_letter}</span>
                      <span className="text-slate-300 font-normal prose-sm">/ {numericRating}</span>
                    </div>
                  ) : ''}
                </td>
                <td className="px-4 py-1.5 text-[10px] text-slate-500 font-medium max-w-md line-clamp-1 italic">
                  {note.player_description || 'Ingen beskrivelse.'}
                </td>
              </tr>
             );
          })}
        </tbody>
      </table>
    </DataPageLayout>
  );
}
