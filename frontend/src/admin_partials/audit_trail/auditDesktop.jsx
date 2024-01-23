import React, { useState } from 'react';
// import StatusBadgeDesktop from 'frontend/src/partials/StatusBadgeDesktop.jsx';
import Flatpickr from 'react-flatpickr';


  

const AuditDesktop = ({ searchInput, handleSearch, handleSearchInputChange, handleOpenModal, handleClearFilter, handleSortChange, sortOption, sortOrder, SortIcon, sortedTransactions }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDatee, setSelectedDatee] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = (e) => {
    const selectedValue = e.target.value;

    setSelectedType(selectedValue);
  };

  const handleInputChange2 = (e) => {
    const selectedValue = e.target.value;

    setSelectedStatus(selectedValue);
  };
  
    return (
        <>
        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
          <div className="px-5 py-5">
            <h1 className='font-medium text-center text-slate-700 dark:text-white mb-7 md:mb-3'>Activity Log</h1>
           
            <div className="flex items-center justify-end mb-2 md:px-0 md:pr-0.5 px-0.5 text-xs">
              {/* <div className="flex items-center mr-2">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </span>
                  <input
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    id="searchInput"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    type="text"
                    placeholder="Search ID..."
                    className="bg-transparent text-xs md:text-sm w-full md:w-80 border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm w-full md:w-auto"
                  />
                </div>
                <button onClick={handleClearFilter} className="bg-slate-500 hover:bg-slate-600 text-white ml-1 px-4 py-1 rounded-sm inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span>&nbsp;Clear</span>
                </button>
              </div> */}
              {/* <div className="flex items-center ml-auto space-x-2">
              <p>Date:</p>
                <Flatpickr
                  id=""
                  name=""
                  value={selectedDate}
                  onChange={(date) => {
                    const formattedDate = date.length > 0 ? (() => {
                      const originalDate = new Date(date[0]);
                      originalDate.setDate(originalDate.getDate() + 1);
                      return originalDate.toISOString().split('T')[0];
                    })() : '';
                    setSelectedDate(formattedDate);
                  }}
                  options={{
                    dateFormat: 'Y-m-d',
                    altInput: true,
                    altFormat: 'F j, Y',
                  }}
                  placeholder="From"
                  className="bg-transparent text-xs md:text-sm border border-slate-300 text-slate-700 dark:text-white py-1 md:py-0.5 rounded-sm w-[165px]"
                />
                <p> - </p>
                <Flatpickr
                  id=""
                  name=""
                  value={selectedDatee}
                  onChange={(date) => {
                    const formattedDate = date.length > 0 ? (() => {
                      const originalDate = new Date(date[0]);
                      originalDate.setDate(originalDate.getDate() + 1);
                      return originalDate.toISOString().split('T')[0];
                    })() : '';
                    setSelectedDatee(formattedDate);
                  }}
                  options={{
                    dateFormat: 'Y-m-d',
                    altInput: true,
                    altFormat: 'F j, Y',
                  }}
                  placeholder="To"
                  className="bg-transparent text-xs md:text-sm border border-slate-300 text-slate-700 dark:text-white py-1 md:py-0.5 rounded-sm w-[165px]"
                />
                <button id="dropdownDefaultButton"  onClick={handleClearFilter} className="bg-slate-500 hover:bg-slate-600 text-white px-2.5 py-1 rounded-sm inline-flex items-center"
                   >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path className="stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                  </svg>
                  <span>&nbsp;Filter</span>
                </button>
              </div> */}
              <div className="relative inline-block text-left z-10">
                  <button type="button" onClick={toggleDropdown} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 mr-2 rounded-sm inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path className="stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                  </svg>
                    <span className="pl-1">Filter</span>
                  </button>

        {isDropdownOpen && (
          <div className="absolute right-0 w-[405px] mt-2 origin-top-right py-2 px-3 bg-white dark:bg-[#212121] dark:text-slate-400 rounded-md shadow-2xl z-20">

              {/* Date Row */}
              <div className="flex justify-between items-center">
                  <span className="block py-2 text-xs">Date:</span>
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
                    className="bg-transparent text-xs border border-slate-300 text-slate-700 dark:text-white py-1 md:py-0.5 rounded-sm w-[150px]"
                    />
                  <span> - </span>
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
                    placeholder="To"
                    className="bg-transparent text-xs border border-slate-300 text-slate-700 dark:text-white py-1 md:py-0.5 rounded-sm w-[150px]"
                    />
                    </span>
                 </div>
              

              {/* Transaction ID Row */}
              <div className="flex justify-between items-center">
                  <span className="block pr-10 py-2 text-xs">
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
                      onChange={(e) => handleSearch(e.target.value.toUpperCase())}
                      id="searchInput"
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      type="text"
                      placeholder="Search ID..."
                      className="bg-transparent text-xs w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"
                    />
                  </div>
                </div>

                {/* Type Row */}
                <div className="flex justify-between items-center">
                  <span className="block py-2 text-xs">Type:</span>
                    <select  onChange={handleInputChange}  value={selectedType}  name=""  id=""  className="py-2.5 px-0 text-xs border bg-transparent border-slate-300 text-slate-700 dark:text-white pl-4 md:py-0.5 rounded-sm peer cursor-pointer w-[210px]">
                      <option value="SELECTSTATUS" className="dark:bg-[#3d3d3d]">Select Type</option>
                      <option value="RPTAXPAYMENT" className="dark:bg-[#3d3d3d]">Real Property Tax Payment</option>
                      <option value="RPTAXCLEARANCE" className="dark:bg-[#3d3d3d]">Real Property Tax Clearance</option>
                      <option value="BUSINESSPERMIT" className="dark:bg-[#3d3d3d]">Business Permit</option>
                      <option value="CTC" className="dark:bg-[#3d3d3d]">Community Tax Certificate</option>
                      <option value="BIRTHC" className="dark:bg-[#3d3d3d]">Birth Certificate</option>
                      <option value="DEATHC" className="dark:bg-[#3d3d3d]">Death Certificate</option>
                      <option value="MARRIAGEC" className="dark:bg-[#3d3d3d]">Marriage Certificate</option>
                  </select>
                </div>

                {/* Status Row */}
                <div className="flex justify-between items-center">
                  <span className="block py-2 text-xs">Status:</span>
                    <select onChange={handleInputChange2} value={selectedStatus} name="" id="" className={`py-2.5 px-0 text-xs border bg-transparent border-slate-300 pl-4 md:py-0.5 rounded-sm peer cursor-pointer`}
                      style={{
                        width: "125px",
                        backgroundColor:
                          selectedStatus === "PENDING" ? "#fef08a" :
                          selectedStatus === "PAID" ? "#bbf7d0" :
                          selectedStatus === "PROCESSING" ? "#bfdbfe" :
                          selectedStatus === "COMPLETE" ? "#fbcfe8" :
                          selectedStatus === "REJECTED" ? "#fecaca" :
                          selectedStatus === "CANCELED" ? "#e2e8f0" : 
                          selectedStatus === "EXPIRED" ? "#fed7aa" : "transparent",
                        color:
                          selectedStatus === "PENDING" ? "#a86728" :
                          selectedStatus === "PAID" ? "#247256" :
                          selectedStatus === "PROCESSING" ? "#1565C0" :
                          selectedStatus === "COMPLETE" ? "#a12863" :
                          selectedStatus === "REJECTED" ? "#a22b34" :
                          selectedStatus === "CANCELED" ? "#000000" : 
                          selectedStatus === "EXPIRED" ? "#a23d1e" : "#718096"
                      }}>
                      <option value="SELECTSTATUS" className="text-slate-700 bg-white dark:text-slate-200 dark:bg-[#3d3d3d]">Select Status</option>
                      <option value="PENDING" className="bg-yellow-200 text-yellow-800">Pending</option>
                      <option value="PAID" className="bg-green-200 text-green-800">Paid</option>
                      <option value="PROCESSING" className="bg-blue-200 text-blue-800">Processing</option>
                      <option value="COMPLETE" className="bg-pink-200 text-pink-800">Complete</option>
                      <option value="REJECTED" className="text-red-800 bg-red-200">Rejected</option>
                      <option value="CANCELED" className="bg-slate-200 text-slate-800">Canceled</option>
                      <option value="EXPIRED" className="bg-orange-200 text-orange-800">Expired</option>
                    </select>
                </div>

                <button type="button" onClick={toggleDropdown} className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-1 mt-1 mb-0.5 rounded-sm flex items-center ml-auto">

                    <span className="">Filter</span>
                  </button>
          </div>
        )}
                </div>

                <button onClick={handleClearFilter} className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-1 mr-2 rounded-sm inline-flex items-center">
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
                              Modified
                            </div>
                        </th>
                        <th onClick={() => handleSortChange('date_processed')} scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Activity{sortOption === 'date_processed'} <SortIcon order={sortOrder} />
                            </div>
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Admin Name
                            </div>
                        </th>
                        <th onClick={() => handleSortChange('trans_type')} scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Date{sortOption === 'trans_type'} <SortIcon order={sortOrder} />
                            </div>
                        </th><th onClick={() => handleSortChange('status_type')} scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Table Changed{sortOption === 'status_type'} <SortIcon order={sortOrder} />
                            </div>
                        </th><th onClick={() => handleSortChange('amount')} scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Changes{sortOption === 'amount'} <SortIcon order={sortOrder} />
                            </div>
                        </th>
                        <th>
                          {/* View Details*/}
                        </th>
                    </tr>
                </thead>
                <tbody>
                {sortedTransactions.map((transaction) => (
                  
                <tr key={transaction.transaction_id} className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                  <td className="pl-6 pr-3 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-500 whitespace-nowrap dark:text-white">
                      {transaction.transaction_id}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {transaction.date}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {transaction.time}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {transaction.trans_type}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <StatusBadgeDesktop statusType={transaction.status_type} />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    P {transaction.amount}
                  </td>
                  <td className="pl-3 pr-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                    <div className="group cursor-pointer">
                      <div onClick={() => handleOpenModal(transaction)} className="flex justify-center items-center text-center px-4 p-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-sm" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:stroke-white">
                          <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>   
                        <span className="text-xs font-normal">&nbsp;View Details</span>
                      </div>
                    </div>
                  </td>
                </tr>
              //   )) 
              //   : userTransaction.map((transaction) => (

              //   <tr key={transaction.transaction_id} className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
              //     <td className="pl-6 pr-3 py-4 whitespace-nowrap">
              //       <div className="font-medium text-gray-500 whitespace-nowrap dark:text-white">
              //         {transaction.transaction_id}
              //       </div>
              //     </td>
              //     <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              //       {transaction.date}
              //     </td>
              //     <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              //       {transaction.time}
              //     </td>
              //     <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              //       {transaction.trans_type}
              //     </td>
              //     <td className="px-3 py-4 whitespace-nowrap">
              //       <StatusBadgeDesktop statusType={transaction.status_type} />
              //     </td>
              //     <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              //       P {transaction.amount}
              //     </td>
              //     <td className="pl-3 pr-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium">
              //       <div className="group">
              //         <div onClick={() => handleOpenModal(transaction)} className="flex justify-center items-center text-center px-4 p-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-sm" >
              //           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:stroke-white">
              //             <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              //             <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              //           </svg>   
              //           <span className="text-xs font-normal">&nbsp;View Details</span>
              //         </div>
              //       </div>
              //     </td>
              //   </tr>
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