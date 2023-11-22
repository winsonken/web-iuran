import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Laporan from './pages/Laporan'
import Login from './pages/Login'
import Pengeluaran from './pages/Pengeluaran'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pengeluaran" element={<Pengeluaran />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
