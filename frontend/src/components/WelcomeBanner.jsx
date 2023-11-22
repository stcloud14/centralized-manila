import React from 'react';

function WelcomeBanner() {
  return (
    <div className="relative px-2 sm:px-2 rounded-sm overflow-hidden mb-4">
      {/* Background illustration */}
      <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true">
        
      </div>

      {/* Content */}
      <div className="relative">
        <h1 className="text-sm lg:text-3xl md:text-3xl text-slate-800 dark:text-slate-100 font-medium mb-1">
          Welcome to Centralized
          <span className='text-blue-600'> M</span>
          <span className='text-red-500'>a</span>
          <span className='text-yellow-500'>n</span>
          <span className='text-green-500'>i</span>
          <span className='text-blue-600'>l</span>
          <span className='text-red-500'>a</span>!
          </h1>
        <p className="lg:text-sm dark:text-slate-100 font-thin text-xs">Discover what's happening today.</p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
