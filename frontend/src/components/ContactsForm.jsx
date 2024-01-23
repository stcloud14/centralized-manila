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

        <main className="overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="grid grid-rows-3 grid-cols-8 gap-6">
              <div className="hidden md:flex flex-col col-span-full sm:col-span-3 bg-white dark:bg-[#181818] shadow-md rounded-sm">
                <div className="md:flex-1 px-5 py-4 md:flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="stroke-slate-500 w-20 h-20 object-contain my-5 mx-auto md:ml-5 md:mr-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                  <div className="pt-0 pr-0 text-center sm:pt-3 sm:pr-5 sm:text-left">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Location</h2>
                    <div className='text-sm md:text-base dark:text-slate-200'>
                      <p className="font-semibold">Manila City Hall</p>
                      <p>Padre Burgos Ave, Ermita,</p>
                      <p> Manila, 1000 Metro Manila</p>
                    </div>
                  </div>
                </div> 
              </div>

              <div className="flex flex-col col-span-full sm:col-span-5 p-5 bg-white dark:bg-[#181818] shadow-md rounded-sm row-span-2 sm:row-span-3">
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
                  <div className="pt-0 pr-0 text-center sm:pt-5 sm:pr-5 sm:text-left">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Location</h2>
                    <div className="text-sm md:text-base dark:text-slate-200">
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
                  <div className="pt-0 pr-0 text-center sm:pt-5 sm:pr-5 sm:text-left">
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
                  <div className="pt-0 pr-0 text-center sm:pt-5 sm:pr-5 sm:text-left">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Official Public Email</h2>
                    <div className='text-sm md:text-base dark:text-slate-200'>
                      <p className="font-semibold">MPIO:</p>
                      <p>manilapublicinfo@gmail.com</p>
                    </div>
                  </div>
                </div> 
              </div>
            </div>

            
            <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col col-span-full sm:col-span-1 bg-white dark:bg-[#181818] shadow-md rounded-sm">
              <div className="md:flex-1 md:flex px-5 py-4 ">
                <img
                  src="https://fastly.4sqi.net/img/general/600x600/44228466_2W22d-OVQMtC3-GuRbr7qf3EV_A1uoG64e3lrPgKNWU.jpg"
                  alt="Office Image"
                  className="w-40 h-40 object-contain my-5 mx-auto md:ml-5 md:mr-8 rounded-xl"
                />
                <div className="pt-0 pr-0 sm:pt-5 sm:pr-5 text-center sm:text-left">
                  <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Real Property Tax & Real Property Clearance</h2>
                    <div className='text-sm md:text-base dark:text-slate-200'>
                      <div className="flex items-center justify-center mt-2.5 sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                        <p className="ml-2">Real Estate Division</p>
                      </div>
                      <div className="flex items-center justify-center mt-2.5 sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        <p className="ml-2">8527 - 0884</p>
                      </div>
                      <div className="flex items-center justify-center mt-2.5 sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
                        </svg>
                        <p className="ml-2">147</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col col-span-full sm:col-span-1 bg-white dark:bg-[#181818] shadow-md rounded-sm">
              <div className="md:flex-1 md:flex px-5 py-4 ">
                <img
                  src="https://fastly.4sqi.net/img/general/600x600/44228466_2W22d-OVQMtC3-GuRbr7qf3EV_A1uoG64e3lrPgKNWU.jpg"
                  alt="Office Image"
                  className="w-40 h-40 object-contain my-5 mx-auto md:ml-5 md:mr-8 rounded-xl"
                />
                <div className="pt-0 pr-0 sm:pt-5 sm:pr-5 text-center sm:text-left">
                  <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Real Property Tax & Real Property Clearance</h2>
                    <div className='text-sm md:text-base dark:text-slate-200'>
                      <div className="flex items-center justify-center mt-2.5 sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                        <p className="ml-2">Real Estate Division</p>
                      </div>
                      <div className="flex items-center justify-center mt-2.5 sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        <p className="ml-2">8527 - 0884</p>
                      </div>
                      <div className="flex items-center justify-center mt-2.5 sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
                        </svg>
                        <p className="ml-2">147</p>
                      </div>
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
