import React, { useState, useRef } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

const ContactsForm = () => {
  const contentRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content Area of 3rd Button */}
        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
              <h1 className='mb-7 font-medium text-center text-slate-700 dark:text-white'>Contacts</h1>
              
              
              <div className="grid md:grid-cols-8 md:gap-6">
                  <div className="relative z-0 w-full mb-6 md:col-span-3 group">
                    <p>he</p>
                  </div>
                  <div className="relative z-0 w-full mb-6 md:col-span-5 group h-96">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1931.7223286484173!2d120.9816112038786!3d14.589513683410111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca22039a1457%3A0xef880ce1e8275d72!2sManila%20City%20Hall%2C%20Padre%20Burgos%20Ave%2C%20Ermita%2C%20Manila%2C%201000%20Metro%20Manila!5e0!3m2!1sen!2s!4v1648546994325!5m2!1sen!2s"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                />
              </div>
                </div>


            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ContactsForm;
