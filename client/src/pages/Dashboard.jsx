import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import { IoPeople } from "react-icons/io5";
import { FaMoneyCheck } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
const Dashboard = () => {
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
                            <table className="w-full min-w-full table-auto text-left border border-main-orange">
                                <thead className="bg-main-orange text-[#FFFFFF] text-center text-xs">
                                    <tr className="h-10">
                                        <th scope="col" className="whitespace-nowrap px-2 ">No</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Nama warga</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Jenis kelamin</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">NIK</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Alamat</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Status pembayaran</th>
                                    </tr>
                                </thead>

                                <tbody className="font-medium text-xs text-center">
                                    <tr className="border border-b border-main-orange">
                                        <td className="whitespace-nowrap px-2 py-3 ">1</td>
                                        <td className="whitespace-nowrap px-3 py-3">Sunoto</td>
                                        <td className="whitespace-nowrap px-3 py-3">Laki-laki</td>
                                        <td className="whitespace-nowrap px-3 py-3 ">123456789</td>
                                        <td className="whitespace-nowrap px-3 py-3 ">Batam</td>
                                        <td className="whitespace-nowrap px-3 py-3 ">
                                            <div className="bg-[#FDD4D4] text-[#AC1616] w-fit px-5 py-1 rounded-full cursor-pointer m-auto">
                                                <p className="text-xs">Belum lunas</p>
                                            </div>
                                        </td>
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