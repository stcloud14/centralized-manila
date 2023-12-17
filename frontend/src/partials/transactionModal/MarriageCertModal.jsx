import React from 'react';
import StatusBadgeMobile from '../StatusBadgeMobile';

const MarriageModal = ({ selectedTransaction, onClose, onSubmit }) => {  
  console.log(selectedTransaction)
  return (
    <div className="fixed z-50 inset-0 ">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center text-xs md:text-sm sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white dark:bg-[#212121] text-slate-700 dark:text-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full max-w-2xl">
          <div className="px-4 pt-5 pb-0 sm:p-6 sm:pb-0 overflow-y-auto">
                          <div className="mb-6">
                          <span className="font-bold md:text-lg text-sm">Marriage Certificate Transaction Details</span>
                          </div>
                        </div>
          
          
          
          <div className="max-h-[19.5rem] pb-0 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 overflow-y-auto">
            <div className="mx-auto">
                    <div className="sm:mt-0" id="modal-headline">   
                      <div className="mx-auto">
                        <div className="mb-0">{selectedTransaction.transaction_id ? (
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Transaction ID</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.transaction_id}</span>
                          </div>
                        ) : null}
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Husband's Last Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_hlname ? selectedTransaction.marriagec_hlname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Husband's First Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_hfname ? selectedTransaction.marriagec_hfname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Husband's Middle Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_hmname ? selectedTransaction.marriagec_hmname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Husband's Suffix</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_hsuffix ? selectedTransaction.marriagec_hsuffix : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Wife's Last Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_wlname ? selectedTransaction.marriagec_wlname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Wife's First Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_wfname ? selectedTransaction.marriagec_wfname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Wife's Middle Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_wmname ? selectedTransaction.marriagec_wmname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Wife's Suffix</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_wsuffix ? selectedTransaction.marriagec_wsuffix : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Region of Marriage</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_region ? selectedTransaction.marriagec_region : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Province of Marriage</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_province ? selectedTransaction.marriagec_province : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Municipal of Marriage</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_municipal ? selectedTransaction.marriagec_municipal : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Date of Marriage</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_date ? selectedTransaction.marriagec_date : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor's Last Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_reqlname ? selectedTransaction.marriagec_reqlname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor's First Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_reqfname ? selectedTransaction.marriagec_reqfname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor's Middle Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_reqmname ? selectedTransaction.marriagec_reqmname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor's Suffix</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_reqsuffix ? selectedTransaction.marriagec_reqsuffix : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor's Relationship to the Owner</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_reqrelation ? selectedTransaction.marriagec_reqrelation : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Telephone No.</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_telno ? selectedTransaction.marriagec_telno : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Mobile No.</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_mobileno ? selectedTransaction.marriagec_mobileno : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Region</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_reqregion ? selectedTransaction.marriagec_reqregion : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Province</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_reqprovince ? selectedTransaction.marriagec_reqprovince : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Municipal</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_reqmunicipal ? selectedTransaction.marriagec_reqmunicipal : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Barangay</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_reqbrgy ? selectedTransaction.marriagec_reqbrgy : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">House No. / Unit Floor</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_reqhnum ? selectedTransaction.marriagec_reqhnum : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Street / Building Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_reqstreet ? selectedTransaction.marriagec_reqstreet : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Zip Code</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_reqzip ? selectedTransaction.marriagec_reqzip : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">No. of Copies</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_nocopies ? selectedTransaction.marriagec_nocopies : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">What to Print</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_print ? selectedTransaction.marriagec_print : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Purpose</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_purpose ? selectedTransaction.marriagec_purpose : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Valid ID to Present Upon Claiming</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.marriagec_validid ? selectedTransaction.marriagec_validid : '-'}</span>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mx-auto pb-4 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 lg:pr-10 ">
                {selectedTransaction.date ? (
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Date Processed</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.date}</span>
                          </div>
                          ) : null}
                          {selectedTransaction.time ? (
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Time Processed</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.time}</span>
                          </div>
                          ) : null}
                          {/* <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Remarks</span>
                            <span className="whitespace-nowrap ml-4">WAITING FOR PAYMENT REFERENCE NUMBER</span>
                          </div> */}
                          {/* <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Reference Number</span>
                            <span className="whitespace-nowrap ml-4">-</span>
                          </div> */}
                          {selectedTransaction.transaction_id ? (
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Status</span>
                            <StatusBadgeMobile statusType={selectedTransaction.status_type} />
                          </div>
                          ) : null}

                          <hr className='mt-7 mb-1'/>
                          <div className="flex justify-between">
                            <span className="font-semibold whitespace-nowrap">Amount to Pay</span>
                            <span className="font-semibold whitespace-nowrap ml-4"> P {`${selectedTransaction.marriagec_amount ? selectedTransaction.marriagec_amount + '.00' : selectedTransaction.amount || '-'}`}</span>
                          </div>
                        </div>

                <div className="bg-white dark:bg-[#212121] mr-0 md:mr-2 px-4 pt-3 pb-5 gap-3 sm:px-6 flex items-center justify-between">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Sample_EPC_QR_code.png" alt="QR Code" className="w-20 h-20 mr-3"/>
                  <div className="flex items-center space-x-2 mt-auto">
                      <button
                          onClick={onClose}
                          type="button"
                          className="text-slate-500 text-xs text-center px-5 py-2 mb-0 md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                      >
                          <p>Close</p>
                      </button>
                      {selectedTransaction.transaction_id ? null : (
                      <button
                          onClick={onSubmit}
                          type="button"
                          className="text-white text-xs md:text-sm bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                          <p>Submit</p>
                    </button>
                    )}
                  </div>
              </div>

              </div>
            </div>
          </div>
  );
};

export default MarriageModal;
