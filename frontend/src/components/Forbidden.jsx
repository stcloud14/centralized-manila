import React, { useState, useRef } from 'react';
import Footer from '../partials/Footer';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { useParams } from 'react-router-dom';

const Forbidden =()=>{

  const { user_id } = useParams();

  const contentRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logoSrc = '../src/images/mnl.png';

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Sidebar */}
      {user_id && (
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      {user_id && (
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        {/*  Content Area of 3rd Button */}
        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-10 py-5">
                <br/>
                  <h1 className="text-slate-800 dark:text-slate-100 font-medium">
                     Welcome to Centralized
                    <span className='text-blue-600'> 4</span>
                    <span className='text-red-500'>0</span>
                    <span className='text-yellow-500'>4</span>
                    <span className='text-green-500'>E</span>
                    <span className='text-blue-600'>R</span>
                    <span className='text-red-500'>R</span>
                   </h1>
                  <br/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Forbidden;