/**
 * Google Maps-inspired color palette for vector tile styling.
 *
 * Colors are organized by category and designed to create a familiar,
 * clean map aesthetic similar to Google Maps.
 *
 * @module styles/colors
 */

export const COLORS = {
  // ---------------------------------------------------------------------------
  // Background
  // ---------------------------------------------------------------------------
  /** Default land background color */
  land: '#f5f5f5',

  // ---------------------------------------------------------------------------
  // Water Features
  // ---------------------------------------------------------------------------
  /** Primary water color (lakes, seas) */
  water: '#aadaff',
  /** Darker water for waterways and accents */
  waterDark: '#7eb8da',
  /** Swimming pools and small water features */
  waterPool: '#9fd5d1',

  // ---------------------------------------------------------------------------
  // Green Spaces
  // ---------------------------------------------------------------------------
  /** Parks and recreational areas */
  park: '#c8facc',
  /** Forests and wooded areas */
  forest: '#c8e6c0',
  /** Grass and general vegetation */
  grass: '#d4edda',
  /** Wetlands and marshes */
  wetland: '#d4e8d4',
  /** Agricultural land */
  farmland: '#eef3d8',

  // ---------------------------------------------------------------------------
  // Roads
  // ---------------------------------------------------------------------------
  /** Motorway/highway fill */
  motorway: '#ffd54f',
  /** Motorway/highway outline */
  motorwayOutline: '#e6ac00',
  /** Primary road fill */
  primary: '#ffffff',
  /** Primary road outline */
  primaryOutline: '#c0c0c0',
  /** Secondary road fill */
  secondary: '#ffffff',
  /** Secondary road outline */
  secondaryOutline: '#d0d0d0',
  /** Tertiary road fill */
  tertiary: '#ffffff',
  /** Tertiary road outline */
  tertiaryOutline: '#e0e0e0',
  /** Minor road fill */
  minor: '#ffffff',
  /** Minor road outline */
  minorOutline: '#e8e8e8',
  /** Walking paths */
  path: '#f0e6d2',
  /** Unpaved tracks */
  track: '#e8dcc8',
  /** Roads under construction */
  construction: '#f5f5dc',

  // ---------------------------------------------------------------------------
  // Buildings
  // ---------------------------------------------------------------------------
  /** Building fill color */
  building: '#e0e0e0',
  /** Building outline color */
  buildingOutline: '#c0c0c0',

  // ---------------------------------------------------------------------------
  // Boundaries
  // ---------------------------------------------------------------------------
  /** Standard boundary color */
  boundary: '#9e9e9e',
  /** Administrative boundary (countries, states) */
  boundaryAdmin: '#b0b0b0',

  // ---------------------------------------------------------------------------
  // Land Use - Special Areas
  // ---------------------------------------------------------------------------
  /** Industrial zones */
  industrial: '#ebdbe8',
  /** Commercial areas */
  commercial: '#f5e6e8',
  /** Retail areas */
  retail: '#fce4ec',
  /** Residential areas */
  residential: '#f0f0f0',
  /** Government/institutional */
  institutional: '#f3e5f5',
  /** Military zones */
  military: '#f5e0dc',
  /** Hospitals and medical */
  hospital: '#ffe0e0',
  /** Schools and education */
  school: '#fff8e1',
  /** Sports stadiums */
  stadium: '#e8f5e9',
  /** Cemeteries */
  cemetery: '#d5e8d4',
  /** Airports and aerodromes */
  aeroway: '#e8e8f0',

  // ---------------------------------------------------------------------------
  // Transport Infrastructure
  // ---------------------------------------------------------------------------
  /** Railways */
  railway: '#888888',
  /** Ferry routes */
  ferry: '#7eb8da',
  /** Piers and docks */
  pier: '#e0e0e0',
  /** Bus lanes */
  busway: '#f5deb3',
} as const;

/** Type for color keys */
export type ColorKey = keyof typeof COLORS;
