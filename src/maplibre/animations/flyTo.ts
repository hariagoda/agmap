/**
 * Fly-to animation for smooth map navigation.
 *
 * @module maplibre/animations/flyTo
 */

import type maplibregl from 'maplibre-gl';
import { BANGKOK_CENTER } from '../../shared/config/constants';
import type { LngLat } from '../../shared/config/types';
import { BANGKOK_FLY_DURATION_MS, BANGKOK_FLY_TARGET_ZOOM } from '../config/constants';
import { easeOutCubic } from './easing';

/** Options for fly-to animation */
export interface FlyToOptions {
  /** Target center coordinates [lng, lat] */
  center: LngLat;
  /** Target zoom level */
  zoom: number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation curve factor (higher = more dramatic) */
  curve?: number;
  /** Animation speed factor */
  speed?: number;
}

/**
 * Performs a fly-to animation to the specified location.
 *
 * @param map - MapLibre map instance
 * @param options - Fly-to options
 *
 * @example
 * ```ts
 * flyTo(map, {
 *   center: [100.5, 13.75],
 *   zoom: 14,
 *   duration: 5000,
 * });
 * ```
 */
export const flyTo = (map: maplibregl.Map, options: FlyToOptions): void => {
  const { center, zoom, duration = 3000, curve = 1.5, speed = 0.5 } = options;

  map.flyTo({
    center,
    zoom,
    duration,
    curve,
    speed,
    easing: easeOutCubic,
    essential: true,
  });
};

/**
 * Performs the default Bangkok fly-to animation.
 * Used as the intro animation when the map loads.
 *
 * @param map - MapLibre map instance
 *
 * @example
 * ```ts
 * map.on('load', () => {
 *   flyToBangkok(map);
 * });
 * ```
 */
export const flyToBangkok = (map: maplibregl.Map): void => {
  flyTo(map, {
    center: BANGKOK_CENTER,
    zoom: BANGKOK_FLY_TARGET_ZOOM,
    duration: BANGKOK_FLY_DURATION_MS,
    curve: 1.5,
    speed: 0.2,
  });
};
