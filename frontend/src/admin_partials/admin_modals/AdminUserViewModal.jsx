import React from 'react';
import defaultImage from '../../images/default_img.png';

const AdminUserViewModal = ({ isOpen, handleClose }) => {
  return (
    isOpen && (
      <div className="fixed z-50 inset-0">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center text-xs md:text-sm sm:block sm:p-0">
          
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
    
          <div className="inline-block align-bottom bg-white dark:bg-[#212121] text-slate-700 dark:text-white rounded-md text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full max-w-2xl max-h-screen overflow-y-auto relative">
            <button onClick={handleClose} type="button" className="absolute top-0 right-0 text-slate-500 text-xs text-center md:text-sm md:m-5 m-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:w-5 md:h-5 w-4 h-4">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="px-4 pt-5 pb-3 sm:p-6 sm:pb-6">
              <span className="font-semibold md:text-lg text-sm">User Profile</span>      
            </div>
    
            <div className="pb-6 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6">
              <div className="mx-auto">
                  <div className='mb-5'>
                    <img
                      name='userImage' 
                      className="inline-block md:h-44 md:w-44 w-32 h-32 rounded-sm border-2 border-black dark:border-white p-1 object-cover object-center"
                      src={defaultImage}
                    />
                  </div>
                  <div>
                    <span>Personal Information</span>
                  </div>
                  <div>
                    <span>Contact Information</span>
                  </div>
                  <div>
                    <span>Government Information</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    
  );
};

export default AdminUserViewModal;
