import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment.js';
import StatusBadgeMobile from '../StatusBadgeMobile';

const BusinessModal = ({ selectedTransaction, businessData, businessImages, onClose, onSubmit }) => {
  

  const getBusinessType = () => {
    switch (selectedTransaction.bus_type) {
      case 1:
        return 'Sole Proprietorship';
      case 2:
        return 'One Person Corporation';
      case 3:
        return 'Partnership';
      case 4:
        return 'Corporation';
      case 5:
        return 'Cooperative';
      default:
        return 'Unknown Business Type';
    }
  };

  const busType = getBusinessType();

  const getOwnership = () => {
    switch (selectedTransaction.owned) {
      case "1":
        return 'Rental';
      case "2":
        return 'Owned';
      default:
        return 'Unknown Ownership';
    }
  };

  const ownership = getOwnership();

  const getOffice = () => {
    switch (selectedTransaction.bus_activity) {
      case "1":
        return 'Main Office';
      case "2":
        return 'Branch Office';
      case "3":
        return 'Admin Office Only';
      case "4":
        return 'Warehouse';
      case "5":
        return selectedTransaction.bus_office || 'Unknown Office';
      default:
        return 'Unknown Ownership';
    }
  };

  const office = getOffice();

  const { transaction_id, status_type, date_processed } = selectedTransaction;

  const date = moment(date_processed).format('MMMM D, YYYY');
  const time = moment(date_processed).format('h:mm A');

  const [businessTransaction, setBusinessTransaction] = useState({});

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
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_type ? businessTransaction.bus_type : '-'}</span>
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
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Suffix</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_suffix ? businessTransaction.bus_suffix : '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Sex</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_sex ? businessTransaction.bus_sex : '-'}</span>
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
                            <span className="whitespace-nowrap md:mb-0 mb-1">{ownership ? ownership : '-'}</span>
                          </div>

                          {ownership === 'Rental' ? (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Lessor Name</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_lessor || businessTransaction.bus_lessor || '-'}</span>
                          </div>
                          ) : null}

                          {ownership === 'Rental' ? (
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Monthly Rental</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_rent || businessTransaction.bus_rent || '-'}</span>
                          </div>
                          ) : null}

                          <br />
                          
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Incentives from any Government Entity</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessImages && businessImages.bus_tax_incentives ? businessImages.bus_tax_incentives : '-'}</span>
                          </div>

                          <br />

                          <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                            <span className="font-semibold whitespace-nowrap">Business Activity</span>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Business Office</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{office ? office : '-'}</span>
                          </div>

                          <div className='border-t dark:border-gray-500'></div>
                          {businessData && businessData.map((business, index) => (
                            <div key={index}>
                              <div className="flex flex-col sm:flex-row items-start justify-between my-1">
                                <span className="font-medium whitespace-nowrap">Line of Business</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_line || businessTransaction.bus_line || '-'}</span>
                              </div>
                              <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">PSIC</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_psic || businessTransaction.bus_psic || '-'}</span>
                              </div>
                              <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Products/Services</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_products || businessTransaction.bus_products || '-'}</span>
                              </div>
                              <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">No. of units</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_units_no || businessTransaction.bus_units_no || '-'}</span>
                              </div>
                              <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                                <span className="font-medium whitespace-nowrap">Total Capitalization</span>
                                <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_total_cap || businessTransaction.bus_total_cap || '-'}</span>
                              </div>
                              <div className='border-t dark:border-gray-500'></div>
                            </div>
                          ))}
                          
                          <br />

                          <div className="flex flex-col sm:flex-row md:items-center md:justify-center items-start justify-between mb-1">
                            <span className="font-semibold whitespace-nowrap">Business Requirements</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">DTI Registration</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessImages && businessImages.bus_dti_reg ? businessImages.bus_dti_reg : '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">R.P. Tax Declaration for Land</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessImages && businessImages.bus_rptax_decbldg ? businessImages.bus_rptax_decbldg : '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Paid-up and Subscribed Page</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessImages && businessImages.bus_sec_paid ? businessImages.bus_sec_paid : '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Articles of Primary and Secondary Purpose</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessImages && businessImages.bus_sec_articles ? businessImages.bus_sec_articles : '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">NGA-Contract of Lease</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessImages && businessImages.bus_nga ? businessImages.bus_nga : '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">SEC Registration</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessImages && businessImages.bus_sec_front ? businessImages.bus_sec_front : '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">R.P. Tax Declaration for Building</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessImages && businessImages.bus_rptax_decland ? businessImages.bus_rptax_decland : '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Fire Safety Inspection Certificate</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessImages && businessImages.bus_fire ? businessImages.bus_fire : '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Page 2 Document</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessImages && businessImages.bus_page2 ? businessImages.bus_page2 : '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Page 3 Document</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessImages && businessImages.bus_page3 ? businessImages.bus_page3 : '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Page 4 Document</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessImages && businessImages.bus_page4 ? businessImages.bus_page4 : '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">Page 5 Document</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessImages && businessImages.bus_page5 ? businessImages.bus_page5 : '-'}</span>
                          </div>

                          <br />

                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">No. of Copies</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_nocopies || businessTransaction.copies || '-'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-1">
                            <span className="font-medium whitespace-nowrap">What to Print</span>
                            <span className="whitespace-nowrap md:mb-0 mb-1">{businessTransaction.bus_print || businessTransaction.print_type || '-'}</span>
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
                            <StatusBadgeMobile statusType={status_type} />
                          </div>
                          ) : null}

                          <hr className='mt-7 mb-1'/>
                          <div className="flex justify-between">
                            <span className="font-semibold whitespace-nowrap">Amount to Pay</span>
                            <span className="font-semibold whitespace-nowrap ml-4"> {businessTransaction && (
                              `P ${businessTransaction.bus_amount !== undefined ? businessTransaction.bus_amount + '.00' : 
                            businessTransaction.amount !== undefined ? businessTransaction.amount + '.00' : '-'}`
                            )}</span>
                          </div>
                        </div>

                <div className="bg-white dark:bg-[#212121] mr-0 md:mr-2 px-4 pt-3 pb-5 gap-3 sm:px-6 flex items-center justify-between">
                  {/* <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Sample_EPC_QR_code.png" alt="QR Code" className="w-20 h-20 mr-3"/> */}

                  {status_type !== 'Paid' && (
                    <button
                      onClick={makePayment}
                      type="button"
                      className="text-slate-500 text-xs text-center px-5 py-2 mb-0 md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                    >
                      <span className="font-semibold whitespace-nowrap ml-2"> PAY: {selectedTransaction.amount ? selectedTransaction.amount + '.00' : '-'}</span>
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

                      {businessTransaction.transaction_id ? null : (
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
