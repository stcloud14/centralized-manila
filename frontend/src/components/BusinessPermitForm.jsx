import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import {Link} from "react-router-dom"


import { useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Req from '../partials/misc/RequiredFieldIndicator';

import CityDropdown from '../partials/profile/CityDropdown';
import RegionDropdown from '../partials/profile/RegionDropdown';
import ProvinceDropdown from '../partials/profile/ProvinceDropdown';

const BusinessPermitForm =()=>{

  const location = useLocation();
  const { pathname } = location;
  const user_id = pathname.split("/")[2];

  const [busPermit, setBusPermit] = useState((prevData) => ({
    ...prevData,
    bus_amount: 0,
    initialPrint: 0,
    printDisplay: 0,
    bus_regionLabel: '',
    bus_provinceLabel: '',
    bus_cityLabel: '',
    bus_bregionLabel: '',
    bus_bprovinceLabel: '',
    bus_bcityLabel: '',
    bus_purposeLabel: '',
    bus_valididLabel: '',
    bus_office_partial: '',
    bus_office: '1',
    bus_incentive: '1',
    owned: '2',
  }));


  const [renderRows, setRenderRows] = useState(false);
  const [busRowData, setBusRowData] = useState([]);
  console.log(busRowData)

 
  const handleAddButtonClick = () => {
    setRenderRows(true);
    addBusRow();
    setBusRowData(prevData => {
      return prevData.map(row => ({
        bus_line: '',
        bus_psic: '',
        bus_products: '',
        bus_units_no: '',
        bus_total_cap: '',
      }));
    });
  };

  const addBusRow = () => {
    const newBusRow = {
      bus_line: '',
      bus_psic: '',
      bus_products: '',
      bus_units_no: '',
      bus_total_cap: '',
    };
    
    if (Object.values(newBusRow).some(value => value !== '')) {
      setBusRowData(prevData => [...prevData, newBusRow]);
    }
  };

  const updateCellValue = (rowIndex, columnName, value) => {
    setBusRowData(prevData => {
      const updatedData = [...prevData];
      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        [columnName]: value,
      };
      return updatedData;
    });
  };

  const handleRowChange = (event, rowIndex, columnName) => {
    const { value } = event.target;
    updateCellValue(rowIndex, columnName, value);
  };

  

  

  
  const [isSuccess, setIsSuccess] = useState(false);

  const contentRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`http://localhost:8800/buspermit/${user_id}`, busPermit);
  
      // Check the response status before proceeding
      if (response.status === 200) {
        setIsSuccess(true); // Set success state to true
        handleCloseModal(); // Close the modal
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('Transaction successful');
  
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        console.error('Transaction error:', response.statusText);
      }
    } catch (err) {
      console.error('Transaction error:', err);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleProceed = (e) => {
    e.preventDefault();
    
    // Please fill up the necessary forms
  const requiredFields = [
    'bus_type',
    'bus_name',
    // 'bus_franchise',
    // 'bus_reg_no',
    // 'bus_tin',
    // 'bus_lname',
    // 'bus_fname',
    // 'bus_mname',
    // 'bus_suffix',
    // 'bus_sex',
    // 'bus_email',
    // 'bus_tel_no',
    // 'bus_mobile_no',
    // 'bus_bregion',
    // 'bus_bprovince',
    // 'bus_bcity',
    // 'bus_bbrgy',
    // 'bus_bhnum',
    // 'bus_bstreet',
    // 'bus_bzip',
    // 'bus_floor',
    // 'bus_emp',
    // 'bus_male_emp',
    // 'bus_female_emp',
    // 'bus_van_no',
    // 'bus_truck_no',
    // 'bus_motor_no',
    // 'bus_region',
    // 'bus_province',
    // 'bus_city',
    // 'bus_brgy',
    // 'bus_hnum',
    // 'bus_street',
    // 'bus_zip',
    // 'bus_lessor',
    // 'bus_rent',
    // 'bus_office',
    // 'bus_line',
    // 'bus_psic',
    // 'bus_products',
    // 'bus_units_no',
    // 'bus_total_cap',
    // 'bus_validid',
    // 'bus_tax_incentives',
    // 'bus_dti_reg',
    // 'bus_rptax_decbldg',
    // 'bus_sec_paid',
    // 'bus_sec_articles',
    // 'bus_nga',
    // 'bus_sec_front',
    // 'bus_rptax_decland',
    // 'bus_fire',
    // 'bus_page2',
    // 'bus_page3',
    // 'bus_page4',
    // 'bus_page5',

    // 'bus_nocopies',
    // 'bus_print',
    // 'bus_purpose',
    // 'bus_amount',
  ]; //The input fields that is required
  const isIncomplete = requiredFields.some((field) => !busPermit[field]);

  if (isIncomplete) {
    contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });    
    setShowWarning(true); // Show warning message and prevent opening the modal
    
    setTimeout(() => {
      setShowWarning(false); // Set a timer to hide the warning message after 4 seconds
    }, 4000);
  } else {
    
    setIsModalOpen(true);// Proceed to open the modal
  }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowWarning(false);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);


  const handleInputChange = (e) => {
    const { id, name, value } = e.target;
    const updatedValue = isNaN(value) ? value.toUpperCase() : value;
  
    setBusPermit((prevData) => {

      if (id === 'bus_reg_no' 
      || id === 'bus_tin'
      || id === 'bus_tel_no'
      || id === 'bus_mobile_no'
      || id === 'bus_zip'
      || id === 'bus_floor'
      || id === 'bus_emp'
      || id === 'bus_male_emp'
      || id === 'bus_female_emp'
      || id === 'bus_van_no'
      || id === 'bus_truck_no'
      || id === 'bus_motor_no'
      || id === 'bus_bzip'
      || id === 'bus_rent'
      || id === 'bus_psic'
      || id === 'bus_units_no'
      || id === 'bus_total_cap') {
        const formattedValue = value.replace(/\D/g, '');

        return {
          ...prevData,
          [id]: formattedValue,
        };
      } 

      if (id === 'bus_type') {
        const Value = parseInt(value, 10) || 0;

        return {
          ...prevData,
          [id]: Value,
        };
      } 

      if (name === 'bus_activity') {
        
        return {
          ...prevData,
          [name]: value,
          bus_office: value,
          bus_office_partial: '',
        };
      } 
      
      if (name === 'bus_office_partial') {
        
        return {
          ...prevData,
          [name]: updatedValue,
          bus_office: updatedValue,
        };
      } 

      if (name === 'owned') {
        
        return {
          ...prevData,
          [name]: value,
        };
      } 

      if (name === 'bus_incentive') {
        
        return {
          ...prevData,
          [name]: value,
        };
      } 

      if (id === 'bus_nocopies') {
        const initialValue = parseInt(value, 10) || 0;
        const displayValue = prevData.initialPrint || 0;
        const product = initialValue * displayValue;
        const totalAmountPaid = updateTotalAmount(product);

        return {
          ...prevData,
          [id]: initialValue,
          bus_amount: totalAmountPaid,
          printDisplay: product,
        };
      } 
      
      if (id === 'bus_print') {
        const displayValue = updateAmount({ value });
        const copiesValue = prevData.bus_nocopies || 0;
        const product = copiesValue * displayValue;
        const totalAmountPaid = updateTotalAmount(product);
        return {
          ...prevData,
          [id]: value,
          bus_amount: totalAmountPaid,
          initialPrint: displayValue,
          printDisplay: product,
        };
      }

      if (id === 'bus_region') {

        const label = e.target.options[e.target.selectedIndex].text;
        const Value = parseInt(value, 10) || 0;
        
        return {
          ...prevData,
          [id]: Value,
          bus_province: '',
          bus_city: '',
          bus_regionLabel: label,
        };
      }

      if (id === 'bus_province') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          bus_provinceLabel: label,
        };
      }

      if (id === 'bus_city') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          bus_cityLabel: label,
        };
      }
      
      if (id === 'bus_bregion') {

        const label = e.target.options[e.target.selectedIndex].text;
        const Value = parseInt(value, 10) || 0;
        
        return {
          ...prevData,
          [id]: Value,
          bus_bprovince: '',
          bus_bcity: '',
          bus_bregionLabel: label,
        };
      }

      if (id === 'bus_bprovince') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          bus_bprovinceLabel: label,
        };
      }

      if (id === 'bus_bcity') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          bus_bcityLabel: label,
        };
      }

      if (id === 'bus_purpose') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          bus_purposeLabel: label,
        };
      }
      
      if (id === 'bus_validid') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          bus_valididLabel: label,
        };
      }

      else {
        return {
          ...prevData,
          [id]: updatedValue,
        };
      }
    });
  };


  function updateAmount({ value }) {

    switch (value) {
      case 'Front':
      case 'Back':
        return 50;
  
      case 'Front and Back':
        return 100;
  
      default:
        return 0;
    }
  }
  
  
  function updateTotalAmount(product) {
    if (product > 0) {
      return product + 50;
    } else {
      return 0;
    }
  }
  
  console.log(busPermit)


  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
                 
           
            <form onSubmit={handleSubmit}>
            <h1 className='font-medium text-center text-slate-700 dark:text-white'>Business</h1>
            <h1 className='mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300'>Business Permit</h1>
            <h1 className='text-xs text-slate-700 dark:text-white mt-8'>All fields mark with <Req /> are required.</h1>

            {isSuccess && (
              <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                Transaction success on Business Permit!
              </div>
            )}  

            {/* {showWarning && (
            <div className="text-yellow-600 bg-yellow-100 md:text-sm text-xs text-center rounded-full py-1.5 mb-5">
              Please fill in all required fields before proceeding.
            </div>
            )}  */}


              {/* Group 1 - Business Information and Registration*/}
              <div className='pt-0.5'>
                {/* Row 1 */}
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Business Information and Registration</h1>
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_type} name="bus_type" id="bus_type" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <option value="0" className='dark:bg-[#3d3d3d]'>Select Business Type</option>
                      <option value="1" className='dark:bg-[#3d3d3d]'>Sole Proprietorship</option>
                      <option value="2" className='dark:bg-[#3d3d3d]'>One Person Corporation</option>
                      <option value="3" className='dark:bg-[#3d3d3d]'>Partnership</option>
                      <option value="4" className='dark:bg-[#3d3d3d]'>Corporation</option>
                      <option value="5" className='dark:bg-[#3d3d3d]'>Cooperative</option>
                    </select>
                    <label htmlFor="bus_type" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Business Type<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_name} type="text" name="bus_name" id="bus_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Business Name<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_franchise} type="text" name="bus_franchise" id="bus_franchise" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_franchise" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Trade Name / Franchise (If Applicable)</label>
                  </div>
                </div>
              
                {/* Row 2 */}
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_reg_no} type="text" name="bus_reg_no" id="bus_reg_no" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_reg_no" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">DTI / SEC / CDA Registration No.<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_tin} type="text" name="bus_tin" id="bus_tin" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_tin" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tax Identification Number (TIN)<Req /></label>
                  </div>
                </div>
              </div>

              {/* Group 2 - Owner’s Information */}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Owner’s Information</h1>
                <div className="grid md:grid-cols-8 md:gap-6">
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <input onChange={handleInputChange} value={busPermit.bus_lname} type="text" name="bus_lname" id="bus_lname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_lname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <input onChange={handleInputChange} value={busPermit.bus_fname} type="text" name="bus_fname" id="bus_fname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_fname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <input onChange={handleInputChange} value={busPermit.bus_mname} type="text" name="bus_mname" id="bus_mname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_mname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Middle Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_suffix} name="bus_suffix" id="bus_suffix" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                        <option value="0" className='dark:bg-[#3d3d3d]'>Select Suffix</option>
                        <option value="SR."className='dark:bg-[#3d3d3d]'>Sr.</option>
                        <option value="JR."className='dark:bg-[#3d3d3d]'>Jr.</option>
                        <option value="II"className='dark:bg-[#3d3d3d]'>II</option>
                        <option value="III"className='dark:bg-[#3d3d3d]'>III</option>
                        <option value="IV"className='dark:bg-[#3d3d3d]'>IV</option>
                        <option value="V"className='dark:bg-[#3d3d3d]'>V</option>
                        <option value="VI"className='dark:bg-[#3d3d3d]'>VI</option>
                        <option value="VII"className='dark:bg-[#3d3d3d]'>VII</option>
                        <option value="VIII"className='dark:bg-[#3d3d3d]'>VIII</option>
                        <option value="IX"className='dark:bg-[#3d3d3d]'>IX</option>
                        <option value="X"className='dark:bg-[#3d3d3d]'>X</option>
                    </select>
                    <label htmlFor="bus_suffix" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Suffix</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_sex} name="bus_sex" id="bus_sex" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <option value="0" className='dark:bg-[#3d3d3d]'>Select Sex</option>
                      <option value="MALE" className='dark:bg-[#3d3d3d]'>Male</option>
                      <option value="FEMALE"className='dark:bg-[#3d3d3d]'>Female</option>
                    </select>
                    <label htmlFor="bus_sex" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sex<Req /></label>
                  </div>
                </div>
              </div>

              {/* Group 3 - Contact Information*/}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Contact Information</h1>
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_email} type="text" name="bus_email" id="bus_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_tel_no} type="text" name="bus_tel_no" id="bus_tel_no" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_tel_no" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telephone Number</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_mobile_no} type="text" name="bus_mobile_no" id="bus_mobile_no" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_mobile_no" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile Number<Req /></label>
                  </div>
                </div>
              </div>

              {/* Group 4 - Business Address */}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Business Address</h1>
                {/* Row 1 */}
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_bregion} name="bus_bregion" id="bus_bregion" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <RegionDropdown />
                    </select>
                    <label htmlFor="bus_bregion" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Region<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_bprovince} name="bus_bprovince" id="bus_bprovince" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <ProvinceDropdown selectedRegion={busPermit.bus_bregion} /> 
                    </select>
                    <label htmlFor="bus_bprovince" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Province<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_bcity} name="bus_bcity" id="bus_bcity" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <CityDropdown selectedProvince={busPermit.bus_bprovince} />
                    </select>
                    <label htmlFor="bus_bcity" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City<Req /></label>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid md:grid-cols-7 md:gap-6">
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <input onChange={handleInputChange} value={busPermit.bus_bbrgy} type="text" name="bus_bbrgy" id="bus_bbrgy" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_bbrgy" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Barangay<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <input onChange={handleInputChange} value={busPermit.bus_bhnum} type="text" name="bus_bhnum" id="bus_bhnum" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_bhnum" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">House No. / Unit Floor<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <input onChange={handleInputChange} value={busPermit.bus_bstreet} type="text" name="bus_bstreet" id="bus_bstreet" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_bstreet" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Street / Building Name<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_bzip} type="text" name="bus_bzip" id="bus_bzip" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_bzip" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Zip Code<Req /></label>
                  </div>
                </div>
              </div>

              {/* Group 5 - Business Operation*/}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Business Operation</h1>
                {/* Row 1 */}
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_floor} type="text" name="bus_floor" id="bus_floor" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_floor" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Business Area / Total Floor Area (sq.m)<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_emp} type="text" name="bus_emp" id="bus_emp" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_emp" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No. of Employees Residing Within Manila<Req /></label>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_male_emp} type="text" name="bus_male_emp" id="bus_male_emp" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_male_emp" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Total No. of Male Employees<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_female_emp} type="text" name="bus_female_emp" id="bus_female_emp" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_female_emp" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Total No. of Female Employees<Req /></label>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_van_no} type="text" name="bus_van_no" id="bus_van_no" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_van_no" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No. of Van Delivery Vehicles<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_truck_no} type="text" name="bus_truck_no" id="bus_truck_no" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_truck_no" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No. of Truck Delivery Vehicles<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_motor_no} type="text" name="bus_motor_no" id="bus_motor_no" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_motor_no" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No. of Motorcycle Delivery Vehicles<Req /></label>
                  </div>
                </div>
              </div>

              {/* Group 6 - Taxpayer's Address */}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Taxpayer's Address</h1>
                {/* Row 1 */}
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_region} name="bus_region" id="bus_region" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <RegionDropdown />
                    </select>
                    <label htmlFor="bus_region" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Region<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_province} name="bus_province" id="bus_province" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <ProvinceDropdown selectedRegion={busPermit.bus_region} />
                    </select>
                    <label htmlFor="bus_province" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Province<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_city} name="bus_city" id="bus_city" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <CityDropdown selectedProvince={busPermit.bus_province} />
                    </select>
                    <label htmlFor="bus_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City<Req /></label>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid md:grid-cols-7 md:gap-6">
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <input onChange={handleInputChange} value={busPermit.bus_brgy} type="text" name="bus_brgy" id="bus_brgy" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_brgy" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Barangay<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <input onChange={handleInputChange} value={busPermit.bus_hnum} type="text" name="bus_hnum" id="bus_hnum" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_hnum" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">House No. / Unit Floor<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <input onChange={handleInputChange} value={busPermit.bus_street} type="text" name="bus_street" id="bus_street" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_street" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Street / Building Name<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_zip} type="text" name="bus_zip" id="bus_zip" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_zip" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Zip Code<Req /></label>
                  </div>
                </div>
              </div>

              {/* Group 7 - Owned Radio Button */}
              <div onChange={handleInputChange} name="owned" className="mt-6 flex items-center text-sm">
                <span className="text-gray-700 dark:text-white mr-9">Is this owned?</span>
                <input value='1' type="radio" name="owned" className="border-gray-500 mr-2 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
                <label htmlFor="owned_no" className="text-gray-700 dark:text-white mr-6">No</label>

                <input value='2' defaultChecked type="radio" name="owned"className="border-gray-500 mr-2 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
                <label htmlFor="owned_yes" className="text-gray-700 dark:text-white">Yes</label>
              </div>

              {/* Group 8 - Owned */}
              <div className='pt-3'>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_lessor} disabled={busPermit.owned !== '1'} type="text" name="bus_lessor" id="bus_lessor" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_lessor" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Lessor Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={busPermit.bus_rent} disabled={busPermit.owned !== '1'} type="text" name="bus_rent" id="bus_rent" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_rent" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Monthly Rental</label>
                  </div>
                </div>
              </div>

              {/* Group 9 - Tax Incentives */}
              <div className="flex flex-col mt-11 md:flex-row text-sm text-gray-700 dark:text-white md:items-center items-start">
                <span className="mb-2 md:mb-0">Tax Incentives from any Government Entity</span>

                <div onChange={handleInputChange} name="bus_incentive" className="flex mb-2 md:mb-0">
                  <label className="mr-2">
                    <input value='1' type="radio" name="bus_incentive" defaultChecked className="border border-gray-500 md:ml-4 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                    <span className="ml-1.5">No</span>
                  </label>
                  <label>
                    <input value='2' type="radio" name="bus_incentive" className="border border-gray-500 ml-4 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                    <span className="ml-1.5">Yes</span>
                  </label>
                </div>

                {busPermit.bus_incentive === '2' ? (
                <div className="group md:ml-9">
                  <a
                    className="flex justify-center pl-3 items-center text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full"
                    href=""
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                    </svg>
                    <span className="md:text-sm text-xs font-normal pl-1 pr-3 py-0.5">Upload</span>
                  </a>
                </div>
                ) : null}
              </div>

              {/* Group 10 - Business Activity*/}
              <div className="pt-12 text-slate-700 dark:text-white">
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Business Activity</h1>
                {/* Row 1 */}
                <div onChange={handleInputChange} name="bus_activity" className="flex flex-col md:flex-row md:items-center text-sm items-start">
                  <label htmlFor="bus_mainoffice" className="flex items-center mb-2 md:mb-0 md:mx-auto">
                    <input value="1" type="radio" name="bus_activity" defaultChecked className="border border-gray-500 mr-2 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                    Main Office
                  </label>

                  <label htmlFor="bus_branchoffice" className="flex items-center mb-2 md:mb-0 md:mx-auto">
                    <input value="2" type="radio" name="bus_activity" className="border-gray-500 mr-2 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                    Branch Office
                  </label>

                  <label htmlFor="bus_adminoffice" className="flex items-center mb-2 md:mb-0 md:mx-auto">
                    <input value="3" type="radio" name="bus_activity" className="border border-gray-500 mr-2 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                    Admin Office Only
                  </label>

                  <label htmlFor="bus_warehouse" className="flex items-center mb-2 md:mb-0 md:mx-auto">
                    <input value="4" type="radio" name="bus_activity" className="border border-gray-500 mr-2 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                    Warehouse
                  </label>

                  <div className="flex items-center md:mr-6">
                    <input value="5" type="radio" name="bus_activity" className="border border-gray-500 mr-2 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                    Others:
                    <input onChange={handleInputChange} value={busPermit.bus_office_partial} disabled={busPermit.bus_activity !== '5'} type="text" name="bus_office_partial" id="bus_office_partial" className="block px-0 ml-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Specify" required/>
                  </div>
                </div>
                {/* Row 2 */} 
                <div className="grid md:grid-cols-11 md:gap-6 mt-6">
                  <div className="relative z-0 w-full md:col-span-2 mb-6 group">
                    <input value={busRowData.bus_line} onChange={(e) => handleRowChange(e, 0, 'bus_line')} type="text" name="bus_line" id="bus_line" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_line" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Line of Business <Req /></label>
                  </div>
                  <div className="relative z-0 w-full md:col-span-2 mb-6 group">
                    <input value={busRowData.bus_psic} onChange={(e) => handleRowChange(e, 0, 'bus_psic')} type="text" name="bus_psic" id="bus_psic" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_psic" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">PSIC</label>
                  </div>
                  <div className="relative z-0 w-full md:col-span-2 mb-6 group">
                    <input value={busRowData.bus_products} onChange={(e) => handleRowChange(e, 0, 'bus_products')} type="text" name="bus_products" id="bus_products" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_products" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Products / Services</label>
                  </div>
                  <div className="relative z-0 w-full md:col-span-2 mb-6 group">
                    <input value={busRowData.bus_units_no} onChange={(e) => handleRowChange(e, 0, 'bus_units_no')} type="text" name="bus_units_no" id="bus_units_no" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_units_no" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No. of Units</label>
                  </div>
                  <div className="relative z-0 w-full md:col-span-2 mb-6 group">
                    <input value={busRowData.bus_total_cap} onChange={(e) => handleRowChange(e, 0, 'bus_total_cap')} type="text" name="bus_total_cap" id="bus_total_cap" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_total_cap" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Total Capitalization (PH)<Req /></label>
                  </div>
                  <div onClick={handleAddButtonClick} className="relative z-0 w-full md:col-span-1 mb-6 group">
                    <a className="flex justify-center mt-3 px-3 py-1 text-sm text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                      + Add
                    </a>
                  </div>
                </div>

                <div className="relative overflow-x-auto shadow-md md:rounded-lg rounded-md">
                  <table className="w-full text-left text-xs md:text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-gray-700 uppercase bg-slate-200 dark:bg-[#212121] dark:text-slate-400">
                      <tr>
                        <th scope="col" className="pl-6 pr-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                          Line of Business
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                          Philippine Standard Industrial Code
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                          Products/Services
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                          No. of Units
                        </th>
                        <th scope="col" className="pl-3 pr-0 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                          Total Capitalization (PH)
                        </th>
                        <th scope="col" className="px-3pr-0 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                          {/* View Details*/}
                        </th>
                      </tr>
                    </thead>
                    {renderRows && busRowData.length > 0 && (
                    <tbody>
                    {busRowData.map((rowData, rowIndex) => (
                      <tr key={rowIndex} className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="pl-6 pr-3 py-2 whitespace-nowrap">
                          {rowData.bus_line}
                        </td>
                        <td className="pl-3 pr-0 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                          {rowData.bus_psic}
                        </td>
                        <td className="pl-3 pr-0 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                          {rowData.bus_products}
                        </td>
                        <td className="pl-3 pr-0 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                          {rowData.bus_units_no}
                        </td>
                        <td className="pl-3 pr-0 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                          {rowData.bus_total_cap}
                        </td>
                        <td className="md:px-0 px-4 py-2 whitespace-nowrap text-xs md:text-sm font-medium">
                          <div className="flex space-x-3">
                            <a className="group flex justify-center items-center text-center p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full cursor-pointer" >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path className="stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                            </a>
                            <a className="group flex justify-center items-center text-center p-2 bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer" >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            </a>  
                          </div>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                    )}
                  </table>
                </div>
              </div>

              {/* Group 11 - Business Requirements*/}
              <div className="pt-12 text-slate-700 dark:text-white">
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Business Requirements</h1>
                {/* Row 1 */}
                {/* <div className="grid md:grid-cols-3 md:gap-6 mt-4">
                  <div className="relative z-0 w-full md:col-span-1 mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_validid} name="bus_validid" id="bus_validid" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <option value="0" className='dark:bg-[#3d3d3d]'>Select Valid ID to Present Upon Claiming</option>
                      <option className='dark:bg-[#3d3d3d]'>SSS</option>
                      <option className='dark:bg-[#3d3d3d]'>UMID</option>
                      <option className='dark:bg-[#3d3d3d]'>PHILHEALTH</option>
                      <option className='dark:bg-[#3d3d3d]'>DRIVER'S LICENSE</option>
                      <option className='dark:bg-[#3d3d3d]'>VOTER'S ID</option>
                      <option className='dark:bg-[#3d3d3d]'>SENIOR CITIZEN'S ID</option>
                      <option className='dark:bg-[#3d3d3d]'>POSTAL ID</option>
                      <option className='dark:bg-[#3d3d3d]'>BARANGAY ID</option>
                      <option className='dark:bg-[#3d3d3d]'>AUTHORIZATION LETTER</option>
                    </select>
                    <label htmlFor="bus_validid" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valid ID to present upon claiming license<Req /></label>
                  </div>
                </div> */}
                {/* Row 2 */}
                <div className="relative overflow-x-auto shadow-md md:rounded-lg rounded-md">
                  <table className="w-full text-left text-xs md:text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                    <colgroup>
                        <col width="90%"/>
                        <col width="10%"/>
                    </colgroup>
                    <tbody>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                          DTI Registration
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <a href="" className="flex justify-center pl-3 items-center text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                            </svg>
                            <span className="md:text-sm text-xs font-normal pl-1 pr-3 py-0.5">Upload</span>
                          </a>
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2">
                          R.P. Tax Declaration for Land (Upload if copy is available. If not, indicate TDN or PIN on the UAF to include fee on eSOA)
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <a href="" className="flex justify-center pl-3 items-center text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                            </svg>
                            <span className="md:text-sm text-xs font-normal pl-1 pr-3 py-0.5">Upload</span>
                          </a>
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                          SEC Registration - Paid-up and Subscribed Page
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <a href="" className="flex justify-center pl-3 items-center text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                            </svg>
                            <span className="md:text-sm text-xs font-normal pl-1 pr-3 py-0.5">Upload</span>
                          </a>
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2">
                            SEC Registration - Articles of Primary and Secondary Purpose
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <a href="" className="flex justify-center pl-3 items-center text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                            </svg>
                            <span className="md:text-sm text-xs font-normal pl-1 pr-3 py-0.5">Upload</span>
                          </a>
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            NGA-Contract of Lease - Page Indicating Names and Floor Area - sqrm
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <a href="" className="flex justify-center pl-3 items-center text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                            </svg>
                            <span className="md:text-sm text-xs font-normal pl-1 pr-3 py-0.5">Upload</span>
                          </a>
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            SEC Registration - Front Page
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <a href="" className="flex justify-center pl-3 items-center text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                            </svg>
                            <span className="md:text-sm text-xs font-normal pl-1 pr-3 py-0.5">Upload</span>
                          </a>
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            R.P. Tax Declaration for Building (Upload if copy is available. If not, indicate TDN or PIN on the UAF to include fee on eSOA)
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <a href="" className="flex justify-center pl-3 items-center text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                            </svg>
                            <span className="md:text-sm text-xs font-normal pl-1 pr-3 py-0.5">Upload</span>
                          </a>
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            Fire Safety Inspection Certificate for Occupancy, valid in the last 9 months / Affidavit of Undertaking
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <a href="" className="flex justify-center pl-3 items-center text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                            </svg>
                            <span className="md:text-sm text-xs font-normal pl-1 pr-3 py-0.5">Upload</span>
                          </a>
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            Page 2 Document
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <a href="" className="flex justify-center pl-3 items-center text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                            </svg>
                            <span className="md:text-sm text-xs font-normal pl-1 pr-3 py-0.5">Upload</span>
                          </a>
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            Page 3 Document
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <a href="" className="flex justify-center pl-3 items-center text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                            </svg>
                            <span className="md:text-sm text-xs font-normal pl-1 pr-3 py-0.5">Upload</span>
                          </a>
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            Page 4 Document
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <a href="" className="flex justify-center pl-3 items-center text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                            </svg>
                            <span className="md:text-sm text-xs font-normal pl-1 pr-3 py-0.5">Upload</span>
                          </a>
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            Page 5 Document
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <a href="" className="flex justify-center pl-3 items-center text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                            </svg>
                            <span className="md:text-sm text-xs font-normal pl-1 pr-3 py-0.5">Upload</span>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-8'>Transaction Information</h1>
                {/* Row 1 */}
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_nocopies} name="bus_nocopies" id="bus_nocopies" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                        <option value="0" className='dark:bg-[#3d3d3d]'>Select No. of Copies</option>
                        <option value="1" className='dark:bg-[#3d3d3d]'>1</option>
                        <option value="2" className='dark:bg-[#3d3d3d]'>2</option>
                        <option value="3" className='dark:bg-[#3d3d3d]'>3</option>
                        <option value="4" className='dark:bg-[#3d3d3d]'>4</option>
                        <option value="5" className='dark:bg-[#3d3d3d]'>5</option>
                        <option value="6" className='dark:bg-[#3d3d3d]'>6</option>
                        <option value="7" className='dark:bg-[#3d3d3d]'>7</option>
                        <option value="8" className='dark:bg-[#3d3d3d]'>8</option>
                        <option value="9" className='dark:bg-[#3d3d3d]'>9</option>
                        <option value="10" className='dark:bg-[#3d3d3d]'>10</option>
                      </select>
                    <label htmlFor="bus_nocopies" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No. of Copies<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_print} name="bus_print" id="bus_print" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                      <option value="0" className='dark:bg-[#3d3d3d]'>Select What to Print</option>
                      <option value="Front" className='dark:bg-[#3d3d3d]'>Front (P50)</option>
                      <option value="Back" className='dark:bg-[#3d3d3d]'>Back (P50)</option>
                      <option value="Front and Back" className='dark:bg-[#3d3d3d]'>Front and Back (P100)</option>
                    </select>
                    <label htmlFor="bus_print" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">What to Print<Req /></label>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_purpose} name="bus_purpose" id="bus_purpose" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                      <option value="0" className='dark:bg-[#3d3d3d]'>Select Purpose</option>
                      <option value="1" className='dark:bg-[#3d3d3d]'>Claim Benefits / Loan</option>
                      <option value="2" className='dark:bg-[#3d3d3d]'>Passport / Travel</option>
                      <option value="3" className='dark:bg-[#3d3d3d]'>School Requirements</option>
                      <option value="4" className='dark:bg-[#3d3d3d]'>Employment Local</option>
                      <option value="5" className='dark:bg-[#3d3d3d]'>Employment Abroad</option>
                    </select>
                    <label htmlFor="bus_purpose" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Purpose<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_validid} name="bus_validid" id="bus_validid" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                      <option value="0" className='dark:bg-[#3d3d3d]'>Select Valid ID to Present Upon Claiming</option>
                      <option value="1" className='dark:bg-[#3d3d3d]'>PASSPORT</option>
                      <option value="2" className='dark:bg-[#3d3d3d]'>SSS</option>
                      <option value="3" className='dark:bg-[#3d3d3d]'>UMID</option>
                      <option value="4" className='dark:bg-[#3d3d3d]'>PHILHEALTH</option>
                      <option value="5" className='dark:bg-[#3d3d3d]'>DRIVER'S LICENSE</option>
                      <option value="6" className='dark:bg-[#3d3d3d]'>VOTER'S ID</option>
                      <option value="7" className='dark:bg-[#3d3d3d]'>SENIOR CITIZEN'S ID</option>
                      <option value="8" className='dark:bg-[#3d3d3d]'>POSTAL ID</option>
                      <option value="9" className='dark:bg-[#3d3d3d]'>BARANGAY ID</option>
                      <option value="10" className='dark:bg-[#3d3d3d]'>NATIONAL ID</option>
                      <option value="11" className='dark:bg-[#3d3d3d]'>AUTHORIZATION LETTER</option>
                    </select>
                    <label htmlFor="bus_validid" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valid ID to Present Upon Claiming<Req /></label>
                  </div>
                </div> 
              </div>

              {/* Group 6 - Computation */}
              <div className="flex justify-center md:justify-end text-sm">
                 <div className="w-full md:w-1/2">
                     <div className="flex justify-between mt-2">
                         <span className="font-medium whitespace-nowrap">Print Fee</span>
                         <span className="whitespace-nowrap">{`P ${busPermit.printDisplay.toFixed(2)}`}</span>
                     </div>
                     <div className="flex justify-between mt-2">
                         <span className="font-medium whitespace-nowrap">Rush Service Fee</span>
                         <span className="whitespace-nowrap">P 50.00</span>
                     </div>
                     <hr className='mt-2.5 mb-1'/>
                     <div className="flex justify-between">
                         <span className="font-medium whitespace-nowrap">Total Amount Paid</span>
                         <span name="" id="bus_amount" className="whitespace-nowrap">{`P ${busPermit.bus_amount.toFixed(2)}`}</span>
                     </div>
                 </div>
              </div>
              </div>

              <div className="flex justify-end items-end mt-10 mb-4">
                <button
                  type="submit"
                  onClick={handleProceed}
                  className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >
                  Proceed
                </button>
              </div>
            </form>
            </div>
          </div>
        </main>

        {isModalOpen && (
          // <div className="fixed z-50 inset-0 overflow-y-auto">
          //   <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          //     <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          //       <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          //     </div>
          //     <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          //       &#8203;
          //     </span>
          //     <div className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          //       <div className="bg-white dark:bg-[#212121] px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
          //         <div className="mx-auto mt-4">
          //           <span className="font-medium text-slate-700 dark:text-white sm:mt-0 text-xs md:text-sm" id="modal-headline">
          //             Are you sure you want to save these changes?
          //           </span>
          //         </div>
          //       </div>
          //       <div className="bg-white dark:bg-[#212121] px-4 py-3 gap-3 sm:px-6 flex justify-end">
          //         <button
          //           onClick={handleCloseModal}
          //           type="button"
          //           className="text-slate-500 text-xs md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
          //         >
          //           <p>Cancel</p>
          //         </button>
          //         <button
          //           onClick={handleSubmit}
          //           type="button"
          //           className="text-white text-xs md:text-sm bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          //         >
          //           <p>Proceed</p>
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          <div className="fixed z-50 inset-0 ">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center text-xs md:text-sm sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-[#212121] text-slate-700 dark:text-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full max-w-2xl">
              <div className="px-4 pt-5 pb-3 sm:p-6 sm:pb-6 overflow-y-auto">
                
                <span className="font-bold md:text-lg text-sm">Upload File</span>
                
              </div>
    
              <div className="pb-1 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 overflow-y-auto">
                <div className="mx-auto">
                  <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 bg-white dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d] border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:border-gray-500">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 mx-3 ">
                          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold text-xs sm:text-sm">Click to upload</span> or drag and drop</p>
                          <p className="text-[10px] sm:text-[12px] text-gray-500 dark:text-gray-400">PNG, JPEG, DOCX, or PDF (MAX. 20MB)</p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden"/>
                    </label>
                  </div>
                </div>
    
                <div className="mr-0 md:mr-2 px-3 pt-3 pb-5 gap-3 sm:px-4 flex justify-end">
                  <div className="flex items-center space-x-2 mt-auto">
                    <button
                      // onClick={onClose}
                      type="button"
                      className="text-slate-500 text-xs text-center px-5 py-2 mb-0 md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                      >
                      <p>Close</p>
                    </button>

                    <button
                      // onClick={onSubmit}
                      type="button"
                      className="text-white text-xs text-center px-5 py-2 md:text-sm bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                      <p>Upload</p>
                    </button>
                  </div>
                </div>
    
            </div>
          </div>
        </div>
        )} 
      </div>
    </div>
  );
}

export default BusinessPermitForm;