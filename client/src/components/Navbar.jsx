import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = (props) => {
  return (
    <div className={`bg-blue-100 p-3 flex justify-end fixed right-0 duration-300 ${props.menuOpen ? "w-full" : "w-[calc(100%-50px)]"}`}>

        <div className="flex justify-center items-center gap-2 cursor-pointer">
            <FaRegUserCircle className="text-xl md:text-2xl" />
            <p className="text-base md:text-lg">Username</p>
        </div>
    </div>
  )
}

export default Navbar