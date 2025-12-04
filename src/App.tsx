import { PillTabs } from '@shared/components/PillTabs';
import { StatusIndicator } from '@shared/components/StatusIndicator';
import { Icon } from '@shared/icons/Icon';
import { type ReactElement, useEffect, useId, useState } from 'react';
import { MapLibreMap } from './maplibre/MapLibreMap';
import { OpenLayersMap } from './openlayers/OpenLayersMap';

import './index.css';

/** Available map engine options */
type MapEngine = 'openlayers' | 'maplibre';

/**
 * Tab configuration for map engine selection
 */
const TAB_CONFIG: { id: MapEngine; label: string }[] = [
  { id: 'maplibre', label: 'MapLibre GL JS' },
  { id: 'openlayers', label: 'OpenLayers' },
];

/**
 * Valid map engine IDs for validation
 */
const VALID_ENGINES: Set<MapEngine> = new Set(TAB_CONFIG.map((tab) => tab.id));

/**
 * Get map engine from URL hash
 * @returns Valid map engine or null if invalid/missing
 */
function getEngineFromHash(): MapEngine | null {
  const hash = window.location.hash.slice(1); // Remove leading '#'
  const engine = hash.replace(/^\//, '') as MapEngine; // Remove leading '/' if present
  return VALID_ENGINES.has(engine) ? engine : null;
}

/**
 * Update URL hash to reflect active engine
 * @param engine - The map engine to set in the URL
 */
function updateHash(engine: MapEngine): void {
  const newHash = `#/${engine}`;
  if (window.location.hash !== newHash) {
    window.history.replaceState(null, '', newHash);
  }
}

/**
 * AgMap - Internal Agoda Maps Application
 *
 * Main application component with tabbed navigation between
 * OpenLayers, deck.gl, and MapLibre GL JS map engines.
 * Supports URL routing via hash-based navigation.
 */
export function App(): ReactElement {
  // Initialize state from URL hash or default to 'maplibre'
  const [activeEngine, setActiveEngine] = useState<MapEngine>(() => {
    return getEngineFromHash() ?? 'maplibre';
  });
  const panelId = useId();

  // Sync URL hash with active engine state
  useEffect(() => {
    updateHash(activeEngine);
  }, [activeEngine]);

  // Listen for hash changes (back/forward navigation)
  useEffect(() => {
    const handleHashChange = (): void => {
      const engineFromHash = getEngineFromHash();
      if (engineFromHash) {
        // Use functional update to avoid dependency on activeEngine
        setActiveEngine((currentEngine) => {
          return engineFromHash !== currentEngine ? engineFromHash : currentEngine;
        });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []); // Empty dependency array - listener only needs to be set up once

  // Handle tab change - updates both state and URL
  const handleTabChange = (engine: MapEngine): void => {
    setActiveEngine(engine);
    updateHash(engine);
  };

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
                onTabChange={handleTabChange}
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
          id={`${panelId}-maplibre`}
          role="tabpanel"
          aria-labelledby={`${panelId}-maplibre-tab`}
          className={`absolute inset-0 transition-all duration-500 ${
            activeEngine === 'maplibre'
              ? 'opacity-100 z-10 translate-y-0'
              : 'opacity-0 z-0 pointer-events-none translate-y-4'
          }`}
        >
          <MapLibreMap />
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
