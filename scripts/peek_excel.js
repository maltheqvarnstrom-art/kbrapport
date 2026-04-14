const xlsx = require('xlsx');
const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.xlsx'));

files.forEach(file => {
    console.log(`--- File: ${file} ---`);
    try {
        const workbook = xlsx.readFile(file);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
        if (data.length > 0) {
            console.log('Headers:', data[0]);
        } else {
            console.log('Empty sheet');
        }
    } catch (err) {
        console.error(`Error reading ${file}:`, err.message);
    }
});
