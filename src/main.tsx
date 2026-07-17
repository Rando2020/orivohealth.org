import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles1.css'
import './styles2.css'
import './styles3.css'
import './styles4.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
