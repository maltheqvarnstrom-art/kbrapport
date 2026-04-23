const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkData() {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .limit(5);
  
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(data[0], null, 2));
    console.log('Available keys:', Object.keys(data[0]));
    const feet = data.map(p => p.preffered_foot || p.preferred_foot || p.foot || 'N/A');
    console.log('Sample feet values:', feet);
  }
}

checkData();
