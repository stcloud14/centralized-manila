import React, { useState, useEffect } from 'react';
import moment from 'moment/moment.js';

import AdminLCRBirthView from '../admin_modals/AdminLCRBirthView';
import AdminLCRDeathView from '../admin_modals/AdminLCRDeathView';
import AdminLCRMarriageView from '../admin_modals/AdminLCRMarriageView';


const AdminLCRRequests = ({ birthCert, deathCert, marriageCert, handleOpenModal, handleOpenModal2, handleOpenModal3 , onProceed, onMoveToProcessing }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transType, setTransType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([]);
  // const [isExpiredModalOpen, setIsExpiredModalOpen] = useState(false);

  const date1 = moment(birthCert.date_processed).format('MMMM D, YYYY');
  const time1 = moment(birthCert.date_processed).format('h:mm A');

  const date2 = moment(deathCert.date_processed).format('MMMM D, YYYY');
  const time2 = moment(deathCert.date_processed).format('h:mm A');

  const date3 = moment(marriageCert.date_processed).format('MMMM D, YYYY');
  const time3 = moment(marriageCert.date_processed).format('h:mm A');

  const handleOpenProcessModal = (transaction, type) => {
    setTransType(type);
    setSelectedTransaction(transaction);
  
    // if (type === 'Birth Certificate' || type === 'Death Certificate' || type === 'Marriage Certificate') {
      // Open the process modal only for the specified types
    //   setIsProcessModalOpen(true);
    //   setIsViewModalOpen(false);
    // } else {
      // Open the view modal for other types
    //   setIsViewModalOpen(true);
    //   setIsProcessModalOpen(false);
    // }
  };

  // const handleProcessClick = async () => {
  //   try {
  //     if (!selectedTransaction || !selectedTransaction.transaction_id) {
  //       console.error("Transaction ID is not defined.");
  //       alert("Error updating transaction status. Please try again later.");
  //       return;
  //     }

  //     if (onMoveToProcessing) {
  //       onMoveToProcessing(selectedTransaction);
  //     }

  //     if (Array.isArray(onProceed)) {
  //       onProceed.forEach((proceedFunction) => {
  //         proceedFunction(selectedTransaction);
  //       });
  //     } else if (onProceed) {
  //       onProceed(selectedTransaction);
  //     }

  //     handleCloseModal('process');
  //   } catch (error) {
  //     console.error('Error processing transaction', error);
  //   }
  // };

  const handleOpenViewModal = (transaction, type) => {
    setTransType(type);
    setSelectedTransaction(transaction);
    setIsViewModalOpen(true);
  };

  const handleSearch = (transaction) => {
    const transactionId = transaction.transaction_id.toUpperCase();
    const query = searchQuery.toUpperCase();
    return transactionId.includes(query);
  };

   const filteredbirthCert = birthCert.filter(handleSearch);
   const filtereddeathCert = deathCert.filter(handleSearch);
   const filteredmarriageCert = marriageCert.filter(handleSearch);

    // Requests component logic
    return (
      <>
        {/* Requests Area */}
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] rounded-sm border border-slate-200">
          <div className="px-5 py-5">
            <h1 className='font-medium text-center text-slate-700 dark:text-white mb-4'>Requests</h1>
  
            {/* Search */}
            <div className="flex items-center text-xs mb-7">
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </span>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.toUpperCase())} id="searchInput" type="text" placeholder="Search ID..." className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
              </div>
            </div>
  
            {/* Contents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
              {/* Tax Clearance Sample */}

              {filteredbirthCert.map((transaction) => (

              <div onClick={() => handleOpenViewModal(transaction, 'Birth Certificate')} key={transaction.transaction_id} className="cursor-pointer bg-white dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm flex flex-col">
                <div className="text-xs font-semibold border-t-4 border-[#008744] dark:border-[#035e31] text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-sm px-4 py-1.5">
                 Transaction ID: {transaction.transaction_id}
                </div>
                <div className="flex-grow px-4 pt-5 pb-4">
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type: {transaction.trans_type}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Last Name: {transaction.l_name}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Middle Name: {transaction.m_name} </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">First Name: {transaction.f_name} </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Birth Date:  {transaction.birth_date} </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date Processed: {date1}  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Time Processed: {time1}  </div>
                  <div className="flex justify-start items-center text-xs text-slate-600 dark:text-slate-300 my-1">
                    <span>Status: {transaction.status_type} </span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Amount Paid: P{transaction.amount}</div>
                </div>
  
                <div className="px-4 pb-5 space-x-4 flex justify-between items-center group">
                  <div onClick={handleOpenModal2} className="flex justify-center items-center text-center cursor-pointer p-1 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-sm mt-2 flex-grow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    <span className="text-xs font-normal">&nbsp;Expired</span>
                  </div>
                  <div onClick={handleOpenModal3} className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="text-xs font-normal">&nbsp;Process</span>
                  </div>
                </div>
              </div>
              ))} 

              {filtereddeathCert.map((transaction) => (
              <div onClick={() => handleOpenViewModal(transaction, 'Death Certificate')} className="cursor-pointer bg-white dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm flex flex-col">
                <div className="text-xs font-semibold border-t-4 border-[#17bf6c] text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-sm px-4 py-1.5">
                  Transaction ID: {transaction.transaction_id}
                </div>
  
                <div className="flex-grow px-4 pt-5 pb-4">
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type: {transaction.trans_type}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Last Name: {transaction.l_name}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Middle Name: {transaction.m_name} </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">First Name: {transaction.f_name} </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Death Date:  {transaction.death_date} </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date Processed: {date2}  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Time Processed: {time2}  </div>
                  <div className="flex justify-start items-center text-xs text-slate-600 dark:text-slate-300 my-1">
                    <span>Status: {transaction.status_type}</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Amount Paid: P{transaction.amount}</div>
                </div>
  
                <div className="px-4 pb-5 space-x-4 flex justify-between items-center group">
                  <div onClick={handleOpenModal2} className="flex justify-center items-center text-center cursor-pointer p-1 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-sm mt-2 flex-grow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    <span className="text-xs font-normal">&nbsp;Expired</span>
                  </div>
                  <div onClick={handleOpenModal3} className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="text-xs font-normal">&nbsp;Process</span>
                  </div>
                </div>
              </div>
              ))} 

              {filteredmarriageCert.map((transaction) => (

              <div onClick={() => handleOpenViewModal(transaction, 'Marriage Certificate')} className="cursor-pointer bg-white dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm flex flex-col">
                <div className="text-xs font-semibold border-t-4 border-[#78ffbc] text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-sm px-4 py-1.5">
                  Transaction ID: {transaction.transaction_id}
                </div>
  
                <div className="flex-grow px-4 pt-5 pb-4">
                <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type: {transaction.trans_type}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Last Name: {transaction.consent_lname}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Middle Name: {transaction.consent_mname} </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">First Name: {transaction.consent_fname} </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Marriage Date:  {transaction.marriage_date} </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date Processed: {date3}  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Time Processed: {time3}  </div>
                  <div className="flex justify-start items-center text-xs text-slate-600 dark:text-slate-300 my-1">
                    <span>Status: {transaction.status_type}</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Amount Paid: P{transaction.amount}</div>
                </div>
  
                <div className="px-4 pb-5 space-x-4 flex justify-between items-center group">
                  <div onClick={handleOpenModal2} className="flex justify-center items-center text-center cursor-pointer p-1 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-sm mt-2 flex-grow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    <span className="text-xs font-normal">&nbsp;Expired</span>
                  </div>
                  <div onClick={handleOpenModal3} className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="text-xs font-normal">&nbsp;Process</span>
                  </div>
                </div>
              </div>
              ))} 
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default AdminLCRRequests;
  