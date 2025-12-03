/**
 * Base utilities for map layers.
 *
 * Provides common functionality for layer management and lifecycle.
 *
 * @module layers/base
 */

import type { BaseLayer } from 'ol/layer';
import type { Source } from 'ol/source/Source';
import type { LayerConfig } from './types';

/**
 * Apply common layer configuration to an OpenLayers layer.
 *
 * @param layer - OpenLayers layer instance
 * @param config - Layer configuration
 */
export function applyLayerConfig(layer: BaseLayer<Source>, config: LayerConfig): void {
  if (config.visible !== undefined) {
    layer.setVisible(config.visible);
  }
  if (config.opacity !== undefined) {
    layer.setOpacity(config.opacity);
  }
  if (config.zIndex !== undefined) {
    layer.setZIndex(config.zIndex);
  }
}

/**
 * Create a layer with configuration applied.
 *
 * @param layer - OpenLayers layer instance
 * @param config - Layer configuration
 * @returns The configured layer
 */
export function createConfiguredLayer<T extends Source>(
  layer: BaseLayer<T>,
  config: LayerConfig,
): BaseLayer<T> {
  applyLayerConfig(layer, config);
  return layer;
}
