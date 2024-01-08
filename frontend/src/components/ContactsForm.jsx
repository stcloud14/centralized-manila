import React, { useState, useRef } from 'react';
import Footer from '../partials/Footer';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

const ContactsForm = () => {
  const contentRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logoSrc = '../src/images/mnl_footer.svg';

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content Area of 3rd Button */}
        <main className="overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            
              {/* <h1 className='mb-7 font-medium text-center text-slate-700 dark:text-white'>Contacts</h1> */}
              
              
              <div className="grid grid-rows-4 grid-cols-8 gap-6">
              

              <div className="flex flex-col col-span-full sm:col-span-3 bg-white dark:bg-[#181818] shadow-md rounded-sm">
                <div className="md:flex-1 px-5 py-4 md:flex">
                  <img src={Image} alt="Banner Image" className='w-40 h-40 object-contain my-5 mx-auto md:ml-5 md:mr-8'/>
                  <div className='pt-5 pr-5'>
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Real Property Tax (RPTAX)</h2>
                    <div className='text-sm md:text-base dark:text-slate-400'>
                      <p>Easily pay your real property taxes with precision and on time.</p>
                      <p>Obtain a Real Property Tax Clearance for your property-related matters.</p> 
                    </div>
                  </div>
                </div> 
              </div>

              

              <div className="flex flex-col col-span-full sm:col-span-5 p-5 bg-white dark:bg-[#181818] shadow-md rounded-sm row-span-3">
                <div className="relative z-0 w-full h-full overflow-hidden">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1931.7223286484173!2d120.9816112038786!3d14.589513683410111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca22039a1457%3A0xef880ce1e8275d72!2sManila%20City%20Hall%2C%20Padre%20Burgos%20Ave%2C%20Ermita%2C%20Manila%2C%201000%20Metro%20Manila!5e0!3m2!1sen!2s!4v1648546994325!5m2!1sen!2s"
                    frameBorder="0"
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                  />
                </div>
              </div>




            <div className="flex flex-col col-span-full sm:col-span-3 bg-white dark:bg-[#181818] shadow-md rounded-sm">
                <div className="md:flex-1 px-5 py-4 md:flex">
                  <img src={Image} alt="Banner Image" className='w-40 h-40 object-contain my-5 mx-auto md:ml-5 md:mr-8'/>
                  <div className='pt-5 pr-5'>
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Real Property Tax (RPTAX)</h2>
                    <div className='text-sm md:text-base dark:text-slate-400'>
                      <p>Easily pay your real property taxes with precision and on time.</p>
                      <p>Obtain a Real Property Tax Clearance for your property-related matters.</p> 
                    </div>
                  </div>
                </div> 
              </div>

              <div className="flex flex-col col-span-full sm:col-span-3 bg-white dark:bg-[#181818] shadow-md rounded-sm">
                <div className="md:flex-1 px-5 py-4 md:flex">
                  <img src={Image} alt="Banner Image" className='w-40 h-40 object-contain my-5 mx-auto md:ml-5 md:mr-8'/>
                  <div className='pt-5 pr-5'>
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Real Property Tax (RPTAX)</h2>
                    <div className='text-sm md:text-base dark:text-slate-400'>
                      <p>Easily pay your real property taxes with precision and on time.</p>
                      <p>Obtain a Real Property Tax Clearance for your property-related matters.</p> 
                    </div>
                  </div>
                </div> 
              </div>
            </div>


            
          </div>
          <Footer logo={logoSrc} />
        </main>
      </div>
    </div>
  );
}

export default ContactsForm;
