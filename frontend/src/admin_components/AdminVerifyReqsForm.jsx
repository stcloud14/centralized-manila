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

  const logoSrc = '../src/images/mnl_footer.svg';

  const [userApplications, setUserApplications] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [isPlaceholder, setIsPlaceholder] = useState();

  const handleOpenModal = (transaction) => {
    setIsModalOpen(true);
    setSelectedTransaction(transaction);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };
  
  useEffect(()=>{
    const fetchUserApplications= async()=>{
        try{
            const res= await axios.get(`http://localhost:8800/adminur/`)
            const { verify } = res.data;
            setUserApplications(verify);
            
        }catch(err){
            console.log(err)
        }
    }
    fetchUserApplications()
  },[userApplications])


  const handleRemoveTransaction = (transaction) => {

    const updatedUserApplications = userApplications.filter(
      (transaction) => transaction.transaction_id !== transaction
    );
  
    setUserApplications(updatedUserApplications);
  };


  const handleApprove = async (transaction) => {
    try {
      const trans_type = 'User Registry';

      const response = await axios.post(`http://localhost:8800/adminur/approve/${transaction.user_id}`, {
        user_id: transaction.user_id,
        trans_type: trans_type,
      });
  
      if (response.status === 200) {

        try {
          const res = await axios.get(`http://localhost:8800/email/${transaction.user_id}`);
        
          if (res.data.user_email) {
            const updatedUserEmail = res.data.user_email;
            const f_name = res.data.f_name;
            const l_name = res.data.l_name;
            const sex_type = res.data.sex_type;
            const currentDate = new Date();
                    const date = currentDate.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    });
                    const time = currentDate.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric'
                  });

            console.log('FETCHED USER EMAIL:', updatedUserEmail);

            const user_email = updatedUserEmail;

            const trans_type = 'Verification Success';

            const type = 'Account Verification'

            const rowData = { ...transaction, trans_type, type, date, time};

            const status_type = 'V E R I F I E D';

            const body = {
              data: rowData,
              status_type: status_type,
              f_name: f_name,
              l_name: l_name,
              sex_type: sex_type,
            };
  
            // Proceed with additional logic after updating state
            try {
              const emailResponse = await axios.post(`http://localhost:8800/email/status-verified-email/${user_email}`, body);
  
              if (emailResponse.data && emailResponse.data.message) {
                console.log('SENT EMAIL');
                setIsApproved(true);
                setIsPlaceholder(transaction.l_name)
          
                console.log('Verification successful');
          
                setTimeout(() => {
                  setIsApproved(false);
                  handleRemoveTransaction(transaction.transaction_id);
                }, 1500);
                // alert(emailResponse.data.message);
              } else {
                console.log("Failed to send email.");
              }
            } catch (emailError) {
              //
            }
          } else {
            console.error('Transaction error:', res.statusText);
          }
        } catch (fetchError) {
          console.log('NOT FETCHING EMAIL');
          console.error(fetchError);
        }

      } else {
        console.error('Transaction error:', response.statusText);
      }
    } catch (err) {
      console.error('Transaction error:', err);
    }
  };
  


  const handleDecline = async (transaction) => {
  
    try {
      const trans_type = 'User Registry';

      const body1 = {
        trans_type,
      }

      const response = await axios.post(`http://localhost:8800/adminur/decline/${transaction.user_id}`, body1);
  
      if (response.status === 200) {

        try {
          const res = await axios.get(`http://localhost:8800/email/${transaction.user_id}`);
          
          if (res.data.user_email) {
            const updatedUserEmail = res.data.user_email;
            const f_name = res.data.f_name;
            const l_name = res.data.l_name;
            const sex_type = res.data.sex_type;
            const currentDate = new Date();
                    const date = currentDate.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    });
                    const time = currentDate.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric'
                  });

            console.log('FETCHED USER EMAIL:', updatedUserEmail);

            const user_email = updatedUserEmail;

            const trans_type = 'Verification Failed';

            const type = 'Account Verification'

            const rowData = { ...transaction, trans_type, type, date, time};

            const status_type = 'D E C L I N E D';

            const body = {
              data: rowData,
              status_type: status_type,
              f_name: f_name,
              l_name: l_name,
              sex_type: sex_type,
            };
  
            // Proceed with additional logic after updating state
            try {
              const emailResponse = await axios.post(`http://localhost:8800/email/status-verified-email/${user_email}`, body);
  
              if (emailResponse.data && emailResponse.data.message) {
                console.log('SENT EMAIL');
                setIsDeclined(true);
                setIsPlaceholder(transaction.l_name)

                console.log('Verification Declined');
          
                setTimeout(() => {
                  setIsDeclined(false);
                  handleRemoveTransaction(transaction.transaction_id)
                }, 1500);
                // alert(emailResponse.data.message);
              } else {
                console.log("Failed to send email.");
              }
            } catch (emailError) {
              //
            }
          } else {
            console.error('Transaction error:', res.statusText);
          }
        } catch (fetchError) {
          console.log('NOT FETCHING EMAIL');
          console.error(fetchError);
        }

      } else {
        console.error('Transaction error:', response.statusText);
      }
    } catch (err) {
      console.error('Transaction error:', err);
    }
  };
  

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

                  {isApproved && (
                    <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                      {isPlaceholder} Verification Approved!
                    </div>
                  )} 

                  {isDeclined && (
                    <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                      {isPlaceholder} Verification Declined!
                    </div>
                  )} 


              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-6 gap-2">

                {/* Card Sample */}
                {userApplications?.map((transaction) => (
                <div onClick={() => handleOpenModal(transaction)} key={transaction.transaction_id} className="cursor-pointer bg-white dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm mb-4 flex flex-col">
                  <div className="text-xs font-semibold text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-sm px-4 py-1.5">
                    Name: {transaction.l_name}, {transaction.f_name} {transaction.m_name} 
                  </div>

                  <div className="flex-grow px-4 pt-5 pb-4">
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Sex: {transaction.sex_type}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Place of Birth: {transaction.birth_place}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date of Birth: {transaction.birth_date}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Mobile Number: {transaction.mobile_no}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Email: {transaction.user_email}</div>
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
                    <div onClick={(e) => { e.stopPropagation(); handleDecline(transaction); }} className="flex justify-center items-center text-center cursor-pointer p-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-sm mt-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                      <span className="text-xs font-normal">&nbsp;Decline</span>
                    </div>
                    <div onClick={(e) => { e.stopPropagation(); handleApprove(transaction); }} className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span className="text-xs font-normal">&nbsp;Approve</span>
                    </div>
                  </div>
                </div>
                ))} 

            {isModalOpen && selectedTransaction && (
              <AdminURApplications selectedTransaction={selectedTransaction} handleRemoveTransaction={handleRemoveTransaction} isOpen={isModalOpen} handleClose={handleCloseModal} />
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