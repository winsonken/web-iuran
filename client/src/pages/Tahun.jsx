import React, { useEffect, useState, useRef } from 'react'
import Layout from '../Layout/Layout'
import ModalForm from '../components/ModalForm';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import 'datatables.net'; // Import DataTables

const Tahun = () => {
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState("");
    const [bulan, setBulan] = useState(0);
    const [month, setMonth] = useState([]);
    const [months, setMonths] = useState('')
    const [year, setYear] = useState('')
    const { id } = useParams();
    const tableRef = useRef(null);

    function handleSubmit(event) {
        event.preventDefault();
        navigate(`/tahun/${id}`);
        setShowModal(!showModal);
        axios.post(`http://localhost:8081/tahun/${id}`, {month, year})
        .then(res => {
            console.log(res);
            window.location.reload();
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get(`http://localhost:8081/tahun/${id}`)
            .then(res => {
                console.log(res.data); // Log the received data
                setMonth(res.data);

                if (tableRef.current) {
                    $(tableRef.current).DataTable({
                        destroy: true, // Destroy any existing DataTable instance
                        data: res.data,
                        columns: [
                            { title: 'No', render: function (data, type, row, meta) {
                                return meta.row + 1;
                            } },
                            { title: 'Tahun', data: 'tahun'},
                            { title: 'Bulan', data: 'bulan'},
                            {
                                title: 'Aksi',
                                render: function (data, type, row, meta) {
                                    const id = row.ID;
                                    const bulan = row.bulan; // replace 'id' with the actual field name from your data
                                    const tahun = row.tahun; // replace 'tahun' with the actual field name from your data
                                    return `
                                        <a href="/iuran/${bulan}/${tahun}" class='btn btn-success'>Open</a>
                                        <button class='btn btn-danger delete-button' data-id=${id}>Delete</button>
                                    `;
                                },
                            },
                        ],
                    });
                    $(tableRef.current).on('click', '.delete-button', function() {
                        const id = $(this).data('id');
                        handleDelete(id);
                    });
                }
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleDelete = async (id) => {
        setShowModal(!showModal);
        
        try {
            await axios.delete(`http://localhost:8081/deletebulan/${id}`);
            window.location.reload();
        } catch (err) {
            console.error('Error in DELETE request:', err);
        }
        setModal("delete-modal");
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
        <Layout>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <h1 className="text-xl text-[#222222] font-medium">Laporan tahun 2023</h1>
                    
                    <button className="bg-main-orange flex items-center gap-1 text-[#FFFFFF] px-3 py-1 rounded-md" onClick={handleAddModal}>
                        <FaCirclePlus />
                        <p className="text-xs hidden xs:block">Tambah bulan</p>
                    </button>
                </div>  

                <div className="bg-[#FFFFFF] rounded-sm min-w-[150px]">
                    <div className="p-3">
                        <div className="overflow-x-auto rounded-t-md">
                            <table ref={tableRef} className="w-full min-w-full table-auto text-left border border-main-orange" id="example">
                                <thead className="bg-main-orange text-[#FFFFFF] text-center text-xs">
                                    <tr className="h-10">
                                        <th scope="col" className="whitespace-nowrap px-2 ">No</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Tahun</th>
                                        <th scope="col" className="whitespace-nowrap px-3 ">Bulan</th>
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
            
            <ModalForm id="create-modal" modalType={modal} showModal={showModal} setShowModal={setShowModal} title="Tambah data laporan tahun 2023">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="bulan" className="text-sm font-medium">Bulan</label>
                                    <select type="number" placeholder="Input bulan" required onChange={e => setMonth(e.target.value)} className="w-full py-1 px-3 border border-[#CCCCCC] rounded-md placeholder:text-sm focus:outline-none">
                                    <option value="" disabled selected>Select Month...</option>
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

                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                <label hidden htmlFor="Tahun" className="text-sm font-medium">Tahun</label>
                                <input hidden type = "number" className='form-control' value={id} readonly disabled onChange={e => setYear(e.target.value)}/>
                                </div>
                                </div>

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

        </Layout>
  )
}

export default Tahun