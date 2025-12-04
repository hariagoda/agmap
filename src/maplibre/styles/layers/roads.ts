/**
 * Road and transportation layer definitions.
 *
 * Uses multi-pass rendering (casing + fill) for smooth Apple/Google-style roads.
 *
 * @module maplibre/styles/layers/roads
 */

import type { FillLayerSpec, LayerSpec, LineLayerSpec, RoadRule } from '../../config/types';
import { createClassFilter, subtleWidthByZoom, widthByZoom } from '../expressions';
import { createFillLayer, createLineLayer } from '../factories';
import { ROAD_COLORS, TRANSIT_COLORS } from '../palette';

// =============================================================================
// ROAD RULES CONFIGURATION
// =============================================================================

/**
 * Road styling rules defining class matches, widths, and colors.
 * Ordered from most important (motorway) to least (service).
 */
const ROAD_RULES: RoadRule[] = [
  {
    id: 'motorway',
    classes: ['motorway', 'trunk'],
    baseWidth: 4.4,
    color: ROAD_COLORS.motorway,
    casingColor: ROAD_COLORS.motorwayCasing,
  },
  {
    id: 'primary',
    classes: ['primary'],
    baseWidth: 3.4,
    color: ROAD_COLORS.primary,
    casingColor: ROAD_COLORS.primaryCasing,
  },
  {
    id: 'secondary',
    classes: ['secondary'],
    baseWidth: 3.0,
    color: ROAD_COLORS.secondary,
    casingColor: ROAD_COLORS.secondaryCasing,
  },
  {
    id: 'tertiary',
    classes: ['tertiary'],
    baseWidth: 2.5,
    color: ROAD_COLORS.tertiary,
    casingColor: ROAD_COLORS.tertiaryCasing,
  },
  {
    id: 'minor',
    classes: ['minor', 'street'],
    baseWidth: 2.1,
    color: ROAD_COLORS.minor,
    casingColor: ROAD_COLORS.minorCasing,
  },
  {
    id: 'service',
    classes: ['service'],
    baseWidth: 1.6,
    color: ROAD_COLORS.service,
    casingColor: ROAD_COLORS.serviceCasing,
  },
];

// =============================================================================
// ROAD LAYER GENERATION
// =============================================================================

/**
 * Generates casing and fill layers for all road types.
 * Casing is rendered first (wider, darker) then fill on top.
 */
const generateRoadLayers = (): LayerSpec[] => {
  const layers: LayerSpec[] = [];

  for (const rule of ROAD_RULES) {
    const filter = createClassFilter(rule.classes);

    // Casing layer (outline)
    layers.push(
      createLineLayer({
        id: `${rule.id}-casing`,
        sourceLayer: 'transportation',
        color: rule.casingColor,
        width: widthByZoom(rule.baseWidth + 0.6),
        opacity: 0.95,
        filter,
      }),
    );

    // Fill layer (main road surface)
    layers.push(
      createLineLayer({
        id: `${rule.id}-fill`,
        sourceLayer: 'transportation',
        color: rule.color,
        width: widthByZoom(rule.baseWidth),
        opacity: 0.98,
        filter,
      }),
    );
  }

  return layers;
};

// =============================================================================
// SPECIAL TRANSPORTATION LAYERS
// =============================================================================

/**
 * Walking paths, footways, cycleways.
 */
const pathLayer: LineLayerSpec = createLineLayer({
  id: 'transportation-path',
  sourceLayer: 'transportation',
  color: ROAD_COLORS.path,
  width: subtleWidthByZoom(1.2),
  dasharray: [4, 3],
  opacity: 0.8,
  filter: createClassFilter(['path', 'footway', 'cycleway', 'steps', 'pedestrian']),
});

/**
 * Unpaved tracks and trails.
 */
const trackLayer: LineLayerSpec = createLineLayer({
  id: 'transportation-track',
  sourceLayer: 'transportation',
  color: ROAD_COLORS.track,
  width: subtleWidthByZoom(1.4),
  dasharray: [6, 3],
  opacity: 0.8,
  filter: createClassFilter(['track']),
});

/**
 * Bus-only lanes.
 */
const buswayLayer: LineLayerSpec = createLineLayer({
  id: 'transportation-busway',
  sourceLayer: 'transportation',
  color: ROAD_COLORS.busway,
  width: widthByZoom(2.2),
  opacity: 0.9,
  filter: createClassFilter(['busway']),
});

/**
 * Railways and transit lines.
 */
const railwayLayer: LineLayerSpec = createLineLayer({
  id: 'transportation-rail',
  sourceLayer: 'transportation',
  color: TRANSIT_COLORS.railway,
  width: subtleWidthByZoom(1.5),
  opacity: 0.8,
  dasharray: [2, 2],
  filter: createClassFilter(['rail', 'transit']),
});

/**
 * Ferry routes.
 */
const ferryLayer: LineLayerSpec = createLineLayer({
  id: 'transportation-ferry',
  sourceLayer: 'transportation',
  color: TRANSIT_COLORS.ferry,
  width: subtleWidthByZoom(1.4),
  opacity: 0.7,
  dasharray: [6, 4],
  filter: createClassFilter(['ferry']),
});

/**
 * Piers and docks (fill layer).
 */
const pierLayer: FillLayerSpec = createFillLayer({
  id: 'transportation-pier',
  sourceLayer: 'transportation',
  color: TRANSIT_COLORS.pier,
  outlineColor: '#cfcfcf',
  filter: createClassFilter(['pier']),
});

// =============================================================================
// EXPORTS
// =============================================================================

/**
 * All road and transportation layers in rendering order.
 * Order: road casing/fill pairs → paths → rail → ferry → piers
 */
export const roadLayers: LayerSpec[] = [
  ...generateRoadLayers(),
  pathLayer,
  trackLayer,
  buswayLayer,
  railwayLayer,
  ferryLayer,
  pierLayer,
];
