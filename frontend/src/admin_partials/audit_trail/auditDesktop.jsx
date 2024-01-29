import React, { useState } from 'react';
// import StatusBadgeDesktop from 'frontend/src/partials/StatusBadgeDesktop.jsx';
import Flatpickr from 'react-flatpickr';


import RPTAX from '../../images/RPTAX.png';
import BP from '../../images/BP.png';
import CTC from '../../images/CTC.png';
import LCR from '../../images/LCR.png';
import UR from '../../images/UR.png';

  

const AuditDesktop = ({ auditTrail }) => {
  
  function formatTimeAgo(time_stamp) {
    const now = new Date();
    const createdAt = new Date(time_stamp);
    const timeDifference = now - createdAt;
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(minutes / 1440);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (minutes < 1) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (hours < 24) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (days < 7) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (weeks < 4) {
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (months < 12) {
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  }

  const getImage = (admin) => {
    switch (admin) {
      case 'RPTAX ADMIN':
        return RPTAX;
      case 'BUS ADMIN':
        return BP;
      case 'CTC ADMIN':
        return CTC;
      case 'LCR ADMIN':
        return LCR;
      case 'UR ADMIN':
        return UR;
    }
  };
  
    return (
        <>
        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
          <div className="px-5 py-5">
            <h1 className='font-medium text-center text-slate-700 dark:text-white mb-7 md:mb-3'>Activity Log</h1>
           
            <div className="flex items-center justify-end mb-2 md:px-0 md:pr-0.5 px-0.5 text-xs">
              <div className="relative inline-block text-left z-10">
                  <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 mr-2 rounded-sm inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path className="stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                  </svg>
                    <span className="pl-1">Filter</span>
                  </button>


                </div>

                <button  className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-1 mr-2 rounded-sm inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span>&nbsp;Clear</span>
                </button>
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
                              Date
                            </div>
                        </th><th scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Identification Number
                            </div>
                        </th><th scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Changes
                            </div>
                        </th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody>

                {auditTrail && auditTrail.map((audit) => (
                  
                <tr key={audit.time_stamp} className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                  <td className="pl-6 pr-3 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-500 whitespace-nowrap dark:text-white">
                    {formatTimeAgo(audit.time_stamp)}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {audit.activity}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {audit.admin} 
                    <img
                      name="userImage" 
                      className="inline-block h-10 w-10 rounded-full object-cover object-center"
                      src={getImage(audit.admin)}
                    />
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
              ))} 

              </tbody>
              </table>
            </div>
          </div>
        </div>
        </>
      );
}

export default AuditDesktop;