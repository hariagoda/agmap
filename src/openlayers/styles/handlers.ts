/**
 * Special style handlers for features requiring runtime logic.
 *
 * Handlers are used when styling depends on properties beyond
 * just 'layer' and 'class' (e.g., admin_level, resolution-based scaling).
 *
 * @module styles/handlers
 */

import type { FeatureLike } from 'ol/Feature';
import { Stroke, Style } from 'ol/style';
import { getFeatureAdminLevel, getFeatureClass } from '../utils/typeGuards';
import { COLORS } from './colors';
import { adminBoundaryStyle, boundaryStyle, motorwayStyle } from './styleObjects';
import type { SpecialStyleHandler, StyleValue } from './types';

// =============================================================================
// ROAD WIDTH SCALING UTILITIES
// =============================================================================

/**
 * Calculates smooth stroke width based on resolution for consistent visual appearance.
 * Uses logarithmic scaling to prevent highways from becoming too thick when zoomed in.
 * Scales road widths inversely with resolution to prevent glitching during zoom.
 *
 * @param baseWidth - Base stroke width at reference resolution
 * @param resolution - Current map resolution (meters per pixel)
 * @param referenceResolution - Reference resolution for base width (default: 100m/pixel)
 * @param minWidth - Minimum stroke width (default: 1)
 * @param maxWidth - Maximum stroke width (default: 10)
 * @returns Scaled stroke width
 */
function scaleRoadWidth(
  baseWidth: number,
  resolution: number,
  referenceResolution = 100,
  minWidth = 1,
  maxWidth = 10,
): number {
  // Use logarithmic scaling for smoother, less aggressive scaling
  // This prevents highways from becoming too thick when zoomed in
  const ratio = referenceResolution / resolution;

  // Apply logarithmic scaling: log2(ratio + 1) provides smoother transitions
  // This means scaling is more gradual and highways don't get excessively wide
  const logScale = Math.log2(ratio + 1);
  const scaledWidth = baseWidth * (1 + logScale * 0.5); // Reduced multiplier for less aggressive scaling

  // Clamp to reasonable bounds to prevent extreme sizes
  return Math.max(minWidth, Math.min(maxWidth, scaledWidth));
}

/**
 * Creates smooth motorway/highway styles that scale with zoom level.
 * Prevents glitching by dynamically adjusting stroke widths based on resolution.
 * Uses conservative scaling to prevent highways from becoming too thick when zoomed in.
 *
 * @param resolution - Current map resolution (meters per pixel)
 * @returns Array of Style objects for motorway rendering
 */
function createMotorwayStyle(resolution?: number): Style[] {
  // Use default styles if resolution is not available
  if (resolution === undefined) {
    return motorwayStyle;
  }

  // For very deep zoom levels (resolution < 10m/pixel), use fixed widths to prevent excessive scaling
  // This keeps highways looking reasonable even when zoomed in very close
  if (resolution < 10) {
    // At deep zoom, use slightly larger but fixed widths
    return [
      new Style({
        stroke: new Stroke({
          color: COLORS.motorwayOutline,
          width: 8, // Fixed width at deep zoom
        }),
      }),
      new Style({
        stroke: new Stroke({
          color: COLORS.motorway,
          width: 6, // Fixed width at deep zoom
        }),
      }),
    ];
  }

  // Calculate smooth widths based on resolution for normal zoom levels
  // Base widths at 100m/pixel resolution: outline 7px, fill 5px
  // Reduced max widths to prevent highways from becoming too thick
  const outlineWidth = scaleRoadWidth(7, resolution, 100, 2, 8);
  const fillWidth = scaleRoadWidth(5, resolution, 100, 1.5, 6);

  return [
    new Style({
      stroke: new Stroke({
        color: COLORS.motorwayOutline,
        width: outlineWidth,
      }),
    }),
    new Style({
      stroke: new Stroke({
        color: COLORS.motorway,
        width: fillWidth,
      }),
    }),
  ];
}

// =============================================================================
// SPECIAL HANDLERS
// =============================================================================

/**
 * Handler for boundary features.
 * Uses admin_level property to determine boundary style.
 *
 * @param feature - OpenLayers feature
 * @returns Style value for boundary
 */
function handleBoundary(feature: FeatureLike): StyleValue {
  const adminLevel = getFeatureAdminLevel(feature);
  return adminLevel !== undefined && adminLevel <= 4 ? adminBoundaryStyle : boundaryStyle;
}

/**
 * Handler for transportation features.
 * Applies smooth scaling for motorways and trunk roads based on resolution.
 *
 * @param feature - OpenLayers feature
 * @param resolution - Current map resolution (meters per pixel)
 * @returns Style value or null to fallback to standard lookup
 */
function handleTransportation(feature: FeatureLike, resolution?: number): StyleValue | null {
  const featureClass = getFeatureClass(feature);

  // Apply smooth scaling for motorways and trunk roads
  if (featureClass === 'motorway' || featureClass === 'trunk') {
    return createMotorwayStyle(resolution);
  }

  // Return null to signal fallback to standard lookup
  return null;
}

/**
 * Special handlers for layers that need runtime logic beyond simple lookup.
 * Used when styling depends on properties other than 'layer' and 'class'.
 *
 * Map structure: layer name -> handler function
 */
export const SPECIAL_HANDLERS: Map<string, SpecialStyleHandler> = new Map<
  string,
  SpecialStyleHandler
>([
  ['boundary', handleBoundary],
  ['transportation', handleTransportation],
]);
