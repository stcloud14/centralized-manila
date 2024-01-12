import React, { useState } from 'react';
import defaultImage from '../../images/default_img.png';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import PersonalInfo from '../admin_userregistry/PersonalInfo';
import ContactInfo from '../admin_userregistry/ContactInfo';
import GovInfo from '../admin_userregistry/GovInfo';

const AdminUserViewModal = ({ isOpen, handleClose }) => {
  const [userBirth, setUserBirth]=useState({})

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
              <button
                onClick={handleClose}
                type="button"
                className="float-right text-slate-500 text-xs md:text-sm"
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
                <div className="mb-5">
                  <img
                    name="userImage"
                    className="inline-block md:h-44 md:w-44 w-32 h-32 rounded-sm border-2 border-black dark:border-white p-1 object-cover object-center"
                    src={defaultImage}
                  />
                </div>
                <PersonalInfo setUserBirth={setUserBirth} />
                <ContactInfo />
                <GovInfo />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AdminUserViewModal;
