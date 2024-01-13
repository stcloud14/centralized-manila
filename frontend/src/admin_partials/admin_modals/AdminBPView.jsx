import React from 'react';

const AdminBPView = ({ isOpen, handleClose }) => {
  return (
    isOpen && (
      <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center text-xs md:text-sm sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-md text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full max-w-2xl">
                <div className="bg-white dark:bg-[#212121] text-slate-700 dark:text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mx-auto mt-2">
                    <div className="sm:mt-0" id="modal-headline">   
                      <div className="mx-auto">
                        <div className="mb-6">
                          <span className="font-bold md:text-lg text-sm">das121221asddsTransaction Details</span>
                        </div>
                        <div className="mb-6">
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Transaction ID</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">00123456</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Type</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">Business Permit</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Tax Declaration Number (TDN)</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">00123456789</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Property Identification Number (PIN)</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">0012345654321</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Date Processed</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">January 02, 2024</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Time Processed</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">07:31 PM</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Status</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1 text-xs py-0.5 font-semibold rounded-full bg-yellow-200 text-yellow-800 w-24">Pending</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Amount Paid</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">P 200.00</span>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#212121] px-4 pt-3 pb-5 gap-3 sm:px-6 flex items-center justify-between">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Sample_EPC_QR_code.png" alt="QR Code" className="w-20 h-20 mr-3"/>
                  <div className="flex items-center space-x-5 mt-auto">
                      <button
                          onClick={handleClose}
                          type="button"
                          className="text-slate-500 text-xs text-center px-5 py-2 mb-0 md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 font-normal rounded-sm dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500"
                      >
                          <p>Close</p>
                      </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
    )
  );
};

export default AdminBPView;
