import React, { useState } from 'react';
import Loading from '../partials/Loading';

const CancelTransactionModal = ({ onClose, onCancel }) => {


  const [isloading, setIsLoading] = useState(false)
  
  const submitHandler = async (e) => {
    try {
      setIsLoading(true);
      await onCancel(e);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false); 
    }
  };

  return (
    <div className="fixed z-50 inset-0 overflow-hidden">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center text-xs md:text-sm sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white dark:bg-[#212121] text-slate-700 dark:text-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full max-w-2xl max-h-screen overflow-y-auto">
          <div className="px-4 pt-5 pb-3 sm:p-6 sm:pb-6">
            <span className="font-bold md:text-lg text-sm">Cancel Transaction</span>
          </div>

          <div className="max-h-[19.5rem] pb-1 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 overflow-y-auto">
          <div className="text-slate-700 dark:text-white text-xs sm:text-sm text-center">
          <span>Are you sure you wanted to cancel this transaction?</span>
          <br/><br/>
        </div>

           
          </div>

            {isloading ? (
                      <div className="bg-white dark:bg-[#212121] text-slate-700 dark:text-white px-1 pb-1 rounded-b-lg mt-[-10px]">
                        <Loading />
                      </div>
                    ) : (
                      <>
                    <div className="mr-0 md:mr-2 px-3 pb-5 gap-3 sm:px-4">
                                <div className="flex justify-end items-center space-x-2 mt-auto">
                                  <button
                                      onClick={onClose}        
                                      type="button"
                                      className="text-slate-500 text-xs text-center px-5 py-2 mb-0 md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                                      >
                                      <p>Back</p>
                                  </button>

                                  <button
                                    onClick={submitHandler}
                                    type="button"
                                    className="text-white text-xs text-center px-5 py-2 md:text-sm bg-red-500 border border-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-normal rounded-full dark:border-red-500 dark:text-white dark:hover:text-white dark:hover:bg-red-700 dark:focus:ring-red-800"
                                    >
                                    <p>Cancel Transaction</p>
                                  </button>
                                </div>
                              </div>
                      </>
                    )}


          




        </div>
      </div>
    </div>
  )
};

export default CancelTransactionModal;
