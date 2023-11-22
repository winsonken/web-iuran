import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { RxChevronDown } from "react-icons/rx";
import { GiPayMoney } from "react-icons/gi";

const Navbar = (props) => {
  return (
    <div className={`bg-[#FFFFFF] p-3 flex justify-end fixed right-0 border-b-2 border-[#E8E8E8] duration-300 ${props.menuOpen ? "w-full" : "w-[calc(100%-50px)] md:w-full"}`}>

        <div className="flex justify-center items-center gap-2 cursor-pointer">
            <FaUserCircle className="text-xl md:text-2xl text-main-orange" />
            <p className="text-base font-medium hidden xs:block">Username</p>
            <RxChevronDown className="text-sm md:text-base" />
        </div>
    </div>
  )
}

export default Navbar