import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment/moment.js';
import StatusBadgeModal from '../StatusBadgeModal';
import Loading from '../../partials/Loading';

const AdminBPCharges = ({ selectedTransaction, isOpen, busOffice, businessData, businessImages, handleConfirmClose, handleProcess, isLoading, transType }) => {

  const { user_id, transaction_id, status_type, date_processed } = selectedTransaction;

  const date = moment(date_processed).format('MMMM D, YYYY');
  const time = moment(date_processed).format('h:mm A');

  const [totalVal, setTotalVal] = useState();

  const [values, setValues] = useState({
    bp_1: '',
    bp_2: '',
    bp_3: '',
    bp_4: '',
    bp_5: '',
    bp_6: '',
    bp_7: '',
    bp_8: '',
    bp_9: '',
    bp_10: '',
    bp_11: '',
    bp_12: '',
    bp_13: '',
    bp_14: '',
    bp_15: '',
    bp_16: '',
    bp_17: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    }

    useEffect(() => {
        let sum = 0;
        for (const key in values) {
            if (values.hasOwnProperty(key) && values[key] !== '') {
            sum += parseFloat(values[key]);
            }
        }
    setTotalVal(sum);
    }, [values]);


    

//   const [businessTransaction, setBusinessTransaction] = useState({});
  
//   const makePayment = async () => {
//     try {
//         if (!transaction_id) {
//             console.error("Transaction ID is not defined.");
//             alert("Error creating checkout session. Please try again later.");
//             return;
//         }

//         const body = {
//           data: selectedTransaction,
//           trans_type: trans_type,
//           user_id: user_id,
//       };

//         const response = await axios.post(`http://localhost:8800/payment/create-checkout-session/${transaction_id}`, body);

//         if (response.data && response.data.checkoutSessionUrl) {
//             const checkoutSessionUrl = response.data.checkoutSessionUrl;

//             if (checkoutSessionUrl) {
//                 console.log('Checkout Session URL:', checkoutSessionUrl);

//                 // Open a new window or tab with the checkout session URL
//                 const newWindow = window.open(checkoutSessionUrl, '_self');
                
//             }
//         } else {
//             console.error("Invalid checkout session - Response structure is unexpected:", response);
//             alert("Error creating checkout session. Please try again later.");
//         }
//     } catch (error) {
//         console.error("Error creating checkout session:", error);
//         alert("Error creating checkout session. Please try again later.");
//     }
// };

//   useEffect(() => {
//     const fetchBusinessTransaction = async () => {
//       if (transaction_id) {
//       try {
//         const res = await axios.get(`http://localhost:8800/transachistory/buspermit/${transaction_id}`);
//         setBusinessTransaction(res.data);
//         console.log(res.data);
//       } catch (err) {
//         console.error(err);
//         console.error('Error message:', err.message);
//       }} else {
//         setBusinessTransaction(selectedTransaction);
//       }
//     };
//     fetchBusinessTransaction();
//   }, [transaction_id]);

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


  return (
    isOpen && (
      <div className="fixed z-50 inset-0 flex items-center justify-center">
        {/* Left Modal */}
          <div className="absolute left-0 w-1/2 min-h-screen h-full bg-gray-500 opacity-75"></div>
          <div className="absolute left-0 flex items-center justify-center w-1/2 h-full">
            <div className="inline-block bg-white dark:bg-[#212121] h-96 pt-8 overflow-y-auto px-4 rounded-sm text-center overflow-hidden shadow-xl transform transition-all">
              <div className='mx-14'>
                <div className="px-4 pt-5 pb-0 sm:p-6 sm:pb-0 dark:text-white">
                  <div className="mb-6">
                  <span className="font-bold md:text-lg text-sm">Business Permit Transaction Details</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">Transaction ID</span>
                  <span className="whitespace-nowrap md:mb-7 mb-1">{transaction_id}</span>
                </div>               
                <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Business Information and Registration</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Type</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_typeLabel || selectedTransaction.bus_type || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_name ? selectedTransaction.bus_name : '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Trade Name / Franchise</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_franchise ? selectedTransaction.bus_franchise : '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">DTI / SEC / CDA Registration No.</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_reg_no ? selectedTransaction.bus_reg_no : '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Tax Identification Number</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_tin ? selectedTransaction.bus_tin : '-'}</span>
                    </div>

                    <br />
                    
                    <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Owner's Information</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap"> Last Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_lname ? selectedTransaction.bus_lname : '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">First Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_fname ? selectedTransaction.bus_fname : '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Middle Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_mname ? selectedTransaction.bus_mname : '-'}</span>
                    </div>
                    {selectedTransaction.bus_suffix ? (
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Suffix</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_suffix ? selectedTransaction.bus_suffix : '-'}</span>
                    </div>
                    ) : null}
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Sex</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_sexLabel || selectedTransaction.bus_sex || '-'}</span>
                    </div>

                    <br />
                    
                    <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Contact Information</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Email Address</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_email || selectedTransaction.bus_email || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Telephone Number</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_tel_no || selectedTransaction.bus_tel_no || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Mobile Number</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_mobile_no || selectedTransaction.bus_mobile_no || '-'}</span>
                    </div>

                    <br />
                    
                    <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Business Address</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Region</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_bregionLabel || selectedTransaction.bus_bregion || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Province</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_bprovinceLabel || selectedTransaction.bus_bprovince || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business city</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_bcityLabel || selectedTransaction.bus_bcity || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Barangay</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_bbrgy || selectedTransaction.bus_bbrgy || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business House No. / Unit Floor</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_bhnum || selectedTransaction.bus_bhnum || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Street / Building Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_bstreet || selectedTransaction.bus_bstreet || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Zip Code</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_bzip || selectedTransaction.bus_bzip || '-'}</span>
                    </div>

                    <br />
                    
                    <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Business Operation</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Business Area / Total Floor Area (sq.m)</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_floor || selectedTransaction.bus_floor || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">No. of Employees Residing Within Manila</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_emp || selectedTransaction.bus_emp || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Total No. of Male Employees</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_male_emp || selectedTransaction.bus_male_emp || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Total No. of Female Employees</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_female_emp || selectedTransaction.bus_female_emp || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">No. of Van Delivery Vehicles</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_van_no || selectedTransaction.bus_van_no || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">No. of Truck Delivery Vehicles</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_truck_no || selectedTransaction.bus_truck_no || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">No. of Motorcycle Delivery Vehicles</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_motor_no || selectedTransaction.bus_motor_no || '-'}</span>
                    </div>

                    <br />  
                    
                    <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                      <span className="font-semibold whitespace-nowrap">Taxpayer's Address</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Payer's Region</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_regionLabel || selectedTransaction.bus_region || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Payer's Province</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_provinceLabel || selectedTransaction.bus_province || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Payer's City</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_cityLabel || selectedTransaction.bus_city || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Payer's Barangay</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_brgy || selectedTransaction.bus_brgy || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Payer's House No. / Unit Floor</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_hnum || selectedTransaction.bus_hnum || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Payer's Street / Building Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_street || selectedTransaction.bus_street || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Payer's Zip Code</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_zip_code || selectedTransaction.bus_zip || '-'}</span>
                    </div>

                    <br />
                    
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Ownership</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.owned ? selectedTransaction.owned : '-'}</span>
                    </div>

                    {selectedTransaction.owned === 'RENTAL' ? (
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Lessor Name</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_lessor || selectedTransaction.bus_lessor || '-'}</span>
                    </div>
                    ) : null}

                    {selectedTransaction.owned === 'RENTAL' ? (
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                      <span className="font-medium whitespace-nowrap">Monthly Rental</span>
                      <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_rent || selectedTransaction.bus_rent || '-'}</span>
                    </div>
                    ) : null}

                    <br />
                    
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                <span className="font-medium whitespace-nowrap">Incentives from any Government Entity</span>
                <span className="whitespace-nowrap md:mb-0 mb-1">
                  {businessImages && businessImages.bus_tax_incentives !== undefined
                          ? getShortName(businessImages.bus_tax_incentives, 20)
                          : selectedTransaction && selectedTransaction.bus_tax_incentives !== undefined
                          ? <a href={`http://localhost:5173/uploads/business/${selectedTransaction.bus_tax_incentives}`} target="_blank" rel="noopener noreferrer">{getShortName(selectedTransaction.bus_tax_incentives, 20)}</a>
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
                      ((selectedTransaction && selectedTransaction.bus_activity && selectedTransaction.bus_activity[0] && selectedTransaction.bus_activity[0].bus_office) || '-')}
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

              {!businessData && selectedTransaction && selectedTransaction.bus_activity && selectedTransaction.bus_activity.map((activity, index) => (
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
                          : selectedTransaction && selectedTransaction.bus_dti_reg !== undefined
                            ? <a href={`http://localhost:5173/uploads/business/${selectedTransaction.bus_dti_reg}`} target="_blank" rel="noopener noreferrer">{getShortName(selectedTransaction.bus_dti_reg, 20)}</a>
                            : ''
                    }
                </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
              <span className="font-medium whitespace-nowrap">R.P. Tax Declaration for Building</span>
              <span className="whitespace-nowrap md:mb-0 mb-1">
                  {businessImages && businessImages.bus_rptax_decbldg !== undefined
                          ? getShortName(businessImages.bus_rptax_decbldg, 20)
                          : selectedTransaction && selectedTransaction.bus_rptax_decbldg !== undefined
                          ? <a href={`http://localhost:5173/uploads/business/${selectedTransaction.bus_rptax_decbldg}`} target="_blank" rel="noopener noreferrer">{getShortName(selectedTransaction.bus_rptax_decbldg, 20)}</a>
                          : ''
                  }
              </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
              <span className="font-medium whitespace-nowrap">Paid-up and Subscribed Page</span>
              <span className="whitespace-nowrap md:mb-0 mb-1">
                  {businessImages && businessImages.bus_sec_paid !== undefined
                      ? getShortName(businessImages.bus_sec_paid, 20)
                      : selectedTransaction && selectedTransaction.bus_sec_paid !== undefined
                          ? <a href={`http://localhost:5173/uploads/business/${selectedTransaction.bus_sec_paid}`} target="_blank" rel="noopener noreferrer">{getShortName(selectedTransaction.bus_sec_paid, 20)}</a>
                          : ''
                  }
              </span>
          </div>


            <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
              <span className="font-medium whitespace-nowrap">Articles of Primary and Secondary Purpose</span>
              <span className="whitespace-nowrap md:mb-0 mb-1">
                  {businessImages && businessImages.bus_sec_articles !== undefined
                      ? getShortName(businessImages.bus_sec_articles,20 )
                      : selectedTransaction && selectedTransaction.bus_sec_articles !== undefined
                          ? <a href={`http://localhost:5173/uploads/business/${selectedTransaction.bus_sec_articles}`} target="_blank" rel="noopener noreferrer">{getShortName(selectedTransaction.bus_sec_articles, 20)}</a>
                          : ''
                  }
              </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
              <span className="font-medium whitespace-nowrap">NGA-Contract of Lease</span>
              <span className="whitespace-nowrap md:mb-0 mb-1">
                  {businessImages && businessImages.bus_nga !== undefined 
                      ? getShortName(businessImages.bus_nga, 20)
                      : selectedTransaction && selectedTransaction.bus_nga !== undefined
                          ? <a href={`http://localhost:5173/uploads/business/${selectedTransaction.bus_nga}`} target="_blank" rel="noopener noreferrer">{getShortName(selectedTransaction.bus_nga, 20)}</a>
                          : ''
                  }
              </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
              <span className="font-medium whitespace-nowrap">SEC Registration</span>
              <span className="whitespace-nowrap md:mb-0 mb-1">
                  {businessImages && businessImages.bus_sec_front !== undefined
                      ? getShortName(businessImages.bus_sec_front, 20)
                      : selectedTransaction && selectedTransaction.bus_sec_front !== undefined
                          ? <a href={`http://localhost:5173/uploads/business/${selectedTransaction.bus_sec_front}`} target="_blank" rel="noopener noreferrer">{getShortName(selectedTransaction.bus_sec_front, 20)}</a>
                          : ''
                  }
              </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
              <span className="font-medium whitespace-nowrap">R.P. Tax Declaration for Land</span>
              <span className="whitespace-nowrap md:mb-0 mb-1">
                  {businessImages && businessImages.bus_rptax_decland !== undefined
                      ? getShortName(businessImages.bus_rptax_decland, 20)
                      : selectedTransaction && selectedTransaction.bus_rptax_decland !== undefined
                          ? <a href={`http://localhost:5173/uploads/business/${selectedTransaction.bus_rptax_decland}`} target="_blank" rel="noopener noreferrer">{getShortName(selectedTransaction.bus_rptax_decland, 20)}</a>
                          : ''
                  }
              </span>
          </div>

            <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
              <span className="font-medium whitespace-nowrap">Fire Safety Inspection Certificate</span>
              <span className="whitespace-nowrap md:mb-0 mb-1">
                  {businessImages && businessImages.bus_fire !== undefined
                      ? getShortName(businessImages.bus_fire, 20 )
                      : selectedTransaction && selectedTransaction.bus_fire !== undefined
                          ? <a href={`http://localhost:5173/uploads/business/${selectedTransaction.bus_fire}`} target="_blank" rel="noopener noreferrer">{getShortName(selectedTransaction.bus_fire, 20)}</a>
                          : ''
                  }
              </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
            <span className="font-medium whitespace-nowrap">Page 2 Document</span>
            <span className="whitespace-nowrap md:mb-0 mb-1">
                {businessImages && businessImages.bus_page2 !== undefined
                    ? getShortName(businessImages.bus_page2, 20)
                    : selectedTransaction && selectedTransaction.bus_page2 !== undefined
                        ? <a href={`http://localhost:5173/uploads/business/${selectedTransaction.bus_page2}`} target="_blank" rel="noopener noreferrer">{getShortName(selectedTransaction.bus_page2, 20)}</a>
                        : ''
                }
            </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
            <span className="font-medium whitespace-nowrap">Page 3 Document</span>
            <span className="whitespace-nowrap md:mb-0 mb-1">
                {businessImages && businessImages.bus_page3 !== undefined
                    ? getShortName(businessImages.bus_page3, 20)
                    : selectedTransaction && selectedTransaction.bus_page3 !== undefined
                        ? <a href={`http://localhost:5173/uploads/business/${selectedTransaction.bus_page3}`} target="_blank" rel="noopener noreferrer">{getShortName(selectedTransaction.bus_page3, 20)}</a>
                        : ''
                }
            </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
            <span className="font-medium whitespace-nowrap">Page 4 Document</span>
            <span className="whitespace-nowrap md:mb-0 mb-1">
                {businessImages && businessImages.bus_page4 !== undefined
                    ? getShortName(businessImages.bus_page4, 20)
                    : selectedTransaction && selectedTransaction.bus_page4 !== undefined
                        ? <a href={`http://localhost:5173/uploads/business/${selectedTransaction.bus_page4}`} target="_blank" rel="noopener noreferrer">{getShortName(selectedTransaction.bus_page4, 20)}</a>
                        : ''
                }
            </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
            <span className="font-medium whitespace-nowrap">Page 5 Document</span>
            <span className="whitespace-nowrap md:mb-0 mb-1">
                {businessImages && businessImages.bus_page5 !== undefined
                    ? getShortName(businessImages.bus_page5, 20)
                    : selectedTransaction && selectedTransaction.bus_page5 !== undefined
                        ? <a href={`http://localhost:5173/uploads/business/${selectedTransaction.bus_page5}`} target="_blank" rel="noopener noreferrer">{getShortName(selectedTransaction.bus_page5, 20)}</a>
                        : ''
                }
            </span>
        </div>

              <br />

              <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                <span className="font-medium whitespace-nowrap">No. of Copies</span>
                <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_nocopies || selectedTransaction.copies || '-'}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                <span className="font-medium whitespace-nowrap">What to Print</span>
                <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_printLabel || selectedTransaction.print_type || '-'}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                <span className="font-medium whitespace-nowrap">Purpose</span>
                <span className="whitespace-nowrap md:mb-0 mb-1">{selectedTransaction.bus_purposeLabel || selectedTransaction.purpose_type || '-'}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                <span className="font-medium whitespace-nowrap">Valid ID to Present Upon Claiming</span>
                <span className="whitespace-nowrap md:mb-7 mb-1">{selectedTransaction.bus_valididLabel || selectedTransaction.valid_id || '-'}</span>
              </div>
          
                
            
        
              
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
                {/* {selectedTransaction.time ? (
                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">Reference Number</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1">-</span>
                </div>
                ) : null} */}
                {transaction_id ? (
                <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                  <span className="font-medium whitespace-nowrap">Status</span>
                  <span className="whitespace-nowrap md:mb-0 mb-1 text-xs py-0.5 font-semibold rounded-full bg-emerald-200 text-emerald-800 w-24">{selectedTransaction.status_type}</span>
                </div>
                ) : null}

                </div>

            </div>
          </div>


          

          {/* Right Modal */}
          <div className="absolute right-0 w-1/2 h-full bg-gray-500 opacity-75"></div>
          <div className="absolute right-0 flex items-center justify-center w-1/2 h-full">
            <div className="inline-block bg-white dark:bg-[#212121] rounded-sm text-center overflow-hidden overflow-y-auto shadow-xl transform transition-all">
            <div className="dark:bg-[#212121] pt-3 pb-1 items-center">
              <button type="button" onClick={handleConfirmClose} className="float-right text-slate-500 text-xs md:text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:w-5 md:h-5 w-4 h-4 mr-1">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
              <div className="bg-white dark:bg-[#212121] mx-2 pt-5 pb-4 sm:p-6 sm:pb-4 h-96"> 
                <div className="md:px-40 px-4 pt-5 pb-0 sm:p-6 sm:pb-0 dark:text-white">
                  <div className="mb-6">
                  <span className="font-bold md:text-lg text-sm">Business Permit Charges</span>
                  </div>
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_1" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">R E SUB-LESSOR</label>
                  <input value={values.bp_1} onChange={handleChange} type="text" name="bp_1" id="bp_1" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_2" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">PERMIT FEE - R E SUB-LESSOR</label>
                  <input value={values.bp_2} onChange={handleChange} type="text" name="bp_2" id="bp_2" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_3" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">GARBAGE FEE</label>
                  <input value={values.bp_3} onChange={handleChange} type="text" name="bp_3" id="bp_3" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_4" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">SANITARY INSPECTION FEE</label>
                  <input value={values.bp_4} onChange={handleChange} type="text" name="bp_4" id="bp_4" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_5" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">OCCUPATIONAL TAX</label>
                  <input value={values.bp_5} onChange={handleChange} type="text" name="bp_5" id="bp_5" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_6" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">BUILDING INSP FEE</label>
                  <input value={values.bp_6} onChange={handleChange} type="text" name="bp_6" id="bp_6" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_7" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">ELECTRICAL INSP FEE</label>
                  <input value={values.bp_7} onChange={handleChange} type="text" name="bp_7" id="bp_7" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_8" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">SIGNBOARD INSP FEE</label>
                  <input value={values.bp_8} onChange={handleChange} type="text" name="bp_8" id="bp_8" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_9" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">PLUMBING INSP FEE</label>
                  <input value={values.bp_9} onChange={handleChange} type="text" name="bp_9" id="bp_9" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_10" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">SIGNBOARD PERMIT FEE</label>
                  <input value={values.bp_10} onChange={handleChange} type="text" name="bp_10" id="bp_10" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_11" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">FIRE SAFETY INSPECTION FEE</label>
                  <input value={values.bp_11} onChange={handleChange} type="text" name="bp_11" id="bp_11" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_12" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">OCC / PC / HC / APP</label>
                  <input value={values.bp_12} onChange={handleChange} type="text" name="bp_12" id="bp_12" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_13" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">ZONING INSPECTION FEE</label>
                  <input value={values.bp_13} onChange={handleChange} type="text" name="bp_13" id="bp_13" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_14" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">ZONING APPLICATION FEE</label>
                  <input value={values.bp_14} onChange={handleChange} type="text" name="bp_14" id="bp_14" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_15" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">ZONING PROCESSING FEE</label>
                  <input value={values.bp_15} onChange={handleChange} type="text" name="bp_15" id="bp_15" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_16" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">CTC / C & C1</label>
                  <input value={values.bp_16} onChange={handleChange} type="text" name="bp_16" id="bp_16" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="mt-2">
                  <label htmlFor="bp_17" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">BARANGAY BUSINESS CLEARANCE</label>
                  <input value={values.bp_17} onChange={handleChange} type="text" name="bp_17" id="bp_17" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                </div>
                <div className="font-semibold flex space-x-2 text-slate-700 text-start py-8 dark:text-white sm:mt-0 text-xs md:text-sm" id="modal-headline">
                  <span>Total :</span>
                  <span className='font-normal'>P {totalVal}.00</span>
                </div>
                
                {/* Button container */}
                <div className="flex justify-center pb-8 space-x-2">
                  {isLoading ? (
                    <div className="bg-white dark:bg-[#212121] text-slate-700 dark:text-white px-1 pb-1 mt-[-10px]">
                      <Loading />
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={handleConfirmClose}
                        type="button"
                        className="text-slate-500 text-xs md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-sm px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                      >
                        <p>Cancel</p>
                      </button>

                      <button
                        onClick={(e) => handleProcess(e, totalVal)}
                        type="button"
                        className="text-white text-xs md:text-sm bg-emerald-500 border border-emerald-500 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-normal rounded-sm px-5 py-2 text-center mb-2 dark:border-emerald-700 dark:text-white dark:hover:text-white dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                      >
                        Confirm
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
      
          </div>
    )
  );
};



export default AdminBPCharges;
