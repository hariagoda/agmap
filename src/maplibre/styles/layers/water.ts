/**
 * Water layer definitions.
 *
 * Includes water bodies (lakes, seas) and waterways (rivers, streams).
 *
 * @module maplibre/styles/layers/water
 */

import type { FillLayerSpec, FilterExpression, LayerSpec, LineLayerSpec } from '../../config/types';
import { subtleWidthByZoom } from '../expressions';
import { createFillLayer, createLineLayer } from '../factories';
import { WATER_COLORS } from '../palette';

/**
 * Water body fill layer (lakes, seas, oceans).
 */
const waterFill: FillLayerSpec = createFillLayer({
  id: 'water',
  sourceLayer: 'water',
  color: WATER_COLORS.fill,
});

/**
 * Water body border for definition.
 */
const waterBorder: LineLayerSpec = createLineLayer({
  id: 'water-border',
  sourceLayer: 'water',
  color: WATER_COLORS.edge,
  width: subtleWidthByZoom(1.1),
  opacity: 0.45,
});

/**
 * Major waterways (rivers, canals, streams).
 */
const waterwayMajor: LineLayerSpec = createLineLayer({
  id: 'waterway',
  sourceLayer: 'waterway',
  color: WATER_COLORS.edge,
  width: subtleWidthByZoom(1),
  opacity: 0.65,
  filter: ['in', 'class', 'river', 'canal', 'stream'] as FilterExpression,
});

/**
 * Minor waterways (drains, ditches).
 */
const waterwayMinor: LineLayerSpec = createLineLayer({
  id: 'waterway-minor',
  sourceLayer: 'waterway',
  color: WATER_COLORS.edge,
  width: subtleWidthByZoom(0.6),
  opacity: 0.45,
  filter: ['in', 'class', 'drain', 'ditch'] as FilterExpression,
});

/**
 * All water layers in rendering order (bottom to top).
 */
export const waterLayers: LayerSpec[] = [waterFill, waterBorder, waterwayMajor, waterwayMinor];
