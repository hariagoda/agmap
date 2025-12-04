/**
 * Loading state component for OpenLayers map.
 *
 * Displays a loading indicator while the map is initializing.
 *
 * @module openlayers/components/LoadingState
 */

import type { ReactElement } from 'react';

/**
 * Props for the LoadingState component.
 */
export interface LoadingStateProps {
  /** Custom loading message */
  message?: string;
}

/**
 * Loading state component.
 *
 * Displays a centered loading message while the map initializes.
 * Uses consistent styling with the rest of the application.
 *
 * @param props - Component props
 * @returns Loading state element
 */
export function LoadingState({ message = 'Loading map...' }: LoadingStateProps): ReactElement {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-surface/80 z-10">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-2" />
        <p className="text-text-secondary text-sm">{message}</p>
      </div>
    </div>
  );
}

