/**
 * MapLibre GL JS expression helpers.
 *
 * Reusable expressions for styling, filtering, and data-driven properties.
 *
 * @module maplibre/styles/expressions
 */

import type { FilterExpression } from '../config/types';

// =============================================================================
// ZOOM INTERPOLATION EXPRESSIONS
// =============================================================================

/**
 * Creates a zoom-based width interpolation expression.
 * Width scales smoothly from 35% at zoom 6 to 160% at zoom 16.
 *
 * @param base - Base width at zoom level 10
 * @returns MapLibre interpolation expression
 */
export const widthByZoom = (base: number): readonly unknown[] =>
  ['interpolate', ['linear'], ['zoom'], 6, base * 0.35, 10, base, 16, base * 1.6] as const;

/**
 * Creates a subtle zoom-based width interpolation expression.
 * For features that should scale less aggressively (paths, boundaries).
 *
 * @param base - Base width at zoom level 12
 * @returns MapLibre interpolation expression
 */
export const subtleWidthByZoom = (base: number): readonly unknown[] =>
  ['interpolate', ['linear'], ['zoom'], 6, base * 0.2, 12, base, 16, base * 1.4] as const;

// =============================================================================
// OPACITY EXPRESSIONS
// =============================================================================

/**
 * Creates a fade-in opacity expression based on zoom level.
 * Opacity transitions from 0 to 1 over a 2-zoom-level range.
 *
 * @param startZoom - Zoom level where fade begins
 * @returns MapLibre interpolation expression
 */
export const fadeInByZoom = (startZoom: number): unknown[] => [
  'interpolate',
  ['linear'],
  ['zoom'],
  startZoom,
  0,
  startZoom + 0.8,
  0.45,
  startZoom + 2,
  1,
];

/**
 * Creates a rank-aware fade-in opacity expression.
 * Higher-ranked (lower number) POIs appear earlier and fade in faster.
 * Lower-ranked POIs appear later as you zoom in further.
 *
 * @param baseZoom - Base zoom level where highest-ranked items start appearing
 * @param zoomSpread - How many zoom levels to spread the appearance across (default: 3)
 * @param maxRank - Maximum rank to consider (default: 20)
 * @returns MapLibre interpolation expression
 */
export const fadeInByZoomAndRank = (
  baseZoom: number,
  zoomSpread = 3,
  maxRank = 20,
): unknown[] => {
  // Get the rank, defaulting to maxRank/2 if not present
  const rankValue = ['coalesce', ['to-number', ['get', 'rank']], maxRank / 2];

  // Calculate the zoom offset based on rank (0 for rank 1, zoomSpread for maxRank)
  // This spreads labels across zoom levels based on their importance
  const zoomOffset = ['*', ['/', ['-', rankValue, 1], maxRank - 1], zoomSpread];

  // Calculate the effective start zoom for this feature
  const effectiveStartZoom = ['+', baseZoom, zoomOffset];

  // Return an expression that:
  // 1. Is 0 when zoom < effectiveStartZoom
  // 2. Fades in smoothly over 1.5 zoom levels
  // 3. Reaches 1 at effectiveStartZoom + 1.5
  return [
    'interpolate',
    ['linear'],
    ['zoom'],
    // At baseZoom - 0.5, everything is invisible
    baseZoom - 0.5,
    0,
    // Fade based on effective start zoom
    baseZoom,
    [
      'case',
      ['<=', rankValue, 3],
      0.3, // High priority: start visible early
      ['<=', rankValue, 7],
      0.1, // Medium priority: barely visible
      0, // Low priority: invisible
    ],
    baseZoom + 1,
    [
      'case',
      ['<=', rankValue, 3],
      0.7,
      ['<=', rankValue, 7],
      0.4,
      ['<=', rankValue, 12],
      0.15,
      0,
    ],
    baseZoom + 2,
    [
      'case',
      ['<=', rankValue, 3],
      1,
      ['<=', rankValue, 7],
      0.75,
      ['<=', rankValue, 12],
      0.5,
      0.2,
    ],
    baseZoom + 3,
    [
      'case',
      ['<=', rankValue, 7],
      1,
      ['<=', rankValue, 12],
      0.85,
      0.6,
    ],
    baseZoom + 4,
    1,
  ];
};

/**
 * Creates a simpler stepped fade-in based on rank tiers.
 * Labels appear in waves as you zoom in.
 *
 * @param baseZoom - Base zoom level
 * @returns MapLibre step expression for opacity
 */
export const steppedFadeByRank = (baseZoom: number): unknown[] => {
  const rankValue = ['coalesce', ['to-number', ['get', 'rank']], 15];

  return [
    'interpolate',
    ['linear'],
    ['zoom'],
    baseZoom - 0.5,
    0,
    baseZoom,
    ['case', ['<=', rankValue, 5], 0.4, 0],
    baseZoom + 0.75,
    ['case', ['<=', rankValue, 5], 0.8, ['<=', rankValue, 10], 0.3, 0],
    baseZoom + 1.5,
    ['case', ['<=', rankValue, 5], 1, ['<=', rankValue, 10], 0.7, ['<=', rankValue, 15], 0.3, 0],
    baseZoom + 2.5,
    ['case', ['<=', rankValue, 10], 1, ['<=', rankValue, 15], 0.8, 0.4],
    baseZoom + 3.5,
    1,
  ];
};

// =============================================================================
// TEXT EXPRESSIONS
// =============================================================================

/**
 * Expression to get localized name with fallbacks.
 * Tries: name_en → name:en → name
 *
 * @returns MapLibre coalesce expression
 */
export const getLocalizedNameExpression = (): unknown[] => [
  'coalesce',
  ['get', 'name_en'],
  ['get', 'name:en'],
  ['get', 'name'],
];

// =============================================================================
// SORT KEY EXPRESSIONS
// =============================================================================

/**
 * Expression to get POI rank value with fallback.
 * Returns numeric rank or 200 if not present.
 */
export const POI_RANK_VALUE: unknown[] = ['coalesce', ['to-number', ['get', 'rank']], 200];

/**
 * Expression to create descending sort key from rank.
 * Lower ranks (more important) get higher sort values.
 */
export const POI_RANK_SORT_KEY: unknown[] = ['-', 200, POI_RANK_VALUE];

/**
 * Expression to sort waterways by importance.
 * Rivers first, then canals, streams, and others.
 */
export const WATERWAY_SORT_KEY: unknown[] = [
  'case',
  ['==', ['get', 'class'], 'river'],
  1,
  ['==', ['get', 'class'], 'canal'],
  2,
  ['==', ['get', 'class'], 'stream'],
  3,
  4,
];

// =============================================================================
// FILTER EXPRESSIONS
// =============================================================================

/**
 * Creates a filter that limits features by rank.
 * Includes features without rank or with rank <= maxRank.
 *
 * @param maxRank - Maximum rank value to include
 * @returns MapLibre filter expression
 */
export const rankLimitFilter = (maxRank: number): FilterExpression =>
  ['any', ['!has', 'rank'], ['<=', 'rank', maxRank]] as FilterExpression;

/**
 * Creates a filter for specific class values.
 *
 * @param classes - Array of class values to match
 * @returns MapLibre filter expression
 */
export const createClassFilter = (classes: string[]): FilterExpression =>
  ['in', 'class', ...classes] as FilterExpression;

// =============================================================================
// POI CLASSIFICATION
// =============================================================================

/** Major POI classes that deserve prominent labeling */
export const POI_MAJOR_CLASSES: readonly string[] = [
  'airport',
  'aerodrome',
  'bus_station',
  'hospital',
  'clinic',
  'embassy',
  'town_hall',
  'museum',
  'art_gallery',
  'theme_park',
  'attraction',
  'zoo',
  'aquarium',
  'stadium',
  'sports_centre',
] as const;

/** Transport-related POI classes */
export const POI_TRANSPORT_CLASSES: readonly string[] = [
  'ferry_terminal',
  'pier',
  'bus_station',
  'tram_stop',
  'station',
  'subway',
] as const;

/**
 * Priority values for landmark POIs (lower = more important).
 * Keys use snake_case to match OSM class values from vector tiles.
 */
export const LANDMARK_PRIORITIES: Record<string, number> = {
  airport: 1,
  aerodrome: 1,
  // biome-ignore lint/style/useNamingConvention: OSM class value
  ferry_terminal: 2,
  // biome-ignore lint/style/useNamingConvention: OSM class value
  bus_station: 2,
  hospital: 2,
  clinic: 3,
  embassy: 3,
  // biome-ignore lint/style/useNamingConvention: OSM class value
  town_hall: 3,
  museum: 4,
  // biome-ignore lint/style/useNamingConvention: OSM class value
  art_gallery: 5,
  // biome-ignore lint/style/useNamingConvention: OSM class value
  theme_park: 5,
  attraction: 5,
  zoo: 5,
  aquarium: 5,
  stadium: 4,
  // biome-ignore lint/style/useNamingConvention: OSM class value
  sports_centre: 5,
  university: 4,
  college: 4,
  school: 5,
  library: 5,
  hotel: 6,
  resort: 6,
  mall: 6,
  marketplace: 6,
};

/**
 * Expression to calculate POI sort key based on rank and class priority.
 * Combines numeric rank with landmark priority for optimal label placement.
 */
export const getPOISortKeyExpression = (): unknown[] => [
  '+',
  ['coalesce', ['to-number', ['get', 'rank']], 10],
  [
    'coalesce',
    [
      'get',
      ['to-string', ['coalesce', ['get', 'class'], 'other']],
      ['literal', LANDMARK_PRIORITIES],
    ],
    5,
  ],
];
