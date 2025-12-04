/**
 * Easing functions for animations.
 *
 * @module maplibre/animations/easing
 */

/**
 * Cubic ease-out function.
 * Starts fast, decelerates towards end.
 *
 * @param t - Progress value (0-1)
 * @returns Eased value (0-1)
 */
export const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;

/**
 * Cubic ease-in function.
 * Starts slow, accelerates towards end.
 *
 * @param t - Progress value (0-1)
 * @returns Eased value (0-1)
 */
export const easeInCubic = (t: number): number => t ** 3;

/**
 * Cubic ease-in-out function.
 * Starts slow, accelerates in middle, decelerates at end.
 *
 * @param t - Progress value (0-1)
 * @returns Eased value (0-1)
 */
export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

/**
 * Linear easing (no easing).
 *
 * @param t - Progress value (0-1)
 * @returns Same value (0-1)
 */
export const linear = (t: number): number => t;
