import { StrictMode } from 'react';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';

import { App } from './App';

// Get the root container element - throws if not found
const container: HTMLElement | null = document.getElementById('app');

if (!container) {
  throw new Error('Root element #app not found in the document');
}

const root: Root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
