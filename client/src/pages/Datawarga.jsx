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
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { renderToStaticMarkup } from 'react-dom/server';


const Datawarga = () => {
    useEffect(() => {
        document.title = "Data Warga"
      }, []);
    // Show or Hide Modal
    const [showModal, setShowModal] = useState(false);
    // Set Modal Type
    const [modal, setModal] = useState("");
    const [namaWarga, setNamaWarga] = useState("");
    const [jenisKelamin, setJenisKelamin] = useState("");
    const [nik, setNik] = useState("");
    const [kk, setKK] = useState('');
    const [alamat, setAlamat] = useState("");
    const [status, setStatus] = useState("");
    const [warga, setWarga] = useState([]);
    const [nama, setNama] = useState('')
    const [id, setId] = useState('')
    const [auth, setAuth] = useState(false)
    axios.defaults.withCredentials = true;
    const [message, setMessage] = useState('');
    const tableRef = useRef(null);

    // useEffect(() => {
    //     let counter = 1;
    //     // Initialize DataTables after data is loaded
    //     if (tableRef.current) {
    //         $(tableRef.current).DataTable({
    //             destroy: true, // Destroy any existing DataTable instance
    //             data: res.data.data,
    //             scrollX: false, // Disable horizontal scrolling
    //             autoWidth: false,
    //             columns: [
    //                 { title: 'No', render: function (data, type, row, meta) { // Langkah 2: Tambahkan kolom nomor urut
    //                     return counter++;
    //                 } },
    //                 { title: 'No KK', data: 'KK' },
    //                 { title: 'Nama Perwakilan', data: 'Nama'},
    //                 { title: 'Alamat', data: 'Alamat'},
    //                 { title: 'Status', data: 'Status'},
    //                 {
    //                     title: 'Aksi',
    //                     render: function (data, type, row, meta) {
    //                         console.log("Row Data:", row); // Log the entire row to inspect its structure
    //                         const id = row && row.ID; // Check if row is defined before accessing ID
    //                         const kk = row && row.KK; // Check if row is defined before accessing ID
    //                         const nama = row && row.Nama; // Check if row is defined before accessing ID
    //                         const alamat = row && row.Alamat; // Check if row is defined before accessing ID
    //                         const status = row && row.Status; // Check if row is defined before accessing ID
    //                         console.log("ID:", id); // Log the extracted ID
    //                         const actionButtons = (
    //                             <div>
    //                               <button
    //                                 className='btn btn-outline-warning btn-block btn-flat update-button' data-id={id} data-nama={nama} data-kk={kk} data-alamat={alamat} data-status={status}
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
    //             createdRow: function (row, data, dataIndex) {
    //                 // Set text color based on the "Status" value
    //                 const status = data.Status;
    //                 const statusCell = $('td:eq(4)', row); // Change 4 to the correct index of the "Status" column
    
    //                 if (status === 'Active') {
    //                     statusCell.css('color', '#4FAC16'); // Set text color to green
    //                     statusCell.html(`<span class="bg-[#DCFDD4] text-[#4FAC16] px-4 py-1 rounded-full" style="width: 120px; display: inline-block;">Aktif</span>`);
    //                 } else if (status === 'Deactive') {
    //                     statusCell.css('color', 'red'); // Set text color to red
    //                     // You might want to remove the custom class if status is not "Active"
    //                     statusCell.html(`<span class="bg-[#FDD4D4] text-[#AC1616] px-4 py-1 rounded-full" style="width: 120px; display: inline-block;">Tidak Aktif</span>`);
    //                 }
    //             },
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
    //             const f = $(this).data('nama');
    //             const g = $(this).data('kk');
    //             const h = $(this).data('alamat');
    //             const i = $(this).data('status');
    //             handleEditModal(e, f, g, h, i);
    //         });
    //     }
    // }, [warga]);

    function handleSubmit(event) {
        event.preventDefault();
        navigate("/data-warga");
        setShowModal(!showModal);
        axios.post('http://localhost:8081/data-warga', {kk, nama, alamat, status})
        .then(res => {
            console.log(res);
            Swal.fire('Berhasil', 'Data telah berhasil ditambah.', 'success').then(() => {
                window.location.reload();
            });
        }).catch(err => console.log(err));
    }

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
                await axios.delete(`http://localhost:8081/deletewarga/${id}`);
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

    useEffect(() => {
        axios.get('http://localhost:8081/data-warga')
            .then(res => {
                if(res.data.status === "Success") {
                    setAuth(true)
                    setWarga(res.data.data)
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
                                { title: 'No KK', data: 'KK' },
                                { title: 'Nama Perwakilan', data: 'Nama'},
                                { title: 'Alamat', data: 'Alamat'},
                                { title: 'Status', data: 'Status'},
                                {
                                    title: 'Aksi',
                                    render: function (data, type, row, meta) {
                                        console.log("Row Data:", row); // Log the entire row to inspect its structure
                                        const id = row && row.ID; // Check if row is defined before accessing ID
                                        const kk = row && row.KK; // Check if row is defined before accessing ID
                                        const nama = row && row.Nama; // Check if row is defined before accessing ID
                                        const alamat = row && row.Alamat; // Check if row is defined before accessing ID
                                        const status = row && row.Status; // Check if row is defined before accessing ID
                                        console.log("ID:", id); // Log the extracted ID
                                        const actionButtons = (
                                            <div>
                                              <button
                                                className='btn btn-outline-warning btn-block btn-flat update-button' data-id={id} data-nama={nama} data-kk={kk} data-alamat={alamat} data-status={status}
                                              >
                                                <FaEdit />
                                              </button>
                                              <span style={{ marginRight: '8px' }}></span>
                                              <button
                                                className='btn btn-outline-danger btn-block btn-flat delete-button' data-id={id}
                                              >
                                                <MdDelete />
                                              </button>
            
                                            </div>
                                          );
                                      
                                          return renderToStaticMarkup(actionButtons);
                                    },
                                },
                            ],
                            createdRow: function (row, data, dataIndex) {
                                // Set text color based on the "Status" value
                                const status = data.Status;
                                const statusCell = $('td:eq(4)', row); // Change 4 to the correct index of the "Status" column
                
                                if (status === 'Active') {
                                    statusCell.css('color', '#4FAC16'); // Set text color to green
                                    statusCell.html(`<span class="bg-[#DCFDD4] text-[#4FAC16] px-4 py-1 rounded-full" style="width: 120px; display: inline-block;">Aktif</span>`);
                                } else if (status === 'Deactive') {
                                    statusCell.css('color', 'red'); // Set text color to red
                                    // You might want to remove the custom class if status is not "Active"
                                    statusCell.html(`<span class="bg-[#FDD4D4] text-[#AC1616] px-4 py-1 rounded-full" style="width: 120px; display: inline-block;">Tidak Aktif</span>`);
                                }
                            },
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
                            const f = $(this).data('nama');
                            const g = $(this).data('kk');
                            const h = $(this).data('alamat');
                            const i = $(this).data('status');
                            handleEditModal(e, f, g, h, i);
                        });
                    }
                } else {
                    setAuth(false)
                    Swal.fire('Gagal', 'Kamu Tidak Memiliki Authentikasi', 'error').then(() => {
                        navigate(-1)
                    });
                }
            })
    }, []);

    const navigate = useNavigate();


    function handleAddModal() {
        setShowModal(!showModal);
        setModal("create-modal");
    }

    function handleEditModal(e, f, g, h, i) {
        axios.get(`http://localhost:8081/data-warga/${id}`)
            .then(res => {
                setId(e || '');
                setNama(f || '');
                setKK(g || '');
                setAlamat(h || '');
                setStatus(i || '');
        }).catch(err => console.log(err));
            setShowModal(!showModal);
            setModal("edit-modal");

    };

    useEffect(() => {
        axios.get(`http://localhost:8081/data-warga/${id}`)
            .then(res => {
                console.log(res.data); // Log the received data
                setLaporan(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmita(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/data-warga/${id}`, {nama, kk, alamat, status})
        .then(res => {
            console.log(res);
            Swal.fire('Berhasil', 'Data telah berhasil diupdate.', 'success').then(() => {
                window.location.reload();
            });
        }).catch(err => console.log(err));
    }

    function handleDeleteModal() {
        setShowModal(!showModal);
        setModal("delete-modal");
    }

    return (
        <Layout>
            {auth 
            ?
            <div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <h1 className="text-xl font-bold text-main-orange">Data warga</h1>
                    
                    <button className="bg-main-orange flex items-center gap-1 text-[#FFFFFF] px-3 py-1 rounded-md" onClick={handleAddModal}>
                        <FaCirclePlus />
                        <p className="text-xs hidden xs:block">Tambah warga</p>
                    </button>
                </div>  

                <div className="bg-[#FFFFFF] text-left border border-main-orange rounded-md overflow-hidden">
                    <div className="p-3 text-left border border-main-orange rounded-md overflow-hidden">
                        <div className="overflow-x-auto rounded-t-md">
                        <table ref={tableRef} className="w-full min-w-full table-auto text-left border border-main-orange rounded-md overflow-hidden" id="example">
                                <thead className="bg-main-orange text-[#FFFFFF] text-center text-xs">
                                    <tr className="h-10">
                                        <th scope="col" className="whitespace-nowrap px-2 text-center align-middle ">No</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle ">No KK</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle ">Nama</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle ">Alamat</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle ">Status</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle ">Aksi</th>
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
            
            <ModalForm id="create-modal" modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Tambah data warga">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3 justify-center sm:flex-row sm:flex-wrap">
                                <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="nama-warga" className="text-sm font-medium">Nama</label>
                                    <input type="text" placeholder="Masukkan nama Warga" required onChange={e => setNama(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="kk" className="text-sm font-medium">No. KK</label>
                                    <input type="number" placeholder="Masukkan No.KK" onInput={(e) => e.target.value = e.target.value.slice(0, 16)} required onChange={e => setKK(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow ">
                                    <label htmlFor="alamat" className="text-sm font-medium">Alamat</label>
                                    <input type="text" placeholder="Masukkan alamat" required onChange={e => setAlamat(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow">
                                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                                    <select name="status" id="status" required onChange={e => setStatus(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none">
                                        <option value="" disabled selected>Pilih Status...</option>
                                        <option value="Active">Aktif</option>
                                        <option value="Deactive">Tidak Aktif</option>
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
                    <form onSubmit={handleSubmita}>
                        <div className="flex flex-col gap-5">
                            
                        <div className="flex flex-col gap-3 justify-center sm:flex-row sm:flex-wrap">
                                <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="nama-warga" className="text-sm font-medium">Nama</label>
                                    <input type="text" id="nama-warga" value={nama} placeholder="Masukkan nama warga" required onChange={e => setNama(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow  ">
                                    <label htmlFor="kk" className="text-sm font-medium">No. KK</label>
                                    <input type="number" id="kk" value={kk} placeholder="Masukkan No.KK" required onInput={(e) => e.target.value = e.target.value.slice(0, 16)} onChange={e => setKK(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow ">
                                    <label htmlFor="alamat" className="text-sm font-medium">Alamat</label>
                                    <input type="text" id="alamat" value={alamat} placeholder="Masukkan alamat" required onChange={e => setAlamat(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-44 grow">
                                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                                    <select name="status" id="status" value = {status} required onChange={e => setStatus(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none">
                                    <option value="" disabled selected>Pilih Status...</option>
                                        <option value="Active">Aktif</option>
                                        <option value="Deactive">Tidak Aktif</option>
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
            </div>
            :
            <div></div>
}
        </Layout>

  )
}

export default Datawarga