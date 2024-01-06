import React, { useState, useRef } from 'react';


import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

const AboutForm =()=>{

  const contentRef = useRef(null);
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
        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
               <h1 className='font-medium text-center text-slate-700 dark:text-white'>About</h1>
               <h1 className='mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300'>About Us</h1>
               
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
                  
                  
                  
                  <span className="text-md">Offering convenience during the current Covid-19 lockdown period now, and beyond. Observe proper social distancing and access essential City of Manila services online!</span>
                      <br/><br/>
                  <span className="text-md">Provided to you by BSIT-4B</span>
                      <br/><br/>
                    <span className="font-medium">1. Accurate Information:</span>
                  <div className="ml-3.5">
                    <span>You are solely responsible for ensuring the accuracy, completeness, and truthfulness of all the information you submit through our online forms.</span>
                  </div>
                      <br/>
                    <span className="font-medium">2. Verification:</span>
                      <br/>
                  <div className="ml-3.5">
                    <span>We reserve the right to verify the information provided by you through any means necessary. This may include, but is not limited to, requesting additional documentation or contacting third parties.</span>
                  </div>
                      <br/>
                    <span className="font-medium">3. Consequences of Innacurate Information:</span>
                      <br/>
                  <div className="ml-3.5">
                    <span>Providing false, misleading, or inaccurate information may result in the rejection of your application or request. It may also lead to the termination of any services or agreements established based on the inaccurate information.</span>
                  </div>
                      <br/>
                    <span className="font-medium">4. Legal Consequences:</span>
                      <br/>
                  <div className="ml-3.5">
                    <span>Knowingly providing false information may have legal consequences. We may take appropriate legal action if it is determined that information provided by you is intentionally false or misleading.</span>
                  </div>
                      <br/>
                    <span className="font-medium">5. Data Accuracy Responsibility:</span>
                      <br/>
                  <div className="ml-3.5">
                    <span>While we take reasonable measures to ensure the security and integrity of the data you submit, we do not guarantee the accuracy of the information provided by you. You are encouraged to review and verify all information before submission.</span>
                  </div>
                      <br/>                  
                    <span className="font-medium">6. Updates and Corrections:</span>
                      <br/>
                  <div className="ml-3.5">    
                    <span>It is your responsibility to promptly inform us of any changes or inaccuracies in the information you have previously submitted. You may contact us through the provided channels for updates or corrections.</span>
                  </div>
                    <br/>
                  <span className="font-medium">7. User Liability:</span>
                  <div className="ml-3.5">    
                    <span>You agree to hold us harmless and indemnify us against any claims, losses, or damages resulting from the inaccuracy of the information you provide.</span>
                  </div>
                      <br/>
                    <span>By using our online form application processor, you acknowledge that you have read, understood, and agreed to these terms and conditions regarding the accuracy of information.</span>
              </div>
            
            </div>
            
          </div>
        </main>


      </div>
    </div>
  );
}

export default AboutForm;