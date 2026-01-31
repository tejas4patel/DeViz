import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScenePlaceholder from './ScenePlaceholder';

describe('ScenePlaceholder', () => {
  it('should render without crashing', () => {
    render(<ScenePlaceholder title="Test Scene" description="This is a test description" />);

    expect(screen.getByText('Placeholder')).toBeInTheDocument();
  });

  it('should display the title', () => {
    render(<ScenePlaceholder title="Test Scene" description="This is a test description" />);

    expect(screen.getByText('Test Scene')).toBeInTheDocument();
  });

  it('should display the description', () => {
    render(<ScenePlaceholder title="Test Scene" description="This is a test description" />);

    expect(screen.getByText('This is a test description')).toBeInTheDocument();
  });

  it('should render all expected text elements', () => {
    const { container } = render(
      <ScenePlaceholder title="Custom Title" description="Custom description text" />
    );

    expect(container.querySelector('.kv')).toBeInTheDocument();
    expect(screen.getByText('Placeholder')).toBeInTheDocument();
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom description text')).toBeInTheDocument();
  });
});
