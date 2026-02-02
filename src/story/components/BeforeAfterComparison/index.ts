/**
 * BeforeAfterComparison Component
 *
 * A reusable component for displaying before/after comparisons.
 *
 * @example
 * ```tsx
 * import { BeforeAfterComparison } from './components/BeforeAfterComparison';
 * import type { ComparisonData } from './components/BeforeAfterComparison';
 *
 * const data: ComparisonData = {
 *   before: { period: 'Before', title: 'Old Way', features: [...] },
 *   after: { period: 'After', title: 'New Way', features: [...] },
 *   transition: { year: 2021, impact: 'Major improvements' },
 *   stats: [{ value: '10x', label: 'Faster' }]
 * };
 *
 * <BeforeAfterComparison data={data} />
 * ```
 */

export { default as BeforeAfterComparison } from './BeforeAfterComparison';
export * from './types';
