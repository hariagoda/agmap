/**
 * Shared type definitions for map implementations.
 *
 * @module shared/config/types
 */

/** Geographic coordinates as [longitude, latitude] */
export type LngLat = [number, number];

/** Map view configuration */
export interface MapViewConfig {
  /** Center coordinates [longitude, latitude] */
  center: LngLat;
  /** Zoom level */
  zoom: number;
}

/** Animation configuration for fly-to operations */
export interface FlyToConfig {
  /** Target center coordinates */
  center: LngLat;
  /** Target zoom level */
  zoom: number;
  /** Animation duration in milliseconds */
  duration: number;
}

/** Common map event callbacks */
export interface MapEventCallbacks {
  /** Called when map is fully loaded and ready */
  onLoad?: () => void;
  /** Called when a map error occurs */
  onError?: (error: Error) => void;
}
