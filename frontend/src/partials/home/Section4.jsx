import React from 'react';
import Image from '../../images/resources/welcome_06.png';

function Section4() {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white dark:bg-[#181818] shadow-md rounded-sm">
      <div className="md:flex-1 px-5 py-4 md:flex">
        <img src={Image} alt="Banner Image" className='w-40 h-40 object-contain my-5 mx-auto md:ml-5 md:mr-8'/>
        <div className='pt-5 pr-5'>
          <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Local Civil Registry</h2>
          <div className='text-sm md:text-base dark:text-slate-400'>
            <p>Request an LGU copy of a Birth Certificate, Marriage Certificate, and Death Certificate.</p>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default Section4;
