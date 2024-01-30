import React from 'react';

const UserListDesktop = ({ handleOpenModal, userApplications }) => {

    return (
        <>
        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
          <div className="px-5 py-5">
            <h1 className='font-medium text-center text-slate-700 dark:text-white'>Registry</h1>
            <h1 className='text-sm italic text-center text-slate-700 dark:text-gray-300'>List of Users and Other Information</h1> 
            <div className="flex items-center justify-end mb-4 md:px-0 md:pr-0.5 px-0.5 text-xs">
              <div className="relative mr-2">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </span>
                <input id="searchInput" type="text" placeholder="Search" className="bg-transparent text-xs md:text-sm w-full md:w-80 border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm w-full"/>
              </div>
            </div>

            <div className="relative overflow-x-auto shadow-md rounded-sm">
              <table className="w-full text-left text-xs md:text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-gray-700 uppercase bg-slate-200 dark:bg-[#212121] dark:text-slate-400">
                    <tr>
                        <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center pl-3">
                              Last Name
                            </div>
                        </th>
                        <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center pl-3">
                              First Name
                            </div>
                        </th>
                        <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center pl-3">
                              Middle Name
                            </div>
                        </th>
                        <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Sex
                            </div>
                        </th>
                        <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Place of Birth
                            </div>
                        </th>
                        <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Date of Birth
                            </div>
                        </th>
                        <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Mobile Number
                            </div>
                        </th>
                        <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Email
                            </div>
                        </th>
                        <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Verification Status
                            </div>
                        </th>
                        <th>
                          {/* Actions */}
                        </th>
                    </tr>
                </thead>
                <tbody>

                {userApplications?.map((transaction) => ( 
                <tr key={transaction?.transaction_id} className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                  <td className="px-1 py-2 whitespace-nowrap">
                    <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
                      {transaction.l_name}
                    </div>
                  </td>
                  <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
                      {transaction.f_name}
                    </div>
                  </td>
                  <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
                      {transaction.m_name}
                    </div>
                  </td>
                  <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {transaction.sex_type.toUpperCase()}
                  </td>
                  <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {transaction.birth_place}
                  </td>
                  <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {transaction.birth_date}
                  </td>
                  <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {transaction.mobile_no}
                  </td>
                  <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {transaction.user_email}
                  </td>
                  <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {transaction.verification_status.toUpperCase()}
                  </td>
                  <td className="py-1 whitespace-nowrap">
                    <div className="flex justify-center gap-4 px-2">
                      <div onClick={() => handleOpenModal(transaction)} className="group cursor-pointer flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500 hover:text-blue-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </div>
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
              </table>
            </div>
          </div>
        </div>
        </>
      );
}

export default UserListDesktop;