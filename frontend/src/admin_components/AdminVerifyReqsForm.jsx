import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'

import { useParams } from 'react-router-dom';
import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';
import AdminRPTaxClearanceModal from '../admin_partials/admin_modals/AdminRPTaxClearanceModal';
import AdminRPTaxRejectModal from '../admin_partials/admin_modals/AdminRPTaxRejectModal';
import AdminURApplications from '../admin_partials/admin_modals/AdminURApplications';
import Flatpickr from 'react-flatpickr';

const AdminVerifyReqsForm =()=>{

  const { user_id, admin_type, admin_uname } = useParams();
  // const location = useLocation();
  // const { pathname } = location;
  // const user_id = pathname.split("/")[2];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('Admin_token');
    
    const checkToken = async (token) => {
            const response = await axios.get(`${Base_Url}admintoken/protect-token-admin/${admin_type}/${admin_uname}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { admin_type } = response.data;
            // Assuming admin_type is received in the response from the backend
            if (admin_type === 'registry_admin') {
                // Allow access to the audit page
                setReload(false);
            } else {
                window.location.href = '/indexadmin';
            }
    };

    if (token) {
        checkToken(token);
    } else {
        // Redirect to indexadmin if token is not present
        window.location.href = '/indexadmin';
    }
}, []);


  const [userApplications, setUserApplications] = useState();
  const [filteredUserApplications, setFilteredUserApplications] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [isPlaceholder, setIsPlaceholder] = useState();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchBirthPlace, setSearchBirthPlace] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchMobile, setSearchMobile] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const Base_Url = process.env.Base_Url;

  // const [selectedDatee, setSelectedDatee] = useState('');
  

  useEffect(()=>{
    const fetchUserApplications= async()=>{
        try{
            const res= await axios.get(`${Base_Url}adminur/`)
            const { verify } = res.data;
            setUserApplications(verify);
            setFilteredUserApplications(verify);
        }catch(err){
            console.log(err)
        }
    }
    fetchUserApplications()
  },[user_id])

  const handleSearch = () => {
    const filteredUVRegistry = userApplications.filter((transaction) => {
      const { f_name, l_name, sex_type,  birth_place, birth_date, user_email, mobile_no} = transaction || {};
      
      const transactionId = mobile_no?.toString()?.toUpperCase();
      const isNameMatch = !searchName || `${f_name} ${l_name}`.toString()?.toUpperCase().includes(searchName);
      const isEmailMatch = !searchEmail || user_email?.toString()?.toUpperCase().includes(searchEmail);
      const isBirthPlaceMatch = !searchBirthPlace || birth_place?.toString()?.toUpperCase().includes(searchBirthPlace);
      const isIdMatch = transactionId && transactionId.includes(searchMobile);
      const isTypeMatch = !selectedType || selectedType === 'All' || parseInt(selectedType) === 0 || sex_type === selectedType;
      const isBirthdateMatch = !selectedDate || (
        new Date(birth_date).toDateString() === new Date(selectedDate).toDateString()
      );      
  
      return isNameMatch &&  isEmailMatch && isBirthPlaceMatch && isIdMatch && isTypeMatch && isBirthdateMatch;
    });
  
    setFilteredUserApplications(filteredUVRegistry);
  };

  const handleClearFilter = () => {
    setFilteredUserApplications(userApplications);
    setSearchName('');
    setSelectedType('');
    setSearchBirthPlace('');
    setSelectedDate('');  
    setSearchMobile('');
    setSearchEmail('');
  }

  const handleInputChange = (e) => {
    const selectedType = e.target.value;
    console.log("Sex Value Changed:", selectedType);
    setSelectedType(selectedType);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  const handleOpenModal = (transaction) => {
    setIsModalOpen(true);
    setSelectedTransaction(transaction);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };


  const handleRemoveTransaction = (transaction) => {

    const updatedUserApplications = userApplications.filter(
      (transaction) => transaction.transaction_id !== transaction
    );
  
    setUserApplications(updatedUserApplications);
  };


  const handleApprove = async (transaction) => {
    try {
      const trans_type = 'User Registry';

      const response = await axios.post(`${Base_Url}adminur/approve/${transaction.user_id}`, {
        user_id: transaction.user_id,
        trans_type: trans_type,
      });
  
      if (response.status === 200) {

        try {
          const res = await axios.get(`${Base_Url}email/${transaction.user_id}`);
        
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
              const emailResponse = await axios.post(`${Base_Url}email/status-verified-email/${user_email}`, body);
  
              if (emailResponse.data && emailResponse.data.message) {
                console.log('SENT EMAIL');
                setIsApproved(true);
                setIsPlaceholder(transaction.l_name)
          
                console.log('Verification successful');
          
                setTimeout(() => {
                  setIsApproved(false);
                  handleRemoveTransaction(transaction.transaction_id);
                  window.location.reload()
                }, 2500);
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

      const response = await axios.post(`${Base_Url}adminur/decline/${transaction.user_id}`, body1);
  
      if (response.status === 200) {

        try {
          const res = await axios.get(`${Base_Url}email/${transaction.user_id}`);
          
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
              const emailResponse = await axios.post(`${Base_Url}email/status-verified-email/${user_email}`, body);
  
              if (emailResponse.data && emailResponse.data.message) {
                console.log('SENT EMAIL');
                setIsDeclined(true);
                setIsPlaceholder(transaction.l_name)

                console.log('Verification Declined');
          
                setTimeout(() => {
                  setIsDeclined(false);
                  handleRemoveTransaction(transaction.transaction_id)
                  window.location.reload()
                }, 2500);
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
              <h1 className='mb-5 text-sm italic text-center text-slate-700 dark:text-gray-300'>User Verification Requests</h1> 

              {isApproved && (
                    <div className="my-5 text-center">
                      <div className="mb-5 inline-flex items-center justify-center w-12 h-12">
                        <svg aria-hidden="true" className="pb-0 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                      </div>
                      <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                        {isPlaceholder ? "Verification Approved!" : "Verification Approved!"}
                      </div>
                    </div>
                  )}

                  {isDeclined && (
                    <div className="my-5 text-center">
                      <div className="mb-5 inline-flex items-center justify-center w-12 h-12">
                        <svg aria-hidden="true" className="pb-0 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                      </div>
                      <div className="text-red-700 text-sm bg-red-200 text-center rounded-full py-1.5 mb-5">
                        {isPlaceholder ? "Verification Declined!" : "Verification Declined!"}
                      </div>
                    </div>
                  )} 

          <div className="flex flex-col items-center sm:flex-row text-xs">
            <div className="flex-row flex justify-end w-full mb-2">

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

            {/* Name */}
            <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                <span className="hidden sm:block pr-10 text-xs">Name:</span>
              <div className="relative flex items-center">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </span>
                <input value={searchName} onChange={(e) => setSearchName(e.target.value.toUpperCase())}  onKeyDown={(e) => e.key === 'Enter' && handleSearch()} id="searchInput" type="text" placeholder="Search Name..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
              </div>
            </div>

              {/* Activity */}
              <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                <span className="hidden sm:block text-xs">Sex:</span>
                  <select value={selectedType} onChange={handleInputChange} name=""  id=""  className="text-xs border bg-transparent border-slate-300 text-slate-700 dark:text-white pl-4 rounded-sm peer cursor-pointer py-1 md:py-0.5 w-[235px] sm:w-[210px]">
                      <option value="All" className="dark:bg-[#3d3d3d]">Select Sex</option>
                      <option value="Male" className="dark:bg-[#3d3d3d]">Male</option>
                      <option value="Female" className="dark:bg-[#3d3d3d]">Female</option>
                  </select>
              </div>

            {/* Place of Birth */}
            <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                <span className="hidden sm:block pr-10 text-xs">Birthplace:</span>
              <div className="relative flex items-center">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </span>
                <input value={searchBirthPlace} onChange={(e) => setSearchBirthPlace(e.target.value.toUpperCase())}  onKeyDown={(e) => e.key === 'Enter' && handleSearch()} id="searchInput" type="text" placeholder="Search Birthplace..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
              </div>
            </div>

            {/* Date Row */}
            <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                <span className="hidden sm:block text-xs">Birthdate:</span>
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
                    placeholder="Birthdate..."
                    className="bg-transparent text-xs border border-slate-300 text-slate-700 dark:text-white py-1 md:py-0.5 rounded-sm w-[235px] sm:w-[210px]"
                />
                {/*
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
                  />*/}
                </span>
              </div>

              {/* Mobile Number */}
              <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                  <span className="hidden sm:block pr-10 text-xs">Mobile Number:</span>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                  </span>
                  <input  value={searchMobile} onChange={(e) => setSearchMobile(e.target.value.toUpperCase())}  onKeyDown={(e) => e.key === 'Enter' && handleSearch()} id="searchInput" type="text" placeholder="Search Mobile Number..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
                </div>
              </div>

                {/* Email */}
                <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                  <span className="hidden sm:block pr-10 text-xs">Email:</span>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                  </span>
                  <input value={searchEmail} onChange={(e) => setSearchEmail(e.target.value.toUpperCase())} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} id="searchInput" type="text" placeholder="Search Email..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
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
            </div>
            
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-6 gap-2">

                {/* Card Sample */}
                {filteredUserApplications?.length > 0 ? (
                filteredUserApplications.map((transaction) => (
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
                ))
                ) : (
                  <div className="text-center col-span-full text-gray-500 mt-4">
                    No records found.
                  </div>
                )}

            {isModalOpen && selectedTransaction && (
              <AdminURApplications selectedTransaction={selectedTransaction} handleRemoveTransaction={handleRemoveTransaction} isOpen={isModalOpen} handleClose={handleCloseModal} />
            )}

              </div>
            </div>
          </div>
          <AdminFooter />
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