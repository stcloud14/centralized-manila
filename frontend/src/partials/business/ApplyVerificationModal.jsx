import React, { useState, useRef } from 'react';
import axios from 'axios';

const ApplyVerificationModal = ({ isOpen, handleClose, setIsSuccessUpload, onFileSelect, userID, buttonType }) => {

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [isDeclined, setIsDeclined] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const Base_Url = process.env.Base_Url;

  const [isLoading, setisLoading] = useState(false);

  const handleUploadClick = (event) => {
    event.preventDefault();
  
    if (selectedFile) {
      onFileSelect(selectedFile, event);
      handleClose();
    } else {
      console.error('Please select a file before uploading.');
    }
  };


  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
    
      if (file.size <= 3 * 1024 * 1024) { // SET FILE SIZE LIMIT TO 3MB
        setSelectedFile(file);
        setSelectedFileName(file.name);
      } else {

        window.alert("Selected file exceeds the 5MB limit");
        fileInputRef.current.value = '';
        setSelectedFile(null);
        setSelectedFileName(null);
      }
    } else {
      setSelectedFile(null);
      setSelectedFileName(null);
    }
    fileInputRef.current.value = '';
  };

  const handleDrop = (event) => {
    preventDefault(event); 
    const file = event.dataTransfer.files[0];
  
    if (file) {
      if (file.size <= 3 * 1024 * 1024) {
        setSelectedFile(file);
        setSelectedFileName(file.name);
      } else {
        window.alert("Selected file exceeds the 5MB limit");
      }
    } else {
      setSelectedFile(null);
      setSelectedFileName(null);
    }
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  const handleFileChangeClick = () => {
    fileInputRef.current.click();
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      window.alert('Please upload a valid ID before applying.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('user_valid_id', selectedFile);

      const response = await axios.post(`${Base_Url}usersettings/applyverify/${userID}`, formData);

      if (response.status === 200) {
        setisLoading(true);

        setTimeout(() => {
          setisLoading(false);
          setisSuccess(true);
          
          setTimeout(() => {
            setIsSuccessUpload(true);
            handleClose();
            setSelectedFile(null);
            setSelectedFileName(null);
            fileInputRef.current.value = '';
          }, 3000);
        }, 2500);

        console.log('Application successful');

        setTimeout(() => {
            setIsSuccessUpload(false);
        }, 3000);
      } else {

          console.error('Transaction error:', response.statusText);
      }
        
    } catch (error) {

      setisLoading(true);

      setTimeout(() => {
        setisLoading(false);
        setIsDeclined(true);    
        
        setTimeout(() => {
          setIsDeclined(false);    
        }, 3000);
      }, 2500);

        console.error('Error Uploading Image:', error.message);
    }
  };



  return (
    isOpen && (
    <div className="fixed z-50 inset-0 ">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 lg:mx-10 md:mx-10 text-center text-xs md:text-sm sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
        &#8203;
      </span>
      <div className="inline-block align-bottom bg-white dark:bg-[#212121] text-slate-700 dark:text-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full max-w-6xl">
      <div className="sm:flex sm:items-start px-8 pt-8 pb-2">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[12rem] h-[12rem] text-blue-400" viewBox="0 0 841.89 595.28">
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
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                  Verify Account
                </h1>
                <div className="my-2">
                  <p className="text-sm text-gray-600 dark:text-slate-400 text-justify">
                    Please ensure that the information currently displayed in your profile is the most recent and accurate before proceeding with the verification process. Kindly note that it may take
                    <span className="font-semibold text-gray-700 dark:text-slate-300"> 3 to 5 working days for the verification to be processed.</span>
                  </p>
                </div>
              </div>
            </div>

        <div className="pb-1 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 overflow-y-auto">
        <div className="mx-auto">

        {isLoading && (
                    <div className="my-5 text-center">
                      <div className="my-5 text-center">
                      <div className="mb-5 inline-flex items-center justify-center w-12 h-12">
                        <svg aria-hidden="true" className="pb-0 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                      </div>
                    </div>
                    </div>
          )} 
        {isDeclined && (
                    <div className="my-5 text-center">
                      <div className="text-red-700 text-sm bg-red-200 text-center rounded-full py-1.5 mb-5">
                        <h1>You can use JPEG and PNG only</h1>
                      </div>
                    </div>
          )} 

          {isSuccess && (
                    <div className="my-5 text-center">
                      <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                        <h1>Successfuly uploaded</h1>
                      </div>
                    </div>
          )} 
        <h1 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white pb-1">
          Upload Valid ID
        </h1>
        <label 
            onDragOver={preventDefault}
            onDrop={(event) => {
              preventDefault(event);
              handleDrop(event);
            }}
            htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full md:h-[20rem] h-64 border-2 bg-white dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d] border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:border-gray-500">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 mx-3">
            {!!selectedFileName ? (
              <div onClick={handleFileChangeClick}>
              <p className="mb-2 text-xs sm:text-sm text-green-600 dark:text-green-300">
                {selectedFileName}
              </p>
              <p
                className="text-[10px] sm:text-[12px] text-gray-500 dark:text-gray-400 cursor-pointer"
              >
                Change File
              </p>
            </div>
          ) : (
            <>
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-xs sm:text-sm">
                  Click to upload
                </span>{' '}<span className="hidden md:inline-block">or drag and drop</span>
                
              </p>
              <p className="text-[10px] sm:text-[12px] text-gray-500 dark:text-gray-400">
                PNG, JPEG, SVG (MAX. 3MB)
              </p>
            </>
          )}
        </div>

          <input
            onChange={(event) => handleFileInputChange(event)}
            ref={fileInputRef}
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </label>

        </div>
        </div>

          <div className="mr-0 md:mr-2 px-3 pt-3 pb-5 gap-3 sm:px-4 flex justify-end">
            <div className="flex items-center space-x-2 mt-auto">
              <button
                onClick={handleClose}
                type="button"
                className="text-slate-500 text-xs text-center px-5 py-2 mb-0 md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                >
                <p>Close</p>
              </button>

              <button
                onClick={(buttonType === 'register') ? handleUploadClick : handleSubmit}
                type="button"
                className="text-white text-xs text-center px-5 py-2 md:text-sm bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                <p>Apply for Verification</p>
              </button>
            </div>
          </div>

      </div>
    </div>
  </div>
    )
);
};

export default ApplyVerificationModal;