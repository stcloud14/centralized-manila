import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import defaultImage from '../images/default_img.png';
import chiefImg from '../images/CHIEF.png'
import rptaxImg from '../images/RPTAX.png'
import businessImg from '../images/BP.png'
import cedulaImg from '../images/CTC.png'
import lcrImg from '../images/LCR.png'
import urImg from '../images/UR.png'
import PasswordRuleIcon from '../partials/register/PasswordRuleIcon';



const AdminSettings =()=>{
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef(null);
 
  const { admin_type } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const user_id = pathname.split("/")[2];

  let imageUrl;
  let userName;

  switch (admin_type) {
    case 'chief_admin':
      imageUrl = chiefImg;
      userName = 'CHIEF ADMIN';
    break;
    case 'rptax_admin':
      imageUrl = rptaxImg;
      userName = 'RPTAX ADMIN';
      break;
    case 'business_admin':
      imageUrl = businessImg;
      userName = 'BUSINESS PERMIT ADMIN';
      break;
    case 'cedula_admin':
      imageUrl = cedulaImg;
      userName = 'CTC/CEDULA ADMIN';
      break;
    case 'lcr_admin':
      imageUrl = lcrImg;
      userName = 'LOCAL CIVIL REGISTRY ADMIN';
      break;
    case 'registry_admin':
      imageUrl = urImg;
      userName = 'REGISTRY ADMIN';
      break;
    default:
      imageUrl = defaultImage;
      break;
  }

  const [isSuccess, setIsSuccess] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const Base_Url = process.env.Base_Url;


  const [defaultImg, setDefaultImg] = useState(defaultImage);

  const [storedImage, setStoredImage] = useState('');
  const [userImage, setUserImage] = useState('');

  const [selectedFile, setSelectedFile] = useState();
  const [preSelectedFile, setPreSelectedFile] = useState();

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handleButtonClick = () => {
    setIsInputVisible(true);
    setIsButtonVisible(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setSelectedFile(null);
      setError('Please select a file.');
      return;
    }

    const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedFormats.includes(file.type)) {
      setSelectedFile(null);
      setError('Please select a valid image file (JPEG or PNG).');
      return;
    }

    // setUserImage(null);
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
   
  };

  useEffect(()=>{
    const fetchUserImage= async()=>{
        try{
            const res= await axios.get(`${Base_Url}adminprofile/${admin_type}`)
            setStoredImage(res.data[0])

        }catch(err){
            console.log(err)
        }
    }
    fetchUserImage()
  },[])


  const checkUserImage = async () => {
    try {
      const imagePath = '../uploads/adminImages/';
      const imageName = storedImage?.admin_image;
  
      if (imageName === undefined || imageName === null) {
        return;
      }
  
      const isFileExists = await checkFileExists(imagePath, imageName);
  
      if (isFileExists !== null && isFileExists !== undefined) {
        if (isFileExists) {
          const fileData = await fetchFileData(`${imagePath}${imageName}`);
          if (fileData) {
            setUserImage(fileData);
            // console.log(`File ${imageName} exists.`);
          } else {
            // console.log(`File data for ${imageName} is empty or undefined.`);
          }
        } else {
          console.log(`File: ${imageName} does not exist.`);
        }
      }
    } catch (error) {
      console.error('Error checking user image path:', error);
    }
  };

  useEffect(() => {
    checkUserImage();
  }, [storedImage]);

  const checkFileExists = async (folderPath, fileName) => {
    try {
      const filePath = `${folderPath}/${fileName}`;
      const response = await fetch(filePath);

      return response.ok;
    } catch (error) {
      console.error('Error checking file existence:', error);
      return false;
    }
  };

  const fetchFileData = async (filePath) => {
    try {
      const response = await fetch(filePath);
  
      if (!response.ok) {
        if (response.status === 404) {
          console.log('File not found.');
        } else {
          throw new Error(`Failed to fetch file from ${filePath}`);
        }
        return null;
      }
  
      const fileData = await response.blob();
  
      if (!fileData || fileData.size === 0) {
        console.log('File data is empty or undefined.');
        return null;
      }
  
      const dataUrl = URL.createObjectURL(fileData);
  
      return dataUrl;
    } catch (error) {
      console.error('Error fetching file data:', error);
      return null;
    }
  };


  const handleUploadImage = async (e) => {
   
    try {
      const formData = new FormData();
      formData.append('user_img', selectedFile);

      const response = await axios.post(`${Base_Url}adminprofile/uploadimage/${admin_type}`, formData);

      if (response.status === 200) {
          setIsSuccess(true);
          setSelectedFile(null);
          setIsButtonVisible(true);
          setIsInputVisible(false);
          contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          console.log('Upload successful');

          setTimeout(() => {
              setIsSuccess(false);
          }, 3000);
      } else {
          console.error('Transaction error:', response.statusText);
      }
        
    } catch (error) {
        console.error('Error Uploading Image:', error.message);
    }
  };


  const handleRemoveImage = async (e) => {

    try {

      const response = await axios.delete(`${Base_Url}adminprofile/removeimage/${admin_type}`);

      if (response.status === 200) {
          const fileInput = document.getElementById('user_img');
          if (fileInput) {
            fileInput.value = '';
          }
          
          setSelectedFile(null);
          setPreSelectedFile(null);
          setStoredImage(null);

          setIsRemove(true);
          setIsButtonVisible(true);
          setIsInputVisible(false);
          contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          console.log('Remove successful');

          setTimeout(() => {
              setIsRemove(false);
          }, 3000);
      } else {
          console.error('Transaction error:', response.statusText);
      }
        
    } catch (error) {
        console.error('Error Removing Image:', error.message);
    }

  }

  

  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === 'new') {
      setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
    } else if (passwordType === 'confirm') {
      setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    } else if (passwordType === 'current') {
      setShowCurrentPassword((prevShowCurrentPassword) => !prevShowCurrentPassword);
    }
  };

  const isEdge = window.navigator.userAgent.includes('Edg');

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/*  Content Area */}
        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
                <form className="max-w-md mx-auto">
                  
                  {isSuccess && (
                    <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                      Upload Successful!
                    </div>
                  )}  

                  {isRemove && (
                    <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                      Remove Successful!
                    </div>
                  )}  

                  <div className="grid gap-6">
                    <h1 className='font-medium text-center text-slate-700 dark:text-white'>Avatar</h1>
                    <div className="flex flex-col items-center justify-center">
                    <div className="mb-6 relative">
                      <img
                        name='userImage' 
                        className="inline-block h-72 w-72 rounded-full border-2 border-black dark:border-white p-1 object-cover object-center relative z-1"
                        src={preSelectedFile || userImage || imageUrl}
                        // src={preSelectedFile || userImage || defaultImg}
                        // onError={(e) => console.error('Error loading image:', e)}
                      />
                    </div>

                      <div className="flex flex-col items-center w-full mb-4">

                                            
                      {isButtonVisible ? (
                      <button
                        type="button"
                        className="w-full text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm py-1.5 text-center my-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        onClick={handleButtonClick}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                        </svg>
                        { (preSelectedFile || userImage || defaultImg) === defaultImg ? 'Upload Profile Photo' : 'Change Profile Photo' }
                      </button>
                      ) : null}


                      {isInputVisible ? (
                        <input
                          className="w-full border-gray-500 border rounded-full text-sm file:px-4 file:py-1.5 text-black dark:text-white file:cursor-pointer file:border-none file:text-white file:bg-[#212121] file:hover:bg-zinc-700 file:dark:bg-white file:dark:text-black file:dark:hover:bg-slate-400"
                          id="user_img"
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={handleFileChange}
                        />
                      ) : null}
                     
                          
                          {selectedFile ? (
                            <button
                              type="button"
                              onClick={handleUploadImage}
                              className="w-full text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm py-1.5 text-center my-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            >
                              Save Changes
                            </button>
                          ) : null}

                          { (preSelectedFile || userImage || defaultImg) !== defaultImg && isButtonVisible ? (
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="w-full text-red-500 hover:text-white border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-normal rounded-full text-sm py-1.5 text-center my-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-0.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                              Remove Profile Photo
                            </button>
                          ) : null}

                      </div>
                    </div>
                    {/* <h1 className='font-medium text-center text-slate-700 dark:text-white'>Change Password</h1> */}
                      <h1 className="font-base text-justify text-sm text-slate-700 dark:text-white ">
                        To change the password of your administrator account, you will need to contact the System Admin or the {' '}
                        <a className="text-sky-600 underline" href={`/admin_contacts/${user_id}`}>Electronic Data Processing (EDP)</a>
                        {' '}department.
                        </h1>
                      {/* <h1 className="font-base text-justify text-sm text-slate-700 dark:text-white ">
                        Contact the System Admin or the Electronic Data Processing (EDP) department to change your password.
                      </h1>
                    <a href={`/admin_contacts/${user_id}`} className="flex items-center justify-center w-full  text-slate-500 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-slate-300 font-normal rounded-full text-sm py-1.5 text-center mb-2 dark:border-slate-200 dark:text-slate-200 dark:hover:text-slate-700 dark:hover:bg-slate-200 dark:focus:ring-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 inline-block">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"/>
                        </svg>
                        <h1 className="font-base text-sm">
                      System Admin 
                      </h1>
                    </a> */}
                    {/* <h1 className='font-medium text-center text-slate-700 dark:text-white'>Password</h1>
                    <div className='mb-0'>
                      <h1 className='italic text-xs'>Password must be:</h1>
                      <div className="flex items-center">
                        <PasswordRuleIcon />
                        <h1 className="italic text-xs">Minimum of 8 Characters</h1>
                      </div>

                      <div className="flex items-center">
                        <PasswordRuleIcon />
                        <h1 className="italic text-xs">At Least one uppercase and lowercase letter</h1>
                      </div>

                      <div className="flex items-center">
                        <PasswordRuleIcon />
                        <h1 className="italic text-xs">At least one symbol (ex. !@#$%^&*.,-=)</h1>
                      </div>

                      <div className="flex items-center">
                        <PasswordRuleIcon />
                        <h1 className="italic text-xs">At least one number</h1>
                      </div>
                    </div>
                    <div className="relative z-0 w-full mb-2 group">
                      <input type={showCurrentPassword ? 'text' : 'password'} name="current_pass" id="current_pass" placeholder=" "className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="current_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Current Password
                      </label>
                      {isEdge ? (
                      null
                      ) : (
                        <button type="button" className="absolute right-3 top-4 cursor-pointer" onClick={() => togglePasswordVisibility('current')}>
                          {showCurrentPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-700 dark:text-slate-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-700 dark:text-slate-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                          )}
                        </button>
                      )}
                    </div>
                    <div className="relative z-0 w-full mb-2 group">
                      <input type={showNewPassword ? 'text' : 'password'} name="new_pass" id="new_pass" placeholder=" "className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="new_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        New Password
                      </label>
                      {isEdge ? (
                      null
                      ) : (
                        <button type="button" className="absolute right-3 top-4 cursor-pointer" onClick={() => togglePasswordVisibility('new')}>
                          {showNewPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-700 dark:text-slate-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-700 dark:text-slate-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                          )}
                        </button>
                      )}
                    </div>
                    <div className="relative z-0 w-full mb-2 group">
                      <input type={showConfirmPassword ? 'text' : 'password'} name="confirm_pass" id="confirm_pass" placeholder=" "className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="confirm_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Confirm New Password
                      </label>
                      {isEdge ? (
                      null
                      ) : (
                        <button type="button" className="absolute right-3 top-4 cursor-pointer" onClick={() => togglePasswordVisibility('confirm')}>
                          {showConfirmPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-700 dark:text-slate-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-700 dark:text-slate-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                          )}
                        </button>
                      )}
                    </div> */}

                      {/* Submit Button */}
                    {/* <div className="flex flex-col justify-center mb-4">
                      <button 
                          type="submit" 
                          // onClick={handleSubmit}
                          className="w-full sm:w-auto text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                            Change Password
                      </button>
                    </div> */}
                  </div>
                </form>
              </div>
            </div>
        </main>


      </div>
    </div>
  );
}

export default AdminSettings;