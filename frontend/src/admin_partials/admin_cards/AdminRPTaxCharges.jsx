import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import Flatpickr from 'react-flatpickr';

import AdminRPView from '../admin_modals/AdminRPView';
import RPCardView from '../admin_rptax/RPCardView';
import RPTableView from '../admin_rptax/RPTableView';
import Loading from '../../partials/Loading';
import AdminRPCharges from '../admin_modals/AdminRPCharges';

const AdminRPTaxCharges = ({ taxPayment, taxClearance, handleUpdateData }) => {

  const { admin_uname } = useParams();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [modalView, setModalView] = useState(false);
  const [modalViewCharge, setModalViewCharge] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessConfirm, setIsProcessConfirm] = useState(false);
  const [isRejectConfirm, setIsRejectConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState();
  const [transType, setTransType] = useState();

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDatee, setSelectedDatee] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [searchTDN, setSearchTDN] = useState(''); 
  const [searchPIN, setSearchPIN] = useState('');
  const [filteredTaxClearance, setFilteredTaxClearance] = useState([]); 
  const [filteredTaxPayment, setFilteredTaxPayment] = useState([]); 
  const [sortOrder, setSortOrder] = useState('desc');

  const [warning, setWarning] = useState(false);

  const Base_Url = process.env.Base_Url;


  const handleSearch = () => {
    let filteredClearance = taxClearance.filter(transaction => {
      const transactionId = transaction.transaction_id.toUpperCase();
      const query = searchQuery.toUpperCase();
      const TIN = transaction.rp_tdn.toUpperCase();
      const PIN = transaction.rp_pin.toUpperCase();
  
      const isDateInRange = () => {
        if (!selectedDate || !selectedDatee) {
          return true; // No date range selected, include all transactions
        }
  
        const transactionDate = new Date(transaction.date_processed);
        const startDate = new Date(selectedDate);
        const endDate = new Date(selectedDatee);
        endDate.setHours(23, 59, 59, 999);
  
        return startDate <= transactionDate && transactionDate <= endDate;
      };
  
      const isTypeMatch = !selectedType || selectedType === 'All' || parseInt(selectedType) === 0 ||
        (selectedType === 'Real Property Tax Payment' && transaction.trans_type === 'Real Property Tax Payment') ||
        (selectedType === 'Real Property Tax Clearance' && transaction.trans_type === 'Real Property Tax Clearance');
  
      return transactionId.includes(query) && (TIN.includes(searchTDN.toUpperCase()) || searchTDN === '') && (searchPIN === '' || PIN.includes(searchPIN.toUpperCase())) && isTypeMatch && isDateInRange();
    });
  
    let filteredPayment = taxPayment.filter(transaction => {
      const transactionId = transaction.transaction_id.toUpperCase();
      const query = searchQuery.toUpperCase();
      const TIN = transaction.rp_tdn.toUpperCase();
      const PIN = transaction.rp_pin.toUpperCase();
  
      const isDateInRange = () => {
        if (!selectedDate || !selectedDatee) {
          return true; // No date range selected, include all transactions
        }
  
        const transactionDate = new Date(transaction.date_processed);
        const startDate = new Date(selectedDate);
        const endDate = new Date(selectedDatee);
        endDate.setHours(23, 59, 59, 999);
  
        return startDate <= transactionDate && transactionDate <= endDate;
      };
  
      const isTypeMatch = !selectedType || selectedType === 'All' || parseInt(selectedType) === 0 ||
        (selectedType === 'Real Property Tax Payment' && transaction.trans_type === 'Real Property Tax Payment') ||
        (selectedType === 'Real Property Tax Clearance' && transaction.trans_type === 'Real Property Tax Clearance');
  
      return transactionId.includes(query) && (TIN.includes(searchTDN.toUpperCase()) || searchTDN === '') && (searchPIN === '' || PIN.includes(searchPIN.toUpperCase())) && isTypeMatch && isDateInRange();
    });

    if (filteredClearance.length > 0) {
      filteredClearance = filteredClearance.sort((a, b) => {
        const dateA = new Date(a.date_processed);
        const dateB = new Date(b.date_processed);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    if (filteredPayment.length > 0) {
      filteredPayment = filteredPayment.sort((a, b) => {
        const dateA = new Date(a.date_processed);
        const dateB = new Date(b.date_processed);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }
  
    setFilteredTaxClearance(filteredClearance);
    setFilteredTaxPayment(filteredPayment);
  };  
  
  useEffect(() => {
    setFilteredTaxClearance(taxClearance);
  }, [taxClearance]);
  
  useEffect(() => {
    setFilteredTaxPayment(taxPayment);
  }, [taxPayment]);
  
  const handleClearFilter = () => {
    setSearchQuery('');
    setSearchTDN('');
    setSearchPIN('');
    setSelectedDate('');
    setSelectedDatee('');
    setSortOrder('desc');
    setSelectedType('All');
    setFilteredTaxClearance(taxClearance);
    setFilteredTaxPayment(taxPayment);
  };
  
  const handleInputChange = (e) => {
    const selectedType = e.target.value;
    setSelectedType(selectedType);
  };

  const toggleDropdown = () => {
    console.log('Toggling dropdown state');
    setDropdownOpen(!isDropdownOpen);
  };

  const handleToggleView = (mode) => {
    setViewMode(mode);
  };

  const handleChargeOpen = (transaction, type) => {
    setSelectedTransaction(transaction);
    setTransType(type);
    setModalViewCharge(true);
  };

  const handleChargeClose = () => {
    setModalViewCharge(false);
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

  const [rejectCause, setRejectCause] = useState('');
  const [continueButtonDisabled, setContinueButtonDisabled] = useState(true); // Initialize with true assuming initially "Select Cause" is selected


  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setRejectCause(selectedValue);
  
    // Enable the continue button if a valid option is selected, otherwise disable it
    setContinueButtonDisabled(selectedValue === "");
  };

  const renderContent = () => {
    // const hasRecords = filteredTaxClearance.length > 0 || filteredTaxPayment.length > 0;
  
    // if (!hasRecords) {
    //   return (
    //     <div className="flex items-center justify-center text-slate-400 dark:text-white text-lg h-32">
    //       No records found.
    //     </div>
    //   );
    // }

    if (viewMode === 'table') {
      return (
        <RPTableView
          filteredTaxClearance={filteredTaxClearance}
          filteredTaxPayment={filteredTaxPayment}
          handleModalOpen={handleModalOpen}
          handleChargeOpen={handleChargeOpen}
          handleRejectConfirm={handleRejectConfirm}
          handleProcessConfirm={handleProcessConfirm}
          section={'Charges'}
        />
      );
    } else if (viewMode === 'card') {
      return (
        <RPCardView
          filteredTaxClearance={filteredTaxClearance}
          filteredTaxPayment={filteredTaxPayment}
          handleModalOpen={handleModalOpen}
          handleChargeOpen={handleChargeOpen}
          handleRejectConfirm={handleRejectConfirm}
          handleProcessConfirm={handleProcessConfirm}
          section={'Charges'}
        />
      );
    }
  };


  const handleProcess = async (e, totalVal) => {
    e.preventDefault();

    // Check if the amount input is empty or null
    if (!totalVal || isNaN(parseFloat(totalVal))) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 4000);
      return;
    }

    const { user_id, transaction_id, trans_type } = selectedTransaction;

    const body = {
      user_id,
      trans_type,
      totalVal
    };

    console.log(body);

    // const transaction_id = selectedTransaction.transaction_id;
    // const trans_type = selectedTransaction.trans_type;
    // const user_id = selectedTransaction.user_id;
  
    try {
      const response = await axios.post(`${Base_Url}adminrptax/updateamount/${transaction_id}/${admin_uname}`, body);
      setIsLoading(true);
      if (response.status === 200) {
        // Fetch user_email after successful payment
        try {
          const res1 = await axios.get(`${Base_Url}transachistory/transId/${user_id}`);
          const transaction_id = res1.data[0]?.transaction_id;

          const res = await axios.get(`${Base_Url}email/${user_id}`);
          
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
    
                const trans_type = 'Real Property Tax Payment' && 'Real Property Tax Clearance';

                const amount = totalVal;
    
                const rowData = { ...selectedTransaction, transaction_id, amount, trans_type, date, time};
    
                const status_type = 'Pending';
    
                const body = {
                  data: rowData,
                  status_type: status_type,
                  sex_type: sex_type,
                  f_name: f_name,
                  l_name: l_name
                };
  
            // Proceed with additional logic after updating state
            try {
              const emailResponse = await axios.post(`${Base_Url}email/send-email/${user_email}`, body);
  
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
        setIsSuccess(true); // Set isSuccess to true first
        setIsLoading(false);
        handleConfirmClose();
        handleUpdateData();
        setSelectedTransaction('');
        console.log('Update successful');

        setTimeout(() => {
        setIsSuccess(false); // Set isSuccess to false after the other operations
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

    const body = {
      selectedTransaction,
      rejectCause
    }
  
      // const retrieveResponse = await axios.get(`${Base_Url}payment/create-checkout-retrieve/${transaction_id}`);

      // console.log("retrieveResponse" , retrieveResponse.data)
      // const payment_method = retrieveResponse.data.data.attributes.payments[0].attributes.source.type;
      // const formatted_payment_method = payment_method.charAt(0).toUpperCase() + payment_method.slice(1);
      // console.log("payment_method", formatted_payment_method);
      // const service_requested = retrieveResponse.data.data.attributes.description;
      // console.log("Service Requested", service_requested)
      
      const response = await axios.post(`${Base_Url}adminrptax/updatereject/${transaction_id}/${admin_uname}`, body);
      setIsLoading(true);
      // Check the response status before proceeding
      if (response.status === 200) {

        try {
          const res = await axios.get(`${Base_Url}email/${user_id}`);
          
          if (res.data.user_email) {
            const updatedUserEmail = res.data.user_email;
            const f_name = res.data.f_name;
            const l_name = res.data.l_name;
            const sex_type = res.data.sex_type;
            // console.log('FETCHED USER EMAIL:', updatedUserEmail);

            const user_email = updatedUserEmail;

            const rowData = { ...selectedTransaction, trans_type};

            const statusType = 'Rejected';

            const body = {
              data: rowData,
              f_name: f_name,
              l_name: l_name,
              sex_type: sex_type,
              status_type: statusType,
            };
  
            // Proceed with additional logic after updating state
            try {
              const emailResponse = await axios.post(`${Base_Url}email/send-email/${user_email}`, body);
  
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

        try {
          const res = await axios.get(`${Base_Url}email/${user_id}`);
          
          if (res.data.user_email) {
            const updatedUserEmail = res.data.user_email;
            const f_name = res.data.f_name;
            const l_name = res.data.l_name;
            const sex_type = res.data.sex_type;
            // console.log('FETCHED USER EMAIL:', updatedUserEmail);

            const user_email = updatedUserEmail;

            const rowData = { ...selectedTransaction, trans_type};

            const statusType = 'Refunded';

            const body = {
              data: rowData,
              f_name: f_name,
              l_name: l_name,
              sex_type: sex_type,
              status_type: statusType,
              // formatted_payment_method: formatted_payment_method,
              // transaction_id: transaction_id,
              // service_requested: service_requested,
            };
  
            // Proceed with additional logic after updating state
            try {
              const emailResponse = await axios.post(`${Base_Url}email/send-email/${user_email}`, body);
              const emailrefund = await axios.post(`${Base_Url}email/refund/${user_email}`, body);

              if (emailResponse.data && emailResponse.data.message && emailrefund.data && emailrefund.data.message) {
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
        setIsSuccess(true); // Set isSuccess to true first
        setIsLoading(false);
        handleConfirmClose();
        handleUpdateData();
        setSelectedTransaction('');
        console.log('Update successful');

        setTimeout(() => {
        setIsSuccess(false); // Set isSuccess to false after the other operations
      }, 2100);
      } else {
        console.error('Transaction error:', response.statusText);
      }

  };


    return (
      <>
        {/* Requests Area */}
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] rounded-sm border border-slate-200">
          <div className="px-5 py-5">
            <h1 className='font-medium text-center text-slate-700 dark:text-white mb-4'>Tax Clearance and Tax Payment Charges</h1>

            {isSuccess && (                
              <div className="my-5 text-center">
                <div className='text-emerald-500 bg-emerald-100 md:text-sm text-xs text-center rounded-full py-1.5'>Transaction update successful!</div> 
              </div>
              )}

          {/* Search */}
          <div className="flex flex-col items-center sm:flex-row text-xs pb-5">
            <div className="flex-row flex justify-end w-full">
            {/* Filter Button */}
            <div className="relative w-full sm:w-20 text-left z-10">
                <button type="button" onClick={toggleDropdown} className="bg-blue-500 hover:bg-blue-600 text-white justify-center py-1 mr-2 w-full rounded-sm inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path className="stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
                  <span className="pl-1">Filter</span>
                </button>

              {isDropdownOpen && (
              <div className="absolute w-[270px] origin-top-right py-2 px-3 bg-white dark:bg-[#212121] dark:text-slate-400 rounded-sm shadow-2xl z-20 md:right-10 sm:w-[405px]">

              {/* Date Row */}
              <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                  <span className="hidden sm:block text-xs">Date:</span>
                  <span>
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
                          const monthDropdown = instance.calendarContainer.querySelector(
                              '.flatpickr-monthDropdown-months'
                          );
                          if (monthDropdown) {
                              monthDropdown.style.backgroundColor = '#212121';
                          }
                          }
                      },
                      onClose: function (selectedDates, dateStr, instance) {
                          const monthDropdown = instance.calendarContainer.querySelector(
                          '.flatpickr-monthDropdown-months'
                          );
                          if (monthDropdown) {
                          monthDropdown.style.backgroundColor = '';
                          }
                      },
                      }}
                      placeholder="From"
                      className="bg-transparent text-xs border border-slate-300 text-slate-700 dark:text-white py-1 md:py-0.5 rounded-sm w-[110px] sm:w-[150px]"
                  />
                  <span> - </span>
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
                          const monthDropdown = instance.calendarContainer.querySelector(
                              '.flatpickr-monthDropdown-months'
                          );
                          if (monthDropdown) {
                              monthDropdown.style.backgroundColor = '#212121';
                          }
                          }
                      },
                      onClose: function (selectedDates, dateStr, instance) {
                          const monthDropdown = instance.calendarContainer.querySelector(
                          '.flatpickr-monthDropdown-months'
                          );
                          if (monthDropdown) {
                          monthDropdown.style.backgroundColor = '';
                          }
                      },
                      }}
                      placeholder="To"
                      className="bg-transparent text-xs border border-slate-300 text-slate-700 dark:text-white py-1 md:py-0.5 rounded-sm w-[110px] sm:w-[150px]"
                  />
                  </span>
              </div>

              <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                  <span className="hidden sm:block text-xs">Sort Date by:</span>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    name="sortOrder"
                    id="sortOrder"
                    className="text-xs border bg-transparent border-slate-300 text-slate-700 dark:text-white pl-4 rounded-sm peer cursor-pointer py-1 md:py-0.5 w-[235px]">
                
                    <option value="desc" className="dark:bg-[#3d3d3d]">
                      Newest to Oldest
                    </option>
                    <option value="asc" className="dark:bg-[#3d3d3d]">
                      Oldest to Newest
                    </option>
                    
                  </select>
                </div>

              {/* Type Row */}
              <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                  <span className="hidden sm:block text-xs">Type:</span>
                  <select value={selectedType} onChange={handleInputChange} name="typeDropdown"  id="typeDropdown"  className="text-xs border bg-transparent border-slate-300 text-slate-700 dark:text-white pl-4 rounded-sm peer cursor-pointer py-1 md:py-0.5 w-[235px]">
                    <option value="All" className="dark:bg-[#3d3d3d]">Select Type</option>
                    <option value="Real Property Tax Payment" className="dark:bg-[#3d3d3d]">Real Property Tax Payment</option>
                    <option value="Real Property Tax Clearance" className="dark:bg-[#3d3d3d]">Real Property Tax Clearance</option>
                  </select>
              </div>


              {/* Transaction ID */}
              <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                  <span className="hidden sm:block pr-10 text-xs">Transaction ID:</span>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                  </span>
                  <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.toUpperCase())} id="searchInput" type="text" placeholder="Search ID..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
                </div>
              </div>

                {/* TDN */}
                <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                  <span className="hidden sm:block pr-10 text-xs">TDN:</span>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                  </span>
                  <input value={searchTDN} onChange={(e) => setSearchTDN(e.target.value.toUpperCase())} id="searchInput" type="text" placeholder="Search TDN..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
                </div>
              </div>

                {/* PIN */}
                <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                  <span className="hidden sm:block pr-10 text-xs">PIN:</span>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                  </span>
                  <input value={searchPIN} onChange={(e) => setSearchPIN(e.target.value.toUpperCase())} id="searchInput" type="text" placeholder="Search PIN..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
                </div>
              </div>

              <button type="button" onClick={() => { handleSearch(); toggleDropdown(); }} className=" bg-blue-500 hover:bg-blue-600 text-white mr-[6px] sm:mr-[0px] px-4 py-1 mt-2 mb-0.5 rounded-sm flex items-center ml-auto">
                  <span className="mx-auto">Filter</span>
              </button>
              </div>
              )}
            </div>

            {/* Clear Button */}
            <div className="w-full sm:w-20 ml-2">
            <button type="button" onClick={handleClearFilter} className="bg-slate-500 hover:bg-slate-600 text-white justify-center py-1 w-full rounded-sm inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
                <span className="pl-1">Clear</span>
            </button>
            </div>
            </div>

              {/* View Toggle */}
            <div className="flex items-center text-xs sm:ml-2 mt-5 sm:mt-0">
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
                  <div className="inline-block align-bottom bg-white rounded-sm text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white dark:bg-[#212121] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="mx-auto mt-4">
                        <span className="font-medium text-slate-700 dark:text-white sm:mt-0 text-xs md:text-sm" id="modal-headline">
                          Are you sure you would like to move this transaction into the Processing section?
                        </span>
                      </div>
                    </div>


                    {isLoading ? (
                      <div className="bg-white dark:bg-[#212121] text-slate-700 dark:text-white px-1 pb-1 rounded-b-lg mt-[-10px]">
                        <Loading />
                      </div>
                    ) : (
                      <>
                    <div className="bg-white dark:bg-[#212121] px-4 py-3 gap-3 sm:px-6 flex justify-end">
                    <button
                      onClick={handleConfirmClose}
                      type="button"
                      className="text-slate-500 text-xs md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                    >
                      <p>Cancel</p>
                    </button>

                    <button
                    onClick={handleProcess}
                    type="button"
                    className="text-white text-xs md:text-sm bg-emerald-500 border border-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-emerald-500 dark:text-white dark:hover:text-white dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                    >
                    Confirm
                    </button>
                    </div>
                    </>
                    )}


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
      <div className="inline-block align-bottom bg-white rounded-sm text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white dark:bg-[#212121] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="mx-auto mt-4">
          {rejectCause === "" && (
              <p className="font-medium text-red-500 sm:mt-2 text-xs md:text-sm" id="modal-headline">
                Please select specify concern accordingly.
              </p>
            )}
            <p className="font-medium text-slate-700 dark:text-white sm:mt-0 text-xs md:text-sm" id="modal-headline">
              Are you sure you would like to REJECT this transaction? This is irreversible.
            </p>

            <p className="font-medium text-slate-700 dark:text-white sm:mt-2 text-xs md:text-sm" id="modal-headline">
              Please select the cause of rejection.
            </p>
            <select value={rejectCause} onChange={handleOptionChange} className="block text-xs md:text-sm w-full mt-2 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-[#212121] dark:border-white dark:text-slate-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
              <option className="dark:bg-[#3d3d3d]" value="">Select Cause</option>
              <option className="dark:bg-[#3d3d3d]" value="1">Incorrect or incomplete documentation submitted</option>
              <option className="dark:bg-[#3d3d3d]" value="2">Failure to adhere to specific procedural requirements</option>
              <option className="dark:bg-[#3d3d3d]" value="3">Inconsistent or conflicting details in the submitted paperwork</option>
              <option className="dark:bg-[#3d3d3d]" value="4">Non-compliance with City Hall regulations</option>
              <option className="dark:bg-[#3d3d3d]" value="5">No records found</option>
            </select>

          </div>
        </div>


        {isLoading ? (
          <div className="bg-white dark:bg-[#212121] text-slate-700 dark:text-white px-1 pb-1 rounded-b-lg mt-[-10px]">
            <Loading />
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-[#212121] px-4 py-3 gap-3 sm:px-6 flex justify-end">
              <button
                onClick={handleConfirmClose}
                type="button"
                className="text-slate-500 text-xs md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-sm px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
              >
                <p>Cancel</p>
              </button>


              <button
                onClick={handleReject}
                type="button"
                disabled={continueButtonDisabled}
                className={`text-white text-xs md:text-sm border focus:ring-4 focus:outline-none font-normal rounded-sm px-5 py-2 text-center mb-2 dark:text-white dark:focus:ring-emerald-800 ${
                  continueButtonDisabled
                    ? "bg-gray-400 border-gray-400 cursor-not-allowed"
                    : "bg-emerald-500 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 dark:hover:bg-emerald-700 dark:hover:border-emerald-700"
                }`}             >
                Confirm
              </button>

            </div>
          </>
        )}



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

            {selectedTransaction && modalViewCharge && (
            <AdminRPCharges
              // selectedTransaction={selectedTransaction}
              selectedTransaction={selectedTransaction}
              isOpen={modalViewCharge}
              // handleClose={handleModalClose}
              handleProcess={handleProcess}
              handleConfirmClose={handleChargeClose}
              transType={transType}
              isLoading={isLoading}
              warning={warning}
            />
            )}
          </div>
        </div>
      </>
    );
  };
  
  
  export default AdminRPTaxCharges;
  