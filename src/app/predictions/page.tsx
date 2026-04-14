import { supabase } from '@/lib/supabase';
import DataPageLayout from '@/components/DataPageLayout';

export const dynamic = 'force-dynamic';

async function getPredictions() {
  const { data } = await supabase
    .from('predictions')
    .select('*')
    .order('date', { ascending: false })
    .limit(100);
  return data || [];
}

export default async function PredictionsPage() {
  const predictions = await getPredictions();

  return (
    <DataPageLayout 
      title="Predictions" 
      subtitle="Detailed technical and tactical performance predictions."
      statsView={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="sprout-card">
              <h3 className="text-lg font-bold mb-4">Average Prediction Score</h3>
              <p className="text-sm text-slate-500">Visualization coming soon...</p>
           </div>
        </div>
      }
    >
      <table className="minimal-table">
        <thead className="sticky top-0 z-10">
          <tr className="border-b border-[#e8e1da] shadow-sm">
            <th className="px-4 py-2">Navn</th>
            <th className="px-4 py-2">Klub</th>
            <th className="px-4 py-2">Teknik</th>
            <th className="px-4 py-2">Taktik</th>
            <th className="px-4 py-2">Mentalt</th>
            <th className="px-4 py-2">Fysisk</th>
            <th className="px-4 py-2">Rating</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1f5f9]">
          {predictions.map((pred) => {
            // Split the concatenated string if it follows the pattern "Name - Club - Year"
            const playerStr = pred.player || '';
            const pureName = playerStr.includes(' - ') ? playerStr.split(' - ')[0] : playerStr;
            
            return (
              <tr key={pred.id} className="group transition-colors">
                <td className="px-4 py-1.5 font-medium whitespace-nowrap">{pureName}</td>
                <td className="px-4 py-1.5 font-medium">{pred.club || ''}</td>
                <td className="px-4 py-1.5 font-medium text-slate-500">{pred.technical || ''}</td>
                <td className="px-4 py-1.5 font-medium text-slate-500">{pred.tactical || ''}</td>
                <td className="px-4 py-1.5 font-medium text-slate-500">{pred.mental || ''}</td>
                <td className="px-4 py-1.5 font-medium text-slate-500">{pred.physics || ''}</td>
                <td className="px-4 py-1.5 font-medium">
                  {pred.prediction_score ? (
                    <span className="text-[#334155]">{pred.prediction_score} <span className="text-slate-300 font-normal prose-sm">/ 5</span></span>
                  ) : ''}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </DataPageLayout>
  );
}
