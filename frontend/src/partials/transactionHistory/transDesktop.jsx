import React, { useState } from 'react';
import StatusBadgeDesktop from '../StatusBadgeDesktop';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logoImage from '../../images/mnl_header_pdf.png';
import Flatpickr from 'react-flatpickr';

import TransTypeDropdown from '../transDropdown/TransTypeDropdown';
import StatusTypeDropdown from '../transDropdown/StatusTypeDropdown';
import FilterButton from '../FilterButton';

const TransDesktop = ({ searchInput, setSearchInput, handleSearch, handleSearchInputChange, handleOpenModal, handleClearFilter, handleSortChange, sortOption, sortOrder, SortIcon, sortedTransactions, handleInputChange, handleInputChange2, selectedDate, setSelectedDate, selectedDatee, setSelectedDatee, selectedStatus, selectedType, filteredTransactions, userPersonal }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  
  const formatAmount = (amount) => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      return 'Invalid Amount';
    }
  
    // Add .00 to the amount
    const formattedAmount = parsedAmount.toFixed(2);
  
    return `P ${formattedAmount}`;
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const generatePDF = async () => {
    try {
      const pdf = new jsPDF();
  
      // Load the image as a data URL
      const imageDataURL = await loadImageAsDataURL(logoImage);
  
      // Add image to the PDF
      pdf.addImage(imageDataURL, 'PNG', 128, 5, 70, 35);
  
      pdf.setLineWidth(0.5);
      pdf.line(130, 40, 195, 40);
      pdf.line(130, 47, 195, 47);
      pdf.line(130, 64, 195, 64);
  
      // Account Summary table
      const totalAllBalances = sortedTransactions.reduce((total, transaction) => {
        const amount = transaction.status_type === 'Pending' ? parseFloat(transaction.amount) : 0;
        const payment = transaction.status_type === 'Paid' ? parseFloat(transaction.payment) : 0;
  
        if (!isNaN(amount) && !isNaN(payment)) {
          total += amount - payment;
          total = Math.max(total, 0);
        }
  
        return total;
      }, 0);
  
      pdf.autoTable({
        startY: 40,
        head: [['Account Summary', '']],
        body: [
          ['', ''],
          // Update this line in the "Account Summary" table
          ['Total Balance', `P ${totalAllBalances.toFixed(2)}`],
        ],
        headStyles: {
          fillColor: false, // Remove background color
          lineColor: 0,
          textColor: 0,
          fontSize: 10,
          fontStyle: 'bold',
          lineWidthTop: 1, // Thickness of the top border
          lineWidthBottom: 1, // Thickness of the bottom border
        },
        bodyStyles: {
          fillColor: false, // Remove background color
          textColor: 0,
          fontSize: 10,
        },
        alternateRowStyles: {
          fillColor: false, // Remove background color
          textColor: 0,
          fontSize: 10,
        },
        margin: { top: 60, left: 130 },
        tableWidth: 65,
      });
  
      // Adjust the starting y-coordinate for the table
      const tableStartY = 74;
  
      // Define styles for the table header
      const headerStyles = {
        fillColor: [50, 50, 50],
        textColor: 255,
      };
  
      // Filter transactions based on start and end dates, type, and status
      const filteredTransactions = sortedTransactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date_processed);
        const isDateInRange =
          (!selectedDate || transactionDate >= new Date(selectedDate)) &&
          (!selectedDatee || transactionDate <= new Date(selectedDatee));

        const isTypeMatching =
          !selectedType || selectedType === '0' || transaction.trans_type === selectedType;

        const isStatusMatching =
          !selectedStatus ||
          selectedStatus === 'All' ||
          transaction.status_type.toLowerCase() === selectedStatus.toLowerCase();

        return isDateInRange && isTypeMatching && isStatusMatching;
      });
  
      pdf.autoTable({
        startY: tableStartY,
        head: [['Date', 'Time', 'Transaction ID', 'Transaction', 'Amount', 'Payment', 'Balance']],
        body: filteredTransactions.map((transaction, index) => {
          const amount = parseFloat(transaction.amount) || 0;
          const payment = parseFloat(transaction.payment) || 0;
      
          // Validate that both amount and payment are valid numbers
          if (isNaN(amount) || isNaN(payment)) {
            // Handle non-numeric values, such as displaying an error message or setting them to 0
            console.error(`Invalid amount or payment for transaction ID ${transaction.transaction_id}`);
          }
      
          // Declare rowBalance outside the map function
          let rowBalance = 0;
      
          // Calculate balance for each row independently
          if (transaction.status_type === 'Pending') {
            rowBalance = amount - payment;
            rowBalance = Math.max(rowBalance, 0); // Ensure balance is not negative
          }
      
          // Format numeric values to have two decimal places
          const formattedAmount = `P ${amount.toFixed(2)}`;
          const formattedPayment = `P ${payment.toFixed(2)}`;
          const displayBalance = `P ${rowBalance < 0 ? '-' : ''}${Math.abs(rowBalance).toFixed(2)}`;
      
          return [
            new Date(transaction.date_processed).toLocaleDateString('en-GB'),
            transaction.time,
            transaction.transaction_id,
            transaction.trans_type,
            transaction.status_type === 'Pending' && transaction.amount ? formattedAmount : '',
            transaction.status_type === 'Paid' ? formattedAmount : '',
            displayBalance,
          ];
        }),
        headStyles: headerStyles,
      });
  
      pdf.save(`${userPersonal.l_name}_Transaction_History.pdf`);
    } catch (error) {
      console.error('Error generating transaction history:', error);
    }
  };
  

  const loadImageAsDataURL = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };
    
    
  
    return (
        <>
        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
          <div className="px-5 py-5">
            <h1 className='font-medium text-center text-slate-700 dark:text-white mb-7 md:mb-3'>Transaction History</h1>
              <div className="flex items-center justify-end mb-2 md:px-0 md:pr-0.5 px-0.5 text-xs">
                {/* <div className="relative mr-2">
                  <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </span>
                  <input value={searchInput} onChange={(e) => handleSearch(e.target.value.toUpperCase())} id="searchInput" onKeyDown={(e) => e.key === 'Enter' && handleSearch()} type="text" placeholder="Search ID..." className="bg-transparent text-xs md:text-sm w-full md:w-80 border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-full w-full md:w-auto"/>
                </div> */}
                
                <div className="relative inline-block text-left z-10">
                  <button type="button" onClick={toggleDropdown} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 mr-2 rounded-full inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path className="stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                  </svg>
                    <span className="pl-1">Filter</span>
                  </button>

        {isDropdownOpen && (
          <FilterButton 
          searchInput={searchInput} 
          setSearchInput={setSearchInput}
          handleSearch={handleSearch} 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedDatee={selectedDatee}
          setSelectedDatee={setSelectedDatee}
          selectedStatus={selectedStatus}
          handleInputChange={handleInputChange}
          handleInputChange2={handleInputChange2}
          selectedType={selectedType}
          />
        )}
                </div>

                <button onClick={handleClearFilter} className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-1 mr-2 rounded-full inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span>&nbsp;Clear</span>
                </button>

                <button
                  className="group border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-4 py-1 rounded-full inline-flex items-center"
                  onClick={generatePDF}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path className="stroke-emerald-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>&nbsp;Download SOA</span>
                </button>
              </div>

            <div className="relative overflow-x-auto shadow-md md:rounded-lg rounded-md">
              <table className="w-full text-left text-xs md:text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-gray-700 uppercase bg-slate-200 dark:bg-[#212121] dark:text-slate-400">
                    <tr>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center pl-3">
                              Transaction ID
                            </div>
                        </th>
                        <th onClick={() => handleSortChange('date_processed')} scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Date{sortOption === 'date_processed'} <SortIcon order={sortOrder} />
                            </div>
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Time
                            </div>
                        </th>
                        <th onClick={() => handleSortChange('trans_type')} scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Type{sortOption === 'trans_type'} <SortIcon order={sortOrder} />
                            </div>
                        </th><th onClick={() => handleSortChange('status_type')} scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Status{sortOption === 'status_type'} <SortIcon order={sortOrder} />
                            </div>
                        </th><th onClick={() => handleSortChange('amount')} scope="col" className="px-3 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
                            <div className="flex items-center">
                              Amount{sortOption === 'amount'} <SortIcon order={sortOrder} />
                            </div>
                        </th>
                        <th>
                          {/* View Details*/}
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        {searchInput || selectedType || selectedStatus ? (
                          <span>No records found.</span>
                        ) : (
                          <span>No records available.</span>
                        )}
                      </td>
                    </tr>
                  ) : (
                  filteredTransactions.map((transaction) => (
                <tr key={transaction.transaction_id} className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
                  <td className="pl-6 pr-3 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-500 whitespace-nowrap dark:text-white">
                      {transaction.transaction_id}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {transaction.date}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {transaction.time}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {transaction.trans_type}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <StatusBadgeDesktop statusType={transaction.status_type} />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {formatAmount(transaction.amount)}
                  </td>
                  <td className="pl-3 pr-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                    <div className="group cursor-pointer">
                      <div onClick={() => handleOpenModal(transaction)} className="flex justify-center items-center text-center px-4 p-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:stroke-white">
                          <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>   
                        <span className="text-xs font-normal">&nbsp;View Details</span>
                      </div>
                    </div>
                  </td>
                </tr>
                  ))
                )}
              </tbody>
              </table>
            </div>
          </div>
        </div>
        </>
      );
}

export default TransDesktop;