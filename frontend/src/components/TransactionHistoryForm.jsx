import React, { useState } from 'react';
import axios from 'axios'

import { useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

const TransactionHistoryForm =()=>{

  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);
  const user_id = pathname.split("/")[2];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="flex flex-col h-full justify-between mx-4 my-4">
            <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
              <div className="px-5 py-5">
                
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table class="w-full text-left text-xs md:text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-gray-700 uppercase bg-gray-100 dark:bg-[#212121] dark:text-slate-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                                Transaction ID
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                                Time
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                                Type
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                                Amount
                            </th>
                            <th>
                              {/* View Details*/}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                00057382
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                07/14/2023
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                03:14 PM
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                Tax Payment
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <span class="px-10 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                  Paid
                              </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                P 1499.00
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="group">
                                <a className="flex justify-center items-center text-center p-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full" href="">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:stroke-white">
                                    <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>   
                                  <span className="text-xs font-normal">&nbsp;View Details</span>
                                </a>
                                </div>
                            </td>
                        </tr>
                        <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                00089234
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                07/14/2023
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                03:14 PM
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                Tax Payment
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <span class="px-7 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                  Pending
                              </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                P 1499.00
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="group">
                                <a className="flex justify-center items-center text-center p-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full" href="">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:stroke-white">
                                    <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>   
                                  <span className="text-xs font-normal">&nbsp;View Details</span>
                                </a>
                                </div>
                            </td>
                        </tr>
                        <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                00024671
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                07/14/2023
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                03:14 PM
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                Tax Payment
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <span class="px-6 py-1 text-xs font-semibold rounded-full bg-red-300 text-red-800">
                                  Canceled
                              </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                P 1499.00
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="group">
                                <a className="flex justify-center items-center text-center p-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full" href="">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:stroke-white">
                                    <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>   
                                  <span className="text-xs font-normal">&nbsp;View Details</span>
                                </a>
                                </div>
                            </td>
                        </tr>
                        
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

export default TransactionHistoryForm;