/**
 * Shared constants used across map implementations.
 *
 * These constants are map-library agnostic and can be used by
 * OpenLayers, MapLibre, or any other mapping library.
 *
 * @module shared/config/constants
 */

// =============================================================================
// GEOGRAPHIC COORDINATES
// =============================================================================

/** Thailand center coordinates [longitude, latitude] */
export const THAILAND_CENTER: [number, number] = [100.5, 13.75];

/** Bangkok center coordinates [longitude, latitude] */
export const BANGKOK_CENTER: [number, number] = [100.5014, 13.7563];

// =============================================================================
// ZOOM LEVELS
// =============================================================================

/** Country overview zoom level */
export const ZOOM_COUNTRY = 6;

/** City overview zoom level */
export const ZOOM_CITY = 12;

/** Street-level zoom level */
export const ZOOM_STREET = 16;

/** Building-level zoom level */
export const ZOOM_BUILDING = 18;

// =============================================================================
// DATA SOURCES
// =============================================================================

/**
 * Thailand PMTiles URL - resolved at build time via import.meta.url
 * This points to the local PMTiles file bundled with the application.
 */
export const THAILAND_PMTILES_URL: string = new URL(
  '../../openlayers/thailand.pmtiles',
  import.meta.url,
).href;

// =============================================================================
// ATTRIBUTION
// =============================================================================

/** Standard OpenStreetMap attribution text */
export const OSM_ATTRIBUTION = '© OpenStreetMap contributors';

/** Protomaps attribution text */
// biome-ignore lint/security/noSecrets: This is attribution text, not a secret
export const PROTOMAPS_ATTRIBUTION = '© Protomaps © OpenStreetMap';
