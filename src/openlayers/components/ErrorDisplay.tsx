/**
 * Error display component for OpenLayers map.
 *
 * Displays error messages when map initialization fails.
 *
 * @module openlayers/components/ErrorDisplay
 */

import type { ReactElement } from 'react';

/**
 * Props for the ErrorDisplay component.
 */
export interface ErrorDisplayProps {
  /** Error object to display */
  error: Error;
  /** Optional retry callback */
  onRetry?: () => void;
}

/**
 * Error display component.
 *
 * Shows a user-friendly error message with an optional retry button.
 * Uses consistent styling with the rest of the application.
 *
 * @param props - Component props
 * @returns Error display element
 */
export function ErrorDisplay({ error, onRetry }: ErrorDisplayProps): ReactElement {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-surface z-10">
      <div className="text-center p-8 max-w-md">
        <div className="text-red-500 mb-4">
          <svg
            className="w-12 h-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-text-primary mb-2">Map Error</h2>
        <p className="text-text-secondary mb-4">
          {error.message || 'An error occurred while loading the map.'}
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px-4 py-2 bg-accent text-void rounded-lg hover:bg-accent/90 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

