/**
 * Map animations hook.
 *
 * Manages map animations including fly-to and building fade-in.
 *
 * @module maplibre/hooks/useMapAnimations
 */

import type maplibregl from 'maplibre-gl';
import { useEffect, useRef } from 'react';
import { startBuildingAnimation } from '../animations/buildingFade';
import { flyToBangkok } from '../animations/flyTo';
import { LABEL_DEBUG_LAYERS } from '../config/constants';

/** Options for the useMapAnimations hook */
export interface UseMapAnimationsOptions {
  /** Enable fly-to Bangkok animation on load */
  enableFlyTo?: boolean;
  /** Enable building fade-in animation */
  enableBuildingAnimation?: boolean;
  /** Enable debug mode for label inspection */
  debug?: boolean;
}

/**
 * Hook to manage map animations and debug utilities.
 *
 * @param map - MapLibre map instance (null until ready)
 * @param isReady - Whether the map is loaded and ready
 * @param options - Animation options
 *
 * @example
 * ```tsx
 * function MapComponent() {
 *   const { map, isReady } = useMapInstance({ containerRef });
 *
 *   useMapAnimations(map, isReady, {
 *     enableFlyTo: true,
 *     enableBuildingAnimation: true,
 *     debug: import.meta.env.DEV,
 *   });
 * }
 * ```
 */
export const useMapAnimations = (
  map: maplibregl.Map | null,
  isReady: boolean,
  options: UseMapAnimationsOptions = {},
): void => {
  const { enableFlyTo = true, enableBuildingAnimation = true, debug = false } = options;

  const cleanupRef = useRef<(() => void) | null>(null);

  // Building animation effect
  useEffect(() => {
    if (!(map && isReady && enableBuildingAnimation)) {
      return;
    }

    cleanupRef.current = startBuildingAnimation(map);

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [map, isReady, enableBuildingAnimation]);

  // Fly-to animation effect
  useEffect(() => {
    if (!(map && isReady && enableFlyTo)) {
      return;
    }

    flyToBangkok(map);
  }, [map, isReady, enableFlyTo]);

  // Debug mode effect
  useEffect(() => {
    if (!(map && isReady && debug)) {
      return;
    }

    // Skip in production
    if (import.meta.env?.MODE === 'production') {
      return;
    }

    const cleanupFns: (() => void)[] = [];

    for (const layerId of LABEL_DEBUG_LAYERS) {
      if (!map.getLayer(layerId)) {
        continue;
      }

      const handleMouseEnter = (): void => {
        map.getCanvas().style.cursor = 'pointer';
      };

      const handleMouseLeave = (): void => {
        map.getCanvas().style.cursor = '';
      };

      const handleClick = (event: maplibregl.MapLayerMouseEvent): void => {
        const features = event.features ?? [];
        if (features.length === 0) {
          return;
        }

        // biome-ignore lint/suspicious/noConsole: Debug logging is intentional
        console.group(`[LabelDebug] ${layerId}`);
        for (const feature of features) {
          const layerInfo = feature.layer as Record<string, unknown>;
          // biome-ignore lint/suspicious/noConsole: Debug logging is intentional
          console.table({
            name: feature.properties?.name,
            class: feature.properties?.class,
            subclass: feature.properties?.subclass,
            layer: feature.layer?.id,
            sourceLayer: (layerInfo?.['source-layer'] as string | undefined) ?? 'n/a',
            rank: feature.properties?.rank,
          });
        }
        // biome-ignore lint/suspicious/noConsole: Debug logging is intentional
        console.groupEnd();
      };

      map.on('mouseenter', layerId, handleMouseEnter);
      map.on('mouseleave', layerId, handleMouseLeave);
      map.on('click', layerId, handleClick);

      cleanupFns.push(() => {
        map.off('mouseenter', layerId, handleMouseEnter);
        map.off('mouseleave', layerId, handleMouseLeave);
        map.off('click', layerId, handleClick);
      });
    }

    return () => {
      for (const cleanup of cleanupFns) {
        cleanup();
      }
    };
  }, [map, isReady, debug]);
};
