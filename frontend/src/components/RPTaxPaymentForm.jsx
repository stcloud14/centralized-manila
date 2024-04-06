import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'

import { useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import YearDropdown from '../partials/YearDropdown';
import Req from '../partials/misc/RequiredFieldIndicator';
import TPTermsModal from '../partials/business/TPTermsModal';
import ModalTransaction from '../partials/transactionModal/ModalTransaction';
import QuarterDropdown from '../partials/profile/QuarterDropdown';
import TermsModal from '../partials/business/TermsModal';
import VerifyModal from '../partials/business/VerifyModal';

const RPTaxPaymentForm =()=>{

  const location = useLocation();
  const { pathname } = location;
  const user_id = pathname.split("/")[2];

  const date = new Date();
  const currentDate = date.toISOString().split('T')[0];

  const [rptaxPayment, setRptaxPayment]=useState((prevData) => ({
    ...prevData,
    year_label: '',

  }));


  const handleInputChange = (e) => {
  const { name, value } = e.target;

  const updatedValue = isNaN(value) ? value.toUpperCase() : value;

  if (name === 'rp_tdn') {
    const { name: inputName, value } = e.target;
  
    // Extract the first two characters and the remaining characters
    const firstTwoLetters = value.substring(0, 2).toUpperCase(); // Convert to uppercase
    const remainingCharacters = value.substring(2);
  
    // Check if the first two characters are letters
    const areFirstTwoLettersValid = /^[A-Za-z]{0,1}$|^[A-Za-z]{2}[0-9]*$/.test(firstTwoLetters);

  
    if (areFirstTwoLettersValid) {
      // Remove non-numeric characters from the remaining input
      const cleanedRemainingCharacters = remainingCharacters.replace(/[^0-9]/g, '');
  
      // Combine the first two letters with the cleaned numeric characters
      const formattedValue = firstTwoLetters + cleanedRemainingCharacters;
  
      // Format the value with dashes
      let formattedWithDashes = formattedValue.slice(0, 2);
      if (formattedValue.length > 2) {
        formattedWithDashes += '-' + formattedValue.slice(2, 7);
      }
      if (formattedValue.length > 7) {
        formattedWithDashes += '-' + formattedValue.slice(7, 14);
      }
  
      setRptaxPayment((prevData) => ({
        ...prevData,
        [inputName]: formattedWithDashes,
      }));
    } else {
      console.log('Please enter valid first 2 letters.');
    }
  
  
  } else if (name === 'rp_pin') {
  const { name, value } = e.target;

  const updatedValue = isNaN(value) ? value.toUpperCase() : value;

  let formattedValue;

  if (updatedValue.length <= 18) {
    formattedValue = updatedValue.replace(/\D/g, '');
  } else {
    formattedValue = updatedValue.replace(/\W/g, '');
  }

  let formattedWithDashes = '';
  for (let i = 0; i < formattedValue.length; i++) {
    if (i === 3 || i === 5 || i === 8 || i === 11 || i === 14) {
      formattedWithDashes += '-';
    }
    formattedWithDashes += formattedValue[i];
  }

  setRptaxPayment((prevData) => ({
    ...prevData,
    [name]: formattedWithDashes,
  }));


  } else if (name === 'rp_year') {

  const label = e.target.options[e.target.selectedIndex].text;

  setRptaxPayment((prevData) => ({
    ...prevData,
    [name]: value,
    year_label: label,
  }));

  
  } else if (name === 'period') {
    const { name, value } = e.target;

  setRptaxPayment((prevData) => ({
    ...prevData,
    [name]: value,
  }));


  } else if (name === 'amount') {
    const { name, value } = e.target;

  const formattedValue = value.replace(/\D/g, '');

  let formattedWithCommas = '';
  for (let i = 0; i < formattedValue.length; i++) {
    if (i > 0 && (formattedValue.length - i) % 3 === 0) {
      formattedWithCommas += ',';
    }
    formattedWithCommas += formattedValue[i];
  }

  setRptaxPayment((prevData) => ({
    ...prevData,
    [name]: formattedWithCommas,
  }));


  } else {
    setRptaxPayment((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  }
};

const [isChecked, setIsChecked] = useState(false);
  
const handleCheckboxChange = (e) => {
  setIsChecked(e.target.checked);

  const inputField = document.getElementById('rp_pin');
  inputField.maxLength = e.target.checked ? 24 : 18;

  if (!e.target.checked && rptaxPayment.rp_pin.length > 18) {
    setRptaxPayment({ ...rptaxPayment, rp_pin: rptaxPayment.rp_pin.slice(0, 18) });
  }
};
  

  const [isSuccess, setIsSuccess] = useState(false);

  const contentRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Make a POST request to save rptaxPayment data
      const response = await axios.post(`http://localhost:8800/rptax/payment/${user_id}`, rptaxPayment);
  
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

            const trans_type = 'Real Property Tax Payment';

            const rowData = { ...rptaxPayment, transaction_id, trans_type, date, time};

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
  
        // Continue with the logic for a successful transaction
        setIsSuccess(true);
        handleCloseModal();
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('Transaction successful');

        
        // Set a timeout for isSuccess to false after 2.1 seconds
        setTimeout(() => {
          setIsSuccess(false);
          window.location.href = `/transachistory/${user_id}`
        }, 2100);
        
      } else {
        console.error('Transaction error:', response.statusText);
      }
    } catch (transactionError) {
      console.error('Transaction error:', transactionError);
    }
  };
  

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleProceed = (e) => {
    e.preventDefault();

    // Please fill up the necessary forms
     const requiredFields = ['acc_name','rp_tdn', 'rp_pin','rp_year','period','amount']; //The input fields that is required
     const isIncomplete = requiredFields.some((field) => !rptaxPayment[field]);

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
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 mt-4 mb-2">
            <div className="px-5 py-5">
            <form onSubmit={handleSubmit} className={`overflow-y-auto ${isModalVisible ? 'blur' : ''}`}>
            <div className="grid grid-cols-5 items-center">

              {/* Description ONLY APPEARS IN DESKTOP VIEW */}
              <div className="hidden sm:flex mb-7">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 flex-shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                  <h1 className="text-[0.50rem] flex text-gray-500 dark:text-gray-400 pl-1 mt-0.5">Fill out the necessary information below to process your Real Property Tax Payment.</h1>
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
                      <p>Fill out the necessary information below to process your Real Property Tax Payment.</p>
                  </div>
                </div>
              </div>

              {/* FORMS TITLE */}
              <div className="flex flex-col col-span-3">
                <h1 className="font-medium text-center text-slate-700 dark:text-white">Real Property Tax</h1>
                <h1 className="mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300">Real Property Tax Payment Application Form</h1>
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
              <form className={`max-w-md mx-auto ${isModalVisible ? 'blur' : ''}`}>
                

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
                <h1 className='text-xs text-slate-700 dark:text-white mt-8 mb-6'>All fields mark with <Req /> are required.</h1>  
                <div className="grid gap-6">
                
                    <div className="relative z-0 w-full mb-2 group">
                      <input
                        type="text" name="acc_name" id="acc_name" placeholder=" " onChange={handleInputChange} value={rptaxPayment.acc_name}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                      />
                      <label
                        htmlFor="acc_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Account Name<Req />
                      </label>
                    </div>

                    <div className="relative z-0 w-full mb-2 group">
                      <input
                        type="text" name="rp_tdn" id="rp_tdn" placeholder=" " onChange={handleInputChange} value={rptaxPayment.rp_tdn} maxLength={14}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                      />
                      <label
                        htmlFor="rp_tdn"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Tax Declaration Number (TDN)<Req />
                      </label>
                    </div>

                    <div className="relative z-0 w-full group">
                      <input
                        type="text" name="rp_pin" id="rp_pin" placeholder=" " onChange={handleInputChange} value={rptaxPayment.rp_pin} maxLength={isChecked ? 24 : 18}
                        className="block pyt-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                      />
                      <label
                        htmlFor="rp_pin"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Property Identification Number (PIN)<Req />
                      </label>
                      {/* checkboxxx */}
                      <div className="flex items-center mt-1.5 text-xs">
                        <label htmlFor="19digitpin" className="flex text-slate-500 dark:text-gray-400 hover:text-slate-600 cursor-pointer">
                            <input id="19digitpin" className="mr-1.5 mt-0.5 w-3.5 h-3.5 border-2 border-gray-400 rounded bg-transparent text-emerald-500 pointer-events-none focus:ring-emerald-500" type="checkbox" onChange={handleCheckboxChange} checked={isChecked} />
                            <span>19-digit PIN</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="relative z-0 w-full mb-2 group">
                    <select onChange={handleInputChange} value={rptaxPayment.rp_year} defaultValue={0} name="rp_year" id="rp_year" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
                    <YearDropdown />
                    </select>
                      <label
                        htmlFor="rp_year"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Year<Req />
                      </label>
                    </div>

                    <div className="relative z-0 w-full mb-2 group">
                      <select onChange={handleInputChange} value={rptaxPayment.period} defaultValue={0} name="period" id="period" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
                      <QuarterDropdown/>
                      </select>
                      <label htmlFor="period" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Period<Req /></label>
                    </div>

                    <div className="relative z-0 w-full mb-2 group">
                    
                      <input
                        type="text" name="amount" id="amount" placeholder=" " onChange={handleInputChange} value={rptaxPayment.amount}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required 
                      />
                      
                      <label
                        htmlFor="amount"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Amount<Req />
                      </label>
                    </div>

                </div>

                  {/* Submit Button */}
                  <div className="flex justify-end items-end mt-10 mb-4">
                    <button 
                        onClick={handleProceed} 
                        type="submit" 
                        className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                          Proceed
                    </button>
                  </div>
              </form>
              </form>
            </div>
          </div>
          <Footer logo={logoSrc} />
        </main>


        {isModalOpen && (
          <ModalTransaction selectedTransaction={rptaxPayment} modalType={'Real Property Tax Payment'} onClose={handleCloseModal} onSubmit={handleSubmit} />
        )}

        

      </div>
    </div>
  );
}

export default RPTaxPaymentForm;