import React, { useEffect, useState, useRef } from 'react'
import Layout from '../Layout/Layout'
import { IoPeople } from "react-icons/io5";
import { FaMoneyCheck } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import 'datatables.net'; // Import DataTables
import moment from 'moment';

const Dashboard = () => {
    const [warga, setWarga] = useState([]);
    const tableRef = useRef(null);

    useEffect(() => {
        let counter = 1;
        // Initialize DataTables after data is loaded
        if (tableRef.current) {
            $(tableRef.current).DataTable({
                destroy: true, // Destroy any existing DataTable instance
                data: warga,
                columns: [
                    { title: 'No', render: function (data, type, row, meta) { // Langkah 2: Tambahkan kolom nomor urut
                        return counter++;
                    } },
                    { title: 'Nama Perwakilan', data: 'Nama'},
                    { title: 'Status', data: 'Status'},
                ],
            });
        }
    }, [warga]);

    useEffect(() => {
        axios.get('http://localhost:8081/dashboard')
            .then(res => setWarga(res.data))
            .catch(err => console.log(err));
    }, []);

  return (
    <Layout>
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
                <h1 className="text-xl text-[#222222] font-medium">Admin dashboard</h1>

                <div className="flex gap-3 justify-center lg:justify-between flex-wrap w-full h-100">
                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-0">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <IoPeople className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center w-[130px]">
                            <p className="text-main-orange font-bold text-2xl">100</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Jumlah warga</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-0">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <IoPeople className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center w-[130px]">
                            <p className="text-main-orange font-bold text-2xl">3</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Jumlah petugas</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit  xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-0">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <FaMoneyCheck className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center w-[130px]">
                            <p className="text-main-orange font-bold text-2xl">1,5 Jt</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Pemasukan</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit  xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-0">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <GiPayMoney className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center w-[130px]">
                            <p className="text-main-orange font-bold text-2xl">1 Jt</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Pengeluaran</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 ">
                <h1 className="text-xl text-[#222222] font-medium">Iuran belum lunas - Maret 2023</h1>

                <div className="bg-[#FFFFFF] rounded-sm min-w-[150px]">
                    <div className="p-3">
                        <div className="overflow-x-auto rounded-t-md">
                            <table ref={tableRef} className="w-full min-w-full table-auto text-left border border-main-orange" id="example">
                                <thead className="bg-main-orange text-[#FFFFFF] text-center text-xs">
                                    <tr className="h-10">
                                        <th scope="col" className="whitespace-nowrap px-2 ">No</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Nama warga</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Status pembayaran</th>
                                    </tr>
                                </thead>

                                <tbody className="font-medium text-xs text-center">
                                    <tr className="border border-b border-main-orange">
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    
                </div>

                
                                
            </div>
        </div>
    </Layout>
  )
}

export default Dashboard