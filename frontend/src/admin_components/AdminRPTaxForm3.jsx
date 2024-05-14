import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom'; // Import useLocation from react-router-dom
import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';

import AdminRPTaxCharges from '../admin_partials/admin_cards/AdminRPTaxCharges';


const AdminRPTaxForm3 = () => {

  const { admin_type } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchedData, setIsFetchedData] = useState(false);

  

  const [taxPayment, setTaxPayment] = useState([]);
  const [taxClearance, setTaxClearance] = useState([]);
  const Base_Url = process.env.Base_Url;

  console.log("userrole", admin_type)

  const fetchUserTransaction = async () => {
    try {
      const res = await axios.get(`${Base_Url}adminrptax/charges/`);
      setTaxPayment(res.data.taxpayment);
      setTaxClearance(res.data.taxclearance);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchExpiredTransaction = async () => {
    try {
      //await axios.post(`${Base_Url}email/updateexpired`);
      console.log('Sent emails')
      
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateData = () => {
    fetchUserTransaction();
  };


  useEffect(() => {
    const fetchData = async () => {
        try {
            await fetchExpiredTransaction();

            await fetchUserTransaction();
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isFetchedData) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [isFetchedData]);


  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* AdminSidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/*  Contents Area */}
        <main className="overflow-y-auto">
          {/*  Banner */}
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-sm rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
              <h1 className="font-medium text-center text-slate-700 dark:text-white">Real Property Tax</h1>
              <h1 className="mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300">Transactions</h1>

              <div className="flex items-center justify-center space-x-6 text-xs">
                <div className="flex items-center">
                  <div className="w-4 h-1 mr-2 bg-blue-500"></div>
                  <p className="text-slate-700 dark:text-white">Tax Clearance</p>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-1 mr-2 bg-[#0057e7]"></div>
                  <p className="text-slate-700 dark:text-white">Tax Payment</p>
                </div>
              </div>
            </div>
          </div>

          {/*  Two Sections */}
          <div className="grid grid-cols-1 gap-4 mx-4 my-4">
            <AdminRPTaxCharges
            taxPayment={taxPayment}
            taxClearance={taxClearance}
            handleUpdateData={handleUpdateData}
            />

          </div>

          <AdminFooter />
        </main>
        
      </div>
    </div>
  );
}

export default AdminRPTaxForm3;