import React, { useState, useRef } from 'react';
import Footer from '../partials/Footer';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import RealEstateImage from '../images/RealEstate.jpg';
import TaxPayerLoungeImage from '../images/TaxPayerLounge.jpg';
import LocalCivilRegistryImage from '../images/LocalCivilRegistry.jpg';
import ElectronicDataProcessingImage from '../images/ElectronicDataProcessing.jpg';
import CallingGirlImage from '../images/CallingGirl.png';

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
              <div className="bg-white dark:bg-[#181818] py-6 px-6 md:px-20 mb-6 rounded-sm shadow-md grid grid-cols-8 items-center justify-between">
                <div className="col-span-full sm:col-span-3 flex items-center justify-center">
                  <img src={CallingGirlImage} alt="Banner Image" className='md:w-60 md:h-60 w-44 h-44 object-contain mb-4 md:mb-0'/>
                </div>
                <div className="col-span-full sm:col-span-5">
                  <h1 className="text-xl lg:text-3xl md:text-3xl text-slate-800 dark:text-slate-100 font-medium text-center">
                    Welcome to Centralized
                    <span className='text-blue-600'> M</span>
                    <span className='text-red-500'>a</span>
                    <span className='text-yellow-500'>n</span>
                    <span className='text-green-500'>i</span>
                    <span className='text-blue-600'>l</span>
                    <span className='text-red-500'>a</span><br/>
                    <span className=''> Contacts Page</span>
                  </h1>
                </div>
              </div>
              <div className="grid grid-rows-3 grid-cols-8 gap-6">
              <div className="hidden md:flex flex-col col-span-full sm:col-span-3 bg-white dark:bg-[#181818] shadow-md rounded-sm">
                <div className="md:flex-1 px-5 py-4 md:flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="stroke-slate-800 dark:stroke-slate-200  w-20 h-20 object-contain my-5 mx-auto md:ml-5 md:mr-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                  <div className="pt-0 pr-0 text-center sm:pt-3 sm:pr-5 sm:text-left ">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Location</h2>
                    <div className="text-sm md:text-base dark:text-slate-100">
                      <p className="font-semibold text-slate-600 dark:text-slate-100">Manila City Hall</p>
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="stroke-slate-800 dark:stroke-slate-200 w-20 h-20 object-contain my-5 mx-auto md:ml-5 md:mr-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                  <div className="pt-0 pr-0 text-center sm:pt-5 sm:pr-5 sm:text-left">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Location</h2>
                    <div className="text-sm md:text-base dark:text-slate-100">
                      <p className="font-semibold text-slate-600 dark:text-slate-100">Manila City Hall</p>
                      <p>Padre Burgos Ave, Ermita,</p>
                      <p> Manila, 1000 Metro Manila</p>
                    </div>
                  </div>
                </div> 
              </div>




            <div className="flex flex-col col-span-full sm:col-span-3 bg-white dark:bg-[#181818] shadow-md rounded-sm">
                <div className="md:flex-1 px-5 py-4 md:flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="stroke-slate-800 dark:stroke-slate-200 w-20 h-20 object-contain my-5 mx-auto md:ml-5 md:mr-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                  <div className="pt-0 pr-0 text-center sm:pt-5 sm:pr-5 sm:text-left">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Office Hours</h2>
                    <div className="text-sm md:text-base text-slate-600 dark:text-slate-100">
                      <p className="font-semibold">Monday to Friday</p>
                      <p className="">8:00 AM to 5:00 PM</p>
                    </div>
                  </div>
                </div> 
              </div>

              <div className="flex flex-col col-span-full sm:col-span-3 bg-white dark:bg-[#181818] shadow-md rounded-sm">
                <div className="md:flex-1 px-5 py-4 md:flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="stroke-slate-800 dark:stroke-slate-200 w-20 h-20 object-contain my-5 mx-auto md:ml-5 md:mr-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                </svg>
                  <div className="pt-0 pr-0 text-center sm:pt-5 sm:pr-5 sm:text-left">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Official Public Email</h2>
                    <div className="text-sm md:text-base text-slate-600 dark:text-slate-100">
                      <p className="font-semibold">MPIO:</p>
                      <p className="">manilapublicinfo@gmail.com</p>
                    </div>
                  </div>
                </div> 
              </div>
            </div>

            
            <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col col-span-full sm:col-span-1 bg-white dark:bg-[#181818] shadow-md rounded-sm">
              <div className="md:flex-1 md:flex px-5 py-4 ">
              <img src={RealEstateImage} alt="Office Image" className="w-40 h-40 object-contain my-5 mx-auto md:ml-5 md:mr-8 rounded-sm"/>
                <div className="pt-0 pr-0 sm:pt-5 sm:pr-5 text-center sm:text-left">
                    <div className='text-sm md:text-base dark:text-slate-200'>
                      <div className="flex items-center justify-center mb-0 sm:mb-5 mt-0 sm:mt-2 sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-slate-800 dark:text-slate-200 w-6 h-6">
                          <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clip-rule="evenodd" />
                        </svg>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 ml-2">Real Estate Division</p>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <p className="ml-2">Real Property Tax</p>
                      </div>
                      <div className="flex items-center justify-center mt-3 sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        <p className="ml-2">(02) 8527 - 0884</p>
                      </div>
                      <div className="flex items-center justify-center mt-3 sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <p className="ml-2">Room 147</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col col-span-full sm:col-span-1 bg-white dark:bg-[#181818] shadow-md rounded-sm">
              <div className="md:flex-1 md:flex px-5 py-4 ">
              <img src={TaxPayerLoungeImage} alt="Office Image" className="w-40 h-40 object-contain my-5 mx-auto md:ml-5 md:mr-8 rounded-sm"/>
                <div className="pt-0 pr-0 sm:pt-5 sm:pr-5 text-center sm:text-left">
                    <div className='text-sm md:text-base dark:text-slate-200'>
                      <div className="flex items-center justify-center mb-0 sm:mb-5 mt-0 sm:mt-2  sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-slate-800 dark:text-slate-200 w-6 h-6">
                          <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clip-rule="evenodd" />
                        </svg>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 ml-2">Tax Payer's Lounge</p>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <p className="ml-2">Business Permit & Cedula</p>
                      </div>
                      <div className="flex items-center justify-center mt-3 sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        <p className="ml-2">(02) 8527 - 0871</p>
                      </div>
                      <div className="flex items-center justify-center mt-3 sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <p className="ml-2">Ground Floor - West Wing</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col col-span-full sm:col-span-1 bg-white dark:bg-[#181818] shadow-md rounded-sm">
              <div className="md:flex-1 md:flex px-5 py-4 ">
              <img src={LocalCivilRegistryImage} alt="Office Image" className="w-40 h-40 object-contain my-5 mx-auto md:ml-5 md:mr-8 rounded-sm"/>
                <div className="pt-0 pr-0 sm:pt-5 sm:pr-5 text-center sm:text-left">
                    <div className='text-sm md:text-base dark:text-slate-200'>
                      <div className="flex items-center justify-center mb-0 sm:mb-5 mt-0 sm:mt-2  sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-slate-800 dark:text-slate-200 w-6 h-6">
                          <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clip-rule="evenodd" />
                        </svg>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 ml-2">Local Civil Registry</p>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <p className="ml-2">Birth, Marriage, & Death Certificate</p>
                      </div>
                      <div className="flex items-center justify-center mt-3 sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        <p className="ml-2">(02) 8405 - 0081</p>
                      </div>
                      <div className="flex items-center justify-center mt-3 sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <p className="ml-2">Room 117 - 119</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col col-span-full sm:col-span-1 bg-white dark:bg-[#181818] shadow-md rounded-sm">
              <div className="md:flex-1 md:flex px-5 py-4 ">
              <img src={ElectronicDataProcessingImage} alt="Office Image" className="w-40 h-40 object-contain my-5 mx-auto md:ml-5 md:mr-8 rounded-sm"/>
                <div className="pt-0 pr-0 sm:pt-5 sm:pr-5 text-center sm:text-left">
                    <div className='text-sm md:text-base dark:text-slate-200'>
                      <div className="flex items-center justify-center mb-0 sm:mb-5 mt-0 sm:mt-2  sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-slate-800 dark:text-slate-200 w-6 h-6">
                          <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clip-rule="evenodd" />
                        </svg>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 ml-2">Electronic Data Processing (EDP)</p>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <p className="ml-2">Technical Support</p>
                      </div>
                      <div className="flex items-center justify-center mt-3 sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        <p className="ml-2">(02) 8527 - 7804</p>
                      </div>
                      <div className="flex items-center justify-center mt-3 sm:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <p className="ml-2">Room 142</p>
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
