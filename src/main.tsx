import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './AppV2'
import Resume from './Resume'
import IzziCase from './IzziCase'
import GluoCase from './GluoCase'
import BebbiaCase from './BebbiaCase'
import IzziSellersCase from './IzziSellersCase'
import MiFidelidadCase from './MiFidelidadCase'
import ScrollManager from './components/ScrollManager'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/work/izzi" element={<IzziCase />} />
        <Route path="/work/gluo" element={<GluoCase />} />
        <Route path="/work/bebbia" element={<BebbiaCase />} />
        <Route path="/work/izzi-sellers" element={<IzziSellersCase />} />
        <Route path="/work/mi-fidelidad" element={<MiFidelidadCase />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
