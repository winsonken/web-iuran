import React, { useEffect, useState, useRef  } from 'react'
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import 'datatables.net'; // Import DataTables
import Layout from '../../Layout/UserLayout'
import ModalForm from '../../components/ModalForm';
import { useNavigate } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import moment from 'moment';
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { renderToStaticMarkup } from 'react-dom/server';


const PengeluaranUser = () => {
    // Show or Hide Modal
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState("");
    const [nominal, setNominal] = useState(0);
    const [id, setId] = useState('')
    const [pengeluaran, setPengeluaran] = useState([]);
    const [keterangan, setKeterangan] = useState("");
    const [auth, setAuth] = useState(false);
    axios.defaults.withCredentials = true;
    const tableRef = useRef(null);

    const navigate = useNavigate();

    // useEffect(() => {
    //     let counter = 1;
    //     // Initialize DataTables after data is loaded
    //     if (tableRef.current) {
    //         $(tableRef.current).DataTable({
    //             destroy: true, // Destroy any existing DataTable instance
    //             data: pengeluaran,
    //             scrollX: false, // Disable horizontal scrolling
    //             autoWidth: false,
    //             columns: [
    //                 { title: 'No', render: function (data, type, row, meta) { // Langkah 2: Tambahkan kolom nomor urut
    //                     return counter++;
    //                 } },
    //                 { title: 'Nominal', data: 'Nominal', render: function(data, type, row) {
    //                     // Format the Nominal column as currency
    //                     const formattedNominal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data);
    //                     return formattedNominal;
    //                 } },
    //                 { title: 'Keterangan', data: 'Keterangan'},
    //                 {
    //                     title: 'Aksi',
    //                     render: function (data, type, row, meta) {
    //                         console.log("Row Data:", row); // Log the entire row to inspect its structure
    //                         const id = row && row.ID; // Check if row is defined before accessing ID
    //                         const nominal = row && row.Nominal; // Check if row is defined before accessing ID
    //                         const keterangan = row && row.Keterangan; // Check if row is defined before accessing ID
    //                         console.log("ID:", id); // Log the extracted ID
    //                         const actionButtons = (
    //                             <div>
    //                               <button
    //                                 className='btn btn-outline-warning btn-block btn-flat update-button' data-id={id} data-nominal = {nominal} data-keterangan = {keterangan}
    //                               >
    //                                 <FaEdit />
    //                               </button>
    //                               <span style={{ marginRight: '8px' }}></span>
    //                               <button
    //                                 className='btn btn-outline-danger btn-block btn-flat delete-button' data-id={id}
    //                               >
    //                                 <MdDelete />
    //                               </button>

    //                             </div>
    //                           );
                          
    //                           return renderToStaticMarkup(actionButtons);
    //                     },
    //                 },
    //             ],
    //         });
    //         const searchInput = $(tableRef.current).closest('.dataTables_wrapper').find('input[type="search"]');
    //         searchInput.css('margin-bottom', '10px'); // Adjust the margin as needed
    //         searchInput.css({
    //             'text-align': 'left',
    //             'margin-right': '3px', // Optional: Adjust the margin as needed
    //             'width': '200px' // Optional: Adjust the width as needed
    //         });
    //         $(tableRef.current).on('click', '.delete-button', function() {
    //             const id = $(this).data('id');
    //             handleDelete(id);
    //         });
    //         $(tableRef.current).on('click', '.update-button', function() {
    //             const e = $(this).data('id');
    //             const f = $(this).data('nominal');
    //             const g = $(this).data('keterangan');
    //             handleEditModal(e, f, g);
    //         });
    //     }
    // }, [pengeluaran]);

    function handleSubmit(event) {
        event.preventDefault();
        navigate("/pengeluaran");
        setShowModal(!showModal);
        axios.post('http://localhost:8081/pengeluaran', {nominal, keterangan})
        .then(res => {
            console.log(res);
            Swal.fire('Berhasil', 'Data telah berhasil ditambah.', 'success').then(() => {
                window.location.reload();
            });
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get('http://localhost:8081/pengeluaran-user')
            .then(res => {
                if(res.data.status === "Success") {
                    setAuth(true)
                    setPengeluaran(res.data.data)
                    let counter = 1;
                    if (tableRef.current) {
                        $(tableRef.current).DataTable({
                            destroy: true, // Destroy any existing DataTable instance
                            data: res.data.data,
                            scrollX: false, // Disable horizontal scrolling
                            autoWidth: false,
                            columns: [
                                { title: 'No', render: function (data, type, row, meta) { // Langkah 2: Tambahkan kolom nomor urut
                                    return counter++;
                                } },
                                { title: 'Nominal', data: 'Nominal', render: function(data, type, row) {
                                    // Format the Nominal column as currency
                                    const formattedNominal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data);
                                    return formattedNominal;
                                } },
                                { title: 'Keterangan', data: 'Keterangan'},
                                
                            ],
                        });
                        const searchInput = $(tableRef.current).closest('.dataTables_wrapper').find('input[type="search"]');
                        searchInput.css('margin-bottom', '10px'); // Adjust the margin as needed
                        searchInput.css({
                            'text-align': 'left',
                            'margin-right': '3px', // Optional: Adjust the margin as needed
                            'width': '200px' // Optional: Adjust the width as needed
                        });
                        $(tableRef.current).on('click', '.delete-button', function() {
                            const id = $(this).data('id');
                            handleDelete(id);
                        });
                        $(tableRef.current).on('click', '.update-button', function() {
                            const e = $(this).data('id');
                            const f = $(this).data('nominal');
                            const g = $(this).data('keterangan');
                            handleEditModal(e, f, g);
                        });
                    }
                }else {
                    setAuth(false)
                    Swal.fire('Gagal', 'Kamu Tidak Memiliki Authentikasi', 'error').then(() => {
                        navigate(-1)
                    });
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8081/pengeluaran/${id}`)
            .then(res => {
                console.log(res.data); // Log the received data
                setPengeluaran(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleAddModal() {
        setShowModal(!showModal);
        setModal("create-modal");
    }

    function handleEditModal(e, f, g, h, i) {
        axios.get(`http://localhost:8081/data-warga/${id}`)
            .then(res => {
                setId(e || '');
                setNominal(f || '');
                setKeterangan(g || '');
        }).catch(err => console.log(err));
            setShowModal(!showModal);
            setModal("edit-modal");

    };

    const handleDelete = async (id) => {
        // Use SweetAlert to show a confirmation dialog
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Anda tidak akan dapat mengembalikan ini!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try{
                // Perform the delete operation if the user confirms
                await axios.delete(`http://localhost:8081/deletepengeluaran/${id}`);
                Swal.fire('Berhasil', 'Data telah berhasil dihapus.', 'success').then(() => {
                    window.location.reload();
                });
                }   catch (err) {
                    console.error('Error in DELETE request:', err);
                    Swal.fire('Gagal', 'Terjadi kesalahan saat menghapus data.', 'error');
                }  
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Dibatalkan', 'Data tidak dihapus.', 'info');
            }
        });
    };

    function handleSubmita(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/pengeluaran/${id}`, {nominal, keterangan})
        .then(res => {
            console.log(res);
            Swal.fire('Berhasil', 'Data telah berhasil diupdate.', 'success').then(() => {
                window.location.reload();
            });
        }).catch(err => console.log(err));
    }

    return (
        <Layout>
            { auth ?
            <div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <h1 className="text-xl font-bold text-main-orange">Pengeluaran</h1>
                </div>  

                <div className="bg-[#FFFFFF] text-left border border-main-orange rounded-md overflow-hidden">
                    <div className="p-3 text-left border border-main-orange rounded-md overflow-hidden">
                        <div className="overflow-x-auto rounded-t-md">
                        <table ref={tableRef} className="w-full min-w-full table-auto text-left border border-main-orange rounded-md overflow-hidden" id="example">
                                <thead className="bg-main-orange text-[#FFFFFF] text-xs text-center">
                                    <tr className="h-10">
                                        <th scope="col" className="whitespace-nowrap px-2 text-center align-middle ">No</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle ">Nominal</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle ">Keterangan</th>
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
            
            <ModalForm id="create-modal" modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Tambah data pengeluaran">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                    <label htmlFor="nominal" className="text-sm font-medium">Nominal</label>
                                    <input type="number" placeholder="Masukkan nominal" required onChange={e => setNominal(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="keterangan" className="text-sm font-medium">Keterangan</label>
                                    <input type="text" placeholder="Masukkan keterangan" required onChange={e => setKeterangan(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
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
                    <form onSubmit={handleSubmita}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="nominal" className="text-sm font-medium">Nominal</label>
                                    <input type="text" id="nominal" value={nominal} placeholder="Masukkan nominal" required onChange={e => setNominal(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="keterangan" className="text-sm font-medium">Keterangan</label>
                                    <input type="text" id="keterangan" value={keterangan} placeholder="Masukkan keterangan" required onChange={e => setKeterangan(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
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
            </div>
            :
            <div></div>
            }
        </Layout>
  )
}

export default PengeluaranUser