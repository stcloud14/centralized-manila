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
              <br />
              <h1 className="text-slate-800 dark:text-slate-100 font-medium">
                <span className="text-blue-600">4</span>
                <span className="text-red-500">0</span>
                <span className="text-yellow-500">4</span>
                <span className="text-green-500">E</span>
                <span className="text-blue-600">R</span>
                <span className="text-red-500">R</span>
                <span className="text-yellow-500">O</span>
                <span className="text-green-500">R</span>
              </h1>
              <br />
              <p className="text-slate-800 dark:text-slate-100 mt-4">
                404. That's an error
              </p>
              {/* Display the message with user input */}
              <p className="text-slate-800 dark:text-slate-100">
                The requested URL /{user_input} was not found on this server.
              </p>
              <p className="text-slate-800 dark:text-slate-100">
                That's all we know.
              </p>
              <p className="text-slate-800 dark:text-slate-100">
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Forbidden;
