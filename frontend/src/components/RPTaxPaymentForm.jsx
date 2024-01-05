import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'

import { useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import YearDropdown from '../partials/YearDropdown';
import Req from '../partials/misc/RequiredFieldIndicator';
import TPTermsModal from '../partials/business/TPTermsModal';
import ModalTransaction from '../partials/transactionModal/ModalTransaction';
import QuarterDropdown from '../partials/profile/QuarterDropdown';
import TermsModal from '../partials/business/TermsModal';

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

  console.log(rptaxPayment);

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
      const response = await axios.post(`http://localhost:8800/rptax/payment/${user_id}`, rptaxPayment);
  
      // Check the response status before proceeding
      if (response.status === 200) {
        setIsSuccess(true);
        handleCloseModal();
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('Transaction successful');
  
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        console.error('Transaction error:', response.statusText);
      }
    } catch (err) {
      console.error('Transaction error:', err);
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

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <TermsModal isVisible={isModalVisible} onProceed={toggleModalVisibility} userID={user_id} />

        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
          <div className="px-5 py-5">

              <form className={`max-w-md mx-auto ${isModalVisible ? 'blur' : ''}`}>
                <h1 className='font-medium text-center text-slate-700 dark:text-white'>Real Property Tax</h1>
                <h1 className='text-sm italic text-center text-slate-700 dark:text-gray-300 mb-6'>Tax Payment</h1>

                {isSuccess && (
                <div className="text-emerald-700 text-sm bg-emerald-200 md:text-sm text-xs text-center rounded-full py-1.5 mb-5">
                  Transaction success on Real Property Tax Payment!
                </div>
                )}

                {showWarning && (
                  <div className="text-yellow-600 bg-yellow-100 md:text-sm text-xs text-center rounded-full py-1.5 mb-5">
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
            </div>
          </div>
        </main>


        {isModalOpen && (
          <ModalTransaction selectedTransaction={rptaxPayment} modalType={'Real Property Tax Payment'} onClose={handleCloseModal} onSubmit={handleSubmit} />
        )}

        

      </div>
    </div>
  );
}

export default RPTaxPaymentForm;