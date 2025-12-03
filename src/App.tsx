import type { ReactElement } from 'react';

import './index.css';

/**
 * AgMap - Internal Agoda Maps Application
 *
 * Main application component for the Agoda Maps project.
 * Additional map features will be added here.
 */
export function App(): ReactElement {
  return (
    <div className="min-h-screen bg-gradient-to-br from-agoda-dark to-agoda-darker flex flex-col items-center justify-center p-8">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-agoda-primary mb-2">🗺️ AgMap</h1>
        <p className="text-lg text-agoda-text-muted font-light">Internal Agoda Maps Project</p>
      </header>

      {/* Main Content Card */}
      <main className="bg-white/5 border border-white/10 rounded-xl px-12 py-8 text-center backdrop-blur-sm">
        <p className="text-agoda-text-subtle">Map features coming soon...</p>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-agoda-text-muted text-sm">
        <p>© 2025 Agoda</p>
      </footer>
    </div>
  );
}
