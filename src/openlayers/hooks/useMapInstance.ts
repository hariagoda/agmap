/**
 * Hook for managing OpenLayers map instance lifecycle.
 *
 * Handles map creation, initialization, and cleanup with proper error handling.
 *
 * @module hooks/useMapInstance
 */

import { Map as OLMap, View } from 'ol';
import { useGeographic as enableGeographicProjection } from 'ol/proj';
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_MAP_CONFIG } from '../config/defaults';
import type { MapConfig } from '../config/types';

// Enable geographic coordinates (lon/lat) globally - must be called before map creation
// Note: This is an OpenLayers utility, not a React hook, despite the naming convention
enableGeographicProjection();

/**
 * Options for useMapInstance hook
 */
export interface UseMapInstanceOptions {
  /** Map container element reference */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Map configuration options */
  config?: Partial<MapConfig>;
  /** Callback when map is initialized */
  onMapReady?: (map: OLMap) => void;
  /** Callback when map initialization fails */
  onError?: (error: Error) => void;
}

/**
 * Hook return type
 */
export interface UseMapInstanceReturn {
  /** OpenLayers map instance (null until initialized) */
  map: OLMap | null;
  /** Whether the map is initialized */
  isReady: boolean;
  /** Error state if initialization failed */
  error: Error | null;
}

/**
 * Custom hook for managing OpenLayers map instance lifecycle.
 *
 * Creates and manages an OpenLayers map instance with proper cleanup.
 * The map is created once when the container ref is available and cleaned
 * up on unmount.
 *
 * @param options - Hook configuration options
 * @returns Map instance, ready state, and error state
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * const { map, isReady } = useMapInstance({
 *   containerRef,
 *   config: { view: { center: [100, 13], zoom: 6 } },
 *   onMapReady: (map) => console.log('Map ready', map),
 * });
 * ```
 */
export function useMapInstance({
  containerRef,
  config = {},
  onMapReady,
  onError,
}: UseMapInstanceOptions): UseMapInstanceReturn {
  const [map, setMap] = useState<OLMap | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const mapInstanceRef = useRef<OLMap | null>(null);

  useEffect(() => {
    // Only initialize if container exists and map hasn't been created
    if (!containerRef.current || mapInstanceRef.current) {
      return;
    }

    try {
      // Merge user config with defaults
      const finalConfig = {
        ...DEFAULT_MAP_CONFIG,
        ...config,
        view: {
          ...DEFAULT_MAP_CONFIG.view,
          ...config.view,
        },
      };

      // Create the OpenLayers map instance
      const mapInstance: OLMap = new OLMap({
        target: containerRef.current,
        layers: [],
        view: new View({
          center: finalConfig.view?.center ?? DEFAULT_MAP_CONFIG.view.center,
          zoom: finalConfig.view?.zoom ?? DEFAULT_MAP_CONFIG.view.zoom,
        }),
      });

      mapInstanceRef.current = mapInstance;
      setMap(mapInstance);

      // Call onMapReady callback if provided
      if (onMapReady) {
        onMapReady(mapInstance);
      }
    } catch (err) {
      const mapError = err instanceof Error ? err : new Error('Failed to initialize map');
      setError(mapError);
      if (onError) {
        onError(mapError);
      }
    }

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
        setMap(null);
      }
    };
  }, [containerRef, config, onMapReady, onError]);

  return {
    map,
    isReady: map !== null,
    error,
  };
}
