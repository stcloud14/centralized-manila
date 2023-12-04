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
    const { name, value } = e.target;

  const formattedValue = value.replace(/\D/g, '');

  setRptaxPayment((prevData) => ({
    ...prevData,
    [name]: formattedValue,
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

                  {isSuccess && (
                  <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                    Transaction success on Real Property Tax Payment!
                  </div>
                  )}  

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
                        <select onChange={handleInputChange} value={rptaxPayment.rp_year} defaultValue={0} name="rp_year" id="rp_year" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                          <option value="0" className='dark:bg-[#3d3d3d]'>Select Year</option>
                          <option value="2024" className='dark:bg-[#3d3d3d]'>2024</option>
                          <option value="2023" className='dark:bg-[#3d3d3d]'>2023</option>
                          <option value="2022" className='dark:bg-[#3d3d3d]'>2022</option>
                          <option value="2021" className='dark:bg-[#3d3d3d]'>2021</option>
                          <option value="2020" className='dark:bg-[#3d3d3d]'>2020</option>
                          <option value="2019" className='dark:bg-[#3d3d3d]'>2019</option>
                          <option value="2018" className='dark:bg-[#3d3d3d]'>2018</option>
                          <option value="2017" className='dark:bg-[#3d3d3d]'>2017</option>
                          <option value="2016" className='dark:bg-[#3d3d3d]'>2016</option>
                          <option value="2015" className='dark:bg-[#3d3d3d]'>2015</option>
                          <option value="2014" className='dark:bg-[#3d3d3d]'>2014</option>
                          <option value="2013" className='dark:bg-[#3d3d3d]'>2013</option>
                          <option value="2012" className='dark:bg-[#3d3d3d]'>2012</option>
                          <option value="2011" className='dark:bg-[#3d3d3d]'>2011</option>
                          <option value="2010" className='dark:bg-[#3d3d3d]'>2010</option>
                          <option value="2009" className='dark:bg-[#3d3d3d]'>2009</option>
                          <option value="2008" className='dark:bg-[#3d3d3d]'>2008</option>
                          <option value="2007" className='dark:bg-[#3d3d3d]'>2007</option>
                          <option value="2006" className='dark:bg-[#3d3d3d]'>2006</option>
                          <option value="2005" className='dark:bg-[#3d3d3d]'>2005</option>
                          <option value="2004" className='dark:bg-[#3d3d3d]'>2004</option>
                          <option value="2003" className='dark:bg-[#3d3d3d]'>2003</option>
                          <option value="2002" className='dark:bg-[#3d3d3d]'>2002</option>
                          <option value="2001" className='dark:bg-[#3d3d3d]'>2001</option>
                          <option value="2000" className='dark:bg-[#3d3d3d]'>2000</option>
                          <option value="1999" className='dark:bg-[#3d3d3d]'>1999</option>
                          <option value="1998" className='dark:bg-[#3d3d3d]'>1998</option>
                          <option value="1997" className='dark:bg-[#3d3d3d]'>1997</option>
                          <option value="1996" className='dark:bg-[#3d3d3d]'>1996</option>
                          <option value="1995" className='dark:bg-[#3d3d3d]'>1995</option>
                          <option value="1994" className='dark:bg-[#3d3d3d]'>1994</option>
                          <option value="1993" className='dark:bg-[#3d3d3d]'>1993</option>
                          <option value="1992" className='dark:bg-[#3d3d3d]'>1992</option>
                          <option value="1991" className='dark:bg-[#3d3d3d]'>1991</option>
                          <option value="1990" className='dark:bg-[#3d3d3d]'>1990</option>
                          <option value="1989" className='dark:bg-[#3d3d3d]'>1989</option>
                          <option value="1988" className='dark:bg-[#3d3d3d]'>1988</option>
                          <option value="1987" className='dark:bg-[#3d3d3d]'>1987</option>
                          <option value="1986" className='dark:bg-[#3d3d3d]'>1986</option>
                          <option value="1985" className='dark:bg-[#3d3d3d]'>1985</option>
                          <option value="1984" className='dark:bg-[#3d3d3d]'>1984</option>
                          <option value="1983" className='dark:bg-[#3d3d3d]'>1983</option>
                          <option value="1982" className='dark:bg-[#3d3d3d]'>1982</option>
                          <option value="1981" className='dark:bg-[#3d3d3d]'>1981</option>
                          <option value="1980" className='dark:bg-[#3d3d3d]'>1980</option>
                          <option value="1979" className='dark:bg-[#3d3d3d]'>1979</option>
                          <option value="1978" className='dark:bg-[#3d3d3d]'>1978</option>
                          <option value="1977" className='dark:bg-[#3d3d3d]'>1977</option>
                          <option value="1976" className='dark:bg-[#3d3d3d]'>1976</option>
                          <option value="1975" className='dark:bg-[#3d3d3d]'>1975</option>
                          <option value="1974" className='dark:bg-[#3d3d3d]'>1974</option>
                          <option value="1973" className='dark:bg-[#3d3d3d]'>1973</option>
                          <option value="1972" className='dark:bg-[#3d3d3d]'>1972</option>
                          <option value="1971" className='dark:bg-[#3d3d3d]'>1971</option>
                          <option value="1970" className='dark:bg-[#3d3d3d]'>1970</option>
                          <option value="1969" className='dark:bg-[#3d3d3d]'>1969</option>
                          <option value="1968" className='dark:bg-[#3d3d3d]'>1968</option>
                          <option value="1967" className='dark:bg-[#3d3d3d]'>1967</option>
                          <option value="1966" className='dark:bg-[#3d3d3d]'>1966</option>
                          <option value="1965" className='dark:bg-[#3d3d3d]'>1965</option>
                          <option value="1964" className='dark:bg-[#3d3d3d]'>1964</option>
                          <option value="1963" className='dark:bg-[#3d3d3d]'>1963</option>
                          <option value="1962" className='dark:bg-[#3d3d3d]'>1962</option>
                          <option value="1961" className='dark:bg-[#3d3d3d]'>1961</option>
                          <option value="1960" className='dark:bg-[#3d3d3d]'>1960</option>
                          <option value="1959" className='dark:bg-[#3d3d3d]'>1959</option>
                          <option value="1958" className='dark:bg-[#3d3d3d]'>1958</option>
                          <option value="1957" className='dark:bg-[#3d3d3d]'>1957</option>

                        </select>
                        <label
                          htmlFor="rp_year"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Year
                        </label>
                      </div>

                      <div className="relative z-0 w-full mb-2 group">
                        <select onChange={handleInputChange} value={rptaxPayment.period} defaultValue={0} name="period" id="period" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                          <option value="0" className='dark:bg-[#3d3d3d]'>Select Period</option>
                          <option value="1ST QUARTER" className='dark:bg-[#3d3d3d]'>1st Quarter</option>
                          <option value="2ND QUARTER"className='dark:bg-[#3d3d3d]'>2nd Quarter</option>
                          <option value="3RD QUARTER"className='dark:bg-[#3d3d3d]'>3rd Quarter</option>
                          <option value="4TH QUARTER"className='dark:bg-[#3d3d3d]'>4th Quarter</option>
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