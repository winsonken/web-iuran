import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import ModalForm from '../components/ModalForm';
import { Link, useNavigate } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Laporan = () => {
    // Show or Hide Modal
    const [showModal, setShowModal] = useState(false);
    // Set Modal Type
    const [modal, setModal] = useState("");
    const [tahun, setTahun] = useState(0);

    const navigate = useNavigate();
    
    function handleSubmit(e) {
        e.preventDefault();
        navigate("/laporan");
        setShowModal(!showModal);
    }

    function handleAddModal() {
        setShowModal(!showModal);
        setModal("create-modal");
    }

    function handleEditModal() {
        setShowModal(!showModal);
        setModal("edit-modal");
    }

    function handleDeleteModal() {
        setShowModal(!showModal);
        setModal("delete-modal");
    }

    return (
        <Layout>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <h1 className="text-xl text-[#222222] font-medium">Laporan</h1>
                    
                    <button className="bg-main-orange flex items-center gap-1 text-[#FFFFFF] px-3 py-1 rounded-md" onClick={handleAddModal}>
                        <FaCirclePlus />
                        <p className="text-xs hidden xs:block">Tambah laporan</p>
                    </button>
                </div>  

                <div className="bg-[#FFFFFF] rounded-sm min-w-[150px]">
                    <div className="p-3">
                        <div className="overflow-x-auto rounded-t-md">
                            <table className="w-full min-w-full table-auto text-left border border-main-orange">
                                <thead className="bg-main-orange text-[#FFFFFF] text-center text-xs">
                                    <tr className="h-10">
                                        <th scope="col" className="whitespace-nowrap px-2 ">No</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Tahun</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Detail</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Aksi</th>
                                    </tr>
                                </thead>

                                <tbody className="font-medium text-xs text-center">
                                    <tr className="border border-b border-main-orange">
                                        <td className="whitespace-nowrap px-2 py-3 ">1</td>
                                        <td className="whitespace-nowrap px-3 py-3">2023</td>
                                        <td className="whitespace-nowrap px-3 py-3 ">
                                            <Link to="/tahun">
                                                <div className="bg-[#F9E3D0] text-main-orange w-fit px-5 py-1 rounded-full cursor-pointer m-auto">
                                                    <p className="text-xs">Lihat detail</p>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            <div className="flex justify-center items-center text-2xl cursor-pointer gap-3">
                                                <FaEdit className="text-yellow-500" onClick={handleEditModal} />
                                                <MdDelete className="text-red-500" onClick={handleDeleteModal} />
                                            </div>
                                        
                                        </td>
                                    </tr>
                                    
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>

                    
                </div>

            </div>
            
            <ModalForm id="create-modal" modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Tambah data laporan tahunan">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="tahun" className="text-sm font-medium">Tahun</label>
                                    <input type="number" id="tahun" value={tahun} placeholder="Input tahun" onChange={e => { setTahun(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="bg-green-500 text-[#FFFFFF] text-sm font-medium px-5 py-2 rounded-md">Tambah</button>
                            </div>
                        </div>
                    </form>
                </div>
            </ModalForm>

            <ModalForm id="edit-modal" modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Ubah data laporan tahunan">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="tahun" className="text-sm font-medium">Tahun</label>
                                    <input type="number" id="tahun" value={tahun} placeholder="Input tahun" onChange={e => { setTahun(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="bg-green-500 text-[#FFFFFF] text-sm font-medium px-5 py-2 rounded-md">Ubah</button>
                            </div>
                        </div>
                    </form>
                </div>
            </ModalForm>

            <ModalForm id="delete-modal"  modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Hapus data laporan tahunan">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <div>
                                <p className="text-sm">Apakah anda yakin ingin menghapus data ini?</p>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button className="bg-gray-500 text-[#FFFFFF] text-sm font-medium py-2 px-3 rounded-md">Cancel</button>
                                <button type="submit" className="bg-red-500 text-[#FFFFFF] text-sm font-medium py-2 px-3 rounded-md">Hapus</button>
                            </div>
                        </div>
                    </form>
                </div>
            </ModalForm>

        </Layout>
  )
}

export default Laporan