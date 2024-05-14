import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fourfour from '../images/resources/err02.png';

const Forbidden = () => {
  const { user_input } = useParams();


  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center dark:bg-[#212121] p-4">
      <div className="max-w-screen-full w-screen h-full bg-white dark:bg-[#2b2b2b] shadow-md p-8 rounded-lg grid content-center z-10">
          <div className="w-full lg:space-y-11 md:space-y-2 space-y-4 items-center text-center z-10">
            <div>
              <h1 className="text-slate-800 dark:text-slate-100 text-center font-medium text-xl sm:text-2xl">
                Centralized
                <span className='text-blue-600'> M</span>
                <span className='text-red-500'>a</span>
                <span className='text-yellow-500'>n</span>
                <span className='text-green-500'>i</span>
                <span className='text-blue-600'>l</span>
                <span className='text-red-500'>a</span>
              </h1>
            </div>
                  
            <div>
                <img src={fourfour} className='lg:h-72 md:h-40 h-52 w-auto mx-auto object-cover object-fit'/>
            </div>
            
            <div>
              <h1 className="text-slate-800 dark:text-slate-100 text-center lg:text-5xl md:text-4xl text-3xl font-black">
                <span className='text-blue-600'>4</span>
                <span className='text-yellow-500'>0</span>
                <span className='text-red-500'>4</span>
                <span className='text-emerald-600'>.</span> That's an error.
              </h1>
            </div>
            <div>
            <span className="text-slate-800 dark:text-slate-100 w-full text-center md:text-lg text-md">
            {user_input !== ':user_input' ? (
              <>
                The requested URL <span className='text-red-600'>{user_input}</span> was not found on this server.
              </>
            ) : (
              <>The requested URL was not found on this server.</>
            )}
          </span>
            </div>
            <div>
              <span className="text-slate-800 dark:text-slate-100 text-center md:text-lg text-sm">
                That's all we know.
              </span>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Forbidden;
