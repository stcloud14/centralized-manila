import React from 'react';
import StatusBadgeMobile from '../StatusBadgeMobile';

const BirthModal = ({ selectedTransaction, onClose }) => {
 
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
                          <span className="font-bold md:text-lg text-sm">Birth Certificate Transaction Details</span>
                          </div>
                        </div>
          
          
          
          <div className="max-h-[19.5rem] bg-white dark:bg-[#212121] text-slate-700 dark:text-white pb-0 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 overflow-y-auto">
            <div className="mx-auto">
                    <div className="sm:mt-0" id="modal-headline">   
                      <div className="mx-auto">
                        <div className="mb-0">
                        {selectedTransaction.transaction_id ? (
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Transaction ID</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.transaction_id}</span>
                          </div>
                        ) : null}

                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Document Owner's Last Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_lname ? selectedTransaction.birthc_lname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Document Owner's First Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_fname ? selectedTransaction.birthc_fname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Document Owner's Middle Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_mname ? selectedTransaction.birthc_mname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Document Owner's Suffix</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_suffix ? selectedTransaction.birthc_suffix : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Document Owner's Sex</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_sex ? selectedTransaction.birthc_sex : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Document Owner's Region</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_ownerregion ? selectedTransaction.birthc_ownerregion : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Document Owner's Province</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_ownerprovince ? selectedTransaction.birthc_ownerprovince : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Document Owner's Municipal</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_ownermunicipal ? selectedTransaction.birthc_ownermunicipal : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Document Owner's Date of Birth</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_date ? selectedTransaction.birthc_date : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Father's Last Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_fatherlname ? selectedTransaction.birthc_fatherlname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Father's First Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_fatherfname ? selectedTransaction.birthc_fatherfname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Father's Middle Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_fathermname ? selectedTransaction.birthc_fathermname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Father's Suffix</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_fathersuffix ? selectedTransaction.birthc_fathersuffix : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Mother's Last Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_motherlname ? selectedTransaction.birthc_motherlname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Mother's First Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_motherfname ? selectedTransaction.birthc_motherfname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Mother's Middle Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_mothermname ? selectedTransaction.birthc_mothermname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Mother's Suffix</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_mothersuffix ? selectedTransaction.birthc_mothersuffix : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor Last Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_reqlname ? selectedTransaction.birthc_reqlname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor First Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_reqfname ? selectedTransaction.birthc_reqfname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor Middle Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_reqmname ? selectedTransaction.birthc_reqmname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor Suffix</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_reqsuffix ? selectedTransaction.birthc_reqsuffix : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor's Relationship to the Owner</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_reqrelation ? selectedTransaction.birthc_reqrelation : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor's Tax Identification Number</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_reqtin ? selectedTransaction.birthc_reqtin : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Telephone No.</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_reqtelnum ? selectedTransaction.birthc_reqtelnum : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Mobile No.</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_reqmobnum ? selectedTransaction.birthc_reqmobnum : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Region</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_reqregion ? selectedTransaction.birthc_reqregion : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Province</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_reqprovince ? selectedTransaction.birthc_reqprovince : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Municipal</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_reqmunicipal ? selectedTransaction.birthc_reqmunicipal : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Barangay</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_reqbrgy ? selectedTransaction.birthc_reqbrgy : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">House No. / Unit Floor</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_reqhnum ? selectedTransaction.birthc_reqhnum : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Street / Building Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_reqstreet ? selectedTransaction.birthc_reqstreet : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Zip Code</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_reqzip ? selectedTransaction.birthc_reqzip : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Country</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_country ? selectedTransaction.birthc_country : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Birth Registry Number (BReN)</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_bren ? selectedTransaction.birthc_bren : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Hospital Name / Name of Midwife / Hilot</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_hospital ? selectedTransaction.birthc_hospital : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">No. of Copies</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_nocopies ? selectedTransaction.birthc_nocopies : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">What to Print</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_print ? selectedTransaction.birthc_print : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Purpose</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_purpose ? selectedTransaction.birthc_purpose : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Valid ID to Present Upon Claiming</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.birthc_validid ? selectedTransaction.birthc_validid : '-'}</span>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>

              <div className="mx-auto bg-white dark:bg-[#212121] text-slate-700 dark:text-white pb-4 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 lg:pr-10">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Date Processed</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.date}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Time Processed</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.time}</span>
                          </div>
                          {/* <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Remarks</span>
                            <span className="whitespace-nowrap ml-4">WAITING FOR PAYMENT REFERENCE NUMBER</span>
                          </div> */}
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Reference Number</span>
                            <span className="whitespace-nowrap ml-4">-</span>
                          </div>
                          {selectedTransaction.transaction_id ? (
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Status</span>
                            <StatusBadgeMobile statusType={selectedTransaction.status_type} />
                          </div>
                          ) : null}

                          <hr className='mt-7 mb-1'/>
                          <div className="flex justify-between">
                            <span className="font-semibold whitespace-nowrap">Amount to Pay</span>
                            <span className="font-semibold whitespace-nowrap ml-4"> P {selectedTransaction.birthc_amount}</span>
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
                          <p>Cancel</p>
                      </button>
                  </div>
              </div>

              </div>
            </div>
          </div>
  );
};

export default BirthModal;
