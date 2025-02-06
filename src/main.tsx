import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
import { Provider } from 'react-redux';
import store from '../src/store/store';  // Import the store

import App from './App';

// Create a root and render the App
const root = ReactDOM.createRoot(document.getElementById('root')); // Create root
root.render( // Use .render() to render the app
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
