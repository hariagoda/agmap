import { useEffect } from 'react';
import type { Map } from 'ol';
import VectorTile from 'ol/layer/VectorTile';
import { PMTilesVectorSource } from 'ol-pmtiles';
import { Style, Stroke, Fill } from 'ol/style';

/** Default PMTiles URL for the vector layer */
const DEFAULT_PMTILES_URL =
  'https://r2-public.protomaps.com/protomaps-sample-datasets/nz-buildings-v3.pmtiles';

interface PMTilesLayerProps {
  /** Reference to the OpenLayers Map instance */
  map: Map | null;
  /** URL to the PMTiles file */
  url?: string;
  /** Attribution text for the data source */
  attribution?: string;
  /** Stroke color for vector features */
  strokeColor?: string;
  /** Stroke width for vector features */
  strokeWidth?: number;
  /** Fill color for vector features (supports rgba) */
  fillColor?: string;
  /** Whether to declutter overlapping features */
  declutter?: boolean;
}

/**
 * PMTiles Layer Component
 *
 * Adds a PMTiles vector tile layer to an OpenLayers map.
 * Handles layer creation and cleanup automatically.
 */
export function PMTilesLayer({
  map,
  url = DEFAULT_PMTILES_URL,
  attribution = '© Land Information New Zealand',
  strokeColor = 'gray',
  strokeWidth = 1,
  fillColor = 'rgba(20,20,20,0.9)',
  declutter = true,
}: PMTilesLayerProps): null {
  useEffect(() => {
    if (!map) {
      return;
    }

    // Create the vector tile layer with PMTiles source
    const vectorLayer = new VectorTile({
      declutter,
      source: new PMTilesVectorSource({
        url,
        attributions: [attribution],
      }),
      style: new Style({
        stroke: new Stroke({
          color: strokeColor,
          width: strokeWidth,
        }),
        fill: new Fill({
          color: fillColor,
        }),
      }),
    });

    // Add layer to map
    map.addLayer(vectorLayer);

    // Cleanup: remove layer on unmount or when dependencies change
    return () => {
      map.removeLayer(vectorLayer);
    };
  }, [map, url, attribution, strokeColor, strokeWidth, fillColor, declutter]);

  // This component doesn't render anything - it just manages the layer
  return null;
}

