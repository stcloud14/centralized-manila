import React from 'react';
import StatusBadgeDesktop from '../StatusBadgeDesktop';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logoImage from '../../images/mnl_header_pdf.png';

const TransDesktop = ({ searchInput, handleSearch, handleSearchInputChange, handleOpenModal, handleClearFilter, handleSortChange, sortOption, sortOrder, SortIcon, sortedTransactions, userPersonal }) => {

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
          ['Total Balance', `${totalAllBalances.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
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
                transaction.status_type === 'Pending' && transaction.amount ? `P ${transaction.amount}` : '',
                transaction.status_type === 'Paid' && transaction.amount ? `P ${transaction.amount}` : '',
                transaction.amount ? `P ${rowBalance.toFixed(2)}` : 'P 0'
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
            <h1 className='font-medium text-center text-slate-700 dark:text-white mb-7 md:mb-3'>Transaction History</h1>
            <div className="flex items-center justify-end mb-4 md:px-0 md:pr-0.5 px-0.5 text-xs">
              <div className="relative mr-2">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </span>
                <input value={searchInput} onChange={handleSearchInputChange} id="searchInput" onKeyDown={(e) => e.key === 'Enter' && handleSearch()} type="text" placeholder="Search ID..." className="bg-transparent text-xs md:text-sm w-full md:w-80 border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-full w-full md:w-auto"/>
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
                {sortedTransactions.map((transaction) => (
                  
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
                    P {transaction.amount}
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
              //   )) 
              //   : userTransaction.map((transaction) => (

              //   <tr key={transaction.transaction_id} className='bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
              //     <td className="pl-6 pr-3 py-4 whitespace-nowrap">
              //       <div className="font-medium text-gray-500 whitespace-nowrap dark:text-white">
              //         {transaction.transaction_id}
              //       </div>
              //     </td>
              //     <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              //       {transaction.date}
              //     </td>
              //     <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              //       {transaction.time}
              //     </td>
              //     <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              //       {transaction.trans_type}
              //     </td>
              //     <td className="px-3 py-4 whitespace-nowrap">
              //       <StatusBadgeDesktop statusType={transaction.status_type} />
              //     </td>
              //     <td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
              //       P {transaction.amount}
              //     </td>
              //     <td className="pl-3 pr-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium">
              //       <div className="group">
              //         <div onClick={() => handleOpenModal(transaction)} className="flex justify-center items-center text-center px-4 p-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full" >
              //           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:stroke-white">
              //             <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              //             <path className="stroke-blue-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              //           </svg>   
              //           <span className="text-xs font-normal">&nbsp;View Details</span>
              //         </div>
              //       </div>
              //     </td>
              //   </tr>
              ))} 

              </tbody>
              </table>
            </div>
          </div>
        </div>
        </>
      );
}

export default TransDesktop;