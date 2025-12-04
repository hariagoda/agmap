/**
 * MapLibre styles module exports.
 *
 * @module maplibre/styles
 */

export {
  createClassFilter,
  fadeInByZoom,
  fadeInByZoomAndRank,
  getLocalizedNameExpression,
  getPOISortKeyExpression,
  LANDMARK_PRIORITIES,
  POI_MAJOR_CLASSES,
  POI_RANK_SORT_KEY,
  POI_RANK_VALUE,
  POI_TRANSPORT_CLASSES,
  rankLimitFilter,
  steppedFadeByRank,
  subtleWidthByZoom,
  WATERWAY_SORT_KEY,
  widthByZoom,
} from './expressions';

export { createFillLayer, createLineLayer, createSymbolLayer } from './factories';
export type { Palette } from './palette';
export {
  BOUNDARY_COLORS,
  BUILDING_COLORS,
  LABEL_COLORS,
  LAND_COLORS,
  LANDUSE_COLORS,
  PALETTE,
  ROAD_COLORS,
  TRANSIT_COLORS,
  VEGETATION_COLORS,
  WATER_COLORS,
} from './palette';
