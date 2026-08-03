import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import BetaPage from './pages/BetaPage.jsx'
import './styles.css'

function resolveRoute() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/beta' || path.endsWith('/beta')) return 'beta'
  return 'home'
}

const route = resolveRoute()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {route === 'beta' ? <BetaPage /> : <App />}
  </StrictMode>,
)
