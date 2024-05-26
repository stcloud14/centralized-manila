import React, { useState, useEffect } from 'react';

const AdminInfo = ({ selectedTransaction, adminInfo, handleChangeData, editMode }) => {

  const generatePassword = () => {
    const length = 14; 
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    handleChangeData({ target: { name: 'new_password', value: password } });
  };

  return (
    <div className="my-10">
      <span className='font-bold text-lg text-gray-700 dark:text-white'>Admin Information</span>
      <form>
        <div className="mt-2 md:px-32 px-12">
          <label htmlFor="mobile_no" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Admin ID</label>
          <input 
            value={editMode ? adminInfo.mobile_no : selectedTransaction?.mobile_no || ''} 
            readOnly={!editMode}
            onChange={handleChangeData} 
            type="text" 
            name="mobile_no" 
            id="mobile_no" 
            className="block w-full md:text-sm  rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" 
          />
        </div>
        <div className="mt-2 md:px-32 px-12">
          <label htmlFor="new_password" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Password</label>
          <input 
            value={editMode ? adminInfo.new_password : selectedTransaction?.password || ''} 
            readOnly={!editMode} 
            onChange={handleChangeData} 
            type="text" 
            name="new_password" 
            id="new_password" 
            className="block w-full md:text-sm  rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" 
            disabled={editMode} 
          />
          {editMode && (
            <>
              <br/>
              <button 
                onClick={generatePassword}
                type="button" 
                className="flex items-center justify-center w-full text-emerald-500 hover:text-white border border-emerald-500 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-normal rounded-sm text-sm px-4 py-2 text-center ml-0 mb-2 dark:border-emerald-500 dark:text-emerald-500 dark:hover:text-white dark:hover:bg-emerald-500 dark:focus:ring-emerald-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                Generate a strong password
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminInfo;
