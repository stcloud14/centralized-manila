import React from 'react';
import moment from 'moment/moment.js';


const AdminLCRBirthView = ({ selectedTransaction, isOpen, handleClose, transType }) => {

  // Check if selectedTransaction is defined
  if (!selectedTransaction) {
    return <div></div>;
  }

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
                  <span className="font-bold md:text-lg text-sm">Birth Transaction Details</span>
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
               
                <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                    <span className="font-semibold whitespace-nowrap">Document Owner's Personal Information</span>
                  </div>
                  {transType === 'Birth Certificate' ? 
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Owner's Last Name</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.l_name}</span>
                  </div>
                  : null} 
                  {transType === 'Birth Certificate' ? 
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Owner's First Name</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.f_name}</span>
                  </div>
                  : null} 
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Owner's Middle Name</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.m_name}</span>
                  </div>
                  
                  
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Owner's Suffix</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.suffix_type}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Owner's Sex</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.sex_type}</span>
                  </div>

                  <br/>

                  <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                    <span className="font-semibold whitespace-nowrap">Document Owner's Place of Birth</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Owner's Region</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.region}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Owner's Province</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.province}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Owner's Municipal</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.municipal}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Owner's Date of Birth</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.birth_date}</span>
                  </div>
                  
                  <br/>
                  
                  <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                    <span className="font-semibold whitespace-nowrap">Father's Name of Document Owner</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Father's Last Name</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.father_lname}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Father's First Name</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.father_fname}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Father's Middle Name</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.father_mname}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Father's Suffix</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.fathersuffix}</span>
                  </div>

                  <br/>
                  
                  <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                    <span className="font-semibold whitespace-nowrap">Mother's Name of Document Owner</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Mother's Last Name</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.mother_lname}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Mother's First Name</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.mother_fname}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Mother's Middle Name</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.mother_mname}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Mother's Suffix</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.mothersuffix}</span>
                  </div>
                  
                  <br/>
                  
                  <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                    <span className="font-semibold whitespace-nowrap">Requestor's Personal Information</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Requestor's Last Name</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.reql_name}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Requestor's First Name</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.reqf_name}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Requestor's Middle Name</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{ selectedTransaction.reqm_name}</span>
                  </div>
                  
                  
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Requestor's Suffix</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.reqsuffix}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Relationship to the Owner</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.owner_relation}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Tax Identification Number</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.requestor_tin}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Telephone No.</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.tel_no}</span>
                  </div>
                 
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Mobile No.</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.mobile_no}</span>
                  </div>
                                            
                  <br/>
                  
                  <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                    <span className="font-semibold whitespace-nowrap">Requestor's Address</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Region</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.reqregion}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Province</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.reqprovince}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Municipal</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.reqcity}</span>
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

                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Country</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.country}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Birth Registry Number (BReN)</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.birth_reg_no}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Hospital Name / Name of Midwife / Hilot</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.hospital_name}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">No. of Copies</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.copies}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">What to Print</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.print_type}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Purpose</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.purpose_type}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">
                        ID to Present Upon Claiming</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.valid_id_type}</span>
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

                          {transType === 'Birth Certificate' ? 
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Status</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1 text-xs py-0.5 font-semibold rounded-full bg-emerald-200 text-emerald-800 w-24">{selectedTransaction.status_type}</span>
                          </div>
                          :null }
                          

                          <hr className='mt-7 mb-1'/>
                          {transType === 'Birth Certificate' ? 
                          <div className="flex justify-between">
                          <span className="font-semibold whitespace-nowrap">{status_type === "Paid" ? "Amount Paid" : "Amount to Pay"}</span>
                            <span className="font-semibold whitespace-nowrap ml-4">P {selectedTransaction.amount}</span>
                          </div>
                          :null }
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

export default AdminLCRBirthView;
