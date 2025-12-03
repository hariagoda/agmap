/**
 * Control registry for pluggable map controls.
 *
 * Provides a centralized system for registering and creating map controls.
 *
 * @module controls/registry
 */

import { BangkokZoomControl } from './BangkokZoomControl';
import type { ControlFactory, ControlRegistry } from './types';

/**
 * Default control registry with built-in controls.
 */
const defaultRegistry: ControlRegistry = new Map<string, ControlFactory>();

/**
 * Register a control factory in the registry.
 *
 * @param id - Unique control identifier
 * @param factory - Factory function that creates the control
 *
 * @example
 * ```typescript
 * registerControl('custom-zoom', (options) => new CustomZoomControl(options));
 * ```
 */
export function registerControl(id: string, factory: ControlFactory): void {
  defaultRegistry.set(id, factory);
}

/**
 * Get a control factory from the registry.
 *
 * @param id - Control identifier
 * @returns Control factory function or undefined if not found
 */
export function getControlFactory(id: string): ControlFactory | undefined {
  return defaultRegistry.get(id);
}

/**
 * Check if a control is registered.
 *
 * @param id - Control identifier
 * @returns True if control is registered
 */
export function hasControl(id: string): boolean {
  return defaultRegistry.has(id);
}

/**
 * Initialize default controls.
 * Registers built-in controls like BangkokZoomControl.
 */
function initializeDefaultControls(): void {
  // Register Bangkok zoom control
  registerControl('bangkok-zoom', (options) => {
    return new BangkokZoomControl(options as { center?: [number, number]; zoom?: number });
  });
}

// Initialize default controls on module load
initializeDefaultControls();
