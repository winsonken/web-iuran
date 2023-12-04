import React, { useEffect, useState, useRef } from 'react'
import Layout from '../Layout/Layout'
import { IoPeople } from "react-icons/io5";
import { FaMoneyCheck } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import 'datatables.net'; // Import DataTables
import moment from 'moment';

const Dashboard = () => {
    const [warga, setWarga] = useState([]);
    const [jumlahWarga, setJumlahWarga] = useState(0);
    const [jumlahPetugas, setJumlahPetugas] = useState(0);
    const [totalNominal, setTotalNominal] = useState(0);
    const [totalNominalpengeluaran, setTotalNominalpengeluaran] = useState(0);
    const tableRef = useRef(null);

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
        axios.get('http://localhost:8081/dashboard')
            .then(res => setWarga(res.data))
            .catch(err => console.log(err));
    }, []);

    const formattedTotalNominal = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(totalNominal);

    const formattedTotalNominalPengeluaran = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(totalNominalpengeluaran);


    useEffect(() => {
        let counter = 1;
        // Initialize DataTables after data is loaded
        if (tableRef.current) {
            $(tableRef.current).DataTable({
                destroy: true, // Destroy any existing DataTable instance
                data: warga,
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
                        statusCell.html(`<span class="bg-[#DCFDD4] text-[#4FAC16] px-4 py-1 rounded-full" style="width: 120px; display: inline-block;">${status}</span>`);
                    } else if (status === 'On Going') {
                        statusCell.css('color', 'red'); // Set text color to red
                        // You might want to remove the custom class if status is not "Active"
                        statusCell.html(`<span class="bg-[#FDD4D4] text-[#AC1616] px-4 py-1 rounded-full" style="width: 120px; display: inline-block;">${status}</span>`);
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
    }, [warga]);

    useEffect(() => {
        axios.get('http://localhost:8081/dashboard')
            .then(res => setWarga(res.data))
            .catch(err => console.log(err));
    }, []);

  return (
    <Layout>
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
                <h1 className="text-xl text-[#222222] font-medium">Admin dashboard</h1>

                <div className="flex gap-3 justify-center lg:justify-between flex-wrap w-full h-100">
                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-0">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <IoPeople className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center w-[130px]">
                            <p className="text-main-orange font-bold text-2xl">{jumlahWarga}</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Jumlah warga</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-0">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <IoPeople className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center w-[130px]">
                            <p className="text-main-orange font-bold text-2xl">{jumlahPetugas}</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Jumlah petugas</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit  xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-0">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <FaMoneyCheck className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center w-[130px]">
                            <p className="text-main-orange font-bold text-2xl">{formattedTotalNominal}</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Pemasukan</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] flex grow flex-row justify-center items-center gap-5 w-full h-fit  xs:h-[70px] sm:h-[80px] p-1 rounded-sm sm:basis-64 lg:basis-0">
                        <div className="bg-[#F9E3D0] w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                            <GiPayMoney className="text-2xl text-main-orange md:text-3xl" />
                        </div>

                        <div className="flex flex-col items-center w-[130px]">
                            <p className="text-main-orange font-bold text-2xl">{formattedTotalNominalPengeluaran}</p>
                            <p className="text-main-orange font-medium text-xs md:text-sm">Pengeluaran</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 ">
                <h1 className="text-xl text-[#222222] font-medium">Iuran belum lunas - Maret 2023</h1>

                <div className="bg-[#FFFFFF] rounded-sm min-w-[150px]">
                    <div className="p-3">
                        <div className="overflow-x-auto rounded-t-md">
                            <table ref={tableRef} className="w-full min-w-full table-auto text-left border border-main-orange" id="example">
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
    </Layout>
  )
}

export default Dashboard