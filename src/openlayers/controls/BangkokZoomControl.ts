import Control from 'ol/control/Control';
import {
  BANGKOK_CENTER,
  BANGKOK_ZOOM,
  CONTROL_LEFT_OFFSET_EM,
  ZOOM_CONTROLS_HEIGHT_EM,
} from '../config/constants';

/**
 * Configuration options for BangkokZoomControl.
 */
export interface BangkokZoomControlOptions {
  /** Center coordinates [longitude, latitude] */
  center?: [number, number];
  /** Zoom level */
  zoom?: number;
}

/**
 * Custom control for zooming to Bangkok.
 *
 * Creates a play button that zooms the map to Bangkok's center.
 * Uses OpenLayers control styling for consistency.
 */
export class BangkokZoomControl extends Control {
  private center: [number, number];
  private zoom: number;

  constructor(options: BangkokZoomControlOptions = {}) {
    // Compute values before calling super() since we can't access 'this' before super()
    const center = options.center ?? BANGKOK_CENTER;
    const zoom = options.zoom ?? BANGKOK_ZOOM;

    // Create button element matching OpenLayers zoom control styling
    const button = document.createElement('button');
    button.innerHTML = '▶';
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', 'Zoom to Bangkok');
    button.className = 'ol-zoom-in'; // Use same class as zoom controls for consistent styling

    // Create container div matching OpenLayers zoom control container
    const element = document.createElement('div');
    element.className = 'ol-unselectable ol-control';
    // Position directly below zoom controls
    element.style.cssText = `
      top: ${ZOOM_CONTROLS_HEIGHT_EM}em;
      left: ${CONTROL_LEFT_OFFSET_EM}em;
    `;
    element.appendChild(button);

    super({
      element,
    });

    // Now we can set 'this' properties after super() has been called
    this.center = center;
    this.zoom = zoom;

    // Add click handler
    button.addEventListener('click', this.handleZoomToBangkok.bind(this), false);
  }

  /**
   * Handle zoom to Bangkok button click.
   */
  private handleZoomToBangkok(): void {
    const map = this.getMap();
    if (!map) {
      return;
    }

    const view = map.getView();
    if (!view) {
      return;
    }

    // Zoom to configured center and zoom level
    view.setCenter(this.center);
    view.setZoom(this.zoom);
  }
}
