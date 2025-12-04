/**
 * Boundary layer definitions.
 *
 * Administrative boundaries at country and regional levels.
 *
 * @module maplibre/styles/layers/boundaries
 */

import type { FilterExpression, LayerSpec, LineLayerSpec } from '../../config/types';
import { subtleWidthByZoom } from '../expressions';
import { createLineLayer } from '../factories';
import { BOUNDARY_COLORS } from '../palette';

/**
 * Country borders (admin_level 2).
 */
const countryBoundary: LineLayerSpec = createLineLayer({
  id: 'boundary-country',
  sourceLayer: 'boundary',
  color: BOUNDARY_COLORS.country,
  width: subtleWidthByZoom(1.6),
  opacity: 0.6,
  dasharray: [3, 2],
  filter: ['==', 'admin_level', 2] as FilterExpression,
});

/**
 * Regional/state borders (admin_level 4).
 */
const regionBoundary: LineLayerSpec = createLineLayer({
  id: 'boundary-region',
  sourceLayer: 'boundary',
  color: BOUNDARY_COLORS.region,
  width: subtleWidthByZoom(1.2),
  opacity: 0.4,
  dasharray: [2, 2],
  filter: ['==', 'admin_level', 4] as FilterExpression,
});

/**
 * All boundary layers in rendering order (bottom to top).
 */
export const boundaryLayers: LayerSpec[] = [countryBoundary, regionBoundary];
