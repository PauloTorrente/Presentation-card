import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/quicksand/400.css';
import '@fontsource/quicksand/700.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
