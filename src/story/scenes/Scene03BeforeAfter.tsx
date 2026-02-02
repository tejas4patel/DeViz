import comparisonDataRaw from '../data/scene03-comparison.json';
import '../common-styles.css';
import './Scene03BeforeAfter.css';

interface Feature {
  label: string;
  value: string;
  description: string;
}

interface Period {
  period: string;
  title: string;
  icon: string;
  features: Feature[];
  summary: string;
}

interface ComparisonData {
  before: Period;
  after: Period;
  transition: {
    year: number;
    impact: string;
  };
}

const comparisonData = comparisonDataRaw as ComparisonData;

// Feature Icons - detailed SVGs for each category
const FeatureIcons: { [key: string]: (color: string) => JSX.Element } = {
  'Data Collection': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="6" width="24" height="20" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <path d="M4 12H28" stroke={color} strokeWidth="2"/>
      <circle cx="8" cy="9" r="1.5" fill={color}/>
      <circle cx="12" cy="9" r="1.5" fill={color}/>
      <circle cx="16" cy="9" r="1.5" fill={color}/>
      <rect x="8" y="16" width="8" height="2" rx="1" fill={color}/>
      <rect x="8" y="20" width="12" height="2" rx="1" fill={color}/>
    </svg>
  ),
  'Time Coverage': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="6" width="24" height="22" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <path d="M4 12H28" stroke={color} strokeWidth="2"/>
      <path d="M10 4V8M22 4V8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <rect x="8" y="16" width="4" height="4" rx="1" fill={color}/>
      <rect x="14" y="16" width="4" height="4" rx="1" fill={color}/>
      <rect x="20" y="16" width="4" height="4" rx="1" fill={color}/>
      <rect x="8" y="22" width="4" height="4" rx="1" fill={color}/>
      <rect x="14" y="22" width="4" height="4" rx="1" fill={color} fillOpacity="0.5"/>
    </svg>
  ),
  'Centers Participating': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 4L4 12V28H28V12L16 4Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <rect x="13" y="18" width="6" height="10" fill={color}/>
      <rect x="8" y="14" width="4" height="4" rx="0.5" fill={color} fillOpacity="0.6"/>
      <rect x="20" y="14" width="4" height="4" rx="0.5" fill={color} fillOpacity="0.6"/>
      <path d="M16 4V10" stroke={color} strokeWidth="2"/>
      <path d="M14 8H18" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  'Annual Visit Records': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="4" width="24" height="24" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <path d="M8 20L12 16L16 18L20 12L24 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8" cy="20" r="2" fill={color}/>
      <circle cx="12" cy="16" r="2" fill={color}/>
      <circle cx="16" cy="18" r="2" fill={color}/>
      <circle cx="20" cy="12" r="2" fill={color}/>
      <circle cx="24" cy="14" r="2" fill={color}/>
    </svg>
  ),
  'Data Quality': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <path d="M10 16L14 20L22 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Site Burden': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="12" r="6" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <path d="M8 28C8 24 11.5 20 16 20C20.5 20 24 24 24 28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 14V10M14 12H18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
};

// Header Icons
const ManualIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <defs>
      <linearGradient id="manualGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#244855"/>
        <stop offset="100%" stopColor="#1a3540"/>
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="48" height="48" rx="12" fill="url(#manualGrad)"/>
    <rect x="16" y="12" width="24" height="32" rx="2" fill="white" fillOpacity="0.95"/>
    <rect x="20" y="8" width="16" height="8" rx="2" fill="#FBE9D0" stroke="#244855" strokeWidth="1.5"/>
    <rect x="20" y="20" width="16" height="2" rx="1" fill="#244855"/>
    <rect x="20" y="26" width="12" height="2" rx="1" fill="#244855" fillOpacity="0.6"/>
    <rect x="20" y="32" width="14" height="2" rx="1" fill="#244855" fillOpacity="0.6"/>
    <rect x="20" y="38" width="10" height="2" rx="1" fill="#244855" fillOpacity="0.6"/>
    <circle cx="38" cy="38" r="8" fill="#E64833"/>
    <path d="M35 38H41M38 35V41" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const AutomatedIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <defs>
      <linearGradient id="autoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#874F41"/>
        <stop offset="100%" stopColor="#6b3d32"/>
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="48" height="48" rx="12" fill="url(#autoGrad)"/>
    <ellipse cx="28" cy="18" rx="16" ry="6" fill="white" fillOpacity="0.95"/>
    <path d="M12 18V38C12 41.314 19.163 44 28 44C36.837 44 44 41.314 44 38V18" stroke="white" strokeWidth="2.5"/>
    <path d="M12 28C12 31.314 19.163 34 28 34C36.837 34 44 31.314 44 28" stroke="white" strokeWidth="2"/>
    <circle cx="40" cy="16" r="8" fill="#4CAF50"/>
    <path d="M36 16L39 19L44 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="28" cy="24" r="2" fill="#874F41"/>
    <circle cx="22" cy="24" r="1.5" fill="#874F41" fillOpacity="0.6"/>
    <circle cx="34" cy="24" r="1.5" fill="#874F41" fillOpacity="0.6"/>
  </svg>
);

// Arrow animation icon
const TransitionArrow = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="scene03__transition-arrow">
    <defs>
      <linearGradient id="arrowGrad" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#244855"/>
        <stop offset="50%" stopColor="#E64833"/>
        <stop offset="100%" stopColor="#874F41"/>
      </linearGradient>
    </defs>
    <path d="M8 24H40M40 24L28 12M40 24L28 36" stroke="url(#arrowGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Scene03BeforeAfter() {
  const beforeColor = '#244855';
  const afterColor = '#874F41';

  return (
    <div className="scene03">
      <div className="scene03__wrapper">
        <div className="scene03__grid">
          {/* Before Panel */}
          <div className="scene03__panel scene03__panel--before">
            <div className="scene03__panel-glow scene03__panel-glow--before" />

            <div className="scene03__panel-header">
              <div className="scene03__icon-container">
                <ManualIcon />
              </div>
              <div className="scene03__header-content">
                <span className="scene03__period scene03__period--before">{comparisonData.before.period}</span>
                <h2 className="scene03__title">{comparisonData.before.title}</h2>
              </div>
            </div>

            <div className="scene03__features-grid">
              {comparisonData.before.features.map((feature, index) => (
                <div key={index} className="scene03__feature scene03__feature--before">
                  <div className="scene03__feature-icon">
                    {FeatureIcons[feature.label]?.(beforeColor)}
                  </div>
                  <div className="scene03__feature-content">
                    <span className="scene03__feature-label">{feature.label}</span>
                    <span className="scene03__feature-value">{feature.value}</span>
                    <span className="scene03__feature-desc">{feature.description}</span>
                  </div>
                  <div className="scene03__feature-number">{index + 1}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Transition */}
          <div className="scene03__transition">
            <div className="scene03__transition-line scene03__transition-line--top" />
            <div className="scene03__transition-badge">
              <div className="scene03__transition-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 4L24 10V18L14 24L4 18V10L14 4Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
                  <path d="M4 10L14 16M14 16L24 10M14 16V24" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <span className="scene03__transition-year">{comparisonData.transition.year}</span>
              <span className="scene03__transition-label">Redesign</span>
            </div>
            <div className="scene03__transition-line scene03__transition-line--bottom" />
            <TransitionArrow />
          </div>

          {/* After Panel */}
          <div className="scene03__panel scene03__panel--after">
            <div className="scene03__panel-glow scene03__panel-glow--after" />

            <div className="scene03__panel-header">
              <div className="scene03__icon-container">
                <AutomatedIcon />
              </div>
              <div className="scene03__header-content">
                <span className="scene03__period scene03__period--after">{comparisonData.after.period}</span>
                <h2 className="scene03__title">{comparisonData.after.title}</h2>
              </div>
            </div>

            <div className="scene03__features-grid">
              {comparisonData.after.features.map((feature, index) => (
                <div key={index} className="scene03__feature scene03__feature--after">
                  <div className="scene03__feature-icon">
                    {FeatureIcons[feature.label]?.(afterColor)}
                  </div>
                  <div className="scene03__feature-content">
                    <span className="scene03__feature-label">{feature.label}</span>
                    <span className="scene03__feature-value">{feature.value}</span>
                    <span className="scene03__feature-desc">{feature.description}</span>
                  </div>
                  <div className="scene03__feature-number">{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Banner */}
        <div className="scene03__impact">
          <div className="scene03__impact-content">
            <div className="scene03__impact-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L18 12H26L20 18L22 26L16 21L10 26L12 18L6 12H14L16 4Z" fill="#FFD700" stroke="#FFA000" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="scene03__impact-text">
              <span className="scene03__impact-label">Key Impact</span>
              <span className="scene03__impact-value">{comparisonData.transition.impact}</span>
            </div>
          </div>
          <div className="scene03__impact-stats">
            <div className="scene03__stat">
              <span className="scene03__stat-value">8x</span>
              <span className="scene03__stat-label">More Visits</span>
            </div>
            <div className="scene03__stat-divider" />
            <div className="scene03__stat">
              <span className="scene03__stat-value">3x</span>
              <span className="scene03__stat-label">More Centers</span>
            </div>
            <div className="scene03__stat-divider" />
            <div className="scene03__stat">
              <span className="scene03__stat-value">12mo</span>
              <span className="scene03__stat-label">Full Coverage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
