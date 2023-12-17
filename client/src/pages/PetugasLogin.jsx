import React, { useState } from 'react'
import loginImage from '../assets/login-img.jpg'
import loginLogo from '../assets/login-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import axios from 'axios'
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const PetugasLogin = () => {
  const [user, setUser] = useState ('');
  const [password, setPassword] = useState ('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  
  axios.defaults.withCredentials = true;

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8081/login/', { user, password })
      .then(res => {
        console.log(res);
        setMessage(res.data.message);
        if (res.data.status === 'success') {
          Swal.fire('Berhasil', 'Akun berhasil Login', 'success').then(() => {
            navigate('/dashboard-admin');
          });
        } else {
          Swal.fire('Gagal', res.data.message, 'error');
        }
      })
      .catch(err => {
        console.log(err);
        Swal.fire('Gagal', 'Terjadi Kesalahan pada Login' , 'error');
      });
  }

  return (
    <div className="flex justify-center items-center flex-row w-screen h-screen p-3">
      <div className="w-full h-full flex justify-center items-center gap-5 md:w-4/5">
        <div className="hidden md:block md:w-fit h-4/5 relative">
          <img src={loginImage} alt="Login image" className="w-full h-full rounded-l-lg object-contain"/>
          <div className="absolute top-3 w-full">
            <p className="text-center text-main-orange font-bold">Selamat Datang</p>
          </div>
        </div>

        <div className="w-full h-4/5 flex flex-col justify-center items-center max-w-sm md:max-w-md md:w-1/2">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-1">
              <img src={loginLogo} alt="Login logo" className="w-12" />
              <h1 className="text-main-orange font-bold text-base xs:text-xl">Iuranku</h1>
            </div>
            
            <h1 className="text-main-orange font-bold text-xl">Login petugas</h1>
          </div>

          <div className="flex w-full">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5 w-full p-3">
              <div className="flex flex-col justify-center items-center gap-3 w-full">
                <div className="w-full">
                  <input type="text" placeholder="User ID" required className="w-full px-3 py-2 bg-transparent text-main-orange placeholder:text-main-orange font-medium border-b border-main-orange focus:outline-none" 
                  onChange={e => setUser(e.target.value)}/>
                </div>

                <div className="w-full">
                  <input type="password" placeholder="Kata sandi" required className="w-full px-3 py-2 bg-transparent text-main-orange placeholder:text-main-orange font-medium border-b border-main-orange focus:outline-none" 
                  onChange={e => setPassword(e.target.value)}/>
                </div>
              </div>

              <div className="w-full">
                <button type="submit" className="bg-main-orange w-full px-3 py-2 rounded-sm text-[#FFFFFF]">Masuk</button>
              </div>
            </form>
          </div>

          <p>atau login sebagai</p>

          <div className="flex justify-between p-3 w-full gap-x-1">
           <Link to="/user-login" className="w-1/3">
              <div className="flex justify-center bg-main-orange py-2 rounded-sm text-[#FFFFFF] text-sm">
                User
              </div>
            </Link>

            <Link to="/petugas-login" className="w-1/3">
              <div className="flex justify-center bg-main-orange py-2 rounded-sm text-[#FFFFFF] text-sm">
                Petugas
              </div>
            </Link>

            <Link to="/admin-login" className="w-1/3">
              <div className="flex justify-center bg-main-orange py-2 rounded-sm text-[#FFFFFF] text-sm">
                Admin
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PetugasLogin