import React from 'react'
import Layout from '../Layout/Layout'
import { FaCirclePlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Laporan = () => {
  return (
    <Layout>
        <div className="flex flex-col gap-5">
            <div className="flex justify-between">
                <h1 className="text-xl text-[#222222] font-medium">Laporan</h1>
                
                <button className="bg-main-orange flex items-center gap-1 text-[#FFFFFF] px-3 py-1  rounded-md">
                    <FaCirclePlus />
                    <p className="text-xs">Tambah laporan</p>
                </button>
            </div>

            <div>
                <div class="relative overflow-x-auto sm:rounded-lg">

            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-main-orange">
                <thead class="text-xs text-[#FFFFFF] bg-main-orange"> 
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tahun
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Lihat detail
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-[#FFFFFF]">
                    <tr class="text-[#292D32] font-medium border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                            1
                        </th>
                        <td class="px-6 py-4">
                            2023
                        </td>
                        <td class="px-6 py-4">
                            <div className="bg-[#F9E3D0] w-fit px-5 py-1 rounded-full cursor-pointer">
                                <p className="text-[#FF9130] text-xs">Detail</p>
                            </div>
                        </td>
                        <td class="px-6 py-4 flex text-xl">
                            <FaEdit />
                            <MdDeleteForever />
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

export default Laporan