import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import {Link} from "react-router-dom"
import Select from 'react-select';


import { useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Req from '../partials/misc/RequiredFieldIndicator';
import Flatpickr from 'react-flatpickr';
 
import 'flatpickr/dist/themes/airbnb.css';
import CityDropdown from '../partials/profile/CityDropdown';
import RegionDropdown from '../partials/profile/RegionDropdown';
import ProvinceDropdown from '../partials/profile/ProvinceDropdown';
import CountryDropdwon from '../partials/profile/CountryDropdown';

import ModalTransaction from '../partials/transactionModal/ModalTransaction';

const CedulaForm =()=>{

  const location = useLocation();
  const { pathname } = location;
  const user_id = pathname.split("/")[2];  

  const [CtcCedula, setCtcCedula] = useState((prevData) => ({
    ...prevData,
    ctc_cedamount: 0,
    ctc_grossca: 0,
    ctc_salariesca: 0,
    ctc_totalamount: 0,
    ctc_interest: 0,
    ctc_amountpayable: 0,
    ctc_residencetaxdue: '',
  }));
  
  const [isSuccess, setIsSuccess] = useState(false);

  const contentRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`http://localhost:8800/cedula/${user_id}`, CtcCedula);
  
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
  const requiredFields = ['ctc_lname','ctc_fname','ctc_sex','ctc_region','ctc_province','ctc_municipal',
  'ctc_reqbrgy','ctc_reqhnum','ctc_reqstreet','ctc_reqzip','ctc_civilstatus','ctc_cznstatus',
  'ctc_employmentstatus','ctc_validid','ctc_profession']; //The input fields that is required
  const isIncomplete = requiredFields.some((field) => !CtcCedula[field]);

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
  const { name, id, value } = e.target;
  const updatedValue = isNaN(value) ? value.toUpperCase() : value;
  const numericValue = value.replace(/\D/g, '');
  
  
  setCtcCedula((prevData) => {

    if (name === 'ctc_incomeca') {

      const incomeCedAmount = equivalentAmount({ value });
      const grossCedAmount = prevData.ctc_grossca || 0;
      const salariesCedAmount = prevData.ctc_salariesca || 0;

      const totalAmountPartial = incomeCedAmount + grossCedAmount + salariesCedAmount; 
      const totalAmount = Math.round(totalAmountPartial * 100) / 100; 
      const [totalInterest, totalAmountPaid] = totalingAmount({ totalAmount });


      return {
        ...prevData,
        [name]: numericValue,
        ctc_cedamount: incomeCedAmount,
        ctc_totalamount: totalAmount,
        ctc_interest: totalInterest,
        ctc_amountpayable: totalAmountPaid,
      };
    }

    if (name === 'ctc_grossta') {

      const grossCedAmount = equivalentAmount({ value });
      const incomeCedAmount = prevData.ctc_cedamount || 0;
      const salariesCedAmount = prevData.ctc_salariesca || 0;

      const totalAmountPartial = incomeCedAmount + grossCedAmount + salariesCedAmount; 
      const totalAmount = Math.round(totalAmountPartial * 100) / 100; 
      const [totalInterest, totalAmountPaid] = totalingAmount({ totalAmount });



      return {
        ...prevData,
        [name]: numericValue,
        ctc_grossca: grossCedAmount,
        ctc_totalamount: totalAmount,
        ctc_interest: totalInterest,
        ctc_amountpayable: totalAmountPaid,
      };
    }

    if (name === 'ctc_salariesta') {

      const salariesCedAmount = equivalentAmount({ value });
      const incomeCedAmount = prevData.ctc_cedamount || 0;
      const grossCedAmount = prevData.ctc_grossca || 0;

      const totalAmountPartial = incomeCedAmount + grossCedAmount + salariesCedAmount; 
      const totalAmount = Math.round(totalAmountPartial * 100) / 100; 
      const [totalInterest, totalAmountPaid] = totalingAmount({ totalAmount });



      return {
        ...prevData,
        [name]: numericValue,
        ctc_salariesca: salariesCedAmount,
        ctc_totalamount: totalAmount,
        ctc_interest: totalInterest,
        ctc_amountpayable: totalAmountPaid,
      };
    }
    

    if (id === 'ctc_region') {
      return {
        ...prevData,
        [id]: value,
        birthc_province: '',
        birthc_municipal: '',
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
const handleSelectChange = (selectedOption, fieldName) => {
  setCtcCedula((prevCtcCedula) => ({
    ...prevCtcCedula,
    [fieldName]: selectedOption.value,
  }));
};



// function formatNumberWithCommas(value) {

//   let formattedWithCommas = '';
//   for (let i = 0; i < numericValue.length; i++) {
//     if (i > 0 && (numericValue.length - i) % 3 === 0) {
//       formattedWithCommas += ',';
//     }
//     formattedWithCommas += numericValue[i];
//   }

//   return {
//     formattedValue: formattedWithCommas,
//   };
// }


function equivalentAmount({ value }) {
  if (value > 0) {
    // Get the value from Taxable Amount input
    const taxableAmount = parseFloat(value) || 0;

    // Calculate Cedula Amount (1% of Taxable Amount) and round it
    const cedulaAmount = Math.round(taxableAmount * 0.001);

    return cedulaAmount;

  } else {

    return 0;
  }
}

function totalingAmount({ totalAmount }) {
  if (totalAmount > 0) {
    const totalInterest = Math.round(totalAmount * 0.2);
    const totalAmountPaid = Math.round(parseFloat(totalAmount) + parseFloat(totalInterest));

    return [totalInterest, totalAmountPaid];

  } else {
    return [0, 0];
  }
}
const professionOptions = [
  
    { value: 'SOFTWARE_DEVELOPER', label: 'Software Developer' },
    { value: 'SYSTEM_ADMINISTRATOR', label: 'System Administrator' },
    { value: 'NETWORK_ENGINEER', label: 'Network Engineer' },
    { value: 'DATA_ANALYST', label: 'Data Analyst' },
    { value: 'CYBERSECURITY_ANALYST', label: 'Cybersecurity Analyst' },
    { value: 'DOCTOR', label: 'Doctor' },
    { value: 'NURSE', label: 'Nurse' },
    { value: 'PHARMACIST', label: 'Pharmacist' },
    { value: 'PHYSICAL_THERAPIST', label: 'Physical Therapist' },
    { value: 'MEDICAL_TECHNOLOGIST', label: 'Medical Technologist' },
    { value: 'ACCOUNTANT', label: 'Accountant' },
    { value: 'FINANCIAL_ANALYST', label: 'Financial Analyst' },
    { value: 'INVESTMENT_BANKER', label: 'Investment Banker' },
    { value: 'ACTUARY', label: 'Actuary' },
    { value: 'AUDITOR', label: 'Auditor' },
    { value: 'TEACHER', label: 'Teacher' },
    { value: 'PROFESSOR', label: 'Professor' },
    { value: 'SCHOOL_ADMINISTRATOR', label: 'School Administrator' },
    { value: 'EDUCATIONAL_CONSULTANT', label: 'Educational Consultant' },
    { value: 'LIBRARIAN', label: 'Librarian' },
    { value: 'CIVIL_ENGINEER', label: 'Civil Engineer' },
    { value: 'MECHANICAL_ENGINEER', label: 'Mechanical Engineer' },
    { value: 'ELECTRICAL_ENGINEER', label: 'Electrical Engineer' },
    { value: 'AEROSPACE_ENGINEER', label: 'Aerospace Engineer' },
    { value: 'SOFTWARE_ENGINEER', label: 'Software Engineer' },
    { value: 'MARKETING_MANAGER', label: 'Marketing Manager' },
    { value: 'DIGITAL_MARKETER', label: 'Digital Marketer' },
    { value: 'PUBLIC_RELATIONS_SPECIALIST', label: 'Public Relations Specialist' },
    { value: 'BRAND_MANAGER', label: 'Brand Manager' },
    { value: 'MARKET_RESEARCH_ANALYST', label: 'Market Research Analyst' },
    { value: 'SALES_REPRESENTATIVE', label: 'Sales Representative' },
    { value: 'ACCOUNT_EXECUTIVE', label: 'Account Executive' },
    { value: 'SALES_MANAGER', label: 'Sales Manager' },
    { value: 'RETAIL_SALESPERSON', label: 'Retail Salesperson' },
    { value: 'BUSINESS_DEVELOPMENT_MANAGER', label: 'Business Development Manager' },
    { value: 'HR_MANAGER', label: 'HR Manager' },
    { value: 'RECRUITER', label: 'Recruiter' },
    { value: 'TRAINING_AND_DEVELOPMENT_SPECIALIST', label: 'Training and Development Specialist' },
    { value: 'COMPENSATION_ANALYST', label: 'Compensation Analyst' },
    { value: 'EMPLOYEE_RELATIONS_SPECIALIST', label: 'Employee Relations Specialist' },
    { value: 'BIOLOGIST', label: 'Biologist' },
    { value: 'CHEMIST', label: 'Chemist' },
    { value: 'PHYSICIST', label: 'Physicist' },
    { value: 'ENVIRONMENTAL_SCIENTIST', label: 'Environmental Scientist' },
    { value: 'RESEARCH_SCIENTIST', label: 'Research Scientist' },
    { value: 'GRAPHIC_DESIGNER', label: 'Graphic Designer' },
    { value: 'ANIMATOR', label: 'Animator' },
    { value: 'INTERIOR_DESIGNER', label: 'Interior Designer' },
    { value: 'FASHION_DESIGNER', label: 'Fashion Designer' },
    { value: 'ART_DIRECTOR', label: 'Art Director' },
    { value: 'FACTORY_WORKER', label: 'Factory Worker' },
    { value: 'PRODUCTION_SUPERVISOR', label: 'Production Supervisor' },
    { value: 'QUALITY_CONTROL_INSPECTOR', label: 'Quality Control Inspector' },
    { value: 'OPERATIONS_MANAGER', label: 'Operations Manager' },
    { value: 'PROCESS_ENGINEER', label: 'Process Engineer' },
    { value: 'CUSTOMER_SUPPORT_REPRESENTATIVE', label: 'Customer Support Representative' },
    { value: 'CALL_CENTER_AGENT', label: 'Call Center Agent' },
    { value: 'CUSTOMER_SUCCESS_MANAGER', label: 'Customer Success Manager' },
    { value: 'TECHNICAL_SUPPORT_SPECIALIST', label: 'Technical Support Specialist' },
    { value: 'CLIENT_SERVICES_COORDINATOR', label: 'Client Services Coordinator' },
    { value: 'LAWYER', label: 'Lawyer' },
    { value: 'PARALEGAL', label: 'Paralegal' },
    { value: 'LEGAL_ASSISTANT', label: 'Legal Assistant' },
    { value: 'JUDGE', label: 'Judge' },
    { value: 'LEGAL_ANALYST', label: 'Legal Analyst' },
    { value: 'SOCIAL_WORKER', label: 'Social Worker' },
    { value: 'COUNSELOR', label: 'Counselor' },
    { value: 'SUBSTANCE_ABUSE_COUNSELOR', label: 'Substance Abuse Counselor' },
    { value: 'CHILD_WELFARE_CASE_WORKER', label: 'Child Welfare Case Worker' },
    { value: 'NONPROFIT_PROGRAM_MANAGER', label: 'Nonprofit Program Manager' },
    { value: 'GOVERNMENT_ANALYST', label: 'Government Analyst' },
    { value: 'PUBLIC_POLICY_ANALYST', label: 'Public Policy Analyst' },
    { value: 'CITY_PLANNER', label: 'City Planner' },
    { value: 'PUBLIC_AFFAIRS_SPECIALIST', label: 'Public Affairs Specialist' },
    { value: 'LEGISLATIVE_ASSISTANT', label: 'Legislative Assistant' },
    { value: 'VENDOR', label: 'Vendor' },
    { value: 'DRIVER', label: 'Driver' },
    { value: 'STUDENT', label: 'Student' },
    { value: 'UNEMPLOYED', label: 'Unemployed' },


  // Add more options as needed
];


  console.log(CtcCedula);
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
            <h1 className='font-medium text-center text-slate-700 dark:text-white'>CTC / Cedula</h1>
            <h1 className='mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300'>Community Tax Certificate</h1>
           
            {isSuccess && (
                  <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                    Transaction success!
                  </div>
                  )}  

            {showWarning && (
                    <div className="text-yellow-600 bg-yellow-100 md:text-sm text-xs text-center rounded-full py-1.5 mb-5">
                      Please fill in all required fields before proceeding.
                    </div>
                  )} 

              {/* Group 1 - Owner's Information*/}
              <h1 className='text-xs text-slate-700 dark:text-white mt-8'>All fields mark with <Req /> are required.</h1>
              <div className='pt-0.5'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Owner’s Information</h1>
                <div className="grid md:grid-cols-8 md:gap-6">
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                  <input onChange={handleInputChange} value={CtcCedula.ctc_lname} type="text" name="ctc_lname" id="ctc_lname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="ctc_lname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                  <input onChange={handleInputChange} value={CtcCedula.ctc_fname} type="text" name="ctc_fname" id="ctc_fname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="ctc_fname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                  <input onChange={handleInputChange} value={CtcCedula.ctc_mname} type="text" name="ctc_mname" id="ctc_mname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                    <label htmlFor="ctc_mname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Middle Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={CtcCedula.ctc_suffix} name="ctc_suffix" id="ctc_suffix" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
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
                    <label htmlFor="ctc_suffix" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Suffix</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={CtcCedula.ctc_sex} name="ctc_sex" id="ctc_sex" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                      <option value="0" className='dark:bg-[#3d3d3d]'>Select Sex</option>
                      <option value="MALE" className='dark:bg-[#3d3d3d]'>Male</option>
                      <option value="FEMALE"className='dark:bg-[#3d3d3d]'>Female</option>
                      </select>
                    <label htmlFor="ctc_sex" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sex<Req /></label>
                  </div>
                </div>
              </div>

              {/* Group 2- Address */}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Address</h1>
                {/* Row 1 */}
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={CtcCedula.ctc_region} name="ctc_region" id="ctc_region" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                     <RegionDropdown />
                    </select>
                    <label htmlFor="ctc_region" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Region<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={CtcCedula.ctc_province} name="ctc_province" id="ctc_province" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                      <ProvinceDropdown selectedRegion={CtcCedula.ctc_region} /> 
                    </select>
                    <label htmlFor="ctc_province" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Province<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={CtcCedula.ctc_municipal} name="ctc_municipal" id="ctc_municipal" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                      <CityDropdown selectedProvince={CtcCedula.ctc_province} />
                    </select>
                    <label htmlFor="ctc_municipal" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Municipal<Req /></label>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid md:grid-cols-7 md:gap-6">
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                  <input onChange={handleInputChange} value={CtcCedula.ctc_reqbrgy} type="text" name="ctc_reqbrgy" id="ctc_reqbrgy" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="ctc_reqbrgy" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Barangay<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                  <input onChange={handleInputChange} value={CtcCedula.ctc_reqhnum} type="text" name="ctc_reqhnum" id="ctc_reqhnum" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="ctc_reqhnum" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">House No. / Unit Floor<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                  <input onChange={handleInputChange} value={CtcCedula.ctc_reqstreet} type="text" name="ctc_reqstreet" id="ctc_reqstreet" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="ctc_reqstreet" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Street / Building Name<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={CtcCedula.ctc_reqzip} type="text" name="ctc_reqzip" id="ctc_reqzip" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                    <label htmlFor="ctc_reqzip" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Zip Code<Req /></label>
                  </div>
                </div>
              </div>

                {/* Group 3 - Other Information */}
                <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Other Information</h1>
                {/* Row 1 */}
                <div className="grid md:grid-cols-6 md:gap-6">
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                  <select onChange={handleInputChange} value={CtcCedula.ctc_civilstatus} defaultValue={0} name="ctc_civilstatus" id="ctc_civilstatus" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                      <option value="0" className='dark:bg-[#3d3d3d]'>Select Civil Status</option>
                      <option value="SINGLE" className='dark:bg-[#3d3d3d]'>Single</option>
                      <option value="MARRIED" className='dark:bg-[#3d3d3d]'>Married</option>
                      <option value="SEPARATED" className='dark:bg-[#3d3d3d]'>Separated</option>
                      <option value="WIDOWED" className='dark:bg-[#3d3d3d]'>Widowed</option>
                    </select>
                    <label htmlFor="ctc_civilstatus" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Civil Status<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <select onChange={handleInputChange} value={CtcCedula.ctc_cznstatus} name="ctc_cznstatus" id="ctc_cznstatus" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required>
                  <CountryDropdwon />
                  </select>
                    <label htmlFor="ctc_cznstatus" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country of Citizenship<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={CtcCedula.ctc_height} type="text" name="ctc_height" id="ctc_height" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""/>
                    <label htmlFor="ctc_height" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Height (ft)</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={CtcCedula.ctc_weight} type="text" name="ctc_weight" id="ctc_weight" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""/>
                    <label htmlFor="ctc_weight" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Weight (kg)</label>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid md:grid-cols-1 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={CtcCedula.ctc_aliencor} type="text" name="ctc_aliencor" id="ctc_aliencor" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""/>
                    <label htmlFor="ctc_aliencor" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Alien Certificate of Registration No. (if alien)</label>
                  </div>
                </div>
              </div>

              {/* Group 4 - Transaction Information*/}
              <div className='pt-6'>
                <h1 className='font-medium text-center text-slate-700 dark:text-white my-4'>Transaction Information</h1>
                {/* Row 1 */}
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={CtcCedula.ctc_employmentstatus} name="ctc_employmentstatus" id="ctc_employmentstatus" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                      <option value="0" className='dark:bg-[#3d3d3d]'>Select Employment Status</option>
                      <option value="WORKER" className='dark:bg-[#3d3d3d]'>Worker</option>
                    <option value="EMPLOYEE" className='dark:bg-[#3d3d3d]'>Employee</option>
                    <option value="UNEMPLOYED" className='dark:bg-[#3d3d3d]'>Unemployed</option>
                    </select>
                    <label htmlFor="ctc_employmentstatus" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Employment Status<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={CtcCedula.ctc_taxpayeraccno} type="text" name="ctc_taxpayeraccno" id="ctc_taxpayeraccno" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required/>
                    <label htmlFor="ctc_taxpayeraccno" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tax Payer Account No.</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <Flatpickr
                      name='ctc_residencetaxdue'
                      id='ctc_residencetaxdue'
                      value={CtcCedula.ctc_residencetaxdue}
                      onChange={(date) => {
                        const formattedDate = date.length > 0 ? (() => {
                          const originalDate = new Date(date[0]);
                          originalDate.setDate(originalDate.getDate() + 1);
                          return originalDate.toISOString().split('T')[0];
                        })() : '';
                        
                        setCtcCedula((prevData) => ({
                          ...prevData,
                          ctc_residencetaxdue: formattedDate,
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
                      htmlFor="ctc_residencetaxdue"
                      className={`peer-focus:font-medium absolute bg-transparent text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 ${
                        CtcCedula.ctc_residencetaxdue ? 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0' : 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                      }`}
                    >
                      Residence Tax Due
                    </label>
                </div>
                </div>
                {/* Row 2 */}
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={CtcCedula.ctc_validid} name="ctc_validid" id="ctc_validid" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
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
                    <label htmlFor="ctc_validid" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valid ID to Present Upon Claiming<Req /></label>
                  </div>
                  <div className="relative">
  <Select
    options={professionOptions}
    onChange={(selectedOption) => handleSelectChange(selectedOption, 'ctc_profession')}
    value={professionOptions.find((option) => option.value === CtcCedula.ctc_profession)}
    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
  />
  <label htmlFor="ctc_profession" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Profession/Occupation/Business<Req /></label>
</div>
                </div>
                {/* Row 3 */}
                <h1 className='text-sm text-slate-700 dark:text-white'>Additional Residence Tax on the following items owned or earned in the Philippines (Tax not exceeded P5,000)</h1>
                {/* Row 4 */}
                <h1 className='text-xs text-slate-700 dark:text-white mt-2.5 mb-1.5'>Income from Real Property (P1 for every P1,000)</h1>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <input onChange={handleInputChange} type="text" name="ctc_incomeca" id="ctc_incomeca" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required/>
                      <label htmlFor="ctc_incomeca" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Taxable Amount<Req /></label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input value={CtcCedula.ctc_cedamount !== 0 ? CtcCedula.ctc_cedamount : ''} type="text" name="ctc_cedamount" id="ctc_cedamount" readOnly className="pointer-events-none block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required/>
                      <label htmlFor="ctc_cedamount" className="pointer-events-none peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cedula Amount</label>
                    </div>
                </div>
                {/* Row 5 */}
                <h1 className='text-xs text-slate-700 dark:text-white mb-1.5'>Gross Receipts or Earnings derived from Business during the preceding year (P1 for every P1,000)</h1>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <input onChange={handleInputChange} type="text" name="ctc_grossta" id="ctc_grossta" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required/>
                      <label htmlFor="ctc_grossta" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Taxable Amount<Req /></label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input value={CtcCedula.ctc_grossca !== 0 ? CtcCedula.ctc_grossca : ''} type="text" name="ctc_grossca" id="ctc_grossca" readOnly className="pointer-events-none block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""/>
                      <label htmlFor="ctc_grossca" className="pointer-events-none peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cedula Amount</label>
                    </div>
                </div>
                {/* Row 6 */}
                <h1 className='text-xs text-slate-700 dark:text-white mb-1.5'>Salaries or Gross Receipts or Earnings derived from exercise of profession or pursuit of any occupation (P1 for every P1,000)</h1>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <input onChange={handleInputChange} type="text" name="ctc_salariesta" id="ctc_salariesta" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required/>
                      <label htmlFor="ctc_salariesta" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Taxable Amount<Req /></label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        id="ctc_salariesca"
                        name="ctc_salariesca"
                        readOnly
                        value={CtcCedula.ctc_salariesca !== 0 ? CtcCedula.ctc_salariesca : ''}
                        className="pointer-events-none block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=""
                        required
                      />                      
                      <label htmlFor="ctc_salariesca" className="pointer-events-none peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cedula Amount</label>
                    </div>
                  </div>
              </div>

              {/* Group 5 - Computation */}
              <div className="flex justify-center md:justify-end text-sm">
                 <div className="w-full md:w-1/2">
                 <div className="flex justify-between">
                <span name="ctc_basicamount" id="ctc_basicamount" className="font-medium whitespace-nowrap">Total (+P Basic Amount)</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="whitespace-nowrap">Total</span>
                <span name="ctc_totalamount" id="ctc_totalamount" className="whitespace-nowrap">P {CtcCedula.ctc_totalamount} .00</span>
              </div>
              <div className="flex justify-between mt-2">
                    <span className="whitespace-nowrap">Interest (20%)</span>
                    <span name="ctc_interest" id="ctc_interest" className="whitespace-nowrap">P {CtcCedula.ctc_interest} .00</span>
                  </div>

                     <hr className='mt-2.5 mb-1'/>
                     <div className="flex justify-between">
                  <span className="font-medium whitespace-nowrap">Total Amount To Pay</span>
                  <span name="ctc_amount" id="ctc_amount" className="whitespace-nowrap">P {CtcCedula.ctc_amountpayable} .00</span>
                </div>
                 </div>
              </div>

              <div className="flex justify-end items-end mt-10 mb-4">
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
          <ModalTransaction selectedTransaction={CtcCedula} modalType={'Community Tax Certificate'} onClose={handleCloseModal} onSubmit={handleSubmit} />
        )}
        
      </div>
    </div>
  );
}

export default CedulaForm;