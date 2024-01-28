import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Flatpickr from 'react-flatpickr';

import AdminRPView from '../admin_modals/AdminRPView';
import RPCardView from '../admin_rptax/RPCardView';
import RPTableView from '../admin_rptax/RPTableView';



const AdminRPTaxRequests = ({ taxPayment, taxClearance, handleUpdateData }) => {

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDatee, setSelectedDatee] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table'); 

  const [modalView, setModalView] = useState(false); 
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [isProcessConfirm, setIsProcessConfirm] = useState(false);
  const [isRejectConfirm, setIsRejectConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState();
  const [transType, setTransType] = useState();

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
    setIsProcessConfirm(true);
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
        <RPTableView
          filteredTaxClearance={filteredTaxClearance}
          filteredTaxPayment={filteredTaxPayment}
          handleModalOpen={handleModalOpen}
          handleRejectConfirm={handleRejectConfirm}
          handleProcessConfirm={handleProcessConfirm}
          section={'Requests'}
        />
      );
    } else if (viewMode === 'card') {
      return (
        <RPCardView
          filteredTaxClearance={filteredTaxClearance}
          filteredTaxPayment={filteredTaxPayment}
          handleModalOpen={handleModalOpen}
          handleRejectConfirm={handleRejectConfirm}
          handleProcessConfirm={handleProcessConfirm}
          section={'Requests'}
        />
      );
    }
  };


  const handleProcess = async () => {  

    const transaction_id = selectedTransaction.transaction_id;
    const trans_type = selectedTransaction.trans_type;
    const user_id = selectedTransaction.user_id;
  
    try {
      const response = await axios.post(`http://localhost:8800/adminrptax/updateprocess/${transaction_id}`, selectedTransaction);
  
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

            const status_type = 'P R O C E S S I N G';

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
      const response = await axios.post(`http://localhost:8800/adminrptax/updatereject/${transaction_id}`, selectedTransaction);
  
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
            <h1 className='font-medium text-center text-slate-700 dark:text-white mb-4'>Tax Clearance and Tax Payment Requests</h1>

            {isSuccess && (                
              <div className="my-5 text-center">
                <div className='text-emerald-500 bg-emerald-100 md:text-sm text-xs text-center rounded-full py-1.5'>Transaction update successful!</div> 
              </div>
              )}

            {/* Search */}
            <div className="flex flex-col items-center md:flex-row text-xs pb-5">
              <div className="relative w-full sm:w-4/5 sm:pr-4 mb-[0.5rem] sm:mb-0">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </span>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.toUpperCase())} id="searchInput" type="text" placeholder="Search ID..." className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
              </div>
              <div className="flex items-center w-full sm:w-4/5 sm:pr-4 mb-[0.5rem] sm:mb-0">
                  <span className="pr-1 text-slate-700 dark:text-white">Type:</span>
                    <select  onChange=""  value=""  name=""  id=""  className="text-xs border bg-transparent border-slate-300 text-slate-700 dark:text-white pl-2 py-1 rounded-sm peer cursor-pointer w-full">
                      <option value="SELECTSTATUS" className="dark:bg-[#3d3d3d]">Select Type</option>
                      <option value="RPTAXPAYMENT" className="dark:bg-[#3d3d3d]">Real Property Tax Payment</option>
                      <option value="RPTAXCLEARANCE" className="dark:bg-[#3d3d3d]">Real Property Tax Clearance</option>
                      <option value="BUSINESSPERMIT" className="dark:bg-[#3d3d3d]">Business Permit</option>
                      <option value="CTC" className="dark:bg-[#3d3d3d]">Community Tax Certificate</option>
                      <option value="BIRTHC" className="dark:bg-[#3d3d3d]">Birth Certificate</option>
                      <option value="DEATHC" className="dark:bg-[#3d3d3d]">Death Certificate</option>
                      <option value="MARRIAGEC" className="dark:bg-[#3d3d3d]">Marriage Certificate</option>
                  </select>
                </div>
              <div className="flex w-full items-center sm:pr-4 mb-[0.5rem] sm:mb-0">
                <p className="pr-1 text-slate-700 dark:text-white">Date:</p>
                <Flatpickr
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date[0])}
                  options={{
                    dateFormat: 'Y-m-d',
                    altInput: true,
                    altFormat: 'F j, Y',
                    appendTo: document.body,
                    onOpen: function (selectedDates, dateStr, instance) {
                      if (document.documentElement.classList.contains('dark')) {
                        const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                        if (monthDropdown) {
                          monthDropdown.style.backgroundColor = '#212121';
                        }
                      }
                    },
                    onClose: function (selectedDates, dateStr, instance) {
                      const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                      if (monthDropdown) {
                        monthDropdown.style.backgroundColor = '';
                      }
                    },
                  }}
                  placeholder="From"
                  className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-2 py-1 md:py-0.5 rounded-sm"
                />
                <span className="px-1">-</span>
                <Flatpickr
                  value={selectedDatee}
                  onChange={(date) => setSelectedDatee(date[0])}
                  options={{
                    dateFormat: 'Y-m-d',
                    altInput: true,
                    altFormat: 'F j, Y',
                    appendTo: document.body,
                    onOpen: function (selectedDates, dateStr, instance) {
                      if (document.documentElement.classList.contains('dark')) {
                        const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                        if (monthDropdown) {
                          monthDropdown.style.backgroundColor = '#212121';
                        }
                      }
                    },
                    onClose: function (selectedDates, dateStr, instance) {
                      const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                      if (monthDropdown) {
                        monthDropdown.style.backgroundColor = '';
                      }
                    },
                  }}
                  placeholder="To"
                  className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-2 py-1 md:py-0.5 rounded-sm"
                />
              </div> 
              <div className="flex w-full sm:w-32 items-center justify-center">
                <button onClick="" className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-1 w-full rounded-sm inline-flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span>&nbsp;Clear</span>
                </button>
              </div>
              {/* View Toggle */}
            <div className="flex items-center text-xs ml-2">
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
            </div>

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
            {/* <div className="flex flex-col items-center md:flex-row text-xs mx-2 mb-2 sm:mb-7">
              <div className="relative flex flex-col items-center md:flex-row w-full">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mb-[0.5rem] sm:mb-0">
                    <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </span>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.toUpperCase())} id="searchInput" type="text" placeholder="Search ID..." className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white mr-0 sm:mr-2 pl-8 py-1 md:py-0.5 rounded-sm mb-2 md:mb-0"/>
              </div>
              <div className="flex w-full items-center">
                <p className="pr-1 text-slate-700 dark:text-white">Date:</p>
                <Flatpickr
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date[0])}
                  options={{
                    dateFormat: 'Y-m-d',
                    altInput: true,
                    altFormat: 'F j, Y',
                    appendTo: document.body,
                    onOpen: function (selectedDates, dateStr, instance) {
                      if (document.documentElement.classList.contains('dark')) {
                        const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                        if (monthDropdown) {
                          monthDropdown.style.backgroundColor = '#212121';
                        }
                      }
                    },
                    onClose: function (selectedDates, dateStr, instance) {
                      const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                      if (monthDropdown) {
                        monthDropdown.style.backgroundColor = '';
                      }
                    },
                  }}
                  placeholder="From"
                  className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-2 py-1 md:py-0.5 rounded-sm"
                />
                <span className="px-1">-</span>
                <Flatpickr
                  value={selectedDatee}
                  onChange={(date) => setSelectedDatee(date[0])}
                  options={{
                    dateFormat: 'Y-m-d',
                    altInput: true,
                    altFormat: 'F j, Y',
                    appendTo: document.body,
                    onOpen: function (selectedDates, dateStr, instance) {
                      if (document.documentElement.classList.contains('dark')) {
                        const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                        if (monthDropdown) {
                          monthDropdown.style.backgroundColor = '#212121';
                        }
                      }
                    },
                    onClose: function (selectedDates, dateStr, instance) {
                      const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                      if (monthDropdown) {
                        monthDropdown.style.backgroundColor = '';
                      }
                    },
                  }}
                  placeholder="To"
                  className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-2 py-1 md:py-0.5 rounded-sm"
                />
              </div>      
            </div> */}

            
          
  
            {/* Render Content */}
            {renderContent()}
          

            {/* PROCESS MODAL */}
            {isProcessConfirm && (
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
                          Are you sure you would like to move this transaction into the Processing section?
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
                    onClick={() => {
                      handleProcess();
                      setIsLoading(true);
                    }}
                    type="button"
                    className="text-white text-xs md:text-sm bg-emerald-500 border border-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-emerald-500 dark:text-white dark:hover:text-white dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                    >
                    Confirm
                    </button>
                    </div>

                    <div className="font-medium flex bg-white dark:bg-[#212121] text-slate-700 dark:text-white pb-2 sm:mt-0 text-xs md:text-sm items-center justify-center">
                    {/* FOR DESIGN PURPOSES, APPLY THE MODIFICATION AT THE BOTTOM, AND REMOVE AFTER*/}
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="pl-2">
                      Please wait for a moment...
                    </span>

                    {isLoading ? (
                      <span>
                        Please wait for a moment...
                      </span>
                    ) : null}
                    </div>

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
                    onClick={() => {
                      handleReject();
                      setIsLoading(true);
                    }}
                    type="button"
                    className="text-white text-xs md:text-sm bg-emerald-500 border border-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-emerald-500 dark:text-white dark:hover:text-white dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                    >
                      Confirm
                    </button>

                  </div>

                  <div className="font-medium flex bg-white dark:bg-[#212121] text-slate-700 dark:text-white pb-2 sm:mt-0 text-xs md:text-sm items-center justify-center">
                    {/* FOR DESIGN PURPOSES, APPLY THE MODIFICATION AT THE BOTTOM, AND REMOVE AFTER*/}
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="pl-2">
                      Please wait for a moment...
                    </span>


                    {isLoading ? (
                      <span>
                        Please wait for a moment...
                      </span>
                    ) : null}
                    </div>

                  </div>
                </div>
              </div>
            )}

            

            {selectedTransaction && modalView && (
            <AdminRPView
              // selectedTransaction={selectedTransaction}
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
  
  
  export default AdminRPTaxRequests;
  