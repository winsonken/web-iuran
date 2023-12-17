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
import DashboardUser from './pages/user/DashboardUser'
import PengeluaranUser from './pages/user/PengeluaranUser'
import DashboardPetugas from './pages/petugas/DashboardPetugas'
import LaporanPetugas from './pages/petugas/LaporanPetugas'
import PengeluaranPetugas from './pages/petugas/PengeluaranPetugas'
import DatawargaPetugas from './pages/petugas/DatawargaPetugas'
import TahunPetugas from './pages/petugas/TahunPetugas'
import IuranPetugas from './pages/petugas/IuranPetugas'
import UserLogin from './pages/UserLogin'
import PetugasLogin from './pages/PetugasLogin'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
      
          <Route path="/" element={<UserLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/admin-login" element={<Login />} />
          <Route path="/petugas-login" element={<PetugasLogin />} />
          
          
          
          <Route path="/dashboard-admin" element={<Dashboard />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/tahun/:id" element={<Tahun />} />
          <Route path="/iuran/:Month/:Year" element={<Iuran />} />
          <Route path="/iuran/:Month/:Year/:id" element={<Iuran />} />
          <Route path="/pengeluaran" element={<Pengeluaran />} />
          <Route path="/data-petugas" element={<Datapetugas />} />
          <Route path="/data-warga" element={<Datawarga />} />

          <Route path="/dashboard-petugas" element={<DashboardPetugas />} />
          <Route path="/laporan-petugas" element={<LaporanPetugas />} />
          <Route path="/tahun-petugas/:id" element={<TahunPetugas />} />
          <Route path="/iuran-petugas/:Month/:Year" element={<IuranPetugas />} />
          <Route path="/iuran-petugas/:Month/:Year/:id" element={<IuranPetugas />} />
          <Route path="/pengeluaran-petugas" element={<PengeluaranPetugas />} />
          <Route path="/data-warga-petugas" element={<DatawargaPetugas />} />


          <Route path="/dashboard-user" element={<DashboardUser />} />
          <Route path="/pengeluaran-user" element={<PengeluaranUser />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
