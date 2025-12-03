import { memo, type ComponentType, type ReactElement, type SVGProps } from 'react';

// Import SVG files as React components (via @parcel/transformer-svg-react)
import ClockSvg from './svg/clock.svg';
import GlobeSvg from './svg/globe.svg';
import LayersSvg from './svg/layers.svg';
import MapSvg from './svg/map.svg';

/** Available icon names */
export type IconName = 'map' | 'layers' | 'globe' | 'clock';

/** SVG component type alias for cleaner typing */
type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Static map of icon names to SVG components - defined outside component to avoid recreation */
const ICON_MAP: Readonly<Record<IconName, SvgComponent>> = {
  map: MapSvg,
  layers: LayersSvg,
  globe: GlobeSvg,
  clock: ClockSvg,
} as const;

interface IconProps {
  /** Name of the icon to display */
  name: IconName;
  /** Optional size class (defaults to w-full h-full) */
  size?: string;
  /** Optional additional CSS classes */
  className?: string;
  /** Accessible label for the icon (required for non-decorative icons) */
  'aria-label'?: string;
}

/**
 * Icon - A performant, unified icon component that renders SVG icons.
 *
 * Performance optimizations:
 * - Memoized to prevent unnecessary re-renders when props are unchanged
 * - Static ICON_MAP defined outside component scope
 * - Minimal prop spreading and conditional logic
 *
 * @example
 * ```tsx
 * <Icon name="map" size="w-5 h-5" />
 * <Icon name="globe" className="text-accent" />
 * ```
 */
export const Icon = memo(function Icon({
  name,
  size = 'w-full h-full',
  className = '',
  'aria-label': ariaLabel,
}: IconProps): ReactElement {
  const SvgComponent = ICON_MAP[name];
  const hasLabel = ariaLabel !== undefined && ariaLabel !== '';

  return (
    <SvgComponent
      className={className ? `${size} ${className}` : size}
      role={hasLabel ? 'img' : 'presentation'}
      aria-label={hasLabel ? ariaLabel : undefined}
      aria-hidden={!hasLabel}
    />
  );
});
