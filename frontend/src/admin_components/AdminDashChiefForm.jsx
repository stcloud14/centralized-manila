import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { v4 as uuidv4 } from 'uuid';
import AdminSidebar from '../admin_partials/AdminSidebar';
import { useParams } from 'react-router-dom'; 
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
    transReport,
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

  const { admin_type } = useParams();
  const [reportData, setReportData]=useState();

  useEffect(() => {
    const fetchREPORTData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/report/${admin_type}`);
        setReportData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchREPORTData();
  }, [admin_type]);

  async function fetchData(endpoint, selectedYear) {
    try {
      const response = await axios.get(`http://localhost:8800/admin/${endpoint}/`, {
        params: {
          selectedYear: selectedYear
        }
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
      throw error; // Optionally re-throw the error for the caller to handle
    }
  }

  console.log(taxPayment)
  console.log(verifiedUsers)
  // console.log(taxClearance)
  // console.log(businessPermit)
  
  // const adminRole = state && state.user_role;

  // CA = Chief Administrator

  // 0000 = Month and Date

  // 0000 = Generate UIID

  const generateReportNumber = (admin_type) => {

    const correctedAdminType = admin_type === 'chief_admin' ? 'CA' : admin_type;

    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${month}${day}`;

    const uuid1 = uuidv4();
    const uuidInt1 = parseInt(uuid1.replace(/-/g, '').substring(0, 4), 16);
    const uuid1Code = (uuidInt1 % 10000).toString().padStart(4, '0');

    return `${correctedAdminType}-${formattedDate}-${uuid1Code}`;
};

  console.log(revenue);

  const generateReports = async (selectedYear) => {

    const fetchPromises = [
      fetchData('transreport', selectedYear),
      fetchData('taxpayment', selectedYear),
      fetchData('taxclearance', selectedYear),
      fetchData('businesspermit', selectedYear),
      fetchData('cedulacert', selectedYear),
      fetchData('birthcert', selectedYear),
      fetchData('deathcert', selectedYear),
      fetchData('marriagecert', selectedYear),
      fetchData('revenue', selectedYear)
    ];

    try {

      const [
        setYearData,
        TPData,
        TCData,
        BPData,
        CTCData,
        BCData,
        DCData,
        MCData,
        RevenueData,
      ] = await Promise.all(fetchPromises);

    
        if (setYearData) {

          const reportData = setYearData.transReport;
          
          const reportNo = generateReportNumber(admin_type); 

          const reportNum = {
              report_no: reportNo,
              admin_type: admin_type,
              date_processed: new Date().toISOString(),
          };

          await axios.post(`http://localhost:8800/report/store/${admin_type}`, reportNum);

          console.log('Report stored successfully');
          
          // const { latestmonths, taxclearance, taxpayment, buspermit, cedulacert, birthcert, deathcert, marriagecert } = transStats;

          // console.log('TransStats:', transStats);

          // Calculation for the revenue
          const averageMonthlyRevenue = RevenueData.totalPaid ? RevenueData.totalPaid / 12 : 0;
          const totalRefundAmount = 0;
          const totalRefundIssued = 0;

          const pdf = new jsPDF();

          // Date of Report
          // const currentDate1 = new Date();
          // const formattedDate1 = currentDate1.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });

          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(12);
          pdf.text("CITY GOVERNMENT OF MANILA", 15, 15);
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);
          pdf.text("Unified Departmental Administrative Report", 15, 19);
          pdf.text("Report No.: " + reportNo, 15, 23);

          const additionalTextX = pdf.internal.pageSize.width - 50;
          const additionalTextY = 15;
          const additionalText = [
            { text: "Report for the Year", bold: true },
              selectedYear
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
          

          const tableData = [];

          const monthLabels = {
              "1": "Jan", "2": "Feb", "3": "Mar", "4": "Apr", "5": "May", "6": "Jun",
              "7": "Jul", "8": "Aug", "9": "Sep", "10": "Oct", "11": "Nov", "12": "Dec", 
              "13": "Total Count"
          };

          // const reportData = transReport.transReport;

          // Populate tableData with data for each month
          for (const month in reportData) {
            const monthIndex = parseInt(month, 10) - 1;
            const monthLabel = monthLabels[month];
            const dataArray = reportData[month];
            if (Array.isArray(dataArray)) {
                tableData[monthIndex] = [monthLabel, ...dataArray.slice(1)];
            } else {
                console.error(`Data for ${monthLabel} is not an array.`);
            }
          }

          // Calculate total count for each row (excluding the first column)
          tableData.forEach((row, index) => {
            const totalCount = row.slice(1).reduce((acc, val) => acc + val, 0);
            tableData[index].push(totalCount);
          });

          // Calculate totals for each column
          const columnTotals = tableData.reduce((acc, row) => {
            row.forEach((val, index) => {
                if (index !== 0) {
                    acc[index] = (acc[index] || 0) + val;
                }
            });
            return acc;
          }, {});

          // Push total row to tableData
          const totalRow = ['Total'];
          for (const column in columnTotals) {
            totalRow.push(columnTotals[column]);
          }
          tableData.push(totalRow);

          const columnHeaders = ['', 'TP', 'TC', 'BP', 'CTC', 'BC', 'DC', 'MC', 'Total Count'];

          // Add the table
          pdf.autoTable({
            startY: 38, // Start the table below the "Transaction Type" text
            head: [columnHeaders], // Header for every column
            body: tableData,
            theme: 'plain',
            headStyles: {
                fontStyle: 'normal',
            },
            styles: {
                cellPadding: 0.5,
            },
            didDrawCell: (data) => {
                if (data.section === 'body' && data.column.index === columnHeaders.length - 1) {
                    data.cell.styles.fontStyle = 'normal';
                    data.cell.styles.halign = 'center';
                }
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
            ['Pending', 
              TPData.Pending + TCData.Pending + BPData.Pending + CTCData.Pending + BCData.Pending + DCData.Pending + MCData.Pending
            ],
            ['Paid', 
              TPData.Paid + TCData.Paid + BPData.Paid + CTCData.Paid + BCData.Paid + DCData.Paid + MCData.Paid
            ],
            ['Processing', 
              TPData.Processing + TCData.Processing + BPData.Processing + CTCData.Processing + BCData.Processing + DCData.Processing + MCData.Processing
            ],
            ['Complete', 
              TPData.Complete + TCData.Complete + BPData.Complete + CTCData.Complete + BCData.Complete + DCData.Complete + MCData.Complete
            ],
            ['Rejected', 
              TPData.Rejected + TCData.Rejected + BPData.Rejected + CTCData.Rejected + BCData.Rejected + DCData.Rejected + MCData.Rejected
            ],
            ['Canceled', 
              TPData.Canceled + TCData.Canceled + BPData.Canceled + CTCData.Canceled + BCData.Canceled + DCData.Canceled + MCData.Canceled
            ],
            ['Expired', 
              TPData.Expired + TCData.Expired + BPData.Expired + CTCData.Expired + BCData.Expired + DCData.Expired + MCData.Expired
            ],
            ['Total Transaction:', TPData.Total + TCData.Total + BPData.Total + CTCData.Total + BCData.Total + DCData.Total + MCData.Total]
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
                  cellPadding: 0.5,
                }
            });
            
              const lineOfSymbols2 = repeatSymbol(symbol, repetitions);
              const textXPosition2 = 15; // Adjust the X position
              const textYPosition2 = pdf.autoTable.previous.finalY + 5; // Adjust the Y position
              pdf.setFont("helvetica", "normal");
              pdf.setFontSize(10);
              pdf.text(lineOfSymbols2, textXPosition2, textYPosition2);

              const thirdTableData = [
                ['Total Gross Revenue', RevenueData.totalPaid ? `P ${RevenueData.totalPaid.toLocaleString()}` : ''],
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
                    cellPadding: 0.5,
                  }
              });

              const lineOfSymbols3 = repeatSymbol(symbol, repetitions);
              const textXPosition3 = 15; // Adjust the X position
              const textYPosition3 = pdf.autoTable.previous.finalY + 5; // Adjust the Y position
              pdf.setFont("helvetica", "normal");
              pdf.setFontSize(10);
              pdf.text(lineOfSymbols3, textXPosition3, textYPosition3);

              const fourthTableData = [
                ['Verifiend User', verifiedUsers.length > 0 ? verifiedUsers[0].total_verified : 'N/A',],
                ['Unverified User',  verifiedUsers.length > 0 ? verifiedUsers[0].total_unverified : 'N/A', ],
                ['Total Users', verifiedUsers.length > 0 ? verifiedUsers[0].total_users : 'N/A',]]

              pdf.autoTable({
                startY: pdf.autoTable.previous.finalY + 9, // Start the second table below the line of symbols
                head: [['User Demographics', 'Total Count']], // Header for the second table
                body: fourthTableData,
                theme: 'plain',
                headStyles: {
                    fontStyle: 'bold',
                },
                columnStyles: {
                    0: { cellWidth: pdf.internal.pageSize.width * 0.5 }, // Set the width of the first column to 50% of the page width
                    1: { cellWidth: pdf.internal.pageSize.width * 0.5, align: 'right'},// Set the width of the second column to 50% of the page width
                },
                styles: {
                  cellPadding: 0.5,
                }
            });

            const lineOfSymbols4 = repeatSymbol(symbol, repetitions);
            const textXPosition4 = 15; // Adjust the X position
            const textYPosition4 = pdf.autoTable.previous.finalY + 5; // Adjust the Y position
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.text(lineOfSymbols4, textXPosition4, textYPosition4);
          
              const noteText = [
                `I hereby certify that the provided information is accurate and has been carefully reviewed. This report depicts the`,
                `financial and operational performance of Real Property Transactions as of ${selectedYear}. Any identified`,
                `discrepancies or errors should be reported promptly for correction.`
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
                startY: pdf.autoTable.previous.finalY + 40,
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

        } else {
          console.log("Failed to fetch report year period.");
        }
    
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