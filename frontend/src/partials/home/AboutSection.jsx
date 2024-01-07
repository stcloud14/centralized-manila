import React from 'react';
import Image from '../../images/resources/welcome_022.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

function AboutSection() {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white dark:bg-[#181818] shadow-md rounded-sm mb-6"  data-aos="fade-up" data-aos-duration="1500">
      <div className="md:flex-1 px-5 py-4 md:flex items-center">
        <img src={Image} alt="Banner Image" className='w-96 h-96 object-contain my-2 mx-auto md:ml-5 md:mr-8'/>
        <div className='py-5'>
            <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Business Permit</h2>
            <span className='text-sm md:text-base dark:text-slate-400'> 
                <span>Welcome! We are your trusted partner in streamlining administrative processes and simplifying the way you interact with local government services. We understand the challenges of navigating bureaucratic procedures, and our mission is to make essential tasks efficient, accessible, and user-friendly.</span>
                <br/><br/>
                At <span className="text-slate-800 dark:text-slate-100 font-medium">Centralized</span>
                <span className='text-blue-600'> M</span>
                <span className='text-red-500'>a</span>
                <span className='text-yellow-500'>n</span>
                <span className='text-green-500'>i</span>
                <span className='text-blue-600'>l</span>
                <span className='text-red-500'>a</span>
                , we offer a comprehensive suite of online services designed to empower individuals and businesses in managing their obligations seamlessly. From property-related transactions to business permits and vital records, our platform provides a one-stop solution for a range of municipal services.
                <br/><br/>
                We sincerely thank you for choosing <span className="text-slate-800 dark:text-slate-100 font-medium">Centralized </span>
                <span className='text-blue-600'> M</span>
                <span className='text-red-500'>a</span>
                <span className='text-yellow-500'>n</span>
                <span className='text-green-500'>i</span>
                <span className='text-blue-600'>l</span>
                <span className='text-red-500'>a</span>
                . Your trust and engagement with our platform are greatly appreciated, and we look forward to continually serving you with efficiency and innovation.
            </span>
        </div>
      </div> 
    </div>
  );
}

export default AboutSection;
