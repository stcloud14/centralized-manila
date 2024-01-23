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

              <div className="grid grid-rows-4 grid-cols-8 gap-6">
              <div className="hidden md:flex flex-col col-span-full sm:col-span-3 bg-white dark:bg-[#181818] shadow-md rounded-sm">
                <div className="md:flex-1 px-5 py-4 md:flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="stroke-slate-500 w-20 h-20 object-contain my-5 mx-auto md:ml-5 md:mr-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                  <div className='pt-3 pr-5'>
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Location</h2>
                    <div className='text-sm md:text-base dark:text-slate-200'>
                      <p className="font-semibold">Manila City Hall</p>
                      <p>Padre Burgos Ave, Ermita,</p>
                      <p> Manila, 1000 Metro Manila</p>
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

              <div className="flex flex-col col-span-full md:hidden bg-white dark:bg-[#181818] shadow-md rounded-sm">
                <div className="md:flex-1 px-5 py-4 md:flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="stroke-slate-500 w-20 h-20 object-contain my-5 mx-auto md:ml-5 md:mr-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                  <div className='pt-3 pr-5'>
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Location</h2>
                    <div className='text-sm md:text-base dark:text-slate-200'>
                      <p className="font-semibold">Manila City Hall</p>
                      <p>Padre Burgos Ave, Ermita,</p>
                      <p> Manila, 1000 Metro Manila</p>
                    </div>
                  </div>
                </div> 
              </div>




            <div className="flex flex-col col-span-full sm:col-span-3 bg-white dark:bg-[#181818] shadow-md rounded-sm">
                <div className="md:flex-1 px-5 py-4 md:flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="stroke-slate-500 w-20 h-20 object-contain my-5 mx-auto md:ml-5 md:mr-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                  <div className='pt-5 pr-5'>
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Office Hours</h2>
                    <div className='text-sm md:text-base dark:text-slate-200'>
                      <p className="font-semibold">Monday to Friday</p>
                      <p>8:00 AM to 5:00 PM</p>
                    </div>
                  </div>
                </div> 
              </div>

              <div className="flex flex-col col-span-full sm:col-span-3 bg-white dark:bg-[#181818] shadow-md rounded-sm">
                <div className="md:flex-1 px-5 py-4 md:flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="stroke-slate-500 w-20 h-20 object-contain my-5 mx-auto md:ml-5 md:mr-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                </svg>
                  <div className='pt-5 pr-5'>
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Official Public Email</h2>
                    <div className='text-sm md:text-base dark:text-slate-200'>
                      <p className="font-semibold">MPIO:</p>
                      <p>manilapublicinfo@gmail.com</p>
                    </div>
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


            
          </div>
          <Footer logo={logoSrc} />
        </main>
      </div>
    </div>
  );
}

export default ContactsForm;
