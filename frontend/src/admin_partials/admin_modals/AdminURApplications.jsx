import React from 'react';

const AdminURApplications = ({ selectedTransaction, isOpen, handleClose }) => { 

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
                          <span className="font-bold md:text-lg text-sm">User Information</span>
                        </div>
                        <div className="mb-6">
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Username</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.f_name} {selectedTransaction.m_name} {selectedTransaction.l_name}</span>
                          </div>
                          {selectedTransaction.suffix ?
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Suffix</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.suffix_type}</span>
                          </div>
                          : null}
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Sex</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.sex_type}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Civil Status</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.cvl_status}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Citizenship</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.czn_status}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Residency Status</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.res_status}</span>
                          </div>

                          {selectedTransaction.user_email ?
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Email</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.user_email}</span>
                          </div>
                          : null}
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Mobile No.</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.mobile_no}</span>
                          </div>
                          {selectedTransaction.tel_no ?
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Telephone No.</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.tel_no}</span>
                          </div>
                          : null}
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
                            <span className="font-medium whitespace-nowrap">House No. / Unit / Floor</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.house_floor}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Street / Building Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bldg_name}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Brgy. / Zone / District</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.brgy_dist}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Zip Code</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.zip_code}</span>
                          </div>

                          {selectedTransaction.user_tin_id ?
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Tax Identification Number (TIN)</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.user_tin_id}</span>
                          </div>
                          : null}
                          {selectedTransaction.user_pgb_id ?
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">PAG-IBIG Number (PIN)</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.user_pgb_id}</span>
                          </div>
                          : null}
                          {selectedTransaction.user_philh_id ?
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Philhealth Number</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.user_philh_id}</span>
                          </div>
                          : null}
                          {selectedTransaction.user_sss_id ?
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">UMID/SSS Number</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.user_sss_id}</span>
                          </div>
                          : null}
                          {selectedTransaction.user_gsis_id ?
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">GSIS Number</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.user_gsis_id}</span>
                          </div>
                          : null}
                          {selectedTransaction.user_natl_id ?
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">National ID</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.user_natl_id}</span>
                          </div>
                          : null}


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

export default AdminURApplications;
