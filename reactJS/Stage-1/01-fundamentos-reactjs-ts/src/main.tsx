/* aqui só renderiza o app para o index.html */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
