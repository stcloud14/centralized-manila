import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Forbidden = () => {
  const { user_input } = useParams();


  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main className="overflow-y-auto">

              <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-10 py-5">
                <br/>
                  <h1 className="text-slate-800 dark:text-slate-100 text-center font-medium text-xl sm:text-2xl">
                    CENTRALIZED
                    <span className='text-blue-600'> M</span>
                    <span className='text-red-500'>A</span>
                    <span className='text-yellow-500'>N</span>
                    <span className='text-green-500'>I</span>
                    <span className='text-blue-600'>L</span>
                    <span className='text-red-500'>A</span>
                   </h1>
                  <br/>
                  <h1 className="text-slate-800 dark:text-slate-100 text-center text-2xl sm:text-8xl font-black mt-[10rem]">
                    404. That's an error.
                  </h1>
                  <p className="text-slate-800 dark:text-slate-100 text-center text-lg sm:text-xl mt-20 mb-3">
                    The requested URL /{user_input} was not found on this server.
                  </p>
                  <p className="text-slate-800 dark:text-slate-100 text-center text-lg sm:text-xl mb-[10rem]">
                    That's all we know.
                  </p>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Forbidden;
