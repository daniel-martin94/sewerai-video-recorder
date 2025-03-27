import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Root from './components/layouts/root.jsx'

const root = createRoot(document.getElementById('root'));
root.render(<Root />);