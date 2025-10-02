import { Route, Routes, NavLink } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EmlakIlanDetay from './pages/EmlakIlanDetay'
import EmlakIlanFormuKonut from './pages/EmlakIlanFormuKonut'
import EmlakIlanFormuIsyeri from './pages/EmlakIlanFormuIsyeri'
import EmlakIlanFormuArsa from './pages/EmlakIlanFormuArsa'

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-5xl mx-auto p-4">
        <nav className="flex flex-wrap gap-2 mb-4">
          <NavLink to="/" className={({isActive})=>`px-3 py-1 rounded ${isActive?'bg-black text-white':'bg-white border'}`}>Ana Sayfa</NavLink>
          <NavLink to="/ilan" className={({isActive})=>`px-3 py-1 rounded ${isActive?'bg-black text-white':'bg-white border'}`}>İlan Detayı</NavLink>
          <NavLink to="/form/konut" className={({isActive})=>`px-3 py-1 rounded ${isActive?'bg-black text-white':'bg-white border'}`}>Konut Formu</NavLink>
          <NavLink to="/form/isyeri" className={({isActive})=>`px-3 py-1 rounded ${isActive?'bg-black text-white':'bg-white border'}`}>İşyeri Formu</NavLink>
          <NavLink to="/form/arsa" className={({isActive})=>`px-3 py-1 rounded ${isActive?'bg-black text-white':'bg-white border'}`}>Arsa Formu</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ilan" element={<EmlakIlanDetay />} />
          <Route path="/form/konut" element={<EmlakIlanFormuKonut />} />
          <Route path="/form/isyeri" element={<EmlakIlanFormuIsyeri />} />
          <Route path="/form/arsa" element={<EmlakIlanFormuArsa />} />
          <Route path="*" element={<div className="p-6 text-center text-gray-600">Sayfa bulunamadı (404)</div>} />
        </Routes>
      </div>
    </div>
  )
}

