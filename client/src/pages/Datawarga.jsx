import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import ModalForm from '../components/ModalForm';
import { useNavigate } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const Datawarga = () => {
    // Show or Hide Modal
    const [showModal, setShowModal] = useState(false);
    // Set Modal Type
    const [modal, setModal] = useState("");
    const [namaWarga, setNamaWarga] = useState("");
    const [jenisKelamin, setJenisKelamin] = useState("");
    const [nik, setNik] = useState("");
    const [kk, setKK] = useState("");
    const [alamat, setAlamat] = useState("");
    const [status, setStatus] = useState("");

    const navigate = useNavigate();
    
    function handleSubmit(e) {
        e.preventDefault();
        navigate("/data-warga");
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
                    <h1 className="text-xl text-[#222222] font-medium">Data warga</h1>
                    
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
                                        <th scope="col" className="whitespace-nowrap px-3 ">Jenis kelamin</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">NIK</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">No. KK</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Status</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Aksi</th>
                                    </tr>
                                </thead>

                                <tbody className="font-medium text-xs text-center">
                                    <tr className="border border-b border-main-orange">
                                        <td className="whitespace-nowrap px-2 py-3 ">1</td>
                                        <td className="whitespace-nowrap px-3 py-3">Vincent</td>
                                        <td className="whitespace-nowrap px-3 py-3 ">Laki-laki</td>
                                        <td className="whitespace-nowrap px-3 py-3 ">123456789</td>
                                        <td className="whitespace-nowrap px-3 py-3 ">123456789</td>
                                        <td className="whitespace-nowrap px-3 py-3 ">
                                            <div className="bg-[#DCFDD4] text-[#4FAC16] w-fit px-8 py-1 rounded-full m-auto">
                                                <p className="text-xs">Aktif</p>
                                            </div>
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
            
            <ModalForm id="create-modal" modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Tambah data warga">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3 justify-center sm:flex-row sm:flex-wrap">
                                <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="nama-warga" className="text-sm font-medium">Nama</label>
                                    <input type="text" id="nama-warga" value={namaWarga} placeholder="Input nama Warga" onChange={e => { setNamaWarga(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="kk" className="text-sm font-medium">No. KK</label>
                                    <input type="number" id="kk" value={kk} placeholder="Input KK" onChange={e => { setKK(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="nik" className="text-sm font-medium">NIK</label>
                                    <input type="number" id="nik" value={nik} placeholder="Input NIK" onChange={e => { setNik(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow ">
                                    <label htmlFor="jenis-kelamin" className="text-sm font-medium">Jenis kelamin</label>
                                    <select name="jenis-kelamin" id="jenis-kelamin" onChange={e => { setJenisKelamin(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none">
                                        <option selected hidden>Pilih jenis kelamin</option>
                                        <option value="laki-laki">Laki-laki</option>
                                        <option value="perempuan">Perempuan</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow ">
                                    <label htmlFor="alamat" className="text-sm font-medium">Alamat</label>
                                    <input type="text" id="alamat" value={alamat} placeholder="Input alamat" onChange={e => { setAlamat(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow">
                                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                                    <select name="status" id="status" onChange={e => { setStatus(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none">
                                        <option selected hidden>Pilih status</option>
                                        <option value="aktif">Aktif</option>
                                        <option value="tidak-aktif">Tidak aktif</option>
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

            <ModalForm id="edit-modal" modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Ubah data pengeluaran">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            
                        <div className="flex flex-col gap-3 justify-center sm:flex-row sm:flex-wrap">
                                <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="nama-warga" className="text-sm font-medium">Nama</label>
                                    <input type="text" id="nama-warga" value={namaWarga} placeholder="Input nama warga" onChange={e => { setNamaWarga(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="kk" className="text-sm font-medium">No. KK</label>
                                    <input type="number" id="kk" value={kk} placeholder="Input KK" onChange={e => { setKK(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="nik" className="text-sm font-medium">NIK</label>
                                    <input type="number" id="nik" value={nik} placeholder="Input NIK" onChange={e => { setNik(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow ">
                                    <label htmlFor="jenis-kelamin" className="text-sm font-medium">Jenis kelamin</label>
                                    <select name="jenis-kelamin" id="jenis-kelamin" onChange={e => { setJenisKelamin(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none">
                                        <option selected hidden>Pilih jenis kelamin</option>
                                        <option value="laki-laki">Laki-laki</option>
                                        <option value="perempuan">Perempuan</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow ">
                                    <label htmlFor="alamat" className="text-sm font-medium">Alamat</label>
                                    <input type="text" id="alamat" value={alamat} placeholder="Input alamat" onChange={e => { setAlamat(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow">
                                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                                    <select name="status" id="status" onChange={e => { setStatus(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none">
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

            <ModalForm id="delete-modal"  modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Hapus data pengeluaran">
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

export default Datawarga