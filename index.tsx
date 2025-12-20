
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Log that we've reached the TSX execution phase
if ((window as any).DEBUG_STATE) {
    (window as any).DEBUG_STATE.appStarted = true;
    if (typeof (window as any).updateDebugUI === 'function') {
        (window as any).updateDebugUI();
    }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Could not find root element to mount to");
} else {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
