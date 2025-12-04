/**
 * Landuse layer definitions.
 *
 * Urban land use zones including residential, commercial, industrial, etc.
 *
 * @module maplibre/styles/layers/landuse
 */

import type { FillLayerSpec, FilterExpression, LayerSpec } from '../../config/types';
import { createFillLayer } from '../factories';
import { LANDUSE_COLORS } from '../palette';

/**
 * Residential areas.
 */
const residential: FillLayerSpec = createFillLayer({
  id: 'landuse-residential',
  sourceLayer: 'landuse',
  color: LANDUSE_COLORS.residential,
  filter: ['==', 'class', 'residential'] as FilterExpression,
});

/**
 * Commercial zones.
 */
const commercial: FillLayerSpec = createFillLayer({
  id: 'landuse-commercial',
  sourceLayer: 'landuse',
  color: LANDUSE_COLORS.commercial,
  filter: ['==', 'class', 'commercial'] as FilterExpression,
});

/**
 * Industrial zones.
 */
const industrial: FillLayerSpec = createFillLayer({
  id: 'landuse-industrial',
  sourceLayer: 'landuse',
  color: LANDUSE_COLORS.industrial,
  filter: ['==', 'class', 'industrial'] as FilterExpression,
});

/**
 * Institutional/government areas.
 */
const institutional: FillLayerSpec = createFillLayer({
  id: 'landuse-institutional',
  sourceLayer: 'landuse',
  color: LANDUSE_COLORS.institutional,
  filter: ['==', 'class', 'institutional'] as FilterExpression,
});

/**
 * Hospital and medical facilities.
 */
const hospital: FillLayerSpec = createFillLayer({
  id: 'landuse-hospital',
  sourceLayer: 'landuse',
  color: LANDUSE_COLORS.hospital,
  filter: ['==', 'class', 'hospital'] as FilterExpression,
});

/**
 * Schools and educational facilities.
 */
const school: FillLayerSpec = createFillLayer({
  id: 'landuse-school',
  sourceLayer: 'landuse',
  color: LANDUSE_COLORS.school,
  filter: ['in', 'class', 'school', 'university', 'college'] as FilterExpression,
});

/**
 * Sports stadiums and recreational facilities.
 */
const stadium: FillLayerSpec = createFillLayer({
  id: 'landuse-stadium',
  sourceLayer: 'landuse',
  color: LANDUSE_COLORS.stadium,
  filter: ['in', 'class', 'stadium', 'pitch', 'track', 'playground'] as FilterExpression,
});

/**
 * Cemeteries.
 */
const cemetery: FillLayerSpec = createFillLayer({
  id: 'landuse-cemetery',
  sourceLayer: 'landuse',
  color: LANDUSE_COLORS.cemetery,
  filter: ['==', 'class', 'cemetery'] as FilterExpression,
});

/**
 * All landuse layers in rendering order (bottom to top).
 */
export const landuseLayers: LayerSpec[] = [
  residential,
  commercial,
  industrial,
  institutional,
  hospital,
  school,
  stadium,
  cemetery,
];
