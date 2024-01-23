import React, { useState, useEffect } from 'react';
import moment from 'moment/moment.js';

import AdminRPView from '../admin_modals/AdminRPView';



const AdminRPTaxRequests = ({ taxPayment, taxClearance, onProceed, onMoveToProcessing }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false); // Initialize the state here
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transType, setTransType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isExpiredModalOpen, setIsExpiredModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('table'); 

  const date1 = moment(taxPayment.date_processed).format('MMMM D, YYYY');
  const time1 = moment(taxPayment.date_processed).format('h:mm A');

  const date2 = moment(taxClearance.date_processed).format('MMMM D, YYYY');
  const time2 = moment(taxClearance.date_processed).format('h:mm A');
  
  const handleOpenProcessModal = (transaction, type) => {
    setTransType(type);
    setSelectedTransaction(transaction);
  
    if (type === 'Real Property Tax Payment' || type === 'Real Property Tax Clearance') {
      // Open the process modal only for the specified types
      setIsProcessModalOpen(true);
      setIsViewModalOpen(false);
    } else {
      // Open the view modal for other types
      setIsViewModalOpen(true);
      setIsProcessModalOpen(false);
    }
  }; const handleProcessClick = async () => {
    try {
      if (!selectedTransaction || !selectedTransaction.transaction_id) {
        console.error("Transaction ID is not defined.");
        alert("Error updating transaction status. Please try again later.");
        return;
      }

      // Update the status type in the local state
      const updatedTransactions = transactions.map((transaction) =>
        transaction.transaction_id === selectedTransaction.transaction_id
          ? { ...transaction, status_type: 'Processing' }
          : transaction
      );

      setTransactions(updatedTransactions);

      // Update the transaction status to 'Processing' in the backend
      const body = {
        new_status: 'Processing',
      };

      const response = await fetch(`http://localhost:8800/adminrptax/updateProcessing/${selectedTransaction.transaction_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log('Transaction status updated successfully');

        // Execute onMoveToProcessing function if available
        if (onMoveToProcessing) {
          onMoveToProcessing(selectedTransaction);
        }

        // Execute onProceed functions if available
        if (Array.isArray(onProceed)) {
          onProceed.forEach((proceedFunction) => {
            proceedFunction(selectedTransaction);
          });
        } else if (onProceed) {
          onProceed(selectedTransaction);
        }

        // Close the modal
        handleCloseModal('process');

        // Reload the page
        window.location.reload();
      } else {
        console.error('Failed to update transaction status');
      }
    } catch (error) {
      console.error('Error updating transaction status', error);
    }
  };
  
  const handleOpenViewModal = (transaction, type) => {
    setTransType(type);
    setSelectedTransaction(transaction);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = (modalType) => {
    if (modalType === 'view') {
      setIsViewModalOpen(false);
    } else if (modalType === 'expired') {
      setIsExpiredModalOpen(false);
    } else if (modalType === 'process') { // Corrected modalType check
      setIsProcessModalOpen(false); // Close the process modal
    } else {
      setIsModalOpen(false);
    }
    setSelectedTransaction(null);
  };
  

  const handleExpiredModal = (transaction, type) => {
    setTransType(type);
    setSelectedTransaction(transaction);
    setIsViewModalOpen(false); // Close the view modal
    setIsExpiredModalOpen(true); // Open the expired modal
  };

  const handleExpiredClick = async () => {
    try {
      if (!selectedTransaction || !selectedTransaction.transaction_id) {
        console.error("Transaction ID is not defined.");
        alert("Error updating transaction status. Please try again later.");
        return;
      }
  
      const body = {
        new_status: 'Expired',
      };
  
      const response = await fetch(`http://localhost:8800/adminrptax/updateExpired/${selectedTransaction.transaction_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (response.ok) {
        console.log('Transaction status updated successfully');

        const updatedTransactions = transactions.map((transaction) =>
          transaction.transaction_id === selectedTransaction.transaction_id
            ? { ...transaction, status_type: 'Expired' }
            : transaction
        );
  
        setTransactions(updatedTransactions);
        handleCloseModal('expired'); // Close the modal
      } else {
        console.error('Failed to update transaction status');
      }
    } catch (error) {
      console.error('Error updating transaction status', error);
    }
  };
  

  const handleSearch = (transaction) => {
    const transactionId = transaction.transaction_id.toUpperCase();
    const query = searchQuery.toUpperCase();
    return transactionId.includes(query);
  };

  const filteredTaxClearance = taxClearance.filter(handleSearch);

  const filteredTaxPayment = taxPayment.filter(handleSearch);

  const handleToggleView = (mode) => {
    setViewMode(mode);
  };

  const renderContent = () => {
    if (viewMode === 'table') {
      return (
        <div className="relative overflow-x-auto shadow-md rounded-sm">
          <table className="w-full text-left text-xs md:text-sm rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 border-l-4 dark:border-l-[#212121] uppercase bg-slate-200 dark:bg-[#212121] dark:text-slate-400">
                <tr>
                    <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                        <div className="flex items-center pl-3">
                          Transaction ID
                        </div>
                    </th>
                    <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                        <div className="flex items-center">
                          Date
                        </div>
                    </th>
                    <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                        <div className="flex items-center">
                          Tax Declaration Number
                        </div>
                    </th>
                    <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                        <div className="flex items-center">
                          Property Identification Number
                        </div>
                    </th>
                    <th>
                      {/* Actions */}
                    </th>
                </tr>
            </thead>
            <tbody> 
              <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                <td className="px-1 py-2 border-l-4 border-l-[#0057e7] whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
                    17059267-DBB7F8193 
                  </div>
                </td>
                <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  January 22, 2024
                </td>
                <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  AA-10088-00003
                </td>
                <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  678-92-121-212-122
                </td>
                <td className="py-1 whitespace-nowrap">
                  <div className="flex justify-center gap-4 px-2">
                    <div className="group cursor-pointer flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500 hover:text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>

              <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                <td className="px-1 py-2 whitespace-nowrap border-l-4 border-l-blue-400 text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
                    17059267-DBB7F8193 
                  </div>
                </td>
                <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  January 22, 2024
                </td>
                <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  AA-10088-00003
                </td>
                <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  678-92-121-212-122
                </td>
                <td className="py-1 whitespace-nowrap">
                  <div className="flex justify-center gap-4 px-2">
                    <div className="group cursor-pointer flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500 hover:text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      );
    } else if (viewMode === 'card') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-4">
              
          {/* ITO NAMAN YUNG MAPPING, LAHAT NG LAMAN NG LINE 40, IDIDISPLAY NITO, SINCE ANG INITIAL AY WALA PA NAMANG VALUE ANG SEARCH QUERY, LAHAT IDIDISPLAY DITO AND MAG FIFILTER LANG KAPAG MAY NILAGAY NA SA SEARCH, AND MADIDISPLAY LANG YUNG MATCHED TRANSACTION */}
          {filteredTaxClearance.map((transaction) => (

          // ITO YUNG KAPAG PININDOT YUNG BUONG CARD, MAG OOPEN YUNG MODAL, IPAPASA YUNG DETAILS NG TRANSACTION NA PININDOT, AND ISESET SA PARAMETER NG LINE 19 NA ANG TYPE AY TAX CLEARANCE
          <div onClick={() => handleOpenViewModal(transaction, 'Real Property Tax Clearance')} key={transaction.transaction_id} className="cursor-pointer bg-white dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm flex flex-col">
            <div className="text-xs font-semibold border-t-4 border-blue-500 text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-sm px-4 py-1.5">
              Transaction ID: {transaction.transaction_id}
            </div>

            <div className="flex-grow px-4 pt-5 pb-4">
              <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type: {transaction.trans_type}</div>
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
              <div onClick={() => handleExpiredModal(transaction, 'Real Property Tax Clearance')} className="flex justify-center items-center text-center cursor-pointer p-1 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-sm mt-2 flex-grow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                <span className="text-xs font-normal">&nbsp;Expired</span>
              </div>
              <div onClick={() => handleOpenProcessModal(transaction, 'Real Property Tax Clearance')} className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <span className="text-xs font-normal">&nbsp;Process</span>
            </div>

            </div>
          </div>
          ))} 

          {/* SAME LANG TO SA TAAS */}
          {/* Tax Payment Sample */}
          {filteredTaxPayment.map((transaction) => (
          <div onClick={() => handleOpenViewModal (transaction, 'Real Property Tax Payment')} key={transaction.transaction_id} className="cursor-pointer bg-white dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm flex flex-col">
            <div className="text-xs font-semibold text-slate-60 border-t-4 border-[#0057e7] bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-sm px-4 py-1.5">
              Transaction ID: {transaction.transaction_id}
            </div>

            <div className="flex-grow px-4 pt-5 pb-4">
              <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type:  {transaction.trans_type}</div>
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
              <div onClick={() => handleExpiredModal(transaction, 'Real Property Tax Payment')} className="flex justify-center items-center text-center cursor-pointer p-1 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-sm mt-2 flex-grow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                <span className="text-xs font-normal">&nbsp;Expired</span>
              </div>
              <div  onClick={() => handleOpenProcessModal(transaction, 'Real Property Tax Payment')} className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span className="text-xs font-normal">&nbsp;Process</span>
              </div>
            </div>
          </div>
          ))} 
      
        </div>
      );
    }
  };

    return (
      <>
        {/* Requests Area */}
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] rounded-sm border border-slate-200">
          <div className="px-5 py-5">
            <h1 className='font-medium text-center text-slate-700 dark:text-white mb-4'>Requests</h1>

            {/* View Toggle */}
            <div className="flex justify-end items-center text-xs mb-7">
              <div className="relative flex items-center">
                {/* Tabular View Toggle */}
                <button onClick={() => handleToggleView('table')}  className='flex items-center p-1 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white'>
                  {viewMode === 'table' ? <span className='text-black dark:text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z" clipRule="evenodd" />
                    </svg>
                    </span> : 
                    
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z" clipRule="evenodd" />
                    </svg>
                    </span>}
                </button>
                
                {/* Divider */}
                <div className="h-6 mx-2 border-r border-gray-300"></div>
                
                {/* Card View Toggle */}
                <button onClick={() => handleToggleView('card')} className="flex items-center p-1 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white">
                  {viewMode === 'card' ? <span className='text-black dark:text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M15 3.75H9v16.5h6V3.75ZM16.5 20.25h3.375c1.035 0 1.875-.84 1.875-1.875V5.625c0-1.036-.84-1.875-1.875-1.875H16.5v16.5ZM4.125 3.75H7.5v16.5H4.125a1.875 1.875 0 0 1-1.875-1.875V5.625c0-1.036.84-1.875 1.875-1.875Z" />
                    </svg>
                    </span> : 
                    
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M15 3.75H9v16.5h6V3.75ZM16.5 20.25h3.375c1.035 0 1.875-.84 1.875-1.875V5.625c0-1.036-.84-1.875-1.875-1.875H16.5v16.5ZM4.125 3.75H7.5v16.5H4.125a1.875 1.875 0 0 1-1.875-1.875V5.625c0-1.036.84-1.875 1.875-1.875Z" />
                      </svg>
                    </span>}
                  
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="flex items-center text-xs mb-7">
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </span>
                {/* ITO YUNG SEARCH, ANG VALUE NITO MASSTORE SA LINE 32, AND EVERY CHANGES, NAG UUPDATE RIN ANG LINE 32 */}
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.toUpperCase())} id="searchInput" type="text" placeholder="Search ID..." className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
              </div>
            </div>
  
            {/* Render Content */}
            {renderContent()}
            {/* All Modals */}

            {/* PROCESS MODAL */}
            {isProcessModalOpen && (
              <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                  </span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white dark:bg-[#212121] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="mx-auto mt-4">
                        <span className="font-medium text-slate-700 dark:text-white sm:mt-0 text-xs md:text-sm" id="modal-headline">
                          Click the PROCESS button to display the card on the Processing Area.
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-[#212121] px-4 py-3 gap-3 sm:px-6 flex justify-end">
                  <button
                      onClick={() => handleCloseModal('process')}
                      type="button"
                      className="text-slate-500 text-xs md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                    >
                      <p>Cancel</p>
                    </button>
                    <button
                    onClick={() => handleProcessClick()}  // Add parentheses here
                    type="button"
                    className="text-white text-xs md:text-sm bg-emerald-500 border border-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Process
                  </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EXPIRED MODAL */}
            {isExpiredModalOpen && (
              <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                  </span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white dark:bg-[#212121] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="mx-auto mt-4">
                        <span className="font-medium text-slate-700 dark:text-white sm:mt-0 text-xs md:text-sm" id="modal-headline">
                          Are you sure to mark this card as EXPIRED, after clicking the Expired button the process is irreversible.
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-[#212121] px-4 py-3 gap-3 sm:px-6 flex justify-end">
                  <button
                      onClick={() => handleCloseModal('expired')}
                      type="button"
                      className="text-slate-500 text-xs md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                    >
                      <p>Cancel</p>
                    </button>
                    <button
                    onClick={() => handleExpiredClick()}  // Add parentheses here
                    type="button"
                    className="text-white text-xs md:text-sm bg-yellow-500 border border-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Expired
                  </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isViewModalOpen && selectedTransaction && !isExpiredModalOpen && !isProcessModalOpen && (
            <AdminRPView
              selectedTransaction={selectedTransaction}
              isOpen={isViewModalOpen}
              handleClose={handleCloseModal}
            />
            )}
          </div>
        </div>
      </>
    );
  };
  
  
  export default AdminRPTaxRequests;
  