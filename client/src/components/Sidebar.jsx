import React, { useState } from 'react'
import { AiOutlineDashboard } from "react-icons/ai";
import { IoPeople } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { RxHamburgerMenu } from 'react-icons/rx'

const Sidebar = (props) => {
  return (
    <div className={`${props.className} ${props.menuOpen ? "w-1/2 xs:w-2/5 sm:w-1/3 md:w-[50px]" : "w-[50px] md:w-1/5"} h-screen fixed md:fixed z-10 duration-300 flex flex-col justify-start ${props.menuOpen ? "items-start" : "items-center"}`}>
        <div className="flex justify-between w-full p-3">
            <h1 className={`font-bold ${props.menuOpen ? "block md:hidden" : "hidden"} md:text-xl md:block`}>Web Iuran</h1>

            <RxHamburgerMenu className="text-2xl cursor-pointer" onClick={() => { props.setMenuOpen(!props.menuOpen) }} />
        </div>
    
        <div className="w-full p-3">
            <ul className="flex flex-col gap-3">
                <li>
                    <a href="" className="inline-flex items-center gap-3">
                        <span className="text-xl md:text-2xl"><AiOutlineDashboard /></span>
                        <span className={`${props.menuOpen ? "block md:hidden" : "hidden"} md:block text-xs md:text-sm font-medium`}>Dashboard</span>
                    </a></li>
                <li>
                    <a href="" className="inline-flex items-center gap-3"> 
                        <span className="text-xl md:text-2xl"><IoDocumentText /></span>
                        <span className={`${props.menuOpen ? "block md:hidden" : "hidden"} md:block text-xs md:text-sm font-medium`}>Laporan</span>
                    </a>
                </li>
                <li>
                    <a href="" className="inline-flex items-center gap-3">  
                        <span className="text-xl md:text-2xl"><IoPeople /></span>
                        <span className={`${props.menuOpen ? "block md:hidden" : "hidden"} md:block text-xs md:text-sm font-medium`}>Data Masyarakat</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar