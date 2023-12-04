import React, { useState } from 'react';

const TransDropdownFilter = ({ }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button id="dropdownDefaultButton" onClick={toggleDropdown} className="bg-blue-500 hover:bg-blue-600 text-white px-1 py-1 rounded-md inline-flex items-center"
        aria-haspopup="true" aria-expanded={isOpen ? 'true' : 'false'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path className="stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
        </svg>
      </button>

      {/* Dropdown Contents */}
      <div className={`z-10 ${isOpen ? 'block' : 'hidden'} bg-white divide-y rounded shadow w-28 dark:bg-[#212121] absolute mt-1 right-0`}>
        <ul className="text-xs text-center text-gray-700 dark:text-gray-200 space-y-2" aria-labelledby="dropdownDefaultButton">
            <li>
                <span className="flex items-center justify-center px-4 py-2 font-medium border-b border-slate-200 dark:border-[#3d3d3d]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
                Filter By
                </span>
            </li>
            <li>
                <a className="block px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Date
                </a>
            </li>
            <li>
                <a href="#" className="block px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Type
                </a>
            </li>
            <li>
                <a href="#" className="block px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Status
                </a>
            </li>
            <li>
                <a href="#" className="block px-4 pb-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Amount
                </a>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default TransDropdownFilter;
