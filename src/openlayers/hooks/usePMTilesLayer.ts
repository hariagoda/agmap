/**
 * Hook for managing PMTiles vector tile layer lifecycle.
 *
 * Handles layer creation, addition to map, and cleanup with optimized
 * rendering configuration.
 *
 * @module hooks/usePMTilesLayer
 */

import type { Map as OLMap } from 'ol';
import VectorTile from 'ol/layer/VectorTile';
import { PMTilesVectorSource } from 'ol-pmtiles';
import { useEffect } from 'react';
import { DEFAULT_PMTILES_CONFIG, DEFAULT_RENDER_CONFIG } from '../config/defaults';
import type { PMTilesLayerConfig, VectorTileRenderConfig } from '../config/types';
import { createStyleFunction } from '../styles/styleLookup';

/**
 * Options for usePMTilesLayer hook
 */
export interface UsePMTilesLayerOptions {
  /** Reference to the OpenLayers Map instance */
  map: OLMap | null;
  /** PMTiles layer configuration */
  config?: Partial<PMTilesLayerConfig>;
  /** Vector tile rendering configuration */
  renderConfig?: Partial<VectorTileRenderConfig>;
}

/**
 * Custom hook for managing PMTiles vector tile layer lifecycle.
 *
 * Creates a PMTiles vector tile layer with Google Maps-inspired styling
 * and adds it to the map. The layer is automatically removed on unmount
 * or when dependencies change.
 *
 * Features:
 * - Google Maps-like color palette
 * - Road casing (outline + fill) for better visibility
 * - Differentiated styling for land use types
 * - O(1) style lookup performance
 * - Support for all OpenMapTiles layers
 * - Optimized rendering configuration
 *
 * @param options - Hook configuration options
 *
 * @example
 * ```tsx
 * const { map } = useMapInstance({ containerRef });
 * usePMTilesLayer({
 *   map,
 *   config: { url: pmtilesUrl, attribution: '© OSM' },
 * });
 * ```
 */
export function usePMTilesLayer({
  map,
  config = {},
  renderConfig = {},
}: UsePMTilesLayerOptions): void {
  useEffect(() => {
    if (!map) {
      return;
    }

    // Merge user config with defaults
    const finalConfig: PMTilesLayerConfig = {
      ...DEFAULT_PMTILES_CONFIG,
      ...config,
    };

    const finalRenderConfig: VectorTileRenderConfig = {
      ...DEFAULT_RENDER_CONFIG,
      ...renderConfig,
    };

    // Create vector tile layer with PMTiles source and optimized styling
    // Performance optimizations:
    // - renderMode: 'hybrid' uses canvas for static features and WebGL for dynamic (best balance)
    // - renderBuffer: 128px ensures smooth zoom transitions
    // - updateWhileAnimating: true enables responsive zoom animations
    // - updateWhileInteracting: true ensures smooth interactions
    const vectorLayer = new VectorTile({
      declutter: finalConfig.declutter,
      renderMode: finalRenderConfig.renderMode,
      renderBuffer: finalRenderConfig.renderBuffer,
      updateWhileAnimating: finalRenderConfig.updateWhileAnimating,
      updateWhileInteracting: finalRenderConfig.updateWhileInteracting,
      source: new PMTilesVectorSource({
        url: finalConfig.url,
        attributions: [finalConfig.attribution],
        cacheSize: finalConfig.cacheSize,
      }),
      style: createStyleFunction(),
    });

    map.addLayer(vectorLayer);

    // Cleanup on unmount or when dependencies change
    return () => {
      map.removeLayer(vectorLayer);
    };
  }, [
    map,
    config.url,
    config.attribution,
    config.declutter,
    config.cacheSize,
    renderConfig.renderMode,
    renderConfig.renderBuffer,
    renderConfig.updateWhileAnimating,
    renderConfig.updateWhileInteracting,
  ]);
}
