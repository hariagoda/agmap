/**
 * Building layer fade-in animation.
 *
 * Smoothly fades in building footprints after map load
 * for a polished visual effect.
 *
 * @module maplibre/animations/buildingFade
 */

import type maplibregl from 'maplibre-gl';
import {
  BUILDING_ANIMATION_DURATION_MS,
  BUILDING_LAYER_ID,
  BUILDING_TARGET_OPACITY,
} from '../config/constants';
import { easeOutCubic } from './easing';

/** Animation frame handle for cleanup */
type AnimationHandle = number | null;

/**
 * Clamps a value to a valid opacity range [0, 1].
 * Handles floating-point precision issues.
 *
 * @param value - Value to clamp
 * @returns Clamped value between 0 and 1
 */
const clampOpacity = (value: number): number => {
  // Handle potential floating-point precision issues
  if (value < 0 || Number.isNaN(value)) return 0;
  if (value > 1) return 1;
  return value;
};

/**
 * Starts the building layer fade-in animation.
 *
 * @param map - MapLibre map instance
 * @param onComplete - Optional callback when animation completes
 * @returns Cleanup function to cancel the animation
 *
 * @example
 * ```ts
 * const cleanup = startBuildingAnimation(map);
 *
 * // Later, to cancel:
 * cleanup();
 * ```
 */
export const startBuildingAnimation = (
  map: maplibregl.Map,
  onComplete?: () => void,
): (() => void) => {
  // Verify layer exists
  if (!map.getLayer(BUILDING_LAYER_ID)) {
    // No-op cleanup when layer doesn't exist
    return () => undefined;
  }

  let animationFrame: AnimationHandle = null;
  let isCancelled = false;

  // Initialize opacity to 0 with no transition
  try {
    map.setPaintProperty(BUILDING_LAYER_ID, 'fill-opacity', 0);
    map.setPaintProperty(BUILDING_LAYER_ID, 'fill-opacity-transition', {
      duration: 0,
      delay: 0,
    });

    // Enable smooth color transitions
    map.setPaintProperty(BUILDING_LAYER_ID, 'fill-color-transition', {
      duration: 350,
      delay: 0,
    });
    map.setPaintProperty(BUILDING_LAYER_ID, 'fill-outline-color-transition', {
      duration: 350,
      delay: 0,
    });
  } catch {
    // Layer might not be ready yet, return no-op cleanup
    return () => undefined;
  }

  let startTime: number | null = null;

  /**
   * Animation step function.
   * Updates opacity based on elapsed time with easing.
   */
  const step = (currentTime: number): void => {
    if (isCancelled) return;

    // Initialize start time on first frame
    if (startTime === null) {
      startTime = currentTime;
    }

    const elapsed = currentTime - startTime;
    const progress = Math.min(Math.max(elapsed / BUILDING_ANIMATION_DURATION_MS, 0), 1);
    const easedProgress = easeOutCubic(progress);

    // Clamp opacity to valid range [0, 1] to prevent MapLibre errors
    const opacity = clampOpacity(easedProgress * BUILDING_TARGET_OPACITY);

    // Update opacity if layer still exists
    try {
      if (map.getLayer(BUILDING_LAYER_ID)) {
        map.setPaintProperty(BUILDING_LAYER_ID, 'fill-opacity', opacity);
      }
    } catch {
      // Layer was removed or map is being destroyed
      isCancelled = true;
      return;
    }

    if (progress < 1 && !isCancelled) {
      animationFrame = requestAnimationFrame(step);
    } else {
      animationFrame = null;
      onComplete?.();
    }
  };

  // Start animation
  animationFrame = requestAnimationFrame(step);

  // Return cleanup function
  return () => {
    isCancelled = true;
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  };
};
