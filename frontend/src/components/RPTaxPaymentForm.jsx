import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';


const RPTaxPaymentForm =()=>{

  const location = useLocation();
  const { pathname } = location;
  const user_id = pathname.split("/")[2];

  const date = new Date();
  const currentDate = date.toISOString().split('T')[0];

  const [rptaxPayment, setRptaxPayment]=useState({})
   console.log(rptaxPayment);

  const handleInputChange = (e) => {
  const { name, value } = e.target;

  const updatedValue = isNaN(value) ? value.toUpperCase() : value;

  if (name === 'rp_tdn') {
  const { name, value } = e.target;

  const updatedValue = isNaN(value) ? value.toUpperCase() : value;

  const formattedValue = updatedValue.replace(/\W/g, '');

  let formattedWithDashes = '';
  for (let i = 0; i < formattedValue.length; i++) {
    if (i === 2 || i === 7) {
      formattedWithDashes += '-';
    }
    formattedWithDashes += formattedValue[i];
  }

  setRptaxPayment((prevData) => ({
    ...prevData,
    [name]: formattedWithDashes,
  }));

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
  

  const [isSuccess, setIsSuccess] = useState(false); // New state for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`http://localhost:8800/rptax/payment/${user_id}`, rptaxPayment);
  
      // Check the response status before proceeding
      if (response.status === 200) {
        setIsSuccess(true); // Set success state to true
        handleCloseModal(); // Close the modal
        console.log('User credentials updated successfully');
  
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        console.error('Error updating user credentials:', response.statusText);
      }
    } catch (err) {
      console.error('Error updating user credentials:', err);
    }
  };

  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProceed = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="flex flex-col h-full justify-between mx-4 my-4">
            <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
              <div className="px-5 py-5">
                <form className="max-w-md mx-auto">
                  <h1 className='font-medium text-center text-slate-700 dark:text-white'>Real Property Tax</h1>
                  <h1 className='text-sm italic text-center text-slate-700 dark:text-gray-300 mb-6'>Tax Payment</h1>

                  {/* {isSuccess && (
              <div className="text-emerald-500 bg-emerald-100 text-center rounded-full py-1.5 mb-5">
                Success! Your changes have been saved.
              </div>
              )} */}

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
                          Account Name
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
                          Tax Declaration Number (TDN)
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
                          Property Identification Number (PIN)
                        </label>
                        {/* checkboxxx */}
                        <div className="flex items-center mt-1.5 text-xs">
                          <label className="flex text-slate-500 dark:text-gray-400 hover:text-slate-600 cursor-pointer">
                              <input className="mr-1.5 mt-0.5 w-3.5 h-3.5 border-2 border-gray-400 rounded bg-transparent text-emerald-500 pointer-events-none focus:ring-emerald-500" type="checkbox" onChange={handleCheckboxChange} checked={isChecked} />
                              <span>19-digit PIN</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="relative z-0 w-full mb-2 group">
                        <input
                          type="text" name="rp_year" id="rp_year" placeholder=" " onChange={handleInputChange} value={rptaxPayment.rp_year}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          required
                        />
                        <label
                          htmlFor="rp_year"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Year
                        </label>
                      </div>

                      <div className="relative z-0 w-full mb-2 group">
                        <select onChange={handleInputChange} value={rptaxPayment.period} name="period" id="period" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                          <option value="0" className='dark:bg-[#3d3d3d]' disabled selected>Select Period</option>
                          <option value="1st Quarter" className='dark:bg-[#3d3d3d]'>1st Quarter</option>
                          <option value="2nd Quarter"className='dark:bg-[#3d3d3d]'>2nd Quarter</option>
                          <option value="3rd Quarter"className='dark:bg-[#3d3d3d]'>3rd Quarter</option>
                          <option value="4th Quarter"className='dark:bg-[#3d3d3d]'>4th Quarter</option>
                        </select>
                        <label htmlFor="period" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Period</label>
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
                          Amount
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
          </div>
        </main>

        {isModalOpen && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center text-xs md:text-sm sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white dark:bg-[#212121] text-slate-700 dark:text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mx-auto mt-2">
                    <div className="sm:mt-0" id="modal-headline">   
                      <div className="mx-auto">
                        <div className="mb-6">
                          <span className="font-bold md:text-lg text-sm">Tax Payment</span>
                        </div>

                        <div className="mb-6">
                         <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Account Name</span>
                            <span className="whitespace-nowrap ml-4">{rptaxPayment.acc_name || '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Tax Declaration Number (TDN)</span>
                            <span className="whitespace-nowrap ml-4">{rptaxPayment.rp_tdn || '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Property Identification Number (PIN)</span>
                            <span className="whitespace-nowrap ml-4">{rptaxPayment.rp_pin || '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">From</span>
                            {rptaxPayment.rp_year ? (
                            <span className="whitespace-nowrap ml-4">{rptaxPayment.rp_year} - 1st Quarter</span>
                            ) : (
                            <span className="whitespace-nowrap ml-4">-</span>
                            )}
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">To</span>
                            <span className="whitespace-nowrap ml-4">{rptaxPayment.rp_year} - {rptaxPayment.period}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Date Processed</span>
                            <span className="whitespace-nowrap ml-4">{currentDate}</span>
                          </div>
                          <hr className='mt-7 mb-1'/>
                          <div className="flex justify-between">
                            <span className="font-semibold whitespace-nowrap">Amount to Pay</span>
                            <span className="font-semibold whitespace-nowrap ml-4">P {rptaxPayment.amount || '---'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
                    onClick={handleSubmit}
                    type="button"
                    className="text-white text-xs md:text-sm bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <p>Proceed</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}   

        

      </div>
    </div>
  );
}

export default RPTaxPaymentForm;