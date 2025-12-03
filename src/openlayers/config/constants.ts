/**
 * Centralized constants for OpenLayers map system.
 *
 * @module config/constants
 */

import type { MapViewConfig } from './types';

// =============================================================================
// MAP VIEW CONSTANTS
// =============================================================================

/** Default center coordinates [longitude, latitude] - centered on Thailand */
export const DEFAULT_CENTER: [number, number] = [100.5, 13.75];

/** Default zoom level - country overview */
export const DEFAULT_ZOOM: number = 6;

/** Default map view configuration */
export const DEFAULT_VIEW_CONFIG: MapViewConfig = {
  center: DEFAULT_CENTER,
  zoom: DEFAULT_ZOOM,
};

// =============================================================================
// BANGKOK SPECIFIC CONSTANTS
// =============================================================================

/** Bangkok center coordinates [longitude, latitude] */
export const BANGKOK_CENTER: [number, number] = [100.5014, 13.7563];

/** Zoom level for Bangkok city view */
export const BANGKOK_ZOOM: number = 16;

// =============================================================================
// PMTILES CONSTANTS
// =============================================================================

/** Static PMTiles URL - Parcel handles bundling and provides runtime URL */
export const THAILAND_PMTILES_URL: string = new URL('../thailand.pmtiles', import.meta.url).href;

/** Default PMTiles URL (fallback when not provided) */
export const DEFAULT_PMTILES_URL: string =
  'https://r2-public.protomaps.com/protomaps-sample-datasets/nz-buildings-v3.pmtiles';

// =============================================================================
// ATTRIBUTION CONSTANTS
// =============================================================================

/** Default attribution for OpenStreetMap data */
export const DEFAULT_ATTRIBUTION: string = '© OpenStreetMap contributors';

// =============================================================================
// CONTROL POSITION CONSTANTS
// =============================================================================

/** Zoom controls container height in em units */
export const ZOOM_CONTROLS_HEIGHT_EM: number = 4.5;

/** Control left offset in em units */
export const CONTROL_LEFT_OFFSET_EM: number = 0.5;
