import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'flatpickr/dist/themes/airbnb.css';
import PersonalInfo from '../admin_userregistry/PersonalInfo';
import ContactInfo from '../admin_userregistry/ContactInfo';
import GovInfo from '../admin_userregistry/GovInfo';
import AdminUserDeleteModal from '../admin_modals/AdminUserDeleteModal';
import AdminURViewImage from './AdminURViewImage';

const AdminURApplications = ({ selectedTransaction, handleRemoveTransaction, isOpen, handleClose }) => { 

  const [userImage, setUserImage] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  // View Image Modal
  const [isImageModalOpen, setisImageModalOpen] = useState(false);
  const handleOpenImage = () => {
      setisImageModalOpen(true);
    }
  const handleCloseImageModal = () => {
    setisImageModalOpen(false);
  };
  

  const checkUserImage = async () => {
    try {
      const imagePath = '../uploads/verification/';
      const imageName = selectedTransaction.user_valid_id;
  
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
  }, []);

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

  const { user_id } = selectedTransaction;


  const handleApprove = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`http://localhost:8800/adminur/approve/${user_id}`);
  
      if (response.status === 200) {
        setIsApproved(true);

        console.log('Verification successful');
  
        setTimeout(() => {
          setIsApproved(false);
          handleClose();
          handleRemoveTransaction(selectedTransaction.transaction_id)
        }, 1500);
      } else {
        console.error('Transaction error:', response.statusText);
      }
    } catch (err) {
      console.error('Transaction error:', err);
    }
  };


  const handleDecline = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`http://localhost:8800/adminur/decline/${user_id}`);
  
      if (response.status === 200) {
        setIsDeclined(true);

        console.log('Verification Declined');
  
        setTimeout(() => {
          setIsDeclined(false);
          handleClose();
          handleRemoveTransaction(selectedTransaction.transaction_id)
        }, 1500);
      } else {
        console.error('Transaction error:', response.statusText);
      }
    } catch (err) {
      console.error('Transaction error:', err);
    }
  };



  return (
    isOpen && (
      <div className="fixed z-50 inset-0 ">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center text-xs md:md:text-sm text-xs sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white dark:bg-[#333333] rounded-sm text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full max-w-2xl max-h-screen relative">
            {/* Menu Bar */}
            <div className="bg-slate-200 dark:bg-[#212121] pt-1.5 pb-1 items-center">
              <button onClick={handleClose} type="button" className="float-right text-slate-500 text-xs md:text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:w-5 md:h-5 w-4 h-4 mr-1">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="font-semibold text-gray-700 bg-slate-200 dark:bg-[#212121] dark:text-gray-300 ml-6">User Profile Information</span>
            </div>

            {/* Content */}
            <div className="px-4 pt-5 pb-3 sm:p-6 sm:pb-6 overflow-y-auto max-h-[38rem]">
              <div className="mx-auto">
                <div className="flex items-center justify-between mb-5">

                  <div className="flex items-center text-xs">
                    <button
                      className="text-white font-medium dark:text-white dark:bg-red-500 dark:hover:bg-red-600 flex items-center bg-red-500 hover:bg-red-600 hover:border-red-600 rounded-sm px-2 py-1.5"
                      onClick={handleDecline}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      <span>Decline</span>
                    </button>
                  </div>

                  <div className="flex items-center text-xs">
                      <button
                        className="text-white font-medium dark:text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 flex items-center bg-emerald-500 hover:bg-emerald-600 hover:border-emerald-500 rounded-sm px-2 py-1.5 ml-2"
                        onClick={handleApprove}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        <span>Approve</span>
                      </button>
                  </div>
                </div>

                  {isApproved && (
                    <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                      Verification Approved!
                    </div>
                  )} 

                  {isDeclined && (
                    <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                      Verification Declined!
                    </div>
                  )} 

                <div className="mb-5">
                  <img
                    name="userImage"
                    className="inline-block md:h-44 md:w-44 w-32 h-32 cursor-pointer rounded-sm border-2 border-black dark:border-white p-1 object-cover object-center"
                    src={userImage}
                    onError={(e) => console.error('Error loading image:', e)}
                    onClick={handleOpenImage}
                  />
                </div>
                <PersonalInfo selectedTransaction={selectedTransaction} />
                <ContactInfo selectedTransaction={selectedTransaction} />
                <GovInfo selectedTransaction={selectedTransaction} />
              </div>
            </div>
          </div>
        </div>
        <AdminURViewImage
          isImageOpen={isImageModalOpen}
          handleCloseImageModal={handleCloseImageModal}
        />
        {/* <AdminUserDeleteModal
        /> */}
      </div>
    )
  );
};

export default AdminURApplications;
