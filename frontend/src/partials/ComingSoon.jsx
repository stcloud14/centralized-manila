import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import comingsoon from '../images/resources/coming_soon.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const ComingSoon = () => {
  const Base_Url = process.env.Base_Url;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef(null);
  
  const navigate = useNavigate();
  const { user_id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    const checkToken = async (token) => {
        try {
            // Make a request to backend API to verify token and check user access
            const response = await axios.get(`${Base_Url}token/protect-token/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
          // window.location.reload();
          navigate(`/`);
        }
    };
  
    checkToken(token); // Pass the token to the checkToken function
}, [navigate, user_id]);

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

        <div className='md:text-sm text-xs pt-1 md:mx-44'>
            Exciting news – soon, you'll also be able to obtain your Health Certificate seamlessly here at Centralized <span className='text-blue-600 font-medium'> M</span>
                    <span className='text-red-500 font-medium'>a</span>
                    <span className='text-yellow-500 font-medium'>n</span>
                    <span className='text-green-500 font-medium'>i</span>
                    <span className='text-blue-600 font-medium'>l</span>
                    <span className='text-red-500 font-medium'>a</span>. Keep an eye out for further details.
        </div>

        <div className='py-10'>
            <img src={comingsoon} className='h-72 w-auto md:pr-0 pr-4 mx-auto object-cover object-fit' />
        </div>
    </div>
</div>


          <Footer />
        </main>


      </div>
    </div>
  );
}

export default ComingSoon;
	