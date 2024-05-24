import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'

import { useParams, useNavigate } from 'react-router-dom';

import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';
import YearDropdown from '../partials/YearDropdown';
import Req from '../partials/misc/RequiredFieldIndicator';
import TPTermsModal from '../partials/business/TPTermsModal';
import ModalTransaction from '../partials/transactionModal/ModalTransaction';
import QuarterDropdown from '../partials/profile/QuarterDropdown';
import TermsModal from '../partials/business/TermsModal';
import VerifyModal from '../partials/business/VerifyModal';

const AdminAddAdminForm =()=>{
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* AdminSidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


    <main className="overflow-y-auto">
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 mt-4 mb-2">
        <div className="px-5 py-5">
        <h1 className='font-medium text-center text-slate-700 dark:text-white'>Chief Admin</h1>
          <h1 className='mb-5 text-sm italic text-center text-slate-700 dark:text-gray-300'>Add Administrator</h1> 
            <form onSubmit="" className={`overflow-y-auto`}>
              <form className={`max-w-2xl mx-auto`}>
                <div className="grid gap-6">


                    <div className="mt-5 relative z-0 mb-2 grid grid-cols-2 gap-6">
                      <div className="relative flex flex-col col-span-1">
                        <input type="text" name="" id="" placeholder=" " onChange="" value="" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
                        <label htmlFor="" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Admin ID
                        </label>
                      </div>
                      <div className="relative flex flex-col group col-span-1">
                        <select onChange="" value="" defaultValue={0} name="period" id="period" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer">
                          <option value="0" className='dark:bg-[#3d3d3d]'>Select Admin Type</option>
                          <option value="1" className='dark:bg-[#3d3d3d]'>Chief Admin</option>
                          <option value="2" className='dark:bg-[#3d3d3d]'>RP Tax Admin</option>
                          <option value="3" className='dark:bg-[#3d3d3d]'>Business Permit Admin</option>
                          <option value="1" className='dark:bg-[#3d3d3d]'>CTC/Cedula Admin</option>
                          <option value="2" className='dark:bg-[#3d3d3d]'>Local Civil Registry Admin</option>
                          <option value="3" className='dark:bg-[#3d3d3d]'>Registry Admin</option>
                        </select>
                        <label 
                          htmlFor="period" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Admin Type
                        </label>
                      </div>
                    </div>
                    
                    <div className="relative z-0 mb-2 grid grid-cols-5 gap-6">
                      <div class="flex flex-col col-span-full  sm:col-span-3">
                        <input type="text" name="" id="" placeholder=" " onChange="" value="" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
                        <label htmlFor="" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Password
                          </label>
                        </div>
                      <div class="flex flex-col col-span-full sm:col-span-2">
                        <button 
                          onClick=""
                          type="submit" 
                          className="w-full sm:w-auto text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-4 py-2.5 text-center ml-0 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                          Generate Strong Password
                        </button>
                      </div>
                    </div>
                </div>

                  {/* Submit Button */}
                  <div className="flex justify-end items-end mt-10 mb-4">
                    <button 
                        onClick=""
                        type="submit" 
                        className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                          Proceed
                    </button>
                  </div>
              </form>
              </form>
            </div>
          </div>
          <AdminFooter />
        </main>



        

      </div>
    </div>
  );
}

export default AdminAddAdminForm;