import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment.js';
import QRCode from 'react-qr-code';
import StatusBadgeModal from '../StatusBadgeModal';
import CancelTransactionModal from '../CancelTransactionModal';
import Loading from '../../partials/Loading';

const BusinessModal = ({ user_id, selectedTransaction, busOffice, businessData, businessImages, onClose, onSubmit, handleOpenModal }) => {

  const { transaction_id, status_type, date_processed } = selectedTransaction;

  const trans_type = 'Business Permit';

  const date = moment(date_processed).format('MMMM D, YYYY');
  const time = moment(date_processed).format('h:mm A');

  const [businessTransaction, setBusinessTransaction] = useState({});
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
          data: selectedTransaction,
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

  useEffect(() => {
    const fetchBusinessTransaction = async () => {
      if (transaction_id) {
      try {
        const res = await axios.get(`http://localhost:8800/transachistory/buspermit/${transaction_id}`);
        setBusinessTransaction(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
        console.error('Error message:', err.message);
      }} else {
        setBusinessTransaction(selectedTransaction);
      }
    };
    fetchBusinessTransaction();
  }, [transaction_id]);

  function getShortName(longName, maxCharacters) {
    if (!longName) {
        return '-';
    }

    const fileNameWithoutExtension = longName.split('.').slice(0, -1).join('.');
    const extension = longName.split('.').pop();

    const truncatedName = fileNameWithoutExtension.length > maxCharacters - extension.length - 5
        ? fileNameWithoutExtension.substring(0, maxCharacters - extension.length - 5) + '..'
        : fileNameWithoutExtension;

    return extension ? truncatedName + '.' + extension : truncatedName;
}


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

          const trans_type = 'Business Permit';

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
          onClose();
        }, 2100);
        
      } else {
        console.error('Transaction error:', response.statusText);
      }
    } catch (transactionError) {
      console.error('Transaction error:', transactionError);
    }
  };


const handleOpenConfirm = () => {
  setIsCancelConfirmed(true);
};

const handleCloseConfirm = () => {
  setIsCancelConfirmed(false);
};


  // QR Download 
  const generateDownloadLink = (data) => {
    console.log('Generating download link:', data.transaction_id);
    return `http://localhost:8800/transachistory/buspermit/${data.transaction_id}/download`;
};

  const downloadLink = isScanned ? generateDownloadLink(businessTransaction) : null;
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
            <div className="mb-6">
              <span className="font-bold md:text-lg text-sm">Business Permit Transaction Details</span>
            </div>
          </div>

          {isSuccess && (                
            <div className="my-5 text-center">
              <div className='text-emerald-500 bg-emerald-100 md:text-sm text-xs text-center rounded-full py-1.5'>Transaction Canceled!</div> 
            </div>
          )}

          <div className="md:max-h-[16rem] max-h-[9rem] bg-white dark:bg-[#212121] dark:text-white pb-0 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 overflow-y-auto">
            <div className="mx-auto">
              <div className="sm:mt-0" id="modal-headline">   
                <div className="mx-auto">
                  <div className="mb-0">
                    {businessTransaction.transaction_id ? (
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Transaction ID</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.transaction_id}</span>
                    </div>
                    ) : null}
                    <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Business Information and Registration</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Type</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_typeLabel || businessTransaction.bus_type || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_name ? businessTransaction.bus_name : '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Trade Name / Franchise</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_franchise ? businessTransaction.bus_franchise : '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">DTI / SEC / CDA Registration No.</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_reg_no ? businessTransaction.bus_reg_no : '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Tax Identification Number</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_tin ? businessTransaction.bus_tin : '-'}</span>
                    </div>

                    <br />
                    
                    <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Owner's Information</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap"> Last Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_lname ? businessTransaction.bus_lname : '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">First Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_fname ? businessTransaction.bus_fname : '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Middle Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_mname ? businessTransaction.bus_mname : '-'}</span>
                    </div>
                    {businessTransaction.bus_suffix ? (
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Suffix</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_suffix ? businessTransaction.bus_suffix : '-'}</span>
                    </div>
                    ) : null}
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Sex</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_sexLabel || businessTransaction.bus_sex || '-'}</span>
                    </div>

                    <br />
                    
                    <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Contact Information</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Email Address</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_email || businessTransaction.bus_email || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Telephone Number</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_tel_no || businessTransaction.bus_tel_no || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Mobile Number</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_mobile_no || businessTransaction.bus_mobile_no || '-'}</span>
                    </div>

                    <br />
                    
                    <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Business Address</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Region</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_bregionLabel || businessTransaction.bus_bregion || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Province</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_bprovinceLabel || businessTransaction.bus_bprovince || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business city</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_bcityLabel || businessTransaction.bus_bcity || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Barangay</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_bbrgy || businessTransaction.bus_bbrgy || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business House No. / Unit Floor</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_bhnum || businessTransaction.bus_bhnum || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Street / Building Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_bstreet || businessTransaction.bus_bstreet || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Zip Code</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_bzip || businessTransaction.bus_bzip || '-'}</span>
                    </div>

                    <br />
                    
                    <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Business Operation</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Area / Total Floor Area (sq.m)</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_floor || businessTransaction.bus_floor || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">No. of Employees Residing Within Manila</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_emp || businessTransaction.bus_emp || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Total No. of Male Employees</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_male_emp || businessTransaction.bus_male_emp || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Total No. of Female Employees</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_female_emp || businessTransaction.bus_female_emp || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">No. of Van Delivery Vehicles</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_van_no || businessTransaction.bus_van_no || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">No. of Truck Delivery Vehicles</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_truck_no || businessTransaction.bus_truck_no || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">No. of Motorcycle Delivery Vehicles</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_motor_no || businessTransaction.bus_motor_no || '-'}</span>
                    </div>

                    <br />  
                    
                    <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Taxpayer's Address</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Payer's Region</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_regionLabel || businessTransaction.bus_region || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Payer's Province</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_provinceLabel || businessTransaction.bus_province || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Payer's City</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_cityLabel || businessTransaction.bus_city || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Payer's Barangay</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_brgy || businessTransaction.bus_brgy || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Payer's House No. / Unit Floor</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_hnum || businessTransaction.bus_hnum || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Payer's Street / Building Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_street || businessTransaction.bus_street || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Payer's Zip Code</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_zip_code || businessTransaction.bus_zip || '-'}</span>
                    </div>

                    <br />
                    
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Ownership</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.owned ? businessTransaction.owned : '-'}</span>
                    </div>

                    {businessTransaction.owned === 'RENTAL' ? (
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Lessor Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_lessor || businessTransaction.bus_lessor || '-'}</span>
                    </div>
                    ) : null}

                    {businessTransaction.owned === 'RENTAL' ? (
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Monthly Rental</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_rent || businessTransaction.bus_rent || '-'}</span>
                    </div>
                    ) : null}

                    <br />
                    
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Incentives from any Government Entity</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">
                        {businessImages && businessImages.bus_tax_incentives !== undefined
                                ? getShortName(businessImages.bus_tax_incentives, 20)
                                : businessTransaction && businessTransaction.bus_tax_incentives !== undefined
                                ? <a href={`http://localhost:5173/uploads/business/${businessTransaction.bus_tax_incentives}`} target="_blank" rel="noopener noreferrer">{getShortName(businessTransaction.bus_tax_incentives, 20)}</a>
                                : ''
                        }
                    </span>
                    </div>

                    <br />

                    <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Business Activity</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                        <span className="font-medium whitespace-nowrap">Business Office</span>
                        <span className="whitespace-nowrap md:mb-0 mb-1">
                            {(busOffice && busOffice.bus_office) || 
                            ((businessTransaction && businessTransaction.bus_activity && businessTransaction.bus_activity[0] && businessTransaction.bus_activity[0].bus_office) || '-')}
                        </span>
                    </div>

                



                    <div className='border-t dark:border-gray-500'></div>
                    {businessData && businessData.map((business, index) => (
                      <div key={index}>
                        <div className="flex flex-col sm:flex-row items-start justify-between my-1">
                          <span className="font-medium whitespace-nowrap">Line of Business</span>
                          <span className="whitespace-nowrap md:mb-0 mb-1">{business.bus_line || business.bus_line || '-'}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                          <span className="font-medium whitespace-nowrap">PSIC</span>
                          <span className="whitespace-nowrap md:mb-0 mb-1">{business.bus_psic || business.bus_psic || '-'}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                          <span className="font-medium whitespace-nowrap">Products/Services</span>
                          <span className="whitespace-nowrap md:mb-0 mb-1">{business.bus_products || business.bus_products || '-'}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                          <span className="font-medium whitespace-nowrap">No. of units</span>
                          <span className="whitespace-nowrap md:mb-0 mb-1">{business.bus_units_no || business.bus_units_no || '-'}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                          <span className="font-medium whitespace-nowrap">Total Capitalization</span>
                          <span className="whitespace-nowrap md:mb-0 mb-1">{business.bus_total_cap || business.bus_total_cap || '-'}</span>
                        </div>
                        <div className='border-t dark:border-gray-500'></div>
                      </div>
                    ))}

                    {!businessData && businessTransaction && businessTransaction.bus_activity && businessTransaction.bus_activity.map((activity, index) => (
                        <div key={index}>
                            <div className="flex flex-col sm:flex-row items-start justify-between my-1">
                                <span className="font-medium whitespace-nowrap">Line of Business</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">{activity.bus_line || '-'}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">PSIC</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">{activity.bus_psic || '-'}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Products/Services</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">{activity.bus_products || '-'}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">No. of units</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">{activity.bus_units_no || '-'}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Total Capitalization</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">{activity.bus_total_cap || '-'}</span>
                            </div>
                            <div className='border-t dark:border-gray-500'></div>
                        </div>
                    ))}

                    
                    <br />
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">DTI Registration</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">
                          {businessImages && businessImages.bus_dti_reg !== undefined
                            ? getShortName(businessImages.bus_dti_reg, 20)
                                : businessTransaction && businessTransaction.bus_dti_reg !== undefined
                                  ? <a href={`http://localhost:5173/uploads/business/${businessTransaction.bus_dti_reg}`} target="_blank" rel="noopener noreferrer">{getShortName(businessTransaction.bus_dti_reg, 20)}</a>
                                  : ''
                          }
                      </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">R.P. Tax Declaration for Building</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">
                        {businessImages && businessImages.bus_rptax_decbldg !== undefined
                                ? getShortName(businessImages.bus_rptax_decbldg, 20)
                                : businessTransaction && businessTransaction.bus_rptax_decbldg !== undefined
                                ? <a href={`http://localhost:5173/uploads/business/${businessTransaction.bus_rptax_decbldg}`} target="_blank" rel="noopener noreferrer">{getShortName(businessTransaction.bus_rptax_decbldg, 20)}</a>
                                : ''
                        }
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Paid-up and Subscribed Page</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">
                        {businessImages && businessImages.bus_sec_paid !== undefined
                            ? getShortName(businessImages.bus_sec_paid, 20)
                            : businessTransaction && businessTransaction.bus_sec_paid !== undefined
                                ? <a href={`http://localhost:5173/uploads/business/${businessTransaction.bus_sec_paid}`} target="_blank" rel="noopener noreferrer">{getShortName(businessTransaction.bus_sec_paid, 20)}</a>
                                : ''
                        }
                    </span>
                </div>


                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Articles of Primary and Secondary Purpose</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">
                        {businessImages && businessImages.bus_sec_articles !== undefined
                            ? getShortName(businessImages.bus_sec_articles,20 )
                            : businessTransaction && businessTransaction.bus_sec_articles !== undefined
                                ? <a href={`http://localhost:5173/uploads/business/${businessTransaction.bus_sec_articles}`} target="_blank" rel="noopener noreferrer">{getShortName(businessTransaction.bus_sec_articles, 20)}</a>
                                : ''
                        }
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">NGA-Contract of Lease</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">
                        {businessImages && businessImages.bus_nga !== undefined 
                            ? getShortName(businessImages.bus_nga, 20)
                            : businessTransaction && businessTransaction.bus_nga !== undefined
                                ? <a href={`http://localhost:5173/uploads/business/${businessTransaction.bus_nga}`} target="_blank" rel="noopener noreferrer">{getShortName(businessTransaction.bus_nga, 20)}</a>
                                : ''
                        }
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">SEC Registration</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">
                        {businessImages && businessImages.bus_sec_front !== undefined
                            ? getShortName(businessImages.bus_sec_front, 20)
                            : businessTransaction && businessTransaction.bus_sec_front !== undefined
                                ? <a href={`http://localhost:5173/uploads/business/${businessTransaction.bus_sec_front}`} target="_blank" rel="noopener noreferrer">{getShortName(businessTransaction.bus_sec_front, 20)}</a>
                                : ''
                        }
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">R.P. Tax Declaration for Land</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">
                        {businessImages && businessImages.bus_rptax_decland !== undefined
                            ? getShortName(businessImages.bus_rptax_decland, 20)
                            : businessTransaction && businessTransaction.bus_rptax_decland !== undefined
                                ? <a href={`http://localhost:5173/uploads/business/${businessTransaction.bus_rptax_decland}`} target="_blank" rel="noopener noreferrer">{getShortName(businessTransaction.bus_rptax_decland, 20)}</a>
                                : ''
                        }
                    </span>
                </div>

                  <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                    <span className="font-medium whitespace-nowrap">Fire Safety Inspection Certificate</span>
                    <span className="whitespace-nowrap md:mb-0 mb-1">
                        {businessImages && businessImages.bus_fire !== undefined
                            ? getShortName(businessImages.bus_fire, 20 )
                            : businessTransaction && businessTransaction.bus_fire !== undefined
                                ? <a href={`http://localhost:5173/uploads/business/${businessTransaction.bus_fire}`} target="_blank" rel="noopener noreferrer">{getShortName(businessTransaction.bus_fire, 20)}</a>
                                : ''
                        }
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">Page 2 Document</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1">
                      {businessImages && businessImages.bus_page2 !== undefined
                          ? getShortName(businessImages.bus_page2, 20)
                          : businessTransaction && businessTransaction.bus_page2 !== undefined
                              ? <a href={`http://localhost:5173/uploads/business/${businessTransaction.bus_page2}`} target="_blank" rel="noopener noreferrer">{getShortName(businessTransaction.bus_page2, 20)}</a>
                              : ''
                      }
                  </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">Page 3 Document</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1">
                      {businessImages && businessImages.bus_page3 !== undefined
                          ? getShortName(businessImages.bus_page3, 20)
                          : businessTransaction && businessTransaction.bus_page3 !== undefined
                              ? <a href={`http://localhost:5173/uploads/business/${businessTransaction.bus_page3}`} target="_blank" rel="noopener noreferrer">{getShortName(businessTransaction.bus_page3, 20)}</a>
                              : ''
                      }
                  </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">Page 4 Document</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1">
                      {businessImages && businessImages.bus_page4 !== undefined
                          ? getShortName(businessImages.bus_page4, 20)
                          : businessTransaction && businessTransaction.bus_page4 !== undefined
                              ? <a href={`http://localhost:5173/uploads/business/${businessTransaction.bus_page4}`} target="_blank" rel="noopener noreferrer">{getShortName(businessTransaction.bus_page4, 20)}</a>
                              : ''
                      }
                  </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">Page 5 Document</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1">
                      {businessImages && businessImages.bus_page5 !== undefined
                          ? getShortName(businessImages.bus_page5, 20)
                          : businessTransaction && businessTransaction.bus_page5 !== undefined
                              ? <a href={`http://localhost:5173/uploads/business/${businessTransaction.bus_page5}`} target="_blank" rel="noopener noreferrer">{getShortName(businessTransaction.bus_page5, 20)}</a>
                              : ''
                      }
                  </span>
              </div>

                    <br />

                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">No. of Copies</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_nocopies || businessTransaction.copies || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">What to Print</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_printLabel || businessTransaction.print_type || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Purpose</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_purposeLabel || businessTransaction.purpose_type || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Valid ID to Present Upon Claiming</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_valididLabel || businessTransaction.valid_id || '-'}</span>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto bg-white dark:bg-[#212121] text-slate-700 dark:text-white pb-4 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 lg:pr-10 ">
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
            {/* {businessTransaction.time ? (
            <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
              <span className="font-medium whitespace-nowrap">Reference Number</span>
              <span className="whitespace-nowrap md:mb-0 mb-1">-</span>
            </div>
            ) : null} */}
            {transaction_id ? (
            <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
              <span className="font-medium whitespace-nowrap">Status</span>
              <StatusBadgeModal statusType={status_type} />
            </div>
            ) : null}

            <hr className='mb-1'/>
            <div className="flex justify-between">
              <span className="font-semibold whitespace-nowrap">Amount to Pay</span>
              <span className="font-semibold whitespace-nowrap ml-4"> {businessTransaction && (
                `P ${businessTransaction.bus_amount !== undefined ? businessTransaction.bus_amount + '.00' : 
              businessTransaction.amount !== undefined ? businessTransaction.amount + '.00' : '-'}`
              )}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#212121] px-4 pt-3 pb-5 gap-3 sm:px-6 flex items-center justify-between rounded-b-lg">
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Sample_EPC_QR_code.png" alt="QR Code" className="w-20 h-20 mr-3"/> */}

            {status_type === 'Pending' && transaction_id ? (
              <button
                onClick={makePayment}
                type="button"
                className="text-slate-500 text-xs text-center px-5 py-2 mb-0 mr-auto md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
              >
                <span className="font-semibold whitespace-nowrap ml-2"> PAY: {selectedTransaction.amount ? selectedTransaction.amount + '.00' : '-'}</span>
              </button>
            ): null}


           {/* QR Code Section */}
           <div className="bg-white dark:bg-[#212121] text-slate-700 dark:text-white px-4 pt-3 pb-5 gap-3 sm:px-6 flex items-center justify-between rounded-b-lg">
                      <div className="whitespace-nowrap md:mb-0 mb-1">
                          {businessTransaction ? (
                              // Display the QR code without the anchor tag
                              <QRCode value={generateDownloadLink(businessTransaction)} size={100} />
                          ) : (
                              <Loading />
                          )}
                      </div>
                  </div>


            <div className="flex items-center space-x-2 ml-auto">
                    {status_type === 'Pending' && transaction_id ? (
                    <button
                        onClick={handleOpenConfirm}
                        type="button"
                        className="text-red-500 text-xs text-center px-5 py-2 mb-0 md:text-sm ms-2 hover:text-white border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-normal rounded-full dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800">
                        <p>Cancel Transaction</p>
                    </button>
                    ): null}


                      {isloading ? (
                            <div className="bg-white dark:bg-[#212121] text-slate-700 dark:text-white px-1 pb-1 rounded-b-lg mt-[-10px]">
                              <Loading />
                            </div>
                          ) : (
                          <>
                            <button
                              onClick={onClose}
                              type="button"
                              className="text-slate-500 text-xs text-center px-5 py-2 mb-0 md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                            >
                              <p>Close</p>
                            </button>

                        {transaction_id ? null : (
                            <button
                              onClick={submitHandler}
                              type="button"
                              className="text-white text-xs md:text-sm bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

export default BusinessModal;
