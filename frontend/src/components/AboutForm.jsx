import React, { useState, useRef } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

const AboutForm =()=>{

  const contentRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const logoSrc = '../src/images/mnl_footer.svg';

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/*  Content Area of 3rd Button */}
        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-10 py-5">
               <h1 className='mb-7 font-medium text-center text-slate-700 dark:text-white'>About</h1>
               
              <div className="text-slate-700 dark:text-white text-justify">
               <div className="relative">
                  <h1 className="text-md lg:text-xl md:text-lg text-slate-800 dark:text-slate-100 font-medium mb-1">
                    Welcome to Centralized
                    <span className='text-blue-600'> M</span>
                    <span className='text-red-500'>a</span>
                    <span className='text-yellow-500'>n</span>
                    <span className='text-green-500'>i</span>
                    <span className='text-blue-600'>l</span>
                    <span className='text-red-500'>a</span>!
                  </h1>
                    <p className="lg:text-sm dark:text-slate-400 font-thin text-xs">Your portal to a new world of efficient digital services</p>
                    <br/>
                </div>
                  
                  <p className="text-sm md:text-base">Offering convenience during the current Covid-19 lockdown period now, and beyond. Observe proper social distancing and access essential City of Manila services online!
                      <br/><br/>
                  Provided to you by BSIT-4B</p>
                      <br/>
                  <div>
                      <h1 className="text-md lg:text-xl md:text-lg text-slate-800 dark:text-slate-100 font-medium mb-1">
                        Centralized
                        <span className='text-blue-600'> M</span>
                        <span className='text-red-500'>a</span>
                        <span className='text-yellow-500'>n</span>
                        <span className='text-green-500'>i</span>
                        <span className='text-blue-600'>l</span>
                        <span className='text-red-500'>a</span> Online Services:
                      </h1>
                  </div>

                  <div className="ml-6 text-sm md:text-base">
                      <p className="font-medium">1. Real Property Tax Payment</p>
                        <p className="ml-3">Accurately assess and appraise your real properties</p>
                        <p className="ml-3 pb-2.5">Easily pay your real property taxes with precision and on time</p>
                      <p className="font-medium">2. Real Property Tax Clearance</p>
                        <p className="ml-3 pb-2.5">Obtain a Real Property Tax Clearance for your property-related matters</p>
                      <p className="font-medium">3. Business Permit</p>
                        <p className="ml-3 pb-2.5">Apply and obtain all necessary permits and licenses for your business efficiently</p>
                      <p className="font-medium">4. Community Tax Certificate (Cedula)</p>
                        <p className="ml-3 pb-2.5">Individuals and businesses can conveniently apply and obtain valid Cedulas</p>
                      <p className="font-medium">5. Birth Certificate</p>
                        <p className="ml-3 pb-2.5">Obtain the LGU copy of your Birth Certificate seamlessly</p>
                      <p className="font-medium">6. Death Certificate</p>
                        <p className="ml-3 pb-2.5">Obtain the LGU copy of the Death Certificate for your loved ones efficiently</p>
                      <p className="font-medium">7. Marriage Certificate</p>
                        <p className="ml-3 pb-2.5">Obtain the LGU copy of your Marriage Certificate with ease for couples</p>
                      <br/>
                  </div>
                  

                  <div>
                      <h1 className="text-md lg:text-xl md:text-lg text-slate-800 dark:text-slate-100 font-medium mb-1">
                        About Centralized
                        <span className='text-blue-600'> M</span>
                        <span className='text-red-500'>a</span>
                        <span className='text-yellow-500'>n</span>
                        <span className='text-green-500'>i</span>
                        <span className='text-blue-600'>l</span>
                        <span className='text-red-500'>a</span>
                      </h1>
                  </div>

                  <p className="text-sm md:text-base">Welcome to
                  <span className="ml-1 text-slate-800 dark:text-slate-100 font-medium">
                        Centralized
                        <span className='text-blue-600'> M</span>
                        <span className='text-red-500'>a</span>
                        <span className='text-yellow-500'>n</span>
                        <span className='text-green-500'>i</span>
                        <span className='text-blue-600'>l</span>
                        <span className='text-red-500'>a</span>
                      </span>, your trusted partner in streamlining administrative processes and simplifying the way you interact with local government services. We understand the challenges of navigating bureaucratic procedures, and our mission is to make essential tasks efficient, accessible, and user-friendly.
                        <br/><br/>
                      At <span className="text-slate-800 dark:text-slate-100 font-medium">
                        Centralized
                        <span className='text-blue-600'> M</span>
                        <span className='text-red-500'>a</span>
                        <span className='text-yellow-500'>n</span>
                        <span className='text-green-500'>i</span>
                        <span className='text-blue-600'>l</span>
                        <span className='text-red-500'>a</span>
                      </span>, we offer a comprehensive suite of online services designed to empower individuals and businesses in managing their obligations seamlessly. From property-related transactions to business permits and vital records, our platform provides a one-stop solution for a range of municipal services.
                        <br/><br/>
                        We sincerely thank you for choosing <span className="text-slate-800 dark:text-slate-100 font-medium">
                        Centralized
                        <span className='text-blue-600'> M</span>
                        <span className='text-red-500'>a</span>
                        <span className='text-yellow-500'>n</span>
                        <span className='text-green-500'>i</span>
                        <span className='text-blue-600'>l</span>
                        <span className='text-red-500'>a</span>
                      </span>. Your trust and engagement with our platform are greatly appreciated, and we look forward to continually serving you with efficiency and innovation.
                    </p>

                    

              </div>
            
            </div>
            
          </div>
          <Footer logo={logoSrc} />
        </main>


      </div>
    </div>
  );
}

export default AboutForm;