import React, { useState, useEffect } from 'react';
import moment from 'moment/moment.js';

const AdminRPCharges = ({ selectedTransaction, isOpen, handleConfirmClose, transType, isLoading, handleProcess }) => { // KAILANGAN IDECLARE RIN DITO SA LOOB LAHAT NG IPINASA NA VALUE PARA MAACCESS

  const { transaction_id, status_type, date_processed } = selectedTransaction; // PANG DESTRUCTURE LANG NG LAMAN NG SELECTEDTRANSACTION, IBIG SABIHIN, MAY COPY NA YUNG VALUES SA LABAS NG SELECTEDTRANSACTION

  console.log(selectedTransaction);
   const date = moment(date_processed).format('MMMM D, YYYY'); // INEXPLAIN KO KANINA TO
   const time = moment(date_processed).format('h:mm A');

   const [totalVal, setTotalVal] = useState();
   const [values, setValues] = useState({
    tax_1 : ''
   });

   const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    }

    useEffect(() => {
      let sum = 0;
      for (const key in values) {
          if (values.hasOwnProperty(key) && values[key] !== '') {
          sum += parseFloat(values[key]);
          }
      }
  setTotalVal(sum);
  }, [values]);

  return (
    // MAY CONDITION NA MAGDIDISPLAY LANG KUNG ANG ISOPEN AY TRUE, ITO RIN YUNG ISMODALOPEN, IBA LANG NAME
    isOpen && (
      <div className="fixed z-50 inset-0 flex items-center justify-center">
        {/* Left Modal */}
        <div className="absolute left-0 w-1/2 min-h-screen h-full bg-gray-500 opacity-75"></div>
          <div className="absolute left-0 flex items-center justify-center w-1/2 h-full">
            <div className="inline-block bg-white dark:bg-[#212121] justify-between ms-12 w-[44rem] h-[30rem] overflow-y-auto px-8 rounded-sm dark:text-white text-center overflow-hidden shadow-xl transform transition-all">
              <div>
                <div className="px-4 pt-5 pb-0 sm:p-6 sm:pb-0 dark:text-white">
                  <div className="mb-6">
                    <span className="font-bold md:text-lg text-sm">Tax Transaction Details</span>
                  </div>
                </div>
                {/* SO ITO NA DISPLAY DISPLAY NALANG */}
                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">Transaction ID</span>
                  {/* KAYA WALA TONG SELECTEDTRANSACTION KASI NGA GUMAWA TAYO COPY SA LINE 6 */}
                  <span className="whitespace-nowrap md:mb-7 mb-1">{transaction_id}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">Type</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1">{status_type}</span>
                </div>
                {/* ITO NAMAN YUNG CONDITION NA MAGDIDISPLAY LANG KUNG ANG TRANSTYPE NA PINASA AY TAX PAYMENT, NULL IF HINDI */}
                {transType === 'Tax Payment' ? 
                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">Account Name</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.acc_name}</span>
                </div>
                : null} 
                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">Tax Declaration Number (TDN)</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.rp_tdn}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">Property Identification Number (PIN)</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.rp_pin}</span>
                </div>
                {transType === 'Tax Payment' ? 
                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">From</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1">1st Quarter</span>
                </div>
                : null} 
                {transType === 'Tax Payment' ? 
                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">To</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.period_id}</span>
                </div>
                : null} 
                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">Date Processed</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1">{date}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">Time Processed</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1">{time}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">Status</span>
                  <span className="whitespace-nowrap md:mb-7 mb-1 text-xs py-0.5 font-semibold rounded-full bg-purple-200 text-purple-800 w-24">{selectedTransaction.status_type}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Modal */}
          <div className="absolute right-0 w-1/2 h-full bg-gray-500 opacity-75"></div>
          <div className="absolute right-0 flex items-center justify-center w-1/2 h-full">
          <div className="inline-block align-bottom bg-white dark:bg-[#333333] rounded-sm text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full max-w-2xl max-h-screen relative">
            {/* Menu Bar */}
            <div className="bg-slate-200 dark:bg-[#212121] pt-1.5 pb-1 items-center">
              <button onClick={handleConfirmClose} type="button" className="float-right text-slate-500 dark:text-slate-300 text-xs md:text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:w-5 md:h-5 w-4 h-4 mr-1">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="font-semibold text-gray-700 bg-slate-200 dark:bg-[#212121] dark:text-gray-300 ml-6">Tax Charges</span>
            </div>
              <div className="bg-white dark:bg-[#3d3d3d] pt-2 pb-4 sm:p-6 sm:pb-4 h-[28rem] overflow-y-auto"> 
                <div className="mt-2">
                  <label htmlFor="bp_amount" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">AMOUNT</label>
                  <input type={values.tax_1} name="bp_amount" onChange={handleChange} id="bp_amount" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="font-semibold flex space-x-2 text-slate-700 text-start py-8 dark:text-white sm:mt-0 text-xs md:text-sm" id="modal-headline">
                  <span>Total :</span>
                  <span className='font-normal'>P {totalVal}.00</span>
                </div>
                
                {/* Button container */}
                <div className="flex justify-end pb-8 space-x-2">
                  {isLoading ? (
                    <div className="bg-white dark:bg-[#212121] text-slate-700 dark:text-white px-1 pb-1 mt-[-10px]">
                      <Loading />
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={handleConfirmClose}
                        type="button"
                        className="text-slate-500 text-xs md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-sm px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                      >
                        <p>Cancel</p>
                      </button>

                      <button
                        onClick={handleProcess}
                        type="button"
                        className="text-white text-xs md:text-sm bg-emerald-500 border border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-normal rounded-sm px-5 py-2 text-center mb-2 dark:border-emerald-500 dark:hover:border-emerald-700 dark:text-white dark:hover:text-white dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                      >
                        Confirm
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
      
          </div>
    )
  );
};

export default AdminRPCharges;
