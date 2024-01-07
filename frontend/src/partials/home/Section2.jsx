import React from 'react';
import Image from '../../images/resources/welcome_05.png';

function Section2() {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white dark:bg-[#181818] shadow-md rounded-sm">
      <div className="md:flex-1 px-5 py-4 md:flex">
        <img src={Image} alt="Banner Image" className='w-44 h-44 object-contain my-2 mx-auto md:ml-5 md:mr-8'/>
        <div className='pt-5'>
          <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Business Permit</h2>
          <div className='text-sm md:text-base dark:text-slate-400'>
            <p>Apply, pay, and obtain all necessary permits and licenses for your business efficiently.</p> 
          </div>
        </div>
      </div> 
    </div>
  );
}

export default Section2;
