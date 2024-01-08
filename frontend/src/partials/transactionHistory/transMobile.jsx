import React from 'react';
import StatusBadgeMobile from '../StatusBadgeMobile';
import TransDropdownFilter from './transDropdownFilter';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TransMobile = ({ searchInput, handleSearch, handleSearchInputChange, handleOpenModal, handleClearFilter, handleSortChange, sortOption, sortedTransactions, userPersonal }) => {

  const generatePDF = () => {
    // Create a new instance of jsPDF with autoTable plugin
    const pdf = new jsPDF();

    const logo = new Image();
    logo.src = logoImage;

    // Add the image to the PDF
    pdf.addImage(logo, 'PNG', 128, 5, 70, 35);

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
      head: [['Account Summary','']],
      body: [
          ['',''], 
          // Update this line in the "Account Summary" table
          ['Total Balance', `P ${Math.floor(totalAllBalances)}`],
      ],
      headStyles: {
          fillColor: false,  // Remove background color
          lineColor: 0,
          textColor: 0,
          fontSize: 10,
          fontStyle: 'bold',
          lineWidthTop: 1,    // Thickness of the top border
          lineWidthBottom: 1, // Thickness of the bottom border
      },
      bodyStyles: {
          fillColor: false,  // Remove background color
          textColor: 0,
          fontSize: 10,
      },
      alternateRowStyles: {
          fillColor: false,  // Remove background color
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

    pdf.autoTable({
      startY: tableStartY,
      head: [['Date', 'Time', 'Transaction ID', 'Transaction', 'Amount', 'Payment', 'Balance']],
      body: sortedTransactions.map((transaction) => {
          const amount = transaction.status_type === 'Pending' ? parseFloat(transaction.amount) : 0;
          const payment = transaction.status_type === 'Paid' ? parseFloat(transaction.payment) : 0;
  
          // Calculate balance for each row independently
          let rowBalance = 0;
  
          // Ensure that amount and payment are valid numbers
          if (!isNaN(amount) && !isNaN(payment)) {
              rowBalance = amount - payment;
              rowBalance = Math.max(rowBalance, 0);
          }
  
          return [
              new Date(transaction.date_processed).toLocaleDateString('en-GB'),
              transaction.time,
              transaction.transaction_id,
              transaction.trans_type,
              transaction.status_type === 'Pending' && transaction.amount ? `P ${Math.floor(amount)}` : '',
              transaction.status_type === 'Paid' && transaction.amount ? `P ${Math.floor(amount)}` : '',
              transaction.amount ? `P ${Math.floor(rowBalance)}` : 'P 0'
          ];
      }),
      headStyles: headerStyles,
  });

    pdf.save(`${userPersonal.l_name}_Transaction_History.pdf`);
};

    return (
        <>
        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
              <div className="px-5 py-5">
                <h1 className='font-medium text-center text-slate-700 dark:text-white mb-5'>Transaction History</h1>
                <div className="flex justify-center items-center mb-3 md:px-0 md:pr-0.5 px-0.5 text-xs">
                  <div className="relative mr-2 w-full">
                    <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                    </span>
                    <input
                      id="searchInput"
                      value={searchInput}
                      onChange={handleSearchInputChange} 
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
                      type="text"
                      placeholder="Search ID..."
                      className="bg-transparent text-xs md:text-sm border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-full w-full"
                    />
                  </div>
                
                  <button onClick={handleClearFilter} className="bg-slate-500 hover:bg-slate-600 text-white px-2.5 py-1 mr-2 rounded-full inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <span>Clear</span>
                  </button>

                  <TransDropdownFilter handleSortChange={handleSortChange} sortOption={sortOption}/>
                  
                </div>
                <div className="flex text-xs mb-5">
                <button
                  className="group flex justify-center w-full items-center text-center p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-full mt-2"
                  onClick={generatePDF}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path className="stroke-emerald-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span className="text-xs font-normal px-0.5">&nbsp;Download SOA</span>
                </button>
                </div>

                {/* <div className="flex justify center items-center text-[0.60rem] mb-5 space-px-2 space-x-2">
                  <div className="group flex justify-center w-full items-center text-center">
                    <span>Sort By: </span>
                  </div>
                  <button className="flex justify-center w-full items-center text-center p-1 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-full">
                    <span>Date</span>
                  </button>

                  <button className="flex justify-center w-full items-center text-center p-1 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-full">
                    <span>Type</span>
                  </button>
                  <button className="flex justify-center w-full items-center text-center p-1 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-full">
                    <span>Status</span>
                  </button>
                  <button className="flex justify-center w-full items-center text-center p-1 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-full">
                    <span>Amount</span>
                  </button>
                </div> */}
                {/* {filteredTransactions.length > 0 ? filteredTransactions.map((transaction) => ( */}
                {sortedTransactions.map((transaction) => (

                  <div key={transaction.transaction_id} className="bg-white dark:bg-[#333333] shadow-md rounded-md mb-4">
                    <div className=" text-xs font-semibold text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-md px-4 py-1.5">
                      Transaction ID: {transaction.transaction_id}
                    </div>
                    <div className="px-4 py-5">
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date: {transaction.date}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Time: {transaction.time}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type: {transaction.trans_type}</div>
                      <div className="flex justify-start items-center text-xs text-slate-600 dark:text-slate-300 my-1">
                        <span>Status:</span> <StatusBadgeMobile statusType={transaction.status_type} />
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Amount: P {transaction.amount}</div>
                      <div className="mt-5 group">
                        <div onClick={() => handleOpenModal(transaction)} className="flex justify-center items-center text-center p-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full mt-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-0.5">
                            <path className="stroke-blue-500" strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path className="stroke-blue-500" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs font-normal">&nbsp;View Details</span>
                        </div>
                      </div>
                    </div>  
                  </div>
                ))} 
                {/* )) : userTransaction.map((transaction) => (
                    
                    <div key={transaction.transaction_id} className="bg-white dark:bg-[#333333] shadow-md rounded-md mb-4">
                    <div className=" text-xs font-semibold text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-md px-4 py-1.5">
                        Transaction ID: {transaction.transaction_id}
                    </div>
                    <div className="px-4 py-5">
                        <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date: {transaction.date}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Time: {transaction.time}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type: {transaction.trans_type}</div>
                        <div className="whitespace-nowrap text-xs text-slate-600 dark:text-slate-300 my-1">
                        Status: <StatusBadgeMobile statusType={transaction.status_type} />
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Amount: P {transaction.amount}</div>
                        <div className="mt-5 group">
                        <div onClick={() => handleOpenModal(transaction)} className="flex justify-center items-center text-center p-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-0.5">
                            <path className="stroke-blue-500" strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path className="stroke-blue-500" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-xs font-normal">&nbsp;View Details</span>
                        </div>
                        </div>
                    </div>  
                    </div>
                ))} */}
              </div>
        </div>
        </>

    );
}
     

export default TransMobile;