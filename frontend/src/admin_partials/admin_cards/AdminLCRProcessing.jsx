import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLCRBirthView from '../admin_modals/AdminLCRBirthView';
import AdminLCRDeathView from '../admin_modals/AdminLCRDeathView';
import AdminLCRMarriageView from '../admin_modals/AdminLCRMarriageView';

import LCRCardView from "../admin_lcr/LCRCardView";
import LCRTableView from "../admin_lcr/LCRTableView";
import Loading from '../../partials/Loading';

const AdminLCRProcessing = ({ birthCert, deathCert, marriageCert, handleUpdateData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table'); 

  const [modalView, setModalView] = useState(false); 
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [isCompleteConfirm, setIsCompleteConfirm] = useState(false);
  const [isRejectConfirm, setIsRejectConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState();
  const [transType, setTransType] = useState();

  const handleSearch = (transaction) => {
    const transactionId = transaction?.transaction_id?.toUpperCase(); 
    const query = searchQuery.toUpperCase();
    return transactionId && transactionId.includes(query);  
  };

  const filteredBirthCert = birthCert ? birthCert.filter(handleSearch) : [];
  const filteredDeathCert = deathCert ? deathCert.filter(handleSearch) : [];
  const filteredMarriageCert = marriageCert ? marriageCert.filter(handleSearch) : [];  

  const handleToggleView = (mode) => {
    setViewMode(mode);
  };

  const handleModalOpen = (transaction, type) => {
    setSelectedTransaction(transaction);
    setTransType(type);
    setModalView(true);
  };

  const handleModalClose = () => {
    setModalView(false);
  };

  const handleProcessConfirm = (transaction) => {
    setSelectedTransaction(transaction);
    setIsCompleteConfirm(true);
  };

  const handleCompleteConfirm = (transaction) => {
    setSelectedTransaction(transaction);
    setIsCompleteConfirm(true);
  };

  const handleRejectConfirm = (transaction) => {
    setSelectedTransaction(transaction);
    setIsRejectConfirm(true);
  };

  const handleConfirmClose = () => {
    setIsProcessConfirm(false);
    setIsRejectConfirm(false);
  };

  const renderContent = () => {
    if (viewMode === 'table') {
      return (
        <LCRTableView
          filteredBirthCert={filteredBirthCert}
          filteredDeathCert={filteredDeathCert}
          filteredMarriageCert={filteredMarriageCert}
          handleModalOpen={handleModalOpen}
          handleRejectConfirm={handleRejectConfirm}
          handleCompleteConfirm={handleCompleteConfirm}
          handleProcessConfirm={handleProcessConfirm}
        />
      );
    } else if (viewMode === 'card') {
      return (
        <LCRCardView
          filteredBirthCert={filteredBirthCert}
          filteredDeathCert={filteredDeathCert}
          filteredMarriageCert={filteredMarriageCert}
          handleModalOpen={handleModalOpen}
          handleRejectConfirm={handleRejectConfirm}
          handleCompleteConfirm={handleCompleteConfirm}
          handleProcessConfirm={handleProcessConfirm}
        />
      );
    }
  };

  const handleComplete = async () => {  

    const transaction_id = selectedTransaction.transaction_id;
    const trans_type = selectedTransaction.trans_type;
    const user_id = selectedTransaction.user_id;
  
    try {
      const response = await axios.post(`http://localhost:8800/adminlcr/updatecomplete/${transaction_id}`, selectedTransaction);
  
      // Check the response status before proceeding
      if (response.status === 200) {

        try {
          const res = await axios.get(`http://localhost:8800/email/${user_id}`);
          
          if (res.data.user_email) {
            const updatedUserEmail = res.data.user_email;
            const f_name = res.data.f_name;
            const l_name = res.data.l_name;
            console.log('FETCHED USER EMAIL:', updatedUserEmail);

            const user_email = updatedUserEmail;

            const rowData = { ...selectedTransaction, trans_type};

            const status_type = 'C O M P L E T E';

            const body = {
              data: rowData,
              status_type: status_type,
              f_name: f_name,
              l_name: l_name
            };
  
            // Proceed with additional logic after updating state
            try {
              const emailResponse = await axios.post(`http://localhost:8800/email/send-email/${user_email}`, body);
  
              if (emailResponse.data && emailResponse.data.message) {
                console.log('SENT EMAIL');
              } else {
                console.log("Failed to send email.");
              }
            } catch (emailError) {
              // alert(emailError);
            }
          } else {
            console.error('Transaction error:', res.statusText);
          }
        } catch (fetchError) {
          console.log('NOT FETCHING EMAIL');
          console.error(fetchError);
        }

        setIsLoading(false);
        handleConfirmClose();
        handleUpdateData();
        setSelectedTransaction('');

        setIsSuccess(true); // Set success state to true
        console.log('Update successful');

        setTimeout(() => {
          setIsSuccess(false);
        }, 2100);
      } else {
        console.error('Transaction error:', response.statusText);
      }
    } catch (err) {
      console.error('Transaction error:', err);
    }
  };


  const handleReject = async () => {  

    const transaction_id = selectedTransaction.transaction_id;
    const trans_type = selectedTransaction.trans_type;
    const user_id = selectedTransaction.user_id;
  
    try {
      const response = await axios.post(`http://localhost:8800/adminlcr/updatereject/${transaction_id}`, selectedTransaction);
  
      // Check the response status before proceeding
      if (response.status === 200) {

        try {
          const res = await axios.get(`http://localhost:8800/email/${user_id}`);
          
          if (res.data.user_email) {
            const updatedUserEmail = res.data.user_email;
            const f_name = res.data.f_name;
            const l_name = res.data.l_name;
            console.log('FETCHED USER EMAIL:', updatedUserEmail);

            const user_email = updatedUserEmail;

            const rowData = { ...selectedTransaction, trans_type};

            const status_type = 'R E J E C T E D';

            const body = {
              data: rowData,
              status_type: status_type,
              f_name: f_name,
              l_name: l_name
            };
  
            // Proceed with additional logic after updating state
            try {
              const emailResponse = await axios.post(`http://localhost:8800/email/send-email/${user_email}`, body);
  
              if (emailResponse.data && emailResponse.data.message) {
                console.log('SENT EMAIL');
              } else {
                console.log("Failed to send email.");
              }
            } catch (emailError) {
              // alert(emailError);
            }
          } else {
            console.error('Transaction error:', res.statusText);
          }
        } catch (fetchError) {
          console.log('NOT FETCHING EMAIL');
          console.error(fetchError);
        }

        setIsLoading(false);
        handleConfirmClose();
        handleUpdateData();
        setSelectedTransaction('');

        setIsSuccess(true); // Set success state to true
        console.log('Update successful');

        setTimeout(() => {
          setIsSuccess(false);
        }, 2100);
      } else {
        console.error('Transaction error:', response.statusText);
      }
    } catch (err) {
      console.error('Transaction error:', err);
    }
  };
  
    return (
      <>
        {/* Requests Area */}
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] rounded-sm border border-slate-200">
          <div className="px-5 py-5">
            <h1 className='font-medium text-center text-slate-700 dark:text-white mb-4'>Processing Section</h1>

            {isSuccess && (                
            <div className="my-5 text-center">
              <div className='text-emerald-500 bg-emerald-100 md:text-sm text-xs text-center rounded-full py-1.5'>Transaction update successful!</div> 
            </div>
            )}

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
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.toUpperCase())} id="searchInput" type="text" placeholder="Search ID..." className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
              </div>
            </div>
  
            {/* Render Content */}
            {renderContent()}
            
            {/* All Modals */}
            {/* PROCESS MODAL */}
          {isCompleteConfirm && (
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
                          Would you like to mark this transaction as complete?
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-[#212121] px-4 py-3 gap-3 sm:px-6 flex justify-end">
                      <button
                        onClick={handleConfirmClose}
                        type="button"
                        className="text-slate-500 text-xs md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                      >
                        <p>Cancel</p>
                      </button>
                    
                    <button
                    onClick={handleComplete} 
                    type="button"
                    className="text-white text-xs md:text-sm bg-emerald-500 border border-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Confirm
                    </button>
                    </div>
                    
                    {isLoading ? (
                      <Loading />
                    ) : null}

                  </div>
                </div>
              </div>
            )}

            {/* REJECT MODAL */}
            {isRejectConfirm && (
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
                          Are you sure you would like to REJECT this transaction? This is irreversible.
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-[#212121] px-4 py-3 gap-3 sm:px-6 flex justify-end">
                      <button
                        onClick={handleConfirmClose}
                        type="button"
                        className="text-slate-500 text-xs md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                      >
                      <p>Cancel</p>
                      </button>
                    
                      <button
                      onClick={handleReject} 
                      type="button"
                      className="text-white text-xs md:text-sm bg-emerald-500 border border-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Confirm
                      </button>
                      </div>

                      {isLoading ? (
                      <Loading />
                    ) : null}
                    
                  </div>
                </div>
              </div>
            )}

                {transType === 'Birth Certificate' && (
                  <AdminLCRBirthView
                    selectedTransaction={selectedTransaction}
                    isOpen={modalView}
                    handleClose={handleModalClose}
                    transType={transType}
                  />
                )}
                {transType === 'Death Certificate' && (
                  <AdminLCRDeathView
                    selectedTransaction={selectedTransaction}
                    isOpen={modalView}
                    handleClose={handleModalClose}
                    transType={transType}
                  />
                )}
                {transType === 'Marriage Certificate' && (
                  <AdminLCRMarriageView
                    selectedTransaction={selectedTransaction}
                    isOpen={modalView}
                    handleClose={handleModalClose}
                    transType={transType}
                  />
                )}
          </div>
        </div>
      </>
    );
  };
  
  export default AdminLCRProcessing;
  