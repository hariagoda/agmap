/**
 * Centralized constants for OpenLayers map system.
 *
 * @module openlayers/config/constants
 */

import {
  BANGKOK_CENTER as SHARED_BANGKOK_CENTER,
  OSM_ATTRIBUTION,
  THAILAND_CENTER,
  THAILAND_PMTILES_URL as SHARED_PMTILES_URL,
  ZOOM_CITY,
  ZOOM_COUNTRY,
} from '../../shared/config/constants';
import type { MapViewConfig } from './types';

// =============================================================================
// RE-EXPORT SHARED CONSTANTS
// =============================================================================

/** Bangkok center coordinates [longitude, latitude] */
export const BANGKOK_CENTER: [number, number] = SHARED_BANGKOK_CENTER;

/** Zoom level for Bangkok city view */
export const BANGKOK_ZOOM: number = ZOOM_CITY;

/** Static PMTiles URL - Parcel handles bundling and provides runtime URL */
export const THAILAND_PMTILES_URL: string = SHARED_PMTILES_URL;

/** Default attribution for OpenStreetMap data */
export const DEFAULT_ATTRIBUTION: string = OSM_ATTRIBUTION;

// =============================================================================
// MAP VIEW CONSTANTS
// =============================================================================

/** Default center coordinates [longitude, latitude] - centered on Thailand */
export const DEFAULT_CENTER: [number, number] = THAILAND_CENTER;

/** Default zoom level - country overview */
export const DEFAULT_ZOOM: number = ZOOM_COUNTRY;

/** Default map view configuration */
export const DEFAULT_VIEW_CONFIG: MapViewConfig = {
  center: DEFAULT_CENTER,
  zoom: DEFAULT_ZOOM,
};

// =============================================================================
// PMTILES CONSTANTS
// =============================================================================

/** Default PMTiles URL (fallback when not provided) */
export const DEFAULT_PMTILES_URL: string =
  'https://r2-public.protomaps.com/protomaps-sample-datasets/nz-buildings-v3.pmtiles';

// =============================================================================
// CONTROL POSITION CONSTANTS
// =============================================================================

/** Zoom controls container height in em units */
export const ZOOM_CONTROLS_HEIGHT_EM: number = 4.5;

/** Control left offset in em units */
export const CONTROL_LEFT_OFFSET_EM: number = 0.5;
