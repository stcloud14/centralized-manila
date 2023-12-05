import React from 'react';

const TaxClearanceModal = ({ selectedTransaction, onClose }) => {
 
    return (
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
                                <span className="whitespace-nowrap ml-4">{selectedTransaction.transaction_id}</span>
                              </div>
                              {/* <div className="flex justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Tax Identification Number (TDN)</span>
                                <span className="whitespace-nowrap ml-4">{selectedTransaction.rp_tdn}</span>
                              </div> */}
                              {/* <div className="flex justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Property Identification Number (PIN)</span>
                                <span className="whitespace-nowrap ml-4">119-7-584-328-009</span>
                              </div>
                              <div className="flex justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Transaction Number</span>
                                <span className="whitespace-nowrap ml-4">542312454</span>
                              </div> */}
                              <div className="flex justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Date</span>
                                <span className="whitespace-nowrap ml-4">{selectedTransaction.date}</span>
                              </div>
                              <div className="flex justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Time</span>
                                <span className="whitespace-nowrap ml-4">{selectedTransaction.time}</span>
                              </div>
                              <div className="flex justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Transaction Type</span>
                                <span className="whitespace-nowrap ml-4">{selectedTransaction.trans_type}</span>
                              </div>
                              {/* <div className="flex justify-between mb-1">
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
                              </div> */}
                              {/* <div className="flex justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Reference Number</span>
                                <span className="whitespace-nowrap ml-4">-</span>
                              </div> */}
                              <div className="flex justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Status</span>
                                <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">{selectedTransaction.status_type}</span>
                              </div>
    
                              <hr className='mt-7 mb-1'/>
                              <div className="flex justify-between">
                                <span className="font-semibold whitespace-nowrap">Amount to Pay</span>
                                <span className="font-semibold whitespace-nowrap ml-4">{selectedTransaction.amount}</span>
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
                              onClick={onClose}
                              type="button"
                              className="text-slate-500 text-xs text-center px-5 py-2 mb-0 md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                          >
                              <p>Cancel</p>
                          </button>
                      </div>
                  </div>
    
                  </div>
                </div>
              </div>
      );
};

export default TaxClearanceModal;
