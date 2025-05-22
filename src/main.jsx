import 'modern-normalize';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './redux/store.js';

import './styles/base.css';
import './styles/container.css';
import './styles/reset.css';
import './styles/variables.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
    <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
  </StrictMode>
);
