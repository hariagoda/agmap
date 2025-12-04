/**
 * Background layer definition.
 *
 * @module maplibre/styles/layers/background
 */

import type { BackgroundLayerSpec } from '../../config/types';
import { LAND_COLORS } from '../palette';

/**
 * Background layer providing the base land color.
 * This is the bottommost layer in the stack.
 */
export const backgroundLayer: BackgroundLayerSpec = {
  id: 'background',
  type: 'background',
  paint: {
    'background-color': LAND_COLORS.base,
  },
};
