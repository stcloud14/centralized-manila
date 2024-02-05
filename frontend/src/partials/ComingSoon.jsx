import React, { useState, useEffect, useRef } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import comingsoon from '../images/resources/coming_soon.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const ComingSoon = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef(null);
  const logoSrc = '../src/images/mnl_footer.svg';

  useEffect(() => {
    // Add the animation classes when the component mounts
    const element = document.querySelector('.animate-bounce');
    element.classList.add('animate-animated', 'animate-bounce');

    // Remove the animation classes after 3 seconds
    const timeoutId = setTimeout(() => {
      element.classList.remove('animate-animated', 'animate-bounce');
    }, 3150);

    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);


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
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#181818] dark:border-[#181818] shadow-lg rounded-sm border border-slate-200 mx-4 my-4" data-aos="zoom-in" data-aos-duration="1500">
            <div className="px-7 mx-0 md:px-20 md:mx-10 py-5 items-center text-center">
                <div className='animate-bounce motion-safe font-medium md:text-5xl text-xl text-slate-700 dark:text-white mt-10'>
                    Coming Soon
                </div>

                <div className='text-sm pt-1'>
                    Stay tuned for more updates!
                </div>

                <div className='py-10'>
                    <img src={comingsoon} className='h-72 w-auto mx-auto' />
                </div>
            </div>
          </div>

          <Footer logo={logoSrc} />
        </main>


      </div>
    </div>
  );
}

export default ComingSoon;
	