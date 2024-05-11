import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment.js';
import QRCode from 'react-qr-code';
import StatusBadgeModal from '../StatusBadgeModal';
import CancelTransactionModal from '../CancelTransactionModal';
import Loading from '../../partials/Loading';

const DeathModal = ({ user_id, selectedTransaction, onClose, onSubmit, handleOpenModal }) => {

  const { transaction_id, status_type, date_processed } = selectedTransaction;

  const trans_type = 'Death Certificate';

  const date = moment(date_processed).format('MMMM D, YYYY');
  const time = moment(date_processed).format('h:mm A');
  
  const [deathTransaction, setDeathTransaction] = useState({});
  const [isScanned, setIsScanned] = useState(true);

  const [isCancelConfirmed, setIsCancelConfirmed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  
  const [isloading, setIsLoading] = useState(false)

  const submitHandler = async (e) => {
    try {

      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 5000); 

      await onSubmit(e);

      onClose();
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false); 
    }
  };

  const makePayment = async () => {
    try {
        if (!transaction_id) {
            console.error("Transaction ID is not defined.");
            alert("Error creating checkout session. Please try again later.");
            return;
        }

        const body = {
          data: deathTransaction,
          trans_type: trans_type,
          user_id: user_id,
      };

        const response = await axios.post(`http://localhost:8800/payment/create-checkout-session/${transaction_id}`, body);

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


const cancelTrans = async (e) => {
  e.preventDefault();

  try {

    const response = await axios.post(`http://localhost:8800/transachistory/canceltrans/${transaction_id}`, selectedTransaction);

    if (response.status === 200) {
      // Fetch user_email after successful payment
      try {
        const res = await axios.get(`http://localhost:8800/email/${user_id}`);
        
        if (res.data.user_email) {
          const updatedUserEmail = res.data.user_email;
          const f_name = res.data.f_name;
          const l_name = res.data.l_name;
          console.log('FETCHED USER EMAIL:', updatedUserEmail);

          const user_email = updatedUserEmail;

          const trans_type = 'Real Property Tax Payment';

          const rowData = { ...selectedTransaction, trans_type};

          const status_type = 'C A N C E L E D';

          const body = {
            data: rowData,
            status_type: status_type,
            f_name: f_name,
            l_name: l_name
          };

          try {
            const emailResponse = await axios.post(`http://localhost:8800/email/send-email/${user_email}`, body);

            if (emailResponse.data && emailResponse.data.message) {
              console.log('SENT EMAIL');
            } else {
              console.log("Failed to send email.");
            }
          } catch (emailError) {
            // alert(emailError);
          }
        } else {
          console.error('Transaction error:', res.statusText);
        }
      } catch (fetchError) {
        console.log('NOT FETCHING EMAIL');
        console.error(fetchError);
      }

        setIsCancelConfirmed(false);
        setIsSuccess(true);
        console.log('Transaction canceled');
  
        setTimeout(() => {
          setIsSuccess(false);
          // onClose();
          window.location.href = `http://localhost:5173/transachistory/${user_id}`;
        }, 1000);
        
      } else {
        console.error('Transaction error:', response.statusText);
      }
    } catch (transactionError) {
      console.error('Transaction error:', transactionError);
    }
  };

  useEffect(() => {
    const fetchDeathTransaction = async () => {
      if (transaction_id) {
      try {
        const res = await axios.get(`http://localhost:8800/transachistory/deathcert/${transaction_id}`);
        setDeathTransaction(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }} else {
        setDeathTransaction(selectedTransaction);
      }
    };
    fetchDeathTransaction();
  }, [transaction_id]);
  
 
  const handleOpenConfirm = () => {
    setIsCancelConfirmed(true);
  };

  const handleCloseConfirm = () => {
    setIsCancelConfirmed(false);
  };

  
  // QR Download 
  const generateDownloadLink = (data) => {
    console.log('Generating download link:', data.transaction_id);
    return `http://localhost:8800/transachistory/deathcert/${data.transaction_id}/download`;
};

  const downloadLink = isScanned ? generateDownloadLink(deathTransaction) : null;
  console.log('Download link:', downloadLink);

  const handleDownload = async () => {
      try {
          const pdfRes = await axios.get(downloadLink, { responseType: 'blob' });
          const pdfBlob = new Blob([pdfRes.data], { type: 'application/pdf' });
          const pdfUrl = URL.createObjectURL(pdfBlob);

          // Open the PDF in a new window
          window.open(pdfUrl, '_blank');
      } catch (err) {
          console.error(err);
      }
  };
 

  return (
    <div className="fixed z-50 inset-0 ">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center text-xs md:text-sm sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom text-center overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:w-full max-w-2xl">
          {transaction_id ? (
          status_type === 'Pending' && (
            <div className='bg-white dark:bg-[#212121] mb-5 p-5 rounded-lg'>
              <div className="grid md:grid-cols-4 grid-cols-2 gap-3 items-center justify-center text-xs w-full">
                <div className="flex flex-col items-center text-center">
                  <span>Step 1</span>
                  <span>Fill the Form</span>
                  <div className="w-full h-1 bg-blue-200 dark:bg-slate-400" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <span>Step 2</span>
                  <span>Review and Submit</span>
                  <div className="w-full h-1 bg-blue-200 dark:bg-slate-400" />
                </div>
                <div className="flex flex-col col-span-2 items-center text-center mt-2 sm:mt-0">
                  <span className='font-semibold text-blue-500'>Final Step</span>
                  <span className='font-normal text-blue-500'>Pay the transaction</span>
                  <div className="w-full h-1 bg-blue-500" />
                </div>
              </div>
            </div> ) 
            ) : (
            <div className='bg-white dark:bg-[#212121] mb-5 p-5 rounded-lg'>
              <div className="grid md:grid-cols-4 grid-cols-2 gap-3 items-center justify-center text-xs w-full">
                <div className="flex flex-col items-center text-center">
                  <span>Step 1</span>
                  <span>Fill the Form</span>
                  <div className="w-full h-1 bg-blue-200 dark:bg-slate-400" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className='font-semibold text-blue-500'>Step 2</span>
                  <span className='font-normal text-blue-500'>Review and Submit</span>
                  <div className="w-full h-1 bg-blue-500" />
                </div>
                <div className="flex flex-col col-span-2 items-center text-center mt-2 sm:mt-0">
                  <span>Final Step</span>
                  <span>Pay the transaction</span>
                  <div className="w-full h-1 bg-blue-200 dark:bg-slate-400" />
                </div>
              </div>
            </div>
          )}   
                        
          <div className="bg-white dark:bg-[#212121] text-slate-700 dark:text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-t-lg">
            <div className="md:mb-6">
            <span className="font-bold md:text-lg text-sm">Death Certificate Transaction Details</span>
            </div>
          </div>
          
          <div className="md:max-h-[11.5rem] max-h-[5.5rem] bg-white dark:bg-[#212121] text-slate-700 dark:text-white pb-0 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 overflow-y-auto">
            <div className="mx-auto">
              <div className="sm:mt-0" id="modal-headline">   
              {isSuccess && (                
                <div className="mb-5 text-center">
                  <div className='text-emerald-500 bg-emerald-100 md:text-sm text-xs text-center rounded-full py-1.5'>Transaction Canceled!</div> 
                </div>
              )}
                <div className="mx-auto">
                  <div className="mb-0">
                  {deathTransaction.transaction_id ? (
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Transaction ID</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.transaction_id}</span>
                    </div>
                  ) : null}
                  <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Document Owner's Personal Information</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Owner's Last Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_lname || deathTransaction.l_name || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Owner's First Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_fname || deathTransaction.f_name || '-'}</span>
                    </div>
                    {deathTransaction.m_name ? (
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Owner's Middle Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_mname || deathTransaction.m_name || '-'}</span>
                    </div>
                    ) : null}
                    {deathTransaction.suffix_type ? (
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Owner's Suffix</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_suffix || deathTransaction.suffix_type || '-'}</span>
                    </div>
                    ) : null}
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Owner's Sex</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_sexLabel || deathTransaction.sex_type || '-'}</span>
                    </div>
                    
                    <br/>

                    <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Place of Death Information</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Region of Death</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_regionLabel || deathTransaction.region || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Province of Death</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_provinceLabel || deathTransaction.province || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Municipal of Death</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_municipalLabel || deathTransaction.city || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Date of Death</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_date || deathTransaction.death_date || '-'}</span>
                    </div>
                                              
                    <br/>

                    <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Requestor's Personal Information</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Requestor's Last Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_reqlname || deathTransaction.reql_name || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Requestor's First Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_reqfname || deathTransaction.reqf_name || '-'}</span>
                    </div>
                    {deathTransaction.reqm_name ? (
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Requestor's Middle Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_reqmname || deathTransaction.reqm_name || '-'}</span>
                    </div>
                    ) : null}
                    {deathTransaction.reqsuffix ? (
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Requestor's Suffix</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_reqsuffix || deathTransaction.reqsuffix || '-'}</span>
                    </div>
                    ) : null}
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Relationship to the Owner</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_reqrelation || deathTransaction.owner_rel || '-'}</span>
                    </div>
                    {deathTransaction.reqtel ? (
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Telephone No.</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_telno || deathTransaction.reqtel || '-'}</span>
                    </div>
                    ) : null}
                    {deathTransaction.reqnum ? (
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Mobile No.</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_mobileno || deathTransaction.reqnum || '-'}</span>
                    </div>
                    ) : null}                                              
                    <br/>

                    <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Requestor's Address</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Region</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_reqregionLabel || deathTransaction.reqregion || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Province</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_reqprovinceLabel || deathTransaction.reqprovince || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Municipal</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_reqmunicipalLabel || deathTransaction.reqcity || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Barangay</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_reqbrgy || deathTransaction.brgy_dist || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">House No. / Unit Floor</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_reqhnum || deathTransaction.house_floor || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Street / Building Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_reqstreet || deathTransaction.bldg_name || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Zip Code</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_reqzip || deathTransaction.zip_code || '-'}</span>
                    </div>

                    <br/>

                    {deathTransaction.deathc_regnum ? (
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Registry Number</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_regnum ? deathTransaction.regnum : '-'}</span>
                    </div>
                    ) : null}
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">No. of Copies</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_nocopies || deathTransaction.copies || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">What to Print</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_printLabel || deathTransaction.print_type || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Purpose</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_purposeLabel || deathTransaction.purpose_type || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Valid ID to Present Upon Claiming</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{deathTransaction.deathc_valididLabel || deathTransaction.valid_id_type || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#212121] text-slate-700 dark:text-white mx-auto pb-4 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 lg:pr-10">
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
              <StatusBadgeModal statusType={status_type} />
            </div>
            ) : null}
            <hr className='mb-1'/>
            <div className="flex justify-between">
            <span className="font-semibold whitespace-nowrap">{status_type === "Paid" ? "Amount Paid" : status_type === "Pending" ? "Amount to Pay" : "Amount"}</span>
              <span className="font-semibold whitespace-nowrap ml-4">
              {deathTransaction && (
                `P ${deathTransaction.deathc_amount !== undefined ? deathTransaction.deathc_amount + '.00' : 
                deathTransaction.amount !== undefined ? deathTransaction.amount + '.00' : '-'}`
              )}
              </span>
            </div>
          </div>

          <div className="flex bg-white dark:bg-[#212121] text-slate-700 dark:text-white p-4 rounded-b-lg gap-4 items-end">
            <div className="flex">
              <div className="relative inline-block text-left">
                <button 
                  onMouseEnter={() => document.getElementById('popover-click').classList.remove('hidden')} 
                  onMouseLeave={() => document.getElementById('popover-click').classList.add('hidden')} 
                  className="cursor-auto"
                >
                  {deathTransaction && deathTransaction.transaction_id ? (
                    <QRCode value={generateDownloadLink(deathTransaction)} size={100} />
                  ) : (
                    <p></p>
                  )}
                </button>
                {/* POPOVER */}
                <div id="popover-click" className="text-xs hidden absolute z-10 w-[12rem] p-3 transition-opacity duration-300 rounded-lg shadow-2xl bg-[#fffffffc] dark:bg-[#333333] text-slate-700 dark:text-white border-gray-200 dark:border-gray-800 top-3.5 mt-2 ml-12">
                  <p>Scan this QR code to save this transaction's details.</p>
                </div>
              </div>
            </div>

            {/* <div className="whitespace-nowrap">
              {deathTransaction && deathTransaction.transaction_id ? (
                <QRCode value={generateDownloadLink(deathTransaction)} size={100} />
              ) : (
                <p></p>
              )}
            </div> */}

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0 ml-auto">
              {status_type === 'Pending' && transaction_id ? (
                <button
                  onClick={makePayment}
                  type="button"
                  className="text-emerald-500 text-xs md:w-auto w-full text-center px-5 py-2 md:text-sm hover:text-white border border-emerald-500 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-emerald-500 dark:text-emerald-500 dark:hover:text-white dark:hover:bg-emerald-500 dark:focus:ring-emerald-800"
                >
                  <span className="font-semibold">PAY: P {deathTransaction.amount ? deathTransaction.amount + '.00' : '-'}</span>
                </button>
              ) : null}

              {status_type === 'Pending' && transaction_id ? (
                <button
                  onClick={handleOpenConfirm}
                  type="button"
                  className="text-red-500 text-[0.60rem] md:w-auto w-full px-5 py-2 md:text-sm hover:text-white border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-normal rounded-full dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
                >
                  <p>Cancel Transaction</p>
                </button>
              ) : null}

              {isloading ? (
                <div className="bg-white dark:bg-[#212121] text-slate-700 dark:text-white px-1 pb-1 rounded-b-lg">
                  <Loading />
                </div>
              ) : (
                <>
                  <button
                    onClick={onClose}
                    type="button"
                    className="text-slate-500 text-[0.60rem] md:w-auto w-full px-5 py-2 md:text-sm hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                  >
                    <p>Close</p>
                  </button>

                  {transaction_id ? null : (
                    <button
                      onClick={submitHandler}
                      type="button"
                      className="text-white text-xs md:w-auto w-full md:text-sm bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <p>Submit</p>
                    </button>
                  )}
                </>
              )}
            </div>
          
          </div>
          
        </div>

        {isCancelConfirmed && (
          <CancelTransactionModal onClose={handleCloseConfirm} onCancel={cancelTrans} />
        )}

      </div>
    </div>
  );
};

export default DeathModal;