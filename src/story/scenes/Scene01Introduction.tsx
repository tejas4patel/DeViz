import { ForceDirectedGraph, NodeGroupConfig } from '../viz/ForceDirectedGraph';
import graphData from '../data/scene01-graph.json';

// Define node group configurations with all visual parameters
const nodeGroupConfigs: Record<string, NodeGroupConfig> = {
  hub: {
    gradient: ['#244855', '#2d5a6b'],
    satelliteGradient: ['#5a7d8a', '#7a9aa8'],
    stroke: '#1a3540',
    radius: 60,
    glowRadius: 72,
    collisionRadius: 90,
    fontSize: 14,
    maxChars: 12,
  },
  pillar: {
    gradient: ['#E64833', '#f05a42'],
    satelliteGradient: ['#f28b7a', '#f7a698'],
    stroke: '#b8361f',
    radius: 44,
    glowRadius: 56,
    collisionRadius: 70,
    fontSize: 13,
    maxChars: 10,
  },
  sub: {
    gradient: ['#90AEAD', '#a5c3c2'],
    satelliteGradient: ['#b8d4d3', '#cde3e2'],
    stroke: '#6b8584',
    radius: 32,
    glowRadius: 44,
    collisionRadius: 55,
    fontSize: 11,
    maxChars: 9,
  },
};

export default function Scene01Introduction() {
  return (
    <ForceDirectedGraph
      data={graphData}
      nodeGroupConfigs={nodeGroupConfigs}
      minWidth={860}
      minHeight={400}
      enableDrag={true}
      enableZoom={true}
      enableSatellites={true}
    />
  );
}
