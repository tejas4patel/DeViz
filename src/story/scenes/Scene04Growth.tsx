import { useState, useMemo } from 'react';
import { USMap } from '../viz/USMap';
import type { FQHCData, FQHCSite } from '../viz/USMap';
import type { Topology } from 'topojson-specification';
import usStatesRaw from '../data/us-states.json';
import participatingCentersRaw from '../data/scene04-participating-centers.json';
import './Scene04Growth.css';

const usTopology = usStatesRaw as unknown as Topology;

interface YearData {
  centers: number;
  visits_millions: number;
  newCenters?: number;
  sites: FQHCSite[];
}

interface ParticipatingCentersData {
  metadata: {
    source: string;
    description: string;
    totalCenters2021: number;
    totalCenters2022: number;
    totalCenters2023: number;
  };
  years: {
    [key: string]: YearData;
  };
}

const participatingCenters = participatingCentersRaw as unknown as ParticipatingCentersData;

const YEARS = ['2021', '2022', '2023'] as const;
type Year = typeof YEARS[number];

const YEAR_COLORS: Record<Year, string> = {
  '2021': '#244855',
  '2022': '#90AEAD',
  '2023': '#E64833',
};

export default function Scene04Growth() {
  const [selectedYear, setSelectedYear] = useState<Year>('2023');

  // Get cumulative sites up to selected year
  const cumulativeSites = useMemo(() => {
    const allSites: FQHCSite[] = [];
    for (const year of YEARS) {
      const yearData = participatingCenters.years[year];
      if (yearData) {
        allSites.push(...yearData.sites);
      }
      if (year === selectedYear) break;
    }
    return allSites;
  }, [selectedYear]);

  // Create FQHCData structure for USMap
  const mapData: FQHCData = useMemo(() => ({
    metadata: {
      source: 'NAMCS HC Component',
      generatedAt: new Date().toISOString(),
      totalSites: cumulativeSites.length,
    },
    sites: cumulativeSites,
  }), [cumulativeSites]);

  const currentYearData = participatingCenters.years[selectedYear];
  const previousYear = selectedYear === '2021' ? null : YEARS[YEARS.indexOf(selectedYear) - 1];
  const previousYearData = previousYear ? participatingCenters.years[previousYear] : null;

  // Calculate growth percentages
  const centersGrowth = previousYearData
    ? Math.round(((currentYearData.centers - previousYearData.centers) / previousYearData.centers) * 100)
    : null;
  const visitsGrowth = previousYearData
    ? Math.round(((currentYearData.visits_millions - previousYearData.visits_millions) / previousYearData.visits_millions) * 100)
    : null;

  return (
    <div className="scene04">
      {/* Header with Year Tabs */}
      <div className="scene04__header">
        <div className="scene04__tabs">
          {YEARS.map((year) => (
            <button
              key={year}
              className={`scene04__tab ${selectedYear === year ? 'scene04__tab--active' : ''}`}
              onClick={() => setSelectedYear(year)}
              style={{
                '--tab-color': YEAR_COLORS[year],
              } as React.CSSProperties}
            >
              <span className="scene04__tab-year">{year}</span>
              <span className="scene04__tab-centers">
                {participatingCenters.years[year].centers} centers
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Stats + Map */}
      <div className="scene04__content">
        {/* Statistics Panel */}
        <div className="scene04__stats">
          <div className="scene04__stat-card scene04__stat-card--primary">
            <div className="scene04__stat-icon">🏥</div>
            <div className="scene04__stat-value">{currentYearData.centers}</div>
            <div className="scene04__stat-label">Participating Centers</div>
            {centersGrowth !== null && (
              <div className="scene04__stat-growth">
                <span className="scene04__stat-arrow">↑</span>
                {centersGrowth}% from {previousYear}
              </div>
            )}
          </div>

          <div className="scene04__stat-card scene04__stat-card--secondary">
            <div className="scene04__stat-icon">📋</div>
            <div className="scene04__stat-value">{currentYearData.visits_millions.toFixed(2)}M</div>
            <div className="scene04__stat-label">Visit Records</div>
            {visitsGrowth !== null && (
              <div className="scene04__stat-growth">
                <span className="scene04__stat-arrow">↑</span>
                {visitsGrowth}% from {previousYear}
              </div>
            )}
          </div>

          {currentYearData.newCenters && (
            <div className="scene04__stat-card scene04__stat-card--highlight">
              <div className="scene04__stat-icon">✨</div>
              <div className="scene04__stat-value">+{currentYearData.newCenters}</div>
              <div className="scene04__stat-label">New Centers in {selectedYear}</div>
            </div>
          )}

          {/* Legend */}
          <div className="scene04__legend">
            <div className="scene04__legend-title">Centers by Year Joined</div>
            {YEARS.filter((y) => YEARS.indexOf(y) <= YEARS.indexOf(selectedYear)).map((year) => (
              <div key={year} className="scene04__legend-item">
                <span
                  className="scene04__legend-dot"
                  style={{ backgroundColor: YEAR_COLORS[year] }}
                />
                <span className="scene04__legend-text">
                  {year} ({participatingCenters.years[year].sites.length} centers)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="scene04__map">
          <USMap
            data={mapData}
            topology={usTopology}
            width={900}
            height={550}
            minWidth={700}
            minHeight={450}
            enableZoom={true}
            enableTooltip={true}
            projectionConfig={{
              type: 'albersUsa',
              scale: 1100,
              translate: [450, 275],
            }}
            zoomConfig={{
              enabled: true,
              scaleExtent: [1, 6],
              translateExtent: [
                [-200, -100],
                [1100, 650],
              ],
            }}
            mapStyleConfig={{
              backgroundColor: '#fafafa',
              stateStroke: '#90AEAD',
              stateFill: '#f0f4f4',
              stateStrokeWidth: 0.75,
              stateHoverFill: '#e8f0ef',
              pointColor: YEAR_COLORS[selectedYear],
              pointRadius: 5,
              pointOpacity: 0.85,
              pointHoverRadius: 8,
              pointHoverOpacity: 1.0,
            }}
            tooltipConfig={{
              enabled: true,
              backgroundColor: '#244855',
              textColor: '#ffffff',
              borderColor: '#E64833',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '13px',
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="scene04__footer">
        <p>
          Geographic distribution of health centers participating in the NAMCS HC EHR-based
          encounter data submission program. Centers are shown cumulatively through the selected year.
        </p>
      </div>
    </div>
  );
}
