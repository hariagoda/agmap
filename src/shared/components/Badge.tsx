import type { ReactElement } from 'react';

interface BadgeProps {
  /** Text content of the badge */
  children: string;
}

/**
 * Badge - A small pill-shaped label for displaying tags or categories.
 *
 * Features uppercase text with wide letter-spacing for a refined look.
 */
export function Badge({ children }: BadgeProps): ReactElement {
  return (
    <span className="px-3 py-1 text-[10px] uppercase tracking-wider text-text-tertiary bg-surface-raised border border-border-subtle rounded-full">
      {children}
    </span>
  );
}
