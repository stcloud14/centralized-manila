import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flatpickr from 'react-flatpickr';

import AdminRPView from '../admin_modals/AdminRPView';
import AdminBPView from '../admin_modals/AdminBPView';
import AdminCTCView from '../admin_modals/AdminCTCView';
import AdminLCRBirthView from '../admin_modals/AdminLCRBirthView';
import AdminLCRDeathView from '../admin_modals/AdminLCRDeathView';
import AdminLCRMarriageView from '../admin_modals/AdminLCRMarriageView';

import Loading from '../../partials/Loading';
import ArchivesTableView from '../admin_archives/ArchivesTableView';
import ArchivesCardView from '../admin_archives/ArchivesCardView';
import StatusTypeDropdown from '../../partials/transDropdown/StatusTypeDropdown';

const AdminAllArchives = ({ taxPayment, taxClearance, busOffice, businessData, businessPermit, ctcCedula, birthCert, deathCert, marriageCert, handleUpdateData }) => {

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [RPView, setRPView] = useState(false);
  const [BPView, setBPView] = useState(false);
  const [CTCView, setCTCView] = useState(false);
  const [BCView, setBCView] = useState(false);
  const [DCView, setDCView] = useState(false);
  const [MCView, setMCView] = useState(false);
  
  const [selectedTransaction, setSelectedTransaction] = useState();
  const [transType, setTransType] = useState();

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDatee, setSelectedDatee] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchUserID, setSearchUserID] = useState(''); 

  const [filteredTaxClearance, setFilteredTaxClearance] = useState([]); 
  const [filteredTaxPayment, setFilteredTaxPayment] = useState([]); 
  const [filteredBusinessPermit, setFilteredBusinessPermit] = useState([]);
  const [filteredctcCedula, setFilteredctcCedula] = useState([]);
  const [filteredBirthCert, setFilteredBirthCert] = useState([]); 
  const [filteredDeathCert, setFilteredDeathCert] = useState([]); 
  const [filteredMarriageCert, setFilteredMarriageCert] = useState([]); 


  const Base_Url = process.env.Base_Url;


  const handleSearch = () => {
    const filteredClearance = taxClearance.filter(transaction => {
      const transactionId = transaction.transaction_id.toUpperCase();
      const userId = transaction.user_id.toUpperCase();
      const status = transaction.status_type.toUpperCase();
      const query = searchQuery.toUpperCase();
      
  
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

      const isStatusMatch = !selectedStatus || selectedStatus === 'All' || parseInt(selectedStatus) === 0 ||
        (selectedStatus === 'Complete' && transaction.trans_type === 'Complete') ||
        (selectedStatus === 'Rejected' && transaction.trans_type === 'Rejected') ||
        (selectedStatus === 'Expired' && transaction.trans_type === 'Expired'); 
  
      return transactionId.includes(query) && (userId.includes(searchUserID.toUpperCase()) || searchUserID === '') && isTypeMatch && isStatusMatch && isDateInRange();
    });
  
    const filteredPayment = taxPayment.filter(transaction => {
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

    const filteredBP = businessPermit.filter(transaction => {
        const transactionId = (transaction?.transaction_id || '').toUpperCase();
        const query = searchQuery.toUpperCase();
        const tinId = (transaction?.bus_tin || '').toUpperCase();
    
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
    
        const isTINMatch = tinId.includes(searchTIN.toUpperCase());
        const isBusinessTypeMatch = selectedType === 'All' || transaction?.bus_type === selectedType;
    
        return transactionId.includes(query) && isTINMatch && isBusinessTypeMatch && isDateInRange();
      });

      const filteredCTC = ctcCedula.filter(transaction => {
        const transactionId = transaction.transaction_id.toUpperCase();
        const query = searchQuery.toUpperCase();
        const fullName = `${transaction.f_name} ${transaction.l_name}`.toUpperCase(); 
        
        const isDateInRange = () => {
          if (!selectedDate || !selectedDatee) {
            return true;
          }
    
          const transactionDate = new Date(transaction.date_processed);
          const startDate = new Date(selectedDate);
          const endDate = new Date(selectedDatee);
          endDate.setHours(23, 59, 59, 999);
    
          return startDate <= transactionDate && transactionDate <= endDate;
        };
    
        const isOwnerMatch = searchOwner === '' || fullName.includes(searchOwner);
        
        return transactionId.includes(query) && isOwnerMatch && isDateInRange();
      });


      const filteredBC = birthCert.filter(transaction => {
        const transactionId = transaction.transaction_id.toUpperCase();
        const query = searchQuery.toUpperCase();
        const Name = ((transaction.f_name || '') + (transaction.m_name || '') + (transaction.l_name || '')).toUpperCase().includes(searchOwner.toUpperCase());
    
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
          (selectedType === 'Birth Certificate' && transaction.trans_type === 'Birth Certificate') ||
          (selectedType === 'Death Certificate' && transaction.trans_type === 'Death Certificate') ||
          (selectedType === 'Marriage Certificate' && transaction.trans_type === 'Marriage Certificate');
    
        return transactionId.includes(query) && Name && isTypeMatch && isDateInRange();
      });
    
      const filteredDC = deathCert.filter(transaction => {
        const transactionId = transaction.transaction_id.toUpperCase();
        const query = searchQuery.toUpperCase();
        const Name = ((transaction.f_name || '') + (transaction.m_name || '') + (transaction.l_name || '')).toUpperCase().includes(searchOwner.toUpperCase());
    
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
          (selectedType === 'Birth Certificate' && transaction.trans_type === 'Birth Certificate') ||
          (selectedType === 'Death Certificate' && transaction.trans_type === 'Death Certificate') ||
          (selectedType === 'Marriage Certificate' && transaction.trans_type === 'Marriage Certificate');
    
        return transactionId.includes(query) && Name && isTypeMatch && isDateInRange();
      });
    
      const filteredMC = marriageCert.filter(transaction => {
        const transactionId = transaction.transaction_id.toUpperCase();
        const query = searchQuery.toUpperCase();
        const Name = ((transaction.f_name || '') + (transaction.m_name || '') + (transaction.l_name || '')).toUpperCase().includes(searchOwner.toUpperCase());
    
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
          (selectedType === 'Birth Certificate' && transaction.trans_type === 'Birth Certificate') ||
          (selectedType === 'Death Certificate' && transaction.trans_type === 'Death Certificate') ||
          (selectedType === 'Marriage Certificate' && transaction.trans_type === 'Marriage Certificate');
    
        return transactionId.includes(query) && Name && isTypeMatch && isDateInRange();
      });
    
      
    setFilteredTaxClearance(filteredClearance);
    setFilteredTaxPayment(filteredPayment);
    setFilteredBusinessPermit(filteredBP);
    setFilteredctcCedula(filteredCTC);
    setFilteredBirthCert(filteredBC);
    setFilteredDeathCert(filteredDC);
    setFilteredMarriageCert(filteredMC);
  };  
  
  useEffect(() => {
    setFilteredTaxClearance(taxClearance);
  }, [taxClearance]);
  
  useEffect(() => {
    setFilteredTaxPayment(taxPayment);
  }, [taxPayment]);

  useEffect(() => {
    setFilteredBusinessPermit(businessPermit);
  }, [businessPermit]);

  useEffect(() => {
    setFilteredctcCedula(ctcCedula);
  }, [ctcCedula]);

  useEffect(() => {
    setFilteredBirthCert(birthCert);
  }, [birthCert]);
  
  useEffect(() => {
    setFilteredDeathCert(deathCert);
  }, [deathCert]);

  useEffect(() => {
    setFilteredMarriageCert(marriageCert);
  }, [marriageCert]);
  
  const handleClearFilter = () => {
    setSearchQuery('');
    setSelectedDate('');
    setSelectedDatee('');
    setSearchUserID('');
    setSelectedType('All'); 
    setSelectedStatus('All'); 
    setFilteredTaxClearance(taxClearance);
    setFilteredTaxPayment(taxPayment);
    setFilteredBusinessPermit(businessPermit);
    setFilteredctcCedula(ctcCedula);
    setFilteredBirthCert(birthCert);
    setFilteredDeathCert(deathCert);
    setFilteredMarriageCert(marriageCert);
  };
  
  const handleInputChange = (e) => {
    const selectedType = e.target.value;
    setSelectedType(selectedType);
  };

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setSelectedStatus(selectedStatus);
  };

  const toggleDropdown = () => {
    console.log('Toggling dropdown state');
    setDropdownOpen(!isDropdownOpen);
  };

  const handleToggleView = (mode) => {
    setViewMode(mode);
  };

  const handleModalOpen = (transaction, type) => {
    setSelectedTransaction(transaction);
    setTransType(type);

    switch(type){
        case 'Real Property Tax Clearance':
        case 'Real Property Tax Payment':
            setRPView(true);
            break;
        case 'Business Permit':
            setBPView(true);
            break;
        case 'Community Tax Certificate':
            setCTCView(true);
            break;
        case 'Birth Certificate':
            setBCView(true);
            break;
        case 'Death Certificate':
            setDCView(true);
            break;
        case 'Marriage Certificate':
            setMCView(true);
            break;
        default:
            break;
    }
};


  const handleModalClose = () => {
    setRPView(false);
    setBPView(false);
    setCTCView(false);
    setBCView(false);
    setDCView(false);
    setMCView(false);
  };


  const renderContent = () => {


    if (viewMode === 'table') {
      return (
        <ArchivesTableView
          filteredTaxClearance={filteredTaxClearance}
          filteredTaxPayment={filteredTaxPayment}
          filteredBusinessPermit={filteredBusinessPermit}
          filteredctcCedula={filteredctcCedula}
          filteredBirthCert={filteredBirthCert}
          filteredDeathCert={filteredDeathCert}
          filteredMarriageCert={filteredMarriageCert}
          handleModalOpen={handleModalOpen}
          section={'Processing'}
        />
      );
    } else if (viewMode === 'card') {
      return (
        <ArchivesCardView
          filteredTaxClearance={filteredTaxClearance}
          filteredTaxPayment={filteredTaxPayment}
          filteredBusinessPermit={filteredBusinessPermit}
          filteredctcCedula={filteredctcCedula}
          filteredBirthCert={filteredBirthCert}
          filteredDeathCert={filteredDeathCert}
          filteredMarriageCert={filteredMarriageCert}
          handleModalOpen={handleModalOpen}
          section={'Processing'}
        />
      );
    }
  };


    return (
      <>
        {/* Requests Area */}
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] rounded-sm border border-slate-200">
          <div className="px-5 py-5">
            <h1 className='font-medium text-center text-slate-700 dark:text-white mb-4'>All Archived Transactions</h1>

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


              {/* User ID */}
              <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                  <span className="hidden sm:block pr-10 text-xs">User ID:</span>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                  </span>
                  <input value={searchUserID} onChange={(e) => setSearchUserID(e.target.value.toUpperCase())} id="searchInput" type="text" placeholder="Search User ID..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
                </div>
              </div>


              {/* Type Row */}
              <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                  <span className="hidden sm:block text-xs">Type:</span>
                  <select value={selectedType} onChange={handleInputChange} name="typeDropdown"  id="typeDropdown"  className="text-xs border bg-transparent border-slate-300 text-slate-700 dark:text-white pl-4 rounded-sm peer cursor-pointer py-1 md:py-0.5 w-[235px]">
                    <option value="All" className="dark:bg-[#3d3d3d]">Select Type</option>
                    <option value="Real Property Tax Payment" className="dark:bg-[#3d3d3d]">Real Property Tax Payment</option>
                    <option value="Real Property Tax Clearance" className="dark:bg-[#3d3d3d]">Real Property Tax Clearance</option>
                    <option value="Business Permit" className="dark:bg-[#3d3d3d]">Business Permit</option>
                    <option value="Community Tax Certificate" className="dark:bg-[#3d3d3d]">Community Tax Certificate</option>
                    <option value="Birth Certificate" className="dark:bg-[#3d3d3d]">Birth Certificate</option>
                    <option value="Death Certificate" className="dark:bg-[#3d3d3d]">Death Certificate</option>
                    <option value="Marriage Certificate" className="dark:bg-[#3d3d3d]">Marriage Certificate</option>
                  </select>
              </div>


              {/* Status */}
             <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                <span className="hidden sm:block text-xs">Status:</span>
                  <select  value={selectedStatus} onChange={handleStatusChange} name="statusDropdown"  id="statusDropdown"  className="text-xs border bg-transparent border-slate-300 text-slate-700 dark:text-white pl-4 rounded-sm peer cursor-pointer py-1 md:py-0.5 w-[235px]">
                      <option value="All" className="dark:bg-[#3d3d3d]">Select Status</option>
                      <option value="Complete" className="dark:bg-[#3d3d3d]">Complete</option>
                      <option value="Rejected" className="dark:bg-[#3d3d3d]">Rejected</option>
                      <option value="Expired" className="dark:bg-[#3d3d3d]">Expired</option>
                  </select>
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
  
            {/* Render Content */}
            {renderContent()}
          

            {selectedTransaction && RPView && (
            <AdminRPView
              selectedTransaction={selectedTransaction}
              isOpen={RPView}
              handleClose={handleModalClose}
              transType={transType}
            />
            )}

            {selectedTransaction && BPView && (
            <AdminBPView
              selectedTransaction={selectedTransaction}
              busOffice={busOffice}
              businessData={businessData}
              isOpen={BPView}
              handleClose={handleModalClose}
              transType={transType}
            />
            )}

            {selectedTransaction && CTCView && (
            <AdminCTCView
              selectedTransaction={selectedTransaction}
              isOpen={CTCView}
              handleClose={handleModalClose}
              transType={transType}
            />
            )}

            {selectedTransaction && BCView && (
            <AdminLCRBirthView
              selectedTransaction={selectedTransaction}
              isOpen={BCView}
              handleClose={handleModalClose}
              transType={transType}
            />
            )}

            {selectedTransaction && DCView && (
            <AdminLCRDeathView
              selectedTransaction={selectedTransaction}
              isOpen={DCView}
              handleClose={handleModalClose}
              transType={transType}
            />
            )}

            {selectedTransaction && MCView && (
            <AdminLCRMarriageView
              selectedTransaction={selectedTransaction}
              isOpen={MCView}
              handleClose={handleModalClose}
              transType={transType}
            />
            )}


          </div>
        </div>
      </>
    );
  };
  
  
  export default AdminAllArchives;
  