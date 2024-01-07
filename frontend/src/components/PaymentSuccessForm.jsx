import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

const PaymentSuccessForm =()=>{

      const currentUrl = window.location.href;
      const startIndex = currentUrl.indexOf("/paymentsuccess/") + "/paymentsuccess/".length;
      const userId = currentUrl.substr(startIndex, 6);
      
      const location = useLocation();

      const getTransId = () => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get('transaction_id');
      };
    
      const transactionId = getTransId();

      console.log(userId)
      console.log(transactionId)


  const handleReturn = async () => {
    try {

      const res = await axios.post(`http://localhost:8800/payment/success/${transactionId}`);
      window.location.href = `http://localhost:5173/transachistory/${userId}`;
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
   
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Content Area of 3rd Button */}
        <main className="overflow-y-auto flex items-center justify-center h-screen bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
          <div className="w-1/2">
            <div className="bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] text-slate-700 dark:text-white shadow-xl rounded-lg px-4 pt-5 pb-1 sm:px-6">
                  <svg viewBox="0 0 24 24" className="text-green-600 w-10 h-10 sm:w-16 sm:h-16 mx-auto mt-6 mb-2">
                      <path fill="currentColor"
                          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                      </path>
                  </svg>
                  <div className="mb-3">
                        <div className="mb-6 text-center">
                          <span className="font-bold md:text-lg text-sm">Payment Successfull!</span>
                        </div>
                        
                        <div className="flex items-center justify-center space-x-2 pt-10">
                          <button
                            onClick={handleReturn}
                            type="button"
                            className="text-white text-xs md:text-sm bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-12 py-2 text-center dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            <p>Proceed</p>
                          </button>
                        </div>
              </div>
            </div>
          </div>
        </main>



      </div>
    </div>
  );
}

export default PaymentSuccessForm;