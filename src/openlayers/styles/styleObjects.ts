/**
 * Pre-created OpenLayers Style objects.
 *
 * All styles are created once at module load time and reused for every feature.
 * This avoids creating new Style instances during rendering, which is a
 * significant performance optimization.
 *
 * @module styles/styleObjects
 */

import { Circle, Fill, Stroke, Style } from 'ol/style';
import { COLORS } from './colors';

// =============================================================================
// WATER STYLES
// =============================================================================

/** Style for water bodies (lakes, seas, oceans) */
export const waterStyle: Style = new Style({
  fill: new Fill({ color: COLORS.water }),
});

/** Style for waterways (rivers, canals) */
export const waterwayStyle: Style = new Style({
  stroke: new Stroke({ color: COLORS.waterDark, width: 1.5 }),
});

/** Style for small waterways (ditches, drains) */
export const waterwaySmallStyle: Style = new Style({
  stroke: new Stroke({ color: COLORS.waterDark, width: 0.8 }),
});

/** Style for swimming pools */
export const poolStyle: Style = new Style({
  fill: new Fill({ color: COLORS.waterPool }),
});

// =============================================================================
// GREEN SPACE STYLES
// =============================================================================

/** Style for parks and recreational areas */
export const parkStyle: Style = new Style({
  fill: new Fill({ color: COLORS.park }),
});

/** Style for forests and wooded areas */
export const forestStyle: Style = new Style({
  fill: new Fill({ color: COLORS.forest }),
});

/** Style for grass and general vegetation */
export const grassStyle: Style = new Style({
  fill: new Fill({ color: COLORS.grass }),
});

/** Style for wetlands and marshes */
export const wetlandStyle: Style = new Style({
  fill: new Fill({ color: COLORS.wetland }),
});

/** Style for agricultural land */
export const farmlandStyle: Style = new Style({
  fill: new Fill({ color: COLORS.farmland }),
});

// =============================================================================
// LANDUSE STYLES
// =============================================================================

/** Style for residential areas */
export const residentialStyle: Style = new Style({
  fill: new Fill({ color: COLORS.residential }),
});

/** Style for industrial zones */
export const industrialStyle: Style = new Style({
  fill: new Fill({ color: COLORS.industrial }),
});

/** Style for commercial areas */
export const commercialStyle: Style = new Style({
  fill: new Fill({ color: COLORS.commercial }),
});

/** Style for retail areas */
export const retailStyle: Style = new Style({
  fill: new Fill({ color: COLORS.retail }),
});

/** Style for institutional areas (government, etc.) */
export const institutionalStyle: Style = new Style({
  fill: new Fill({ color: COLORS.institutional }),
});

/** Style for military zones */
export const militaryStyle: Style = new Style({
  fill: new Fill({ color: COLORS.military }),
  stroke: new Stroke({ color: '#d0b0b0', width: 1, lineDash: [4, 4] }),
});

/** Style for hospitals and medical facilities */
export const hospitalStyle: Style = new Style({
  fill: new Fill({ color: COLORS.hospital }),
});

/** Style for schools and educational facilities */
export const schoolStyle: Style = new Style({
  fill: new Fill({ color: COLORS.school }),
});

/** Style for sports stadiums and playing fields */
export const stadiumStyle: Style = new Style({
  fill: new Fill({ color: COLORS.stadium }),
});

/** Style for cemeteries */
export const cemeteryStyle: Style = new Style({
  fill: new Fill({ color: COLORS.cemetery }),
});

// =============================================================================
// BUILDING STYLE
// =============================================================================

/** Style for buildings */
export const buildingStyle: Style = new Style({
  fill: new Fill({ color: COLORS.building }),
  stroke: new Stroke({ color: COLORS.buildingOutline, width: 0.5 }),
});

// =============================================================================
// ROAD STYLES (with casing for visibility)
// =============================================================================

/** Style for motorways/highways (outline + fill) */
export const motorwayStyle: Style[] = [
  new Style({ stroke: new Stroke({ color: COLORS.motorwayOutline, width: 7 }) }),
  new Style({ stroke: new Stroke({ color: COLORS.motorway, width: 5 }) }),
];

/** Style for primary roads (outline + fill) */
export const primaryStyle: Style[] = [
  new Style({ stroke: new Stroke({ color: COLORS.primaryOutline, width: 6 }) }),
  new Style({ stroke: new Stroke({ color: COLORS.primary, width: 4 }) }),
];

/** Style for secondary roads (outline + fill) */
export const secondaryStyle: Style[] = [
  new Style({ stroke: new Stroke({ color: COLORS.secondaryOutline, width: 5 }) }),
  new Style({ stroke: new Stroke({ color: COLORS.secondary, width: 3.5 }) }),
];

/** Style for tertiary roads (outline + fill) */
export const tertiaryStyle: Style[] = [
  new Style({ stroke: new Stroke({ color: COLORS.tertiaryOutline, width: 4 }) }),
  new Style({ stroke: new Stroke({ color: COLORS.tertiary, width: 2.5 }) }),
];

/** Style for minor roads (outline + fill) */
export const minorRoadStyle: Style[] = [
  new Style({ stroke: new Stroke({ color: COLORS.minorOutline, width: 3 }) }),
  new Style({ stroke: new Stroke({ color: COLORS.minor, width: 2 }) }),
];

/** Style for service roads (outline + fill) */
export const serviceRoadStyle: Style[] = [
  new Style({ stroke: new Stroke({ color: COLORS.minorOutline, width: 2 }) }),
  new Style({ stroke: new Stroke({ color: COLORS.minor, width: 1.5 }) }),
];

/** Style for walking paths */
export const pathStyle: Style = new Style({
  stroke: new Stroke({ color: COLORS.path, width: 1.5, lineDash: [4, 4] }),
});

/** Style for unpaved tracks */
export const trackStyle: Style = new Style({
  stroke: new Stroke({ color: COLORS.track, width: 2, lineDash: [6, 3] }),
});

/** Style for roads under construction */
export const constructionStyle: Style = new Style({
  stroke: new Stroke({ color: COLORS.construction, width: 3, lineDash: [8, 8] }),
});

/** Style for bus lanes (outline + fill) */
export const buswayStyle: Style[] = [
  new Style({ stroke: new Stroke({ color: '#d4a574', width: 4 }) }),
  new Style({ stroke: new Stroke({ color: COLORS.busway, width: 2.5 }) }),
];

/** Style for raceways */
export const racewayStyle: Style = new Style({
  stroke: new Stroke({ color: '#c0c0c0', width: 3 }),
});

// =============================================================================
// RAILWAY & OTHER TRANSPORT
// =============================================================================

/** Style for railways */
export const railwayStyle: Style = new Style({
  stroke: new Stroke({ color: COLORS.railway, width: 2, lineDash: [8, 4] }),
});

/** Style for ferry routes */
export const ferryStyle: Style = new Style({
  stroke: new Stroke({ color: COLORS.ferry, width: 1.5, lineDash: [10, 10] }),
});

/** Style for piers and docks */
export const pierStyle: Style = new Style({
  fill: new Fill({ color: COLORS.pier }),
  stroke: new Stroke({ color: '#c0c0c0', width: 1 }),
});

/** Style for bridges */
export const bridgeStyle: Style = new Style({
  stroke: new Stroke({ color: '#a0a0a0', width: 4 }),
});

// =============================================================================
// BOUNDARY STYLES
// =============================================================================

/** Style for standard boundaries */
export const boundaryStyle: Style = new Style({
  stroke: new Stroke({ color: COLORS.boundary, width: 1, lineDash: [6, 3] }),
});

/** Style for administrative boundaries (countries, states) */
export const adminBoundaryStyle: Style = new Style({
  stroke: new Stroke({ color: COLORS.boundaryAdmin, width: 2, lineDash: [10, 5] }),
});

// =============================================================================
// AEROWAY STYLE
// =============================================================================

/** Style for airports and aerodromes */
export const aerowayStyle: Style = new Style({
  fill: new Fill({ color: COLORS.aeroway }),
  stroke: new Stroke({ color: '#c0c0c8', width: 1 }),
});

// =============================================================================
// POI STYLES
// =============================================================================

/** Style for mountain peaks */
export const mountainPeakStyle: Style = new Style({
  image: new Circle({
    radius: 4,
    fill: new Fill({ color: '#8b7355' }),
    stroke: new Stroke({ color: '#ffffff', width: 1.5 }),
  }),
});

/** Style for points of interest */
export const poiStyle: Style = new Style({
  image: new Circle({
    radius: 3,
    fill: new Fill({ color: '#666666' }),
    stroke: new Stroke({ color: '#ffffff', width: 1 }),
  }),
});

// =============================================================================
// FALLBACK & UTILITY STYLES
// =============================================================================

/** Default fallback style for unknown features */
export const defaultStyle: Style = new Style({
  fill: new Fill({ color: 'rgba(220, 220, 220, 0.3)' }),
  stroke: new Stroke({ color: '#b0b0b0', width: 0.5 }),
});

/** Empty style for hidden features */
export const emptyStyle: Style = new Style({});
