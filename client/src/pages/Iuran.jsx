import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import ModalForm from '../components/ModalForm';
import { Link, useNavigate } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Iuran = () => {
    // Show or Hide Modal
    const [showModal, setShowModal] = useState(false);
    // Set Modal Type
    const [modal, setModal] = useState("");
    const [namaWarga, setNamaWarga] = useState(0);
    const [nominal, setNominal] = useState(0);
    const [status, setStatus] = useState("");
    const [warga, setWarga] = useState("");

    const navigate = useNavigate();
    
    function handleSubmit(e) {
        e.preventDefault();
        navigate("/iuran");
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
                    <h1 className="text-xl text-[#222222] font-medium">Laporan Iuran tahun 2023 bulan Januari</h1>
                    
                    <button className="bg-main-orange flex items-center gap-1 text-[#FFFFFF] px-3 py-1 rounded-md" onClick={handleAddModal}>
                        <FaCirclePlus />
                        <p className="text-xs hidden xs:block">Tambah warga</p>
                    </button>
                </div>  

                <div className="bg-[#FFFFFF] rounded-sm min-w-[150px]">
                    <div className="p-3">
                        <div className="overflow-x-auto rounded-t-md">
                            <table className="w-full min-w-full table-auto text-left border border-main-orange">
                                <thead className="bg-main-orange text-[#FFFFFF] text-center text-xs">
                                    <tr className="h-10">
                                        <th scope="col" className="whitespace-nowrap px-2 ">No</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Nama warga</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">No. KK</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Nominal pembayaran</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Status</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Aksi</th>
                                    </tr>
                                </thead>

                                <tbody className="font-medium text-xs text-center">
                                    <tr className="border border-b border-main-orange">
                                        <td className="whitespace-nowrap px-2 py-3 ">1</td>
                                        <td className="whitespace-nowrap px-3 py-3">Sunoto</td>
                                        <td className="whitespace-nowrap px-3 py-3">123456789</td>
                                        <td className="whitespace-nowrap px-3 py-3">Rp. 0</td>
                                        <td className="whitespace-nowrap px-3 py-3 ">
                                            <Link to="/iuran">
                                                <div className="bg-[#DCFDD4] text-[#4FAC16] w-fit px-5 py-1 rounded-full cursor-pointer m-auto">
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
            
            <ModalForm id="create-modal" modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Tambah data laporan tahun 2023">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="warga" className="text-sm font-medium">Warga</label>
                                    <select name="warga" id="warga" value={warga} onChange={e => { setWarga(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none">
                                        <option selected hidden>Pilih warga</option>
                                        <option value="sunoto">Sunoto</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="bg-green-500 text-[#FFFFFF] text-sm font-medium px-5 py-2 rounded-md">Tambah</button>
                            </div>
                        </div>
                    </form>
                </div>
            </ModalForm>

            <ModalForm id="edit-modal" modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Ubah data laporan">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="nama-warga" className="text-sm font-medium">Nama warga</label>
                                    <input type="number" id="nama-warga" value={namaWarga} placeholder="Input nama warga" onChange={e => { setNamaWarga(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="nominal" className="text-sm font-medium">Nominal pembayaran</label>
                                    <input type="number" id="nominal" value={nominal} placeholder="Input nominal" onChange={e => { setNominal(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                                    <select name="status" id="status" value={status} onChange={e => { setStatus(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none">
                                        <option selected hidden>Pilih status</option>
                                        <option value="aktif">Aktif</option>
                                        <option value="tidak-aktif">Tidak aktif</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="bg-green-500 text-[#FFFFFF] text-sm font-medium px-5 py-2 rounded-md">Ubah</button>
                            </div>
                        </div>
                    </form>
                </div>
            </ModalForm>

            <ModalForm id="delete-modal"  modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Hapus data laporan tahun 2023">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <div>
                                <p className="text-sm">Apakah anda yakin ingin menghapus data ini?</p>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button className="bg-gray-500 text-[#FFFFFF] text-sm font-medium py-2 px-3 rounded-md" onClick={() => {console.log(setShowModal)}}>Cancel</button>
                                <button type="submit" className="bg-red-500 text-[#FFFFFF] text-sm font-medium py-2 px-3 rounded-md">Hapus</button>
                            </div>
                        </div>
                    </form>
                </div>
            </ModalForm>

        </Layout>
  )
}

export default Iuran