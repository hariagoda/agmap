/**
 * MapLibre-specific type definitions.
 *
 * @module maplibre/config/types
 */

import type { FilterSpecification, LayerSpecification } from 'maplibre-gl';
import type { LngLat, MapEventCallbacks } from '../../shared/config/types';

// =============================================================================
// LAYER TYPE ALIASES
// =============================================================================

/** MapLibre fill layer specification */
export type FillLayerSpec = Extract<LayerSpecification, { type: 'fill' }>;

/** MapLibre line layer specification */
export type LineLayerSpec = Extract<LayerSpecification, { type: 'line' }>;

/** MapLibre background layer specification */
export type BackgroundLayerSpec = Extract<LayerSpecification, { type: 'background' }>;

/** MapLibre symbol layer specification */
export type SymbolLayerSpec = Extract<LayerSpecification, { type: 'symbol' }>;

/** Union of all supported layer types */
export type LayerSpec = FillLayerSpec | LineLayerSpec | BackgroundLayerSpec | SymbolLayerSpec;

/** Filter expression type alias */
export type FilterExpression = FilterSpecification;

// =============================================================================
// LAYER FACTORY OPTIONS
// =============================================================================

/** Options for creating a fill layer */
export interface FillLayerOptions {
  /** Unique layer identifier */
  id: string;
  /** Source layer name from vector tiles */
  sourceLayer: string;
  /** Fill color (string or expression) */
  color: string | readonly unknown[];
  /** Fill opacity (0-1) */
  opacity?: number;
  /** Outline color for polygons */
  outlineColor?: string;
  /** Filter expression to select features */
  filter?: FilterExpression;
}

/** Options for creating a line layer */
export interface LineLayerOptions {
  /** Unique layer identifier */
  id: string;
  /** Source layer name from vector tiles */
  sourceLayer: string;
  /** Line color (string or expression) */
  color: string | readonly unknown[];
  /** Line width (number or expression) */
  width: number | readonly unknown[];
  /** Line opacity (0-1) */
  opacity?: number;
  /** Dash pattern array [dash, gap] */
  dasharray?: readonly number[];
  /** Filter expression to select features */
  filter?: FilterExpression;
  /** Line cap style */
  lineCap?: 'butt' | 'round' | 'square';
  /** Line join style */
  lineJoin?: 'bevel' | 'miter' | 'round';
}

/** Options for creating a symbol layer */
export interface SymbolLayerOptions {
  /** Unique layer identifier */
  id: string;
  /** Source layer name from vector tiles */
  sourceLayer: string;
  /** Text field expression */
  textField: string | unknown[];
  /** Text size (number or expression) */
  textSize: number | unknown[];
  /** Text color */
  textColor: string;
  /** Text halo color for readability */
  textHaloColor: string;
  /** Text halo width */
  textHaloWidth?: number;
  /** Text halo blur */
  textHaloBlur?: number;
  /** Text opacity (number or expression) */
  textOpacity?: number | unknown[];
  /** Font stack */
  textFont?: string[];
  /** Filter expression to select features */
  filter?: FilterExpression;
  /** Minimum zoom level to show layer */
  minZoom?: number;
  /** Maximum zoom level to show layer */
  maxZoom?: number;
  /** Allow text overlap */
  allowOverlap?: boolean;
  /** Symbol placement mode */
  symbolPlacement?: 'point' | 'line';
  /** Spacing between symbols */
  symbolSpacing?: number;
  /** Text padding */
  textPadding?: number;
  /** Letter spacing */
  textLetterSpacing?: number;
  /** Line height */
  textLineHeight?: number;
  /** Radial offset from anchor */
  textRadialOffset?: number;
  /** Sort key expression for rendering order */
  symbolSortKey?: number | unknown[];
}

// =============================================================================
// ROAD CONFIGURATION
// =============================================================================

/** Road style rule configuration */
export interface RoadRule {
  /** Unique identifier for the road type */
  id: string;
  /** Road class values to match */
  classes: string[];
  /** Base width at zoom level 10 */
  baseWidth: number;
  /** Fill color */
  color: string;
  /** Casing (outline) color */
  casingColor: string;
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

/** Props for the MapLibreMap component */
export interface MapLibreMapProps extends MapEventCallbacks {
  /** Initial map center [longitude, latitude] */
  center?: LngLat;
  /** Initial zoom level */
  zoom?: number;
  /** Enable fly-to animation on load */
  enableFlyTo?: boolean;
  /** Enable building fade-in animation */
  enableBuildingAnimation?: boolean;
  /** Enable debug mode (label click logging in dev) */
  debug?: boolean;
  /** Additional CSS class name */
  className?: string;
}

// =============================================================================
// HOOK RETURN TYPES
// =============================================================================

/** Return type for useMapInstance hook */
export interface UseMapInstanceResult {
  /** Map instance reference (null until initialized) */
  map: maplibregl.Map | null;
  /** Whether the map is fully loaded and ready */
  isReady: boolean;
  /** Error that occurred during initialization */
  error: Error | null;
}
