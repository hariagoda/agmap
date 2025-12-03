/**
 * Error boundary component for OpenLayers map.
 *
 * Catches errors in the map component tree and displays a fallback UI.
 *
 * @module components/MapErrorBoundary
 */

import type { ErrorInfo } from 'react';
import { Component, type ReactElement, type ReactNode } from 'react';

/**
 * Props for MapErrorBoundary component.
 */
interface MapErrorBoundaryProps {
  /** Child components to render */
  children: ReactNode;
  /** Fallback UI to display when an error occurs */
  fallback?: ReactElement | ((error: Error, errorInfo: ErrorInfo) => ReactElement);
  /** Callback when an error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * State for MapErrorBoundary component.
 */
interface MapErrorBoundaryState {
  /** Error that was caught */
  error: Error | null;
  /** Error info from React */
  errorInfo: ErrorInfo | null;
}

/**
 * Error boundary component for catching and handling map errors.
 *
 * Wraps map components to catch errors during rendering and lifecycle methods,
 * displaying a fallback UI instead of crashing the entire application.
 *
 * @example
 * ```tsx
 * <MapErrorBoundary
 *   fallback={<div>Map failed to load</div>}
 *   onError={(error) => console.error('Map error:', error)}
 * >
 *   <OpenLayersMap />
 * </MapErrorBoundary>
 * ```
 */
export class MapErrorBoundary extends Component<MapErrorBoundaryProps, MapErrorBoundaryState> {
  constructor(props: MapErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<MapErrorBoundaryState> {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });

    // Call error callback if provided (this is the proper way to handle errors)
    // The parent component or error reporting service should handle logging
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render(): ReactNode {
    if (this.state.error) {
      // Render fallback UI
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          if (!this.state.errorInfo) {
            return null;
          }
          return this.props.fallback(this.state.error, this.state.errorInfo);
        }
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div
          className="flex items-center justify-center w-full h-full bg-surface border border-border-subtle rounded-lg"
          role="alert"
        >
          <div className="text-center p-8">
            <h2 className="text-lg font-semibold text-text-primary mb-2">Map Error</h2>
            <p className="text-text-secondary mb-4">
              {this.state.error.message || 'An error occurred while loading the map.'}
            </p>
            <button
              type="button"
              onClick={(): void => {
                this.setState({ error: null, errorInfo: null });
                window.location.reload();
              }}
              className="px-4 py-2 bg-accent text-void rounded-lg hover:bg-accent/90 transition-colors"
            >
              Reload Map
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
