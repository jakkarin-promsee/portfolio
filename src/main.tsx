import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

const app = (
  <React.StrictMode>
    <BrowserRouter><App /></BrowserRouter>
  </React.StrictMode>
)

const root = document.getElementById('root')!
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
