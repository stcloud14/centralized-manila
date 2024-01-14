import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import defaultImage from '../images/default_img.png';
import ApplyVerificationModal from '../partials/business/ApplyVerificationModal';

const UserSettings =()=>{
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user_id } = useParams();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSuccessUpload, setIsSuccessUpload] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const contentRef = useRef(null);
  const contentRef1 = useRef(null);

  const [verifiedStatus, setIsVerifiedStatus] = useState();


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

  // Apply for Verification Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleApplyModal = () => {
      setIsModalOpen(true);
    }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  useEffect(()=>{
    const fetchUserImage= async()=>{
        try{
            const res= await axios.get(`http://localhost:8800/usersettings/${user_id}`)
            setStoredImage(res.data[0].user_image)
            setIsVerifiedStatus(res.data[0].verification_status)

        }catch(err){
            console.log(err)
        }
    }
    fetchUserImage()
  },[])


  const location = useLocation();
  const [highlightButton, setHighlightButton] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has('unverified') && contentRef1.current) {
      setTimeout(() => {
        contentRef1.current.scrollIntoView({ behavior: 'smooth' });
      }, 0);
      setTimeout(() => {
        setHighlightButton(true);
      }, 1000);
      setTimeout(() => {
        setHighlightButton(false);
      }, 1400);
    }
  }, [location.search]);



  const checkUserImage = async () => {
    try {
      const imagePath = '../uploads/profileImage/';
      const imageName = storedImage;
  
      if (imageName === undefined || imageName === null) {
        console.log('User image name is undefined or null.');
        return;
      }
  
      const isFileExists = await checkFileExists(imagePath, imageName);
  
      if (isFileExists !== null && isFileExists !== undefined) {
        if (isFileExists) {
          const fileData = await fetchFileData(`${imagePath}${imageName}`);
          if (fileData) {
            setUserImage(fileData);
            console.log(`File ${imageName} exists.`);
          } else {
            console.log(`File data for ${imageName} is empty or undefined.`);
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
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('user_img', selectedFile);

      const response = await axios.post(`http://localhost:8800/usersettings/uploadimage/${user_id}`, formData);

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
    e.preventDefault();

    try {

      const response = await axios.delete(`http://localhost:8800/usersettings/removeimage/${user_id}`);

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

  



  const handleDelete = async (e) => {
    e.preventDefault();
    try {
        const confirmDelete = window.confirm('Are you sure you want to delete your account?');
        if (confirmDelete) {
            await axios.delete(`http://localhost:8800/usersettings/accdelete/${user_id}`);
            // Set the new URL using window.location.href
            window.location.href = '/';
        }
        console.log(confirmDelete);
    } catch (error) {
        console.error('Error deleting account:', error.message);
    }
  };






  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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

                  {/* {isSuccess && (
                  <div className="text-emerald-500 bg-emerald-100 md:text-sm text-xs text-center rounded-full py-1.5 mb-5">
                    Password changed successfully!
                  </div>
                  )}


                  {showWarning && (
                    <div className="text-yellow-600 bg-yellow-100 md:text-sm text-xs text-center rounded-full py-1.5 mb-5">
                      Please fill in all required fields before proceeding.
                    </div>
                  )} */}

                  <div className="grid gap-6">
                    <h1 className='font-medium text-center text-slate-700 dark:text-white'>Profile Picture</h1>
                    <div className="flex flex-col items-center justify-center">
                    <div className="mb-6 relative">
                      <img
                        name='userImage' 
                        className="inline-block h-72 w-72 rounded-full border-2 border-black dark:border-white p-1 object-cover object-center relative z-1"
                        src={preSelectedFile || userImage || defaultImg}
                        onError={(e) => console.error('Error loading image:', e)}
                      />
                    
                    {/* Verified Check Mark */}
                    {verifiedStatus === 'Verified' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[125px] h-[125px] pb-3 text-blue-400 absolute bottom-10 right-9 z-10 transform translate-x-1/2 translate-y-1/2" viewBox="0 0 841.89 595.28">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -6 23 38" fill="white">
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                      <g fill="currentColor">
                        <path d="M351.54,516.77l-39.52-67.9l-78.54-16.17l8.83-76.77l-49.93-58.5l49.93-57.98l-8.83-76.75l78.54-16.21
                          l39.52-68.39l69.71,32.39l69.71-32.39l40.05,68.41l78.01,16.19l-8.8311,76.77l49.93,57.96l-49.93,58.5l8.83,76.77l-78.01,16.17
                          l-40.05,67.9l-69.71-32.39L351.54,516.77z M398.88,366.9l118.08-117.51l-23.4-21.42l-94.68,94.01l-49.4-51.69l-23.94,23.48
                          C325.55,293.77,398.88,366.9,398.88,366.9z"/>
                      </g>
                    </svg>
                    ) : null}
                    
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
                              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-0.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg> */}
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


                    <h1 className='font-medium text-center text-slate-700 dark:text-white mt-10'>Password</h1>
                    <div className="relative z-0 w-full mb-2 group">
                      <input type="text" name="current_pass" id="current_pass" placeholder=" "className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="current_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Current Password
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-2 group">
                      <input type="text" name="new_pass" id="new_pass" placeholder=" "className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="new_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        New Password
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-2 group">
                      <input type="text" name="confirm_pass" id="confirm_pass" placeholder=" "className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="confirm_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Confirm New Password
                      </label>
                    </div>

                      {/* Submit Button */}
                    <div className="flex flex-col justify-center mb-4">
                      <button 
                          type="submit" 
                          // onClick={handleSubmit}
                          className="w-full sm:w-auto text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                            Change Password
                      </button>
                    </div>
                  </div>

                  <div ref={contentRef1} className="flex flex-col justify-center mt-4 mb-4">
                    <h1 className='font-medium text-center text-slate-700 dark:text-white mt-10 mb-4'>Account Verification</h1>
                    <button
                        type="button"
                        onClick={handleApplyModal}
                        className={`w-full sm:w-auto text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ${highlightButton ? 'bg-blue-500 text-white dark:text-white dark:bg-blue-500' : ''}`}
                      >
                        Apply for Account Verification
                      </button>

                      {isSuccessUpload && (
                        <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                          Application for verification is successful!
                        </div>
                      )}

                  </div>

                  <div className="flex flex-col justify-center mt-4 mb-4">
                    <h1 className='font-medium text-center text-slate-700 dark:text-white mt-10 mb-4'>Account Deletion</h1>
                    <span className='text-sm mb-4'>Are you sure you want to permanently delete your account?</span>
                    <button
                        type="submit"
                        onClick={handleDelete}
                        className="w-full sm:w-auto text-red-500 hover:text-white border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-normal rounded-full text-sm px-10 py-2.5 text-center md:mb-2 mb-3.5 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
                      >
                        Delete Account
                      </button>
                  </div>
                </form>
              </div>
            </div>
        </main >
        
        <ApplyVerificationModal
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          setIsSuccessUpload={setIsSuccessUpload}
          userID={user_id}
        />

      </div>
    </div>
  );
}

export default UserSettings;