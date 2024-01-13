import React, { useState, useEffect } from 'react';
import moment from 'moment/moment.js';

import AdminRPView from '../admin_modals/AdminRPView';

const AdminRPTaxRequests = ({ taxPayment, taxClearance }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transType, setTransType] = useState('');

  const date1 = moment(taxPayment.date_processed).format('MMMM D, YYYY');
  const time1 = moment(taxPayment.date_processed).format('h:mm A');

  const date2 = moment(taxClearance.date_processed).format('MMMM D, YYYY');
  const time2 = moment(taxClearance.date_processed).format('h:mm A');
    
  const handleOpenModal = (transaction, type) => {

    console.log(type)
    setTransType(type);
    setIsModalOpen(true);
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

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
                <input id="searchInput" type="text" placeholder="Search ID..." className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
              </div>
            </div>
  
            {/* Contents */}

            {/* Tax Clearance Sample */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
              
              {taxClearance.map((transaction) => (
              <div onClick={() => handleOpenModal(transaction, 'Tax Clearance')} key={transaction.transaction_id} className="cursor-pointer bg-white dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm flex flex-col">
                <div className="text-xs font-semibold border-t-4 border-blue-500 text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-sm px-4 py-1.5">
                  Transaction ID:
                </div>
  
                <div className="flex-grow px-4 pt-5 pb-4">
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type: Tax Clearance</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">TDN: {transaction.rp_tdn} </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">PIN: {transaction.rp_pin}  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date Processed: {date2}  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Time Processed: {time2} </div>
                  <div className="flex justify-start items-center text-xs text-slate-600 dark:text-slate-300 my-1">
                    <span>Status: {transaction.status_type}</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Amount Paid: P {transaction.amount}</div>
                </div>
  
                <div className="px-4 pb-5 space-x-4 flex justify-between items-center group">
                  <div className="flex justify-center items-center text-center cursor-pointer p-1 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-sm mt-2 flex-grow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    <span className="text-xs font-normal">&nbsp;Expired</span>
                  </div>
                  <div className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="text-xs font-normal">&nbsp;Process</span>
                  </div>
                </div>
              </div>
              ))} 

              {/* Tax Payment Sample */}
              {taxPayment.map((transaction) => (
              <div onClick={() => handleOpenModal(transaction, 'Tax Payment')} key={transaction.transaction_id} className="cursor-pointer bg-white dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm flex flex-col">
                <div className="text-xs font-semibold text-slate-60 border-t-4 border-[#0057e7] bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-sm px-4 py-1.5">
                  Transaction ID:
                </div>
  
                <div className="flex-grow px-4 pt-5 pb-4">
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type: Tax Payment</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Account Name: {transaction.acc_name} </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">TDN: {transaction.rp_tdn}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">PIN: {transaction.rp_pin} </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">From: 1st Quarter </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">To: {transaction.period_id} </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date Processed: {date1}  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Time Processed: {time1} </div>
                  <div className="flex justify-start items-center text-xs text-slate-600 dark:text-slate-300 my-1">
                    <span>Status: {transaction.status_type}</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Amount Paid: P {transaction.amount}</div>
                </div>
  
                <div className="px-4 pb-5 space-x-4 flex justify-between items-center group">
                  <div className="flex justify-center items-center text-center cursor-pointer p-1 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-sm mt-2 flex-grow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    <span className="text-xs font-normal">&nbsp;Expired</span>
                  </div>
                  <div className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="text-xs font-normal">&nbsp;Process</span>
                  </div>
                </div>
              </div>
              ))} 

            {isModalOpen && selectedTransaction && (
              <AdminRPView selectedTransaction={selectedTransaction} isOpen={isModalOpen} handleClose={handleCloseModal} transType={transType} />
            )}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default AdminRPTaxRequests;
  