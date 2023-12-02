import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

const TransactionHistoryForm =()=>{

  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);
  const user_id = pathname.split("/")[2];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userTransaction, setUserTransaction]=useState([]);
  const [modalContent, setModalContent] = useState({});

  useEffect(()=>{
    const fetchUserTransaction = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/transachistory/${user_id}`);
        setUserTransaction(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserTransaction();
  }, [user_id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      //const response = await axios.post(`http://localhost:8800/rptax/payment/${user_id}`, userPersonal);
  
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

  const handleOpenModal = (userTransaction, index) => {

    const valuesToDisplay = userTransaction[index];

    setModalContent(valuesToDisplay);

    setIsModalOpen(true);
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProceed = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
                <h1 className='font-medium text-center text-slate-700 dark:text-white mb-7 md:mb-3'>Transaction History</h1>
                <div className="flex items-center justify-end mb-4 md:px-0 md:pr-0.5 px-0.5 text-xs">
                  <div className="relative mr-2">
                    <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-transparent text-xs md:text-sm border border-slate-300 text-slate-700 dark:text-white px-8 py-1 md:py-0.5 rounded-full w-full md:w-auto"
                    />
                  </div>
                
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full mr-2 inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-0.5">
                      <path className="stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                    </svg>
                    <span>Filter</span>
                  </button>
                
                  <button className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-1 rounded-full inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <span>Clear</span>
                  </button>
                </div>
                <div className="relative overflow-x-auto shadow-md md:rounded-lg rounded-md">
                  <table className="w-full text-left text-xs md:text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-gray-700 uppercase bg-slate-200 dark:bg-[#212121] dark:text-slate-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                                Transaction ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                                Amount
                            </th>
                            <th>
                              {/* View Details*/}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {userTransaction.map((userTransaction, index) => (

                    <tr key={index} className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          {userTransaction.transaction_id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                        {userTransaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                        {userTransaction.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                        {userTransaction.trans_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-10 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {userTransaction.status_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                        P {userTransaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="group">
                          <a onClick={() => openModal(transaction, index)} className="flex justify-center items-center text-center p-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full" href="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:stroke-white">
                              <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>   
                            <span className="text-xs font-normal">&nbsp;View Details</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                  </table>
                </div>
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
              <div className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full max-w-2xl">
                <div className="bg-white dark:bg-[#212121] text-slate-700 dark:text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mx-auto mt-2">
                    <div className="sm:mt-0" id="modal-headline">   
                      <div className="mx-auto">
                        <div className="mb-6">
                          <span className="font-bold md:text-lg text-sm">Transaction Details</span>
                        </div>

                        <div className="mb-6">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Transaction ID</span>
                            <span className="whitespace-nowrap ml-4">{modalContent.transaction_id}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Tax Identification Number (TDN)</span>
                            <span className="whitespace-nowrap ml-4">{modalContent.transaction_id}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Property Identification Number (PIN)</span>
                            <span className="whitespace-nowrap ml-4">119-7-584-328-009</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Transaction Type</span>
                            <span className="whitespace-nowrap ml-4">REAL PROPERTY TAX (RPTax)</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Transaction Number</span>
                            <span className="whitespace-nowrap ml-4">542312454</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Date & Time</span>
                            <span className="whitespace-nowrap ml-4">05/09/2023 1:25 PM</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Valid ID to Present Upon Claiming</span>
                            <span className="whitespace-nowrap ml-4">AUTHORIZATION LETTER</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Period</span>
                            <span className="whitespace-nowrap ml-4">-</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Remarks</span>
                            <span className="whitespace-nowrap ml-4">WAITING FOR PAYMENT REFERENCE NUMBER</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Reference Number</span>
                            <span className="whitespace-nowrap ml-4">-</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Status</span>
                            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">PENDING PAYMENT</span>
                          </div>

                          <hr className='mt-7 mb-1'/>
                          <div className="flex justify-between">
                            <span className="font-semibold whitespace-nowrap">Amount to Pay</span>
                            <span className="font-semibold whitespace-nowrap ml-4"> P 1,020.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#212121] px-4 pt-3 pb-5 gap-3 sm:px-6 flex items-center justify-between">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Sample_EPC_QR_code.png" alt="QR Code" className="w-20 h-20 mr-3"/>
                  <div className="flex items-center space-x-2 mt-auto">
                      <button
                          onClick={handleCloseModal}
                          type="button"
                          className="text-slate-500 text-xs text-center px-5 py-2 mb-0 md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                      >
                          <p>Cancel</p>
                      </button>
                      <button
                          onClick={handleSubmit}
                          type="button"
                          className="text-white text-xs px-5 py-2 text-center mb-0 md:text-sm bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                          <p>Proceed</p>
                      </button>
                  </div>
              </div>

              </div>
            </div>
          </div>
        )}  

      </div>
    </div>
  );
}

export default TransactionHistoryForm;