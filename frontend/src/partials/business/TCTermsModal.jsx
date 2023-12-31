import React, { useState } from 'react';

const TCTermsModal = ({ isVisible, onProceed, userID }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleProceedClick = () => {
    if (isChecked) {
      onProceed();
    } else {
      alert('Please accept the terms and conditions before proceeding.');
    }
  };


  return isVisible ? (
    <div className="fixed z-50 inset-0">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center text-xs md:text-sm sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white dark:bg-[#212121] text-slate-700 dark:text-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full max-w-2xl max-h-screen overflow-y-auto">
          <div className="px-4 pt-5 pb-3 sm:p-6 sm:pb-6">
            <span className="font-bold md:text-lg text-sm">Terms & Conditions</span>
          </div>

          <div className="pb-1 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6">
            <div className="mx-auto">
              <p className="flex text-slate-500 dark:text-gray-400 hover:text-slate-600 mt-0.5">
                <input
                  id="bus_terms"
                  className="mr-1.5 mt-0.5 w-4 h-4 border-2 border-gray-400 rounded bg-transparent text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-white text-justify pointer-events-none">
                  <span className="font-medium">I DECLARE UNDER PENALTY OF PERJURY</span> that all information in this application is true and correct based on my personal knowledge and submitted authentic documents online to the BUREAU OF PERMITS. Any false or misleading information supplied, or production of fake/falsified documents shall be grounds for appropriate legal action against me and AUTOMATICALLY REVOKES THE PERMIT. I hereby agree that all personal data (as defined under the Data Privacy Law of 2012 and its Implementing Rules and Regulations) and account transaction information or records with the City/Municipal Government may be processed, profiled or shared to requesting parties or for the purpose of any court, legal process, examination, inquiry and audit or investigation of any authority.
                </p>
              </p>
            </div>
          </div>

          <div className="mr-0 md:mr-2 px-3 pt-3 pb-5 gap-3 sm:px-4 flex justify-end">
            <div className="flex items-center space-x-2 mt-auto">
              <button
                  onClick={() => {
                    window.location.href = `/home/${userID}`;
                  }}                  
                  type="button"
                  className="text-slate-500 text-xs text-center px-5 py-2 mb-0 md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                  >
                  <p>Cancel</p>
              </button>

              <button
                onClick={handleProceedClick}
                type="button"
                className={`text-white text-xs text-center px-5 py-2 md:text-sm bg-blue-500 border border-blue-500 ${
                  isChecked ? 'hover:bg-blue-600' : 'cursor-not-allowed opacity-50'
                } focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                disabled={!isChecked}>
                <p>Proceed</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default TCTermsModal;
