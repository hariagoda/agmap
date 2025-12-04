/**
 * Landcover layer definitions.
 *
 * Natural land coverage including forests, grass, wetlands, etc.
 *
 * @module maplibre/styles/layers/landcover
 */

import type { FillLayerSpec, FilterExpression, LayerSpec } from '../../config/types';
import { createFillLayer } from '../factories';
import { VEGETATION_COLORS } from '../palette';

/**
 * Forest and wooded areas.
 */
const forest: FillLayerSpec = createFillLayer({
  id: 'landcover-forest',
  sourceLayer: 'landcover',
  color: VEGETATION_COLORS.forest,
  filter: ['in', 'class', 'wood', 'forest'] as FilterExpression,
  opacity: 0.9,
});

/**
 * Grass and meadows.
 */
const grass: FillLayerSpec = createFillLayer({
  id: 'landcover-grass',
  sourceLayer: 'landcover',
  color: VEGETATION_COLORS.grass,
  filter: ['==', 'class', 'grass'] as FilterExpression,
});

/**
 * Wetlands and marshes.
 */
const wetland: FillLayerSpec = createFillLayer({
  id: 'landcover-wetland',
  sourceLayer: 'landcover',
  color: VEGETATION_COLORS.wetland,
  filter: ['==', 'class', 'wetland'] as FilterExpression,
});

/**
 * Agricultural land and farms.
 */
const farmland: FillLayerSpec = createFillLayer({
  id: 'landcover-farmland',
  sourceLayer: 'landcover',
  color: VEGETATION_COLORS.farmland,
  filter: ['==', 'class', 'farmland'] as FilterExpression,
});

/**
 * Sandy areas and beaches.
 */
const sand: FillLayerSpec = createFillLayer({
  id: 'landcover-sand',
  sourceLayer: 'landcover',
  color: VEGETATION_COLORS.sand,
  filter: ['==', 'class', 'sand'] as FilterExpression,
});

/**
 * Parks and recreational green spaces.
 */
const park: FillLayerSpec = createFillLayer({
  id: 'park',
  sourceLayer: 'park',
  color: VEGETATION_COLORS.park,
  opacity: 0.95,
});

/**
 * All landcover layers in rendering order (bottom to top).
 */
export const landcoverLayers: LayerSpec[] = [forest, grass, wetland, farmland, sand, park];
