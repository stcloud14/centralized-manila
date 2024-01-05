import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import {Link} from "react-router-dom"


import { useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Req from '../partials/misc/RequiredFieldIndicator';

import CityDropdown from '../partials/profile/CityDropdown';
import RegionDropdown from '../partials/profile/RegionDropdown';
import ProvinceDropdown from '../partials/profile/ProvinceDropdown';
import BusinessTypeDropdown from '../partials/profile/BusinessTypeDropdown';

import ModalTransaction from '../partials/transactionModal/ModalTransaction';

import UploadImageModal from '../partials/UploadModal';
import UploadButton from '../partials/business/uploadButton';
import SuffixDropdown from '../partials/profile/SuffixDropdown';
import SexDropdown from '../partials/profile/SexDropdown';
import CopiesDropdown from '../partials/profile/CopiesDropdown';
import PrintDropdown from '../partials/profile/PrintDropdown';
import PurposeDropdown from '../partials/profile/PurposeDropdown';
import ValidIdDropdown from '../partials/profile/ValidIdDropdown';
import BPTermsModal from '../partials/business/BPTermsModal';


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

  console.log(busPermit)


  const [dataRow, setDataRow] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [rowData, setRowData] = useState({
    bus_line: '',
    bus_psic: '',
    bus_products: '',
    bus_units_no: '',
    bus_total_cap: ''
  });
  const [editData, setEditData] = useState({
    bus_line: '',
    bus_psic: '',
    bus_products: '',
    bus_units_no: '',
    bus_total_cap: ''
  });

  const [selectedFiles, setSelectedFiles] = useState([
    { fieldName: 'bus_tax_incentives', value: null },
    { fieldName: 'bus_dti_reg', value: null },
    { fieldName: 'bus_rptax_decbldg', value: null },
    { fieldName: 'bus_sec_paid', value: null },
    { fieldName: 'bus_sec_articles', value: null },
    { fieldName: 'bus_nga', value: null },
    { fieldName: 'bus_sec_front', value: null },
    { fieldName: 'bus_rptax_decland', value: null },
    { fieldName: 'bus_fire', value: null },
    { fieldName: 'bus_page2', value: null },
    { fieldName: 'bus_page3', value: null },
    { fieldName: 'bus_page4', value: null },
    { fieldName: 'bus_page5', value: null },
  ]);
  

  const handleFileSelect = (file, target) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.map((fileArray) => {
        if (fileArray.fieldName === target) {
          return { ...fileArray, value: file };
        }
        return fileArray;
      });
  
      return updatedFiles;
    });
  };
  

  console.log(selectedFiles)


  const handleActivityChange = (e) => {
    const { name, value } = e.target;

    setRowData((prevData) => {

      if (name === 'bus_line' || name === 'bus_products') {

        const updatedValue = isNaN(value) ? value.toUpperCase() : value;

        return {
          ...prevData,
          [name]: updatedValue,
        };
      } 
      
      else {
        const formattedValue = value.replace(/\D/g, '');
        return {
          ...prevData,
          [name]: formattedValue,
        };
      }
    });
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData((prevData) => {

      if (name === 'bus_line' || name === 'bus_products') {

        const updatedValue = isNaN(value) ? value.toUpperCase() : value;

        return {
          ...prevData,
          [name]: updatedValue,
        };
      } 
      
      else {
        const formattedValue = value.replace(/\D/g, '');
        return {
          ...prevData,
          [name]: formattedValue,
        };
      }
    });
  }


  const handleAddRow = () => {
    if (editingIndex !== -1) {

      const newData = [...dataRow];
      newData[editingIndex] = { ...editData };
      setDataRow(newData);

      setEditingIndex(-1);

    } else {

      const newRow = { ...rowData };
      setDataRow([...dataRow, newRow]);

      setRowData({
        bus_line: '',
        bus_psic: '',
        bus_products: '',
        bus_units_no: '',
        bus_total_cap: '',
      });
    }
  };


  const handleEditRow = (index) => {
    setEditingIndex(index);
    setEditData(dataRow[index]);
  };


  const handleDeleteRow = (index) => {
    const newData = [...dataRow];
    newData.splice(index, 1);
    setDataRow(newData);
    setEditingIndex(-1);
  };


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
      || id === 'bus_rent') {
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

      if (name === 'owned' || name === 'bus_email') {
        
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

  
  const [isSuccess, setIsSuccess] = useState(false);

  const contentRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    selectedFiles.forEach(fileObject => {
      if (fileObject.value !== null) {
        formData.append(fileObject.fieldName, fileObject.value, fileObject.value.name);
      }
    });
    
    // console.log(`Field Name: ${fileObject.fieldName}, Value: ${fileObject.value.name}`);

    try {
        const response = await axios.post(`http://localhost:8800/buspermit/bus/${user_id}`, busPermit);

        if (response.status === 200) {
            setIsSuccess(true);
            handleCloseModal();
            contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            console.log('Transaction successful');

            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        } else {
            console.error('Transaction error:', response.statusText);
        }

        const response1 = await axios.post(`http://localhost:8800/buspermit/busact`, { dataRow });

        if (response1.status === 200) {
            setIsSuccess(true);
            handleCloseModal();
            contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            console.log('Transaction successful');

            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        } else {
            console.error('Transaction error:', response1.statusText);
        }


        const response2 = await fetch('http://localhost:8800/buspermit/busimg', {
        method: 'POST',
        body: formData,
        });
        

        if (response2.status === 200) {
            setIsSuccess(true);
            handleCloseModal();
            contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            console.log('Transaction successful');

            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        } else {
            console.log('THIS IS THE ERROR IN API')
            console.error('Transaction error:', response2.statusText);
        }

    } catch (err) {
        console.log('THIS IS THE ERROR IN FRONTEND')
        console.error('Transaction error:', err);
    }
};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleProceed = (e) => {
    e.preventDefault();
    
  const requiredFields = [
    'bus_type',
    // 'bus_name',
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
  ];

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

  const [uploadModal, setUploadModal] = useState(false);
  const [targetIMG, setTargetIMG] = useState(null);

  const openUploadModal = (targetIMG) => {
    setTargetIMG(targetIMG);
    setUploadModal(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(true);

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };
  
  const logoSrc = '../src/images/mnl_footer.svg';

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <BPTermsModal isVisible={isModalVisible} onProceed={toggleModalVisibility} userID={user_id} />

        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 mt-4 mb-2">
            <div className="px-5 py-5">
                 
            
           
            <form onSubmit={handleSubmit} className={`overflow-y-auto ${isModalVisible ? 'blur' : ''}`}>
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
            

            {uploadModal && <UploadImageModal onClose={() => setUploadModal(false)}  onFileSelect={handleFileSelect} targetIMG={targetIMG} />}

            
            


              {/* Group 1 - Business Information and Registration*/}
              <div className='pt-0.5'>
                {/* Row 1 */}
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Business Information and Registration</h1>
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group ">
                    <select onChange={handleInputChange} value={busPermit.bus_type} name="bus_type" id="bus_type" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
                      <BusinessTypeDropdown/>
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
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Owner's Information</h1>
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
                    <select onChange={handleInputChange} value={busPermit.bus_suffix} name="bus_suffix" id="bus_suffix" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
                      <SuffixDropdown/>
                    </select>
                    <label htmlFor="bus_suffix" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Suffix</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_sex} name="bus_sex" id="bus_sex" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
                      <SexDropdown/>
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
                    <select onChange={handleInputChange} value={busPermit.bus_bregion} name="bus_bregion" id="bus_bregion" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
                      <RegionDropdown />
                    </select>
                    <label htmlFor="bus_bregion" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Region<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_bprovince} name="bus_bprovince" id="bus_bprovince" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
                      <ProvinceDropdown selectedRegion={busPermit.bus_bregion} /> 
                    </select>
                    <label htmlFor="bus_bprovince" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Province<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_bcity} name="bus_bcity" id="bus_bcity" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
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
                    <select onChange={handleInputChange} value={busPermit.bus_region} name="bus_region" id="bus_region" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
                      <RegionDropdown />
                    </select>
                    <label htmlFor="bus_region" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Region<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_province} name="bus_province" id="bus_province" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
                      <ProvinceDropdown selectedRegion={busPermit.bus_region} />
                    </select>
                    <label htmlFor="bus_province" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Province<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_city} name="bus_city" id="bus_city" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
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
                <input value='1' type="radio" name="owned" className="border-gray-500 mr-2 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 cursor-pointer"/>
                <label htmlFor="owned_no" className="text-gray-700 dark:text-white mr-6">No</label>

                <input value='2' defaultChecked type="radio" name="owned"className="border-gray-500 mr-2 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 cursor-pointer"/>
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
                    <input value='1' type="radio" name="bus_incentive" defaultChecked className="border border-gray-500 md:ml-4 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 cursor-pointer" />
                    <span className="ml-1.5">No</span>
                  </label>
                  <label>
                    <input value='2' type="radio" name="bus_incentive" className="border border-gray-500 ml-4 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 cursor-pointer" />
                    <span className="ml-1.5">Yes</span>
                  </label>
                </div>

                {busPermit.bus_incentive === '2' ? (
                <div className="group md:ml-9">
                  <UploadButton openUploadModal={openUploadModal} taxIMG={'bus_tax_incentives'} />
                </div>
                ) : null}
              </div>

              {/* Group 10 - Business Activity*/}
              <div className="pt-12 text-slate-700 dark:text-white">
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Business Activity</h1>
                {/* Row 1 */}
                <div onChange={handleInputChange} name="bus_activity" className="flex flex-col md:flex-row md:items-center text-sm items-start">
                  <label htmlFor="bus_mainoffice" className="flex items-center mb-2 md:mb-0 md:mx-auto">
                    <input value="1" type="radio" name="bus_activity" defaultChecked className="border border-gray-500 mr-2 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 cursor-pointer" />
                    Main Office
                  </label>

                  <label htmlFor="bus_branchoffice" className="flex items-center mb-2 md:mb-0 md:mx-auto">
                    <input value="2" type="radio" name="bus_activity" className="border-gray-500 mr-2 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 cursor-pointer" />
                    Branch Office
                  </label>

                  <label htmlFor="bus_adminoffice" className="flex items-center mb-2 md:mb-0 md:mx-auto">
                    <input value="3" type="radio" name="bus_activity" className="border border-gray-500 mr-2 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 cursor-pointer" />
                    Admin Office Only
                  </label>

                  <label htmlFor="bus_warehouse" className="flex items-center mb-2 md:mb-0 md:mx-auto">
                    <input value="4" type="radio" name="bus_activity" className="border  border-gray-500 mr-2 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 cursor-pointer" />
                    Warehouse
                  </label>

                  <div className="flex items-center md:mr-6">
                    <input value="5" type="radio" name="bus_activity" className="border border-gray-500 mr-2 rounded-full text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 cursor-pointer" />
                    Others:
                    <input onChange={handleInputChange} value={busPermit.bus_office_partial} disabled={busPermit.bus_activity !== '5'} type="text" name="bus_office_partial" id="bus_office_partial" className="block px-0 ml-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Specify" required/>
                  </div>
                </div>
                {/* Row 2 */} 
                <div className="grid md:grid-cols-11 md:gap-6 mt-6">
                  <div className="relative z-0 w-full md:col-span-2 mb-6 group">
                    <input value={rowData.bus_line} onChange={handleActivityChange} type="text" name="bus_line" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_line" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Line of Business <Req /></label>
                  </div>
                  <div className="relative z-0 w-full md:col-span-2 mb-6 group">
                    <input value={rowData.bus_psic} onChange={handleActivityChange} type="text" name="bus_psic" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_psic" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">PSIC</label>
                  </div>
                  <div className="relative z-0 w-full md:col-span-2 mb-6 group">
                    <input value={rowData.bus_products} onChange={handleActivityChange} type="text" name="bus_products" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_products" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Products / Services</label>
                  </div>
                  <div className="relative z-0 w-full md:col-span-2 mb-6 group">
                    <input value={rowData.bus_units_no} onChange={handleActivityChange} type="text" name="bus_units_no" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_units_no" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No. of Units</label>
                  </div>
                  <div className="relative z-0 w-full md:col-span-2 mb-6 group">
                    <input value={rowData.bus_total_cap} onChange={handleActivityChange} type="text" name="bus_total_cap" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="bus_total_cap" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Total Capitalization (PH)<Req /></label>
                  </div>
                  <div onClick={handleAddRow} className="relative z-0 w-full md:col-span-1 mb-6 group">
                    <a className="flex justify-center mt-3 px-3 py-1 text-sm text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full cursor-pointer">
                      + Add
                    </a>
                  </div>
                </div>

                <div className="relative overflow-x-auto shadow-md md:rounded-lg rounded-md">
                  <table className="w-full text-left text-xs md:text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-gray-700 uppercase bg-slate-200 dark:bg-[#212121] dark:text-slate-400">
                      <tr>
                        <th scope="col" className="pl-5 pr-0 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                          Line of Business
                        </th>
                        <th scope="col" className="pl-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                          Philippine Standard Industrial Code
                        </th>
                        <th scope="col" className="pl-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                          Products/Services
                        </th>
                        <th scope="col" className="pl-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                          No. of Units
                        </th>
                        <th scope="col" className="pl-3 pr-0 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                          Total Capitalization (PH)
                        </th>
                        <th scope="col" className="px-l pr-0 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                          {/* View Details*/}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {dataRow.map((row, index) => (
                      <tr key={index} className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="pl-5 pr-0 py-2 whitespace-nowrap">
                          {editingIndex === index ? (
                            <input
                              type="text"
                              name="bus_line"
                              value={editData.bus_line}
                              onChange={handleEditChange}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            />
                          ) : (
                            row.bus_line
                          )}
                        </td>
                        <td className="pl-3 pr-0 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                          {editingIndex === index ? (
                              <input
                                type="text"
                                name="bus_psic"
                                value={editData.bus_psic}
                                onChange={handleEditChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              />
                            ) : (
                              row.bus_psic
                            )}
                        </td>
                        <td className="pl-3 pr-0 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                          {editingIndex === index ? (
                              <input
                                type="text"
                                name="bus_products"
                                value={editData.bus_products}
                                onChange={handleEditChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              />
                            ) : (
                              row.bus_products
                            )}
                        </td>
                        <td className="pl-3 pr-0 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                          {editingIndex === index ? (
                              <input
                                type="text"
                                name="bus_units_no"
                                value={editData.bus_units_no}
                                onChange={handleEditChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              />
                            ) : (
                              row.bus_units_no
                            )}
                        </td>
                        <td className="pl-3 pr-0 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                          {editingIndex === index ? (
                              <input
                                type="text"
                                name="bus_total_cap"
                                value={editData.bus_total_cap}
                                onChange={handleEditChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              />
                            ) : (
                              `P ${row.bus_total_cap}`
                            )}
                        </td>
                        <td className="md:pl-3 pl-5 py-2 whitespace-nowrap text-xs md:text-sm font-medium">
                          <div className="flex space-x-3">
                          {editingIndex === index ? (
                            <a onClick={() => handleAddRow()} className="group flex justify-center items-center text-center p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full cursor-pointer" >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                            </a>
                          ) : (
                            <a onClick={() => handleEditRow(index)} className="group flex justify-center items-center text-center p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full cursor-pointer" >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path className="stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                            </a>
                          )}
                            <a onClick={() => handleDeleteRow(index)} className="group flex justify-center items-center text-center p-2 bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer" >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            </a>  
                          </div>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Group 11 - Business Requirements*/}
              <div className="pt-12 text-slate-700 dark:text-white">
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Business Requirements</h1>
               
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
                        <td className="md:pl-10 pl-3 pr-2 py-2 text-right min-w-[100px]">
                        {selectedFiles.map((fileArray) => {
                            if (fileArray.fieldName === 'bus_dti_reg') {
                              return fileArray.value ? fileArray.value.name : null;
                            }
                            return null; // If the name doesn't match, return null or handle as needed
                          })}
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <UploadButton openUploadModal={openUploadModal} targetIMG={'bus_dti_reg'} />
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2">
                          R.P. Tax Declaration for Land (Upload if copy is available. If not, indicate TDN or PIN on the UAF to include fee on eSOA)
                        </td>
                        <td className="md:pl-10 pl-3 pr-2 py-2 text-right min-w-[100px]">
                        {selectedFiles.map((fileArray) => {
                            if (fileArray.fieldName === 'bus_rptax_decbldg') {
                              return fileArray.value ? fileArray.value.name : null;
                            }
                            return null; // If the name doesn't match, return null or handle as needed
                          })}
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <UploadButton openUploadModal={openUploadModal} targetIMG={'bus_rptax_decbldg'} />
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                          SEC Registration - Paid-up and Subscribed Page
                        </td>
                        <td className="md:pl-10 pl-3 pr-2 py-2 text-right min-w-[100px]">
                        {selectedFiles.map((fileArray) => {
                            if (fileArray.fieldName === 'bus_sec_paid') {
                              return fileArray.value ? fileArray.value.name : null;
                            }
                            return null; // If the name doesn't match, return null or handle as needed
                          })}
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <UploadButton openUploadModal={openUploadModal} targetIMG={'bus_sec_paid'} />
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2">
                            SEC Registration - Articles of Primary and Secondary Purpose
                        </td>
                        <td className="md:pl-10 pl-3 pr-2 py-2 text-right min-w-[100px]">
                        {selectedFiles.map((fileArray) => {
                            if (fileArray.fieldName === 'bus_sec_articles') {
                              return fileArray.value ? fileArray.value.name : null;
                            }
                            return null; // If the name doesn't match, return null or handle as needed
                          })}
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <UploadButton openUploadModal={openUploadModal} targetIMG={'bus_sec_articles'} />
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            NGA-Contract of Lease - Page Indicating Names and Floor Area - sqrm
                        </td>
                        <td className="md:pl-10 pl-3 pr-2 py-2 text-right min-w-[100px]">
                        {selectedFiles.map((fileArray) => {
                            if (fileArray.fieldName === 'bus_nga') {
                              return fileArray.value ? fileArray.value.name : null;
                            }
                            return null; // If the name doesn't match, return null or handle as needed
                          })}
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <UploadButton openUploadModal={openUploadModal} targetIMG={'bus_nga'} />
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            SEC Registration - Front Page
                        </td>
                        <td className="md:pl-10 pl-3 pr-2 py-2 text-right min-w-[100px]">
                        {selectedFiles.map((fileArray) => {
                            if (fileArray.fieldName === 'bus_sec_front') {
                              return fileArray.value ? fileArray.value.name : null;
                            }
                            return null; // If the name doesn't match, return null or handle as needed
                          })}
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <UploadButton openUploadModal={openUploadModal} targetIMG={'bus_sec_front'} />
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            R.P. Tax Declaration for Building (Upload if copy is available. If not, indicate TDN or PIN on the UAF to include fee on eSOA)
                        </td>
                        <td className="md:pl-10 pl-3 pr-2 py-2 text-right min-w-[100px]">
                        {selectedFiles.map((fileArray) => {
                            if (fileArray.fieldName === 'bus_rptax_decland') {
                              return fileArray.value ? fileArray.value.name : null;
                            }
                            return null; // If the name doesn't match, return null or handle as needed
                          })}
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <UploadButton openUploadModal={openUploadModal} targetIMG={'bus_rptax_decland'} />
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            Fire Safety Inspection Certificate for Occupancy, valid in the last 9 months / Affidavit of Undertaking
                        </td>
                        <td className="md:pl-10 pl-3 pr-2 py-2 text-right min-w-[100px]">
                        {selectedFiles.map((fileArray) => {
                            if (fileArray.fieldName === 'bus_fire') {
                              return fileArray.value ? fileArray.value.name : null;
                            }
                            return null; // If the name doesn't match, return null or handle as needed
                          })}
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <UploadButton openUploadModal={openUploadModal} targetIMG={'bus_fire'} />
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            Page 2 Document
                        </td>
                        <td className="md:pl-10 pl-3 pr-2 py-2 text-right min-w-[100px]">
                        {selectedFiles.map((fileArray) => {
                            if (fileArray.fieldName === 'bus_page2') {
                              return fileArray.value ? fileArray.value.name : null;
                            }
                            return null; // If the name doesn't match, return null or handle as needed
                          })}
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <UploadButton openUploadModal={openUploadModal} targetIMG={'bus_page2'} />
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            Page 3 Document
                        </td>
                        <td className="md:pl-10 pl-3 pr-2 py-2 text-right min-w-[100px]">
                        {selectedFiles.map((fileArray) => {
                            if (fileArray.fieldName === 'bus_page3') {
                              return fileArray.value ? fileArray.value.name : null;
                            }
                            return null; // If the name doesn't match, return null or handle as needed
                          })}
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <UploadButton openUploadModal={openUploadModal} targetIMG={'bus_page3'} />
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            Page 4 Document
                        </td>
                        <td className="md:pl-10 pl-3 pr-2 py-2 text-right min-w-[100px]">
                        {selectedFiles.map((fileArray) => {
                            if (fileArray.fieldName === 'bus_page4') {
                              return fileArray.value ? fileArray.value.name : null;
                            }
                            return null; // If the name doesn't match, return null or handle as needed
                          })}
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <UploadButton openUploadModal={openUploadModal} targetIMG={'bus_page4'} />
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                        <td className="md:pl-10 pl-3 pr-2 py-2 ">
                            Page 5 Document
                        </td>
                        <td className="md:pl-10 pl-3 pr-2 py-2 text-right min-w-[100px]">
                        {selectedFiles.map((fileArray) => {
                            if (fileArray.fieldName === 'bus_page5') {
                              return fileArray.value ? fileArray.value.name : null;
                            }
                            return null; // If the name doesn't match, return null or handle as needed
                          })}
                        </td>
                        <td className="py-2 md:px-10 px-3  text-xs md:text-sm font-medium">
                          <UploadButton openUploadModal={openUploadModal} targetIMG={'bus_page5'} />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* {selectedFiles.map((selectedFile, index) => (
              <div key={index}>
                <p>Selected file: {selectedFile.file}</p>
              </div>
            ))} */}

                </div>
                </div>

                {/* Group 12 - Transaction Information*/}
                <div className='pt-10'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Transaction Information</h1>
                {/* Row 1 */}
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_nocopies} name="bus_nocopies" id="bus_nocopies" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                       <CopiesDropdown/>
                      </select>
                    <label htmlFor="bus_nocopies" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No. of Copies<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_print} name="bus_print" id="bus_print" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                     <PrintDropdown/>
                    </select>
                    <label htmlFor="bus_print" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">What to Print<Req /></label>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_purpose} name="bus_purpose" id="bus_purpose" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                     <PurposeDropdown/>
                    </select>
                    <label htmlFor="bus_purpose" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">Purpose<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={busPermit.bus_validid} name="bus_validid" id="bus_validid" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                     <ValidIdDropdown/>
                    </select>
                    <label htmlFor="bus_validid" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valid ID to Present Upon Claiming<Req /></label>
                  </div>
                </div> 
              

              {/* Group 13 - Computation */}
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
          <Footer logo={logoSrc} />
        </main>

        {isModalOpen && (
          <ModalTransaction selectedTransaction={busPermit} businessData={dataRow} modalType={'Business Permit'} onClose={handleCloseModal} onSubmit={handleSubmit} />
        )}

      </div>
    </div>
  );
}

export default BusinessPermitForm;