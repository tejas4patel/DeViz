import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This creates synthetic poverty data for demonstration
// In production, use real Census Bureau ACS data

// National poverty rate ranges by region (approximate)
const regionalRates = {
  // FIPS first 2 digits = state
  '01': { min: 14, max: 22 }, // Alabama
  '02': { min: 9, max: 15 },  // Alaska
  '04': { min: 12, max: 18 }, // Arizona
  '05': { min: 13, max: 21 }, // Arkansas
  '06': { min: 10, max: 16 }, // California
  '08': { min: 8, max: 14 },  // Colorado
  '09': { min: 7, max: 13 },  // Connecticut
  '10': { min: 9, max: 15 },  // Delaware
  '11': { min: 14, max: 20 }, // DC
  '12': { min: 11, max: 17 }, // Florida
  '13': { min: 12, max: 18 }, // Georgia
  '15': { min: 9, max: 15 },  // Hawaii
  '16': { min: 11, max: 17 }, // Idaho
  '17': { min: 10, max: 16 }, // Illinois
  '18': { min: 10, max: 16 }, // Indiana
  '19': { min: 9, max: 15 },  // Iowa
  '20': { min: 10, max: 16 }, // Kansas
  '21': { min: 14, max: 22 }, // Kentucky
  '22': { min: 15, max: 23 }, // Louisiana
  '23': { min: 10, max: 16 }, // Maine
  '24': { min: 8, max: 14 },  // Maryland
  '25': { min: 8, max: 14 },  // Massachusetts
  '26': { min: 11, max: 17 }, // Michigan
  '27': { min: 8, max: 14 },  // Minnesota
  '28': { min: 16, max: 24 }, // Mississippi
  '29': { min: 11, max: 17 }, // Missouri
  '30': { min: 11, max: 17 }, // Montana
  '31': { min: 9, max: 15 },  // Nebraska
  '32': { min: 11, max: 17 }, // Nevada
  '33': { min: 7, max: 13 },  // New Hampshire
  '34': { min: 8, max: 14 },  // New Jersey
  '35': { min: 15, max: 23 }, // New Mexico
  '36': { min: 11, max: 17 }, // New York
  '37': { min: 12, max: 18 }, // North Carolina
  '38': { min: 9, max: 15 },  // North Dakota
  '39': { min: 11, max: 17 }, // Ohio
  '40': { min: 13, max: 19 }, // Oklahoma
  '41': { min: 10, max: 16 }, // Oregon
  '42': { min: 10, max: 16 }, // Pennsylvania
  '44': { min: 9, max: 15 },  // Rhode Island
  '45': { min: 12, max: 18 }, // South Carolina
  '46': { min: 11, max: 17 }, // South Dakota
  '47': { min: 12, max: 18 }, // Tennessee
  '48': { min: 12, max: 18 }, // Texas
  '49': { min: 8, max: 14 },  // Utah
  '50': { min: 9, max: 15 },  // Vermont
  '51': { min: 9, max: 15 },  // Virginia
  '53': { min: 9, max: 15 },  // Washington
  '54': { min: 14, max: 22 }, // West Virginia
  '55': { min: 9, max: 15 },  // Wisconsin
  '56': { min: 9, max: 15 },  // Wyoming
};

// Read county TopoJSON to get FIPS codes
const countyTopoPath = path.join(__dirname, '..', 'src', 'story', 'data', 'us-counties.json');
const countyTopo = JSON.parse(fs.readFileSync(countyTopoPath, 'utf-8'));

const countyData = {};

// Generate poverty rates for each county
countyTopo.objects.counties.geometries.forEach((county) => {
  const fips = county.id; // FIPS code
  const stateFips = fips.substring(0, 2);

  const rates = regionalRates[stateFips] || { min: 10, max: 16 };

  // Generate random rate within state range
  const povertyRate = (Math.random() * (rates.max - rates.min) + rates.min).toFixed(1);

  countyData[fips] = {
    fips: fips,
    name: county.properties?.name || 'Unknown',
    povertyRate: parseFloat(povertyRate),
  };
});

const outputPath = path.join(__dirname, '..', 'src', 'story', 'data', 'county-poverty-data.json');
fs.writeFileSync(outputPath, JSON.stringify(countyData, null, 2));

console.log(`Generated poverty data for ${Object.keys(countyData).length} counties`);
console.log(`Output written to: ${outputPath}`);
