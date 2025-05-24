import 'modern-normalize';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store, persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
      </Provider>
    </Router>
    <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
  </StrictMode>
);
