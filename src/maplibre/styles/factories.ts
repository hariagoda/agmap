/**
 * Layer factory functions for MapLibre GL JS.
 *
 * These functions create properly typed layer specifications
 * with sensible defaults and consistent patterns.
 *
 * @module maplibre/styles/factories
 */

import { PMTILES_SOURCE_ID } from '../config/constants';
import type {
  FillLayerOptions,
  FillLayerSpec,
  LineLayerOptions,
  LineLayerSpec,
  SymbolLayerOptions,
  SymbolLayerSpec,
} from '../config/types';

// =============================================================================
// FILL LAYER FACTORY
// =============================================================================

/**
 * Creates a fill layer specification for polygon features.
 *
 * @param options - Fill layer configuration
 * @returns MapLibre fill layer specification
 *
 * @example
 * ```ts
 * const waterLayer = createFillLayer({
 *   id: 'water',
 *   sourceLayer: 'water',
 *   color: '#a6c8ff',
 * });
 * ```
 */
export const createFillLayer = ({
  id,
  sourceLayer,
  color,
  opacity,
  outlineColor,
  filter,
}: FillLayerOptions): FillLayerSpec => {
  const paint: Record<string, string | number | readonly unknown[]> = {
    'fill-color': color,
  };

  if (opacity !== undefined) {
    paint['fill-opacity'] = opacity;
  }

  if (outlineColor) {
    paint['fill-outline-color'] = outlineColor;
  }

  return {
    id,
    type: 'fill',
    source: PMTILES_SOURCE_ID,
    'source-layer': sourceLayer,
    paint,
    ...(filter ? { filter } : {}),
  };
};

// =============================================================================
// LINE LAYER FACTORY
// =============================================================================

/**
 * Creates a line layer specification for linear features.
 *
 * @param options - Line layer configuration
 * @returns MapLibre line layer specification
 *
 * @example
 * ```ts
 * const roadLayer = createLineLayer({
 *   id: 'primary-road',
 *   sourceLayer: 'transportation',
 *   color: '#ffffff',
 *   width: widthByZoom(3.4),
 *   filter: ['==', 'class', 'primary'],
 * });
 * ```
 */
export const createLineLayer = ({
  id,
  sourceLayer,
  color,
  width,
  opacity,
  dasharray,
  filter,
  lineCap = 'round',
  lineJoin = 'round',
}: LineLayerOptions): LineLayerSpec => {
  const paint: Record<string, string | number | readonly unknown[]> = {
    'line-color': color,
    'line-width': width,
  };

  if (opacity !== undefined) {
    paint['line-opacity'] = opacity;
  }

  if (dasharray) {
    paint['line-dasharray'] = dasharray;
  }

  return {
    id,
    type: 'line',
    source: PMTILES_SOURCE_ID,
    'source-layer': sourceLayer,
    paint,
    layout: {
      'line-cap': lineCap,
      'line-join': lineJoin,
    },
    ...(filter ? { filter } : {}),
  };
};

// =============================================================================
// SYMBOL LAYER FACTORY
// =============================================================================

/** Default font stack for labels */
const DEFAULT_FONTS: string[] = ['Open Sans Semibold', 'Open Sans Regular'];

/**
 * Creates a symbol layer specification for labels and icons.
 *
 * @param options - Symbol layer configuration
 * @returns MapLibre symbol layer specification
 *
 * @example
 * ```ts
 * const cityLabel = createSymbolLayer({
 *   id: 'city-label',
 *   sourceLayer: 'place',
 *   textField: ['get', 'name'],
 *   textSize: 14,
 *   textColor: '#333333',
 *   textHaloColor: '#ffffff',
 *   filter: ['==', 'class', 'city'],
 * });
 * ```
 */
export const createSymbolLayer = ({
  id,
  sourceLayer,
  textField,
  textSize,
  textColor,
  textHaloColor,
  textHaloWidth = 1.2,
  textHaloBlur = 0.15,
  textOpacity,
  textFont,
  filter,
  minZoom,
  maxZoom,
  allowOverlap = false,
  symbolPlacement = 'point',
  symbolSpacing = 250,
  textPadding = 2,
  textLetterSpacing = 0.02,
  textLineHeight = 1.1,
  textRadialOffset = 0.15,
  symbolSortKey,
}: SymbolLayerOptions): SymbolLayerSpec => {
  const layout: NonNullable<SymbolLayerSpec['layout']> = {
    'text-field': textField as never,
    'text-font': textFont ?? DEFAULT_FONTS,
    'text-size': textSize as never,
    'symbol-placement': symbolPlacement,
    'text-allow-overlap': allowOverlap,
    'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
    'text-radial-offset': textRadialOffset,
    'text-max-width': 8,
    'text-letter-spacing': textLetterSpacing,
    'text-line-height': textLineHeight,
    'symbol-spacing': symbolSpacing,
    'text-padding': textPadding,
    'text-optional': false,
    'icon-optional': true,
  };

  if (symbolSortKey !== undefined) {
    layout['symbol-sort-key'] = symbolSortKey as never;
  }

  const paint: NonNullable<SymbolLayerSpec['paint']> = {
    'text-color': textColor,
    'text-halo-color': textHaloColor,
    'text-halo-width': textHaloWidth,
    'text-halo-blur': textHaloBlur,
  };

  if (textOpacity !== undefined) {
    paint['text-opacity'] = textOpacity as never;
  }

  return {
    id,
    type: 'symbol',
    source: PMTILES_SOURCE_ID,
    'source-layer': sourceLayer,
    layout,
    paint,
    ...(filter ? { filter } : {}),
    ...(minZoom !== undefined ? { minzoom: minZoom } : {}),
    ...(maxZoom !== undefined ? { maxzoom: maxZoom } : {}),
  };
};
