/**
 * Type definitions for the map styling system.
 *
 * @module styles/types
 */

import type { FeatureLike } from 'ol/Feature';
import type { Style } from 'ol/style';

/**
 * A style value can be a single Style or an array of Styles (for road casing).
 * Arrays are used when features need multiple style layers (e.g., road outline + fill).
 */
export type StyleValue = Style | Style[];

/**
 * Function signature for special style handlers that need runtime logic.
 * Used for features where styling depends on properties beyond just 'layer' and 'class'.
 * Resolution parameter is available for zoom-level-based filtering.
 * Returns null to signal fallback to standard lookup.
 */
export type SpecialStyleHandler = (feature: FeatureLike, resolution?: number) => StyleValue | null;

/**
 * The style function signature expected by OpenLayers VectorTile layer.
 * Resolution parameter is available for zoom-level-based filtering.
 */
export type StyleFunction = (feature: FeatureLike, resolution?: number) => StyleValue;
