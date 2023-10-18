import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Card01 from '../partials/news/Card01';
import Card02 from '../partials/news/Card02';

function Blank() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/*  Content Area of 3rd Button */}
        <main>
          <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ms-4 mt-4 me-4 gap-4'>
            <div className="col-span-2">
              <Card01 />
            </div>

            <div className="col-span-1">
              <Card02 />
            </div>
            
        
          </div>
          
        </main>


      </div>
    </div>
  );
}

export default Blank;