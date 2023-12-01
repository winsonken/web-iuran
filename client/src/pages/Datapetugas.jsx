import React, { useEffect, useState, useRef  } from 'react'
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import 'datatables.net'; // Import DataTables
import Layout from '../Layout/Layout'
import ModalForm from '../components/ModalForm';
import { useNavigate } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import moment from 'moment';
import {Link} from 'react-router-dom'


const Datapetugas = () => {
    // Show or Hide Modal
    const [showModal, setShowModal] = useState(false);
    // Set Modal Type
    const [modal, setModal] = useState("");
    const [nama, setNama] = useState("");
    const [jenisKelamin, setJenisKelamin] = useState("");
    const [nik, setNIK] = useState("");
    const [pass, setPass] = useState("");
    const [gender, setGender] = useState("");
    const [kk, setKK] = useState("");
    const [alamat, setAlamat] = useState("");
    const [status, setStatus] = useState("");
    const [id, setId] = useState('')
    const [petugas, setPetugas] = useState([]);
    const tableRef = useRef(null);

    useEffect(() => {
        let counter = 1;
        // Initialize DataTables after data is loaded
        if (tableRef.current) {
            $(tableRef.current).DataTable({
                destroy: true, // Destroy any existing DataTable instance
                data: petugas,
                columns: [
                    { title: 'No', render: function (data, type, row, meta) { // Langkah 2: Tambahkan kolom nomor urut
                        return counter++;
                    } },
                    { title: 'Nama Petugas', data: 'Nama'},
                    { title: 'No NIK', data: 'NIK' },
                    { title: 'Jenis Kelamin', data: 'Gender'},
                    { title: 'Status', data: 'Status'},
                    {
                        title: 'Action',
                        render: function (data, type, row, meta) {
                            console.log("Row Data:", row); // Log the entire row to inspect its structure
                            const id = row && row.ID; // Check if row is defined before accessing ID
                            const pass = row && row.Password; // Check if row is defined before accessing ID
                            const nik = row && row.NIK; // Check if row is defined before accessing ID
                            const nama = row && row.Nama; // Check if row is defined before accessing ID
                            const gender = row && row.Gender; // Check if row is defined before accessing ID
                            const status = row && row.Status; // Check if row is defined before accessing ID
                            console.log("ID:", id); // Log the extracted ID
                            return `
                                <button data-id=${id} data-nama=${nama} data-nik=${nik} data-gender=${gender} data-status=${status} data-pass=${pass}">Update</button>
                                <button class='btn btn-danger delete-button' data-id=${id} >Delete</button>
                            `;
                        },
                    },
                ],
            });
            $(tableRef.current).on('click', '.delete-button', function() {
                const id = $(this).data('id');
                handleDelete(id);
            });
            $(tableRef.current).on('click', '.update-button', function() {
                const e = $(this).data('id');
                const j = $(this).data('pass')
                const f = $(this).data('nama');
                const g = $(this).data('nik');
                const h = $(this).data('gender');
                const i = $(this).data('status');
                handleEditModal(e, f, g, h, i, j);
            });
        }
    }, [petugas]);

    useEffect(() => {
        axios.get('http://localhost:8081/data-petugas')
            .then(res => setPetugas(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/deletepetugas/${id}`);
            window.location.reload();
        } catch (err) {
            console.error('Error in DELETE request:', err);
        }
    };

    const navigate = useNavigate();
    
    function handleSubmit(event) {
        event.preventDefault();
        navigate("/data-petugas");
        setShowModal(!showModal);
        axios.post('http://localhost:8081/data-petugas', {id, pass, nik, nama, gender, status})
        .then(res => {
            console.log(res);
            window.location.reload();
        }).catch(err => console.log(err));
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
                    <h1 className="text-xl text-[#222222] font-medium">Data petugas</h1>
                    
                    <button className="bg-main-orange flex items-center gap-1 text-[#FFFFFF] px-3 py-1 rounded-md" onClick={handleAddModal}>
                        <FaCirclePlus />
                        <p className="text-xs hidden xs:block">Tambah petugas</p>
                    </button>
                </div>  

                <div className="bg-[#FFFFFF] rounded-sm min-w-[150px]">
                    <div className="p-3">
                        <div className="overflow-x-auto rounded-t-md">
                            <table ref={tableRef} className="w-full min-w-full table-auto text-left border border-main-orange" id="example  ">
                                <thead className="bg-main-orange text-[#FFFFFF] text-center text-xs">
                                    <tr className="h-10">
                                        <th scope="col" className="whitespace-nowrap px-2 ">No</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">No.NIK</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Nama</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Gender</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Status</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Aksi</th>
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
            
            <ModalForm id="create-modal" modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Tambah data petugas">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3 justify-center sm:flex-row sm:flex-wrap">
                            <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="nama-petugas" className="text-sm font-medium">ID</label>
                                    <input type="text"  placeholder="Input ID petugas" required onChange={e => setId(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="nama-petugas" className="text-sm font-medium">Password</label>
                                    <input type="password"  placeholder="Input Password petugas" required onChange={e => setPass(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="nama-petugas" className="text-sm font-medium">NIK</label>
                                    <input type="number" placeholder="Input NIK petugas" required onChange={e => setNIK(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>

                                <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="nik" className="text-sm font-medium">Nama</label>
                                    <input type="text" placeholder="Input Nama" required onChange={e => setNama(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow ">
                                    <label htmlFor="jenis-kelamin" className="text-sm font-medium">Jenis kelamin</label>
                                    <select type="text" required onChange={e => setGender(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none">
                                    <option value="" disabled selected>Select Gender...</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow">
                                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                                    <select type="text" required onChange={e => setStatus(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none">
                                    <option value="" disabled selected>Select Status...</option>
                                        <option value="Active">Aktif</option>
                                        <option value="Deactive">Tidak aktif</option>
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
                                    <label htmlFor="nama-petugas" className="text-sm font-medium">Nama</label>
                                    <input type="text" id="nama-petugas" value={nama} placeholder="Input nama petugas" onChange={e => { setNama(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="kk" className="text-sm font-medium">No. KK</label>
                                    <input type="number" id="kk" value={kk} placeholder="Input KK" onChange={e => { setKK(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="nik" className="text-sm font-medium">NIK</label>
                                    <input type="number" id="nik" value={nik} placeholder="Input NIK" onChange={e => { setNIK(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
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

export default Datapetugas