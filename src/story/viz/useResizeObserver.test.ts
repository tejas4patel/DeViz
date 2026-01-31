import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useResizeObserver } from './useResizeObserver';

describe('useResizeObserver', () => {
  beforeEach(() => {
    // Mock ResizeObserver
    (globalThis as { ResizeObserver: typeof ResizeObserver }).ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  it('should return ref and rect with initial dimensions', () => {
    const { result } = renderHook(() => useResizeObserver<HTMLDivElement>());

    expect(result.current.ref.current).toBeNull();
    expect(result.current.rect).toEqual({ width: 0, height: 0 });
  });

  it('should create ResizeObserver when available', () => {
    renderHook(() => useResizeObserver<HTMLDivElement>());

    expect(globalThis.ResizeObserver).toHaveBeenCalledTimes(1);
  });

  it('should handle missing ResizeObserver gracefully', () => {
    // Temporarily remove ResizeObserver
    const originalResizeObserver = globalThis.ResizeObserver;
    // @ts-expect-error Testing undefined ResizeObserver
    globalThis.ResizeObserver = undefined;

    const { result } = renderHook(() => useResizeObserver<HTMLDivElement>());

    expect(result.current.ref.current).toBeNull();
    expect(result.current.rect).toEqual({ width: 0, height: 0 });

    // Restore ResizeObserver
    globalThis.ResizeObserver = originalResizeObserver;
  });
});
