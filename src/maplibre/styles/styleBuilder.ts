/**
 * Style builder for composing MapLibre GL JS styles.
 *
 * Combines all layer definitions into a complete style specification.
 *
 * @module maplibre/styles/styleBuilder
 */

import type { StyleSpecification } from 'maplibre-gl';
import { OSM_ATTRIBUTION, THAILAND_PMTILES_URL } from '../../shared/config/constants';
import { PMTILES_SOURCE_ID } from '../config/constants';
import type { LayerSpec } from '../config/types';
import {
  backgroundLayer,
  boundaryLayers,
  buildingLayers,
  labelLayers,
  landcoverLayers,
  landuseLayers,
  roadLayers,
  waterLayers,
} from './layers';

// =============================================================================
// LAYER COMPOSITION
// =============================================================================

/**
 * Composes all layer definitions into a single array.
 * Order matters: layers are rendered bottom-to-top.
 *
 * Layer stack (bottom to top):
 * 1. Background
 * 2. Water (fills, borders, waterways)
 * 3. Landcover (forests, grass, parks)
 * 4. Landuse (residential, commercial, etc.)
 * 5. Buildings and aeroways
 * 6. Roads and transportation
 * 7. Boundaries
 * 8. Labels (admin + POI)
 */
const composeLayers = (): LayerSpec[] => [
  backgroundLayer,
  ...waterLayers,
  ...landcoverLayers,
  ...landuseLayers,
  ...buildingLayers,
  ...roadLayers,
  ...boundaryLayers,
  ...labelLayers,
];

// =============================================================================
// STYLE BUILDER
// =============================================================================

/**
 * Creates a complete MapLibre style specification.
 *
 * @param pmtilesUrl - URL to the PMTiles source (defaults to Thailand)
 * @param attribution - Attribution text (defaults to OSM)
 * @returns Complete MapLibre style specification
 *
 * @example
 * ```ts
 * // Use default Thailand PMTiles
 * const style = createStyle();
 *
 * // Use custom PMTiles source
 * const customStyle = createStyle('https://example.com/tiles.pmtiles');
 * ```
 */
export const createStyle = (
  pmtilesUrl: string = THAILAND_PMTILES_URL,
  attribution: string = OSM_ATTRIBUTION,
): StyleSpecification => ({
  version: 8,
  sources: {
    [PMTILES_SOURCE_ID]: {
      type: 'vector',
      url: `pmtiles://${pmtilesUrl}`,
      attribution,
    },
  },
  layers: composeLayers(),
});

// =============================================================================
// PRE-BUILT STYLES
// =============================================================================

/**
 * Pre-built Apple/Google-inspired style for Thailand.
 * Created at module load for optimal performance.
 *
 * Use this when you don't need dynamic style configuration.
 */
export const APPLE_GOOGLE_STYLE: StyleSpecification = createStyle();

/**
 * Gets the layer IDs from the style for debugging/inspection.
 *
 * @returns Array of layer IDs in rendering order
 */
export const getLayerIds = (): string[] => composeLayers().map((layer) => layer.id);
