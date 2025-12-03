/**
 * Default configuration values for OpenLayers map system.
 *
 * @module config/defaults
 */

import {
  BANGKOK_CENTER,
  BANGKOK_ZOOM,
  DEFAULT_ATTRIBUTION,
  DEFAULT_VIEW_CONFIG,
  THAILAND_PMTILES_URL,
} from './constants';
import type { ControlConfig, MapConfig, PMTilesLayerConfig, VectorTileRenderConfig } from './types';

// =============================================================================
// PMTILES LAYER DEFAULTS
// =============================================================================

/** Default PMTiles layer configuration */
export const DEFAULT_PMTILES_CONFIG: PMTilesLayerConfig = {
  url: THAILAND_PMTILES_URL,
  attribution: DEFAULT_ATTRIBUTION,
  declutter: true,
  cacheSize: 128,
};

// =============================================================================
// VECTOR TILE RENDER DEFAULTS
// =============================================================================

/** Default vector tile rendering configuration */
export const DEFAULT_RENDER_CONFIG: VectorTileRenderConfig = {
  renderMode: 'hybrid', // Best balance: canvas for static, WebGL for dynamic features
  renderBuffer: 128, // Buffer for smoother zoom transitions
  updateWhileAnimating: true, // Update during zoom animations for responsiveness
  updateWhileInteracting: true, // Update during interactions for smooth experience
};

// =============================================================================
// CONTROL DEFAULTS
// =============================================================================

/** Default Bangkok zoom control configuration */
export const BANGKOK_ZOOM_CONTROL_CONFIG: ControlConfig = {
  id: 'bangkok-zoom',
  enabled: true,
  options: {
    center: BANGKOK_CENTER,
    zoom: BANGKOK_ZOOM,
  },
};

/** Default controls configuration */
export const DEFAULT_CONTROLS: ControlConfig[] = [BANGKOK_ZOOM_CONTROL_CONFIG];

// =============================================================================
// MAP DEFAULTS
// =============================================================================

/** Default map configuration */
export const DEFAULT_MAP_CONFIG: MapConfig = {
  view: DEFAULT_VIEW_CONFIG,
  pmTiles: DEFAULT_PMTILES_CONFIG,
  render: DEFAULT_RENDER_CONFIG,
  controls: DEFAULT_CONTROLS,
};
