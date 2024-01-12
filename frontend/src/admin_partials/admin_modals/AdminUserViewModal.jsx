import React from 'react';
import defaultImage from '../../images/default_img.png';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';

const AdminUserViewModal = ({ isOpen, handleClose }) => {
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
                <div className="my-10">
                  <span className='font-bold text-lg text-gray-700 dark:text-white'>Personal Information</span>
                  <form>
                    <div className="mt-5 md:px-32 px-12">
                      <label htmlFor="f_name" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">First Name</label>
                      <input type="text" name="f_name" id="f_name" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="m_name" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Middle Name</label>
                      <input type="text" name="m_name" id="m_name" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="l_name" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Last Name</label>
                      <input type="text" name="l_name" id="l_name" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="suffix_type" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Suffix</label>
                      <input type="text" name="suffix_type" id="suffix_type" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="sex_type" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Sex</label>
                      <input type="text" name="sex_type" id="sex_type" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12 relative">
                      <label htmlFor="birth_date" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Date of Birth</label>
                      <div className="relative flex items-center">
                        <Flatpickr
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

                            setUserBirth((prevData) => ({
                              ...prevData,
                              birth_date: formattedDate,
                            }));
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
                      <input type="text" name="birth_place" id="birth_place" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="cvl_status" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Civil Status</label>
                      <select defaultValue={0}className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6">
                        <option value="0">Select Civil Status</option>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                      </select> 
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="czn_status" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Citizenship</label>
                      <select defaultValue={0} name="czn_status" id="czn_status"  className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6">
                        <option value="0">Select Citizenship</option>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                      </select> 
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="res_status" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Residency Status</label>
                      <select defaultValue={0} name="res_status" id="res_status"  className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6">
                        <option value="0">Select Residency Status</option>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                      </select> 
                    </div>
                  </form>
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
