import React, { useState, useEffect } from 'react';
import moment from 'moment/moment.js';
import axios from 'axios';
import AdminRPView from '../admin_modals/AdminRPView';

const AdminRPTaxProcessing = ({ setTransType }) => {
  const [processingTransactions, setProcessingTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState(processingTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); 
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const handleOpenDoneModal = (transaction, type) => {
    setTransType(type);
    setSelectedTransaction(transaction);
    setIsConfirmOpen(true); // Use the correct state variable
  };
  const handleOpenViewModal = (transaction, type) => {
    setTransType(type);
    setSelectedTransaction(transaction);
    setIsViewModalOpen(true);
  };

  const handleOpenRejectModal = (transaction, type) => {
    setTransType(type);
    setSelectedTransaction(transaction);
    setIsConfirmOpen(true);
  };

  const handleOpenCompleteModal = (transaction, type) => {
    setTransType(type);
    setSelectedTransaction(transaction);
    setIsCompleteModalOpen(true);
  };
  
    useEffect(() => {
      const fetchProcessingTransactions = async () => {
        try {
          const response = await axios.get('http://localhost:8800/adminrptax/Processing');
          const data = response.data;
  
          // Assuming the response structure includes 'taxpayment' and 'taxclearance' arrays
          const processingTransactions = [...data.taxpayment, ...data.taxclearance];
  
          setProcessingTransactions(processingTransactions);
        } catch (error) {
          console.error('Error fetching processing transactions', error);
        }
      };
  
      fetchProcessingTransactions();
    }, []);
 

const handleDoneClick = async () => {
  try {
    if (!selectedTransaction) {
      console.error('No transaction selected');
      return;
    }

    const body = {
      new_status: 'Complete',
    };

    const response = await fetch(`http://localhost:8800/adminrptax/updateComplete/${selectedTransaction.transaction_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const updatedTransactions = transactions.map((transaction) =>
    transaction.transaction_id === selectedTransaction.transaction_id
      ? { ...transaction, status_type: 'Complete' }
      : transaction
  );

  setTransactions(updatedTransactions);
  handleCloseModal();
} catch (error) {
  console.error('Error updating transaction', error);
}
};

const handleCloseModal = () => {
  setIsConfirmOpen(false);
  setIsViewModalOpen(false);
  setIsCompleteModalOpen(false);
  setSelectedTransaction(null);
};

    const handleRejectClick = async () => {
      try {
        const body = {
          new_status: 'Rejected',
        };
    
        const response = await fetch(`http://localhost:8800/adminrptax/updateReject/${selectedTransaction.transaction_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
  
        const updatedTransactions = transactions.map((transaction) =>
        transaction.transaction_id === selectedTransaction.transaction_id
          ? { ...transaction, status_type: 'Rejected' }
          : transaction
      );

      setTransactions(updatedTransactions);
      handleCloseModal();
    } catch (error) {
      console.error('Error rejecting transaction', error);
    }
  };
   
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
  const filteredTransactions = uniqueTransactions.filter(handleSearch);
  
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
                  {filteredTransactions.map((transaction) => (
                     transaction.trans_type === 'Real Property Tax Clearance' && (
                   <div key={`${transaction.trans_type}_${transaction.transaction_id}`} onClick={() => handleOpenViewModal(transaction, 'Real Property Tax Clearance')} className="cursor-pointer bg-white cursor-pointer dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm flex flex-col">
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
                    onClick={() => handleOpenCompleteModal(transaction, 'Real Property Tax Clearance')}
                      className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow"
                    >
                      <span className="text-xs font-normal">Complete</span>
                    </div>
                  </div>
              </div>
                )  ))}

                {/* Tax Payment Sample */}
                {filteredTransactions.map((transaction) => (
                  transaction.trans_type === 'Real Property Tax Payment' && (
               <div key={`${transaction.trans_type}_${transaction.transaction_id}`} onClick={() => handleOpenViewModal(transaction, 'Real Property Tax Payment')} className="cursor-pointer bg-white dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm flex flex-col">
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
                  <div onClick={() => handleOpenCompleteModal(transaction, 'Real Property Tax Payment')} className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow">
                    <span className="text-xs font-normal">Complete</span>
                  </div>
                </div>
              </div>
           ) ))}
            {/* REJECT MODAL */}
            {isConfirmOpen && (
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
                              Are you sure to REJECT this card? This is IRREVERSIBLE.
                              </span>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-[#212121] px-4 py-3 gap-3 sm:px-6 flex justify-end">
                            <button
                            onClick={(e) => {
                              e.stopPropagation(); // Add this line to prevent event propagation
                              handleCloseModal();
                            }}
                              type="button"
                              className="text-slate-500 text-xs md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                            >
                              <p>Cancel</p>
                            </button>
                            <button
                              onClick={handleRejectClick}
                              type="button"
                              className="text-white text-xs md:text-sm bg-red-500 border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              <p>Reject</p>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )} 

          {/* COMPLETE MODAL */}
          {isCompleteModalOpen && (
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
                        Are you sure to COMPLETE this transaction? This is IRREVERSIBLE.
                      </span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#212121] px-4 py-3 gap-3 sm:px-6 flex justify-end">
                    <button
                      onClick={handleCloseModal}
                      type="button"
                      className="text-slate-500 text-xs md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                    >
                      <p>Cancel</p>
                    </button>
                    <button
                      onClick={handleDoneClick} // Adjust the function for completing the transaction
                      type="button"
                      className="text-white text-xs md:text-sm bg-emerald-500 border border-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <p>Complete</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

            {isViewModalOpen && selectedTransaction && !isCompleteModalOpen && !isConfirmOpen &&(
              <AdminRPView
              selectedTransaction={selectedTransaction}
              isOpen={isViewModalOpen}
              handleClose={handleCloseModal}
              />
            )}

                </div>
        </div>
      </div>
    </>
  );
};

export default AdminRPTaxProcessing;