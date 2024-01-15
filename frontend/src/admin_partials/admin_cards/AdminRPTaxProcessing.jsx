import React, { useState, useEffect } from 'react';
import moment from 'moment/moment.js';
import AdminRPReject from '../admin_modals/AdminRPReject';
import AdminRPDone from '../admin_modals/AdminRPDone';
import AdminRPView from '../admin_modals/AdminRPView';

const AdminRPTaxProcessing = ({ processingTransactions, setTransType }) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState(processingTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleOpenRejectModal = (transaction, type) => {
    setTransType(type);
    setSelectedTransaction(transaction);
    setIsRejectModalOpen(true);
  };

  const handleOpenDoneModal = (transaction, type) => {
    setTransType(type);
    setSelectedTransaction(transaction);
    setIsDoneModalOpen(true);
  };
  const handleCloseModals = () => {
    setIsRejectModalOpen(false);
    setIsDoneModalOpen(false);
    setIsViewModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleOpenViewModal = (transaction, type) => {
    setTransType(type);
    setSelectedTransaction(transaction);
    setIsViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
    setSelectedTransaction(null);
  };


  const handleDoneClick = (updatedTransactionId) => {
    // Find the selected transaction
    const selected = uniqueTransactions.find(
      (transaction) => transaction.transaction_id === updatedTransactionId
    );
    // Check if the status is not already 'Complete'
    if (selected && selected.status_type.toLowerCase() !== 'complete') {
      // Update the status of the selected transaction to 'Complete'
      const updatedSelectedTransaction = {
        ...selected,
        status_type: 'Complete', // or 'complete' depending on your data
      };
      // Update the state with the updated status
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.transaction_id === updatedTransactionId
            ? updatedSelectedTransaction
            : transaction
        )
      );
      // Close the modal
      handleCloseModals();
    }
  };
  
  const handleRejectClick = (updatedTransactionId) => {
    console.log('Reject button clicked');
    const selected = uniqueTransactions.find(
      (transaction) => transaction.transaction_id === updatedTransactionId
    );
  
    console.log('Selected transaction:', selected);
    if (selected && selected.status_type.toLowerCase() !== 'reject') {
      const updatedSelectedTransaction = {
        ...selected,
        status_type: 'Reject',
      };
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.transaction_id === updatedTransactionId
            ? updatedSelectedTransaction
            : transaction
        )
      );
  
      handleCloseModals(); // Close the modal after handling reject
    }
  };

  //ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss

  const handleSearch = (transaction) => {
    const transactionId = transaction.transaction_id.toUpperCase();
    const query = searchQuery.toUpperCase();
    return transactionId.includes(query);
  };

  function removeDuplicatesByKey(array, key) {
    const uniqueObjects = Array.from(new Map(array.map((item) => [item[key], item])).values());
    return uniqueObjects;
  }

  const uniqueTransactions = removeDuplicatesByKey(processingTransactions, 'transaction_id');


      return (
        
      <>
        {/*  Processing Area */}
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] rounded-sm border border-slate-200">
              <div className="px-5 py-5">
                <h1 className='font-medium text-center text-slate-700 dark:text-white mb-4'>Processing Section</h1>

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
                  {uniqueTransactions.map((transaction) => (
                     transaction.trans_type === 'Real Property Tax Clearance' && (
                   <div key={`${transaction.trans_type}_${transaction.transaction_id}`} onClick={() => handleOpenViewModal(transaction, 'Real Property Tax Clearance')} className="bg-white cursor-pointer dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm flex flex-col">
                <div className="text-xs font-semibold border-t-4 border-blue-500 text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-sm px-4 py-1.5">
                  Transaction ID:{transaction.transaction_id}
                </div>
               
                <div className="flex-grow px-4 pt-5 pb-4">
                    {transaction.trans_type === 'Real Property Tax Clearance' && (
                      <>
                        <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type: {transaction.trans_type}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 my-1">TDN: {transaction.rp_tdn}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 my-1">PIN: {transaction.rp_pin}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 my-1">
                          Date Processed: {moment(transaction.date_processed).format('MMMM D, YYYY')}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 my-1">
                          Time Processed: {moment(transaction.date_processed).format('h:mm A')}
                        </div>
                        <div className="flex justify-start items-center text-xs text-slate-600 dark:text-slate-300 my-1">
                          <span>Status: {transaction.status_type}</span>
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Amount Paid: P {transaction.amount}</div>
                      </>
                    )}
                  </div>
                  <div className="px-4 pb-5 space-x-4 flex justify-between items-center group">
                    <div
                       onClick={() => handleOpenRejectModal(transaction, 'Real Property Tax Clearance')}
                      className="flex justify-center items-center text-center cursor-pointer p-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-sm mt-2 flex-grow"
                    >
                      <span className="text-xs font-normal">Reject</span>
                    </div>
                    <div
                    onClick={() => handleOpenDoneModal(transaction, 'Real Property Tax Clearance')}
                      className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow"
                    >
                      <span className="text-xs font-normal">Done</span>
                    </div>
                  </div>
              </div>
                )  ))}

                {/* Tax Payment Sample */}
                {uniqueTransactions.map((transaction) => (
                  transaction.trans_type === 'Real Property Tax Payment' && (
               <div key={`${transaction.trans_type}_${transaction.transaction_id}`} onClick={() => handleOpenViewModal(transaction, 'Real Property Tax Payment')} className="bg-white dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm flex flex-col">
                <div className="text-xs font-semibold text-slate-60 border-t-4 border-[#0057e7] bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-sm px-4 py-1.5">
                  Transaction ID: {transaction.transaction_id}
                </div>
                <div className="flex-grow px-4 pt-5 pb-4">
                  {transaction.trans_type === 'Real Property Tax Payment' && (
                    <>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type: {transaction.trans_type}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Account Name: {transaction.acc_name} </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">TDN: {transaction.rp_tdn}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">PIN: {transaction.rp_pin} </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">From: 1st Quarter </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">To: {transaction.period_id} </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date Processed: {moment(transaction.date_processed).format('MMMM D, YYYY')} </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Time Processed: {moment(transaction.date_processed).format('h:mm A')}</div>
                      <div className="flex justify-start items-center text-xs text-slate-600 dark:text-slate-300 my-1">
                        <span>Status: {transaction.status_type}</span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Amount Paid: P {transaction.amount}</div>
                    </>
                  )}
                </div>
                <div className="px-4 pb-5 space-x-4 flex justify-between items-center group">
                  <div  onClick={() => handleOpenRejectModal(transaction, 'Real Property Tax Payment')}  className="flex justify-center items-center text-center cursor-pointer p-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-sm mt-2 flex-grow">
                    <span className="text-xs font-normal">Reject</span>
                  </div>
                  <div onClick={() => handleOpenDoneModal(transaction, 'Real Property Tax Payment')} className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow">
                    <span className="text-xs font-normal">Done</span>
                  </div>
                </div>
              </div>
           ) ))}

           {isViewModalOpen && selectedTransaction && (
  <AdminRPView
    selectedTransaction={selectedTransaction}
    isOpen={isViewModalOpen}
    handleClose={handleViewModalClose}
    setTransType={setTransType}
  />
)}
         {isRejectModalOpen && selectedTransaction && (
        <AdminRPReject
          transactions={transactions}
          selectedTransaction={selectedTransaction}
          isOpen4={isRejectModalOpen}
          setTransactions={setTransactions}
          handleClose4={() => {
            handleCloseModals();
            handleRejectClick(selectedTransaction.transaction_id);
          }}
          setTransType={setTransType}
        />
      )}
      

      {isDoneModalOpen && selectedTransaction && (
       <AdminRPDone
       transactions={transactions}
       setTransactions={setTransactions}
       selectedTransaction={selectedTransaction}
       isOpen5={isDoneModalOpen}
       handleClose5={() => {
         handleCloseModals();
         handleDoneClick(selectedTransaction.transaction_id);
       }}
       setTransType={setTransType}  // Ensure setTransType is passed
     />
      )}
                </div>
        </div>
      </div>
    </>
  );
};

export default AdminRPTaxProcessing;