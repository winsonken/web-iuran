import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Layout = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex">
        <Sidebar className="bg-blue-300" menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <div className="flex flex-col flex-1 items-end">
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            <div className={`px-6 py-16 w-[calc(100%-50px)] ${menuOpen ? "md:w-[calc(100%-50px)]" : "md:w-[calc(100%-20%)]"} duration-300`} >
                { children }
            </div>
        </div>
    </div>
  )
}

export default Layout