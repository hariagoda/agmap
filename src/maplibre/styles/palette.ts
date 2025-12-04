/**
 * Color palette for MapLibre map styling.
 *
 * Blended palette inspired by Apple Maps soft neutrals and Google Maps contrast.
 * Organized by feature category for easy maintenance and theming.
 *
 * @module maplibre/styles/palette
 */

// =============================================================================
// LAND & BACKGROUND
// =============================================================================

export const LAND_COLORS = {
  /** Default land background */
  base: '#f6f2ea',
  /** Subtle land tint for loading states */
  tint: '#f1ece3',
} as const;

// =============================================================================
// WATER FEATURES
// =============================================================================

export const WATER_COLORS = {
  /** Primary water fill (lakes, seas) */
  fill: '#a6c8ff',
  /** Inner water areas */
  inner: '#c5ddff',
  /** Water edges and waterways */
  edge: '#5f8ed8',
} as const;

// =============================================================================
// VEGETATION & NATURAL
// =============================================================================

export const VEGETATION_COLORS = {
  /** Parks and recreational areas */
  park: '#d5f0c8',
  /** Forests and wooded areas */
  forest: '#b9ddad',
  /** Grass and general vegetation */
  grass: '#e5f3d6',
  /** Wetlands and marshes */
  wetland: '#e0eee2',
  /** Agricultural land */
  farmland: '#f3e5c3',
  /** Sandy areas and beaches */
  sand: '#f9ebcf',
} as const;

// =============================================================================
// LAND USE - URBAN
// =============================================================================

export const LANDUSE_COLORS = {
  /** Residential areas */
  residential: '#f2f0ea',
  /** Commercial zones */
  commercial: '#f9e5e0',
  /** Industrial zones */
  industrial: '#eee1df',
  /** Government/institutional */
  institutional: '#f2e8fb',
  /** Hospitals and medical facilities */
  hospital: '#ffe3e3',
  /** Schools and educational facilities */
  school: '#fff4da',
  /** Sports stadiums and venues */
  stadium: '#e6f6ee',
  /** Cemeteries */
  cemetery: '#dceadd',
} as const;

// =============================================================================
// BUILDINGS
// =============================================================================

export const BUILDING_COLORS = {
  /** Building fill */
  fill: '#e4e1db',
  /** Building outline */
  outline: '#c7c2ba',
} as const;

// =============================================================================
// ROADS & TRANSPORTATION
// =============================================================================

export const ROAD_COLORS = {
  /** Motorway/highway fill */
  motorway: '#ffd78c',
  /** Motorway/highway casing */
  motorwayCasing: '#e6b259',
  /** Primary road fill */
  primary: '#ffffff',
  /** Primary road casing */
  primaryCasing: '#d6d2cc',
  /** Secondary road fill */
  secondary: '#fcfbf7',
  /** Secondary road casing */
  secondaryCasing: '#dad6cf',
  /** Tertiary road fill */
  tertiary: '#fbfaf5',
  /** Tertiary road casing */
  tertiaryCasing: '#dcd8d1',
  /** Minor road fill */
  minor: '#fbfaf7',
  /** Minor road casing */
  minorCasing: '#e5e2db',
  /** Service road fill */
  service: '#fbfaf5',
  /** Service road casing */
  serviceCasing: '#e8e4dc',
  /** Walking paths */
  path: '#d9c8b1',
  /** Unpaved tracks */
  track: '#cdb38f',
  /** Bus lanes */
  busway: '#f4d0a6',
} as const;

// =============================================================================
// TRANSIT & INFRASTRUCTURE
// =============================================================================

export const TRANSIT_COLORS = {
  /** Railways */
  railway: '#8c8a86',
  /** Ferry routes */
  ferry: '#6aa4d8',
  /** Piers and docks */
  pier: '#e1dfd6',
  /** Airport areas */
  aeroway: '#eceaf3',
} as const;

// =============================================================================
// BOUNDARIES
// =============================================================================

export const BOUNDARY_COLORS = {
  /** Country borders */
  country: '#b5b0a8',
  /** Regional/state borders */
  region: '#d0ccc4',
} as const;

// =============================================================================
// LABELS
// =============================================================================

export const LABEL_COLORS = {
  /** Country label text */
  countryText: '#b99760',
  /** Country label halo */
  countryHalo: '#fff7ec',
  /** Region/state label text */
  regionText: '#b98c4f',
  /** Region/state label halo */
  regionHalo: '#fff7ec',
  /** City label text */
  cityText: '#9b6b3d',
  /** City label halo */
  cityHalo: '#fff4e6',
  /** Major POI text */
  poiMajorText: '#7d5b3c',
  /** Major POI halo */
  poiMajorHalo: '#fff9ef',
  /** General POI text */
  poiGeneralText: '#6a5c51',
  /** General POI halo */
  poiGeneralHalo: '#fffdf7',
  /** Mountain peak text */
  mountainText: '#805f45',
  /** Mountain peak halo */
  mountainHalo: '#fffbf3',
  /** Transport POI text */
  transportText: '#b79a7c',
  /** Transport POI halo */
  transportHalo: '#fffbf4',
} as const;

// =============================================================================
// COMBINED PALETTE EXPORT
// =============================================================================

/**
 * Complete color palette combining all categories.
 * Use this for legacy compatibility or when you need the full palette.
 */
export const PALETTE = {
  land: LAND_COLORS,
  water: WATER_COLORS,
  vegetation: VEGETATION_COLORS,
  landuse: LANDUSE_COLORS,
  building: BUILDING_COLORS,
  road: ROAD_COLORS,
  transit: TRANSIT_COLORS,
  boundary: BOUNDARY_COLORS,
  label: LABEL_COLORS,
} as const;

/** Type for the complete palette */
export type Palette = typeof PALETTE;
