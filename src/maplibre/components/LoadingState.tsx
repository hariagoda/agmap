/**
 * Loading state component for map initialization.
 *
 * @module maplibre/components/LoadingState
 */

import type { ReactElement } from 'react';

/** Props for the LoadingState component */
export interface LoadingStateProps {
  /** Loading message to display */
  message?: string;
}

/**
 * Displays a loading indicator while the map initializes.
 *
 * @param props - Component props
 * @returns Loading state element
 *
 * @example
 * ```tsx
 * {!isReady && <LoadingState message="Initializing map..." />}
 * ```
 */
export function LoadingState({ message = 'Loading map...' }: LoadingStateProps): ReactElement {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-center">
        <div className="inline-flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          <p className="text-gray-600 text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}
