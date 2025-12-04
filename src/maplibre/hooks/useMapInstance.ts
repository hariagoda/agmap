/**
 * Map instance hook.
 *
 * Manages MapLibre GL JS map instance lifecycle including
 * initialization, error handling, and cleanup.
 *
 * @module maplibre/hooks/useMapInstance
 */

import maplibregl, { type StyleSpecification } from 'maplibre-gl';
import { PMTiles, Protocol } from 'pmtiles';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BANGKOK_CENTER, THAILAND_PMTILES_URL } from '../../shared/config/constants';
import type { LngLat } from '../../shared/config/types';
import { BANGKOK_FLY_START_ZOOM } from '../config/constants';
import type { UseMapInstanceResult } from '../config/types';
import { APPLE_GOOGLE_STYLE } from '../styles/styleBuilder';

/** Options for the useMapInstance hook */
export interface UseMapInstanceOptions {
  /** Ref to the container element */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** MapLibre style specification */
  style?: StyleSpecification;
  /** Initial center coordinates [lng, lat] */
  center?: LngLat;
  /** Initial zoom level */
  zoom?: number;
  /** Callback when map is loaded */
  onLoad?: (map: maplibregl.Map) => void;
  /** Callback when error occurs */
  onError?: (error: Error) => void;
}

/** Protocol registration status */
let isProtocolRegistered = false;

/**
 * Hook to create and manage a MapLibre GL JS map instance.
 *
 * Handles:
 * - PMTiles protocol registration
 * - Map initialization
 * - Error handling
 * - Cleanup on unmount
 *
 * @param options - Map instance options
 * @returns Map instance, ready state, and error state
 *
 * @example
 * ```tsx
 * function MapComponent() {
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   const { map, isReady, error } = useMapInstance({
 *     containerRef,
 *     center: [100.5, 13.75],
 *     zoom: 10,
 *   });
 *
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!isReady) return <div>Loading...</div>;
 *
 *   return <div ref={containerRef} />;
 * }
 * ```
 */
export const useMapInstance = ({
  containerRef,
  style = APPLE_GOOGLE_STYLE,
  center = BANGKOK_CENTER,
  zoom = BANGKOK_FLY_START_ZOOM,
  onLoad,
  onError,
}: UseMapInstanceOptions): UseMapInstanceResult => {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const pmtilesRef = useRef<PMTiles | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleLoad = useCallback(
    (map: maplibregl.Map) => {
      setIsReady(true);
      setError(null);
      onLoad?.(map);
    },
    [onLoad],
  );

  const handleError = useCallback(
    (err: Error) => {
      setError(err);
      setIsReady(false);
      onError?.(err);
    },
    [onError],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    // Register PMTiles protocol once
    let protocol: Protocol | null = null;
    if (!isProtocolRegistered) {
      protocol = new Protocol();
      maplibregl.addProtocol('pmtiles', protocol.tile);
      isProtocolRegistered = true;
    }

    // Create PMTiles instance
    const pmtiles = new PMTiles(THAILAND_PMTILES_URL);
    pmtilesRef.current = pmtiles;

    if (protocol) {
      protocol.add(pmtiles);
    }

    // Initialize map after PMTiles header is loaded
    pmtiles
      .getHeader()
      .then(() => {
        if (!container) {
          return;
        }

        const map = new maplibregl.Map({
          container,
          style,
          center,
          zoom,
        });

        map.on('load', () => {
          handleLoad(map);
        });

        map.on('error', (event) => {
          handleError(new Error(`Map error: ${event.error?.message ?? 'Unknown error'}`));
        });

        mapRef.current = map;
      })
      .catch((err) => {
        handleError(err instanceof Error ? err : new Error('Failed to initialize map'));
      });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      pmtilesRef.current = null;
    };
  }, [containerRef, style, center, zoom, handleLoad, handleError]);

  return {
    map: mapRef.current,
    isReady,
    error,
  };
};
