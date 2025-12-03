/**
 * Type definitions for map layers system.
 *
 * @module layers/types
 */

import type { BaseLayer } from 'ol/layer';
import type { Source } from 'ol/source/Source';

/**
 * Base layer configuration interface.
 */
export interface LayerConfig {
  /** Layer identifier */
  id: string;
  /** Whether the layer is visible */
  visible?: boolean;
  /** Layer opacity (0-1) */
  opacity?: number;
  /** Layer z-index for ordering */
  zIndex?: number;
}

/**
 * PMTiles layer configuration.
 */
export interface PMTilesLayerConfig extends LayerConfig {
  /** Layer type identifier */
  type: 'pmtiles';
  /** URL to the PMTiles file */
  url: string;
  /** Attribution text for the data source */
  attribution?: string;
  /** Whether to declutter overlapping features */
  declutter?: boolean;
  /** Cache size for tiles */
  cacheSize?: number;
}

/**
 * Layer factory function type.
 * Creates a layer instance from configuration.
 */
export type LayerFactory<T extends LayerConfig = LayerConfig> = (config: T) => BaseLayer<Source>;

/**
 * Layer registry entry.
 */
export interface LayerRegistryEntry {
  /** Layer type identifier */
  type: string;
  /** Factory function to create the layer */
  factory: LayerFactory;
}

/**
 * Layer registry type.
 */
export type LayerRegistry = Map<string, LayerFactory>;
