import React from 'react';
import { createRoot } from 'react-dom/client';
import MainAppFile from './crud/MainAppFile';

// Create root and render MainAppFile without routing
const root = createRoot(document.getElementById('root'));
root.render(<MainAppFile />);