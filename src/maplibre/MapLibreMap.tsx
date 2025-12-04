/**
 * MapLibre GL JS Map Component
 *
 * Displays an interactive map using PMTiles vector tiles with Apple/Google-inspired styling.
 * Uses MapLibre GL JS for WebGL-powered vector tile rendering.
 *
 * Features:
 * - PMTiles protocol integration for efficient vector tile loading
 * - Apple/Google Maps-like color palette
 * - Road casing (outline + fill) for better visibility
 * - Differentiated styling for land use types
 * - WebGL-powered rendering for high performance
 * - Configurable animations (fly-to, building fade-in)
 * - Debug mode for label inspection
 *
 * @module maplibre/MapLibreMap
 *
 * @example
 * ```tsx
 * // Basic usage
 * <MapLibreMap />
 *
 * // With custom options
 * <MapLibreMap
 *   center={[100.5, 13.75]}
 *   zoom={12}
 *   enableFlyTo={false}
 *   onLoad={(map) => console.log('Map loaded', map)}
 * />
 * ```
 */

import type { ReactElement } from 'react';
import { useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';

import { BANGKOK_CENTER } from '../shared/config/constants';
import { ErrorDisplay } from './components/ErrorDisplay';
import { LoadingState } from './components/LoadingState';
import { BANGKOK_FLY_START_ZOOM } from './config/constants';
import type { MapLibreMapProps } from './config/types';
import { useMapAnimations } from './hooks/useMapAnimations';
import { useMapInstance } from './hooks/useMapInstance';
import { LAND_COLORS } from './styles/palette';

/**
 * MapLibre GL JS Map Component
 *
 * Renders an interactive vector map with PMTiles data source.
 * Provides a clean, modular implementation with configurable
 * behavior through props.
 *
 * @param props - Component props
 * @returns Map component element
 */
export function MapLibreMap({
  center = BANGKOK_CENTER,
  zoom = BANGKOK_FLY_START_ZOOM,
  enableFlyTo = true,
  enableBuildingAnimation = true,
  debug = false,
  onLoad,
  onError,
  className,
}: MapLibreMapProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize map instance
  const { map, isReady, error } = useMapInstance({
    containerRef,
    center,
    zoom,
    onLoad: onLoad ? () => onLoad() : undefined,
    onError,
  });

  // Set up animations and debug handlers
  useMapAnimations(map, isReady, {
    enableFlyTo,
    enableBuildingAnimation,
    debug,
  });

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative ${className ?? ''}`}
      style={{
        minHeight: '400px',
        backgroundColor: LAND_COLORS.tint,
      }}
    >
      {/* Error state */}
      {error !== null && <ErrorDisplay error={error} onRetry={() => window.location.reload()} />}

      {/* Loading state */}
      {!(isReady || error !== null) && <LoadingState />}
    </div>
  );
}

// Re-export types for consumers
export type { MapLibreMapProps } from './config/types';
