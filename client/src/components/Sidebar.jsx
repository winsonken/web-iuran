import React, { useState } from 'react'
import { AiOutlineDashboard } from "react-icons/ai";
import { IoPeople } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { RxHamburgerMenu } from 'react-icons/rx'
import { GiPayMoney } from "react-icons/gi";
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';

const sideMenu = [
    {
        "name": "Dashboard",
        "link": "/dashboard",
        "icon": <AiOutlineDashboard />
    },
    {
        "name": "Laporan",
        "link": "/laporan",
        "icon": <IoDocumentText />
    },
    {
        "name": "Pengeluaran",
        "link": "/pengeluaran",
        "icon": <GiPayMoney />
    },
    {
        "name": "Data petugas",
        "link": "/data-petugas",
        "icon": <IoPeople />
    },
    {
        "name": "Data warga",
        "link": "/data-warga",
        "icon": <IoPeople />
    }
];

const Sidebar = (props) => { 
    const location = useLocation();
    const path = location.pathname;
    
  return (
    <div className={`${props.className} ${props.menuOpen ? "w-1/2 xs:w-2/5 sm:w-1/3 md:w-[50px]" : "w-[50px] md:w-1/5"} bg-[#FFFFFF] z-20 h-screen fixed md:fixed duration-300 flex flex-col justify-start ${props.menuOpen ? "items-start" : "items-center"} border-r border-[#E8E8E8]`}>
        <div className="flex justify-between items-center w-full p-3">
            <h1 className={`font-bold ${props.menuOpen ? "block md:hidden" : "hidden"} text-main-orange text-xs xs:text-lg md:text-xl md:block`}>Web Iuran</h1>

            <RxHamburgerMenu className="text-2xl cursor-pointer" onClick={() => { props.setMenuOpen(!props.menuOpen) }} />
        </div>
    
        <div className="w-full">
            <ul className={`p-2 flex flex-col gap-3 items-start ${props.menuOpen ? "items-start md:items-center" : "items-center md:items-start"}`}>
                    { sideMenu.map(allSideMenu => (        
                        <li className="w-full flex">
                            <Link to={ allSideMenu.link } className={`inline-flex ${ props.menuOpen ? "justify-start" : "justify-center md:justify-start"} items-center gap-3 w-full px-1 py-2 rounded-md font-normal hover:bg-[#F9E3D0] hover:text-main-orange hover:font-semibold duration-200 ${allSideMenu.link == path ? "text-main-orange bg-third-orange font-semibold" : "text-side-text"}`}>
                                <span className="text-xl md:text-2xl">{ allSideMenu.icon }</span>
                                <span className={`${props.menuOpen ? "block md:hidden" : "hidden"} md:block text-xs md:text-sm`}>{ allSideMenu.name }</span>
                            </Link>
                        </li>
                        ))}
            </ul>
        </div>
    </div>
  )
}

export default Sidebar