import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment.js';
import StatusBadgeMobile from '../StatusBadgeMobile';

const TaxClearanceModal = ({ user_id, selectedTransaction, onClose, onSubmit }) => {

  const { transaction_id, status_type, date_processed } = selectedTransaction;

  const date = moment(date_processed).format('MMMM D, YYYY');
  const time = moment(date_processed).format('h:mm A');

  const [taxClearanceTransaction, setTaxClearanceTransaction] = useState({});


  const makePayment = async () => {
    try {
        if (!transaction_id) {
            console.error("Transaction ID is not defined.");
            alert("Error creating checkout session. Please try again later.");
            return;
        }

        const body = {
          data: taxClearanceTransaction,
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
    const fetchTaxClearanceTransaction = async () => {
      if (transaction_id) {
        try {
          const res = await axios.get(`http://localhost:8800/transachistory/taxclearance/${transaction_id}`);
          setTaxClearanceTransaction(res.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        setTaxClearanceTransaction(selectedTransaction)
      }
    };
    fetchTaxClearanceTransaction();
  }, [transaction_id]);
 
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
                              <span className="font-bold md:text-lg text-sm">Tax Clearance Transaction Details</span>
                            </div>
    
                            <div className="mb-6">
                              {transaction_id ? (
                                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Transaction ID</span>
                                  <span className="whitespace-nowrap md:mb-0 mb-1">{transaction_id}</span>
                                </div>
                              ) : null}
                              <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Tax Declaration Number (TDN)</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">{taxClearanceTransaction.rp_tdn || taxClearanceTransaction.tc_rp_tdn || '-'}</span>
                              </div>
                              <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Property Identification Number (PIN)</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">{taxClearanceTransaction.rp_pin || taxClearanceTransaction.tc_rp_pin || '-'}</span>
                              </div>
                              {/* <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Transaction Number</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">542312454</span>
                              </div> */}
                              {/* <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Valid ID to Present Upon Claiming</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">{taxClearanceTransaction.rp_tdn || taxClearanceTransaction.tp_rp_tdn || '-'}</span>
                              </div> */}
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
                                <span className="font-medium whitespace-nowrap">Period</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">-</span>
                              </div>
                              <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Remarks</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">WAITING FOR Clearance REFERENCE NUMBER</span>
                              </div> */}
                              {/* <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Reference Number</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">-</span>
                              </div> */}
                              {status_type ? (
                              <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Status</span>
                                <StatusBadgeMobile statusType={status_type} />
                              </div>
                              ) : null}
    
                              <hr className='mt-7 mb-1'/>
                              <div className="flex justify-between">
                                <span className="font-semibold whitespace-nowrap">Amount to Pay</span>
                                <span className="font-semibold whitespace-nowrap ml-4">P {taxClearanceTransaction.amount ? taxClearanceTransaction.amount + '.00': '-'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-[#212121] px-4 pt-3 pb-5 gap-3 sm:px-6 flex items-center justify-between">
                      {/* <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Sample_EPC_QR_code.png" alt="QR Code" className="w-20 h-20 mr-3"/> */}
                      
                      {status_type !== 'Paid' && (
                        <button
                          onClick={makePayment}
                          type="button"
                          className="text-slate-500 text-xs text-center px-5 py-2 mb-0 md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                        >
                          <span className="font-semibold whitespace-nowrap ml-2"> PAY: {taxClearanceTransaction.amount ? taxClearanceTransaction.amount + '.00' : '-'}</span>
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
                          
                          {transaction_id ? null : (
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

export default TaxClearanceModal;
