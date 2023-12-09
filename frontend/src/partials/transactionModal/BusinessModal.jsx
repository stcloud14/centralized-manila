import React from 'react';
import StatusBadgeMobile from '../StatusBadgeMobile';

const BusinessModal = ({ selectedTransaction }) => {
 
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
                          <span className="font-bold md:text-lg text-sm">Business Permit Transaction Details</span>
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
                            <span className="font-medium whitespace-nowrap">Business Type</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_type ? selectedTransaction.bp_type : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Business Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_name ? selectedTransaction.bp_name : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Trade Name / Franchise</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_trdmrk ? selectedTransaction.bp_trdmrk : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">DTI / SEC / CDA Registration No.</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_regnum ? selectedTransaction.bp_regnum : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Tax Identification Number</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_tin ? selectedTransaction.bp_tin : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Last Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_lname ? selectedTransaction.bp_lname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">First Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_fname ? selectedTransaction.bp_fname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Middle Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_mname ? selectedTransaction.bp_mname : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Suffix</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_suffix ? selectedTransaction.bp_suffix : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Sex</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_sex ? selectedTransaction.bp_sex : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Email Address</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_email ? selectedTransaction.bp_email : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Telephone Number</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_telnum ? selectedTransaction.bp_telnum : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Mobile Number</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_mobnum ? selectedTransaction.bp_mobnum : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Business Region</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_region ? selectedTransaction.bp_region : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Business Province</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_province ? selectedTransaction.bp_province : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Business Municipal</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_municipal ? selectedTransaction.bp_municipal : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Business Barangay</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_brgy ? selectedTransaction.bp_brgy : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Business House No. / Unit Floor</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_hnum ? selectedTransaction.bp_hnum : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Business Street / Building Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_street ? selectedTransaction.bp_street : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Business Zip Code</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_zip ? selectedTransaction.bp_zip : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Business Area / Total Floor Area (sq.m)</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_area ? selectedTransaction.bp_area : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">No. of Employees Residing Within Manila</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_empnum ? selectedTransaction.bp_empnum : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Total No. of Male Employees</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_empmale ? selectedTransaction.bp_empmale : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Total No. of Female Employees</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_empfemale ? selectedTransaction.bp_empfemale : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">No. of Van Delivery Vehicles</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_van ? selectedTransaction.bp_van : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">No. of Truck Delivery Vehicles</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_truck ? selectedTransaction.bp_truck : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">No. of Motorcycle Delivery Vehicles</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_motor ? selectedTransaction.bp_motor : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Taxpayer's Region</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_taxregion ? selectedTransaction.bp_taxregion : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Taxpayer's Province</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_taxprovince ? selectedTransaction.bp_taxprovince : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Taxpayer's Municipal</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_taxmunicipal ? selectedTransaction.bp_taxmunicipal : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Taxpayer's Barangay</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_taxbrgy ? selectedTransaction.bp_taxbrgy : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Taxpayer's House No. / Unit Floor</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_taxhnum ? selectedTransaction.bp_taxhnum : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Taxpayer's Street / Building Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_taxstreet ? selectedTransaction.bp_taxstreet : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Taxpayer's Zip Code</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_taxzip ? selectedTransaction.bp_taxzip : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Owned</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.owned ? selectedTransaction.owned : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Lessor Name</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_lessor ? selectedTransaction.bp_lessor : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Monthly Rental</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.bp_mrental ? selectedTransaction.bp_mrental : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Tax Incentives from any Government Entity</span>
                            <span className="whitespace-nowrap ml-4">{selectedTransaction.satisfaction ? selectedTransaction.satisfaction : '-'}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">DTI Registration</span>
                            <span className="whitespace-nowrap ml-4"></span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Paid-up and Subscribed Page</span>
                            <span className="whitespace-nowrap ml-4"></span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Articles of Primary and Secondary Purpose</span>
                            <span className="whitespace-nowrap ml-4"></span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">NGA-Contract of Lease</span>
                            <span className="whitespace-nowrap ml-4"></span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">SEC Registration</span>
                            <span className="whitespace-nowrap ml-4"></span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">R.P. Tax Declaration for Building</span>
                            <span className="whitespace-nowrap ml-4"></span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Fire Safety Inspection Certificate</span>
                            <span className="whitespace-nowrap ml-4"></span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Page 2 Document</span>
                            <span className="whitespace-nowrap ml-4"></span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Page 3 Document</span>
                            <span className="whitespace-nowrap ml-4"></span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Page 4 Document</span>
                            <span className="whitespace-nowrap ml-4"></span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Page 5 Document</span>
                            <span className="whitespace-nowrap ml-4"></span>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>

              <div className="mx-auto bg-white dark:bg-[#212121] text-slate-700 dark:text-white pb-4 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 lg:pr-10 ">
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
                          {selectedTransaction.time ? (
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Reference Number</span>
                            <span className="whitespace-nowrap ml-4">-</span>
                          </div>
                          ) : null}
                          {selectedTransaction.status_type ? (
                          <div className="flex justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Status</span>
                            <StatusBadgeMobile statusType={selectedTransaction.status_type} />
                          </div>
                          ) : null}

                          <hr className='mt-7 mb-1'/>
                          <div className="flex justify-between">
                            <span className="font-semibold whitespace-nowrap">Amount to Pay</span>
                            <span className="font-semibold whitespace-nowrap ml-4"> P {selectedTransaction.bp_amount}</span>
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

export default BusinessModal;
