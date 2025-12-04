/**
 * Error display component for map errors.
 *
 * @module maplibre/components/ErrorDisplay
 */

import type { ReactElement } from 'react';

/** Props for the ErrorDisplay component */
export interface ErrorDisplayProps {
  /** Error to display */
  error: Error;
  /** Optional retry callback */
  onRetry?: () => void;
}

/**
 * Displays map initialization or runtime errors.
 *
 * @param props - Component props
 * @returns Error display element
 *
 * @example
 * ```tsx
 * {error && <ErrorDisplay error={error} onRetry={() => window.location.reload()} />}
 * ```
 */
export function ErrorDisplay({ error, onRetry }: ErrorDisplayProps): ReactElement {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-red-50/80">
      <div className="text-center max-w-md px-6">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-red-600"
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
        <h3 className="text-lg font-medium text-red-800 mb-2">Map initialization failed</h3>
        <p className="text-sm text-red-600 mb-4">{error.message}</p>
        {onRetry !== undefined && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
