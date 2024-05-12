import React, { useState, useEffect } from 'react';
import moment from 'moment/moment.js';

const AdminRPCharges = ({ selectedTransaction, isOpen, handleConfirmClose, transType, isLoading, handleProcess, warning }) => { // KAILANGAN IDECLARE RIN DITO SA LOOB LAHAT NG IPINASA NA VALUE PARA MAACCESS

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
    const handleKeyPress = (e) => {
      const charCode = e.keyCode || e.which;
      const ctrlKey = e.ctrlKey || e.metaKey; // Check if Ctrl key is pressed
  
      // Allow backspace, delete, arrows, home, end, and decimal point
      if (
        charCode !== 8 &&
        charCode !== 46 &&
        (charCode < 37 || charCode > 40) &&
        charCode !== 35 &&
        charCode !== 36 &&
        charCode !== 190 &&
        !(ctrlKey && charCode === 65) // Allow Ctrl+A (65 is the char code for 'A')
      ) {
        const charStr = String.fromCharCode(charCode);
        if (!/^\d$/.test(charStr)) {
          e.preventDefault();
        }
      }
    };
  
    const inputElement = document.getElementById("bp_amount");
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyPress);
  
      return () => {
        inputElement.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, []);
  
  useEffect(() => {
    let val = 0;
    for (const key in values) {
      if (!isNaN(parseFloat(values[key]))) {
        val += parseFloat(values[key]);
      }
    }
    setTotalVal(val);
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
                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">From</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.year_period}</span>
                </div>                    
                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">To</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.period_id}</span>
                </div>
             
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
                  <span className="whitespace-nowrap mb-1 text-xs py-0.5 font-semibold rounded-full bg-purple-200 text-purple-800 w-24">{selectedTransaction.status_type}</span>
                </div>
                <div className="flex flex-col text-sm italic sm:flex-row text-start mb-2">
                  <span>Note: Kindly input necessary charges.</span>
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
             
              {warning && (
                <div className="text-yellow-600 bg-yellow-100 md:text-sm text-xs text-center rounded-full py-1.5 mb-5">
                  Missing fields are required.
                </div>
              )}  

                <div className='flex text-left dark:text-white text-sm pb-2'>
                  <span>Note: Please input the exact amount for the Real Property Tax Payment based on the user's provided details.</span>
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_amount" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">AMOUNT</label>
                  <input type={values.tax_1} name="bp_amount" onChange={handleChange} id="bp_amount" className="block w-full md:text-sm rounded border-0 py-1.5 px-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="font-semibold flex space-x-2 text-slate-700 text-start py-8 dark:text-white sm:mt-0 text-xs md:text-sm" id="modal-headline">
                  <span>Total :</span>
                  <span className='font-normal'>P {totalVal}.00</span>
                </div>
                
                {/* Button container */}
                <div className="flex justify-end pb-8 space-x-2">
                  {isLoading ? (
                    <div className="pt-3 font-medium flex text-slate-700 dark:text-white pb-2 sm:mt-0 text-xs md:text-sm items-center justify-center mb-3">
                    <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                    </svg>
                    <span className="pl-2">
                    Please wait for a moment...
                    </span>
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
                        onClick={(e) => handleProcess(e, totalVal)}
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
