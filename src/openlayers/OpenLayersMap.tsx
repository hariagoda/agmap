import { Map as OLMap, View } from 'ol';
import { useGeographic as enableGeographicProjection } from 'ol/proj';
import { type ReactElement, useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { PMTilesLayer } from './PMTilesLayer';

// Enable geographic coordinates (lon/lat) globally - must be called before map creation
// Note: This is an OpenLayers utility, not a React hook, despite the naming convention
enableGeographicProjection();

/** Static PMTiles URL - Parcel handles bundling and provides runtime URL */
const THAILAND_PMTILES_URL: string = new URL('./thailand.pmtiles', import.meta.url).href;

/** Default center coordinates [longitude, latitude] - centered on Thailand */
const DEFAULT_CENTER: [number, number] = [100.5, 13.75];

/** Default zoom level - country overview */
const DEFAULT_ZOOM: number = 6;

/** Attribution for OpenStreetMap data */
const DEFAULT_ATTRIBUTION: string = '© OpenStreetMap contributors';

/**
 * OpenLayers Map Component
 *
 * Displays an interactive map using PMTiles vector tiles.
 * Uses the ol library directly with React hooks for lifecycle management.
 */
export function OpenLayersMap(): ReactElement {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<OLMap | null>(null);

  useEffect(() => {
    // Only initialize if container exists and map hasn't been created
    if (!mapContainerRef.current) {
      return;
    }

    // Create the OpenLayers map instance (without layers - those are added by child components)
    const mapInstance: OLMap = new OLMap({
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
      style={{ minHeight: '400px', backgroundColor: '#f5f5f5' }}
    >
      {/* PMTiles layer as a subcomponent */}
      <PMTilesLayer map={map} url={THAILAND_PMTILES_URL} attribution={DEFAULT_ATTRIBUTION} />
    </div>
  );
}
