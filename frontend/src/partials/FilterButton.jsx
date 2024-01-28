import React, { useState, useRef, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import TransTypeDropdown from '../partials/transDropdown/TransTypeDropdown';
import StatusTypeDropdown from '../partials/transDropdown/StatusTypeDropdown';


function FilterButton({ selectedDate, setSelectedDate, selectedDatee, setSelectedDatee, searchInput, setSearchInput, handleInputChange, handleInputChange2, handleSearch, selectedStatus, selectedType, toggleDropdown }) {

  return (
    <>
        <div className="absolute w-[270px] origin-top-right py-2 px-3 mt-[32px] sm:mt-2 bg-white dark:bg-[#212121] dark:text-slate-400 rounded-md shadow-2xl z-20 md:right-10 sm:w-[405px]">

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
                className="bg-transparent text-xs border border-slate-300 text-slate-700 dark:text-white py-1.5 rounded-full w-[110px] sm:w-[150px]"
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
                className="bg-transparent text-xs border border-slate-300 text-slate-700 dark:text-white py-1.5 rounded-full w-[110px] sm:w-[150px]"
            />
            </span>
        </div>


        {/* Transaction ID Row */}
        <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
            <span className="hidden sm:block pr-10 text-xs">
            Transaction ID:
            </span>

            <div className="relative flex items-center">
            <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </span>
            <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                id="searchInput"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                type="text"
                placeholder="Search ID..."
                className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1.5 rounded-full"
            />
            </div>
        </div>

        {/* Type Row */}
        <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
            <span className="hidden sm:block py-2 text-xs">Type:</span>
            <select  value={selectedType} onChange={handleInputChange} name=""  id=""  className="text-xs border bg-transparent border-slate-300 text-slate-700 dark:text-white pl-4 rounded-full peer cursor-pointer h-[33.5px] w-[235px]">
                <TransTypeDropdown />
            </select>
        </div>

        {/* Status Row */}
        <div className="flex justify-center sm:justify-between items-center">
            <span className="hidden sm:block py-2 text-xs">Status:</span>
            <select value={selectedStatus} onChange={handleInputChange2} name="" id="" className={`font-semibold text-xs border bg-transparent border-slate-300 text-slate-700 dark:text-white pl-4 rounded-full peer cursor-pointer h-[33.5px] w-[235px]`}
                style={{
                backgroundColor:
                    selectedStatus === "Pending" ? "#fef08a" :
                    selectedStatus === "Paid" ? "#a7f3d0" :
                    selectedStatus === "Processing" ? "#e9d5ff" :
                    selectedStatus === "Complete" ? "#bfdbfe" :
                    selectedStatus === "Rejected" ? "#fecaca" :
                    selectedStatus === "Canceled" ? "#e2e8f0" : 
                    selectedStatus === "Expired" ? "#fed7aa" : "transparent",
                color:
                    selectedStatus === "Pending" ? "#854d0e"  : 
                    selectedStatus === "Paid" ? "#065f46" :
                    selectedStatus === "Processing" ? "#6b21a8" :
                    selectedStatus === "Complete" ? "#1e40af" :
                    selectedStatus === "Rejected" ? "#991b1b" :
                    selectedStatus === "Canceled" ? "#1e293b" : 
                    selectedStatus === "Expired" ? "#9a3412" : "#718096",
                }}>
                <StatusTypeDropdown />
            </select>
        </div>

        <button type="button" onClick={() => { handleSearch(); toggleDropdown(); }} className=" bg-blue-500 hover:bg-blue-600 text-white mr-[6px] sm:mr-[0px] px-4 py-1 mt-2 mb-0.5 rounded-full flex items-center ml-auto">
            <span className="mx-auto">Filter</span>
        </button>
        </div>
    </>
  )
}

export default FilterButton;