import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Layout = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex">
        <Sidebar className="bg-[#FFFFFF]" menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <div className="flex flex-col flex-1 items-end">
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            <div className={`px-5 py-16 h-0 w-[calc(100%-50px)] ${menuOpen ? "md:w-[calc(100%-50px)]" : "md:w-[calc(100%-20%)]"} duration-300`} >
                <div className="w-full h-[450px]">
                    { children }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Layout