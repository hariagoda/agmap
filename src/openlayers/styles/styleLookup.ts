/**
 * Pre-compiled style lookup tables for O(1) style resolution.
 *
 * This module provides optimized style lookups using hash maps instead of
 * switch statements, significantly improving rendering performance for
 * maps with thousands of features.
 *
 * @module styles/styleLookup
 */

import type { FeatureLike } from 'ol/Feature';
import {
  adminBoundaryStyle,
  // Aeroway
  aerowayStyle,
  // Boundaries
  boundaryStyle,
  bridgeStyle,
  // Building
  buildingStyle,
  buswayStyle,
  cemeteryStyle,
  commercialStyle,
  constructionStyle,
  // Fallback
  defaultStyle,
  emptyStyle,
  farmlandStyle,
  ferryStyle,
  forestStyle,
  grassStyle,
  hospitalStyle,
  industrialStyle,
  institutionalStyle,
  militaryStyle,
  minorRoadStyle,
  // Roads
  motorwayStyle,
  // POI
  mountainPeakStyle,
  // Green spaces
  parkStyle,
  pathStyle,
  pierStyle,
  poiStyle,
  poolStyle,
  primaryStyle,
  racewayStyle,
  // Transport
  railwayStyle,
  // Landuse
  residentialStyle,
  retailStyle,
  schoolStyle,
  secondaryStyle,
  serviceRoadStyle,
  stadiumStyle,
  tertiaryStyle,
  trackStyle,
  // Water
  waterStyle,
  waterwaySmallStyle,
  waterwayStyle,
  wetlandStyle,
} from './styleObjects';
import type { SpecialStyleHandler, StyleFunction, StyleValue } from './types';

// =============================================================================
// STYLE LOOKUP TABLE
// Pre-compiled mapping from (layer, class) -> Style for O(1) access
// =============================================================================

/**
 * Static lookup table for style resolution.
 *
 * Keys follow the pattern:
 * - "layer" - Default style for a layer
 * - "layer:class" - Class-specific style within a layer
 *
 * This provides O(1) lookup instead of O(n) switch statement traversal.
 */
export const STYLE_LOOKUP: Map<string, StyleValue> = new Map<string, StyleValue>([
  // ---------------------------------------------------------------------------
  // WATER
  // ---------------------------------------------------------------------------
  ['water', waterStyle],
  ['water:swimming_pool', poolStyle],
  ['water:lake', waterStyle],
  ['water:river', waterStyle],
  ['water:pond', waterStyle],
  ['water:dock', waterStyle],

  // ---------------------------------------------------------------------------
  // WATERWAY
  // ---------------------------------------------------------------------------
  ['waterway', waterwayStyle],
  ['waterway:river', waterwayStyle],
  ['waterway:canal', waterwayStyle],
  ['waterway:ditch', waterwaySmallStyle],
  ['waterway:drain', waterwaySmallStyle],

  // ---------------------------------------------------------------------------
  // LANDCOVER
  // ---------------------------------------------------------------------------
  ['landcover', grassStyle],
  ['landcover:wood', forestStyle],
  ['landcover:forest', forestStyle],
  ['landcover:grass', grassStyle],
  ['landcover:wetland', wetlandStyle],
  ['landcover:farmland', farmlandStyle],

  // ---------------------------------------------------------------------------
  // PARK
  // ---------------------------------------------------------------------------
  ['park', parkStyle],
  ['park:protected_area', parkStyle],

  // ---------------------------------------------------------------------------
  // LANDUSE
  // ---------------------------------------------------------------------------
  ['landuse', defaultStyle],
  ['landuse:residential', residentialStyle],
  ['landuse:industrial', industrialStyle],
  ['landuse:railway', industrialStyle],
  ['landuse:bus_station', industrialStyle],
  ['landuse:commercial', commercialStyle],
  ['landuse:retail', retailStyle],
  ['landuse:institutional', institutionalStyle],
  ['landuse:military', militaryStyle],
  ['landuse:hospital', hospitalStyle],
  ['landuse:school', schoolStyle],
  ['landuse:university', schoolStyle],
  ['landuse:college', schoolStyle],
  ['landuse:stadium', stadiumStyle],
  ['landuse:pitch', stadiumStyle],
  ['landuse:track', stadiumStyle],
  ['landuse:playground', stadiumStyle],
  ['landuse:cemetery', cemeteryStyle],

  // ---------------------------------------------------------------------------
  // BUILDING
  // ---------------------------------------------------------------------------
  ['building', buildingStyle],

  // ---------------------------------------------------------------------------
  // TRANSPORTATION - Roads
  // ---------------------------------------------------------------------------
  ['transportation', minorRoadStyle],
  ['transportation:motorway', motorwayStyle],
  ['transportation:trunk', motorwayStyle],
  ['transportation:primary', primaryStyle],
  ['transportation:secondary', secondaryStyle],
  ['transportation:tertiary', tertiaryStyle],
  ['transportation:minor', minorRoadStyle],
  ['transportation:street', minorRoadStyle],
  ['transportation:service', serviceRoadStyle],
  ['transportation:busway', buswayStyle],
  ['transportation:raceway', racewayStyle],

  // Paths and tracks
  ['transportation:path', pathStyle],
  ['transportation:footway', pathStyle],
  ['transportation:cycleway', pathStyle],
  ['transportation:track', trackStyle],

  // Railways
  ['transportation:rail', railwayStyle],
  ['transportation:transit', railwayStyle],

  // Water transport
  ['transportation:ferry', ferryStyle],

  // Structures
  ['transportation:pier', pierStyle],
  ['transportation:bridge', bridgeStyle],

  // Construction variants (explicit to avoid string.includes())
  ['transportation:motorway_construction', constructionStyle],
  ['transportation:trunk_construction', constructionStyle],
  ['transportation:primary_construction', constructionStyle],
  ['transportation:secondary_construction', constructionStyle],
  ['transportation:tertiary_construction', constructionStyle],
  ['transportation:minor_construction', constructionStyle],
  ['transportation:service_construction', constructionStyle],

  // ---------------------------------------------------------------------------
  // AEROWAY
  // ---------------------------------------------------------------------------
  ['aeroway', aerowayStyle],

  // ---------------------------------------------------------------------------
  // POI
  // ---------------------------------------------------------------------------
  ['mountain_peak', mountainPeakStyle],
  ['poi', poiStyle],
]);

// =============================================================================
// HIDDEN LAYERS
// =============================================================================

/**
 * Layers that should not be rendered (return empty style).
 * Using Set for O(1) lookup - provides fast rejection path.
 */
export const HIDDEN_LAYERS: Set<string> = new Set([
  'place',
  'transportation_name',
  'aerodrome_label',
]);

// =============================================================================
// SPECIAL HANDLERS
// =============================================================================

/**
 * Special handlers for layers that need runtime logic beyond simple lookup.
 * Used when styling depends on properties other than 'layer' and 'class'.
 */
export const SPECIAL_HANDLERS: Map<string, SpecialStyleHandler> = new Map<
  string,
  SpecialStyleHandler
>([
  [
    'boundary',
    (feature: FeatureLike): StyleValue => {
      const adminLevel = feature.get('admin_level') as number;
      return adminLevel && adminLevel <= 4 ? adminBoundaryStyle : boundaryStyle;
    },
  ],
]);

// =============================================================================
// STYLE RESOLUTION FUNCTION
// =============================================================================

/**
 * Creates an optimized style function for OpenLayers VectorTile layers.
 *
 * Performance characteristics:
 * - Hidden layer check: O(1) Set lookup
 * - Special handler check: O(1) Map lookup
 * - Style resolution: O(1) Map lookup (2 lookups worst case)
 * - No switch statements or string.includes() calls
 *
 * @returns Style function compatible with OpenLayers VectorTile layer
 *
 * @example
 * ```typescript
 * const vectorLayer = new VectorTile({
 *   source: new PMTilesVectorSource({ url: '...' }),
 *   style: createStyleFunction(),
 * });
 * ```
 */
export function createStyleFunction(): StyleFunction {
  return (feature: FeatureLike): StyleValue => {
    const layer = feature.get('layer') as string;

    // Fast path: hidden layers (common case, immediate rejection)
    if (HIDDEN_LAYERS.has(layer)) {
      return emptyStyle;
    }

    // Check for special handlers (layers needing runtime logic)
    const specialHandler = SPECIAL_HANDLERS.get(layer);
    if (specialHandler) {
      return specialHandler(feature);
    }

    // Standard lookup: try "layer:class" first, then "layer" default
    const featureClass = feature.get('class') as string;

    // Only construct composite key if class exists
    if (featureClass) {
      const specificStyle = STYLE_LOOKUP.get(`${layer}:${featureClass}`);
      if (specificStyle) {
        return specificStyle;
      }
    }

    // Fall back to layer default, then global default
    return STYLE_LOOKUP.get(layer) ?? defaultStyle;
  };
}
