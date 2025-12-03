import { useEffect, useRef, useState, type ReactElement } from 'react';
import { Map, View } from 'ol';
import { useGeographic } from 'ol/proj';
import { PMTilesLayer } from './PMTilesLayer';
import 'ol/ol.css';

/** Default center coordinates [longitude, latitude] */
const DEFAULT_CENTER: [number, number] = [172.606201, -43.55651];

/** Default zoom level */
const DEFAULT_ZOOM = 7;

/** Default PMTiles URL */
const DEFAULT_PMTILES_URL =
  'https://r2-public.protomaps.com/protomaps-sample-datasets/nz-buildings-v3.pmtiles';

/** Default attribution */
const DEFAULT_ATTRIBUTION = '© Land Information New Zealand';

/**
 * OpenLayers Map Component
 *
 * Displays an interactive map using PMTiles vector tiles.
 * Uses the ol library directly with React hooks for lifecycle management.
 */
export function OpenLayersMap(): ReactElement {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    // Enable geographic coordinates (lon/lat) instead of EPSG:3857
    useGeographic();

    // Only initialize if container exists and map hasn't been created
    if (!mapContainerRef.current) {
      return;
    }

    // Create the OpenLayers map instance (without layers - those are added by child components)
    const mapInstance = new Map({
      target: mapContainerRef.current,
      layers: [],
      view: new View({
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      }),
    });

    setMap(mapInstance);

    // Cleanup on unmount
    return () => {
      mapInstance.setTarget(undefined);
      setMap(null);
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    >
      {/* PMTiles layer as a subcomponent */}
      <PMTilesLayer
        map={map}
        url={DEFAULT_PMTILES_URL}
        attribution={DEFAULT_ATTRIBUTION}
      />
    </div>
  );
}
