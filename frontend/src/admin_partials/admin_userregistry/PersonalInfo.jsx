import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';

const PersonalInfo = ({ selectedTransaction, userInfo, setUserInfo, editMode }) => {

  function formatBirthDate(dateString) {
    if (!dateString) return ''; // Handle case where dateString is undefined or null
  
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  
  return (
    selectedTransaction && (editMode === undefined || editMode === false) ? (
      <div className="my-10">
        <span className='font-bold text-lg text-gray-700 dark:text-white'>Personal Information</span>
        <form>
                    <div className="mt-5 md:px-32 px-12">
                      <label htmlFor="f_name" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">First Name</label>
                      <input value={selectedTransaction.f_name} readOnly type="text" name="f_name" id="f_name" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    {selectedTransaction.m_name ?
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="m_name" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Middle Name</label>
                      <input value={selectedTransaction.m_name} readOnly type="text" name="m_name" id="m_name" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    : null}
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
                      <input value={formatBirthDate(selectedTransaction.birth_date)} readOnly type="text" name="birth_date" id="birth_date" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
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
    ) : (
      <div className="my-10">
        <span className='font-bold text-lg text-gray-700 dark:text-white'>Personal Information</span>
        <form>
                    <div className="mt-5 md:px-32 px-12">
                      <label htmlFor="f_name" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">First Name</label>
                      <input value={selectedTransaction.f_name} type="text" name="f_name" id="f_name" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="m_name" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Middle Name</label>
                      <input  value={selectedTransaction.m_name} type="text" name="m_name" id="m_name" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="l_name" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Last Name</label>
                      <input value={selectedTransaction.l_name} type="text" name="l_name" id="l_name" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="suffix_type" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Suffix</label>
                      <input value={selectedTransaction.suffix_type} type="text" name="suffix_type" id="suffix_type" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="sex_type" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Sex</label>
                      <input value={selectedTransaction.sex_type} type="text" name="sex_type" id="sex_type" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12 relative">
                      <label htmlFor="birth_date" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Date of Birth</label>
                      <div className="relative flex items-center">
                        <Flatpickr
                          value={selectedTransaction.birth_date}
                          id='birth_date'
                          name='birth_date'
                          onChange={(date) => {
                            const formattedDate =
                              date.length > 0
                                ? (() => {
                                  const originalDate = new Date(date[0]);
                                  originalDate.setDate(originalDate.getDate() + 1);
                                  return originalDate.toISOString().split('T')[0];
                                })()
                                : '';
                          }}
                            options={{
                            dateFormat: 'Y-m-d',
                            altInput: true,
                            altFormat: 'F j, Y',
                            appendTo: document.body,
                            onOpen: function (selectedDates, dateStr, instance) {
                              if (document.documentElement.classList.contains('dark')) {
                                const monthDropdown = instance.calendarContainer.querySelector(
                                  '.flatpickr-monthDropdown-months'
                                );
                                if (monthDropdown) {
                                  monthDropdown.style.backgroundColor = '#212121';
                                }
                              }
                            },
                            onClose: function (selectedDates, dateStr, instance) {
                              const monthDropdown = instance.calendarContainer.querySelector(
                                '.flatpickr-monthDropdown-months'
                              );
                              if (monthDropdown) {
                                monthDropdown.style.backgroundColor = '';
                              }
                            },
                          }}
                          className="block w-full md:text-sm text-xs rounded border-0 py-1.5 pl-9 pr-4 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" 
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700 dark:text-white">
                          <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="birth_place" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Place of Birth</label>
                      <input value={selectedTransaction.birth_place} type="text" name="birth_place" id="birth_place" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="cvl_status" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Civil Status</label>
                      <select value={selectedTransaction.cvl_status} defaultValue={0} name="cvl_status" id="cvl_status" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6">
                        <option value="0">Select Civil Status</option>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                      </select> 
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="czn_status" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Citizenship</label>
                      <select value={selectedTransaction.czn_status} defaultValue={0} name="czn_status" id="czn_status" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6">
                        <option value="0">Select Citizenship</option>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                      </select> 
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="res_status" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Residency Status</label>
                      <select value={selectedTransaction.res_status} defaultValue={0} name="res_status" id="res_status" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6">
                        <option value="0">Select Residency Status</option>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                      </select> 
                    </div>
                  </form>
      </div>
    )
  );
};

export default PersonalInfo;

