const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL_FILE = path.join(__dirname, '..', 'Updated Dataset-ASEAN and MEA Golf Cart Market..xlsx');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data');

// Years in the Excel (columns 1-13 after label)
const YEARS = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];

// Segment hierarchy: parent -> children
const SEGMENT_HIERARCHY = {
  'By Product Type': {
    'Electric Golf Cart': ['Lead-Acid Battery', 'Lithium-ion Battery'],
    'ICE Golf Carts': ['Gasoline', 'Diesel']
  }
};

// All segment types (excluding By Country which is geography data)
const SEGMENT_TYPES = [
  'By Product Type', 'By Seating Capacity', 'By Usage Mode',
  'By Seller Type', 'By Sales Channel', 'By End-User/Customer'
];

// Geography hierarchy for By Region
const ASEAN_COUNTRIES = ['Thailand', 'Vietnam', 'Cambodia', 'Laos', 'Myanmar', 'Indonesia', 'Malaysia', 'Philippines', 'Singapore', 'Brunei'];
const MEA_CHILDREN = ['GCC', 'South Africa', 'Turkey', 'Rest of Middle East & Africa'];
const GCC_COUNTRIES = ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Oman', 'Bahrain'];

function parseSheet(sheetData) {
  // Find header row (contains "Row Labels")
  let headerRowIdx = -1;
  for (let i = 0; i < Math.min(20, sheetData.length); i++) {
    if (sheetData[i] && sheetData[i][0] === 'Row Labels') {
      headerRowIdx = i;
      break;
    }
  }
  if (headerRowIdx === -1) {
    throw new Error('Could not find header row with "Row Labels"');
  }

  // Find all geography section headers (rows where col[1] is undefined/null/empty)
  const sections = [];
  for (let i = headerRowIdx + 1; i < sheetData.length; i++) {
    const row = sheetData[i];
    if (row && row[0] && typeof row[0] === 'string' && row.length >= 2 &&
        (row[1] === undefined || row[1] === null || row[1] === '')) {
      sections.push({ row: i, name: row[0].trim() });
    }
  }

  console.log('Found sections:', sections.map(s => s.name));

  // Parse each section
  const geoData = {};
  for (let si = 0; si < sections.length; si++) {
    const section = sections[si];
    const nextSectionRow = si + 1 < sections.length ? sections[si + 1].row : sheetData.length;
    const sectionRows = sheetData.slice(section.row + 1, nextSectionRow);

    geoData[section.name] = parseGeoSection(sectionRows);
  }

  // Also parse the first section (ASEAN in Value, or whatever comes first)
  // The first section starts right after the header row
  const firstSectionName = sheetData[headerRowIdx + 1] && sheetData[headerRowIdx + 1][0];
  if (firstSectionName && sections.length > 0 && sections[0].row === headerRowIdx + 1) {
    // First section is already captured
  } else if (firstSectionName) {
    // Parse from headerRowIdx+1 to first section
    const endRow = sections.length > 0 ? sections[0].row : sheetData.length;
    const firstRows = sheetData.slice(headerRowIdx + 2, endRow);
    geoData[firstSectionName.trim()] = parseGeoSection(firstRows);
  }

  return geoData;
}

function parseGeoSection(rows) {
  // Parse segment type blocks within a geography section
  // Each block starts with "By X" row (with data = totals), followed by segment rows
  const result = {};
  let currentSegType = null;
  let currentSegments = [];

  for (const row of rows) {
    if (!row || !row[0] || typeof row[0] !== 'string') continue;

    const label = row[0].trim();
    const hasData = typeof row[1] === 'number';

    if (!hasData) continue; // Skip rows without numeric data

    // Check if this is a segment type header (starts with "By ")
    if (label.startsWith('By ')) {
      // Save previous segment type
      if (currentSegType && currentSegments.length > 0) {
        result[currentSegType] = currentSegments;
      }
      currentSegType = label;
      currentSegments = [];
      // The segment type row itself has total data - we don't store this separately
      // (it would be double counting since it equals the sum of its segments)
      continue;
    }

    // This is a segment data row
    if (currentSegType) {
      const yearData = {};
      for (let yi = 0; yi < YEARS.length; yi++) {
        const val = row[yi + 1];
        if (typeof val === 'number') {
          yearData[YEARS[yi]] = val;
        }
      }
      // CAGR is in column 14 (index 14 after label)
      const cagrVal = row[14];
      if (typeof cagrVal === 'number') {
        yearData['CAGR'] = cagrVal;
      }
      currentSegments.push({ name: label, data: yearData });
    }
  }

  // Save last segment type
  if (currentSegType && currentSegments.length > 0) {
    result[currentSegType] = currentSegments;
  }

  return result;
}

function buildValueVolumeJson(geoData) {
  const output = {};

  // First, build "ASEAN and MEA" entry with aggregate data and By Region
  const aseanData = geoData['ASEAN'];
  const meaData = geoData['Middle East & Africa'];

  if (aseanData && meaData) {
    const aseanAndMea = {};

    // For each segment type, combine ASEAN + MEA aggregate data
    for (const segType of SEGMENT_TYPES) {
      const aseanSegs = aseanData[segType] || [];
      const meaSegs = meaData[segType] || [];

      const combined = {};

      // Add segments with year-by-year summing
      const allNames = new Set();
      for (const seg of [...aseanSegs, ...meaSegs]) {
        allNames.add(seg.name);
      }

      for (const name of allNames) {
        const aseanSeg = aseanSegs.find(s => s.name === name);
        const meaSeg = meaSegs.find(s => s.name === name);

        const sumData = {};
        for (const year of YEARS) {
          const a = aseanSeg && aseanSeg.data[year] ? aseanSeg.data[year] : 0;
          const m = meaSeg && meaSeg.data[year] ? meaSeg.data[year] : 0;
          sumData[year] = a + m;
        }
        // Calculate CAGR for combined data (2026-2033)
        const startVal = sumData[2026];
        const endVal = sumData[2033];
        if (startVal && endVal && startVal > 0) {
          sumData['CAGR'] = Math.pow(endVal / startVal, 1 / 7) - 1;
        }

        // Determine hierarchical key
        const hierKeys = getHierarchicalKeys(segType, name);
        for (const { key, displayName } of hierKeys) {
          combined[key] = {};
          combined[key][displayName] = sumData;
        }
      }

      aseanAndMea[segType] = combined;
    }

    // Build "By Region" from "By Country" data in ASEAN and MEA sections
    aseanAndMea['By Region'] = buildByRegion(geoData);

    output['ASEAN and MEA'] = aseanAndMea;
  }

  // Add individual geography entries
  const allGeoNames = Object.keys(geoData);
  for (const geoName of allGeoNames) {
    // Skip ASEAN and MEA aggregates (already combined into "ASEAN and MEA")
    // But DO add them as separate entries too for direct selection
    const geo = geoData[geoName];
    const entry = {};

    for (const segType of SEGMENT_TYPES) {
      const segs = geo[segType] || [];
      const segObj = {};

      for (const seg of segs) {
        const hierKeys = getHierarchicalKeys(segType, seg.name);
        for (const { key, displayName } of hierKeys) {
          segObj[key] = {};
          segObj[key][displayName] = seg.data;
        }
      }

      if (Object.keys(segObj).length > 0) {
        entry[segType] = segObj;
      }
    }

    if (Object.keys(entry).length > 0) {
      output[geoName] = entry;
    }
  }

  return output;
}

function getHierarchicalKeys(segType, name) {
  const hierarchy = SEGMENT_HIERARCHY[segType];
  if (!hierarchy) {
    // No hierarchy for this segment type - use name as-is
    return [{ key: name, displayName: name }];
  }

  // Check if this name is a parent
  if (hierarchy[name]) {
    return [{ key: name, displayName: name }];
  }

  // Check if this name is a child
  for (const [parent, children] of Object.entries(hierarchy)) {
    if (children.includes(name)) {
      return [{ key: parent + ' - ' + name, displayName: name }];
    }
  }

  // Not in hierarchy - standalone
  return [{ key: name, displayName: name }];
}

function buildByRegion(geoData) {
  const byRegion = {};

  // Middle East & Africa total - use the "By Country" totals from MEA section
  // or the first segment type total from MEA section
  const meaData = geoData['Middle East & Africa'];
  if (meaData) {
    // Get MEA total from By Country section or from first segment type
    const meaByCountry = meaData['By Country'];
    if (meaByCountry) {
      // MEA total is implied by the segment type total row
      // Use the first segment type total for MEA
    }
    // Use "By Product Type" first segment total as proxy for MEA total
    // Actually, we need the "By Country" total row value
    // The "By Country" row in the Excel has the total, but we skipped it
    // Let's sum the By Country children instead
    const meaTotal = sumGeoTotals(geoData, MEA_CHILDREN);
    byRegion['Middle East & Africa'] = { 'Middle East & Africa': meaTotal };

    // GCC total
    const gccTotal = sumGeoTotals(geoData, GCC_COUNTRIES);
    byRegion['Middle East & Africa - GCC'] = { 'GCC': gccTotal };

    // GCC countries
    for (const country of GCC_COUNTRIES) {
      const countryTotal = getGeoTotal(geoData, country);
      if (countryTotal) {
        byRegion['Middle East & Africa - GCC - ' + country] = {};
        byRegion['Middle East & Africa - GCC - ' + country][country] = countryTotal;
      }
    }

    // Other MEA children (South Africa, Turkey, Rest of MEA)
    for (const child of ['Turkey', 'South Africa', 'Rest of Middle East & Africa']) {
      const childTotal = getGeoTotal(geoData, child);
      if (childTotal) {
        byRegion['Middle East & Africa - ' + child] = {};
        byRegion['Middle East & Africa - ' + child][child] = childTotal;
      }
    }
  }

  // ASEAN total
  const aseanTotal = sumGeoTotals(geoData, ASEAN_COUNTRIES);
  byRegion['ASEAN'] = { 'ASEAN': aseanTotal };

  // ASEAN countries
  for (const country of ASEAN_COUNTRIES) {
    const countryTotal = getGeoTotal(geoData, country);
    if (countryTotal) {
      if (country === 'Singapore' || country === 'Brunei') {
        // These were standalone in the old format, keep them that way
        // Actually in segmentation_analysis they are under ASEAN, so use ASEAN prefix
        byRegion['ASEAN - ' + country] = {};
        byRegion['ASEAN - ' + country][country] = countryTotal;
      } else {
        byRegion['ASEAN - ' + country] = {};
        byRegion['ASEAN - ' + country][country] = countryTotal;
      }
    }
  }

  return byRegion;
}

function getGeoTotal(geoData, geoName) {
  // Get total for a geography by using its first segment type total
  // The total for any segment type row equals the geography total
  const geo = geoData[geoName];
  if (!geo) return null;

  // Use "By Product Type" segment data - sum the top-level segments (parents only)
  const bpt = geo['By Product Type'];
  if (!bpt || bpt.length === 0) return null;

  // Sum only parent-level segments (Electric Golf Cart + ICE Golf Carts)
  // NOT their children (to avoid double counting)
  const parentNames = Object.keys(SEGMENT_HIERARCHY['By Product Type']);
  const parents = bpt.filter(s => parentNames.includes(s.name));

  if (parents.length > 0) {
    const total = {};
    for (const year of YEARS) {
      total[year] = 0;
      for (const p of parents) {
        total[year] += p.data[year] || 0;
      }
    }
    return total;
  }

  // Fallback: sum all segments at top level
  return null;
}

function sumGeoTotals(geoData, geoNames) {
  const total = {};
  for (const year of YEARS) {
    total[year] = 0;
  }

  for (const name of geoNames) {
    const geoTotal = getGeoTotal(geoData, name);
    if (geoTotal) {
      for (const year of YEARS) {
        total[year] += geoTotal[year] || 0;
      }
    }
  }

  return total;
}

function buildSegmentationAnalysis() {
  const seg = {
    'ASEAN and MEA': {}
  };

  // By Product Type - only leaf items
  seg['ASEAN and MEA']['By Product Type'] = {
    'Electric Golf Cart - Lead-Acid Battery': { 'Lead-Acid Battery': {} },
    'Electric Golf Cart - Lithium-ion Battery': { 'Lithium-ion Battery': {} },
    'ICE Golf Carts - Gasoline': { 'Gasoline': {} },
    'ICE Golf Carts - Diesel': { 'Diesel': {} }
  };

  // By Seating Capacity - flat
  seg['ASEAN and MEA']['By Seating Capacity'] = {
    '2-Seater': { '2-Seater': {} },
    '4-Seater': { '4-Seater': {} },
    '6-Seater': { '6-Seater': {} },
    '8-Seater and Above': { '8-Seater and Above': {} }
  };

  // By Usage Mode - flat
  seg['ASEAN and MEA']['By Usage Mode'] = {
    'Passenger Golf Carts': { 'Passenger Golf Carts': {} },
    'Utility Golf Carts': { 'Utility Golf Carts': {} }
  };

  // By Seller Type - flat
  seg['ASEAN and MEA']['By Seller Type'] = {
    'Direct Sales (OEM to Customer)': { 'Direct Sales (OEM to Customer)': {} },
    'Dealer/Distributor Sales': { 'Dealer/Distributor Sales': {} },
    'Retailer': { 'Retailer': {} }
  };

  // By Sales Channel - flat
  seg['ASEAN and MEA']['By Sales Channel'] = {
    'Online': { 'Online': {} },
    'Offline': { 'Offline': {} }
  };

  // By End-User/Customer - flat
  seg['ASEAN and MEA']['By End-User/Customer'] = {
    'Golf Courses & Clubs': { 'Golf Courses & Clubs': {} },
    'Hospitality & Tourism (Hotels, Resorts, Theme Parks)': { 'Hospitality & Tourism (Hotels, Resorts, Theme Parks)': {} },
    'Airports & Transportation Hubs': { 'Airports & Transportation Hubs': {} },
    'Industrial Facilities & Warehouses': { 'Industrial Facilities & Warehouses': {} },
    'Residential Communities': { 'Residential Communities': {} },
    'Educational & Healthcare Campuses': { 'Educational & Healthcare Campuses': {} }
  };

  // By Region - nested hierarchy
  seg['ASEAN and MEA']['By Region'] = {
    'Middle East & Africa': {
      'GCC': {
        'Saudi Arabia': {},
        'UAE': {},
        'Qatar': {},
        'Kuwait': {},
        'Oman': {},
        'Bahrain': {}
      },
      'Turkey': {},
      'South Africa': {},
      'Rest of Middle East & Africa': {}
    },
    'ASEAN': {
      'Thailand': {},
      'Vietnam': {},
      'Cambodia': {},
      'Laos': {},
      'Myanmar': {},
      'Indonesia': {},
      'Malaysia': {},
      'Philippines': {},
      'Singapore': {},
      'Brunei': {}
    }
  };

  return seg;
}

function main() {
  console.log('Reading Excel file...');
  const wb = XLSX.readFile(EXCEL_FILE);

  // Parse Value sheet
  console.log('\nParsing Value sheet...');
  const valueSheet = XLSX.utils.sheet_to_json(wb.Sheets['Value'], { header: 1 });
  const valueGeoData = parseSheet(valueSheet);
  console.log('Value geographies:', Object.keys(valueGeoData));

  // Parse Volume sheet
  console.log('\nParsing Volume sheet...');
  const volumeSheet = XLSX.utils.sheet_to_json(wb.Sheets['Volume'], { header: 1 });
  const volumeGeoData = parseSheet(volumeSheet);
  console.log('Volume geographies:', Object.keys(volumeGeoData));

  // Build value.json
  console.log('\nBuilding value.json...');
  const valueJson = buildValueVolumeJson(valueGeoData);
  console.log('Value JSON top-level keys:', Object.keys(valueJson));

  // Build volume.json
  console.log('\nBuilding volume.json...');
  const volumeJson = buildValueVolumeJson(volumeGeoData);
  console.log('Volume JSON top-level keys:', Object.keys(volumeJson));

  // Build segmentation_analysis.json
  console.log('\nBuilding segmentation_analysis.json...');
  const segJson = buildSegmentationAnalysis();

  // Verify: spot-check ASEAN By Product Type for 2021
  const aseanBPT = valueJson['ASEAN and MEA'] && valueJson['ASEAN and MEA']['By Product Type'];
  if (aseanBPT) {
    const ec = aseanBPT['Electric Golf Cart'];
    if (ec) {
      const ecData = ec['Electric Golf Cart'];
      console.log('\nSpot-check ASEAN+MEA Electric Golf Cart 2021:', ecData && ecData[2021]);
    }
  }

  // Verify: Thailand By Product Type 2021
  const thBPT = valueJson['Thailand'] && valueJson['Thailand']['By Product Type'];
  if (thBPT) {
    const ec = thBPT['Electric Golf Cart'];
    if (ec) {
      const ecData = ec['Electric Golf Cart'];
      console.log('Spot-check Thailand Electric Golf Cart 2021:', ecData && ecData[2021]);
    }
  }

  // Verify no double counting: ASEAN+MEA total should equal sum of ASEAN + MEA
  const aseanMeaBPT = valueJson['ASEAN and MEA']['By Product Type'];
  const ecTotal2021 = aseanMeaBPT['Electric Golf Cart']['Electric Golf Cart'][2021];
  const aseanEC2021 = valueJson['ASEAN'] && valueJson['ASEAN']['By Product Type'] &&
    valueJson['ASEAN']['By Product Type']['Electric Golf Cart'] &&
    valueJson['ASEAN']['By Product Type']['Electric Golf Cart']['Electric Golf Cart'][2021];
  const meaEC2021 = valueJson['Middle East & Africa'] && valueJson['Middle East & Africa']['By Product Type'] &&
    valueJson['Middle East & Africa']['By Product Type']['Electric Golf Cart'] &&
    valueJson['Middle East & Africa']['By Product Type']['Electric Golf Cart']['Electric Golf Cart'][2021];
  console.log(`\nDouble-count check (2021 Electric Golf Cart):`);
  console.log(`  ASEAN+MEA combined: ${ecTotal2021}`);
  console.log(`  ASEAN: ${aseanEC2021}, MEA: ${meaEC2021}, Sum: ${(aseanEC2021 || 0) + (meaEC2021 || 0)}`);

  // Write output files
  console.log('\nWriting output files...');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'value.json'), JSON.stringify(valueJson, null, 2));
  console.log('  Written: value.json');

  fs.writeFileSync(path.join(OUTPUT_DIR, 'volume.json'), JSON.stringify(volumeJson, null, 2));
  console.log('  Written: volume.json');

  fs.writeFileSync(path.join(OUTPUT_DIR, 'segmentation_analysis.json'), JSON.stringify(segJson, null, 2));
  console.log('  Written: segmentation_analysis.json');

  console.log('\nDone!');
}

main();
