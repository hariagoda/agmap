/**
 * Configuration type definitions for OpenLayers map system.
 *
 * @module config/types
 */

/**
 * Map view configuration
 */
export interface MapViewConfig {
  /** Center coordinates [longitude, latitude] */
  center: [number, number];
  /** Initial zoom level */
  zoom: number;
}

/**
 * PMTiles layer configuration
 */
export interface PMTilesLayerConfig {
  /** URL to the PMTiles file */
  url: string;
  /** Attribution text for the data source */
  attribution: string;
  /** Whether to declutter overlapping features */
  declutter: boolean;
  /** Cache size for tiles */
  cacheSize: number;
}

/**
 * Vector tile layer rendering configuration
 */
export interface VectorTileRenderConfig {
  /** Render mode: 'hybrid', 'vector', or 'image' */
  renderMode: 'hybrid' | 'vector' | 'image';
  /** Render buffer size in pixels */
  renderBuffer: number;
  /** Update while animating */
  updateWhileAnimating: boolean;
  /** Update while interacting */
  updateWhileInteracting: boolean;
}

/**
 * Control configuration
 */
export interface ControlConfig {
  /** Control identifier */
  id: string;
  /** Whether the control is enabled */
  enabled: boolean;
  /** Control-specific options */
  options?: Record<string, unknown>;
}

/**
 * Map configuration options
 */
export interface MapConfig {
  /** Map view configuration */
  view?: Partial<MapViewConfig>;
  /** PMTiles layer configuration */
  pmTiles?: Partial<PMTilesLayerConfig>;
  /** Vector tile render configuration */
  render?: Partial<VectorTileRenderConfig>;
  /** Controls configuration */
  controls?: ControlConfig[];
}
