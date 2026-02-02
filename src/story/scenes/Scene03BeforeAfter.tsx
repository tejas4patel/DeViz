/**
 * Scene 03: Before/After Comparison
 *
 * This scene displays the 2021 redesign shift from manual abstraction
 * to full year EHR data collection.
 *
 * Uses the reusable BeforeAfterComparison component with scene-specific data.
 */

import { BeforeAfterComparison, ComparisonData } from '../components/BeforeAfterComparison';
import comparisonDataRaw from '../data/scene03-comparison.json';

// Transform the raw JSON data to match the component's expected format
const comparisonData: ComparisonData = {
  before: {
    period: comparisonDataRaw.before.period,
    title: comparisonDataRaw.before.title,
    features: comparisonDataRaw.before.features,
    summary: comparisonDataRaw.before.summary,
  },
  after: {
    period: comparisonDataRaw.after.period,
    title: comparisonDataRaw.after.title,
    features: comparisonDataRaw.after.features,
    summary: comparisonDataRaw.after.summary,
  },
  transition: {
    year: comparisonDataRaw.transition.year,
    impact: comparisonDataRaw.transition.impact,
  },
  // Key statistics derived from the data
  stats: [
    { value: '8x', label: 'More Visits' },
    { value: '3x', label: 'More Centers' },
    { value: '12mo', label: 'Full Coverage' },
  ],
};

export default function Scene03BeforeAfter() {
  return (
    <BeforeAfterComparison
      data={comparisonData}
      showImpactBanner={true}
      showFeatureNumbers={true}
    />
  );
}
