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
 */
export type SpecialStyleHandler = (feature: FeatureLike) => StyleValue;

/**
 * The style function signature expected by OpenLayers VectorTile layer.
 */
export type StyleFunction = (feature: FeatureLike) => StyleValue;
