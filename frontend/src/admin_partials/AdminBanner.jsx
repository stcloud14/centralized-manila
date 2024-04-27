import React, { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';

function AdminBanner({ adminType, generateReports}) {

  const [selectedYear, setSelectedYear] = useState('');
  

  const handleClear = () => {
    // Handle clearing of selected dates
    setSelectedYear('');
  };


  function handleFilterChange(e) {
    setSelectedYear(e.target.value);
  }
  
  function generateYearOptions() {
    const currentYear = new Date().getFullYear();
    const options = [];
    options.push(<option key="" className="dark:bg-[#3d3d3d]" value="">Select Year</option>);
    for (let i = currentYear; i >= 2000; i--) {
      options.push(<option key={i} className="dark:bg-[#3d3d3d]" value={i}>{i}</option>);
    }
    return options;
  }
  
  
  console.log(selectedYear)

  const admin = (() => {
    switch (adminType) {
      case 'CHIEF':
        return 'Chief Admin';
      case 'RPTAX':
        return 'Real Property Tax Admin';
      case 'BUSINESS':
        return 'Business Permit Admin';
      case 'CEDULA':
        return 'CTC / Cedula Admin';
      case 'LCR':
        return 'Local Civil Registry Admin';
      case 'UR':
        return 'Registry Admin';
      default:
        return 0;
    }
  })();

  return (
    <div className="relative px-2 sm:px-2 overflow-hidden mb-4">
      {/* Content */}
      <div className="relative flex items-center justify-between">
        <div className='mr-1'>
          <h1 className="text-sm lg:text-3xl md:text-3xl text-slate-800 dark:text-slate-100 font-medium mb-1">
            Welcome to Centralized
            <span className='text-blue-600'> M</span>
            <span className='text-red-500'>a</span>
            <span className='text-yellow-500'>n</span>
            <span className='text-green-500'>i</span>
            <span className='text-blue-600'>l</span>
            <span className='text-red-500'>a</span>,
            <span> {admin}</span>!
          </h1>
          <p className="lg:text-sm dark:text-slate-400 font-thin text-xs">Discover what's happening today.</p>
        </div>
        

        <div className="flex flex-col items-center">
          <div className="flex w-full items-center justify-end mb-1 sm:mb-0">
            <span className="hidden sm:block text-xs mr-2">Year:</span>
          
              <select onChange={handleFilterChange} className="bg-white dark:bg-[#2b2b2b] text-xs border border-slate-300 text-slate-700 dark:text-white py-1 md:py-0.5 rounded-sm w-full sm:w-[150px]">
                {generateYearOptions()}
              </select>
            
            <button onClick={handleClear} className="bg-slate-500 hover:bg-slate-600 text-white text-xs px-2 py-0.5 ml-2 rounded-sm hidden sm:inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span>&nbsp;Clear</span>
            </button>
          </div>

          <div className="flex w-full items-center">
              <button onClick={handleClear} className="bg-slate-500 hover:bg-slate-600 text-white text-xs px-2 py-1.5 rounded-sm sm:hidden justify-center group w-15 items-center flex text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                <span>&nbsp;Clear</span>
              </button>

              <button  onClick={() => generateReports(selectedYear)} className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white md:text-xs text-[0.60rem] py-0 sm:py-2 ml-2 px-2 sm:ml-[13.4rem] sm:mt-2 justify-center group w-full sm:w-[14.2rem] items-center flex text-center rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 flex-shrink-0">
                <path fillRule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z" clipRule="evenodd" />
              </svg>
              Generate Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBanner;
