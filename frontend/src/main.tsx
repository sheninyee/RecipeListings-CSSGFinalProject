import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import CreateRecipe from './pages/CreateRecipe.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login />
    <App />
    <CreateRecipe />
  </StrictMode>,
)
