import React from 'react';

const AdminInfo = ({ selectedTransaction, adminInfo, handleChangeData, editMode }) => {
  return (
    selectedTransaction && (editMode === undefined || editMode === false) ? (
      <div className="my-10">
        <span className='font-bold text-lg text-gray-700 dark:text-white'>Admin Information</span>
        <form>
          <div className="mt-2 md:px-32 px-12">
            <label htmlFor="mobile_no" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Admin ID</label>
            <input value={selectedTransaction.mobile_no} readOnly type="text" name="mobile_no" id="mobile_no" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
          </div>
          <div className="mt-2 md:px-32 px-12">
            <label htmlFor="password" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Password</label>
            <input value={selectedTransaction.password} readOnly type="text" name="password" id="password" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
          </div>
        </form>
      </div>
    ) : (
      <div className="my-10">
        <span className='font-bold text-lg text-gray-700 dark:text-white'>Admin Information</span>
        <form>
          <div className="mt-2 md:px-32 px-12">
            <label htmlFor="mobile_no" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Admin ID</label>
            <input value={adminInfo.mobile_no} onChange={handleChangeData} type="text" name="mobile_no" id="mobile_no" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
          </div>
          <div className="mt-2 md:px-32 px-12">
            <label htmlFor="password" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Password</label>
            <input value={adminInfo.password} onChange={handleChangeData} type="text" name="password" id="password" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
          </div>
        </form>
      </div>
    )
  );
};

export default AdminInfo;
