import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AdminSidebar from '../admin_partials/AdminSidebar';
import { useLocation, useParams } from 'react-router-dom'; 
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';
import AdminBanner from '../admin_partials/AdminBanner';

import MainCard from '../admin_partials/misc/MainCard';

import RPstats from '../admin_partials/misc/RPstats';
import RCstats from '../admin_partials/misc/RCstats';
import CTCstats from '../admin_partials/misc/CTCstats';
import BPstats from '../admin_partials/misc/BPstats';
import BCstats from '../admin_partials/misc/BCstats';
import DCstats from '../admin_partials/misc/DCstats';
import MCstats from '../admin_partials/misc/MCstats';
import URstats from '../admin_partials/misc/URstats';
import TopRegions from '../admin_partials/misc/TopRegions';
import TopProvinces from '../admin_partials/misc/TopProvinces';
import TopCities from '../admin_partials/misc/TopCities';
import Revenue from '../admin_partials/misc/Revenue';
import logoImage from '../images/mnl_header_pdf.png';

const AdminDashChiefForm = React.memo(
  ({
    transStats,
    revenue,
    verifiedUsers,
    totalPaid,
    taxPayment,
    taxClearance,
    businessPermit,
    cedulaCert,
    birthCert,
    deathCert,
    marriageCert,
    topRegions,
    topProvinces,
    topCities
  }) => {
  
  // const location = useLocation();
  // const { pathname, state } = location;
  // const admin_type = pathname.split("/")[2];
  const { admin_type } = useParams();
  // const adminRole = state && state.user_role;

  const generateReports = async () => {
    try {
      const { latestmonths, taxclearance, taxpayment, buspermit, cedulacert, birthcert, deathcert, marriagecert } = transStats;

      console.log('TransStats:', transStats);

      // Calculation for the revenue
      const averageMonthlyRevenue = revenue.totalPaid ? revenue.totalPaid / 12 : 0;
      const totalRefundAmount = 0;
      const totalRefundIssued = 0;

      const pdf = new jsPDF();

      // Date of Report
      const currentDate1 = new Date();
      const formattedDate1 = currentDate1.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("CITY GOVERNMENT OF MANILA", 15, 15);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text("Chief Administrative Report", 15, 19);
      pdf.text("Report No.", 15, 23);

      const additionalTextX = pdf.internal.pageSize.width - 50;
      const additionalTextY = 15;
      const additionalText = [
        { text: "Date of Report", bold: true },
          formattedDate1
      ];

      additionalText.forEach((item, index) => {
        const text = typeof item === 'string' ? item : item.text;
        const isBold = typeof item === 'object' && item.bold;
        pdf.setFont(isBold ? "helvetica" : "helvetica", isBold ? "bold" : "normal");
        pdf.text(text, additionalTextX, additionalTextY + (index * 4));
      });

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      const transactionTypeText = "Transaction Type";
      const textWidth = pdf.getStringUnitWidth(transactionTypeText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      const centeredTextX = (pdf.internal.pageSize.width - textWidth) / 2;
      pdf.text(transactionTypeText, centeredTextX, 34);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text("Months", 15, 42);
      
      // Create data for the table
      const tableData = [];
      const abbreviatedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      // Populate the table data with sample values, you can replace it with your data
      abbreviatedMonths.forEach((month, index) => {
        const taxPaymentValue = taxpayment[index] || 0;
        const taxClearanceValue = taxclearance[index] || 0;
        const businessPermitValue = buspermit[index] || 0;
        const cedulaCertValue = cedulacert[index] || 0;
        const birthCertValue = birthcert[index] || 0; 
        const deathCertValue = deathcert[index] || 0; 
        const marriageCertValue = marriagecert[index] || 0;
        tableData.push([month, taxPaymentValue, taxClearanceValue, businessPermitValue, cedulaCertValue, birthCertValue, deathCertValue, marriageCertValue]);
      }); 

      // Add the table
      pdf.autoTable({
          startY: 38, // Start the table below the "Transaction Type" text
          head: [['', 'TP', 'TC', 'BP', 'CTC', 'BC', 'DC', 'MC']], // Header for every column
          body: tableData,
          theme: 'plain',
          headStyles: {
            fontStyle: 'normal',
        },
        styles: {
          cellPadding: 1,
        }
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
      const textYPosition = pdf.autoTable.previous.finalY + 5; // Adjust the Y position
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(lineOfSymbols, textXPosition, textYPosition);

      const secondTableData = [
        ['Transaction Status', 'Total Count'],
        ['Pending', 
          taxPayment.Pending + taxClearance.Pending + businessPermit.Pending + cedulaCert.Pending + birthCert.Pending + deathCert.Pending + marriageCert.Pending
        ],
        ['Paid', 
          taxPayment.Paid + taxClearance.Paid + businessPermit.Paid + cedulaCert.Paid + birthCert.Paid + deathCert.Paid + marriageCert.Paid
        ],
        ['Processing', 
          taxPayment.Processing + taxClearance.Processing + businessPermit.Processing + cedulaCert.Processing + birthCert.Processing + deathCert.Processing + marriageCert.Processing
        ],
        ['Complete', 
          taxPayment.Complete + taxClearance.Complete + businessPermit.Complete + cedulaCert.Complete + birthCert.Complete + deathCert.Complete + marriageCert.Complete
        ],
        ['Rejected', 
          taxPayment.Rejected + taxClearance.Rejected + businessPermit.Rejected + cedulaCert.Rejected + birthCert.Rejected + deathCert.Rejected + marriageCert.Rejected
        ],
        ['Canceled', 
          taxPayment.Canceled + taxClearance.Canceled + businessPermit.Canceled + cedulaCert.Canceled + birthCert.Canceled + deathCert.Canceled + marriageCert.Canceled
        ],
        ['Expired', 
          taxPayment.Expired + taxClearance.Expired + businessPermit.Expired + cedulaCert.Expired + birthCert.Expired + deathCert.Expired + marriageCert.Expired
        ]
      ];
       // Sample data for the second table
        pdf.autoTable({
            startY: pdf.autoTable.previous.finalY + 8, // Start the second table below the line of symbols
            head: [['Transaction Status', 'Total Count']], // Header for the second table
            body: secondTableData,
            theme: 'plain',
            headStyles: {
                fontStyle: 'bold',
            },
            columnStyles: {
                0: { cellWidth: pdf.internal.pageSize.width * 0.5}, // Set the width of the first column to 50% of the page width
                1: { cellWidth: pdf.internal.pageSize.width * 0.5 },// Set the width of the second column to 50% of the page width
            },
            styles: {
              cellPadding: 1,
            }
        });
        
          const lineOfSymbols2 = repeatSymbol(symbol, repetitions);
          const textXPosition2 = 15; // Adjust the X position
          const textYPosition2 = pdf.autoTable.previous.finalY + 5; // Adjust the Y position
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);
          pdf.text(lineOfSymbols2, textXPosition2, textYPosition2);

          const thirdTableData = [
            ['Total Gross Revenue', revenue.totalPaid ? `P ${revenue.totalPaid.toLocaleString()}` : ''],
            ['Average Monthly Revenue', `P ${averageMonthlyRevenue.toLocaleString()}`],
            ['Total Refund Amount', `P ${totalRefundAmount.toLocaleString()}`],
            ['Total Refund Issued', `P ${totalRefundIssued.toLocaleString()}`],
        ]; // Sample data for the second table
          pdf.autoTable({
              startY: pdf.autoTable.previous.finalY + 7, // Start the second table below the line of symbols
              head: [['Financial Status', 'Amount']], // Header for the second table
              body: thirdTableData,
              theme: 'plain',
              headStyles: {
                  fontStyle: 'bold',
              },
              columnStyles: {
                  0: { cellWidth: pdf.internal.pageSize.width * 0.5 }, // Set the width of the first column to 50% of the page width
                  1: { cellWidth: pdf.internal.pageSize.width * 0.5, align: 'right'},// Set the width of the second column to 50% of the page width
              },
              styles: {
                cellPadding: 1,
              }
          });

          const lineOfSymbols3 = repeatSymbol(symbol, repetitions);
          const textXPosition3 = 15; // Adjust the X position
          const textYPosition3 = pdf.autoTable.previous.finalY + 5; // Adjust the Y position
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);
          pdf.text(lineOfSymbols3, textXPosition3, textYPosition3);
      
          const noteText = [
            "I hereby certify that the provided information is accurate and has been carefully reviewed. This report depicts the",
            "financial and operational performance of Chief Admin Transactions as of [reporting period]. Any identified",
            "discrepancies or errors should be reported promptly for correction."
        ];
        const noteXPosition = 15; // Adjust as needed
        const noteYPosition = pdf.autoTable.previous.finalY + 10; // Adjust the Y position

        pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);
          noteText.forEach((text, index) => {
              pdf.text(text, noteXPosition, noteYPosition + (index * 4)); // Adjust spacing here
          });

         // Add a signature
         const pageWidth = pdf.internal.pageSize.width;
         const tableWidth = 80; // Adjust the width according to your requirement
         const margin = (pageWidth - tableWidth) - 10; // Adjust the margin as needed
         
         const signatureData = [['City Treasurer']];
         pdf.autoTable({
             startY: pdf.autoTable.previous.finalY + 45,
             head: [['Anne Mae Garcia']],
             body: signatureData,
             theme: 'plain',
             styles: {
                 cellPadding: 2,
                 fontSize: 10,
                 fontStyle: 'normal',
                 halign: 'center'
             },
             headStyles: {
                 fontStyle: 'normal',
             },
             margin: { left: margin },
         });
         pdf.setLineWidth(0.5); // Set line width
         pdf.line(120, pdf.autoTable.previous.finalY - 8, pdf.internal.pageSize.width - 14, pdf.autoTable.previous.finalY - 8);

         // Add a signature
         const pageWidth2 = pdf.internal.pageSize.width;
         const tableWidth2 = 80; // Adjust the width according to your requirement
         const margin2 = (pageWidth - tableWidth) - 10; // Adjust the margin as needed
         
         const signatureData2 = [['Chief Admin']];
         pdf.autoTable({
             startY: pdf.autoTable.previous.finalY - 16,
             head: [['Chief Administrative']],
             body: signatureData2,
             theme: 'plain',
             styles: {
                 cellPadding: 2,
                 fontSize: 10,
                 fontStyle: 'normal',
                 halign: 'center'
             },
             headStyles: {
                 fontStyle: 'normal',
             },
             margin: { right: margin },
         });
         pdf.setLineWidth(0.5); // Set line width
         pdf.line(15, pdf.autoTable.previous.finalY - 8, pdf.internal.pageSize.width - 118, pdf.autoTable.previous.finalY - 8);

         
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
      const filename = `${admin_type}_reports_${formattedDate}.pdf`;

      pdf.save(filename);
    } catch (error) {
      console.error('Error generating reports:', error);
    }
  };
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logoSrc = '../src/images/mnl_footer.svg';

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      transStats &&
      revenue &&
      verifiedUsers &&
      taxPayment &&
      taxClearance &&
      businessPermit &&
      cedulaCert &&
      birthCert &&
      deathCert &&
      marriageCert &&
      topRegions &&
      topProvinces &&
      topCities
    ) {
      setIsLoading(true);
    }
  }, [
    transStats,
    revenue,
    verifiedUsers,
    taxPayment,
    taxClearance,
    businessPermit,
    cedulaCert,
    birthCert,
    deathCert,
    marriageCert,
    topRegions,
    topProvinces,
    topCities
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [isLoading]);


  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
  
      {/* AdminSidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
  
        {/* Site header */}
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  
        {/* Contents Area */}
        <main className="overflow-y-auto">
  
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-[500px]">
            
              <svg
                aria-hidden="true"
                className="w-10 h-10 md:w-15 md:h-15 lg:w-20 lg:h-20 pb-0 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <p className="pt-5 sm:pt-10 font-bold text-lg md:text-xl">Please wait for a moment...</p>
            
            </div>
          )}
  
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {!isLoading && (
              <>
                <AdminBanner adminType={'CHIEF'} generateReports={generateReports} />
  
                <div className="grid grid-cols-12 gap-6">
                <MainCard transStats={transStats}/>
                  <Revenue revenue={revenue} totalAmount={totalPaid} adminType={'CHIEF'}/>
                  <URstats verifiedUsers={verifiedUsers} />
                  <RPstats taxPayment={taxPayment} />
                  <RCstats taxClearance={taxClearance} />
                  <BPstats businessPermit={businessPermit} />
                  <CTCstats cedulaCert={cedulaCert} />
                  <BCstats birthCert={birthCert}/>
                  <DCstats deathCert={deathCert}/>
                  <MCstats marriageCert={marriageCert}/>
                  <TopRegions topRegions={topRegions} />
                  <TopProvinces topProvinces={topProvinces} />
                  <TopCities topCities={topCities} />
                </div>
              </>
            )}
          </div>
          <AdminFooter logo={logoSrc} />
        </main>
      </div>
    </div>
  );  
});

export default AdminDashChiefForm;