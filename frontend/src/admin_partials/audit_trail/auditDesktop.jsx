import React, { useState } from 'react';
// import StatusBadgeDesktop from 'frontend/src/partials/StatusBadgeDesktop.jsx';
import Flatpickr from 'react-flatpickr';

import RPTAX from '../../images/RPTAX.png';
import BP from '../../images/BP.png';
import CTC from '../../images/CTC.png';
import LCR from '../../images/LCR.png';
import UR from '../../images/UR.png';

  

const AuditDesktop = ({ auditTrail, searchInput, setSearchInput, handleSearch, handleClearFilter, handleInputChange, handleInputChange2, selectedDate, setSelectedDate, selectedDatee, setSelectedDatee, selectedStatus, selectedType }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  function formatTimeAgo(time_stamp) {
    const createdAt = new Date(time_stamp);

    const day = createdAt.toLocaleDateString('en-US', { day: 'numeric' });
    const month = createdAt.toLocaleDateString('en-US', { month: 'short' });
    const time = createdAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    return `${day} ${month} at ${time}`;
}
  
  // function formatTimeAgo(time_stamp) {
  //   const now = new Date();
  //   const createdAt = new Date(time_stamp);
  //   const timeDifference = now - createdAt;
  //   const minutes = Math.floor(timeDifference / (1000 * 60));
  //   const hours = Math.floor(minutes / 60);
  //   const days = Math.floor(minutes / 1440);
  //   const weeks = Math.floor(days / 7);
  //   const months = Math.floor(days / 30);
  //   const years = Math.floor(days / 365);
  
  //   if (minutes < 1) {
  //     return 'Just now';
  //   } else if (minutes < 60) {
  //     return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  //   } else if (hours < 24) {
  //     return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  //   } else if (days < 7) {
  //     if (days === 1) {
  //       return 'Yesterday at ' + createdAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  //     } else {
  //       return createdAt.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) +
  //         ' at ' + createdAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  //     }
  //   } else if (weeks < 4) {
  //     return createdAt.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) +
  //       ' at ' + createdAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  //   } else if (months < 12) {
  //     return createdAt.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) +
  //       ' at ' + createdAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  //   } else {
  //     return createdAt.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) +
  //       ' at ' + createdAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  //   }
  // }

  const getImage = (admin) => {
    switch (admin) {
      case 'RPTAX ADMIN':
        return RPTAX;
      case 'BUSINESS ADMIN':
        return BP;
      case 'CTC ADMIN':
        return CTC;
      case 'LCR ADMIN':
        return LCR;
      case 'UR ADMIN':
        return UR;
    }
  };

  console.log(auditTrail)
  
    return (
        <>
        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
          <div className="px-5 py-5">
            <h1 className='font-medium text-center text-slate-700 dark:text-white mb-7 md:mb-3'>Activity Log</h1>
           
          {/* Search */}
          <div className="flex flex-col items-center sm:flex-row text-xs pb-5">
            <div className="flex-row flex justify-end w-full">
            {/* Filter Button */}
            <div className="relative w-full sm:w-20 text-left z-10">
                <button type="button" onClick={toggleDropdown} className="bg-blue-500 hover:bg-blue-600 text-white justify-center py-1 mr-2 w-full rounded-sm inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path className="stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
                  <span className="pl-1">Filter</span>
                </button>

              {isDropdownOpen && (
              <div className="absolute w-[270px] origin-top-right py-2 px-3 bg-white dark:bg-[#212121] dark:text-slate-400 rounded-sm shadow-2xl z-20 md:right-10 top-[9rem] sm:top-7 sm:w-[405px]">

              {/* Date Row */}
              <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                  <span className="hidden sm:block text-xs">Date:</span>
                  <span>
                  <Flatpickr
                      value={selectedDate}
                      onChange={(date) => setSelectedDate(date[0])}
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
                      placeholder="From"
                      className="bg-transparent text-xs border border-slate-300 text-slate-700 dark:text-white py-1 md:py-0.5 rounded-sm w-[110px] sm:w-[150px]"
                  />
                  <span> - </span>
                  <Flatpickr
                      value={selectedDatee}
                      onChange={(date) => setSelectedDatee(date[0])}
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
                      placeholder="To"
                      className="bg-transparent text-xs border border-slate-300 text-slate-700 dark:text-white py-1 md:py-0.5 rounded-sm w-[110px] sm:w-[150px]"
                  />
                  </span>
              </div>

              {/* Activity */}
              <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                <span className="hidden sm:block text-xs">Activity:</span>
                  <select  value={selectedStatus} onChange={handleInputChange2} name=""  id=""  className="text-xs border bg-transparent border-slate-300 text-slate-700 dark:text-white pl-4 rounded-sm peer cursor-pointer py-1 md:py-0.5 w-[235px]">
                      <option value="All" className="dark:bg-[#3d3d3d]">Select Activity</option>
                      <option value="Pending Transaction" className="dark:bg-[#3d3d3d]">Pending Transaction</option>
                      <option value="Processing Transaction" className="dark:bg-[#3d3d3d]">Processing Transaction</option>
                      <option value="Completed Transaction" className="dark:bg-[#3d3d3d]">Completed Transaction</option>
                      <option value="Rejected Transaction" className="dark:bg-[#3d3d3d]">Rejected Transaction</option>
                      <option value="Updated Information" className="dark:bg-[#3d3d3d]">Updated Information</option>
                      <option value="Approved Verification" className="dark:bg-[#3d3d3d]">Approved Verification</option>
                      <option value="Declined Verification" className="dark:bg-[#3d3d3d]">Declined Verification</option>
                  </select>
              </div>

             {/* Type */}
             <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                <span className="hidden sm:block text-xs">Admin:</span>
                  <select  value={selectedType} onChange={handleInputChange} name=""  id=""  className="text-xs border bg-transparent border-slate-300 text-slate-700 dark:text-white pl-4 rounded-sm peer cursor-pointer py-1 md:py-0.5 w-[235px]">
                      <option value="All" className="dark:bg-[#3d3d3d]">Select Admin</option>
                      <option value="RPTAX ADMIN" className="dark:bg-[#3d3d3d]">Real Property Tax</option>
                      <option value="BUSINESS ADMIN" className="dark:bg-[#3d3d3d]">Business Permit</option>
                      <option value="CTC ADMIN" className="dark:bg-[#3d3d3d]">Community Tax Certificate</option>
                      <option value="LCR ADMIN" className="dark:bg-[#3d3d3d]">Local Civil Registry</option>
                      <option value="UR ADMIN" className="dark:bg-[#3d3d3d]">User Registry</option>
                  </select>
              </div>

              {/* ID Number */}
              <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
                  <span className="hidden sm:block pr-10 text-xs">ID Number:</span>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                  </span>
                  <input value={searchInput} onChange={(e) => setSearchInput(e.target.value.toUpperCase())} id="searchInput" onKeyDown={(e) => e.key === 'Enter' && handleSearch()} type="text" placeholder="Search ID..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
                </div>
              </div>

              <button type="button" onClick={() => { handleSearch(); toggleDropdown(); }} className=" bg-blue-500 hover:bg-blue-600 text-white mr-[6px] sm:mr-[0px] px-4 py-1 mt-2 mb-0.5 rounded-sm flex items-center ml-auto">
                  <span className="mx-auto">Filter</span>
              </button>
              </div>
              )}
            </div>

            {/* Clear Button */}
            <div className="w-full sm:w-20 ml-2">
            <button type="button" onClick={handleClearFilter} className="bg-slate-500 hover:bg-slate-600 text-white justify-center py-1 w-full rounded-sm inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
                <span className="pl-1">Clear</span>
            </button>
            </div>
          </div>
        </div>


            <div className="relative overflow-x-auto shadow-md rounded-sm">
              <table className="w-full text-left text-xs md:text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-gray-700 uppercase bg-slate-200 dark:bg-[#212121] dark:text-slate-400">
                    <tr>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center pl-3">
                              Time Stamp
                            </div>
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Activity 
                            </div>
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Admin
                            </div>
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              
                            </div>
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Date
                            </div>
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Identification Number
                            </div>
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Changes
                            </div>
                        </th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody>

                {auditTrail && auditTrail.length > 0 ? (
                auditTrail.map((audit) => (
                  
                <tr key={audit.time_stamp} className=' bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                  <td className="pl-6 pr-3 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-500 whitespace-nowrap dark:text-white">
                    {formatTimeAgo(audit.time_stamp)}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {audit.activity}
                  </td>
                  <td className="px-3 py-4 flex items-center justify-between whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  <span>{audit.admin}</span>
                  </td>
                  <td>
                  <span title={audit.admin.admin_name}>
                    <img
                      name="userImage" 
                      className="inline-block h-10 w-10 rounded-full object-cover object-center"
                      src={getImage(audit.admin)}
                      alt={audit.admin.admin_name}
                    />
                  </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {audit.date}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {audit.id_no}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {audit.changes}
                  </td>
                </tr>
                 ))
                 ) : (
                  <tr>
                      <td colSpan="7" className="text-center py-4 text-slate-500 dark:text-slate-400">
                        No records found.
                      </td>
                  </tr>
                )}

              </tbody>
              </table>
            </div>
          </div>
        </div>
        </>
      );
}

export default AuditDesktop;