import React, { useEffect, useState, useRef } from 'react'
import PetugasLayout from '../../Layout/PetugasLayout';
import ModalForm from '../../components/ModalForm';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import 'datatables.net'; // Import DataTables
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { renderToStaticMarkup } from 'react-dom/server';

const TahunPetugas = () => {
    useEffect(() => {
        document.title = "Laporan Tahunan"
      }, []);

    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState("");
    const [bulan, setBulan] = useState(0);
    const [month, setMonth] = useState({});
    const [months, setMonths] = useState('')
    const [year, setYear] = useState('')
    const { id } = useParams();
    const [auth, setAuth] = useState(false);
    axios.defaults.withCredentials = true;
    const tableRef = useRef(null);

    function handleSubmit(event) {
        event.preventDefault();
        navigate(`/tahun-petugas/${id}`);
        setShowModal(!showModal);
        axios.post(`http://localhost:8081/tahun/${id}`, {month, year})
        .then(res => {
            console.log(res);
            Swal.fire('Berhasil', 'Data telah berhasil ditambah.', 'success').then(() => {
                window.location.reload();
            });
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get(`http://localhost:8081/tahun-petugas/${id}`)
        .then(res => {
            if(res.data.status === "Success") {
                setAuth(true)
                setYear(res.data.data);
                let counter = 1;
                if (tableRef.current) {
                    let bulan, tahun;
                    $(tableRef.current).DataTable({
                        destroy: true, // Destroy any existing DataTable instance
                        data: res.data.data,
                        searching: false, // Hide search bar
                        lengthChange: false, // Hide show entries dropdown
                        pageLength: 12, // Set the number of rows per page
                        paging: false, // Disable pagination
                        info: false, 
                        scrollX: false, // Disable horizontal scrolling
                        autoWidth: false,
                        columns: [
                            { title: 'No', render: function (data, type, row, meta) {
                                return counter++;
                            } },
                            { title: 'Bulan', data: 'bulan'},
                            { title: 'Tahun', data: 'tahun'},
                            { title: 'Detail', render: function (data, type, row, meta) {
                                const id = row.ID;
                                bulan = row.bulan; // replace 'id' with the actual field name from your data
                                tahun = row.tahun; // replace 'tahun' with the actual field name from your data
                                return `
                                    <a href="/iuran-petugas/${bulan}/${tahun}">Open</a>
                                `;
                            },},
                            {
                                title: 'Aksi',
                                render: function (data, type, row, meta) {
                                    const id = row.ID;
                            
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
                                },
                            },
                        ],
                        createdRow: function (row, data, dataIndex) {
                            // Set text color based on the "Status" value
                            const statusCell = $('td:eq(3)', row); // Change 4 to the correct index of the "Status" column
                                statusCell.css('color', '#4FAC16'); // Set text color to green
                                statusCell.html(`<a href="/iuran-petugas/${bulan}/${tahun}"><span class="bg-[#F9E3D0] text-[#FF9130] px-4 py-1 rounded-full" style="width: 120px; display: inline-block;">Lihat Detail</span></a>`);
                            },
                    });
                    const searchInput = $(tableRef.current).closest('.dataTables_wrapper').find('input[type="search"]');
                    searchInput.css('margin-bottom', '10px'); // Adjust the margin as needed
                    $(tableRef.current).on('click', '.delete-button', function() {
                        const id = $(this).data('id');
                        handleDelete(id);
                    });
                }
            }else {
                setAuth(false)
                Swal.fire('Gagal', 'Kamu Tidak Memiliki Authentikasi', 'error').then(() => {
                    navigate(-1)
                });
            }
        })
    }, [id])

    // useEffect(() => {
    //     let counter = 1;
    //     axios.get(`http://localhost:8081/tahun/${id}`)
    //         .then(res => {
    //             console.log(res.data); // Log the received data
    //             setMonth(res.data);
    //             if (tableRef.current) {
    //                 let bulan, tahun;
    //                 $(tableRef.current).DataTable({
    //                     destroy: true, // Destroy any existing DataTable instance
    //                     data: res.data,
    //                     searching: false, // Hide search bar
    //                     lengthChange: false, // Hide show entries dropdown
    //                     pageLength: 12, // Set the number of rows per page
    //                     paging: false, // Disable pagination
    //                     info: false, 
    //                     scrollX: false, // Disable horizontal scrolling
    //                     autoWidth: false,
    //                     columns: [
    //                         { title: 'No', render: function (data, type, row, meta) {
    //                             return counter++;
    //                         } },
    //                         { title: 'Bulan', data: 'bulan'},
    //                         { title: 'Tahun', data: 'tahun'},
    //                         { title: 'Details', render: function (data, type, row, meta) {
    //                             const id = row.ID;
    //                             bulan = row.bulan; // replace 'id' with the actual field name from your data
    //                             tahun = row.tahun; // replace 'tahun' with the actual field name from your data
    //                             return `
    //                                 <a href="/iuran/${bulan}/${tahun}">Open</a>
    //                             `;
    //                         },},
    //                         {
    //                             title: 'Aksi',
    //                             render: function (data, type, row, meta) {
    //                                 const id = row.ID;
                            
    //                                 const handleDeleteClick = () => {
    //                                     const id = $(this).data('id');
    //                                     handleDelete(id);
    //                                 };
                            
    //                                 const deleteButton = (
    //                                     <button
    //                                         className='btn btn-outline-danger btn-block btn-flat delete-button' data-id={id}
    //                                         onClick={handleDeleteClick}
    //                                     >
    //                                         <MdDelete />
    //                                     </button>
    //                                 );
                            
    //                                 return renderToStaticMarkup(deleteButton);
    //                             },
    //                         },
    //                     ],
    //                     createdRow: function (row, data, dataIndex) {
    //                         // Set text color based on the "Status" value
    //                         const statusCell = $('td:eq(3)', row); // Change 4 to the correct index of the "Status" column
    //                             statusCell.css('color', '#4FAC16'); // Set text color to green
    //                             statusCell.html(`<a href="/iuran/${bulan}/${tahun}"><span class="bg-[#F9E3D0] text-[#FF9130] px-4 py-1 rounded-full" style="width: 120px; display: inline-block;">Lihat Detail</span></a>`);
    //                         },
    //                 });
    //                 const searchInput = $(tableRef.current).closest('.dataTables_wrapper').find('input[type="search"]');
    //                 searchInput.css('margin-bottom', '10px'); // Adjust the margin as needed
    //                 $(tableRef.current).on('click', '.delete-button', function() {
    //                     const id = $(this).data('id');
    //                     handleDelete(id);
    //                 });
    //             }
    //         })
    //         .catch(err => console.error(err));
    // }, [id]);

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
                await axios.delete(`http://localhost:8081/deletebulan/${id}`);
                Swal.fire('Berhasil', 'Data telah berhasil dihapus.', 'info').then(() => {
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


    const navigate = useNavigate();


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
        <PetugasLayout>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <h1 className="text-xl font-bold text-main-orange">Laporan tahun {id}</h1>
                    
                    <button className="bg-main-orange flex items-center gap-1 text-[#FFFFFF] px-3 py-1 rounded-md" onClick={handleAddModal}>
                        <FaCirclePlus />
                        <p className="text-xs hidden xs:block">Tambah bulan</p>
                    </button>
                </div>  

                <div className="bg-[#FFFFFF] text-left border border-main-orange rounded-md overflow-hidden">
                    <div className="p-3 text-left border border-main-orange rounded-md overflow-hidden">
                        <div className="overflow-x-auto rounded-t-md">
                            <table ref={tableRef} className="w-full min-w-full table-auto text-left border border-main-orange" id="example">
                                <thead className="bg-main-orange text-[#FFFFFF] text-center text-xs">
                                    <tr className="h-10">
                                        <th scope="col" className="whitespace-nowrap px-2 text-center align-middle ">No</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle ">Tahun</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle ">Bulan</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle ">Detail</th>
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
            
            <ModalForm id="create-modal" modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Tambah data laporan tahun 2023">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="bulan" className="text-sm font-medium">Bulan</label>
                                    <select type="text" placeholder="Input bulan" required onChange={e => setMonth(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none">
                                    <option value="" disabled selected>Pilih Bulan...</option>
                                    <option value="Januari">Januari</option>
                                    <option value="Februari">Februari</option>
                                    <option value="Maret">Maret</option>
                                    <option value="April">April</option>
                                    <option value="Mei">Mei</option>
                                    <option value="Juni">Juni</option>
                                    <option value="Juli">Juli</option>
                                    <option value="Agustus">Agustus</option>
                                    <option value="September">September</option>
                                    <option value="Oktober">Oktober</option>
                                    <option value="November">November</option>
                                    <option value="Desember">Desember</option>
                                    </select>
                                </div>
                            </div>
{/* 
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                <label hidden htmlFor="Tahun" className="text-sm font-medium">Tahun</label>
                                <input hidden type = "number" className='form-control' value={id} readonly disabled onChange={e => setYear(e.target.value)}/>
                                </div>
                                </div> */}

                            <div className="flex justify-end">
                                <button type="submit" className="bg-green-500 text-[#FFFFFF] text-sm font-medium px-5 py-2 rounded-md">Tambah</button>
                            </div>
                        </div>
                    </form>
                </div>
            </ModalForm>

            <ModalForm id="edit-modal" modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Ubah data laporan tahun 2023">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="bulan" className="text-sm font-medium">Bulan</label>
                                    <input type="number" id="bulan" value={bulan} placeholder="Input bulan" onChange={e => { setBulan(e.target.value)}} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none"/>
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

        </PetugasLayout>
  )
}

export default TahunPetugas