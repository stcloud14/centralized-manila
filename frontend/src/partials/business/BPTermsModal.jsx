import React, { useState } from 'react';

const BPTermsModal = ({ isVisible, onProceed, userID }) => {
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
            <span className="font-bold md:text-lg text-sm">Terms & Conditions</span>
          </div>

          <div className="max-h-[19.5rem] pb-1 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 overflow-y-auto">
              <div className="text-slate-700 dark:text-white text-xs sm:text-sm text-justify">
                  <span>By using our online form application processor, you agree to the following terms and conditions regarding the accuracy of the information you provide:</span>
                      <br/><br/>
                    <span className="font-medium">1. Accurate Information:</span>
                  <div className="ml-3.5">
                    <span>You are solely responsible for ensuring the accuracy, completeness, and truthfulness of all the information you submit through our online forms.</span>
                  </div>
                      <br/>
                    <span className="font-medium">2. Verification:</span>
                      <br/>
                  <div className="ml-3.5">
                    <span>We reserve the right to verify the information provided by you through any means necessary. This may include, but is not limited to, requesting additional documentation or contacting third parties.</span>
                  </div>
                      <br/>
                    <span className="font-medium">3. Consequences of Innacurate Information:</span>
                      <br/>
                  <div className="ml-3.5">
                    <span>Providing false, misleading, or inaccurate information may result in the rejection of your application or request. It may also lead to the termination of any services or agreements established based on the inaccurate information.</span>
                  </div>
                      <br/>
                    <span className="font-medium">4. Legal Consequences:</span>
                      <br/>
                  <div className="ml-3.5">
                    <span>Knowingly providing false information may have legal consequences. We may take appropriate legal action if it is determined that information provided by you is intentionally false or misleading.</span>
                  </div>
                      <br/>
                    <span className="font-medium">5. Data Accuracy Responsibility:</span>
                      <br/>
                  <div className="ml-3.5">
                    <span>While we take reasonable measures to ensure the security and integrity of the data you submit, we do not guarantee the accuracy of the information provided by you. You are encouraged to review and verify all information before submission.</span>
                  </div>
                      <br/>                  
                    <span className="font-medium">6. Updates and Corrections:</span>
                      <br/>
                  <div className="ml-3.5">    
                    <span>It is your responsibility to promptly inform us of any changes or inaccuracies in the information you have previously submitted. You may contact us through the provided channels for updates or corrections.</span>
                  </div>
                    <br/>
                  <span className="font-medium">7. User Liability:</span>
                  <div className="ml-3.5">    
                    <span>You agree to hold us harmless and indemnify us against any claims, losses, or damages resulting from the inaccuracy of the information you provide.</span>
                  </div>
                      <br/>
                    <span className="font-medium">I DECLARE UNDER PENALTY OF PERJURY</span> that all information in this application is true and correct based on my personal knowledge and submitted authentic documents online to the BUREAU OF PERMITS. Any false or misleading information supplied, or production of fake/falsified documents shall be grounds for appropriate legal action against me and AUTOMATICALLY REVOKES THE PERMIT. I hereby agree that all personal data (as defined under the Data Privacy Law of 2012 and its Implementing Rules and Regulations) and account transaction information or records with the City/Municipal Government may be processed, profiled or shared to requesting parties or for the purpose of any court, legal process, examination, inquiry and audit or investigation of any authority.
                    <br/><br/>
                    <span>By using our online form application processor, you acknowledge that you have read, understood, and agreed to these terms and conditions regarding the accuracy of information.</span>
                 
                
              
              </div>

           
          </div>

          <div className="mr-0 md:mr-2 px-3 pt-3 pb-5 gap-3 sm:px-4">
          <div className="mx-auto">
              <p className="flex mt-0.5">
                <input
                  id="bus_terms"
                  className="mr-1.5 ml-1 mt-0.5 w-4 h-4 border-2 border-gray-400 rounded bg-transparent text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <p className="mb-2 text-xs sm:text-sm text-slate-700 dark:text-white text-justify pointer-events-none">
                  <span className="font-medium">I HAVE READ AND AGREE</span> to the terms and conditions. 
                </p>
              </p>
            </div>
            <div className="flex justify-end items-center space-x-2 mt-auto">
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

export default BPTermsModal;
