/**
 * OpenLayers controls exports.
 *
 * @module openlayers/controls
 */

export type { BangkokZoomControlOptions } from './BangkokZoomControl';
export { BangkokZoomControl } from './BangkokZoomControl';

export {
  getControlFactory,
  hasControl,
  registerControl,
} from './registry';

export type {
  ControlFactory,
  ControlRegistry,
  ControlRegistryEntry,
} from './types';

