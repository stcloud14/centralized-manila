import React, { useState } from 'react';

const AdminListDesktop = ({ handleOpenModal, userApplications, searchInput, setSearchInput, searchEmail, setSearchEmail, searchFname, setSearchFname, searchLname, setSearchLname, handleClearFilter, handleSearch, handleInputChange, handleInputChange2, selectedType, selectedStatus }) => {

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 py-5">
        <h1 className='font-medium text-center text-slate-700 dark:text-white'>Admin Accounts</h1>
        <h1 className='text-sm italic text-center text-slate-700 dark:text-gray-300'>List of Admin and Other Information</h1> 
        <div className="flex items-center justify-end mb-4 md:px-0 md:pr-0.5 px-0.5 text-xs">
          {/* <div className="relative mr-2">
            <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
            <input id="searchInput" type="text" placeholder="Search" className="bg-transparent text-xs md:text-sm w-full md:w-80 border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm w-full"/>
          </div> */}
      <div className="flex flex-col items-center sm:flex-row text-xs">
        <div className="flex-row flex justify-end w-full">
        {/* Filter Button */}
        <div className="relative w-full sm:w-20 text-left z-10">
            <button type="button" onClick={toggleDropdown} className="bg-blue-500 hover:bg-blue-600 text-white justify-center py-1 mr-2 w-full rounded-sm inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path className="stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
              <span className="pl-1">Filter</span>
            </button>

          {isDropdownOpen && (
          <div className="absolute w-[270px] origin-top-right py-2 px-3 bg-white dark:bg-[#212121] dark:text-slate-400 rounded-sm shadow-2xl z-20 md:right-10 sm:w-[405px]">

        {/* Last Name */}
        <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
            <span className="hidden sm:block pr-10 text-xs">Admin Username:</span>
          <div className="relative flex items-center">
            <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </span>
            {/* <input value={searchFname} onChange={(e) => setSearchFname(e.target.value.toUpperCase())}  onKeyDown={(e) => e.key === 'Enter' && handleSearch()} id="searchInput" type="text" placeholder="Search First Name..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/> */}
            <input value={searchFname} onChange={(e) => setSearchFname(e.target.value ? e.target.value.toUpperCase() : '')}  onKeyDown={(e) => e.key === 'Enter' && handleSearch()} id="searchInput" type="text" placeholder="Search Admin Username..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
          </div>
        </div>

        {/* First Name */}
        <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
          <span className="hidden sm:block pr-10 text-xs">Admin Type:</span>
            <div className="relative flex items-center">
              <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
              </span>
              {/* <input value={searchLname} onChange={(e) => setSearchLname(e.target.value.toUpperCase())}  onKeyDown={(e) => e.key === 'Enter' && handleSearch()} id="searchInput" type="text" placeholder="Search Last Name..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/> */}
              <input value={searchLname} onChange={(e) => setSearchLname(e.target.value ? e.target.value.toUpperCase() : '')}  onKeyDown={(e) => e.key === 'Enter' && handleSearch()} id="searchInput" type="text" placeholder="Search Admin Type..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>

            </div>
          </div>
          <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
          <span className="hidden sm:block pr-10 text-xs">Admin Type:</span>
            <div className="relative flex items-center">
              <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
              </span>
              {/* <input value={searchLname} onChange={(e) => setSearchLname(e.target.value.toUpperCase())}  onKeyDown={(e) => e.key === 'Enter' && handleSearch()} id="searchInput" type="text" placeholder="Search Last Name..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/> */}
              <input value={searchLname} onChange={(e) => setSearchLname(e.target.value ? e.target.value.toUpperCase() : '')}  onKeyDown={(e) => e.key === 'Enter' && handleSearch()} id="searchInput" type="text" placeholder="Search Admin Type..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>

            </div>
          </div>

          {/* Activity */}
          {/* <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
            <span className="hidden sm:block text-xs">Sex:</span>
              <select  value={selectedType} onChange={handleInputChange} name=""  id=""  className="text-xs border bg-transparent border-slate-300 text-slate-700 dark:text-white pl-4 rounded-sm peer cursor-pointer py-1 md:py-0.5 w-[235px] sm:w-[210px]">
                  <option value="All" className="dark:bg-[#3d3d3d]">Select Sex</option>
                  <option value="Male" className="dark:bg-[#3d3d3d]">Male</option>
                  <option value="Female" className="dark:bg-[#3d3d3d]">Female</option>
              </select>
          </div> */}

          {/* Mobile Number */}
          {/* <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
              <span className="hidden sm:block pr-10 text-xs">Mobile Number:</span>
            <div className="relative flex items-center">
              <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
              </span>
              <input  value={searchInput} onChange={(e) => setSearchInput(e.target.value.toUpperCase())}  onKeyDown={(e) => e.key === 'Enter' && handleSearch()} id="searchInput" type="text" placeholder="Search Mobile Number..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
            </div>
          </div> */}

            {/* Email */}
            {/* <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]"> */}
              {/* <span className="hidden sm:block pr-10 text-xs">Email:</span> */}
            {/* <div className="relative flex items-center"> */}
              {/* <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
              </span> */}
              {/* <input value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} id="searchInput" type="text" placeholder="Search Email..." className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/> */}
              {/* <input
                value={searchEmail || ""} // Replace null with an empty string
                onChange={(e) => setSearchEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                id="searchInput"
                type="text"
                // placeholder="Search Email..."
                className="bg-transparent text-xs w-[235px] sm:w-[210px] border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"
              /> */}
            {/* </div> */}
          {/* </div> */}

          {/* Status */}
          <div className="flex justify-center sm:justify-between items-center pb-[6px] sm:pb-[8px]">
            <span className="hidden sm:block text-xs">Admin Type:</span>
              <select  value={selectedStatus} onChange={handleInputChange2} name=""  id=""  className="text-xs border bg-transparent border-slate-300 text-slate-700 dark:text-white pl-4 rounded-sm peer cursor-pointer py-1 md:py-0.5 w-[235px] sm:w-[210px]">
                  <option value="All" className="dark:bg-[#3d3d3d]">Select Admin Type</option>
                  <option value="chief_admin" className="dark:bg-[#3d3d3d]">chief_admin</option>
                  <option value="rptax_admin" className="dark:bg-[#3d3d3d]">rptax_admin</option>
                  <option value="business_admin" className="dark:bg-[#3d3d3d]">business_admin</option>
                  <option value="lcr_admin" className="dark:bg-[#3d3d3d]">lcr_admin</option>
                  <option value="registry_admin" className="dark:bg-[#3d3d3d]">registry_admin</option>
              </select>
          </div>

          <button type="button" onClick={() => { handleSearch(); toggleDropdown(); }} className=" bg-blue-500 hover:bg-blue-600 text-white mr-[6px] sm:mr-[0px] px-4 py-1 mt-2 mb-0.5 rounded-sm flex items-center ml-auto">
              <span className="mx-auto">Filter</span>
          </button>
          </div>
          )}
        </div>

        {/* Clear Button */}
        <div className="w-full sm:w-20 ml-2">
        <button type="button" onClick={handleClearFilter} className="bg-slate-500 hover:bg-slate-600 text-white justify-center py-1 w-full rounded-sm inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
            <span className="pl-1">Clear</span>
        </button>
        </div>
        </div>
        </div>
        </div>

        <div className="relative overflow-x-auto shadow-md rounded-sm">
          <table className="w-full text-left text-xs md:text-sm rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 uppercase bg-slate-200 dark:bg-[#212121] dark:text-slate-400">
                <tr>
                    <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                        <div className="flex items-center pl-3">
                          Admin Username
                        </div>
                    </th>
                    <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                        <div className="flex items-center pl-3">
                          Admin Type
                        </div>
                    </th>
                    
                    {/* <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
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
                    </th> */}
                    <th>
                      {/* Actions */}
                    </th>
                </tr>
            </thead>
            <tbody>

            {userApplications && userApplications.length > 0 ? (
            userApplications.map((transaction, index) => (

            // <tr key={transaction?.transaction_id} onClick={() => handleOpenModal(transaction)} className='cursor-pointer bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
            <tr key={index} onClick={() => handleOpenModal(transaction)} className='cursor-pointer bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>

              <td className="px-1 py-2 whitespace-nowrap">
                <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
                  {transaction.mobile_no}
                </div>
              </td>
              <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
                  {transaction.admin_type}
                </div>
              </td>
              {/* <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
                  {transaction.m_name}
                </div>
              </td> */}
              {/* <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                {transaction.sex_type.toUpperCase()}
              </td> */}
              {/* <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                {transaction.sex_type ? transaction.sex_type.toUpperCase() : ''}
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
              </td> */}
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
            ))
            ) : (
              <tr key="noRecords">
                <td colSpan="10" className="text-center py-4 text-slate-500 dark:text-slate-400">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}


export default AdminListDesktop;
