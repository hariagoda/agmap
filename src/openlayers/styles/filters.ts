/**
 * Zoom-level filtering utilities for map features.
 *
 * Provides configurable filtering logic to hide features at certain
 * zoom levels for performance optimization.
 *
 * @module styles/filters
 */

import type { FeatureLike } from 'ol/Feature';
import { getFeatureClass, getFeatureLayer } from '../utils/typeGuards';

/**
 * Filter configuration thresholds (in meters per pixel).
 * Higher resolution = more zoomed out, lower resolution = more zoomed in.
 */
export interface FilterThresholds {
  /** Hide buildings above this resolution (zoom < 12, resolution > ~40m) */
  buildingMaxResolution: number;
  /** Hide minor roads above this resolution (zoom < 10, resolution > ~150m) */
  minorRoadsMaxResolution: number;
  /** Hide small waterways above this resolution (zoom < 9, resolution > ~300m) */
  smallWaterwaysMaxResolution: number;
  /** Hide minor landuse above this resolution (zoom < 8, resolution > ~600m) */
  minorLanduseMaxResolution: number;
}

/**
 * Default filter thresholds.
 */
export const DEFAULT_FILTER_THRESHOLDS: FilterThresholds = {
  buildingMaxResolution: 40,
  minorRoadsMaxResolution: 150,
  smallWaterwaysMaxResolution: 300,
  minorLanduseMaxResolution: 600,
};

/**
 * Check if a building should be hidden based on resolution.
 *
 * Buildings are only shown at zoom level 12+ (resolution < ~40m per pixel).
 *
 * @param resolution - Current map resolution (meters per pixel)
 * @param thresholds - Filter thresholds (optional, uses defaults if not provided)
 * @returns True if building should be hidden
 */
export function shouldHideBuilding(
  resolution: number | undefined,
  thresholds: FilterThresholds = DEFAULT_FILTER_THRESHOLDS,
): boolean {
  if (resolution === undefined) {
    return false;
  }
  return resolution > thresholds.buildingMaxResolution;
}

/**
 * Check if minor roads should be hidden based on resolution.
 *
 * Minor roads and service roads are hidden at very low zoom levels
 * (zoom < 10, resolution > ~150m) to show only major roads for better performance.
 *
 * @param layer - Feature layer name
 * @param featureClass - Feature class name
 * @param resolution - Current map resolution (meters per pixel)
 * @param thresholds - Filter thresholds (optional, uses defaults if not provided)
 * @returns True if minor roads should be hidden
 */
export function shouldHideMinorRoads(
  layer: string,
  featureClass: string | undefined,
  resolution: number | undefined,
  thresholds: FilterThresholds = DEFAULT_FILTER_THRESHOLDS,
): boolean {
  if (resolution === undefined) {
    return false;
  }
  if (layer !== 'transportation') {
    return false;
  }
  if (resolution <= thresholds.minorRoadsMaxResolution) {
    return false;
  }
  return (
    featureClass === 'minor' ||
    featureClass === 'service' ||
    featureClass === 'street' ||
    !featureClass
  );
}

/**
 * Check if small waterways should be hidden based on resolution.
 *
 * Small waterways (ditches, drains) are hidden at low zoom levels
 * (zoom < 9, resolution > ~300m).
 *
 * @param layer - Feature layer name
 * @param featureClass - Feature class name
 * @param resolution - Current map resolution (meters per pixel)
 * @param thresholds - Filter thresholds (optional, uses defaults if not provided)
 * @returns True if small waterways should be hidden
 */
export function shouldHideSmallWaterways(
  layer: string,
  featureClass: string | undefined,
  resolution: number | undefined,
  thresholds: FilterThresholds = DEFAULT_FILTER_THRESHOLDS,
): boolean {
  if (resolution === undefined) {
    return false;
  }
  if (layer !== 'waterway') {
    return false;
  }
  if (resolution <= thresholds.smallWaterwaysMaxResolution) {
    return false;
  }
  return featureClass === 'ditch' || featureClass === 'drain';
}

/**
 * Check if minor landuse features should be hidden based on resolution.
 *
 * Minor landuse features are hidden at low zoom levels (zoom < 8, resolution > ~600m).
 * Only major landuse types (residential, commercial, industrial, retail) remain visible.
 *
 * @param layer - Feature layer name
 * @param featureClass - Feature class name
 * @param resolution - Current map resolution (meters per pixel)
 * @param thresholds - Filter thresholds (optional, uses defaults if not provided)
 * @returns True if minor landuse should be hidden
 */
export function shouldHideMinorLanduse(
  layer: string,
  featureClass: string | undefined,
  resolution: number | undefined,
  thresholds: FilterThresholds = DEFAULT_FILTER_THRESHOLDS,
): boolean {
  if (resolution === undefined) {
    return false;
  }
  if (layer !== 'landuse') {
    return false;
  }
  if (resolution <= thresholds.minorLanduseMaxResolution) {
    return false;
  }
  if (!featureClass) {
    return false;
  }
  // Keep only major landuse types visible at low zoom
  const majorLanduseTypes = ['residential', 'commercial', 'industrial', 'retail'];
  return !majorLanduseTypes.includes(featureClass);
}

/**
 * Apply all zoom-level filters to determine if a feature should be hidden.
 *
 * @param feature - OpenLayers feature
 * @param resolution - Current map resolution (meters per pixel)
 * @param thresholds - Filter thresholds (optional, uses defaults if not provided)
 * @returns True if feature should be hidden based on zoom level
 */
export function shouldHideFeatureByZoom(
  feature: FeatureLike,
  resolution: number | undefined,
  thresholds: FilterThresholds = DEFAULT_FILTER_THRESHOLDS,
): boolean {
  const layer = getFeatureLayer(feature);
  const featureClass = getFeatureClass(feature);

  if (!layer) {
    return false;
  }

  // Check building filter
  if (layer === 'building' && shouldHideBuilding(resolution, thresholds)) {
    return true;
  }

  // Check minor roads filter
  if (shouldHideMinorRoads(layer, featureClass, resolution, thresholds)) {
    return true;
  }

  // Check small waterways filter
  if (shouldHideSmallWaterways(layer, featureClass, resolution, thresholds)) {
    return true;
  }

  // Check minor landuse filter
  if (shouldHideMinorLanduse(layer, featureClass, resolution, thresholds)) {
    return true;
  }

  return false;
}
