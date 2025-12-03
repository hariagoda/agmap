import type { ReactElement, ReactNode } from 'react';

type StatusCardVariant = 'accent' | 'secondary';

interface StatusCardProps {
  /** Icon element to display */
  icon: ReactNode;
  /** Primary title text */
  title: string;
  /** Secondary description text */
  description: string;
  /** Color variant for the icon background */
  variant?: StatusCardVariant;
}

const VARIANT_STYLES: Record<StatusCardVariant, { bg: string; icon: string }> = {
  accent: {
    bg: 'bg-accent/10',
    icon: 'text-accent',
  },
  secondary: {
    bg: 'bg-secondary/10',
    icon: 'text-secondary',
  },
};

/**
 * StatusCard - A card component for displaying status information.
 *
 * Features an icon, title, and description in a subtle card layout.
 */
export function StatusCard({
  icon,
  title,
  description,
  variant = 'accent',
}: StatusCardProps): ReactElement {
  const variantStyle = VARIANT_STYLES[variant];

  return (
    <div className="p-4 rounded-xl bg-surface-raised/50 border border-border-subtle backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg ${variantStyle.bg} flex items-center justify-center`}>
          <div className={`w-4 h-4 ${variantStyle.icon}`}>{icon}</div>
        </div>
        <div className="flex-1">
          <p className="text-xs text-text-primary font-medium">{title}</p>
          <p className="text-[10px] text-text-ghost">{description}</p>
        </div>
      </div>
    </div>
  );
}
