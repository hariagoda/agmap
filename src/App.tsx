import { PillTabs } from '@shared/components/PillTabs';
import { StatusIndicator } from '@shared/components/StatusIndicator';
import { Icon } from '@shared/icons/Icon';
import { type ReactElement, useId, useState } from 'react';
import { DeckGLMap } from './deckgl/DeckGLMap';
import { OpenLayersMap } from './openlayers/OpenLayersMap';

import './index.css';

/** Available map engine options */
type MapEngine = 'openlayers' | 'deckgl';

/**
 * Tab configuration for map engine selection
 */
const TAB_CONFIG: { id: MapEngine; label: string }[] = [
  { id: 'openlayers', label: 'OpenLayers' },
  { id: 'deckgl', label: 'deck.gl' },
];

/**
 * AgMap - Internal Agoda Maps Application
 *
 * Main application component with tabbed navigation between
 * OpenLayers and deck.gl map engines.
 */
export function App(): ReactElement {
  const [activeEngine, setActiveEngine] = useState<MapEngine>('openlayers');
  const panelId = useId();

  return (
    <div className="min-h-screen bg-void flex flex-col relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-secondary/[0.02]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Header */}
      <header className="relative z-10 border-b border-border-subtle bg-surface/80 backdrop-blur-xl">
        <div className="max-w-screen-2xl mx-auto px-8 py-5">
          <div className="relative flex items-center justify-between">
            {/* Logo - flex start */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                  <Icon name="map" size="w-5 h-5" className="text-void" />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-accent/20 blur-lg -z-10" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-text-primary tracking-tight">AgMap</h1>
                <p className="text-[11px] text-text-tertiary uppercase tracking-widest">
                  Geospatial Engine
                </p>
              </div>
            </div>

            {/* Tab Navigation - absolute center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <PillTabs
                tabs={TAB_CONFIG}
                activeTab={activeEngine}
                onTabChange={setActiveEngine}
                ariaLabel="Map engine selection"
              />
            </div>

            {/* Status indicator - flex end */}
            <StatusIndicator label="Ready" variant="accent" pulse />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {/* Tab Panels */}
        <div
          id={`${panelId}-openlayers`}
          role="tabpanel"
          aria-labelledby={`${panelId}-openlayers-tab`}
          className={`absolute inset-0 transition-all duration-500 ${
            activeEngine === 'openlayers'
              ? 'opacity-100 z-10 translate-y-0'
              : 'opacity-0 z-0 pointer-events-none translate-y-4'
          }`}
        >
          <OpenLayersMap />
        </div>

        <div
          id={`${panelId}-deckgl`}
          role="tabpanel"
          aria-labelledby={`${panelId}-deckgl-tab`}
          className={`absolute inset-0 transition-all duration-500 ${
            activeEngine === 'deckgl'
              ? 'opacity-100 z-10 translate-y-0'
              : 'opacity-0 z-0 pointer-events-none translate-y-4'
          }`}
        >
          <DeckGLMap />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border-subtle py-3 bg-surface/50 backdrop-blur-sm">
        <div className="max-w-screen-2xl mx-auto px-8 flex items-center justify-between">
          <p className="text-text-ghost text-[10px] uppercase tracking-wider">© 2025 Agoda</p>
          <p className="text-text-ghost text-[10px] uppercase tracking-wider">v0.1.0</p>
        </div>
      </footer>
    </div>
  );
}
