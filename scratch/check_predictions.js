const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkPredictions() {
  const { data, error } = await supabase
    .from('predictions')
    .select('*')
    .limit(1);
  
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(data[0], null, 2));
    console.log('Available keys:', Object.keys(data[0]));
  }
}

checkPredictions();
