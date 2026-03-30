const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL_FILE = path.join(__dirname, '..', '..', 'GOLF EXCEL.xlsx');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data');

const COLUMN_KEYS = [
  'country',
  'companyBrand',
  'model',
  'productType',
  'seating',
  'usage',
  'unitsSold2022',
  'unitsSold2023',
  'unitsSold2024',
  'unitsSold2025',
  'marketShare2025',
  'payloadLbs',
  'towingLbs',
  'motorHP',
  'speedMph',
  'distributorMarginPercent',
  'distributorMarginUSD',
  'distributorPriceUSD',
  'retailerMarginPercent',
  'retailerMarginUSD',
  'retailPriceUSD'
];

function main() {
  console.log('Reading Excel file:', EXCEL_FILE);
  const wb = XLSX.readFile(EXCEL_FILE);
  const sheetName = wb.SheetNames[0];
  console.log('Sheet:', sheetName);

  const sheetData = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });
  console.log('Total rows (including header):', sheetData.length);

  // Skip header row (index 0), data starts at index 1
  const dataRows = sheetData.slice(1);
  console.log('Data rows:', dataRows.length);

  const result = [];
  for (const row of dataRows) {
    if (!row || row.length === 0) continue;

    const obj = {};
    for (let i = 0; i < COLUMN_KEYS.length; i++) {
      const val = row[i];
      obj[COLUMN_KEYS[i]] = val !== undefined && val !== null ? val : '';
    }
    result.push(obj);
  }

  console.log('Records converted:', result.length);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, 'competitive-intelligence.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log('Written:', outputPath);

  // Quick validation
  const sample = result[0];
  console.log('\nSample record:', JSON.stringify(sample, null, 2));
  console.log('\nUnique countries:', [...new Set(result.map(r => r.country))].sort().join(', '));
  console.log('Unique companies:', [...new Set(result.map(r => r.companyBrand))].sort().join(', '));
  console.log('\nDone!');
}

main();
