import React from 'react'
import loginImage from '../assets/login-img.jpg'
import { Link, useParams } from 'react-router-dom';

const Login = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center p-3">
      <div className="bg-third-orange w-full max-w-3xl sm:h-5/6 rounded-sm flex justify-center items-center gap-5">
        <div className="sm:w-1/2 h-full hidden sm:block">
          <img src={loginImage} alt="Login Image" className="w-full h-full rounded-l-sm" />
        </div>

        <div className="flex flex-col justify-center items-center gap-5 w-full h-full px-3 py-5 sm:w-1/2">
          <form className="flex flex-col items-center gap-5 md:gap-8 w-full max-w-sm">
            <div className="md:w-2/3 flex flex-col justify-start items-center gap-8">
              <h1 className="text-second-orange font-semibold text-2xl xs:text-3xl md:text-5xl">Login</h1>
              <h1 className="text-second-orange font-semibold text-xs xs:text-sm md:text-xl">Selamat datang, silahkan login</h1> 
            </div>

            <div className="w-full sm:w-3/4 flex flex-col gap-5">
              <input type="text" placeholder='Username' className="w-full bg-transparent border-b border-second-orange px-3 text-main-orange font-semibold placeholder:text-second-orange placeholder:text-sm placeholder:font-medium focus:outline-none caret-main-orange" />
              <input type="password" placeholder="Password" className="w-full bg-transparent border-b border-second-orange px-3 text-main-orange font-semibold placeholder:text-second-orange placeholder:text-sm placeholder:font-medium focus:outline-none caret-main-orange" />
            </div>

            <div className="w-full flex justify-center">
              <Link to={`/dashboard`} className="bg-second-orange w-full sm:w-3/4 text-sm text-[#FFFFFF] rounded-lg px-3 py-1 xs:text-base text-center align-middle">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login