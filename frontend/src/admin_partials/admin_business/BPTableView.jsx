import React from 'react';

const BPTableView = ({ filteredBusinessPermit, handleModalOpen, handleRejectConfirm, handleProcessConfirm, handleCompleteConfirm, section }) => (
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
                    Business Type
                  </div>
              </th>
              <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                  <div className="flex items-center">
                  Tax Identification Number
                  </div>
              </th>
              <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                <div className="flex justify-center items-center">
                  Reject
                </div>
              </th>
              <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                <div className="flex justify-center items-center">
                {console.log('Section:', section)}
                {(section === undefined || section.trim() === 'Request') ? 'Complete' : 'Process'}
                </div>
              </th>
          </tr>
      </thead>
      <tbody> 

      {filteredBusinessPermit.length <= 0 && (
      <tr>
        <td colSpan="6" className="font-medium text-slate-600 items-center text-center py-4 justify-center dark:text-white">
          No records found.
        </td>
      </tr>
      )}

        {filteredBusinessPermit && filteredBusinessPermit.length > 0 && filteredBusinessPermit.map((transaction) => (
          <tr onClick={() => handleModalOpen(transaction, 'Tax Clearance')} key={transaction.transaction_id} className='cursor-pointer bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
            <td className="px-1 py-2 border-l-4 border-l-[#d62d20] whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
                {transaction.transaction_id}
              </div>
            </td>
            <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              {transaction.date}
            </td>
            <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              {transaction.bus_type}
            </td>
            <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              {transaction.bus_tin}
            </td>
            <td className="py-1 whitespace-nowrap">
              <div className="flex justify-center gap-4 px-2">
                <div onClick={(e) => { e.stopPropagation(); handleRejectConfirm(transaction); }} className="group cursor-pointer flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  text-red-500 hover:text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            </td>
            {section === 'Requests' ? (
            <td className="py-1 whitespace-nowrap">
              <div className="flex justify-center gap-4 px-2">
                <div onClick={(e) => { e.stopPropagation(); handleProcessConfirm(transaction); }} className="group cursor-pointer flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500 hover:text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </div>
              </div>
            </td>
            ) : (
              <td className="py-1 whitespace-nowrap">
              <div className="flex justify-center gap-4 px-1">
                <div onClick={(e) => { e.stopPropagation(); handleCompleteConfirm(transaction); }} className="group cursor-pointer flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500 hover:text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
              </div>
            </td>
            )}
          </tr>
        ))}

      </tbody>
    </table>
  </div>
);

export default BPTableView;
