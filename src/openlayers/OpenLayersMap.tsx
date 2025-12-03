/**
 * OpenLayers Map Component
 *
 * Displays an interactive map using PMTiles vector tiles.
 * Uses custom hooks for lifecycle management and follows React best practices.
 *
 * @module openlayers/OpenLayersMap
 */

import { type ReactElement, useMemo, useRef } from 'react';
import 'ol/ol.css';
import { MapErrorBoundary } from './components/MapErrorBoundary';
import { DEFAULT_MAP_CONFIG } from './config/defaults';
import { useMapControls } from './hooks/useMapControls';
import { useMapInstance } from './hooks/useMapInstance';
import { usePMTilesLayer } from './hooks/usePMTilesLayer';

/**
 * OpenLayers Map Component
 *
 * Displays an interactive map using PMTiles vector tiles with optimized
 * rendering and pluggable controls system.
 *
 * Features:
 * - Centralized map instance management via useMapInstance hook
 * - PMTiles layer management via usePMTilesLayer hook
 * - Pluggable controls system via useMapControls hook
 * - Error boundary for graceful error handling
 * - Google Maps-inspired styling
 *
 * @example
 * ```tsx
 * <OpenLayersMap />
 * ```
 */
export function OpenLayersMap(): ReactElement {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Memoize config to prevent unnecessary re-renders
  const mapConfig = useMemo(() => DEFAULT_MAP_CONFIG, []);

  // Initialize map instance
  const { map, isReady, error } = useMapInstance({
    containerRef: mapContainerRef,
    config: mapConfig,
  });

  // Add PMTiles layer
  usePMTilesLayer({
    map,
    config: mapConfig.pmTiles,
  });

  // Add controls - memoize to prevent unnecessary re-renders
  const controls = useMemo(() => mapConfig.controls ?? [], [mapConfig.controls]);
  useMapControls({
    map,
    controls,
  });

  return (
    <MapErrorBoundary>
      <div
        ref={mapContainerRef}
        className="w-full h-full"
        style={{ minHeight: '400px', backgroundColor: '#f5f5f5' }}
      >
        {error !== null && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-center">
              <p className="text-red-600">Map initialization failed: {error.message}</p>
            </div>
          </div>
        )}
        {!(isReady || error !== null) && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-center">
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
      </div>
    </MapErrorBoundary>
  );
}
