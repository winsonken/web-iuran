import React from 'react'
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
                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-32">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <IoPeople className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-main-orange font-bold text-2xl">100</p>
                            <p className="text-main-orange font-medium text-xs  ">Jumlah warga</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-32">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <IoPeople className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-main-orange font-bold text-2xl">3</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Jumlah petugas</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit  xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-32">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <FaMoneyCheck className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-main-orange font-bold text-2xl">1,5 Jt</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Pemasukan</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit  xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-32">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <GiPayMoney className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-main-orange font-bold text-2xl">1 Jt</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Pengeluaran</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#FFFFFF] hidden">
                <h1 className="text-xl text-[#222222] font-medium">Iuran belum lunas - Maret 2023</h1>

                <div className="bg-pink-100 overflow-x-auto">
                    <table>
                        <tr>
                            <th>No</th>
                            <th>Nama warga</th>
                            <th>Jenis kelamin</th>
                            <th>NIK</th>
                            <th>Alamat</th>
                            <th>Status pembayaran</th>
                        </tr>

                        <tr>
                            <td>1</td>
                            <td>Sunoto</td>
                            <td>Laki-laki</td>
                            <td>123456</td>
                            <td>Batam</td>
                            <td>Belum lunas</td>
                        </tr>
                    </table>

                </div>
            </div>

            <div className="flex flex-col gap-5 ">
                <h1 className="text-xl text-[#222222] font-medium">Iuran belum lunas - Maret 2023</h1>

                <div class="relative overflow-x-auto sm:rounded-lg">

                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-main-orange">
                        <thead class="text-xs text-[#FFFFFF] bg-main-orange"> 
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Nama warga
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Jenis kelamin
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    NIK
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Alamat
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status pembayaran
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-[#FFFFFF]">
                            <tr class="text-[#292D32] font-medium border-b">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                                    1
                                </th>
                                <td class="px-6 py-4">
                                    Sunoto
                                </td>
                                <td class="px-6 py-4">
                                    Laptop
                                </td>
                                <td class="px-6 py-4">
                                    12345
                                </td>
                                <td class="px-6 py-4">
                                    Batam
                                </td>
                                <td class="px-6 py-4">
                                    <div className="bg-[#FDD4D4] w-fit px-3 py-1 rounded-full">
                                        <p className="text-[#AC1616] text-xs">Belum lunas</p>
                                    </div>
                                </td>
                            </tr>

                            <tr class="text-[#292D32] font-medium">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                                    2
                                </th>
                                <td class="px-6 py-4">
                                    Sunoto
                                </td>
                                <td class="px-6 py-4">
                                    Laptop
                                </td>
                                <td class="px-6 py-4">
                                    12345
                                </td>
                                <td class="px-6 py-4">
                                    Batam
                                </td>
                                <td class="px-6 py-4">
                                    <div className="bg-[#FDD4D4] w-fit px-3 py-1 rounded-full">
                                        <p className="text-[#AC1616] text-xs">Belum lunas</p>
                                    </div>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
                                
            </div>

        </div>
    </Layout>
  )
}

export default Dashboard