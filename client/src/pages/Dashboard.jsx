import React from 'react'
import Layout from '../Layout/Layout'
import { IoPeople } from "react-icons/io5";

const Dashboard = () => {
  return (
    <Layout>
        <div>
            <div>
                <h1>Admin dashboard</h1>

                <div>
                    <div className="bg-[#FFFFFF]">
                        <IoPeople />

                        <div>
                            <p>100</p>
                            <p>Jumlah warga</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h1>Iuran belum lunas - Maret 2023</h1>
            </div>
        </div>
    </Layout>
  )
}

export default Dashboard