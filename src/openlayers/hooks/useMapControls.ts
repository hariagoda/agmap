/**
 * Hook for managing map controls lifecycle.
 *
 * Handles control registration, addition to map, and cleanup with
 * support for pluggable control system.
 *
 * @module hooks/useMapControls
 */

import type { Map as OLMap } from 'ol';
import type Control from 'ol/control/Control';
import { useEffect, useRef } from 'react';
import type { ControlConfig } from '../config/types';
import { getControlFactory } from '../controls/registry';
import { ControlCreationError } from '../utils/errors';

/**
 * Options for useMapControls hook
 */
export interface UseMapControlsOptions {
  /** Reference to the OpenLayers Map instance */
  map: OLMap | null;
  /** Array of control configurations */
  controls?: ControlConfig[];
  /** Callback when a control fails to create */
  onControlError?: (error: ControlCreationError) => void;
}

/**
 * Custom hook for managing map controls lifecycle.
 *
 * Adds configured controls to the map and handles cleanup.
 * Controls are created using the control registry system, making
 * it easy to add new controls without modifying core code.
 *
 * @param options - Hook configuration options
 *
 * @example
 * ```tsx
 * const { map } = useMapInstance({ containerRef });
 * useMapControls({
 *   map,
 *   controls: [
 *     { id: 'bangkok-zoom', enabled: true },
 *   ],
 * });
 * ```
 */
export function useMapControls({
  map,
  controls = [],
  onControlError,
}: UseMapControlsOptions): void {
  const controlsRef = useRef<Control[]>([]);

  useEffect(() => {
    if (!map) {
      return;
    }

    // Clear existing controls
    for (const control of controlsRef.current) {
      map.removeControl(control);
    }
    controlsRef.current = [];

    // Add configured controls
    for (const controlConfig of controls) {
      if (!controlConfig.enabled) {
        continue;
      }

      const factory = getControlFactory(controlConfig.id);
      if (!factory) {
        // Factory not found - create error and notify callback
        const error = new ControlCreationError(
          `Control factory not found for id: ${controlConfig.id}`,
          controlConfig.id,
        );
        if (onControlError) {
          onControlError(error);
        }
        continue;
      }

      try {
        const control = factory(controlConfig.options);
        map.addControl(control);
        controlsRef.current.push(control);
      } catch (err) {
        // Create a proper error object and notify callback
        const error = new ControlCreationError(
          `Failed to create control: ${controlConfig.id}`,
          controlConfig.id,
        );
        // Call error callback if provided, otherwise let error boundary handle it
        if (onControlError) {
          onControlError(error);
        }
        // Continue with other controls - don't break the entire map
      }
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      for (const control of controlsRef.current) {
        map.removeControl(control);
      }
      controlsRef.current = [];
    };
  }, [map, controls]);
}
