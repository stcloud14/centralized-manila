import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import {Link} from "react-router-dom"


import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Req from '../partials/misc/RequiredFieldIndicator';
import Flatpickr from 'react-flatpickr';
 
import 'flatpickr/dist/themes/airbnb.css';
import CityDropdown from '../partials/profile/CityDropdown';
import RegionDropdown from '../partials/profile/RegionDropdown';
import ProvinceDropdown from '../partials/profile/ProvinceDropdown';
import CountryDropdwon from '../partials/profile/CountryDropdown';
import SuffixDropdown from '../partials/profile/SuffixDropdown';
import SexDropdown from '../partials/profile/SexDropdown';
import CivilStatusDropdown from '../partials/profile/CivilStatusDropdown';
import EmploymentStatusDropdown from '../partials/profile/EmploymentStatusDropdown';
import ValidIdDropdown from '../partials/profile/ValidIdDropdown';
import OccupationDropdown from '../partials/profile/OccupationDropdown';
import CDCTermsModal from '../partials/business/CDCTermsModal';
import ModalTransaction from '../partials/transactionModal/ModalTransaction';
import TermsModal from '../partials/business/TermsModal';
import VerifyModal from '../partials/business/VerifyModal';
import UploadButton from '../partials/business/UploadButton';
import UploadImageModal from '../partials/UploadModal';
import RemoveButton from '../partials/business/RemoveButton';

const CedulaForm =()=>{
  
  const { user_id } = useParams();
  const navigate = useNavigate();
  // const location = useLocation();
  // const { pathname } = location;
  // const user_id = pathname.split("/")[2];  

  const Base_Url = process.env.Base_Url;

  const [Reload, setReload] = useState(true);


  // const user_id = pathname.split("/")[2];
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const checkToken = async (token) => {
        try {
            // Make a request to backend API to verify token and check user access
            const response = await axios.get(`${Base_Url}token/protect-token/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setReload(false);
        } catch (error) {
            window.location.href = '/';
        }
    };
    if (token) {
        checkToken(token); 
    } else {
        window.location.href = '/';
    }
}, [user_id]);

  const [CtcCedula, setCtcCedula] = useState((prevData) => ({
    ...prevData,
    ctc_cedamount: 0,
    ctc_grossca: 0,
    ctc_salariesca: 0,
    ctc_totalamount: 0,
    amount: 0,
    ctc_residencetaxdue: '',
    ctc_sexLabel: '',
    ctc_regionLabel: '',
    ctc_provinceLabel: '',
    ctc_municipalLabel: '',
    ctc_valididLabel: '',
    ctc_cvlLabel: '',
    ctc_height: '',
    ctc_weight: '',
  }));

  console.log(CtcCedula)




  
  
  const [uploadModal, setUploadModal] = useState(false);
  const [targetIMG, setTargetIMG] = useState(null);
  
  

  const openUploadModal = (targetIMG) => {
    setTargetIMG(targetIMG);
    setUploadModal(true);
  };

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


  const [fileUploaded, setFileUploaded] = useState(false); // Managing whether a file has been uploaded or not

  const handleRemove = () => {
    console.log("Removing selected file.");
  
    // Reset selectedFile state to remove the file
    setSelectedFile({ fieldName: 'ctc_attachment', value: null });
  
    // Reset fileName state to an empty string
    setFileName('');
  
    // Update fileUploaded state to false since there's no file selected anymore
    setFileUploaded(false);
  };
  

  
  const [selectedFile, setSelectedFile] = useState({ fieldName: 'ctc_attachment', value: null });

  const [fileName, setFileName] = useState('');

  const handleFileSelect = (file) => {
    const allowedTypes = [
      'image/png', 
      'image/jpeg', 
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
  
    if (file.size > 3 * 1024 * 1024) {
      window.alert('File size exceeds the 3MB limit. Please select a smaller file.');
      return;
    }
  
    if (!allowedTypes.includes(file.type)) {
      window.alert('Invalid file type. Please select a PNG, JPG, JPEG, PDF, or DOC/DOCX file.');
      return;
    }
  
    if (selectedFile.value && selectedFile.value.name === file.name) {
      window.alert('Please select a different file');
      return;
    }
  
    setFileName(file.name);
    setSelectedFile({ ...selectedFile, value: file });
  };
  

  

  
  const [isSuccess, setIsSuccess] = useState(false);

  const contentRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (selectedFile.value !== null) {
      formData.append(selectedFile.fieldName, selectedFile.value, selectedFile.value.name);
    }

  
    try {
      const response = await axios.post(`${Base_Url}cedula/ctc/${user_id}`, CtcCedula);

      const response1 = await fetch(`${Base_Url}cedula/ctcimg`, {
        method: 'POST',
        body: formData,
      });

  
      // Check the response status before proceeding
      if (response.status === 200 || response1.status === 200) {
        // Fetch user_email after successful payment
        try {
          const res1 = await axios.get(`${Base_Url}transachistory/transId/${user_id}`);
          const transaction_id = res1.data[0]?.transaction_id;


          const res = await axios.get(`${Base_Url}email/${user_id}`);
          
          if (res.data.user_email) {
            const updatedUserEmail = res.data.user_email;
            const f_name = res.data.f_name;
            const l_name = res.data.l_name;
            const currentDate = new Date();
                    const date = currentDate.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    });
                    const time = currentDate.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric'
                  });
            
            console.log('FETCHED USER EMAIL:', updatedUserEmail);

            const user_email = updatedUserEmail;

            const trans_type = 'Community Tax Certificate';

            const city_name = CtcCedula.ctc_municipalLabel;

            const rowData = { ...CtcCedula, city_name, transaction_id, trans_type, date, time};

            const status_type = 'Pending';

            const body = {
              data: rowData,
              status_type: status_type,
              f_name: f_name,
              l_name: l_name
            };
  
            // Proceed with additional logic after updating state
            try {
              const emailResponse = await axios.post(`${Base_Url}email/send-email/${user_email}`, body);
  
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

        setIsSuccess(true);
        handleCloseModal();
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('Transaction successful');
        
        setTimeout(() => {
          setIsSuccess(false);
          window.location.href = `/transachistory/${user_id}`;
        }, 2100);

      } else {
        console.error('Transaction error:', response.statusText);
        console.error('Transaction error:', response1.statusText);
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
    'ctc_reqbrgy','ctc_reqhnum','ctc_reqstreet','ctc_reqzip','ctc_civilstatus','ctc_cznstatus', 'ctc_residencetaxdue',
    'ctc_employmentstatus','ctc_validid','ctc_profession']; //The input fields that is required
  
  // Exclude ctc_taxpayeraccno from required fields if employment status is UNEMPLOYED
  if (CtcCedula.ctc_employmentstatus !== 'UNEMPLOYED') {
    requiredFields.push('ctc_taxpayeraccno');
  }

  const isIncomplete = requiredFields.some((field) => !CtcCedula[field]);

  if (isIncomplete) {
    contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });    
    setShowWarning(true); // Show warning message and prevent opening the modal
   
    setTimeout(() => {
      setShowWarning(false); // Set a timer to hide the warning message after 4 seconds
    }, 4000);
  } else {  
    setIsModalOpen(true); // Proceed to open the modal
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
    let newState = {
      ...prevData,
      [name]: updatedValue,
    };

    if (name === 'ctc_employmentstatus') {
      newState = {
        ...newState,
        ctc_taxpayeraccno: value === 'UNEMPLOYED' ? '' : prevData.ctc_taxpayeraccno,
      };
    }


    if (name === 'ctc_incomeca') {

      const incomeCedAmount = equivalentAmount({ value });
      const grossCedAmount = prevData.ctc_grossca || 0;
      const salariesCedAmount = prevData.ctc_salariesca || 0;

      const totalAmountPartial = incomeCedAmount + grossCedAmount + salariesCedAmount; 
      const totalAmount = Math.round(totalAmountPartial * 100) / 100; 
      const [ totalAmountPaid] = totalingAmount({ totalAmount });


      return {
        ...prevData,
        [name]: numericValue,
        ctc_cedamount: incomeCedAmount,
        ctc_totalamount: totalAmount,
    
        amount: totalAmountPaid,
      };
    }

    if (id ==='ctc_reqzip') {
      const formattedValue = value.replace(/\D/g, '');

      let maxLength;
    if (id === 'ctc_reqzip') {
      maxLength = 4;
    } 
    
      if (formattedValue.length > maxLength) {
        const truncatedValue = formattedValue.slice(0, maxLength);

        return {
          ...prevData,
          [id]: truncatedValue,
        };
      }

        return {
          ...prevData,
          [id]: formattedValue,
        };
      }

    if (id === 'ctc_grossta') {

      const grossCedAmount = equivalentAmount({ value });
      const incomeCedAmount = prevData.ctc_cedamount || 0;
      const salariesCedAmount = prevData.ctc_salariesca || 0;

      const totalAmountPartial = incomeCedAmount + grossCedAmount + salariesCedAmount; 
      const totalAmount = Math.round(totalAmountPartial * 100) / 100; 
      const [ totalAmountPaid] = totalingAmount({ totalAmount });



      return {
        ...prevData,
        [name]: numericValue,
        ctc_grossca: grossCedAmount,
        ctc_totalamount: totalAmount,
       
        amount: totalAmountPaid,
      };
    }

    if (id === 'ctc_salariesta') {

      const salariesCedAmount = equivalentAmount({ value });
      const incomeCedAmount = prevData.ctc_cedamount || 0;
      const grossCedAmount = prevData.ctc_grossca || 0;

      const totalAmountPartial = incomeCedAmount + grossCedAmount + salariesCedAmount; 
      const totalAmount = Math.round(totalAmountPartial * 100) / 100; 
      const [ totalAmountPaid] = totalingAmount({ totalAmount });



      return {
        ...prevData,
        [name]: numericValue,
        ctc_salariesca: salariesCedAmount,
        ctc_totalamount: totalAmount,
       
        amount: totalAmountPaid,
      };
    }
    
    if (id === 'ctc_sex') {

      const label = e.target.options[e.target.selectedIndex].text;
      
      return {
        ...prevData,
        [id]: value,
        ctc_sexLabel: label,
      };
    }

    if (id === 'ctc_civilstatus') {

      const label = e.target.options[e.target.selectedIndex].text;
      
      return {
        ...prevData,
        [id]: value,
        ctc_cvlLabel: label,
      };
    }

    if (id === 'ctc_validid') {

      const label = e.target.options[e.target.selectedIndex].text;
      
      return {
        ...prevData,
        [id]: value,
        ctc_valididLabel: label,
      };
    }

    if (id === 'ctc_region') {

      const label = e.target.options[e.target.selectedIndex].text;
      
      return {
        ...prevData,
        [id]: value,
        ctc_regionLabel: label,
      };
    }

    if (id === 'ctc_province') {

      const label = e.target.options[e.target.selectedIndex].text;
      
      return {
        ...prevData,
        [id]: value,
        ctc_provinceLabel: label,
      };
    }

    if (id === 'ctc_municipal') {

      const label = e.target.options[e.target.selectedIndex].text;
      
      return {
        ...prevData,
        [id]: value,
        ctc_municipalLabel: label,
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

    if (name === 'ctc_height' || name === 'ctc_weight') {
      // Remove non-numeric characters and multiple dots from the input value
      let numericValue = value.replace(/[^\d.]/g, ''); // Remove non-numeric characters and multiple dots
      const dotIndex = numericValue.indexOf('.'); // Check if there is a dot already
      if (dotIndex !== -1) {
        // If there is a dot already, remove all subsequent dots
        numericValue = numericValue.substring(0, dotIndex + 1) + numericValue.substring(dotIndex + 1).replace(/\./g, '');
      }
      return {
        ...prevData,
        [name]: numericValue,
      };

    }  else {
      return {
        ...prevData,
        ...newState, // Merge newState with prevData
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
  const ctc_confee = 15;
  const ctc_basefee = 5;

  const totalFees = ctc_confee + ctc_basefee;

  if (totalAmount >= 0) {
    const totalAmountPaid = Math.round(parseFloat(totalAmount) +  totalFees);

    return [ totalAmountPaid];
  } else {
    return [0, 0];
  }
}


const [isModalVisible, setIsModalVisible] = useState(true);
  const [isVerifiedStatus, setIsVerifiedStatus] = useState();

  useEffect(()=>{
    const fetchUserVerification= async()=>{
        try{
            const res= await axios.get(`${Base_Url}usersettings/${user_id}`)
            setIsVerifiedStatus(res.data[0].verification_status)
            
        }catch(err){
            console.log(err)
        }
    }
    fetchUserVerification()
  },[])

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  
  if (Reload) {
    return // Display a loading message or spinner while checking the token
  }
 
  
  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {isVerifiedStatus === 'Verified' ? null :
        <VerifyModal isVerifiedStatus={isVerifiedStatus} userID={user_id} />
        }

        {isVerifiedStatus === 'Verified' ? (
        <TermsModal isVisible={isModalVisible} onProceed={toggleModalVisibility} userID={user_id} />
        ) : null
        }

        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
              
           
            <form onSubmit={handleSubmit} className={`overflow-y-auto ${isModalVisible ? 'blur' : ''}`}>
            <div className="grid grid-cols-5 items-center">

              {/* Description ONLY APPEARS IN DESKTOP VIEW */}
              <div className="hidden sm:flex mb-7">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 flex-shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                  <h1 className="text-[0.63rem] flex text-gray-500 dark:text-gray-400 pl-1 mt-0.5">Fill out the necessary information below to process your CTC / Cedula.</h1>
              </div>

              {/* Description Button ONLY APPEARS IN MOBILE VIEW */}
              <div className="flex sm:hidden mb-7">
                <div className="relative inline-block text-left">
                  <button type="button" onClick={() => document.getElementById('popover-click').classList.toggle('hidden')} className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                  </button>

                  {/* POPOVER */}
                  <div id="popover-click" className="text-xs hidden absolute z-10 w-64 px-3 py-3 transition-opacity duration-300 rounded-sm shadow-2xl bg-white dark:bg-[#212121]">
                      <p>Fill out the necessary information below to process your CTC / Cedula.</p>
                  </div>
                </div>
              </div>

              {/* FORMS TITLE */}
              <div className="flex flex-col col-span-3">
                <h1 className="font-medium text-center text-slate-700 dark:text-white">CTC / Cedula</h1>
                <h1 className="mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300">CTC / Cedula Application Form</h1>
              </div>
              </div>
              <div className="grid md:grid-cols-4 grid-cols-2 gap-3 items-center justify-center text-xs w-full">
                <div className="flex flex-col items-center text-center">
                  <span className='font-semibold text-blue-500'>Step 1</span>
                  <span className='font-normal text-blue-500'>Fill the Form</span>
                  <div className="w-full h-1 bg-blue-500" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <span>Step 2</span>
                  <span>Review and Submit</span>
                  <div className="w-full h-1 bg-blue-200 dark:bg-slate-400" />
                </div>
                <div className="flex flex-col col-span-2 items-center text-center mt-2 sm:mt-0">
                  <span>Final Step</span>
                  <span>Pay the transaction</span>
                  <div className="w-full h-1 bg-blue-200 dark:bg-slate-400" />
                </div>
              </div>

              {isSuccess && (                
              <div className="my-5 text-center">
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12">
                  <svg aria-hidden="true" className="pb-0 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                </div>
                <div className='text-emerald-500 bg-emerald-100 md:text-sm text-xs text-center rounded-full py-1.5'>Transaction successful! Redirecting to Transaction History...</div> 
              </div>
              )}


            {showWarning && (
              <div className="text-yellow-600 bg-yellow-100 md:text-sm text-xs text-center rounded-full py-1.5 my-5">
                Please fill in all required fields before proceeding.
              </div>
            )} 

            {uploadModal && <UploadImageModal onClose={() => setUploadModal(false)}  onFileSelect={handleFileSelect} targetIMG={targetIMG} />}

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
                    <select onChange={handleInputChange} value={CtcCedula.ctc_suffix} name="ctc_suffix" id="ctc_suffix" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
                      <SuffixDropdown/>
                      </select>
                    <label htmlFor="ctc_suffix" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Suffix</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={CtcCedula.ctc_sex} name="ctc_sex" id="ctc_sex" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                     <SexDropdown/>
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
                    <select onChange={handleInputChange} value={CtcCedula.ctc_region} name="ctc_region" id="ctc_region" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                     <RegionDropdown />
                    </select>
                    <label htmlFor="ctc_region" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Region<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={CtcCedula.ctc_province} name="ctc_province" id="ctc_province" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                      <ProvinceDropdown selectedRegion={CtcCedula.ctc_region} /> 
                    </select>
                    <label htmlFor="ctc_province" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Province<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={CtcCedula.ctc_municipal} name="ctc_municipal" id="ctc_municipal" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
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
                  <select onChange={handleInputChange} value={CtcCedula.ctc_civilstatus} defaultValue={0} name="ctc_civilstatus" id="ctc_civilstatus" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" >
                    <CivilStatusDropdown/>
                    </select>
                    <label htmlFor="ctc_civilstatus" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Civil Status<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-2 group">
                    <select onChange={handleInputChange} value={CtcCedula.ctc_cznstatus} name="ctc_cznstatus" id="ctc_cznstatus" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" placeholder="" required>
                  <CountryDropdwon />
                  </select>
                    <label htmlFor="ctc_cznstatus" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country of Citizenship<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleInputChange} value={CtcCedula.ctc_height} type="text" name="ctc_height" id="ctc_height" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
                    <label htmlFor="ctc_height" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Height (cm)</label>
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
                    <select onChange={handleInputChange} value={CtcCedula.ctc_employmentstatus} name="ctc_employmentstatus" id="ctc_employmentstatus" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                    <option value="0" className='dark:bg-[#3d3d3d]'>Select Employment Status</option>
                    <option value="EMPLOYED" className='dark:bg-[#3d3d3d]'>Employed </option>
                    <option value="UNEMPLOYED" className='dark:bg-[#3d3d3d]'>Unemployed</option>
                    </select>
                    <label htmlFor="ctc_employmentstatus" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Employment Status<Req /></label>
                  </div>
                  
                  <div className="flex flex-row group ml-4 items-center md:col-span-2">
                      
                  <p className="text-xs text-slate-700 dark:text-white mt-2.5 mb-1.5">
                    {selectedFile.value && selectedFile.fieldName === 'ctc_attachment' ? (
                      <>
                        {selectedFile.value.size > 2 * 1024 * 1024 ? (
                          <div>File "{getShortName(selectedFile.value.name, 25)}" exceeds the 2MB limit.</div>
                        ) : (
                          getShortName(selectedFile.value.name, 25)
                        )}
                      </>
                    ) : null}
                  </p>

                  {!selectedFile.value && (
                    <td className="flex flex-row group ml-1">
                      <UploadButton openUploadModal={openUploadModal} targetIMG={'ctc_attachment'} />
                    </td>
                  )}

                  {selectedFile.value && (
                    <td className="flex flex-row group ml-1">
                      <RemoveButton handleRemove={handleRemove} />
                    </td>
                  )}

                    <span className="text-[0.60rem] text-gray-500 dark:text-gray-400 items-center ml-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3 pb-0.5 inline-block text-gray-500 dark:text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
                      </svg>
                      If you are a STUDENT, upload SCHOOL ID. If you are EMPLOYED, upload PROOF OF INCOME.
                    </span>

                  </div>
                  
                </div>

        <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={handleInputChange}
            value={CtcCedula.ctc_taxpayeraccno}
            type="text"
            name="ctc_taxpayeraccno"
            id="ctc_taxpayeraccno"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            disabled={CtcCedula.ctc_employmentstatus === 'UNEMPLOYED'}
            {...(CtcCedula.ctc_employmentstatus !== 'UNEMPLOYED' && { required: true })}
          />
          <label
            htmlFor="ctc_taxpayeraccno"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tax Payer Account No.
            {CtcCedula.ctc_employmentstatus !== 'UNEMPLOYED' && <Req />}
          </label>
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
                      Residence Tax Due<Req />
                    </label>
                </div>
                </div>


                {/* Row 2 */}
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={CtcCedula.ctc_validid} name="ctc_validid" id="ctc_validid" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
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
                      <option value="12" className='dark:bg-[#3d3d3d]'>GSIS ID</option>
                      <option value="13" className='dark:bg-[#3d3d3d]'>OWWA ID</option>
                      <option value="14" className='dark:bg-[#3d3d3d]'>PRC ID</option>
                      <option value="15" className='dark:bg-[#3d3d3d]'>TIN ID</option>
                      <option value="16" className='dark:bg-[#3d3d3d]'>PHILIPPINE PASSPORT CARD</option>
                      <option value="17" className='dark:bg-[#3d3d3d]'>PHILIPPINE NATIONAL POLICE ID</option>
                      <option value="18" className='dark:bg-[#3d3d3d]'>AFP ID</option>
                      <option value="19" className='dark:bg-[#3d3d3d]'>IBP ID</option>
                      <option value="20" className='dark:bg-[#3d3d3d]'>PRC ID</option>
                      <option value="21" className='dark:bg-[#3d3d3d]'>DFA EPASSPORT</option>
                      <option value="22" className='dark:bg-[#3d3d3d]'>OFW ID</option>
                      <option value="23" className='dark:bg-[#3d3d3d]'>SSS UMID</option>
                      <option value="24" className='dark:bg-[#3d3d3d]'>DFA ISSUED POSTAL ID</option>
                      <option value="25" className='dark:bg-[#3d3d3d]'>DOLE ID</option>
                      <option value="26" className='dark:bg-[#3d3d3d]'>NCWDP ID</option>
                      <option value="27" className='dark:bg-[#3d3d3d]'>DSWD ID</option>
                      <option value="28" className='dark:bg-[#3d3d3d]'>PNR ID</option>
                      <option value="29" className='dark:bg-[#3d3d3d]'>LGU ID</option>
                      <option value="30" className='dark:bg-[#3d3d3d]'>PHILHEALTH INSURANCE CARD</option>
                      <option value="31" className='dark:bg-[#3d3d3d]'>POEA eCARD</option>
                      <option value="32" className='dark:bg-[#3d3d3d]'>NBI CLEARANCE</option>
                      <option value="33" className='dark:bg-[#3d3d3d]'>CID CLEARANCE</option>
                      <option value="34" className='dark:bg-[#3d3d3d]'>DTI CERTIFICATE</option>
                      <option value="35" className='dark:bg-[#3d3d3d]'>COMPANY ID</option>
                      <option value="36" className='dark:bg-[#3d3d3d]'>MARINA ID</option>
                      <option value="37" className='dark:bg-[#3d3d3d]'>DOH LICENSE</option>
                      <option value="38" className='dark:bg-[#3d3d3d]'>DOE LICENSE</option>
                      <option value="39" className='dark:bg-[#3d3d3d]'>PRC PROFESSIONAL ID</option>
                      <option value="40" className='dark:bg-[#3d3d3d]'>IBP ID</option>
                      <option value="41" className='dark:bg-[#3d3d3d]'>IMMIGRANT CERTIFICATE</option>
                      <option value="42" className='dark:bg-[#3d3d3d]'>BIR TIN ID</option>
                      <option value="43" className='dark:bg-[#3d3d3d]'>LGU OFFICE ID</option>
                      <option value="44" className='dark:bg-[#3d3d3d]'>PNP FIREARMS LICENSE</option>
                      <option value="45" className='dark:bg-[#3d3d3d]'>SOLO PARENT ID</option>
                      <option value="46" className='dark:bg-[#3d3d3d]'>PWD ID</option>
                      <option value="47" className='dark:bg-[#3d3d3d]'>DOST ID</option>
                      <option value="48" className='dark:bg-[#3d3d3d]'>PRC LICENSURE CERTIFICATE</option>
                      <option value="49" className='dark:bg-[#3d3d3d]'>OFW eCARD</option>
                      <option value="50" className='dark:bg-[#3d3d3d]'>DFA ID</option>
                      <option value="51" className='dark:bg-[#3d3d3d]'>SCHOOL ID</option>
                      <option value="52" className='dark:bg-[#3d3d3d]'>ITR</option>
                      <option value="53" className='dark:bg-[#3d3d3d]'>PAYSLIP</option>
                    </select>
                    <label htmlFor="ctc_validid" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valid ID to Present Upon Claiming<Req /></label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleInputChange} value={CtcCedula.ctc_profession} name="ctc_profession" id="ctc_profession" defaultValue={0} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer" required>
                      <OccupationDropdown/>
                      </select>

                      <label htmlFor="ctc_profession" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Profession/Occupation/Business<Req /></label>
                    </div>
                </div>
                {/* Row 3 */}
                  <h1 className='text-sm text-slate-700 dark:text-white'>
                    Additional Residence Tax on the following items owned or earned in the Philippines (Tax not exceeded P5,000)
                  </h1>
                
                {/* Row 4 */}
                  <h1 className='text-xs text-slate-700 dark:text-white mt-2.5 mb-1.5'>Income from Real Property (P1 for every P1,000)    
                    <span className="text-[0.60rem] text-gray-500 dark:text-gray-400 items-center ">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3 pb-0.5 inline-block text-gray-500 dark:text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
                      </svg>
                    If not applicable, put 0
                    </span>
                  </h1>
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
                  <h1 className='text-xs text-slate-700 dark:text-white mb-1.5'>Gross Receipts or Earnings derived from Business during the preceding year (P1 for every P1,000)                <span className="text-[0.60rem] text-gray-500 dark:text-gray-400 items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3 pb-0.5 inline-block text-gray-500 dark:text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
                    </svg>
                    If not applicable, put 0
                    </span>
                  </h1>
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
                  <h1 className='text-xs text-slate-700 dark:text-white mb-1.5'>Salaries or Gross Receipts or Earnings derived from exercise of profession or pursuit of any occupation (P1 for every P1,000)                <span className="text-[0.60rem] text-gray-500 dark:text-gray-400 items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3 pb-0.5 inline-block text-gray-500 dark:text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
                    </svg>
                    If not applicable, put 0
                    </span>
                  </h1>
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
                    <span className="whitespace-nowrap">Base Fee</span>
                    <span name="ctc_basefee" id="ctc_basefee" className="whitespace-nowrap">P 5 .00</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="whitespace-nowrap">Convenience Fee </span>
                    <span name="ctc_confee" id="ctc_confee" className="whitespace-nowrap">P 15 .00</span>
                  </div>

                     <hr className='mt-2.5 mb-1'/>
                     <div className="flex justify-between">
                  <span className="font-medium whitespace-nowrap">Total Amount To Pay</span>
                  <span name="ctc_amount" id="ctc_amount" className="whitespace-nowrap">P {CtcCedula.amount} .00</span>
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
          <Footer />
        </main>

        {isModalOpen && (
          <ModalTransaction selectedTransaction={CtcCedula} cedulaImages={selectedFile} modalType={'Community Tax Certificate'} onClose={handleCloseModal} onSubmit={handleSubmit} />
        )}
        
      </div>
    </div>
  );
}

export default CedulaForm;