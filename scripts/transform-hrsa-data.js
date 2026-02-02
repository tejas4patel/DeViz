import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the CSV file
const csvPath = path.join(__dirname, '..', 'examples', 'Health_Center_Service_Delivery_and_LookAlike_Sites.csv');
const outputPath = path.join(__dirname, '..', 'src', 'story', 'data', 'scene02-fqhc-data.json');

console.log('Reading CSV file...');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.split('\n');

// Parse header
const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
console.log(`Found ${headers.length} columns`);

// Find column indices
const siteNameIdx = headers.findIndex(h => h === 'Site Name');
const xCoordIdx = headers.findIndex(h => h === 'Geocoding Artifact Address Primary X Coordinate');
const yCoordIdx = headers.findIndex(h => h === 'Geocoding Artifact Address Primary Y Coordinate');
const stateIdx = headers.findIndex(h => h === 'Site State Abbreviation');
const countyIdx = headers.findIndex(h => h === 'Complete County Name');
const typeIdx = headers.findIndex(h => h === 'Health Center Type Description');
const statusIdx = headers.findIndex(h => h === 'Site Status Description');
const addressIdx = headers.findIndex(h => h === 'Site Address');
const cityIdx = headers.findIndex(h => h === 'Site City');
const zipIdx = headers.findIndex(h => h === 'Site Postal Code');

console.log('Column indices:', {
  siteName: siteNameIdx,
  xCoord: xCoordIdx,
  yCoord: yCoordIdx,
  state: stateIdx,
  county: countyIdx,
  type: typeIdx,
  status: statusIdx
});

// Parse CSV rows
const sites = [];
let skipped = 0;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  // Simple CSV parser (handles quoted fields)
  const values = [];
  let currentValue = '';
  let insideQuotes = false;

  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      values.push(currentValue.trim());
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  values.push(currentValue.trim()); // Push last value

  // Extract data
  const siteName = values[siteNameIdx] || '';
  const lng = parseFloat(values[xCoordIdx]);
  const lat = parseFloat(values[yCoordIdx]);
  const state = values[stateIdx] || '';
  const county = values[countyIdx] || '';
  const type = values[typeIdx] || '';
  const status = values[statusIdx] || '';
  const address = values[addressIdx] || '';
  const city = values[cityIdx] || '';
  const zip = values[zipIdx] || '';

  // Skip if missing critical data
  if (!siteName || isNaN(lng) || isNaN(lat) || !state) {
    skipped++;
    continue;
  }

  // Only include active sites (check for various active status values)
  const statusLower = status.toLowerCase();
  if (statusLower && !statusLower.includes('active') && !statusLower.includes('open')) {
    skipped++;
    continue;
  }

  sites.push({
    id: `site_${i}`,
    name: siteName,
    coordinates: [lng, lat],
    state: state,
    county: county,
    type: type,
    address: `${address}, ${city}, ${state} ${zip}`.trim()
  });
}

console.log(`Processed ${sites.length} sites (skipped ${skipped})`);
console.log(`States represented: ${new Set(sites.map(s => s.state)).size}`);

// Write JSON output
const output = {
  metadata: {
    source: 'HRSA Health Center Service Delivery and Look-Alike Sites',
    generatedAt: new Date().toISOString(),
    totalSites: sites.length
  },
  sites: sites
};

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`\nOutput written to: ${outputPath}`);
console.log(`Total sites: ${sites.length}`);
