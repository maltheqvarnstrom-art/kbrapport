require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const xlsx = require('xlsx');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const filesToImport = [
    { file: 'Klubber - Export.xlsx', table: 'clubs', mapping: {
        'Navn': 'name',
        'Status': 'status',
        'Forbund': 'forbund',
        'Område': 'omraade',
        'Række': 'raekke',
        'scouts': 'scouts',
        'Segmenter': 'segmenter'
    }},
    { file: 'Scouts - Export.xlsx', table: 'scouts', mapping: {
        'Navn': 'name',
        'Initialer': 'initials',
        'Segment': 'segment'
    }},
    { file: 'Spillere - Export.xlsx', table: 'players', mapping: {
        'Unique ID': 'unique_id',
        'Spillernavn': 'player_name',
        'Navn': 'name',
        'Klub': 'club',
        'Årgang': 'year',
        'Position': 'position',
        'Præcisering af positioner': 'exact_positions',
        'Ben': 'preferred_foot',
        'Fysik': 'physique',
        'Kvartal': 'quarter',
        'Kendetegn (evt hårfarve, briller etc)': 'characteristics',
        'Spillerbeskrivelse': 'player_description',
        'Oprettet den (dato)': 'created_at_excel',
        'Vurdering (Bogstav)': 'rating_letter',
        'Markering': 'marking',
        'Avg. Vurdering': 'avg_rating',
        'Avg. Prediction': 'avg_prediction'
    }},
    { file: 'Noter - Export.xlsx', table: 'notes', mapping: {
        'Spiller': 'player',
        'Dato': 'date',
        'Scout': 'scout',
        'Vurdering (Bogstav)': 'rating_letter',
        'Spillerbeskrivelse': 'player_description',
        'Kendetegn (Hårfarve, briller o.lign)': 'characteristics'
    }},
    { file: 'Predictions - Export.xlsx', table: 'predictions', mapping: {
        'Scout': 'scout',
        'Spiller': 'player',
        'Klub': 'club',
        'Modstander': 'opponent',
        'Dato': 'date',
        'Fysik': 'physics',
        'Mentalt': 'mental',
        'Taktisk': 'tactical',
        'Teknisk': 'technical',
        'Prediction Score': 'prediction_score',
        'Navn - Årgang - Klub (Hvis spiller ikke er oprettet)': 'raw_new_player_info'
    }},
    { file: 'Rapporter - Export.xlsx', table: 'reports', mapping: {
        'Titel': 'title',
        'Scout': 'scout',
        'Dato': 'date',
        'Segment': 'segment',
        'Observationsbeskrivelse': 'observation_description',
        'Spillernoter': 'player_notes',
        'Nyoprettede spillere': 'newly_created_players',
        'Tidligere rapporterede spillere': 'previously_reported_players'
    }}
];

async function importFile(config) {
    console.log(`Importing ${config.file} into ${config.table}...`);
    try {
        const workbook = xlsx.readFile(config.file);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);

        const mappedData = data.map(row => {
            const mappedRow = {};
            for (const [excelKey, dbKey] of Object.entries(config.mapping)) {
                let value = row[excelKey];
                
                // Special handling for dates
                if (dbKey === 'date' || dbKey === 'created_at_excel') {
                    if (value) {
                        try {
                            // Excel serial dates handling if needed
                            if (typeof value === 'number') {
                                value = new Date((value - 25569) * 86400 * 1000).toISOString();
                            } else {
                                value = new Date(value).toISOString();
                            }
                        } catch (e) {
                            console.warn(`Invalid date format for ${excelKey}: ${value}`);
                            value = null;
                        }
                    }
                }
                
                mappedRow[dbKey] = value;
            }
            return mappedRow;
        });

        // Batch upload (Supabase limit is usually around 1000 per request for safety)
        const batchSize = 500;
        for (let i = 0; i < mappedData.length; i += batchSize) {
            const batch = mappedData.slice(i, i + batchSize);
            const { error } = await supabase.from(config.table).upsert(batch);
            if (error) {
                console.error(`Error in ${config.table} batch ${i / batchSize}:`, error.message);
                throw error;
            }
        }
        console.log(`Successfully imported ${mappedData.length} rows into ${config.table}`);
    } catch (err) {
        console.error(`Failed to import ${config.file}:`, err.message);
    }
}

async function run() {
    for (const config of filesToImport) {
        await importFile(config);
    }
    console.log('Import finished!');
}

run();
