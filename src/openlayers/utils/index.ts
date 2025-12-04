/**
 * OpenLayers utilities exports.
 *
 * @module openlayers/utils
 */

export {
  ERROR_CODE_CONTROL_CREATION,
  ERROR_CODE_LAYER_CREATION,
  ERROR_CODE_MAP_INIT,
} from './errorCodes';

export {
  ControlCreationError,
  LayerCreationError,
  MapError,
  MapInitializationError,
  normalizeError,
} from './errors';

export {
  getFeatureAdminLevel,
  getFeatureClass,
  getFeatureLayer,
  getFeatureNumber,
  getFeatureString,
  isCoordinate,
  isNumber,
  isString,
} from './typeGuards';

