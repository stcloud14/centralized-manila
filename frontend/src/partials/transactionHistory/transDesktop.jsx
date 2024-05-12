import React, { useState } from 'react';
import StatusBadgeDesktop from '../StatusBadgeDesktop';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios'
import moment from 'moment';
import logoImage from '../../images/mnl_header_pdf.png';
import Flatpickr from 'react-flatpickr';
import { v4 as uuidv4 } from 'uuid';

import TransTypeDropdown from '../transDropdown/TransTypeDropdown';
import StatusTypeDropdown from '../transDropdown/StatusTypeDropdown';
import FilterButton from '../FilterButton';

const TransDesktop = ({ searchInput, setSearchInput, handleSearch, handleOpenModal, handleClearFilter, handleSortChange, sortOption, sortOrder, SortIcon, sortedTransactions, handleInputChange, handleInputChange2, selectedDate, setSelectedDate, selectedDatee, setSelectedDatee, selectedStatus, selectedType, filteredTransactions, userPersonal, soaData }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const Base_Url = process.env.Base_Url;
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



  console.log(filteredTransactions)

  const generateUniqueSOA = (type, user) => {

    // This will be the SOA numbering system: 

    // 000-1111-2222-3333-4444
    // 000 - Trans Type
    // 1111 - Last four digits of user ID
    // 2222 - Current Month+Day
    // 3333 - Generated UUID
    // 4444 - Generated UUID

    // The two generated UUID alone will cater for 100 million possibilities

    let code;

      switch (type) {
          case 'Real Property Tax Payment':
              code = `010`;
              break;
          case 'Real Property Tax Clearance':
              code = `011`;
              break;
          case 'Business Permit':
              code = `020`;
              break;
          case 'Community Tax Certificate':
              code = `030`;
              break;
          case 'Birth Certificate':
              code = `040`;
              break;
          case 'Death Certificate':
              code = `041`;
              break;
          case 'Marriage Certificate':
              code = `042`;
              break;
          default:  
              code = `000`;
      }

    const userCode = user.slice(-4);

    const currentDate = new Date();
  
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    
    const MDcode = month.toString() + day.toString();
    
    const uuid1 = uuidv4();
    const uuid2 = uuidv4();

    const uuidInt1 = parseInt(uuid1.replace(/-/g, '').substring(0, 4), 16);
    const uuidInt2 = parseInt(uuid2.replace(/-/g, '').substring(0, 4), 16);

    const uuid1Code = (uuidInt1 % 10000).toString().padStart(4, '0');
    const uuid2Code = (uuidInt2 % 10000).toString().padStart(4, '0');

    return `${code}-${userCode}-${MDcode}-${uuid1Code}-${uuid2Code}`;
  };


  const generatePDF = async () => {
    try {

        // Check if there are any pending transactions
        const pendingTransactions = filteredTransactions.filter(transaction => transaction.status_type.toLowerCase() === 'pending');

        if (pendingTransactions.length === 0) {
            // Log details of transactions that were considered not pending
            console.log('No pending transactions found. Cannot generate PDF.');
            console.log('Transactions considered not pending:', filteredTransactions);
            return;
        }

        const totalPages = pendingTransactions.length;

        const pdf = new jsPDF();
        
        const generatedSOAObjects = [];
        let existingSOANumbers = []; 
        let knownTransactionTypes = {};
        
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const transaction = pendingTransactions[pageNum - 1];
            // const arrayBase = pageNum - 1;
            // const transaction = filteredTransactions[arrayBase];

            // Check if transaction_id exists
            if (!transaction.transaction_id) {
                continue;
            }

            let soaNumber, expiry_date;

            // Check if the transaction type is known
            if (!knownTransactionTypes[transaction.trans_type]) {
                // Generate SOA number for new transaction type
                soaNumber = generateUniqueSOA(transaction.trans_type, transaction.user_id);
                knownTransactionTypes[transaction.trans_type] = true; 
            } else {
                // Use existing SOA number for known transaction type
                if (soaData && soaData.length > 0) {
                    const matchedSoa = soaData.find(soa => soa.transaction_id === transaction.transaction_id);
                    if (matchedSoa) {
                        soaNumber = matchedSoa.soa_no;
                        existingSOANumbers.push(soaNumber); 
                        const expiryDateStr = matchedSoa.expiry_date;
                        const expiryDate = moment(expiryDateStr);
                        const formattedExpiryDate = expiryDate.format('MMMM DD, YYYY, hh:mm A');
                        expiry_date = formattedExpiryDate;
                    }
                }
            }

            if (!soaNumber) {
                // If still no SOA number, generate a default one
                soaNumber = generateUniqueSOA(transaction.trans_type, transaction.user_id);
            }

            const soaObject = {
                soa_no: soaNumber,
                transaction_id: transaction.transaction_id
            };

            generatedSOAObjects.push(soaObject);

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(12);
            pdf.text("CITY GOVERNMENT OF MANILA", 15, 15);
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.text(transaction.trans_type, 15, 19);
            pdf.text("Electronic Statement of Account", 15, 23);

            // Additional text to be placed on the right
            const currentDate1 = new Date();
            const currentMonth = currentDate1.getMonth();
            const currentYear = currentDate1.getFullYear();
            const billingDate = new Date(currentYear, currentMonth, 6);

            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            const additionalText = [
                { text: "Billing Date", bold: true },
                `${monthNames[billingDate.getMonth()]} 6, ${billingDate.getFullYear()}`
            ];

            if (transaction.trans_type === 'Business Permit') {
                additionalText.push(
                    { text: "Business Type", bold: true },
                    transaction.bus_type
                );
            }

            const additionalTextX = pdf.internal.pageSize.width - 50;
            const additionalTextY = 35;

            additionalText.forEach((item, index) => {
                const text = typeof item === 'string' ? item : item.text;
                const isBold = typeof item === 'object' && item.bold;
                pdf.setFont(isBold ? "helvetica" : "helvetica", isBold ? "bold" : "normal");
                pdf.text(text, additionalTextX, additionalTextY + (index * 4));
            });


            // Display labels and their corresponding text
            const labelSets = {
                'Real Property Tax Payment': ["SOA No.", "Account Name:", "Tax Declaration Number:", "Transaction ID:"],
                'Real Property Tax Clearance': ["SOA No.", "Tax Declaration Number:", "Transaction ID:"],
                'Business Permit': ["SOA No.", "Name of Business:", "Name of Owner:", "Transaction ID:"],
                'Community Tax Certificate': ["SOA No.", "Name of Owner:", "Transaction ID:"],
                'Birth Certificate': ["SOA No.", "Name of Requestor:", "Transaction ID:"],
                'Death Certificate': ["SOA No.", "Name of Requestor:", "Transaction ID:"],
                'Marriage Certificate': ["SOA No.", "Name of Requestor:", "Transaction ID:"],
                default: ["SOA No.", "Name of Requestor:", "Transaction ID:"],
            };

            const colonWidth = pdf.getStringUnitWidth(":") * 1;

            const labels = labelSets[transaction.trans_type] || labelSets.default;

            labels.forEach((label, index) => {
                const labelWidth = pdf.getStringUnitWidth(label) * 3.9;
                const textStartX = 15 + labelWidth + colonWidth;
                let text;

                switch (index) {
                    case 0:
                        text = soaNumber; 
                        break;
                    case 1:
                        if (transaction.trans_type === 'Community Tax Certificate') {
                            text = transaction.cedula_doc_owner || "Unknown Owner";
                        } else if (transaction.trans_type === 'Birth Certificate') {
                            text = transaction.birth_requestor || "Unknown Requestor";
                        } else if (transaction.trans_type === 'Death Certificate') { 
                            text = transaction.death_requestor || "Unknown Requestor";
                        } else if (transaction.trans_type === 'Marriage Certificate') {
                            text = transaction.consent_info || "Unknown Requestor";
                        } else {
                            text = transaction.acc_name || transaction.tc_tdn || transaction.bus_name  || "Unknown Owner";
                        }
                        break;
                    case 2:
                        if (transaction.trans_type === 'Business Permit') {
                            text = transaction.bus_owner || "Unknown Owner";
                        } else if (transaction.type === 'Real Property Tax Payment') {
                            text = transaction.tp_tdn || "Unknown TDN";
                        } else {
                            text = transaction.transaction_id || "Transaction ID";
                        }
                        break;
                    case 3:
                        if (transaction.trans_type === 'Business Permit') {
                            text = transaction.transaction_id || "Transaction ID";
                        } else if (transaction.trans_type === 'Community Tax Certificate') {
                            text = ""; 
                        } else {
                            text = transaction.transaction_id || "Transaction ID";
                        }
                        break;
                    default:
                        text = "Unknown";
                }

                pdf.setFont("helvetica", "bold");
                pdf.text(label, 15, 35 + index * 4);
                pdf.setFont("helvetica", "normal");
                pdf.text(text, textStartX, 35 + index * 4);
            });   

            // Spacing between the text above and the table below
            const textHeight = (labels.length + 1) * 4; 
            const marginTop = 1;

            // Adjust the starting y-coordinate for the first table
            const firstTableStartY = 35 + textHeight + marginTop;

            // Define styles for the first table header
            const firstTableHeaderStyles = {
                fillColor: [50, 50, 50],
                textColor: 255,
            };

            // Transaction Details table
            const { trans_type, tp_pin, tc_pin, amount, year_period, period_id, date, bus_reg_no, bus_tin, ci_acc_no, copies } = transaction;

            let head, body;

            switch (trans_type) {
                case 'Real Property Tax Payment':
                    head = [['PIN', 'Total Amount', 'Year', 'Quarter']];
                    body = [[tp_pin, 'P ' + amount, year_period, period_id]];
                    break;
                case 'Real Property Tax Clearance':
                    head = [['PIN', 'Total Amount', 'Date Processed']];
                    body = [[tc_pin, 'P ' + amount, date]];
                    break;
                case 'Business Permit':
                    head = [['DTI/SEC/CDA Registration No.', 'Tax Identification Number', 'Total Amount', 'Date Processed']];
                    body = [[bus_reg_no, bus_tin, 'P ' + amount, date]];
                    break;
                case 'Community Tax Certificate':
                    head = [['Tax Payer Account No.', 'Total Amount', 'Date Processed']];
                    body = [[ci_acc_no, 'P ' + amount, date]];
                    break;
                default:  
                    head = [['No. of Copies', 'Total Amount', 'Date Processed']];
                    body = [[copies, 'P ' + amount, date]];
            }

            pdf.autoTable({
                startY: firstTableStartY,
                head: head,
                body: body,
                headStyles: firstTableHeaderStyles,
                theme: 'plain',
            });

            // Function to repeat a symbol to form a line
            function repeatSymbol(symbol, count) {
                return symbol.repeat(count);
            }

            // Define the symbol and the number of repetitions
            const symbol = "\u2022"; // Unicode for a bullet point symbol
            const repetitions = 146; // Adjust the number of repetitions as needed

            // Generate the line of symbols
            const lineOfSymbols = repeatSymbol(symbol, repetitions);

            // Add the line of symbols below the first table
            const textXPosition = 15; // Adjust the X position
            const textYPosition = pdf.autoTable.previous.finalY + 10; // Adjust the Y position

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.text(lineOfSymbols, textXPosition, textYPosition);


            // Second Table Title
            // const titleText = "Last Payment";
            // const titleXPosition = 15; // Adjust as needed
            // const titleYPosition = pdf.autoTable.previous.finalY + 20;

            // pdf.setFont("helvetica", "bold");
            // pdf.setFontSize(10);
            // pdf.text(titleText, titleXPosition, titleYPosition);

            // Second Table
            // const secondTableStartY = titleYPosition + 2; // Adjust spacing from title

            // pdf.autoTable({
            //     startY: secondTableStartY,
            //     head: [['Payment Date', 'Total Amount']],
            //     body:  [["1/14/2023", "P 1200.00"]],
            //     theme: 'plain',
            //     columnStyles: {
            //         0: { cellWidth: 40, cellPadding: 1, halign: 'center'}, // Adjust the width and height of the first column
            //         1: { cellWidth: 40, cellPadding: 1, halign: 'center'}  // Adjust the width and height of the second column
            //     },
            //     headStyles: {
            //         fontStyle: 'normal',
            //         halign: 'center'
            //     }
            // });

            // Add note text below the second table
            const noteText = [
                "Note:",
                "1. Please present this Statement to the Teller for in-person payments. Alternatively, within the",
                "   transaction details, use the 'Pay' button to settle your dues conveniently online. Disregard",
                "   if the account has already been settled.",
                "2. This eSOA is valid until " + expiry_date + "."
            ];
            const noteXPosition = 15; // Adjust as needed
            const noteYPosition = pdf.autoTable.previous.finalY + 20; // Adjust the Y position

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            noteText.forEach((text, index) => {
                pdf.text(text, noteXPosition, noteYPosition + (index * 4)); // Adjust spacing here
            });

            // Add signature on the right side at the bottom of the first table
            const signatureXPosition = pdf.internal.pageSize.width - 58;
            const signatureYPosition = pdf.autoTable.previous.finalY + 65;

            const fontSize = 10;
            pdf.setFontSize(fontSize);
            pdf.setFont("helvetica", "normal");

            pdf.text("City Treasurer", signatureXPosition + 12, signatureYPosition + 9);

            pdf.line(signatureXPosition, signatureYPosition + 5, signatureXPosition + 45, signatureYPosition + 5);

            
            // Get the current date and time
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            });
            const formattedTime = currentDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            });

            // Construct the footer text with the dynamic date and time
            let f_name = userPersonal.f_name;
            let l_name = userPersonal.l_name;

            f_name = f_name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
            l_name = l_name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

            const footerText = `Generated on ${formattedDate}, at ${formattedTime} by ${f_name} ${l_name}`;

            // Calculate the position for footer text
            const footerTextX = 15;
            const footerTextY = pdf.internal.pageSize.height - 15;
            
            // Calculate the width of the page number text
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            const pageNumberText = `Page ${pageNum} of ${totalPages}`;
            const pageNumberTextWidth = pdf.getStringUnitWidth(pageNumberText) * pdf.internal.getFontSize();
            
            // Calculate the position for page number
            const pageNumberTextX = pdf.internal.pageSize.width - (-19) - pageNumberTextWidth;
            const pageNumberTextY = pdf.internal.pageSize.height - 15;
            
            // Add footer text after the City Treasurer text
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            
            // Add footer text
            pdf.text(footerText, footerTextX, footerTextY);
            
            // Add page number
            pdf.text(pageNumberText, pageNumberTextX, pageNumberTextY);            

            // Add new page if not the last page
            if (pageNum !== totalPages) {
                pdf.addPage();
            }
        }


        const body = generatedSOAObjects;

        try {
            const storeSOAnumbers = await axios.post(`${Base_Url}soa/store/${userPersonal.user_id}`, body);

            if (storeSOAnumbers.status === 200) {
                console.log('Successfully Generated SOA');
            } else {
                console.log("Failed to store SOA info into database.");
            }
        } catch (emailError) {
            alert(emailError);
        }

        // Save the PDF
        pdf.save(`${userPersonal.l_name}_Transaction_History.pdf`);
    } catch (error) {
        console.error('Error generating transaction history:', error);
    }
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
                      toggleDropdown={toggleDropdown}
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
                  className={`group border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-4 py-1 rounded-full inline-flex items-center ${['Paid', 'Processing', 'Expired', 'Canceled', 'Complete', 'Rejected'].includes(selectedStatus) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={generatePDF}
                  disabled={['Paid', 'Processing', 'Expired', 'Canceled', 'Complete', 'Rejected'].includes(selectedStatus)}
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