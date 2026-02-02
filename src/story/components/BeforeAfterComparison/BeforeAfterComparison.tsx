/**
 * BeforeAfterComparison Component
 *
 * A reusable component for displaying before/after comparisons with:
 * - Two side-by-side panels showing different states
 * - A central transition indicator
 * - Feature cards with icons
 * - An impact banner with key statistics
 *
 * Usage:
 * ```tsx
 * <BeforeAfterComparison
 *   data={comparisonData}
 *   theme={{ beforeColor: '#244855', afterColor: '#874F41' }}
 *   showImpactBanner={true}
 * />
 * ```
 */

import {
  BeforeAfterComparisonProps,
  ComparisonFeature,
  ComparisonTheme,
  defaultTheme,
} from './types';
import {
  getFeatureIcon,
  ManualProcessIcon,
  AutomatedProcessIcon,
  TransitionCubeIcon,
  TransitionArrowIcon,
  StarIcon,
} from '../icons/ComparisonIcons';
import './BeforeAfterComparison.css';

export default function BeforeAfterComparison({
  data,
  theme: customTheme,
  className = '',
  showImpactBanner = true,
  showFeatureNumbers = true,
  beforeIcon,
  afterIcon,
}: BeforeAfterComparisonProps) {
  // Merge custom theme with defaults
  const theme: ComparisonTheme = { ...defaultTheme, ...customTheme };

  // Render a single feature card
  const renderFeature = (
    feature: ComparisonFeature,
    index: number,
    variant: 'before' | 'after'
  ) => {
    const color = variant === 'before' ? theme.beforeColor : theme.afterColor;
    const iconKey = feature.iconKey || feature.label;

    return (
      <div
        key={index}
        className={`comparison__feature comparison__feature--${variant}`}
      >
        <div className="comparison__feature-icon">
          {getFeatureIcon(iconKey, color)}
        </div>
        <div className="comparison__feature-content">
          <span className="comparison__feature-label">{feature.label}</span>
          <span className="comparison__feature-value">{feature.value}</span>
          <span className="comparison__feature-desc">{feature.description}</span>
        </div>
        {showFeatureNumbers && (
          <div className="comparison__feature-number">{index + 1}</div>
        )}
      </div>
    );
  };

  // Default header icons
  const defaultBeforeIcon = (
    <ManualProcessIcon
      primaryColor={theme.beforeColor}
      secondaryColor={theme.beforeColorDark}
      accentColor={theme.accentColor}
      gradientId="beforeGradient"
    />
  );

  const defaultAfterIcon = (
    <AutomatedProcessIcon
      primaryColor={theme.afterColor}
      secondaryColor={theme.afterColorDark}
      accentColor={theme.successColor}
      gradientId="afterGradient"
    />
  );

  return (
    <div className={`comparison ${className}`}>
      <div className="comparison__wrapper">
        <div className="comparison__grid">
          {/* Before Panel */}
          <div className="comparison__panel comparison__panel--before">
            <div
              className="comparison__panel-glow comparison__panel-glow--before"
              style={{
                background: `linear-gradient(90deg, ${theme.beforeColor}, ${theme.beforeColorDark}, ${theme.beforeColor})`,
              }}
            />

            <div className="comparison__panel-header">
              <div className="comparison__icon-container">
                {beforeIcon || defaultBeforeIcon}
              </div>
              <div className="comparison__header-content">
                <span
                  className="comparison__period comparison__period--before"
                  style={{ backgroundColor: `${theme.beforeColor}1f`, color: theme.beforeColor }}
                >
                  {data.before.period}
                </span>
                <h2 className="comparison__title">{data.before.title}</h2>
              </div>
            </div>

            <div className="comparison__features-grid">
              {data.before.features.map((feature, index) =>
                renderFeature(feature, index, 'before')
              )}
            </div>
          </div>

          {/* Center Transition */}
          <div className="comparison__transition">
            <div
              className="comparison__transition-line comparison__transition-line--top"
              style={{
                background: `linear-gradient(180deg, transparent 0%, ${theme.beforeColor} 30%, ${theme.accentColor} 100%)`,
              }}
            />
            <div
              className="comparison__transition-badge"
              style={{
                background: `linear-gradient(135deg, ${theme.accentColor} 0%, ${theme.accentColor}cc 100%)`,
              }}
            >
              <div className="comparison__transition-icon">
                <TransitionCubeIcon />
              </div>
              <span className="comparison__transition-year">{data.transition.year}</span>
              <span className="comparison__transition-label">Redesign</span>
            </div>
            <div
              className="comparison__transition-line comparison__transition-line--bottom"
              style={{
                background: `linear-gradient(180deg, ${theme.accentColor} 0%, ${theme.afterColor} 70%, transparent 100%)`,
              }}
            />
            <TransitionArrowIcon gradientId="transitionArrowGrad" />
          </div>

          {/* After Panel */}
          <div className="comparison__panel comparison__panel--after">
            <div
              className="comparison__panel-glow comparison__panel-glow--after"
              style={{
                background: `linear-gradient(90deg, ${theme.afterColor}, ${theme.afterColorDark}, ${theme.afterColor})`,
              }}
            />

            <div className="comparison__panel-header">
              <div className="comparison__icon-container">
                {afterIcon || defaultAfterIcon}
              </div>
              <div className="comparison__header-content">
                <span
                  className="comparison__period comparison__period--after"
                  style={{ backgroundColor: `${theme.afterColor}1f`, color: theme.afterColor }}
                >
                  {data.after.period}
                </span>
                <h2 className="comparison__title">{data.after.title}</h2>
              </div>
            </div>

            <div className="comparison__features-grid">
              {data.after.features.map((feature, index) =>
                renderFeature(feature, index, 'after')
              )}
            </div>
          </div>
        </div>

        {/* Impact Banner */}
        {showImpactBanner && (
          <div
            className="comparison__impact"
            style={{
              background: `linear-gradient(135deg, ${theme.beforeColor} 0%, ${theme.beforeColorDark} 50%, ${theme.beforeColor}dd 100%)`,
            }}
          >
            <div className="comparison__impact-content">
              <div className="comparison__impact-icon">
                <StarIcon />
              </div>
              <div className="comparison__impact-text">
                <span className="comparison__impact-label">Key Impact</span>
                <span className="comparison__impact-value">{data.transition.impact}</span>
              </div>
            </div>
            {data.stats && data.stats.length > 0 && (
              <div className="comparison__impact-stats">
                {data.stats.map((stat, index) => (
                  <div key={index} className="comparison__stat-wrapper">
                    {index > 0 && <div className="comparison__stat-divider" />}
                    <div className="comparison__stat">
                      <span className="comparison__stat-value">{stat.value}</span>
                      <span className="comparison__stat-label">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
