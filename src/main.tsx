import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import './data/registerExtendedCatalog'
import './styles1.css'
import './styles2.css'
import './styles3.css'
import './styles4.css'
import './styles-lms.css'
import './styles-lms2.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
