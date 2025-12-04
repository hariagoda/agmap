/**
 * OpenLayers styles exports.
 *
 * @module openlayers/styles
 */

export type { ColorKey } from './colors';
export { COLORS } from './colors';

export type { FilterThresholds } from './filters';
export {
  DEFAULT_FILTER_THRESHOLDS,
  shouldHideBuilding,
  shouldHideFeatureByZoom,
  shouldHideMinorLanduse,
  shouldHideMinorRoads,
  shouldHideSmallWaterways,
} from './filters';

export { SPECIAL_HANDLERS } from './handlers';

export {
  createStyleFunction,
  HIDDEN_LAYERS,
  STYLE_LOOKUP,
} from './styleLookup';

export {
  // Aeroway
  aerowayStyle,
  // Boundary
  adminBoundaryStyle,
  boundaryStyle,
  // Structures
  bridgeStyle,
  // Building
  buildingStyle,
  // Transport variants
  buswayStyle,
  // Landuse
  cemeteryStyle,
  commercialStyle,
  // Roads - construction
  constructionStyle,
  // Fallback & utility
  defaultStyle,
  emptyStyle,
  // Landcover
  farmlandStyle,
  // Transport - water
  ferryStyle,
  forestStyle,
  grassStyle,
  hospitalStyle,
  industrialStyle,
  institutionalStyle,
  militaryStyle,
  // Roads - minor
  minorRoadStyle,
  // Roads - major
  motorwayStyle,
  // POI
  mountainPeakStyle,
  // Green spaces
  parkStyle,
  // Roads - paths
  pathStyle,
  pierStyle,
  poiStyle,
  // Water
  poolStyle,
  primaryStyle,
  racewayStyle,
  // Transport - rail
  railwayStyle,
  residentialStyle,
  retailStyle,
  schoolStyle,
  secondaryStyle,
  serviceRoadStyle,
  stadiumStyle,
  tertiaryStyle,
  trackStyle,
  waterStyle,
  waterwaySmallStyle,
  waterwayStyle,
  wetlandStyle,
} from './styleObjects';

export type { SpecialStyleHandler, StyleFunction, StyleValue } from './types';

