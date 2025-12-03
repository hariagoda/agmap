/**
 * Type definitions for map controls system.
 *
 * @module controls/types
 */

import type Control from 'ol/control/Control';

/**
 * Control factory function type.
 * Creates a control instance from configuration options.
 */
export type ControlFactory = (options?: Record<string, unknown>) => Control;

/**
 * Control registry entry.
 */
export interface ControlRegistryEntry {
  /** Control identifier */
  id: string;
  /** Factory function to create the control */
  factory: ControlFactory;
}

/**
 * Control registry type.
 */
export type ControlRegistry = Map<string, ControlFactory>;
