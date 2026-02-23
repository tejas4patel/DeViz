import { useEffect, useState } from 'react';
import { USMap } from '../viz/USMap';
import type { FQHCData, CountyData } from '../viz/USMap';
import type { Topology } from 'topojson-specification';
import { SceneLoader } from '../components/SceneLoader';

interface MapData {
  fqhcData: FQHCData;
  usTopology: Topology;
  usCountyTopology: Topology;
  countyPovertyData: Record<string, CountyData>;
}

export default function Scene02FqhcMap() {
  const [mapData, setMapData] = useState<MapData | null>(null);

  useEffect(() => {
    Promise.all([
      import('../data/scene02-fqhc-data.json'),
      import('../data/us-states.json'),
      import('../data/us-counties.json'),
      import('../data/county-poverty-data.json'),
    ]).then(([fqhc, states, counties, poverty]) => {
      setMapData({
        fqhcData: fqhc.default as FQHCData,
        usTopology: states.default as unknown as Topology,
        usCountyTopology: counties.default as unknown as Topology,
        countyPovertyData: poverty.default as Record<string, CountyData>,
      });
    });
  }, []);

  if (!mapData) {
    return <SceneLoader title="Who FQHCs serve and why it matters" />;
  }

  const { fqhcData, usTopology, usCountyTopology, countyPovertyData } = mapData;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        minHeight: '600px',
      }}
    >
      <USMap
        data={fqhcData}
        topology={usTopology}
        countyTopology={usCountyTopology}
        countyData={countyPovertyData}
        width={1200}
        height={700}
        minWidth={1000}
        minHeight={600}
        enableZoom={true}
        enableTooltip={true}
        projectionConfig={{
          type: 'albersUsa',
          scale: 1300,
          translate: [600, 350],
        }}
        zoomConfig={{
          enabled: true,
          scaleExtent: [1, 8],
          translateExtent: [
            [-500, -200],
            [1700, 900],
          ],
        }}
        choroplethConfig={{
          enabled: true,
          colorScheme: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
          minValue: 5,
          maxValue: 25,
          opacity: 0.75,
        }}
        mapStyleConfig={{
          backgroundColor: '#f8f9fa',
          stateStroke: '#2d3748',
          stateFill: '#e2e8f0',
          stateStrokeWidth: 0.5,
          stateHoverFill: '#cbd5e0',
          pointColor: 'none',
          pointRadius: 1.5,
          pointOpacity: 0.8,
          pointHoverRadius: 5,
          pointHoverOpacity: 1.0,
        }}
        tooltipConfig={{
          enabled: true,
          backgroundColor: '#244855',
          textColor: '#ffffff',
          borderColor: '#E64833',
          borderRadius: '6px',
          padding: '10px 14px',
          fontSize: '13px',
        }}
      />
    </div>
  );
}
