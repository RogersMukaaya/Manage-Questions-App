import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/wrappers/App';
import { BrowserRouter} from 'react-router-dom';

// Add our style
import './assests/style/index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

