import React from 'react';
// import StatusBadgeMobile from 'frontend/src/partials/StatusBadgeMobile.jsx';
import AuditDropdownFilter from './auditDropdownFilter';
import Flatpickr from 'react-flatpickr';

const AuditMobile = ({ searchInput, handleSearch, handleSearchInputChange, handleOpenModal, handleClearFilter, handleSortChange, sortOption, sortedTransactions }) => {
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedDatee, setSelectedDatee] = React.useState('');

    return (
        <>
        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
              <div className="px-5 py-5">
                <h1 className='font-medium text-center text-slate-700 dark:text-white mb-5'>Activity Log</h1>
                <div className="flex justify-center items-center mb-0 md:px-0 md:pr-0.5 px-0.5 text-xs">
                  <div className="relative mr-2 w-full">
                    <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                    </span>
                    <input
                      id="searchInput"
                      value={searchInput}
                      onChange={handleSearchInputChange} 
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
                      type="text"
                      placeholder="Search ID..."
                      className="bg-transparent text-xs md:text-sm border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-full w-full"
                    />
                  </div>
                
                  <button onClick={handleClearFilter} className="bg-slate-500 hover:bg-slate-600 text-white px-2.5 py-1 mr-2 rounded-full inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <span>Clear</span>
                  </button>

                  <AuditDropdownFilter handleSortChange={handleSortChange} sortOption={sortOption}/>
                  
                </div>

                <div className="flex items-center justify-end mb-4 md:px-0 md:pr-0.5 px-0.5 pt-2 text-xs"> 
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
                        className="bg-transparent text-xs md:text-sm border border-slate-300 text-slate-700 dark:text-white py-1 md:py-0.5 rounded-full w-full md:w-auto"
                    />
                    {/* <label
                      htmlFor="deathc_date"
                      className={`peer-focus:font-medium absolute bg-transparent text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                        deathCert.deathc_date ? 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0' : 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                      }`}
                    >
                      Date of Death
                    </label> */}

                    <p className="px-1">-</p>
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
                              className="bg-transparent text-xs md:text-sm border border-slate-300 text-slate-700 dark:text-white py-1 md:py-0.5 rounded-full w-full md:w-auto"
                          />
                        <button id="dropdownDefaultButton"  onClick={handleClearFilter} className="bg-slate-500 hover:bg-slate-600 text-white ml-2 px-2.5 py-1 rounded-full inline-flex items-center"
                          >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path className="stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                          </svg>
                          <span>&nbsp;Filter</span>
                        </button>



                    {/* <label
                      htmlFor="deathc_date"
                      className={`peer-focus:font-medium absolute bg-transparent text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                        deathCert.deathc_date ? 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0' : 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                      }`}
                    >
                      Date of Death
                    </label> */}
                    </div>

                {/* <div className="flex text-xs mb-5">
                  <button className="group flex justify-center w-full items-center text-center p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-full mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path className="stroke-emerald-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span className="text-xs font-normal px-0.5">&nbsp;Download SOA</span>
                  </button>
                </div> */}

                {/* <div className="flex justify center items-center text-[0.60rem] mb-5 space-px-2 space-x-2">
                  <div className="group flex justify-center w-full items-center text-center">
                    <span>Sort By: </span>
                  </div>
                  <button className="flex justify-center w-full items-center text-center p-1 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-full">
                    <span>Date</span>
                  </button>

                  <button className="flex justify-center w-full items-center text-center p-1 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-full">
                    <span>Type</span>
                  </button>
                  <button className="flex justify-center w-full items-center text-center p-1 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-full">
                    <span>Status</span>
                  </button>
                  <button className="flex justify-center w-full items-center text-center p-1 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-full">
                    <span>Amount</span>
                  </button>
                </div> */}
                {/* {filteredTransactions.length > 0 ? filteredTransactions.map((transaction) => ( */}
                {sortedTransactions.map((transaction) => (

                  <div key={transaction.transaction_id} className="bg-white dark:bg-[#333333] shadow-md rounded-md mb-4">
                    <div className=" text-xs font-semibold text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-md px-4 py-1.5">
                      Transaction ID: {transaction.transaction_id}
                    </div>
                    <div className="px-4 py-5">
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date: {transaction.date}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Time: {transaction.time}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type: {transaction.trans_type}</div>
                      <div className="flex justify-start items-center text-xs text-slate-600 dark:text-slate-300 my-1">
                        <span>Status:</span> <StatusBadgeMobile statusType={transaction.status_type} />
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Amount: P {transaction.amount}</div>
                      <div className="mt-5 group">
                        <div onClick={() => handleOpenModal(transaction)} className="flex justify-center items-center text-center p-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full mt-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-0.5">
                            <path className="stroke-blue-500" strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path className="stroke-blue-500" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs font-normal">&nbsp;View Details</span>
                        </div>
                      </div>
                    </div>  
                  </div>
                ))} 
                {/* )) : userTransaction.map((transaction) => (
                    
                    <div key={transaction.transaction_id} className="bg-white dark:bg-[#333333] shadow-md rounded-md mb-4">
                    <div className=" text-xs font-semibold text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-md px-4 py-1.5">
                        Transaction ID: {transaction.transaction_id}
                    </div>
                    <div className="px-4 py-5">
                        <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date: {transaction.date}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Time: {transaction.time}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type: {transaction.trans_type}</div>
                        <div className="whitespace-nowrap text-xs text-slate-600 dark:text-slate-300 my-1">
                        Status: <StatusBadgeMobile statusType={transaction.status_type} />
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Amount: P {transaction.amount}</div>
                        <div className="mt-5 group">
                        <div onClick={() => handleOpenModal(transaction)} className="flex justify-center items-center text-center p-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-0.5">
                            <path className="stroke-blue-500" strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path className="stroke-blue-500" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-xs font-normal">&nbsp;View Details</span>
                        </div>
                        </div>
                    </div>  
                    </div>
                ))} */}
              </div>
        </div>
        </>

    );
}
     

export default AuditMobile;