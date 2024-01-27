import React from 'react';

const LCRTableView = ({ }) => (
    <div className="relative overflow-x-auto shadow-md rounded-sm">
    <table className="w-full text-left text-xs md:text-sm rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-gray-700 border-l-4 dark:border-l-[#212121] uppercase bg-slate-200 dark:bg-[#212121] dark:text-slate-400">
          <tr>
              <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                  <div className="flex items-center pl-3">
                    Transaction ID
                  </div>
              </th>
              <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                  <div className="flex items-center">
                    Date
                  </div>
              </th>
              <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                  <div className="flex items-center">
                    Last Name
                  </div>
              </th>
              <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                  <div className="flex items-center">
                    First Name
                  </div>
              </th>
              <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                <div className="flex justify-center items-center">
                  Reject
                </div>
              </th>
              <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                <div className="flex justify-center items-center">
                  Process
                </div>
              </th>
          </tr>
      </thead>
      <tbody>
        {/* Birth Certificate */}
        <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
          <td className="px-1 py-2 border-l-4 border-l-[#008744] whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
            <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
              17059267-DBB7F8193 
            </div>
          </td>
          <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
            January 22, 2024
          </td>
          <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase">
            Maghirang
          </td>
          <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase">
            Paolo
          </td>
          <td className="py-1 whitespace-nowrap">
            <div className="flex justify-center gap-4 px-2">
              <div className="group cursor-pointer flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  text-red-500 hover:text-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </td>
          <td className="py-1 whitespace-nowrap">
            <div className="flex justify-center gap-4 px-2">
              <div className="group cursor-pointer flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500 hover:text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
              </div>
            </div>
          </td>
        </tr>

        {/* Death Certificate */}
        <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
          <td className="px-1 py-2 border-l-4 border-l-[#17bf6c] whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
            <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
              17059267-DBB7F8193 
            </div>
          </td>
          <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
            January 22, 2024
          </td>
          <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase">
            Maghirang
          </td>
          <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase">
            Paolo
          </td>
          <td className="py-1 whitespace-nowrap">
            <div className="flex justify-center gap-4 px-2">
              <div className="group cursor-pointer flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  text-red-500 hover:text-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </td>
          <td className="py-1 whitespace-nowrap">
            <div className="flex justify-center gap-4 px-2">
              <div className="group cursor-pointer flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500 hover:text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
              </div>
            </div>
          </td>
        </tr>

        {/* Marriage Certificate */}
        <tr className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
          <td className="px-1 py-2 border-l-4 border-l-[#78ffbc] whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
            <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
              17059267-DBB7F8193 
            </div>
          </td>
          <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
            January 22, 2024
          </td>
          <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase">
            Maghirang
          </td>
          <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase">
            Paolo
          </td>
          <td className="py-1 whitespace-nowrap">
            <div className="flex justify-center gap-4 px-2">
              <div className="group cursor-pointer flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  text-red-500 hover:text-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </td>
          <td className="py-1 whitespace-nowrap">
            <div className="flex justify-center gap-4 px-2">
              <div className="group cursor-pointer flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500 hover:text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
              </div>
            </div>
          </td>
        </tr>



      </tbody>
    </table>
  </div>
);

export default LCRTableView;