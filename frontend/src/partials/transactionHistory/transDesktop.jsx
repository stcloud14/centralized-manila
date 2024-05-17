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

const TransMobile = ({ searchInput, setSearchInput, handleSearch, handleSearchInputChange, handleOpenModal, handleClearFilter, handleSortChange, sortOption, sortOrder, SortIcon, sortedTransactions, handleInputChange, handleInputChange2, selectedDate, setSelectedDate, selectedDatee, setSelectedDatee, selectedStatus, selectedType, filteredTransactions, userPersonal, soaData, isButtonDisabled }) => {
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
        // Check if there are any pending transactions matching the search input's transaction ID
        const pendingTransactions = filteredTransactions.filter(transaction =>
            transaction.status_type.toLowerCase() === 'pending' || transaction.transaction_id.toLowerCase() === searchInput.toLowerCase()
        );

        if (pendingTransactions.length === 0) {
            // Log a message if no pending transaction matching the search input is found
            console.log('No pending transaction matching the search input found. Cannot generate PDF.');
            return;
        }

        const pdf = new jsPDF();

        const generatedSOAObjects = [];
        let existingSOANumbers = [];
        let knownTransactionTypes = {};

        // Function to add footer and page number
        const addFooter = (pdf, pageNum, totalPages, userPersonal) => {
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

            let f_name = userPersonal.f_name;
            let l_name = userPersonal.l_name;

            f_name = f_name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
            l_name = l_name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

            const footerText = `Generated on ${formattedDate}, at ${formattedTime} by ${f_name} ${l_name}`;

            const footerTextX = 15;
            const footerTextY = pdf.internal.pageSize.height - 15;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.text(footerText, footerTextX, footerTextY);

            const pageNumberText = `Page ${pageNum} of ${totalPages}`;
            const pageNumberTextWidth = pdf.getStringUnitWidth(pageNumberText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
            const pageNumberTextX = pdf.internal.pageSize.width - 15 - pageNumberTextWidth;

            pdf.text(pageNumberText, pageNumberTextX, footerTextY);
        };

        for (let pageNum = 1; pageNum <= pendingTransactions.length; pageNum++) {
            const transaction = pendingTransactions[pageNum - 1];

            if (!transaction.transaction_id) {
                continue;
            }

            let soaNumber, expiry_date;

            if (!knownTransactionTypes[transaction.trans_type]) {
                soaNumber = generateUniqueSOA(transaction.trans_type, transaction.user_id);
                knownTransactionTypes[transaction.trans_type] = true;
                const expiryDate = moment().endOf('month').set({ hour: 23, minute: 59, second: 59 });
                const formattedExpiryDate = expiryDate.format('MMMM DD, YYYY, hh:mm A');
                expiry_date = formattedExpiryDate;
            } else {
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

            const currentDate1 = new Date();
            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            const additionalText = [
                { text: "Billing Date", bold: true },
                transaction.date
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
                            text = transaction.acc_name || transaction.tc_tdn || transaction.bus_name || "Unknown Owner";
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

            const textHeight = (labels.length + 1) * 4;
            const marginTop = 1;
            const firstTableStartY = 35 + textHeight + marginTop;

            const firstTableHeaderStyles = {
                fillColor: [50, 50, 50],
                textColor: 255,
            };

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

            function repeatSymbol(symbol, count) {
                return symbol.repeat(count);
            }

            const symbol = "\u2022";
            const repetitions = 146;
            const lineOfSymbols = repeatSymbol(symbol, repetitions);
            const textXPosition = 15;
            const textYPosition = pdf.autoTable.previous.finalY + 10;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.text(lineOfSymbols, textXPosition, textYPosition);

            const noteText = [
                "Note:",
                "1. Please present this Statement to the Teller for in-person payments. Alternatively, within the transaction details,",
                "    use the 'Pay' button to settle your dues conveniently online. Disregard if the account has already been settled.",
                "2. This eSOA is valid until " + expiry_date + "."
            ];
            const noteXPosition = 15;
            const noteYPosition = pdf.autoTable.previous.finalY + 20;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            noteText.forEach((text, index) => {
                pdf.text(text, noteXPosition, noteYPosition + (index * 4));
            });

            const signatureXPosition = pdf.internal.pageSize.width - 58;
            const signatureYPosition = pdf.autoTable.previous.finalY + 65;

            const fontSize = 10;
            pdf.setFontSize(fontSize);
            pdf.setFont("helvetica", "normal");

            pdf.text("City Treasurer", signatureXPosition + 12, signatureYPosition + 9);
            pdf.line(signatureXPosition, signatureYPosition + 5, signatureXPosition + 45, signatureYPosition + 5);

            addFooter(pdf, pageNum, pendingTransactions.length, userPersonal);

            if (pageNum !== pendingTransactions.length) {
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
                <h1 className='font-medium text-center text-slate-700 dark:text-white mb-5'>Transaction History</h1>
                <div className="flex flex-col items-center mb-2 md:flex-row md:px-0 md:pr-0.5 px-0.5 text-xs">
                  <div className="flex w-full items-center">
                    <button
                      type="button"
                      onClick={toggleDropdown}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 mr-2 justify-center group w-full items-center flex text-center rounded-full"
                    >
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

                    <button onClick={handleClearFilter} className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-1 justify-center w-full group items-center flex text-center rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                      <span>&nbsp;Clear</span>
                    </button>
                  </div>

                  <button
                    className={`group border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-4 py-1 mt-2 rounded-full w-full justify-center inline-flex items-center ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={generatePDF}
                    disabled={isButtonDisabled}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path className="stroke-emerald-500 group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>&nbsp;Download SOA</span>
                </button>

                </div>

            {/* <div className="relative overflow-x-auto shadow-md md:rounded-lg rounded-md">
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
            </div> */}

              {filteredTransactions.length === 0 ? (
                <div className="text-center text-sm py-4">
                  {searchInput || selectedType || selectedStatus ? (
                    <span>No records found.</span>
                  ) : (
                    <span>No records available.</span>
                  )}
                </div>
              ) : (

                filteredTransactions.map((transaction) => (
                  <div key={transaction.transaction_id} className="bg-white dark:bg-[#333333] shadow-md rounded-md mb-4">
                    <div className="text-xs font-semibold text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-md px-4 py-1.5">
                      Transaction Details
                    </div>
                    <div className="px-4 py-5">
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">
                        <span className="font-semibold">Transaction ID:</span> {transaction.transaction_id}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">
                        <span className="font-semibold">Date:</span> {transaction.date}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">
                        <span className="font-semibold">Time:</span> {transaction.time}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">
                        <span className="font-semibold">Type:</span> {transaction.trans_type}
                      </div>
                      <div className="flex justify-start items-center text-xs text-slate-600 dark:text-slate-300 my-1">
                        <span className="font-semibold">Status:</span>&nbsp;<StatusBadgeDesktop statusType={transaction.status_type} />
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 my-1">
                        <span className="font-semibold">Amount:</span>  {formatAmount(transaction.amount)}
                      </div>
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
                  ))
                )}
            </div>
        </div>
        </>
      );
}
     

export default TransMobile;