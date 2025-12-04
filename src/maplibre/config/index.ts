/**
 * MapLibre configuration exports.
 *
 * @module maplibre/config
 */

export {
  BANGKOK_FLY_DURATION_MS,
  BANGKOK_FLY_START_ZOOM,
  BANGKOK_FLY_TARGET_ZOOM,
  BUILDING_ANIMATION_DURATION_MS,
  BUILDING_LAYER_ID,
  BUILDING_TARGET_OPACITY,
  GENERAL_POI_MAX_RANK,
  LABEL_DEBUG_LAYERS,
  MAJOR_POI_MAX_RANK,
  MOUNTAIN_MAX_RANK,
  PMTILES_SOURCE_ID,
  SYMBOL_SPACING_GENERAL,
  SYMBOL_SPACING_MAJOR,
  SYMBOL_SPACING_MOUNTAIN,
  SYMBOL_SPACING_TRANSPORT,
} from './constants';

export type {
  BackgroundLayerSpec,
  FillLayerOptions,
  FillLayerSpec,
  FilterExpression,
  LayerSpec,
  LineLayerOptions,
  LineLayerSpec,
  MapLibreMapProps,
  RoadRule,
  SymbolLayerOptions,
  SymbolLayerSpec,
  UseMapInstanceResult,
} from './types';
