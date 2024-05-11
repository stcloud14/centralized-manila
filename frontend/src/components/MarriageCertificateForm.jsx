import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import {Link} from "react-router-dom"


import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Req from '../partials/misc/RequiredFieldIndicator';
import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/airbnb.css';
import SuffixDropdown from '../partials/profile/SuffixDropdown';
import CityDropdown from '../partials/profile/CityDropdown';
import RegionDropdown from '../partials/profile/RegionDropdown';
import ProvinceDropdown from '../partials/profile/ProvinceDropdown';
import CopiesDropdown from '../partials/profile/CopiesDropdown';
import PurposeDropdown from '../partials/profile/PurposeDropdown';
import PrintDropdown from '../partials/profile/PrintDropdown';
import ValidIdDropdown from '../partials/profile/ValidIdDropdown'
import MCTermsModal from '../partials/business/MCTermsModal';
import ModalTransaction from '../partials/transactionModal/ModalTransaction';
import TermsModal from '../partials/business/TermsModal';
import VerifyModal from '../partials/business/VerifyModal';


const MarriageCertificateForm =()=>{
  
  const { user_id } = useParams();
  const navigate = useNavigate();
  // const location = useLocation();
  // const { pathname } = location;
  // const user_id = pathname.split("/")[2];

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    const checkToken = async (token) => {
        try {
            // Make a request to backend API to verify token and check user access
            const response = await axios.get(`http://localhost:8800/token/protect-token/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
          window.location.reload();
          navigate(`/`);
        }
    };
  
    checkToken(token); // Pass the token to the checkToken function
}, [navigate, user_id]);

  const [marriageCert, setMarriageCert] = useState((prevData) => ({
    ...prevData,
    amount: 0,
    initialPrint: 0,
    printDisplay: 0,
    marriagec_regionLabel: '',
    marriagec_provinceLabel: '',
    marriagec_municipalLabel: '',
    marriagec_reqregionLabel: '',
    marriagec_printLabel: '',
    marriagec_reqprovinceLabel: '',
    marriagec_reqmunicipalLabel: '',
    marriagec_purposeLabel: '',
    marriagec_valididLabel: '',
  }));
  const [isSuccess, setIsSuccess] = useState(false);

  console.log(marriageCert)

  const contentRef = useRef(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await axios.post(`http://localhost:8800/marriagecertificate/${user_id}`, marriageCert)
          // Check the response status before proceeding
          if (response.status === 200) {
            // Fetch user_email after successful payment
            try {
              const res1 = await axios.get(`http://localhost:8800/transachistory/transId/${user_id}`);
              const transaction_id = res1.data[0]?.transaction_id;
    
              const res = await axios.get(`http://localhost:8800/email/${user_id}`);
              
              if (res.data.user_email) {
                const updatedUserEmail = res.data.user_email;
                const f_name = res.data.f_name;
                const l_name = res.data.l_name;
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
    
                const trans_type = 'Marriage Certificate';

                const reqcity = marriageCert.marriagec_municipalLabel;

                const purpose_type = marriageCert.marriagec_purposeLabel;
    
                const rowData = { ...marriageCert, reqcity, purpose_type,  transaction_id, trans_type, date, time};
    
                const status_type = 'Pending';
    
                const body = {
                  data: rowData,
                  status_type: status_type,
                  f_name: f_name,
                  l_name: l_name
                };
      
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


            setIsSuccess(true); // Set success state to true
            handleCloseModal(); // Close the modal
            contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            console.log('Transaction successful'); 
            
            setTimeout(() => {
              setIsSuccess(false);
              window.location.href = `/transachistory/${user_id}`;
            }, 2100);
          } else {
            console.error('Transaction error:', response.statusText);
          }
      } catch (err) {
        console.error('Transaction error:', err);
        console.error('Error message:', err.message);
      }
    }; 

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const handleProceed = (e) => {
      e.preventDefault();
  
      // Please fill up the necessary forms
     const requiredFields = ['marriagec_hlname', 'marriagec_hfname', 'marriagec_wlname', 'marriagec_wfname',
       'marriagec_region', 'marriagec_province', 'marriagec_municipal', 'marriagec_date',
       'marriagec_reqlname', 'marriagec_reqfname', 'marriagec_reqrelation',
       'marriagec_mobileno', 'marriagec_reqregion', 'marriagec_reqprovince',
       'marriagec_reqmunicipal', 'marriagec_reqbrgy', 'marriagec_reqhnum', 'marriagec_reqstreet',
       'marriagec_reqzip', 'marriagec_nocopies', 'marriagec_print', 'marriagec_purpose', 'marriagec_validid']; //The input fields that is required
      const isIncomplete = requiredFields.some((field) => !marriageCert[field]);
  
      if (isIncomplete) {
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });    
         setShowWarning(true); // Show warning message and prevent opening the modal
       
        setTimeout(() => {
           setShowWarning(false); // Set a timer to hide the warning message after 4 seconds
         }, 4000);
       } else {
        
        setIsModalOpen(true);// Proceed to open the modal
       }
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setShowWarning(false);
    };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const updatedValue = isNaN(value) ? value.toUpperCase() : value;

    setMarriageCert((prevData) => {

      if (id === 'marriagec_telno' || id === 'marriagec_mobileno' || id ==='marriagec_reqzip') {
        const formattedValue = value.replace(/\D/g, '');

        let maxLength;
      if (id === 'marriagec_mobileno') {
        maxLength = 11;
      } else if (id === 'marriagec_telno') {
        maxLength = 8;
      }else if (id === 'marriagec_reqzip') {
        maxLength = 4;
      }

      if (formattedValue.length > maxLength) {
        const truncatedValue = formattedValue.slice(0, maxLength);

        return {
          ...prevData,
          [id]: truncatedValue,
        };
      }

        return {
          ...prevData,
          [id]: formattedValue,
        };
      }

      if (id === 'marriagec_nocopies') {
        const initialValue = parseInt(value, 10) || 0;
        const displayValue = prevData.initialPrint || 0;
        const product = initialValue * displayValue;
        const totalAmountPaid = updateTotalAmount(product);

        return {
          ...prevData,
          [id]: initialValue,
          amount: totalAmountPaid,
          printDisplay: product,
        };
      } 
      
      if (id === 'marriagec_print') {

        const label = e.target.options[e.target.selectedIndex].getAttribute('label');
        const displayValue = updateAmount({ value });
        const copiesValue = prevData.marriagec_nocopies || 0;
        const product = copiesValue * displayValue;
        const totalAmountPaid = updateTotalAmount(product);
        return {
          ...prevData,
          [id]: value,
          amount: totalAmountPaid,
          initialPrint: displayValue,
          printDisplay: product,
          marriagec_printLabel: label,
        };
      }

      if (id === 'marriagec_region') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_province: '',
          marriagec_municipal: '',
          marriagec_regionLabel: label,
        };
      }

      if (id === 'marriagec_province') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_provinceLabel: label,
        };
      }

      if (id === 'marriagec_municipal') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_municipalLabel: label,
        };
      }

      
      if (id === 'marriagec_reqregion') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_reqprovince: '',
          marriagec_reqmunicipal: '',
          marriagec_reqregionLabel: label,
        };
      }

      if (id === 'marriagec_reqprovince') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_reqprovinceLabel: label,
        };
      }

      if (id === 'marriagec_reqmunicipal') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_reqmunicipalLabel: label,
        };
      }

      if (id === 'marriagec_purpose') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_purposeLabel: label,
        };
      }
      
      if (id === 'marriagec_validid') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_valididLabel: label,
        };
      }

      else {
        return {
          ...prevData,
          [id]: updatedValue,
        };
      }
    });
  };
  
  function updateAmount({ value }) {

    switch (value) {
      case '1':
      case '2':
        return 50;
  
      case '3':
        return 100;
  
      default:
        return 0;
    }
  }
  
  
  function updateTotalAmount(product) {
    if (product > 0) {
      return product + 50 + 15;
    } else {
      return 0;
    }
  }
  
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isVerifiedStatus, setIsVerifiedStatus] = useState();

  useEffect(()=>{
    const fetchUserVerification= async()=>{
        try{
            const res= await axios.get(`http://localhost:8800/usersettings/${user_id}`)
            setIsVerifiedStatus(res.data[0].verification_status)
            
        }catch(err){
            console.log(err)
        }
    }
    fetchUserVerification()
  },[])

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  const logoSrc = '../src/images/mnl_footer.svg';

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {isVerifiedStatus === 'Verified' ? null :
        <VerifyModal isVerifiedStatus={isVerifiedStatus} userID={user_id} />
        }

        {isVerifiedStatus === 'Verified' ? (
        <TermsModal isVisible={isModalVisible} onProceed={toggleModalVisibility} userID={user_id} />
        ) : null
        }

        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
                  
            <form onSubmit={handleSubmit} className={`overflow-y-auto ${isModalVisible ? 'blur' : ''}`}>
            <div className="grid grid-cols-5 items-center">

              {/* Description ONLY APPEARS IN DESKTOP VIEW */}
              <div className="hidden sm:flex mb-7">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 flex-shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                  <h1 className="text-[0.50rem] flex text-gray-500 dark:text-gray-400 pl-1 mt-0.5">Fill out the necessary information below to process your Marriage Certificate.</h1>
              </div>

              {/* Description Button ONLY APPEARS IN MOBILE VIEW */}
              <div className="flex sm:hidden mb-7">
                <div className="relative inline-block text-left">
                  <button type="button" onClick={() => document.getElementById('popover-click').classList.toggle('hidden')} className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                  </button>

                  {/* POPOVER */}
                  <div id="popover-click" className="text-xs hidden absolute z-10 w-64 px-3 py-3 transition-opacity duration-300 rounded-sm shadow-2xl bg-white dark:bg-[#212121]">
                      <p>Fill out the necessary information below to process your Marriage Certificate.</p>
                  </div>
                </div>
              </div>

              {/* FORMS TITLE */}
              <div className="flex flex-col col-span-3">
                <h1 className="font-medium text-center text-slate-700 dark:text-white">Local Civil Registry</h1>
                <h1 className="mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300">Marriage Certificate Request Form</h1>
              </div>
              </div>
              <div className="grid md:grid-cols-4 grid-cols-2 gap-3 items-center justify-center text-xs w-full">
                <div className="flex flex-col items-center text-center">
                  <span className='font-semibold text-blue-500'>Step 1</span>
                  <span className='font-normal text-blue-500'>Fill the Form</span>
                  <div className="w-full h-1 bg-blue-500" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <span>Step 2</span>
                  <span>Review and Submit</span>
                  <div className="w-full h-1 bg-blue-200 dark:bg-slate-400" />
                </div>
                <div className="flex flex-col col-span-2 items-center text-center mt-2 sm:mt-0">
                  <span>Final Step</span>
                  <span>Pay the transaction</span>
                  <div className="w-full h-1 bg-blue-200 dark:bg-slate-400" />
                </div>
              </div>

              {isSuccess && (                
              <div className="my-5 text-center">
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12">
                  <svg aria-hidden="true" className="pb-0 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                </div>
                <div className='text-emerald-500 bg-emerald-100 md:text-sm text-xs text-center rounded-full py-1.5'>Transaction successful! Redirecting to Transaction History...</div> 
              </div>
              )}


              {showWarning && (
                <div className="text-yellow-600 bg-yellow-100 md:text-sm text-xs text-center rounded-full py-1.5 my-5">
                  Please fill in all required fields before proceeding.
                </div>
              )} 

              {/* Group 1 - Husband's Personal Information*/}
              <h1 className='text-xs text-slate-700 dark:text-white mt-8'>All fields mark with <Req /> are required.</h1>
              <div className='pt-0.5'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Husband's Personal Information</h1>
                <div className="grid md:grid-cols-4 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_hlname} type="text" name="marriagec_hlname" id="marriagec_hlname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_hlname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_hfname} type="text" name="marriagec_hfname" id="marriagec_hfname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_hfname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_hmname} type="text" name="marriagec_hmname" id="marriagec_hmname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                    <label htmlFor="marriagec_hmname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Middle Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_hsuffix} name="marriagec_hsuffix" id="marriagec_hsuffix" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
                      <SuffixDropdown/>
                    </select>
                    <label htmlFor="marriagec_hsuffix" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Suffix</label>
                  </div>
                </div>
              </div>

              {/* Group 2 - Wife's Personal Information*/}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white mt-4'>Wife's Personal Information</h1>
                <h1 className='text-xs text-slate-700 dark:text-white my-1.5'>Use Maiden Name of the Lady/Wife</h1>
                <div className="grid md:grid-cols-4 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_wlname} type="text" name="marriagec_wlname" id="marriagec_wlname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_wlname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_wfname} type="text" name="marriagec_wfname" id="marriagec_wfname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_wfname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_wmname} type="text" name="marriagec_wmname" id="marriagec_wmname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                    <label htmlFor="marriagec_wmname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Middle Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_wsuffix} name="marriagec_wsuffix" id="marriagec_wsuffix" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
                        <SuffixDropdown/>
                    </select>
                    <label htmlFor="marriagec_wsuffix" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Suffix</label>
                  </div>
                </div>
              </div>

              {/* Group 3 - Place of Marriage Information */}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Place of Marriage Information</h1>
                <div className="grid md:grid-cols-4 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <select onChange={handleInputChange} value={marriageCert.marriagec_region} name="marriagec_region" id="marriagec_region" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                    <RegionDropdown />
                  </select>
                  <label htmlFor="marriagec_region" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Region<Req /></label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <select onChange={handleInputChange} value={marriageCert.marriagec_province} name="marriagec_province" id="marriagec_province" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                    <ProvinceDropdown selectedRegion={marriageCert.marriagec_region} />
                  </select>
                  <label htmlFor="marriagec_province" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Province<Req /></label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <select onChange={handleInputChange} value={marriageCert.marriagec_municipal} name="marriagec_municipal" id="marriagec_municipal" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                    <CityDropdown selectedProvince={marriageCert.marriagec_province} />
                  </select>
                  <label htmlFor="marriagec_municipal" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Municipal<Req /></label>
                </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <Flatpickr
                      id='marriagec_date'
                      name='marriagec_date'
                      required
                      value={marriageCert.marriagec_date}
                      onChange={(date) => {
                        const formattedDate = date.length > 0 ? (() => {
                          const originalDate = new Date(date[0]);
                          originalDate.setDate(originalDate.getDate() + 1);
                          return originalDate.toISOString().split('T')[0];
                        })() : '';
                        
                        setMarriageCert((prevData) => ({  
                          ...prevData,
                          marriagec_date: formattedDate,
                        }))
                      }}
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                      htmlFor="marriagec_date"
                      className={`peer-focus:font-medium absolute bg-transparent text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 ${
                        marriageCert.marriagec_date ? 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0' : 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                      }`}
                    >
                      Date of Marriage<Req />
                    </label>
                  </div>
                </div>
              </div> 

              {/* Group 4 - Requestor Personal Information*/}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Requestor's Personal Information</h1>
                {/* Row 1 */}
                <div className="grid md:grid-cols-4 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqlname} type="text" name="marriagec_reqlname" id="marriagec_reqlname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_reqlname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqfname} type="text" name="marriagec_reqfname" id="marriagec_reqfname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_reqfname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqmname} type="text" name="marriagec_reqmname" id="marriagec_reqmname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                    <label htmlFor="marriagec_reqmname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Middle Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_reqsuffix} name="marriagec_reqsuffix" id="marriagec_reqsuffix" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
                      <SuffixDropdown/>
                    </select>
                    <label htmlFor="marriagec_reqsuffix" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Suffix</label>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqrelation} type="text" name="marriagec_reqrelation" id="marriagec_reqrelation" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_reqrelation" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Relationship to the Owner<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_mobileno} type="text" name="marriagec_mobileno" id="marriagec_mobileno" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_mobileno" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile Number<Req /></label>
                  </div><div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_telno} type="text" name="marriagec_telno" id="marriagec_telno" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                    <label htmlFor="marriagec_telno" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telephone Number</label>
                  </div>
                </div>
              </div>

              {/* Group 5 - Requestor's Address */}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Requestor's Address</h1>
                {/* Row 1 */}
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_reqregion} name="marriagec_reqregion" id="marriagec_reqregion" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                      <RegionDropdown />
                    </select>
                    <label htmlFor="marriagec_reqregion" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Region<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_reqprovince} name="marriagec_reqprovince" id="marriagec_reqprovince" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                      <ProvinceDropdown selectedRegion={marriageCert.marriagec_reqregion} /> 
                    </select>
                    <label htmlFor="marriagec_reqprovince" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Province<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_reqmunicipal} name="marriagec_reqmunicipal" id="marriagec_reqmunicipal" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                      <CityDropdown selectedProvince={marriageCert.marriagec_reqprovince} />
                    </select>
                    <label htmlFor="marriagec_reqmunicipal" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Municipal<Req /></label>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid md:grid-cols-7 md:gap-6">
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqbrgy} type="text" name="marriagec_reqbrgy" id="marriagec_reqbrgy" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_reqbrgy" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Barangay<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqhnum} type="text" name="marriagec_reqhnum" id="marriagec_reqhnum" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_reqhnum" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">House No. / Unit Floor<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqstreet} type="text" name="marriagec_reqstreet" id="marriagec_reqstreet" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_reqstreet" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Street / Building Name<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqzip} type="text" name="marriagec_reqzip" id="marriagec_reqzip" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_reqzip" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Zip Code<Req /></label>
                  </div>
                </div>
              </div>

              {/* Group 6 - Transaction Information*/}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Transaction Information</h1>
                {/* Row 1 */}
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_nocopies} name="marriagec_nocopies" id="marriagec_nocopies" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                      <CopiesDropdown/>
                    </select>
                    <label htmlFor="marriagec_nocopies" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No. of Copies<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_print} name="marriagec_print" id="marriagec_print" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                      <PrintDropdown/>
                    </select>
                    <label htmlFor="marriagec_print" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">What to Print<Req /></label>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_purpose} name="marriagec_purpose" id="marriagec_purpose" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                      <PurposeDropdown/>
                    </select>
                    <label htmlFor="marriagec_purpose" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Purpose<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_validid} name="marriagec_validid" id="marriagec_validid" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                      <ValidIdDropdown/>
                    </select>
                    <label htmlFor="marriagec_validid" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valid ID to Present Upon Claiming<Req /></label>
                  </div>
                </div> 
              </div>

              {/* Group 7 - Computation */}
              <div className="flex justify-center md:justify-end text-sm">
                 <div className="w-full md:w-1/2">
                     <div className="flex justify-between mt-2">
                         <span className="font-medium whitespace-nowrap">Print Fee</span>
                         <span className="whitespace-nowrap">{`P ${marriageCert.printDisplay.toFixed(2)}`}</span>
                     </div>
                     <div className="flex justify-between mt-2">
                         <span className="font-medium whitespace-nowrap">Rush Service Fee</span>
                         <span className="whitespace-nowrap">P 50.00</span>
                     </div>
                     <div className="flex justify-between mt-2">
                         <span className="font-medium whitespace-nowrap">Convenience Fee</span>
                         <span className="whitespace-nowrap">P15.00</span>
                     </div>
                     <hr className='mt-2.5 mb-1'/>
                     <div className="flex justify-between">
                         <span className="font-medium whitespace-nowrap">Total Amount Paid</span>
                         <span name="" id="amount" className="whitespace-nowrap">{`P ${marriageCert.amount.toFixed(2)}`}</span>
                     </div>
                 </div>
              </div>

              <div className="flex justify-end items-end mt-10 mb-4">
                <button
                  type="submit"
                  onClick={handleProceed}
                  className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                  Proceed
                </button>
              </div>
            </form>
            </div>
          </div>
          <Footer logo={logoSrc} />
        </main>

        {isModalOpen && (
          <ModalTransaction selectedTransaction={marriageCert} modalType={'Marriage Certificate'} onClose={handleCloseModal} onSubmit={handleSubmit}/>
        )}

      </div>
    </div>
  );
}

export default MarriageCertificateForm;