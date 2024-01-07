import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment.js';
import StatusBadgeMobile from '../StatusBadgeMobile';

const MarriageModal = ({ user_id, selectedTransaction, onClose, onSubmit }) => {  

  const { transaction_id, status_type, date_processed } = selectedTransaction;

  const date = moment(date_processed).format('MMMM D, YYYY');
  const time = moment(date_processed).format('h:mm A');

  const [marriageTransaction, setMarriageTransaction] = useState({});

  const makePayment = async () => {
    try {
        if (!transaction_id) {
            console.error("Transaction ID is not defined.");
            alert("Error creating checkout session. Please try again later.");
            return;
        }

        const body = {
          data: marriageTransaction,
          user_id: user_id,
      };

        const response = await axios.post(`http://localhost:8800/payment/create-checkout-birthcert/${transaction_id}`, body);

        if (response.data && response.data.checkoutSessionUrl) {
            const checkoutSessionUrl = response.data.checkoutSessionUrl;

            if (checkoutSessionUrl) {
                console.log('Checkout Session URL:', checkoutSessionUrl);

                // Open a new window or tab with the checkout session URL
                const newWindow = window.open(checkoutSessionUrl, '_self');
                
            }
        } else {
            console.error("Invalid checkout session - Response structure is unexpected:", response);
            alert("Error creating checkout session. Please try again later.");
        }
    } catch (error) {
        console.error("Error creating checkout session:", error);
        alert("Error creating checkout session. Please try again later.");
    }
};

  useEffect(() => {
    const fetchMarriageTransaction = async () => {
      if (transaction_id) {
      try {
        const res = await axios.get(`http://localhost:8800/transachistory/marriagecert/${transaction_id}`);
        setMarriageTransaction(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }} else {
        setMarriageTransaction(selectedTransaction);
      }
    };
    fetchMarriageTransaction();
  }, [transaction_id]);

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
                        <div className="mb-0">
                          {marriageTransaction.transaction_id ? (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Transaction ID</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.transaction_id}</span>
                          </div>
                        ) : null}
                        <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                            <span className="font-semibold whitespace-nowrap">Husband's Personal Information</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Husband's Last Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_hlname || marriageTransaction.husband_lname || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Husband's First Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_hfname || marriageTransaction.husband_fname || '-'}</span>
                          </div>
                          {marriageTransaction.marriagec_hmname ? (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Husband's Middle Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_hmname || marriageTransaction.husband_mname || '-'}</span>
                          </div>
                          ) : null}
                          {marriageTransaction.marriagec_hsuffix ? (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Husband's Suffix</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_hsuffix || marriageTransaction.husband_suffix|| '-'}</span>
                          </div>
                          ) : null}
                          
                          <br/>

                          <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                            <span className="font-semibold whitespace-nowrap">Wife's Personal Information</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Wife's Last Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_wlname || marriageTransaction.wife_lname || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Wife's First Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_wfname || marriageTransaction.wife_fname || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Wife's Middle Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_wmname || marriageTransaction.wife_mname || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Wife's Suffix</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_wsuffix || marriageTransaction.wife_suffix || '-'}</span>
                          </div>
                                                    
                          <br/>

                          <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                            <span className="font-semibold whitespace-nowrap">Place of Marriage Information</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Region of Marriage</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_regionLabel || marriageTransaction.region || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Province of Marriage</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_provinceLabel || marriageTransaction.province || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Municipal of Marriage</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_municipalLabel || marriageTransaction.city || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Date of Marriage</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_date || marriageTransaction.marriage_date || '-'}</span>
                          </div>
                                                                              
                          <br/>

                          <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                            <span className="font-semibold whitespace-nowrap">Requestor's Personal Information</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor's Last Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_reqlname || marriageTransaction.reql_name || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor's First Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_reqfname || marriageTransaction.reqf_name || '-'}</span>
                          </div>
                          {marriageTransaction.marriagec_reqmname ? (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor's Middle Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_reqmname || marriageTransaction.reqm_name || '-'}</span>
                          </div>
                          ) : null}
                          {marriageTransaction.marriagec_reqsuffix ? (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor's Suffix</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_reqsuffix || marriageTransaction.reqsuffix || '-'}</span>
                          </div>
                          ) : null}
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Requestor's Relationship to the Owner</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_reqrelation || marriageTransaction.owner_rel || '-'}</span>
                          </div>
                          {marriageTransaction.marriagec_telno ? (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Telephone No.</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_telno || marriageTransaction.tel_no || '-'}</span>
                          </div>
                          ) : null}
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Mobile No.</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_mobileno || marriageTransaction.mobile_no || '-'}</span>
                          </div>
                                                                                                        
                          <br/>

                          <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                            <span className="font-semibold whitespace-nowrap">Requestor's Address</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Region</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_reqregionLabel || marriageTransaction.reqregion || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Province</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_reqprovinceLabel || marriageTransaction.reqprovince || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Municipal</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_reqmunicipalLabel || marriageTransaction.reqcity || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Barangay</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_reqbrgy || marriageTransaction.brgy_dist || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">House No. / Unit Floor</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_reqhnum || marriageTransaction.house_floor || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Street / Building Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_reqstreet || marriageTransaction.bldg_name || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Zip Code</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_reqzip || marriageTransaction.zip_code || '-'}</span>
                          </div>

                          <br/>

                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">No. of Copies</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_nocopies || marriageTransaction.copies || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">What to Print</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_print || marriageTransaction.print_type || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Purpose</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_purposeLabel || marriageTransaction.purpose_type || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Valid ID to Present Upon Claiming</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{marriageTransaction.marriagec_valididLabel || marriageTransaction.valid_id_type || '-'}</span>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mx-auto pb-4 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 lg:pr-10 ">
                {transaction_id ? (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Date Processed</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{date}</span>
                          </div>
                          ) : null}
                          {transaction_id ? (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Time Processed</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{time}</span>
                          </div>
                          ) : null}
                          {/* <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Remarks</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">WAITING FOR PAYMENT REFERENCE NUMBER</span>
                          </div> */}
                          {/* <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Reference Number</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">-</span>
                          </div> */}
                          {transaction_id ? (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Status</span>
                            <StatusBadgeMobile statusType={status_type} />
                          </div>
                          ) : null}

                          <hr className='mt-7 mb-1'/>
                          <div className="flex justify-between">
                            <span className="font-semibold whitespace-nowrap">Amount to Pay</span>
                            <span className="font-semibold whitespace-nowrap ml-4"> 
                            {marriageTransaction && (
                              `P ${marriageTransaction.marriagec_amount !== undefined ? marriageTransaction.marriagec_amount + '.00' : 
                            marriageTransaction.amount !== undefined ? marriageTransaction.amount + '.00' : '-'}`
                            )}
                            </span>
                          </div>
                        </div>

                <div className="bg-white dark:bg-[#212121] mr-0 md:mr-2 px-4 pt-3 pb-5 gap-3 sm:px-6 flex items-center justify-between">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Sample_EPC_QR_code.png" alt="QR Code" className="w-20 h-20 mr-3"/>
                  
                  {status_type !== 'Paid' && (
                    <button
                      onClick={makePayment}
                      type="button"
                      className="text-slate-500 text-xs text-center px-5 py-2 mb-0 md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                    >
                      <span className="font-semibold whitespace-nowrap ml-2"> PAY: {marriageTransaction.amount ? marriageTransaction.amount + '.00' : '-'}</span>
                    </button>
                  )}
                  
                  <div className="flex items-center space-x-2 mt-auto">
                      <button
                          onClick={onClose}
                          type="button"
                          className="text-slate-500 text-xs text-center px-5 py-2 mb-0 md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                      >
                          <p>Close</p>
                      </button>
                      {marriageTransaction.transaction_id ? null : (
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
