/**
 * Error handling utilities for OpenLayers map system.
 *
 * Provides standardized error types and handling for map-related errors.
 *
 * Note: Error codes used here are constants from errorCodes.ts and are not secrets.
 * They are error identifiers used for error handling and categorization.
 *
 * @module utils/errors
 */

import {
  ERROR_CODE_CONTROL_CREATION,
  ERROR_CODE_LAYER_CREATION,
  ERROR_CODE_MAP_INIT,
} from './errorCodes';

/**
 * Base error class for map-related errors.
 */
export class MapError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'MapError';
    Object.setPrototypeOf(this, MapError.prototype);
  }
}

/**
 * Error thrown when map initialization fails.
 */
export class MapInitializationError extends MapError {
  constructor(
    message: string,
    public readonly cause?: Error,
  ) {
    // ERROR_CODE_MAP_INIT is a constant error identifier, not a secret
    super(message, ERROR_CODE_MAP_INIT);
    this.name = 'MapInitializationError';
    Object.setPrototypeOf(this, MapInitializationError.prototype);
  }
}

/**
 * Error thrown when layer creation fails.
 */
export class LayerCreationError extends MapError {
  constructor(
    message: string,
    public readonly layerId?: string,
  ) {
    // ERROR_CODE_LAYER_CREATION is a constant error identifier, not a secret
    super(message, ERROR_CODE_LAYER_CREATION);
    this.name = 'LayerCreationError';
    Object.setPrototypeOf(this, LayerCreationError.prototype);
  }
}

/**
 * Error thrown when control creation fails.
 */
export class ControlCreationError extends MapError {
  constructor(
    message: string,
    public readonly controlId?: string,
  ) {
    // ERROR_CODE_CONTROL_CREATION is a constant error identifier, not a secret
    super(message, ERROR_CODE_CONTROL_CREATION);
    this.name = 'ControlCreationError';
    Object.setPrototypeOf(this, ControlCreationError.prototype);
  }
}

/**
 * Create a standardized error from an unknown error value.
 *
 * @param error - Unknown error value
 * @param defaultMessage - Default error message
 * @returns Standardized Error instance
 */
export function normalizeError(error: unknown, defaultMessage: string): Error {
  if (error instanceof Error) {
    return error;
  }
  if (typeof error === 'string') {
    return new Error(error);
  }
  return new Error(defaultMessage);
}
