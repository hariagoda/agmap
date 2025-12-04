/**
 * Label layer definitions.
 *
 * Uses a tiered approach based on OSM Bright style:
 * - POI Level 1: rank ≤ 14, minzoom 14
 * - POI Level 2: rank 15-24, minzoom 15
 * - POI Level 3: rank ≥ 25, minzoom 16
 * - Places: village, town, city with different zoom ranges
 *
 * @module maplibre/styles/layers/labels
 */

import {
  SYMBOL_SPACING_GENERAL,
  SYMBOL_SPACING_MAJOR,
  SYMBOL_SPACING_MOUNTAIN,
} from '../../config/constants';
import type { FilterExpression, LayerSpec, SymbolLayerSpec } from '../../config/types';
import {
  fadeInByZoom,
  getLocalizedNameExpression,
  POI_RANK_SORT_KEY,
  POI_TRANSPORT_CLASSES,
} from '../expressions';
import { createSymbolLayer } from '../factories';
import { LABEL_COLORS } from '../palette';

// =============================================================================
// ADMINISTRATIVE LABELS (Places)
// Following OSM Bright ordering: continent → country → state → city → town → village → other
// =============================================================================

/**
 * Country name labels (rank 1 - major countries).
 */
const countryRank1Label: SymbolLayerSpec = createSymbolLayer({
  id: 'place-country-1',
  sourceLayer: 'place',
  textField: getLocalizedNameExpression(),
  textSize: ['interpolate', ['linear'], ['zoom'], 1, 11, 4, 17],
  textColor: LABEL_COLORS.countryText,
  textHaloColor: LABEL_COLORS.countryHalo,
  textHaloWidth: 2,
  textHaloBlur: 1,
  textOpacity: fadeInByZoom(1),
  filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 1]] as FilterExpression,
  minZoom: 1,
  maxZoom: 7,
  textLetterSpacing: 0.1,
});

/**
 * Country name labels (rank 2 - secondary countries).
 */
const countryRank2Label: SymbolLayerSpec = createSymbolLayer({
  id: 'place-country-2',
  sourceLayer: 'place',
  textField: getLocalizedNameExpression(),
  textSize: ['interpolate', ['linear'], ['zoom'], 2, 11, 5, 17],
  textColor: LABEL_COLORS.countryText,
  textHaloColor: LABEL_COLORS.countryHalo,
  textHaloWidth: 2,
  textHaloBlur: 1,
  textOpacity: fadeInByZoom(2),
  filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 2]] as FilterExpression,
  minZoom: 2,
  maxZoom: 7,
  textLetterSpacing: 0.1,
});

/**
 * Country name labels (rank 3+ - smaller countries).
 */
const countryRank3Label: SymbolLayerSpec = createSymbolLayer({
  id: 'place-country-3',
  sourceLayer: 'place',
  textField: getLocalizedNameExpression(),
  textSize: ['interpolate', ['linear'], ['zoom'], 3, 11, 7, 17],
  textColor: LABEL_COLORS.countryText,
  textHaloColor: LABEL_COLORS.countryHalo,
  textHaloWidth: 2,
  textHaloBlur: 1,
  textOpacity: fadeInByZoom(3),
  filter: ['all', ['==', 'class', 'country'], ['>=', 'rank', 3]] as FilterExpression,
  minZoom: 3,
  maxZoom: 8,
  textLetterSpacing: 0.1,
});

/**
 * Region/state name labels.
 */
const stateLabel: SymbolLayerSpec = createSymbolLayer({
  id: 'place-state',
  sourceLayer: 'place',
  textField: getLocalizedNameExpression(),
  textSize: ['interpolate', ['linear'], ['zoom'], 4, 10, 8, 14],
  textColor: LABEL_COLORS.regionText,
  textHaloColor: LABEL_COLORS.regionHalo,
  textHaloWidth: 1.2,
  textOpacity: fadeInByZoom(4),
  filter: ['==', 'class', 'state'] as FilterExpression,
  minZoom: 4,
  maxZoom: 9,
  textLetterSpacing: 0.1,
});

/**
 * City name labels (capitals get special treatment).
 */
const cityCapitalLabel: SymbolLayerSpec = createSymbolLayer({
  id: 'place-city-capital',
  sourceLayer: 'place',
  textField: getLocalizedNameExpression(),
  textSize: ['interpolate', ['linear'], ['zoom'], 7, 14, 11, 24],
  textColor: LABEL_COLORS.cityText,
  textHaloColor: LABEL_COLORS.cityHalo,
  textHaloWidth: 1.2,
  textOpacity: fadeInByZoom(5),
  filter: ['all', ['==', 'class', 'city'], ['==', 'capital', 2]] as FilterExpression,
  minZoom: 5,
  maxZoom: 14,
});

/**
 * City name labels (non-capitals).
 */
const cityLabel: SymbolLayerSpec = createSymbolLayer({
  id: 'place-city',
  sourceLayer: 'place',
  textField: getLocalizedNameExpression(),
  textSize: ['interpolate', ['linear'], ['zoom'], 7, 14, 11, 24],
  textColor: LABEL_COLORS.cityText,
  textHaloColor: LABEL_COLORS.cityHalo,
  textHaloWidth: 1.2,
  textOpacity: fadeInByZoom(7),
  filter: ['all', ['==', 'class', 'city'], ['!=', 'capital', 2]] as FilterExpression,
  minZoom: 7,
  maxZoom: 14,
});

/**
 * Town name labels.
 */
const townLabel: SymbolLayerSpec = createSymbolLayer({
  id: 'place-town',
  sourceLayer: 'place',
  textField: getLocalizedNameExpression(),
  textSize: ['interpolate', ['linear'], ['zoom'], 10, 14, 15, 24],
  textColor: LABEL_COLORS.cityText,
  textHaloColor: LABEL_COLORS.cityHalo,
  textHaloWidth: 1.2,
  textOpacity: fadeInByZoom(10),
  filter: ['==', 'class', 'town'] as FilterExpression,
  minZoom: 10,
  maxZoom: 16,
});

/**
 * Village name labels.
 */
const villageLabel: SymbolLayerSpec = createSymbolLayer({
  id: 'place-village',
  sourceLayer: 'place',
  textField: getLocalizedNameExpression(),
  textSize: ['interpolate', ['linear'], ['zoom'], 10, 12, 15, 22],
  textColor: LABEL_COLORS.cityText,
  textHaloColor: LABEL_COLORS.cityHalo,
  textHaloWidth: 1.2,
  textOpacity: fadeInByZoom(12),
  filter: ['==', 'class', 'village'] as FilterExpression,
  minZoom: 12,
  maxZoom: 17,
});

/**
 * Other place labels (suburbs, neighbourhoods, etc.).
 */
const placeOtherLabel: SymbolLayerSpec = createSymbolLayer({
  id: 'place-other',
  sourceLayer: 'place',
  textField: getLocalizedNameExpression(),
  textSize: ['interpolate', ['linear'], ['zoom'], 12, 10, 15, 14],
  textColor: LABEL_COLORS.poiGeneralText,
  textHaloColor: LABEL_COLORS.poiGeneralHalo,
  textHaloWidth: 1.2,
  textOpacity: fadeInByZoom(13),
  filter: [
    '!in',
    'class',
    'city',
    'town',
    'village',
    'state',
    'country',
    'continent',
  ] as FilterExpression,
  minZoom: 13,
  textLetterSpacing: 0.1,
});

// =============================================================================
// POI LABELS - Tiered by rank (following OSM Bright pattern)
// Level 1: rank ≤ 14, minzoom 14 (important POIs)
// Level 2: rank 15-24, minzoom 15 (medium POIs)
// Level 3: rank ≥ 25, minzoom 16 (minor POIs)
// =============================================================================

/**
 * POI Level 1 - High importance (rank ≤ 14).
 * Appears at zoom 14, includes major landmarks.
 */
const poiLevel1Labels: SymbolLayerSpec = createSymbolLayer({
  id: 'poi-level-1',
  sourceLayer: 'poi',
  textField: getLocalizedNameExpression(),
  textSize: 12,
  textColor: LABEL_COLORS.poiMajorText,
  textHaloColor: LABEL_COLORS.poiMajorHalo,
  textHaloWidth: 1,
  textHaloBlur: 0.5,
  textOpacity: fadeInByZoom(14),
  filter: [
    'all',
    ['has', 'name'],
    ['<=', 'rank', 14],
    ['!in', 'class', ...POI_TRANSPORT_CLASSES],
  ] as FilterExpression,
  minZoom: 14,
  symbolSpacing: SYMBOL_SPACING_MAJOR,
  textPadding: 2,
  symbolSortKey: POI_RANK_SORT_KEY,
});

/**
 * POI Level 2 - Medium importance (rank 15-24).
 * Appears at zoom 15.
 */
const poiLevel2Labels: SymbolLayerSpec = createSymbolLayer({
  id: 'poi-level-2',
  sourceLayer: 'poi',
  textField: getLocalizedNameExpression(),
  textSize: 12,
  textColor: LABEL_COLORS.poiGeneralText,
  textHaloColor: LABEL_COLORS.poiGeneralHalo,
  textHaloWidth: 1,
  textHaloBlur: 0.5,
  textOpacity: fadeInByZoom(15),
  filter: [
    'all',
    ['has', 'name'],
    ['>=', 'rank', 15],
    ['<=', 'rank', 24],
    ['!in', 'class', ...POI_TRANSPORT_CLASSES],
  ] as FilterExpression,
  minZoom: 15,
  symbolSpacing: SYMBOL_SPACING_GENERAL,
  textPadding: 2,
  symbolSortKey: POI_RANK_SORT_KEY,
});

/**
 * POI Level 3 - Low importance (rank ≥ 25).
 * Appears at zoom 16.
 */
const poiLevel3Labels: SymbolLayerSpec = createSymbolLayer({
  id: 'poi-level-3',
  sourceLayer: 'poi',
  textField: getLocalizedNameExpression(),
  textSize: 12,
  textColor: LABEL_COLORS.poiGeneralText,
  textHaloColor: LABEL_COLORS.poiGeneralHalo,
  textHaloWidth: 1,
  textHaloBlur: 0.5,
  textOpacity: fadeInByZoom(16),
  filter: [
    'all',
    ['has', 'name'],
    ['>=', 'rank', 25],
    ['!in', 'class', ...POI_TRANSPORT_CLASSES],
  ] as FilterExpression,
  minZoom: 16,
  symbolSpacing: SYMBOL_SPACING_GENERAL,
  textPadding: 2,
  symbolSortKey: POI_RANK_SORT_KEY,
});

/**
 * Railway/Transit POI labels (stations).
 * Special treatment like OSM Bright - appears at zoom 13.
 */
const poiRailwayLabels: SymbolLayerSpec = createSymbolLayer({
  id: 'poi-railway',
  sourceLayer: 'poi',
  textField: getLocalizedNameExpression(),
  textSize: 12,
  textColor: LABEL_COLORS.transportText,
  textHaloColor: LABEL_COLORS.transportHalo,
  textHaloWidth: 1,
  textHaloBlur: 0.5,
  textOpacity: fadeInByZoom(13),
  filter: [
    'all',
    ['has', 'name'],
    ['==', 'class', 'railway'],
    ['==', 'subclass', 'station'],
  ] as FilterExpression,
  minZoom: 13,
  symbolSpacing: SYMBOL_SPACING_MAJOR,
  textPadding: 2,
});

/**
 * Mountain peak labels.
 */
const mountainLabels: SymbolLayerSpec = createSymbolLayer({
  id: 'poi-mountain-labels',
  sourceLayer: 'mountain_peak',
  textField: getLocalizedNameExpression(),
  textSize: ['interpolate', ['linear'], ['zoom'], 10, 10, 15, 14],
  textColor: LABEL_COLORS.mountainText,
  textHaloColor: LABEL_COLORS.mountainHalo,
  textHaloWidth: 1.1,
  textOpacity: fadeInByZoom(11),
  textFont: ['Open Sans Italic', 'Open Sans Regular'],
  minZoom: 11,
  symbolSpacing: SYMBOL_SPACING_MOUNTAIN,
  textLetterSpacing: 0.05,
  textLineHeight: 1.2,
  textRadialOffset: 0.2,
  symbolSortKey: POI_RANK_SORT_KEY,
  filter: ['has', 'name'] as FilterExpression,
});

// =============================================================================
// EXPORTS
// =============================================================================

/**
 * All label layers in rendering order (bottom to top).
 * Following OSM Bright pattern:
 * 1. Place labels (country → state → city → town → village → other)
 * 2. POI labels by tier (level 1 → level 2 → level 3)
 * 3. Special POIs (railway, mountains)
 */
export const labelLayers: LayerSpec[] = [
  // Countries by rank (most important first)
  countryRank1Label,
  countryRank2Label,
  countryRank3Label,
  // States/regions
  stateLabel,
  // Cities (capitals first)
  cityCapitalLabel,
  cityLabel,
  // Towns and villages
  townLabel,
  villageLabel,
  // Other places (suburbs, etc.)
  placeOtherLabel,
  // POIs by importance tier
  poiLevel1Labels,
  poiLevel2Labels,
  poiLevel3Labels,
  // Special POIs
  poiRailwayLabels,
  mountainLabels,
];
