import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Laporan from './pages/Laporan'
import Login from './pages/Login'
import Pengeluaran from './pages/Pengeluaran'
import Tahun from './pages/Tahun'
import Datapetugas from './pages/Datapetugas'
import Datawarga from './pages/Datawarga'
import Iuran from './pages/Iuran'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
      
          <Route path="/" element={<Login />}>
            <Route path="/login" element={<Login />} />
          </Route>
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/tahun/:id" element={<Tahun />} />
          <Route path="/iuran/:Month/:Year" element={<Iuran />} />
          <Route path="/iuran/:Month/:Year/:id" element={<Iuran />} />
          <Route path="/pengeluaran" element={<Pengeluaran />} />
          <Route path="/data-petugas" element={<Datapetugas />} />
          <Route path="/data-warga" element={<Datawarga />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
