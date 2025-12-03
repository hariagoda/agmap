import type { ReactElement } from 'react';

type StatusIndicatorVariant = 'accent' | 'secondary' | 'success' | 'warning' | 'error';

interface StatusIndicatorProps {
  /** Status label text */
  label: string;
  /** Color variant */
  variant?: StatusIndicatorVariant;
  /** Whether to show pulsing animation */
  pulse?: boolean;
}

const VARIANT_STYLES: Record<StatusIndicatorVariant, string> = {
  accent: 'bg-accent',
  secondary: 'bg-secondary',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
};

/**
 * StatusIndicator - A small status dot with optional label and pulse animation.
 *
 * Used to show system status, connection state, or other binary indicators.
 */
export function StatusIndicator({
  label,
  variant = 'accent',
  pulse = true,
}: StatusIndicatorProps): ReactElement {
  const dotColor = VARIANT_STYLES[variant];

  return (
    <div className="flex items-center gap-2 text-xs text-text-tertiary">
      <span className="relative flex h-2 w-2">
        {pulse === true ? (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColor} opacity-75`}
          />
        ) : null}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`} />
      </span>
      <span>{label}</span>
    </div>
  );
}
