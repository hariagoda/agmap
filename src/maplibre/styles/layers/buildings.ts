/**
 * Building layer definitions.
 *
 * @module maplibre/styles/layers/buildings
 */

import type { FillLayerSpec, LayerSpec } from '../../config/types';
import { createFillLayer } from '../factories';
import { BUILDING_COLORS, TRANSIT_COLORS } from '../palette';

/**
 * Building footprints.
 * Note: opacity starts at 0 for fade-in animation.
 */
const building: FillLayerSpec = createFillLayer({
  id: 'building',
  sourceLayer: 'building',
  color: BUILDING_COLORS.fill,
  outlineColor: BUILDING_COLORS.outline,
  opacity: 0,
});

/**
 * Airport/aeroway areas.
 */
const aeroway: FillLayerSpec = createFillLayer({
  id: 'aeroway',
  sourceLayer: 'aeroway',
  color: TRANSIT_COLORS.aeroway,
  outlineColor: '#cfd0d5',
  opacity: 0.85,
});

/**
 * All building-related layers in rendering order (bottom to top).
 */
export const buildingLayers: LayerSpec[] = [building, aeroway];
