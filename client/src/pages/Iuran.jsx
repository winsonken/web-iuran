import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import 'datatables.net'; // Import DataTables
import Layout from '../Layout/Layout'
import ModalForm from '../components/ModalForm';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import moment from 'moment';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaUserPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { RiPassExpiredFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

const Iuran = () => {
    // Show or Hide Modal
    const [showModal, setShowModal] = useState(false);
    // Set Modal Type
    const [modal, setModal] = useState("");
    const [namaWarga, setNamaWarga] = useState(0);
    const [status, setStatus] = useState("");
    const [warga, setWarga] = useState("");
    const { Month, Year } = useParams();
    const [student, setStudent] = useState([]);
    const tableRef = useRef(null);
    const [nama, setNama] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [date, SetDate] = useState('')
    const [nominal, SetNominal] = useState('')
    const [id, setId] = useState('')
    const [laporan, setLaporan] = useState({}); 
    const navigate = useNavigate();


    function handleSubmit(event) {
        event.preventDefault();
        navigate(`/iuran/${Month}/${Year}`);
        setShowModal(!showModal);
        axios.post(`http://localhost:8081/iuran/${Month}/${Year}`, {nama, month, year, date, nominal})
        .then(res => {
            console.log(res);
            Swal.fire('Berhasil', 'Data telah berhasil ditambah.', 'success').then(() => {
                window.location.reload();
            });
        }).catch(err => console.log(err));
    }

    
    useEffect(() => {
        let counter = 1;
        axios.get(`http://localhost:8081/iuran/${Month}/${Year}`)
            .then(res => {
                console.log(res.data); // Log the received data
                setStudent(res.data);

                if (tableRef.current) {
                    $(tableRef.current).DataTable({
                        destroy: true, // Destroy any existing DataTable instance
                        responsive: true,
                        scrollX: false, // Disable horizontal scrolling
                        autoWidth: false,
                        width: '100%',
                        data: res.data,
                        columns: [
                            { title: 'No', render: function (data, type, row, meta) { // Langkah 2: Tambahkan kolom nomor urut
                                return counter++;
                            } },
                            { title: 'No KK', data: 'KK' },
                            { title: 'Nama', data: 'Nama' },
                            { title: 'Status', data: 'Status', 
                                render: function(data, type, row) {
                                if (row.Expired === 'OVERDUE') {
                                    return 'Overdue';
                                } else {
                                    return data;
                                }
                            }},
                            { title: 'Date', data: 'Date', render: function(data, type, row) {
        
                                const momentDate = moment(data);
                                // Assuming 'Month' is your date column
                                if (momentDate.isValid()) {
                                    return momentDate.format('DD-MM-YYYY'); // Adjust the format as needed
                                } else {
                                    return 'Belum ada'; // Return empty string for invalid dates
                                }
                            } },
                            { title: 'Nominal', data: 'Nominal', render: function(data, type, row) {
                                // Format the Nominal column as currency
                                const formattedNominal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data);
                                return formattedNominal;
                            } },
                            {
                                title: 'Aksi',
                                render: function (data, type, row, meta) {
                                    if (row.Expired === 'OVERDUE') {
                                        console.log("Row Data:", row); // Log the entire row to inspect its structure
                                        const id = row && row.ID; // Check if row is defined before accessing ID
                                        const nama = row && row.Nama; // Check if row is defined before accessing ID
                                        const nominal = row && row.Nominal; // Check if row is defined before accessing ID
                                        const date = row && row.Date; // Check if row is defined before accessing ID
                                        console.log("ID:", id); // Log the extracted ID
                                        const handleDeleteClick = () => {
                                            const id = $(this).data('id');
                                            handleDelete(id);
                                        };
                                        const deleteButton = (
                                            <button
                                                className='btn btn-outline-danger btn-block btn-flat delete-button' data-id={id}
                                                onClick={handleDeleteClick}
                                            >
                                                <MdDelete />
                                            </button>
                                        );
                                        return renderToStaticMarkup(deleteButton);
                                    } else {
                                        console.log("Row Data:", row); // Log the entire row to inspect its structure
                                        const id = row && row.ID; // Check if row is defined before accessing ID
                                        const nama = row && row.Nama; // Check if row is defined before accessing ID
                                        const nominal = row && row.Nominal; // Check if row is defined before accessing ID
                                        const date = row && row.Date; // Check if row is defined before accessing ID
                                        console.log("ID:", id); // Log the extracted ID
                                        const actionButtons = (
                                            <div>
                                              <button
                                                className='btn btn-outline-warning btn-block btn-flat update-button' data-id={id} data-nama={nama} data-date={moment(date).format('YYYY-MM-DD')} data-nominal = {nominal}
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
                                    }
                                    console.log("Row Data:", row); // Log the entire row to inspect its structure
                                    const id = row && row.ID; // Check if row is defined before accessing ID
                                    const nama = row && row.Nama; // Check if row is defined before accessing ID
                                    const nominal = row && row.Nominal; // Check if row is defined before accessing ID
                                    const date = row && row.Date; // Check if row is defined before accessing ID
                                    console.log("ID:", id); // Log the extracted ID
                                    return `
                                        <button data-id=${id} data-nama=${nama} data-nominal=${nominal} data-date=${date} class='btn btn-success update-button'>Update</button>
                                        
                                    `;
                                },
                            },
                        ],
                        createdRow: function (row, data, dataIndex) {
                            // Add rounded corners to each cell in the row
                            $(row).find('td').css('border-radius', '10px');
    
                            // ... your existing createdRow function ...
                        },
                        createdRow: function (row, data, dataIndex) {
                            // Set text color based on the "Status" value
                            const status = data.Status;
                            const expired = data.Expired;
                            const statusCell = $('td:eq(3)', row); // Change 4 to the correct index of the "Status" column
            
                            if (status === 'Lunas') {
                                statusCell.css('color', '#4FAC16'); // Set text color to green
                                statusCell.html(`<span class="bg-[#DCFDD4] text-[#4FAC16] px-4 py-1 rounded-full" style="width: 130px; display: inline-block;">Lunas</span>`);
                            } else if (status === 'On Going' && expired === 'NONE') {
                                statusCell.css('color', 'red'); // Set text color to red
                                // You might want to remove the custom class if status is not "Active"
                                statusCell.html(`<span class="bg-[#FDD4D4] text-[#AC1616] px-4 py-1 rounded-full" style="width: 130px; display: inline-block;">Belum Lunas</span>`);
                            } else if (expired === 'OVERDUE') {
                                statusCell.css('color', 'red'); // Set text color to red
                                // You might want to remove the custom class if status is not "Active"
                                statusCell.html(`<span class="bg-[#7a7979] text-[#000000] px-4 py-1 rounded-full" style="width: 130px; display: inline-block;">Telat Bayar</span>`);
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
                        const g = $(this).data('nominal');
                        const h = $(this).data('date');
                        handleEditModal(e, f, g, h);
                    });
                }
            })
            .catch(err => console.error(err));
    }, [Month, Year]);

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
                await axios.delete(`http://localhost:8081/deletelaporan/${id}`);
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

    const handleExpired = () => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Ini akan mengubah status "Belum Lunas" menjadi "Telat Bayar"',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Ubah!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try{
                // Perform the delete operation if the user confirms
                await axios.put(`http://localhost:8081/iuran/${Month}/${Year}/updateStatus`);
                Swal.fire('Berhasil', 'Data telah berhasil diupdate.', 'success').then(() => {
                    window.location.reload();
                });
                }   catch (err) {
                    console.error('Error in DELETE request:', err);
                    Swal.fire('Gagal', 'Terjadi kesalahan saat update data.', 'error');
                }  
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Dibatalkan', 'Data tidak diupdate.', 'info');
            }
        });
    };

    const handleCancelExpired = () => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Ini akan mengubah status "Telat Bayar" menjadi "Belum Lunas"',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Ubah!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try{
                // Perform the delete operation if the user confirms
                await axios.put(`http://localhost:8081/iuran/${Month}/${Year}/updateStatusCancel`);
                Swal.fire('Berhasil', 'Data telah berhasil diupdate.', 'success').then(() => {
                    window.location.reload();
                });
                }   catch (err) {
                    console.error('Error in DELETE request:', err);
                    Swal.fire('Gagal', 'Terjadi kesalahan saat update data.', 'error');
                }  
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Dibatalkan', 'Data tidak diupdate.', 'info');
            }
        });
    };
    const handleDeleteAll = () => {
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
                await axios.delete(`http://localhost:8081/deleteall/${Month}/${Year}`);
                Swal.fire('Berhasil', 'Data telah berhasil dihapus.', 'success').then(() => {
                    window.location.reload();
                });
                }   catch (err) {
                    console.error('Error in DELETE request:', err);
                    Swal.fire('Gagal', 'Terjadi kesalahan saat update data.', 'error');
                }  
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Dibatalkan', 'Data tidak dihapus.', 'info');
            }
        });
    };

    function handleEditModal(e, f, g, h) {
        axios.get(`http://localhost:8081/iuran/${Month}/${Year}/${id}`)
            .then(res => {
                setId(e || '');
                setNama(f || '');
                SetNominal(g || '');
                SetDate(moment(h).format('YYYY-MM-DD') || '');
        }).catch(err => console.log(err));
            setShowModal(!showModal);
            setModal("edit-modal");

    };

    useEffect(() => {
        axios.get(`http://localhost:8081/iuran/${Month}/${Year}/${id}`)
            .then(res => {
                console.log(res.data); // Log the received data
                setLaporan(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmita(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/iuran/${Month}/${Year}/${id}`, {nama, date, nominal})
        .then(res => {
            Swal.fire('Berhasil', 'Data telah berhasil diupdate.', 'success').then(() => {
                window.location.reload();
            });
        }).catch(err => console.log(err));
    }

    function handleAddModal() {
        setShowModal(!showModal);
        setModal("create-modal");
    }

    // function handleEditModal() {
    //     setShowModal(!showModal);
    //     setModal("edit-modal");
    // }

    function handleDeleteModal() {

    }

    return (
        <Layout>
            <div className="flex flex-col gap-5">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-xl font-bold text-main-orange">Laporan Iuran Tahun {Year} Bulan {Month}</h1>
                    
                    <div className="flex flex-row flex-wrap gap-2">
                        <button className="bg-main-orange flex items-center gap-1 text-[#FFFFFF] px-3 py-2 rounded-md" onClick={handleAddModal}>
                            <FaUserPlus />
                            <p className="text-xs hidden xs:block">Tambah warga</p>
                        </button>

                        <button className='bg-main-orange flex items-center gap-1 text-[#FFFFFF] px-3 py-2 rounded-md' onClick={handleExpired}>
                            <RiPassExpiredFill />
                            <p className="text-xs hidden xs:block">Telat Bayar</p>
                        </button>

                        <button className='bg-main-orange flex items-center gap-1 text-[#FFFFFF] px-3 py-2 rounded-md' onClick={handleCancelExpired}>
                            <MdCancel />
                            <p className="text-xs hidden xs:block">Batal Telat</p>
                        </button>

                        <button className='bg-main-orange flex items-center gap-1 text-[#FFFFFF] px-3 py-2 rounded-md' onClick={handleDeleteAll}>
                            <MdDeleteForever />
                            <p className="text-xs hidden xs:block">Hapus semua</p>
                        </button>
                    </div>
                </div>  

                <div className="bg-[#FFFFFF] text-left border border-main-orange rounded-md overflow-hidden">
                    <div className="p-3 text-left border border-main-orange rounded-md overflow-hidden">
                        <div className="overflow-x-auto rounded-t-md">
                        <table ref={tableRef} className="w-full min-w-full table-auto text-left border border-main-orange rounded-md overflow-hidden" id="example">
                                <thead className="bg-main-orange text-[#FFFFFF] text-center text-xs">
                                    <tr className="h-10">
                                        
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle">No</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle">No. KK</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle">Nama</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle">Status</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle">Date</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle">Nominal</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle">Aksi</th>
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
            
            <ModalForm id="create-modal" modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Tambah data laporan tahun 2023">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="warga" className="text-sm font-medium">Bulan</label>
                                    <input type = "text" value={Month} readonly disabled onChange={e => setMonth(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="warga" className="text-sm font-medium">Tahun</label>
                                    <input type = "text" value={Year} readonly disabled onChange={e => setYear(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
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
                    <form onSubmit={handleSubmita}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="nama-warga" className="text-sm font-medium">Nama warga</label>
                                    <input type="text" id="nama-warga" value={nama} placeholder="Masukkan nama warga" onChange={e => setNama(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="nominal" className="text-sm font-medium">Nominal pembayaran</label>
                                    <input type="number" id="nominal" value={nominal} placeholder="Masukkan nominal" onChange={e => SetNominal(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="date" className="text-sm font-medium">Tanggal pembayaran</label>
                                    <input type="date" id="date" value={date} placeholder="Masukkan nominal" onChange={e => SetDate(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
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
                    <form>
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