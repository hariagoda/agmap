/**
 * Type guard utilities for OpenLayers features.
 *
 * Provides runtime type checking and validation for feature properties
 * to replace unsafe type assertions.
 *
 * @module utils/typeGuards
 */

import type { FeatureLike } from 'ol/Feature';

/**
 * Check if a value is a string.
 *
 * @param value - Value to check
 * @returns True if value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Check if a value is a number.
 *
 * @param value - Value to check
 * @returns True if value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

/**
 * Check if a value is a valid coordinate tuple [number, number].
 *
 * @param value - Value to check
 * @returns True if value is a valid coordinate tuple
 */
export function isCoordinate(value: unknown): value is [number, number] {
  return Array.isArray(value) && value.length === 2 && isNumber(value[0]) && isNumber(value[1]);
}

/**
 * Safely get a string property from a feature.
 *
 * @param feature - OpenLayers feature
 * @param propertyName - Property name
 * @returns String value or undefined
 */
export function getFeatureString(feature: FeatureLike, propertyName: string): string | undefined {
  const value = feature.get(propertyName);
  return isString(value) ? value : undefined;
}

/**
 * Safely get a number property from a feature.
 *
 * @param feature - OpenLayers feature
 * @param propertyName - Property name
 * @returns Number value or undefined
 */
export function getFeatureNumber(feature: FeatureLike, propertyName: string): number | undefined {
  const value = feature.get(propertyName);
  return isNumber(value) ? value : undefined;
}

/**
 * Get layer name from feature with type safety.
 *
 * @param feature - OpenLayers feature
 * @returns Layer name or undefined
 */
export function getFeatureLayer(feature: FeatureLike): string | undefined {
  return getFeatureString(feature, 'layer');
}

/**
 * Get feature class from feature with type safety.
 *
 * @param feature - OpenLayers feature
 * @returns Feature class or undefined
 */
export function getFeatureClass(feature: FeatureLike): string | undefined {
  return getFeatureString(feature, 'class');
}

/**
 * Get admin level from feature with type safety.
 *
 * @param feature - OpenLayers feature
 * @returns Admin level or undefined
 */
export function getFeatureAdminLevel(feature: FeatureLike): number | undefined {
  return getFeatureNumber(feature, 'admin_level');
}
