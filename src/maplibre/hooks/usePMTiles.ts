/**
 * PMTiles protocol hook.
 *
 * Registers the PMTiles protocol with MapLibre GL JS
 * and manages the PMTiles instance lifecycle.
 *
 * @module maplibre/hooks/usePMTiles
 */

import maplibregl from 'maplibre-gl';
import { PMTiles, Protocol } from 'pmtiles';
import { useEffect, useRef } from 'react';
import { THAILAND_PMTILES_URL } from '../../shared/config/constants';

/** Protocol registration status */
let isProtocolRegistered = false;

/**
 * Hook to manage PMTiles protocol registration.
 *
 * Registers the PMTiles protocol once globally and creates
 * a PMTiles instance for the specified URL.
 *
 * @param pmtilesUrl - URL to the PMTiles file
 * @returns PMTiles instance or null if not yet initialized
 *
 * @example
 * ```tsx
 * function MapComponent() {
 *   const pmtiles = usePMTiles();
 *
 *   useEffect(() => {
 *     if (pmtiles) {
 *       // PMTiles ready to use
 *     }
 *   }, [pmtiles]);
 * }
 * ```
 */
export const usePMTiles = (pmtilesUrl: string = THAILAND_PMTILES_URL): PMTiles | null => {
  const pmtilesRef = useRef<PMTiles | null>(null);
  const protocolRef = useRef<Protocol | null>(null);

  useEffect(() => {
    // Register protocol only once globally
    if (!isProtocolRegistered) {
      const protocol = new Protocol();
      maplibregl.addProtocol('pmtiles', protocol.tile);
      protocolRef.current = protocol;
      isProtocolRegistered = true;
    }

    // Create PMTiles instance
    const pmtiles = new PMTiles(pmtilesUrl);
    pmtilesRef.current = pmtiles;

    // Add to protocol if we created it
    if (protocolRef.current) {
      protocolRef.current.add(pmtiles);
    }

    return () => {
      pmtilesRef.current = null;
    };
  }, [pmtilesUrl]);

  return pmtilesRef.current;
};

/**
 * Gets the PMTiles header asynchronously.
 *
 * @param pmtiles - PMTiles instance
 * @returns Promise resolving to PMTiles header
 */
export const getPMTilesHeader = (pmtiles: PMTiles): ReturnType<PMTiles['getHeader']> => {
  return pmtiles.getHeader();
};
