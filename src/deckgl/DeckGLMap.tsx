import { Badge } from '@shared/components/Badge';
import { IconBox } from '@shared/components/IconBox';
import { StatusCard } from '@shared/components/StatusCard';
import { Icon } from '@shared/icons';
import type { ReactElement } from 'react';

/** Features supported by deck.gl */
const DECKGL_FEATURES: string[] = ['WebGL 2.0', 'GPU Layers', 'Big Data', '3D Terrain'];

/**
 * deck.gl Map Module
 *
 * Placeholder component for the deck.gl map implementation.
 * This will be expanded to include actual deck.gl integration
 * with WebGL-powered large-scale data visualization.
 */
export function DeckGLMap(): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center h-full p-12">
      <div className="max-w-lg w-full">
        {/* Icon container with glow effect */}
        <div className="mb-10">
          <IconBox variant="secondary" size="lg">
            <Icon name="layers" />
          </IconBox>
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-secondary font-medium">
              Map Engine
            </p>
            <h2 className="text-2xl font-semibold text-text-primary tracking-tight">deck.gl</h2>
          </div>

          <p className="text-sm text-text-secondary leading-relaxed">
            WebGL-powered large-scale data visualization with GPU-accelerated rendering for millions
            of data points.
          </p>

          {/* Feature tags */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {DECKGL_FEATURES.map((feature) => (
              <Badge key={feature}>{feature}</Badge>
            ))}
          </div>
        </div>

        {/* Status card */}
        <div className="mt-10">
          <StatusCard
            icon={<Icon name="clock" />}
            title="Implementation Pending"
            description="Map integration in progress"
            variant="accent"
          />
        </div>
      </div>
    </div>
  );
}
