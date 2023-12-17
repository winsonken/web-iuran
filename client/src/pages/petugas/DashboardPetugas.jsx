import React, { useEffect, useState, useRef } from 'react'
import PetugasLayout from '../../Layout/PetugasLayout';
import { IoPeople } from "react-icons/io5";
import { FaMoneyCheck } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import 'datatables.net'; // Import DataTables
import moment from 'moment';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';


const DashboardPetugas = () => {
    const [warga, setWarga] = useState([]);
    const [jumlahWarga, setJumlahWarga] = useState(0);
    const [jumlahPetugas, setJumlahPetugas] = useState(0);
    const [totalNominal, setTotalNominal] = useState(0);
    const [totalNominalpengeluaran, setTotalNominalpengeluaran] = useState(0);
    const [sisaSaldo, setSisaSaldo] = useState(0); // New state for Sisa Saldo
    const [name, setName] = useState('');
    const tableRef = useRef(null);
    const tahun = new Date().getFullYear();
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const bulanIndex = new Date().getMonth();
    const bulan = namaBulan[bulanIndex];
    const [auth, setAuth] = useState(false);
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/dashboard-petugas')
        .then(res => {
            if(res.data.status === "Success") {
                setAuth(true)
                setName(res.data.name)
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
                    { title: 'Nama Perwakilan', data: 'Nama'},
                    { title: 'Status', data: 'Status'},
                ],
                createdRow: function (row, data, dataIndex) {
                    // Set text color based on the "Status" value
                    const status = data.Status;
                    const statusCell = $('td:eq(2)', row); // Change 4 to the correct index of the "Status" column
    
                    if (status === 'Lunas') {
                        statusCell.css('color', '#4FAC16'); // Set text color to green
                        statusCell.html(`<span class="bg-[#DCFDD4] text-[#4FAC16] px-4 py-1 rounded-full" style="width: 130px; display: inline-block;">Lunas</span>`);
                    } else if (status === 'On Going') {
                        statusCell.css('color', 'red'); // Set text color to red
                        // You might want to remove the custom class if status is not "Active"
                        statusCell.html(`<span class="bg-[#FDD4D4] text-[#AC1616] px-4 py-1 rounded-full" style="width: 130px; display: inline-block;">Belum Lunas</span>`);
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
        }

            } else {
                setAuth(false)
                Swal.fire('Gagal', 'Kamu Tidak Memiliki Authentikasi', 'error').then(() => {
                    navigate(-1)
                });
            }
        })
    }, [])

    useEffect(() => {
        const sisaSaldoValue = totalNominal - totalNominalpengeluaran;
        setSisaSaldo(sisaSaldoValue);
      }, [totalNominal, totalNominalpengeluaran]);

    useEffect(() => {
        const sisaSaldoValue = totalNominal - totalNominalpengeluaran;
        setSisaSaldo(sisaSaldoValue);
      }, [totalNominal, totalNominalpengeluaran]);

    useEffect(() => {
        // Fetch jumlah warga
        axios.get('http://localhost:8081/jumlah-warga')
            .then(res => setJumlahWarga(res.data.jumlahWarga))
            .catch(err => console.log(err));

        axios.get('http://localhost:8081/jumlah-petugas')
            .then(res => setJumlahPetugas(res.data.jumlahPetugas))
            .catch(err => console.log(err));
        axios.get('http://localhost:8081/count-nominal')
            .then(res => setTotalNominal(res.data.totalNominal))
            .catch(err => console.log(err));
        axios.get('http://localhost:8081/count-nominalpengeluaran')
            .then(res => setTotalNominalpengeluaran(res.data.totalNominalpengeluaran))
            .catch(err => console.log(err));
        // Fetch data for the table
        // axios.get('http://localhost:8081/dashboard')
        //     .then(res => setWarga(res.data))
        //     .catch(err => console.log(err));
    }, []);

    const formattedTotalNominal = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Set minimumFractionDigits to 0 to remove cents
        maximumFractionDigits: 0, // Set maximumFractionDigits to 0 to remove cents
    }).format(totalNominal);
    
    const formattedTotalNominalPengeluaran = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Set minimumFractionDigits to 0 to remove cents
        maximumFractionDigits: 0, // Set maximumFractionDigits to 0 to remove cents
    }).format(totalNominalpengeluaran);

    const formattedSisaSaldo = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(sisaSaldo);

      const adjustedFormattedSisaSaldo = sisaSaldo < 0
    ? `Rp${formattedSisaSaldo.replace('Rp', '')}`
    : formattedSisaSaldo;


    // useEffect(() => {
    //     let counter = 1;
    //     // Initialize DataTables after data is loaded
    //     if (tableRef.current && res.data.data.length > 0) {
    //         $(tableRef.current).DataTable({
    //             destroy: true, // Destroy any existing DataTable instance
    //             data: res.data.data,
    //             scrollX: false, // Disable horizontal scrolling
    //             autoWidth: false,
    //             columns: [
    //                 { title: 'No', render: function (data, type, row, meta) { // Langkah 2: Tambahkan kolom nomor urut
    //                     return counter++;
    //                 } },
    //                 { title: 'Nama Perwakilan', data: 'Nama'},
    //                 { title: 'Status', data: 'Status'},
    //             ],
    //             createdRow: function (row, data, dataIndex) {
    //                 // Set text color based on the "Status" value
    //                 const status = data.Status;
    //                 const statusCell = $('td:eq(2)', row); // Change 4 to the correct index of the "Status" column
    
    //                 if (status === 'Lunas') {
    //                     statusCell.css('color', '#4FAC16'); // Set text color to green
    //                     statusCell.html(`<span class="bg-[#DCFDD4] text-[#4FAC16] px-4 py-1 rounded-full" style="width: 130px; display: inline-block;">Lunas</span>`);
    //                 } else if (status === 'On Going') {
    //                     statusCell.css('color', 'red'); // Set text color to red
    //                     // You might want to remove the custom class if status is not "Active"
    //                     statusCell.html(`<span class="bg-[#FDD4D4] text-[#AC1616] px-4 py-1 rounded-full" style="width: 130px; display: inline-block;">Belum Lunas</span>`);
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
    //     }
    // }, [warga]);


    

  return (
    <PetugasLayout>
        {
        auth ?
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
                <h1 className="text-xl font-bold text-main-orange">Dashboard Petugas</h1>

                <div className="flex gap-3 justify-center lg:justify-between flex-wrap w-full h-100">
                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-1/3">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <IoPeople className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center w-[130px]">
                            <p className="text-main-orange font-bold text-2xl">{jumlahWarga}</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Jumlah warga</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-1/3">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <IoPeople className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center w-[130px]">
                            <p className="text-main-orange font-bold text-2xl">{jumlahPetugas}</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Jumlah petugas</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit  xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-1/3">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <FaMoneyCheck className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center w-[130px]">
                            <p className="text-main-orange font-bold text-2xl">{formattedTotalNominal}</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Pemasukan</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit  xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-1/3">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <GiPayMoney className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center w-[130px]">
                            <p className="text-main-orange font-bold text-2xl">{formattedTotalNominalPengeluaran}</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Pengeluaran</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit  xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-1/3">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <GiPayMoney className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center w-[130px]">
                            <p className="text-main-orange font-bold text-2xl">{adjustedFormattedSisaSaldo}</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Sisa Saldo</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 ">
                <h1 className="text-xl text-[#222222] font-medium">Iuran belum lunas - {bulan} {tahun}</h1>

                <div className="bg-[#FFFFFF] text-left border border-main-orange rounded-md overflow-hidden">
                    <div className="p-3 text-left border border-main-orange rounded-md overflow-hidden">
                        <div className="overflow-x-auto rounded-t-md">
                        <table ref={tableRef} className="w-full min-w-full table-auto text-left border border-main-orange rounded-md overflow-hidden" id="example">
                                <thead className="bg-main-orange text-[#FFFFFF] text-center text-xs">
                                    <tr className="h-10">
                                        <th scope="col" className="whitespace-nowrap px-2 text-center align-middle ">No</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle ">Nama warga</th>
                                        <th scope="col" className="whitespace-nowrap px-3 text-center align-middle ">Status pembayaran</th>
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
        </div>
        :
        <div>
            <h3>{message}</h3>
            <h3>login Now</h3>
        </div>
}
    </PetugasLayout>
  )
}

export default DashboardPetugas