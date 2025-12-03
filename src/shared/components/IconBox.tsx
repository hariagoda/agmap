import type { ReactElement, ReactNode } from 'react';

type IconBoxVariant = 'accent' | 'secondary';

interface IconBoxProps {
  /** Icon element to display */
  children: ReactNode;
  /** Color variant for the icon and glow */
  variant?: IconBoxVariant;
  /** Size of the icon box */
  size?: 'sm' | 'md' | 'lg';
}

const VARIANT_STYLES: Record<IconBoxVariant, { icon: string; glow: string }> = {
  accent: {
    icon: 'text-accent',
    glow: 'bg-accent/10',
  },
  secondary: {
    icon: 'text-secondary',
    glow: 'bg-secondary/10',
  },
};

const SIZE_STYLES = {
  sm: { box: 'w-8 h-8 rounded-lg', icon: 'w-4 h-4' },
  md: { box: 'w-16 h-16 rounded-xl', icon: 'w-8 h-8' },
  lg: { box: 'w-24 h-24 rounded-2xl', icon: 'w-12 h-12' },
};

/**
 * IconBox - A container for icons with gradient background and glow effect.
 *
 * Used for prominent icon displays with visual emphasis through
 * background gradients and blur effects.
 */
export function IconBox({ children, variant = 'accent', size = 'lg' }: IconBoxProps): ReactElement {
  const variantStyle = VARIANT_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];

  return (
    <div className="relative flex justify-center">
      <div
        className={`${sizeStyle.box} bg-gradient-to-br from-surface-raised to-surface-overlay border border-border flex items-center justify-center`}
      >
        <div className={`${sizeStyle.icon} ${variantStyle.icon}`}>{children}</div>
      </div>
      {/* Glow effect */}
      <div className="absolute inset-0 flex justify-center">
        <div className={`${sizeStyle.box} ${variantStyle.glow} blur-2xl`} />
      </div>
    </div>
  );
}
