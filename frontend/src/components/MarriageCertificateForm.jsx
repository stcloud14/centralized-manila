import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Link} from "react-router-dom"


import { useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/airbnb.css';
import CityDropdown from '../partials/profile/CityDropdown';
import RegionDropdown from '../partials/profile/RegionDropdown';
import ProvinceDropdown from '../partials/profile/ProvinceDropdown';

import ModalTransaction from '../partials/transactionModal/ModalTransaction';


const MarriageCertificateForm =()=>{

  const location = useLocation();
  const { pathname } = location;
  const user_id = pathname.split("/")[2];

  const [marriageCert, setMarriageCert] = useState((prevData) => ({
    ...prevData,
    marriagec_amount: 0,
    initialPrint: 0,
    printDisplay: 0,
    marriagec_regionLabel: '',
    marriagec_provinceLabel: '',
    marriagec_municipalLabel: '',
    marriagec_reqregionLabel: '',
    marriagec_reqprovinceLabel: '',
    marriagec_reqmunicipalLabel: '',
    marriagec_purposeLabel: '',
    marriagec_valididLabel: '',
  }));
  const [isSuccess, setIsSuccess] = useState(false);

  console.log(marriageCert)

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await axios.post(`http://localhost:8800/marriagecertificate/${user_id}`, marriageCert)
          // Check the response status before proceeding
          if (response.status === 200) {
            setIsSuccess(true); // Set success state to true
            handleCloseModal(); // Close the modal
            console.log('Transaction successful');

            setTimeout(() => {
              setIsSuccess(false);
            }, 3000);
          } else {
            console.error('Transaction error:', response.statusText);
          }
      } catch (err) {
        console.error('Transaction error:', err);
        console.error('Error message:', err.message);
      }
    }; 

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProceed = (e) => {
      e.preventDefault();
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const updatedValue = isNaN(value) ? value.toUpperCase() : value;

    setMarriageCert((prevData) => {
      if (id === 'marriagec_nocopies') {
        const initialValue = parseInt(value, 10) || 0;
        const displayValue = prevData.initialPrint || 0;
        const product = initialValue * displayValue;
        const totalAmountPaid = updateTotalAmount(product);

        return {
          ...prevData,
          [id]: initialValue,
          marriagec_amount: totalAmountPaid,
          printDisplay: product,
        };
      } 
      
      if (id === 'marriagec_print') {
        const displayValue = updateAmount({ value });
        const copiesValue = prevData.marriagec_nocopies || 0;
        const product = copiesValue * displayValue;
        const totalAmountPaid = updateTotalAmount(product);
        return {
          ...prevData,
          [id]: value,
          marriagec_amount: totalAmountPaid,
          initialPrint: displayValue,
          printDisplay: product,
        };
      }

      if (id === 'marriagec_region') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_province: '',
          marriagec_municipal: '',
          marriagec_regionLabel: label,
        };
      }

      if (id === 'marriagec_province') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_provinceLabel: label,
        };
      }

      if (id === 'marriagec_municipal') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_municipalLabel: label,
        };
      }

      
      if (id === 'marriagec_reqregion') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_reqprovince: '',
          marriagec_reqmunicipal: '',
          marriagec_reqregionLabel: label,
        };
      }

      if (id === 'marriagec_reqprovince') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_reqprovinceLabel: label,
        };
      }

      if (id === 'marriagec_reqmunicipal') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_reqmunicipalLabel: label,
        };
      }

      if (id === 'marriagec_purpose') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_purposeLabel: label,
        };
      }
      
      if (id === 'marriagec_validid') {

        const label = e.target.options[e.target.selectedIndex].text;
        
        return {
          ...prevData,
          [id]: value,
          marriagec_valididLabel: label,
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
  
  console.log(marriageCert)

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
                 
           
            <form onSubmit={handleSubmit}>
            <h1 className='font-medium text-center text-slate-700 dark:text-white'>Local Civil Registry</h1>
            <h1 className='mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300'>Marriage Certificate</h1>

            {isSuccess && (
                  <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                    Transaction success on Marriage Certificate!
                  </div>
                  )}  

              {/* Group 1 - Husband's Personal Information*/}
              <div className='pt-0.5'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Husband's Personal Information</h1>
                <div className="grid md:grid-cols-4 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_hlname} type="text" id="marriagec_hlname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_hlname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_hfname} type="text" id="marriagec_hfname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_hfname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_hmname} type="text" id="marriagec_hmname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_hmname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Middle Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_hsuffix} id="marriagec_hsuffix" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                        <option value="0" className='dark:bg-[#3d3d3d]'>Select Suffix</option>
                        <option value="SR." className='dark:bg-[#3d3d3d]'>Sr.</option>
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
                    <label htmlFor="marriagec_hsuffix" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Suffix</label>
                  </div>
                </div>
              </div>

              {/* Group 2 - Wife's Personal Information*/}
              <div className='pt-6'>
              <h1 className='font-medium text-center text-slate-700 dark:text-white mt-4'>Wife's Personal Information</h1>
                <h1 className='text-xs text-slate-700 dark:text-white my-1.5'>Use Maiden Name of the Lady/Wife</h1>
                <div className="grid md:grid-cols-4 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_wlname} type="text" id="marriagec_wlname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_wlname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_wfname} type="text" id="marriagec_wfname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_wfname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_wmname} type="text" id="marriagec_wmname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_wmname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Middle Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_wsuffix} id="marriagec_wsuffix" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
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
                    <label htmlFor="marriagec_wsuffix" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Suffix</label>
                  </div>
                </div>
              </div>

              {/* Group 3 - Place of Marriage Information */}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Place of Marriage Information</h1>
                <div className="grid md:grid-cols-4 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_region} id="marriagec_region" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <RegionDropdown />
                    </select>
                    <label htmlFor="marriagec_region" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Region</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_province} id="marriagec_province" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <ProvinceDropdown selectedRegion={marriageCert.marriagec_region} /> 
                    </select>
                    <label htmlFor="marriagec_province" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Province</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_municipal} id="marriagec_municipal" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <CityDropdown selectedProvince={marriageCert.marriagec_province} />
                    </select>
                    <label htmlFor="marriagec_municipal" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Municipal</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <Flatpickr
                      id='marriagec_date'
                      value={marriageCert.marriagec_date}
                      onChange={(date) => {
                        const formattedDate = date.length > 0 ? (() => {
                          const originalDate = new Date(date[0]);
                          originalDate.setDate(originalDate.getDate() + 1);
                          return originalDate.toISOString().split('T')[0];
                        })() : '';
                        
                        setMarriageCert((prevData) => ({  
                          ...prevData,
                          marriagec_date: formattedDate,
                        }))
                      }}
                      options={{
                        dateFormat: 'Y-m-d',
                        altInput: true,
                        altFormat: 'F j, Y',
                        placeholder: ' ', // Set an empty space as the initial placeholder
                      }}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                      htmlFor="marriagec_date"
                      className={`peer-focus:font-medium absolute bg-transparent text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 ${
                        marriageCert.marriagec_date ? 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0' : 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                      }`}
                    >
                      Date of Marriage
                    </label>
                  </div>
                </div>
              </div> 

              {/* Group 4 - Requestor Personal Information*/}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Requestor's Personal Information</h1>
                {/* Row 1 */}
                <div className="grid md:grid-cols-4 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqlname} type="text" id="marriagec_reqlname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_reqlname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqfname} type="text" id="marriagec_reqfname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_reqfname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqmname} type="text" id="marriagec_reqmname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_reqmname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Middle Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_reqsuffix} id="marriagec_reqsuffix" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                        <option value="0" className='dark:bg-[#3d3d3d]'>Select Suffix</option>
                        <option value="SR." className='dark:bg-[#3d3d3d]'>Sr.</option>
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
                    <label htmlFor="marriagec_reqsuffix" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Suffix</label>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqrelation} type="text" id="marriagec_reqrelation" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_reqrelation" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Relationship to the Owner</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_mobilenum} type="text" id="marriagec_mobileno" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_mobileno" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile Number</label>
                  </div><div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_telno} type="text" id="marriagec_telno" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_telno" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telephone Number</label>
                  </div>
                </div>
              </div>

              {/* Group 5 - Requestor's Address */}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Requestor's Address</h1>
                {/* Row 1 */}
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_reqregion} id="marriagec_reqregion" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <RegionDropdown />
                    </select>
                    <label htmlFor="marriagec_reqregion" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Region</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_reqprovince} id="marriagec_reqprovince" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <ProvinceDropdown selectedRegion={marriageCert.marriagec_reqregion} /> 
                    </select>
                    <label htmlFor="marriagec_reqprovince" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Province</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_reqmunicipal} id="marriagec_reqmunicipal" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <CityDropdown selectedProvince={marriageCert.marriagec_reqprovince} />
                    </select>
                    <label htmlFor="marriagec_reqmunicipal" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Municipal</label>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid md:grid-cols-7 md:gap-6">
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqbrgy} type="text" id="marriagec_reqbrgy" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_reqbrgy" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Barangay</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqhnum} type="text" id="marriagec_reqhnum" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_reqhnum" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">House No. / Unit Floor</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqstreet} type="text" id="marriagec_reqstreet" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_reqstreet" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Street / Building Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={marriageCert.marriagec_reqzip} type="text" id="marriagec_reqzip" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="marriagec_reqzip" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Zip Code</label>
                  </div>
                </div>
              </div>

              {/* Group 6 - Transaction Information*/}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Transaction Information</h1>
                {/* Row 1 */}
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_nocopies} id="marriagec_nocopies" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
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
                    <label htmlFor="marriagec_nocopies" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No. of Copies</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_print} id="marriagec_print" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <option value="0" className='dark:bg-[#3d3d3d]'>Select What to Print</option>
                      <option value="Front" className='dark:bg-[#3d3d3d]'>Front (P50)</option>
                      <option value="Back" className='dark:bg-[#3d3d3d]'>Back (P50)</option>
                      <option value="Front and Back" className='dark:bg-[#3d3d3d]'>Front and Back (P100)</option>
                    </select>
                    <label htmlFor="marriagec_print" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">What to Print</label>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_purpose} id="marriagec_purpose" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <option value="0" className='dark:bg-[#3d3d3d]'>Select Purpose</option>
                      <option value="1" className='dark:bg-[#3d3d3d]'>Claim Benefits / Loan</option>
                      <option value="2" className='dark:bg-[#3d3d3d]'>Passport / Travel</option>
                      <option value="3" className='dark:bg-[#3d3d3d]'>School Requirements</option>
                      <option value="4" className='dark:bg-[#3d3d3d]'>Employment Local</option>
                      <option value="5" className='dark:bg-[#3d3d3d]'>Employment Abroad</option>
                    </select>
                    <label htmlFor="marriagec_purpose" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Purpose</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={marriageCert.marriagec_validid} id="marriagec_validid" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
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
                    <label htmlFor="marriagec_validid" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valid ID to Present Upon Claiming</label>
                  </div>
                </div> 
              </div>

              {/* Group 7 - Computation */}
              <div className="flex justify-center md:justify-end text-sm">
                 <div className="w-full md:w-1/2">
                     <div className="flex justify-between mt-2">
                         <span className="font-medium whitespace-nowrap">Print Fee</span>
                         <span className="whitespace-nowrap">{`P ${marriageCert.printDisplay.toFixed(2)}`}</span>
                     </div>
                     <div className="flex justify-between mt-2">
                         <span className="font-medium whitespace-nowrap">Rush Service Fee</span>
                         <span className="whitespace-nowrap">P 50.00</span>
                     </div>
                     <hr className='mt-2.5 mb-1'/>
                     <div className="flex justify-between">
                         <span className="font-medium whitespace-nowrap">Total Amount Paid</span>
                         <span id="marriagec_amount" className="whitespace-nowrap">{`P ${marriageCert.marriagec_amount.toFixed(2)}`}</span>
                     </div>
                 </div>
              </div>

              <div className="flex flex-col items-center md:flex-row md:justify-end mt-7">
                <button
                  type="submit"
                  onClick={handleProceed}
                  className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                  Proceed
                </button>
              </div>
            </form>
            </div>
          </div>
        </main>

        {isModalOpen && (
          <ModalTransaction selectedTransaction={marriageCert} modalType={'Marriage Certificate'} onClose={handleCloseModal} onSubmit={handleSubmit}/>
        )}

      </div>
    </div>
  );
}

export default MarriageCertificateForm;