/**
 * PMTiles Layer Component
 *
 * Renders PMTiles vector tiles on an OpenLayers map with Google Maps-inspired
 * styling. Uses optimized O(1) style lookups for high performance.
 *
 * @module openlayers/PMTilesLayer
 */

import type { Map as OLMap } from 'ol';
import VectorTile from 'ol/layer/VectorTile';
import { PMTilesVectorSource } from 'ol-pmtiles';
import { useEffect } from 'react';
import { createStyleFunction } from './styles/styleLookup';

// =============================================================================
// CONSTANTS
// =============================================================================

/** Default PMTiles URL (fallback when not provided) */
const DEFAULT_PMTILES_URL =
  'https://r2-public.protomaps.com/protomaps-sample-datasets/nz-buildings-v3.pmtiles';

/** Default attribution for OpenStreetMap data */
const DEFAULT_ATTRIBUTION = '© OpenStreetMap contributors';

// =============================================================================
// COMPONENT
// =============================================================================

interface PMTilesLayerProps {
  /** Reference to the OpenLayers Map instance */
  map: OLMap | null;
  /** URL to the PMTiles file */
  url?: string;
  /** Attribution text for the data source */
  attribution?: string;
  /** Whether to declutter overlapping features */
  declutter?: boolean;
}

/**
 * PMTiles Layer Component
 *
 * Adds a PMTiles vector tile layer to an OpenLayers map with Google Maps-inspired
 * styling. The component handles layer lifecycle (creation and cleanup) automatically.
 *
 * Features:
 * - Google Maps-like color palette
 * - Road casing (outline + fill) for better visibility
 * - Differentiated styling for land use types
 * - O(1) style lookup performance
 * - Support for all OpenMapTiles layers
 *
 * @example
 * ```tsx
 * <PMTilesLayer
 *   map={mapInstance}
 *   url={pmtilesUrl}
 *   attribution="© OpenStreetMap contributors"
 * />
 * ```
 */
export function PMTilesLayer({
  map,
  url = DEFAULT_PMTILES_URL,
  attribution = DEFAULT_ATTRIBUTION,
  declutter = true,
}: PMTilesLayerProps): null {
  useEffect(() => {
    if (!map) {
      return;
    }

    // Create vector tile layer with PMTiles source and optimized styling
    const vectorLayer = new VectorTile({
      declutter,
      source: new PMTilesVectorSource({
        url,
        attributions: [attribution],
      }),
      style: createStyleFunction(),
    });

    map.addLayer(vectorLayer);

    // Cleanup on unmount or when dependencies change
    return () => {
      map.removeLayer(vectorLayer);
    };
  }, [map, url, attribution, declutter]);

  // This component doesn't render DOM elements
  return null;
}
