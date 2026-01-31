# NAMCS Health Center Data

> Microdata, dashboards, and linkage for patient centered outcomes research

An interactive data storytelling visualization project that communicates the architecture and capabilities of the NAMCS (National Association of Community Health Centers) Health Center data ecosystem.

## Overview

This project is a scrollable/slideable presentation with 16 scenes that walk users through the three main data access pillars of the NAMCS Health Center data system:

1. **Microdata** - Full patient-level EHR data for detailed analysis
2. **Dashboards** - Interactive preliminary estimates without coding
3. **External Linkage** - Connections to HUD, NDI, and other data sources

The visualization is designed for researchers, clinicians, policymakers, and community stakeholders to understand how to access and use NAMCS health center data for outcomes research.

## Tech Stack

- **React 18.3.1** - UI framework
- **TypeScript 5.5.4** - Type-safe JavaScript with strict mode
- **D3.js 7.9.0** - Data visualization library
- **Vite 5.4.1** - Fast build tool and dev server
- **Vitest 1.6.1** - Unit testing framework
- **React Testing Library 14.3.1** - Component testing

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:5173
```

### Available Scripts

- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
namcs-data-sources/
├── public/
│   └── data/          # JSON data files for scenes (to be added)
├── src/
│   ├── main.tsx       # React DOM entry point
│   ├── App.tsx        # Main app component
│   ├── styles.css     # Global styles and design system
│   ├── data/          # Data loading utilities (to be added)
│   ├── test/          # Test setup and utilities
│   │   └── setup.ts   # Vitest setup with @testing-library/jest-dom
│   └── story/
│       ├── ScrollStoryShell.tsx     # Main navigation shell
│       ├── SceneRenderer.tsx        # Scene lazy loading
│       ├── DeckBrand.tsx            # Header with progress rail
│       ├── DeckSlideRailFlowline.tsx # Scene progress visualization
│       ├── storyData.ts             # Story configuration
│       ├── sceneData.ts             # Scene data
│       ├── storyTypes.ts            # TypeScript type definitions
│       ├── viz/                     # Reusable visualization utilities
│       │   ├── chartAxes.ts         # D3 axis helpers
│       │   └── useResizeObserver.ts # Responsive sizing hook
│       └── scenes/                  # Individual scene components
│           ├── Scene01Pillars.tsx   # Force graph visualization
│           ├── Scene04Growth.tsx    # Bar chart visualization
│           ├── Scene08Maternal.tsx  # Grouped bar chart
│           └── ...                  # Additional scenes
├── docs/
│   ├── ARCHITECTURE.md        # Technical architecture documentation
│   └── SCENE_DEVELOPMENT.md   # Guide for implementing scenes
├── vitest.config.ts           # Vitest configuration
├── vite.config.ts             # Vite build configuration
├── tsconfig.json              # TypeScript configuration
├── .eslintrc.cjs              # ESLint configuration
└── .prettierrc                # Prettier configuration
```

## Scene Architecture

The project uses a scene-based architecture where each scene is a self-contained React component that renders one part of the data story.

### Implemented Scenes

- **Scene 01: Three Pillars** - Interactive force-directed graph showing the three data access pillars
- **Scene 04: Participation Growth** - Bar chart showing growth from 2021-2023
- **Scene 08: Maternal Health** - Grouped bar chart showing maternal health outcomes

### Placeholder Scenes (12 remaining)

Scenes 2, 3, 5, 6, 7, 9-16 are currently placeholders awaiting implementation. See [docs/SCENE_DEVELOPMENT.md](docs/SCENE_DEVELOPMENT.md) for implementation guidelines.

## Navigation

Users can navigate through scenes using:

- **Keyboard**: Arrow keys, Page Up/Down, Home/End, Space, Shift+Space
- **Mouse**: Scroll wheel
- **UI**: Click on scene indicators in the progress rail

Press **Escape** to toggle the help overlay.

## Data Flow

1. **Static Data** (current): Data is defined in `src/story/sceneData.ts`
2. **Dynamic Data** (planned): Data will be loaded from JSON files in `public/data/` using data loading hooks

## Testing

This project uses **Vitest** for testing with **React Testing Library** for component tests.

### Running Tests

```bash
# Run all tests in watch mode
npm run test

# Run tests once (CI mode)
npm run test -- --run

# Run with coverage
npm run test:coverage

# Open test UI
npm run test:ui
```

### Writing Tests

- Place test files next to the code they test: `MyComponent.test.tsx`
- Use `describe` blocks to group related tests
- Use descriptive test names that explain what behavior is being tested
- Test user interactions and outcomes, not implementation details

Example:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render the title', () => {
    render(<MyComponent title="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## TypeScript

This project uses **strict TypeScript** with the following rules:

- `strict: true` - All strict type checking enabled
- `@typescript-eslint/no-explicit-any: 'error'` - No `any` types allowed
- ESM modules only (`"type": "module"` in package.json)

All D3 visualizations use properly typed D3 scales and selections to maintain type safety.

## Styling

The project uses a custom CSS design system with CSS variables for theming:

### Color Palette

- `--brand-primary: #1F2A44` - Navy
- `--brand-secondary: #2F6FED` - Blue
- `--brand-accent: #2BB0A6` - Teal

### Fonts

- **Headings**: 'Playfair Display' (serif)
- **Body**: 'Inter' (sans-serif)

### Reusable Classes

- `.card` - Glassmorphic floating panels
- `.small` - 12px font for secondary text
- `.btn` - Base button styling
- `.kv` - Key-value pair layout

## Contributing

### Before You Start

1. Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) to understand the project structure
2. Read [docs/SCENE_DEVELOPMENT.md](docs/SCENE_DEVELOPMENT.md) if implementing scenes
3. Ensure you have the latest dependencies: `npm install`

### Development Workflow

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes with tests
3. Ensure all checks pass:
   ```bash
   npm run typecheck   # TypeScript must compile
   npm run lint        # ESLint must pass
   npm run test -- --run  # All tests must pass
   npm run build       # Build must succeed
   ```
4. Format code: `npm run format`
5. Commit with descriptive message
6. Push and create a pull request

### Code Standards

- **No `any` types** - Use proper TypeScript types
- **Test coverage** - All new features should have tests
- **Accessibility** - All interactive elements must be keyboard accessible
- **No console errors** - Clean console in development mode
- **Consistent formatting** - Use Prettier (runs automatically with `npm run format`)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Modern ES2022 features are used, so IE11 is not supported.

## License

[Add license information here]

## Acknowledgments

This project visualizes data from the National Ambulatory Medical Care Survey (NAMCS) Health Center component, managed by the National Center for Health Statistics (NCHS).

---

**Status**: Active development - Phase 1 complete (Foundation & Quick Wins)

For technical details, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
