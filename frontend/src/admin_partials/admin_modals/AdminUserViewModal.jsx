import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'flatpickr/dist/themes/airbnb.css';
import defaultImage from '../../images/default_img.png';
import PersonalInfo from '../admin_userregistry/PersonalInfo';
import ContactInfo from '../admin_userregistry/ContactInfo';
import GovInfo from '../admin_userregistry/GovInfo';
import AdminUserDeleteModal from '../admin_modals/AdminUserDeleteModal';

const AdminUserViewModal = ({ isOpen, handleClose, selectedTransaction }) => {
  
  const [userImage, setUserImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const [userInfo, setUserInfo] = useState(() => {
    // Initialize userInfo with the values of selectedTransaction
    return selectedTransaction || {};
  });

  console.log(userInfo)

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    const updatedValue = isNaN(value) ? value.toUpperCase() : value;
  
    setUserInfo((prevData) => {
      
      if (
        name === 'mobile_no',
        name === 'tel_no',
        name === 'zip_code',
        name === 'user_tin_id',
        name === 'user_pgb_id',
        name === 'user_philh_id',
        name === 'user_sss_id',
        name === 'user_gsis_id',
        name === 'user_natl_id'
      ) {
        const digitValue = value.replace(/\D/g, '');

        return {
          ...prevData,
          [name]: digitValue,
        };
      } 

      if (name === 'birth_date') {
    
        return {
          ...prevData,
          [name]: value,
        };
      } 

      if (name === 'region_id') {
    
        return {
          ...prevData,
          [name]: value,
          prov_id: '',
          city_id: '',
        };
      } 

      if (name === 'prov_id') {
    
        return {
          ...prevData,
          [name]: value,
          city_id: '',
        };
      } 

      else {
        return {
          ...prevData,
          [name]: updatedValue,
        };
      }
    });
  };

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
  
      try {
        const imagePath = '../uploads/profileImage/';
        const imageName = selectedTransaction.user_image;
  
        if (imageName === undefined || imageName === null) {
          console.log('User image name is undefined or null.');
          setIsLoading(false);
          setUserImage(null);
          return;
        }
  
        const isFileExists = await checkFileExists(imagePath, imageName);
  
        if (isFileExists) {
          const fileData = await fetchFileData(`${imagePath}${imageName}`);
          if (fileData) {
            setUserImage(fileData);
          } else {
            console.log(`File data for ${imageName} is empty or undefined.`);
            setUserImage(null);
          }
        } else {
          console.log(`File: ${imageName} does not exist.`);
          setUserImage(null);
        }
      } catch (error) {
        console.error('Error checking user image path:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchImage();
  }, [selectedTransaction]);


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



  const handleSaveChanges = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(`http://localhost:8800/adminur/update/${selectedTransaction.user_id}`, userInfo);
  
      if (response.status === 200) {
        setIsSuccess(true);
        setEditMode(false);
        setUserInfo('');
  
        setTimeout(() => {
          setIsSuccess(false);
          handleClose();
        }, 1500);
      } else {
        console.error('Transaction error:', response.statusText);
      }
    } catch (err) {
      console.error('Transaction error:', err);
    }
  };


  const handleDeleteUser = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.delete(`http://localhost:8800/adminur/update/${selectedTransaction.user_id}`);
  
      if (response.status === 200) {
        setIsDeleted(true);
        setEditMode(false);
        setUserInfo('');
  
        setTimeout(() => {
          setIsDeleted(false);
          handleClose();
        }, 1500);
      } else {
        console.error('Transaction error:', response.statusText);
      }
    } catch (err) {
      console.error('Transaction error:', err);
    }
  };


  const handleEditClick = () => {
    setEditMode(!editMode);
    setUserInfo('');
  };

  const handleCLoseClick = () => {
    handleClose();
    setEditMode(false);
  };

  const handleDeleteClick = () => {
    setIsOpenDelete(!isOpenDelete);
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
              <button onClick={handleCLoseClick} type="button" className="float-right text-slate-500 text-xs md:text-sm"
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
                      className={`text-white font-medium ${
                        editMode ? 'bg-slate-400 dark:bg-slate-500' : 'dark:bg-blue-500'
                      } ${
                        editMode ? 'hover:bg-slate-500 dark:hover:bg-slate-600' : 'hover:bg-blue-600 dark:hover:bg-blue-600'
                      } flex items-center bg-blue-500 hover:bg-blue-600 hover:border-blue-500 rounded-sm px-2 py-1.5`}
                      onClick={handleEditClick}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        {editMode ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />}
                      </svg>
                      <span>{editMode ? 'Cancel' : 'Edit User'}</span>
                    </button>
                    {editMode && (
                      <button
                        className="text-white font-medium dark:text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 flex items-center bg-emerald-500 hover:bg-emerald-600 hover:border-emerald-500 rounded-sm px-2 py-1.5 ml-2"
                        onClick={handleSaveChanges}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        <span>Save</span>
                      </button>
                    )}
                  </div>
                  <div className="flex items-center text-xs">
                    <button
                      className="text-white font-medium dark:text-white dark:bg-red-500 dark:hover:bg-red-600 flex items-center bg-red-500 hover:bg-red-600 hover:border-red-600 rounded-sm px-2 py-1.5"
                      onClick={handleDeleteClick}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      <span>Delete User</span>
                    </button>
                  </div>
                </div>

                  {isSuccess && (
                    <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                      Changes saved successfully!
                    </div>
                  )} 

                  {isDeleted && (
                    <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                      User deleted successfully!
                    </div>
                  )} 

                {isLoading && (
                  <div className="mb-5 inline-flex items-center justify-center md:h-44 md:w-44 w-32 h-32 rounded-sm border-2 border-black dark:border-white p-1">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 md:w-15 md:h-15 lg:w-20 lg:h-20 pb-0 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                )}


                {!isLoading && (
                <div className="mb-5">
                  <img
                    name="userImage"
                    className="inline-block md:h-44 md:w-44 w-32 h-32 rounded-sm border-2 border-black dark:border-white p-1 object-cover object-center"
                    src={userImage || defaultImage}
                  />
                </div>
                )}

                <PersonalInfo selectedTransaction={selectedTransaction} userInfo={userInfo} handleChangeData={handleChangeData} editMode={editMode}/>
                <ContactInfo selectedTransaction={selectedTransaction} userInfo={userInfo} handleChangeData={handleChangeData} editMode={editMode}/>
                <GovInfo selectedTransaction={selectedTransaction} userInfo={userInfo} handleChangeData={handleChangeData} editMode={editMode}/>
              </div>
            </div>
          </div>
        </div>
        <AdminUserDeleteModal
        isOpenDelete={isOpenDelete}
        handleDeleteClick={handleDeleteClick}
        handleDeleteUser={handleDeleteUser}
        />
      </div>
      
    )
  );
};

export default AdminUserViewModal;
