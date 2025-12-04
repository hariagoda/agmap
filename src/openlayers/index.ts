/**
 * OpenLayers module exports.
 *
 * Provides a modular, type-safe OpenLayers map implementation with:
 * - Pluggable controls system
 * - PMTiles vector tile support
 * - Google Maps-inspired styling
 * - Comprehensive error handling
 *
 * @module openlayers
 */

// Main component
export type { OpenLayersMapProps } from './OpenLayersMap';
export { OpenLayersMap } from './OpenLayersMap';

// Components
export type { ErrorDisplayProps, LoadingStateProps } from './components';
export { ErrorDisplay, LoadingState, MapErrorBoundary } from './components';

// Configuration
export type {
  ControlConfig,
  MapConfig,
  MapViewConfig,
  PMTilesLayerConfig,
  VectorTileRenderConfig,
} from './config';
export {
  BANGKOK_CENTER,
  BANGKOK_ZOOM,
  BANGKOK_ZOOM_CONTROL_CONFIG,
  CONTROL_LEFT_OFFSET_EM,
  DEFAULT_ATTRIBUTION,
  DEFAULT_CENTER,
  DEFAULT_CONTROLS,
  DEFAULT_MAP_CONFIG,
  DEFAULT_PMTILES_CONFIG,
  DEFAULT_PMTILES_URL,
  DEFAULT_RENDER_CONFIG,
  DEFAULT_VIEW_CONFIG,
  DEFAULT_ZOOM,
  THAILAND_PMTILES_URL,
  ZOOM_CONTROLS_HEIGHT_EM,
} from './config';

// Controls
export type {
  BangkokZoomControlOptions,
  ControlFactory,
  ControlRegistry,
  ControlRegistryEntry,
} from './controls';
export {
  BangkokZoomControl,
  getControlFactory,
  hasControl,
  registerControl,
} from './controls';

// Hooks
export type {
  UseMapControlsOptions,
  UseMapInstanceOptions,
  UseMapInstanceReturn,
  UsePMTilesLayerOptions,
} from './hooks';
export { useMapControls, useMapInstance, usePMTilesLayer } from './hooks';

// Layers
export type {
  LayerConfig,
  LayerFactory,
  LayerRegistry,
  LayerRegistryEntry,
  PMTilesLayerConfig as PMTilesLayerTypeConfig,
} from './layers';
export { applyLayerConfig, createConfiguredLayer } from './layers';

// Styles
export type {
  ColorKey,
  FilterThresholds,
  SpecialStyleHandler,
  StyleFunction,
  StyleValue,
} from './styles';
export {
  COLORS,
  createStyleFunction,
  DEFAULT_FILTER_THRESHOLDS,
  HIDDEN_LAYERS,
  SPECIAL_HANDLERS,
  STYLE_LOOKUP,
} from './styles';

// Utilities
export {
  ControlCreationError,
  ERROR_CODE_CONTROL_CREATION,
  ERROR_CODE_LAYER_CREATION,
  ERROR_CODE_MAP_INIT,
  getFeatureAdminLevel,
  getFeatureClass,
  getFeatureLayer,
  getFeatureNumber,
  getFeatureString,
  isCoordinate,
  isNumber,
  isString,
  LayerCreationError,
  MapError,
  MapInitializationError,
  normalizeError,
} from './utils';
