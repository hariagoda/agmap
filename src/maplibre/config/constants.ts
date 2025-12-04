/**
 * MapLibre-specific constants.
 *
 * @module maplibre/config/constants
 */

// =============================================================================
// SOURCE IDENTIFIERS
// =============================================================================

/** PMTiles vector source identifier */
export const PMTILES_SOURCE_ID = 'pmtiles_source';

// =============================================================================
// LAYER IDENTIFIERS
// =============================================================================

/** Building layer ID for animations */
export const BUILDING_LAYER_ID = 'building';

// =============================================================================
// ANIMATION CONSTANTS
// =============================================================================

/** Target opacity for building layer after fade-in */
export const BUILDING_TARGET_OPACITY = 0.95;

/** Duration of building fade-in animation in milliseconds */
export const BUILDING_ANIMATION_DURATION_MS = 900;

/** Starting zoom level for Bangkok fly-to animation */
export const BANGKOK_FLY_START_ZOOM = 2;

/** Target zoom level for Bangkok fly-to animation */
export const BANGKOK_FLY_TARGET_ZOOM = 14;

/** Duration of Bangkok fly-to animation in milliseconds */
export const BANGKOK_FLY_DURATION_MS = 9000;

// =============================================================================
// LABEL RENDERING CONSTANTS
// =============================================================================

/** Maximum rank for major POI labels (lower = more important) */
export const MAJOR_POI_MAX_RANK = 5;

/** Maximum rank for general POI labels */
export const GENERAL_POI_MAX_RANK = 12;

/** Maximum rank for mountain peak labels */
export const MOUNTAIN_MAX_RANK = 10;

// =============================================================================
// SYMBOL SPACING CONSTANTS
// =============================================================================

/** Default symbol spacing for major POIs */
export const SYMBOL_SPACING_MAJOR = 420;

/** Default symbol spacing for general POIs */
export const SYMBOL_SPACING_GENERAL = 260;

/** Default symbol spacing for transport POIs */
export const SYMBOL_SPACING_TRANSPORT = 220;

/** Default symbol spacing for mountain peaks */
export const SYMBOL_SPACING_MOUNTAIN = 520;

// =============================================================================
// DEBUG CONFIGURATION
// =============================================================================

/** Layer IDs to enable debug click logging */
export const LABEL_DEBUG_LAYERS: readonly string[] = [
  'poi-transport-labels',
  'poi-general-labels',
  'poi-major-labels',
  'admin-city-label',
] as const;
