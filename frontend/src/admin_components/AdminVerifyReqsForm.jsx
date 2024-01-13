import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'

import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';
import AdminRPTaxClearanceModal from '../admin_partials/admin_modals/AdminRPTaxClearanceModal';
import AdminRPTaxRejectModal from '../admin_partials/admin_modals/AdminRPTaxRejectModal';
import AdminURApplications from '../admin_partials/admin_modals/AdminURApplications';

const AdminVerifyReqsForm =()=>{

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [userApplications, setUserApplications] = useState();

  const logoSrc = '../src/images/mnl_footer.svg';

  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [selectedTransaction, setSelectedTransaction] = useState(null);


  const handleOpenModal = (transaction) => {
    setIsModalOpen(true);
    setSelectedTransaction(transaction);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProcessSubmit = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };



  useEffect(()=>{
    const fetchUserApplications= async()=>{
        try{
            const res= await axios.get(`http://localhost:8800/adminur/`)
            setUserApplications(res.data)
            
        }catch(err){
            console.log(err)
        }
    }
    fetchUserApplications()
  },[])

  

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
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
              <h1 className='font-medium text-center text-slate-700 dark:text-white'>Registry</h1>
              <h1 className='mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300'>User Verification Requests</h1> 
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-6 gap-2">

                {/* Card Sample */}
                {userApplications?.map((transaction) => (
                <div onClick={() => handleOpenModal(transaction)} key={transaction.transaction_id} className="cursor-pointer bg-white dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm mb-4 flex flex-col">
                  <div className="text-xs font-semibold text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-sm px-4 py-1.5">
                    Name: {transaction.l_name}, {transaction.f_name} {transaction.m_name} 
                  </div>

                  <div className="flex-grow px-4 pt-5 pb-4">
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Sex: </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Place of Birth: </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date of Birth: </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Mobile Number: </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Email: </div>
                  </div>
                  
                  <div className="px-4 pb-2 space-x-4 flex justify-between items-center group">
                    <div className="flex justify-center items-center text-center cursor-pointer p-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-sm mt-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                      <span className="text-xs font-normal">&nbsp;View Full Details</span>
                    </div>
                  </div>
                  <div className="px-4 pb-5 space-x-4 flex justify-between items-center group">
                    <div className="flex justify-center items-center text-center cursor-pointer p-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-sm mt-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                      <span className="text-xs font-normal">&nbsp;Decline</span>
                    </div>
                    <div onClick={handleOpenModal} className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span className="text-xs font-normal">&nbsp;Approve</span>
                    </div>
                  </div>
                </div>
                ))} 

            {isModalOpen && selectedTransaction && (
              <AdminURApplications selectedTransaction={selectedTransaction} isOpen={isModalOpen} handleClose={handleCloseModal} />
            )}

              </div>
            </div>
          </div>
          <AdminFooter logo={logoSrc} />
        </main>
        {/* <AdminRPTaxClearanceModal
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          handleProcess={handleProcessSubmit}
        />
        <AdminRPTaxRejectModal
        /> */}
      </div>
    </div>
  );
}

export default AdminVerifyReqsForm;