import React, { useState, useEffect } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { RxChevronDown } from "react-icons/rx";
import { GiPayMoney } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { Link, useParams } from 'react-router-dom';
<<<<<<< HEAD
=======
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
>>>>>>> a72d380ecad9962285f3fddc588af3358adf177d

const Navbar = (props) => {
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [name, setName] = useState('');
  const handleDelete = () => {
    axios.get('http://localhost:8081/logout')
    .then(res => {
      Swal.fire('Berhasil', 'Akun anda sudah ter-logout', 'success').then(() => {
        navigate('/login')
    });
    }). catch(err => console.log(err));
  }
  useEffect(() => {
      axios.get('http://localhost:8081/dashboard')
          .then(res => setName(res.data.name))
          .catch(err => console.log(err));
}, []);
  return (
    <div className={`bg-[#FFFFFF] p-3 z-10 flex justify-end fixed right-0 border-b-2 border-[#E8E8E8] duration-300 ${props.menuOpen ? "w-[calc(100%-50px)]" : "w-[calc(100%-50px)] md:w-[calc(100%-20%)]"}`}>

        <div className="flex justify-center items-center gap-2 cursor-pointer" onClick={() => setLogoutOpen(!logoutOpen) }>
            <FaUserCircle className="text-xl md:text-2xl text-main-orange" />
            <p className="text-base font-medium hidden xs:block">{name}</p>
            <RxChevronDown className="text-sm md:text-base" />
        </div>

        { logoutOpen && 
          <div className="bg-[#FFFFFF] absolute top-14 w-24 p-3 rounded-md shadow-md cursor-pointer xs:top-16 xs:w-28 sm:w-32" onClick={() => { setLogoutOpen(false) }}>
            <div className="flex flex-col items-center xs:items-start gap-1"> 
              <p className="text-sm font-medium xs:hidden">{name}</p>
              <div className="flex flex-row items-center gap-1">
                <FiLogOut className="text-main-orange" />
<<<<<<< HEAD
                <Link to={`/login`} className="text-sm">Keluar</Link>
=======
                <div className="text-sm" onClick={handleDelete}>Keluar</div>
>>>>>>> a72d380ecad9962285f3fddc588af3358adf177d
              </div>
            </div>
          </div>
        }
    </div>
  )
}

export default Navbar