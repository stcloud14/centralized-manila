import React, { useState, useEffect } from 'react';
import moment from 'moment/moment.js';

const AdminCTCView = ({ selectedTransaction, isOpen, handleClose }) => {

  const { transaction_id, status_type } = selectedTransaction;
  

  console.log(selectedTransaction)


  return (
    isOpen && (
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
                          <span className="font-bold md:text-lg text-sm">Cedula Transaction Details</span>
                          </div>
                        </div>
          <div className="max-h-[19.5rem] pb-0 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 overflow-y-auto">
            <div className="mx-auto">
                    <div className="sm:mt-0" id="modal-headline">   
                      <div className="mx-auto">
                        <div className="mb-0">
                        
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Transaction ID</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{transaction_id}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Type</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{status_type}</span>
                          </div>
                       
                        <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                            <span className="font-semibold whitespace-nowrap">Owner's Information</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Last Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.l_name}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">First Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.f_name}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Middle Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.m_name}</span>
                          </div>

                          {selectedTransaction.suffix_type && (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Suffix</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.suffix_type}</span>
                          </div>
                           )}

                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Sex</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.sex_type}</span>
                          </div>

                          <br/>

                          <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                            <span className="font-semibold whitespace-nowrap">Address</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Region</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.region_name}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Province</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.prov_name}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Municipal</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.city_name}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Barangay</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.brgy_dist}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">House No. / Unit Floor</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.house_floor}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Street / Building Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bldg_name}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Zip Code</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.zip_code}</span>
                          </div>

                          <br/>

                          <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                            <span className="font-semibold whitespace-nowrap">Other Information</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Civil Status</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.cvl_status}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Country of Citizenship</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.czn_id}</span>
                          </div>

                          {selectedTransaction.height && (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Height (cm)</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.height}</span>
                          </div>
                        )}

                          {selectedTransaction.weight && (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Weight (kg)</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.weight}</span>
                          </div>
                        )}

                          {selectedTransaction.acr_no && (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Alien Certificate of Registration No.</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.acr_no}</span>
                          </div>
                           )}

                          <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                            <br/>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Employment Status</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.emp_status}</span>
                          </div>

                          {selectedTransaction.acc_no && (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Tax Payer Account No.</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.acc_no}</span>
                          </div>
                        )}
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Residence Tax Due</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">    {moment(selectedTransaction.cedula_date).format('MMMM DD, YYYY')}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Valid ID to Present Upon Claiming</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.valid_id_type}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Profession/Occupation/Business</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.pob_status}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Income from Real Property</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.income_id}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Earnings from Business</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.gross_id}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Earnings from Profession</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.salary_id}</span>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>

              <div className="mx-auto bg-white dark:bg-[#212121] text-slate-700 dark:text-white pb-4 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 lg:pr-10 ">
                          
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Date Processed</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.date}</span>
                          </div>
                         

                          
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Time Processed</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.time}</span>
                          </div>

                          
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Status</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1 text-xs py-0.5 font-semibold rounded-full bg-emerald-200 text-emerald-800 w-24">{selectedTransaction.status_type}</span>
                          </div>
                          

                          <hr className='mt-7 mb-1'/>
                          <div className="flex justify-between">
                          <span className="font-semibold whitespace-nowrap">{status_type === "Paid" ? "Amount Paid" : "Amount to Pay"}</span>
                            <span className="font-semibold whitespace-nowrap ml-4">P {selectedTransaction.amount + '.00' }</span>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-[#212121] px-4 pt-3 pb-5 gap-3 sm:px-6 flex items-center justify-end">
                  {/* <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Sample_EPC_QR_code.png" alt="QR Code" className="w-20 h-20 mr-3"/>
                   */}
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

export default AdminCTCView;
