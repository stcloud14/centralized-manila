import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';

const PersonalInfo = ({ selectedTransaction }) => {
  return (
    <div className="my-10">
                  <span className='font-bold text-lg text-gray-700 dark:text-white'>Personal Information</span>
                  <form>
                    <div className="mt-5 md:px-32 px-12">
                      <label htmlFor="f_name" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">First Name</label>
                      <input value={selectedTransaction.f_name} readOnly type="text" name="f_name" id="f_name" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="m_name" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Middle Name</label>
                      <input value={selectedTransaction.m_name} readOnly type="text" name="m_name" id="m_name" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="l_name" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Last Name</label>
                      <input value={selectedTransaction.l_name} readOnly type="text" name="l_name" id="l_name" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    {selectedTransaction.suffix_type ?
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="suffix_type" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Suffix</label>
                      <input value={selectedTransaction.suffix_type} readOnly type="text" name="suffix_type" id="suffix_type" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    : null}
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="sex_type" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Sex</label>
                      <input value={selectedTransaction.sex_type} readOnly type="text" name="sex_type" id="sex_type" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="birth_date" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Date of Birth</label>
                      <input value={selectedTransaction.birth_date} readOnly type="text" name="birth_date" id="birth_date" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="birth_place" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Place of Birth</label>
                      <input value={selectedTransaction.birth_place} readOnly type="text" name="birth_place" id="birth_place" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="cvl_status" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Civil Status</label>
                      <input value={selectedTransaction.cvl_status} readOnly type="text" name="cvl_status" id="cvl_status" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="czn_status" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Civil Status</label>
                      <input value={selectedTransaction.czn_status} readOnly type="text" name="czn_status" id="czn_status" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="res_status" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Civil Status</label>
                      <input value={selectedTransaction.res_status} readOnly type="text" name="res_status" id="res_status" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                  </form>
                </div>
  );
};

export default PersonalInfo;
