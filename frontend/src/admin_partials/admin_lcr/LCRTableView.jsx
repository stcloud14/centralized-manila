import React from 'react';

const LCRTableView = ({ filteredBirthCert, filteredDeathCert, filteredMarriageCert, handleModalOpen, handleRejectConfirm, handleProcessConfirm, handleCompleteConfirm, section }) => {
  return(
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
                {console.log('Section:', section)}
                {(section === undefined || section.trim() === 'Request') ? 'Complete' : 'Process'}
                </div>
              </th>
          </tr>
      </thead>
      <tbody>

          {filteredBirthCert.length <= 0 && filteredDeathCert.length <= 0 && filteredMarriageCert.length <= 0 && (
          <tr>
            <td colSpan="6" className="font-medium text-slate-600 items-center text-center py-4 justify-center dark:text-white">
              No records found.
            </td>
          </tr>
          )}


        {/* Birth Certificate */}
        {filteredBirthCert && filteredBirthCert.length > 0 && filteredBirthCert.map((transaction) => (
          <tr onClick={() => handleModalOpen(transaction, 'Birth Certificate')} key={transaction.transaction_id}  className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
            <td className="px-1 py-2 border-l-4 border-l-[#008744] whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
              {transaction.transaction_id}
              </div>
            </td>
            <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
            {transaction.date}
            </td>
            <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase">
              {transaction.f_name}
            </td>
            <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase">
              {transaction.l_name}
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

        {/* Death Certificate */}
        {filteredDeathCert && filteredDeathCert.length > 0 && filteredDeathCert.map((transaction) => (
          <tr onClick={() => handleModalOpen(transaction, 'Death Certificate')} key={transaction.transaction_id} className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
            <td className="px-1 py-2 border-l-4 border-l-[#17bf6c] whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
              {transaction.transaction_id}
              </div>
            </td>
            <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              {transaction.date}
            </td>
            <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase">
              {transaction.f_name}
            </td>
            <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase">
              {transaction.l_name}
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

        {/* Marriage Certificate */}
        {filteredMarriageCert && filteredMarriageCert.length > 0 && filteredMarriageCert.map((transaction) => (
          <tr onClick={() => handleModalOpen(transaction, 'Marriage Certificate')} key={transaction.transaction_id} className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
            <td className="px-1 py-2 border-l-4 border-l-[#78ffbc] whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
                {transaction.transaction_id}
              </div>
            </td>
            <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              {transaction.date}
            </td>
            <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase">
              {transaction.husband_fname}
            </td>
            <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase">
              {transaction.husband_lname}
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
                <div onClick={(e) => { e.stopPropagation(); handleProcessConfirm(transaction); }} className="flex justify-center gap-4 px-2">
                  <div className="group cursor-pointer flex items-center">
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
  )
}

export default LCRTableView;