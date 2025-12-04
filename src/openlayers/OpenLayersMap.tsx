/**
 * OpenLayers Map Component
 *
 * Displays an interactive map using PMTiles vector tiles.
 * Uses custom hooks for lifecycle management and follows React best practices.
 *
 * Features:
 * - Centralized map instance management via useMapInstance hook
 * - PMTiles layer management via usePMTilesLayer hook
 * - Pluggable controls system via useMapControls hook
 * - Error boundary for graceful error handling
 * - Google Maps-inspired styling
 *
 * @module openlayers/OpenLayersMap
 *
 * @example
 * ```tsx
 * // Basic usage
 * <OpenLayersMap />
 *
 * // With custom options
 * <OpenLayersMap
 *   center={[100.5, 13.75]}
 *   zoom={12}
 *   enableBangkokControl={false}
 *   onLoad={() => console.log('Map loaded')}
 * />
 * ```
 */

import type { ReactElement } from 'react';
import { useMemo, useRef } from 'react';
import 'ol/ol.css';

import { ErrorDisplay, LoadingState, MapErrorBoundary } from './components';
import { BANGKOK_ZOOM_CONTROL_CONFIG, DEFAULT_MAP_CONFIG } from './config';
import type { OpenLayersMapProps } from './config';
import { useMapControls, useMapInstance, usePMTilesLayer } from './hooks';
import { COLORS } from './styles';

/**
 * OpenLayers Map Component
 *
 * Renders an interactive vector map with PMTiles data source.
 * Provides a clean, modular implementation with configurable
 * behavior through props.
 *
 * @param props - Component props
 * @returns Map component element
 */
export function OpenLayersMap({
  center,
  zoom,
  enableBangkokControl = true,
  config,
  onLoad,
  onError,
  className,
}: OpenLayersMapProps): ReactElement {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Memoize config to prevent unnecessary re-renders
  const mapConfig = useMemo(() => {
    const baseConfig = {
      ...DEFAULT_MAP_CONFIG,
      ...config,
      view: {
        ...DEFAULT_MAP_CONFIG.view,
        ...config?.view,
        ...(center && { center }),
        ...(zoom !== undefined && { zoom }),
      },
    };

    // Configure controls based on props
    if (!enableBangkokControl) {
      baseConfig.controls = baseConfig.controls?.filter(
        (ctrl) => ctrl.id !== 'bangkok-zoom'
      ) ?? [];
    } else if (!baseConfig.controls?.some((ctrl) => ctrl.id === 'bangkok-zoom')) {
      baseConfig.controls = [...(baseConfig.controls ?? []), BANGKOK_ZOOM_CONTROL_CONFIG];
    }

    return baseConfig;
  }, [center, zoom, enableBangkokControl, config]);

  // Initialize map instance
  const { map, isReady, error } = useMapInstance({
    containerRef: mapContainerRef,
    config: mapConfig,
    onMapReady: onLoad ? () => onLoad() : undefined,
    onError,
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
        className={`w-full h-full relative ${className ?? ''}`}
        style={{ minHeight: '400px', backgroundColor: COLORS.land }}
      >
        {/* Error state */}
        {error !== null && (
          <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
        )}

        {/* Loading state */}
        {!(isReady || error !== null) && <LoadingState />}
      </div>
    </MapErrorBoundary>
  );
}

// Re-export types for consumers
export type { OpenLayersMapProps } from './config';
