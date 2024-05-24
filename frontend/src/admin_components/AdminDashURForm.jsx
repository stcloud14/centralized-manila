import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom'; 
import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';
import AdminBanner from '../admin_partials/AdminBanner';
import { v4 as uuidv4 } from 'uuid';
import URstats from '../admin_partials/misc/URstats';
import TopRegions from '../admin_partials/misc/TopRegions';
import TopProvinces from '../admin_partials/misc/TopProvinces';
import TopCities from '../admin_partials/misc/TopCities';


const AdminDashURForm =({ verifiedUsers, topRegions, topProvinces, topCities})=>{
  const Base_Url = process.env.Base_Url;

  const { admin_type } = useParams();

  const [reportData, setReportData]=useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    const checkToken = async (token) => {

            const response = await axios.get(`${Base_Url}token/protect-token-admin/admin/${admin_type}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { admin_type } = response.data;
            if (admin_type === 'registry_admin') {
                // Allow access to the audit page
                setReload(false);
            } else {
                window.location.href = '/indexadmin';
            }
    };

    if (token) {
        checkToken(token);
    } else {
        // Redirect to indexadmin if token is not present
        window.location.href = '/indexadmin';
    }
}, []);

  useEffect(() => {
    const fetchREPORTData = async () => {
      try {
        const res = await axios.get(`${Base_Url}report/${admin_type}`);
        setReportData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchREPORTData();
  }, [admin_type]);

  async function fetchData(endpoint, selectedYear) {
    try {
      const response = await axios.get(`${Base_Url}admin/${endpoint}/`, {
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

  console.log(verifiedUsers);


  const generateReportNumber = (admin_type) => {

    const correctedAdminType = admin_type === 'registry_admin' ? 'RA' : registry_admin ;

    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${month}${day}`;

    const uuid1 = uuidv4();
    const uuidInt1 = parseInt(uuid1.replace(/-/g, '').substring(0, 4), 16);
    const uuid1Code = (uuidInt1 % 10000).toString().padStart(4, '0');

    return `${correctedAdminType}-${formattedDate}-${uuid1Code}`;
};

  console.log(admin_type);

  const generateReports = async (selectedYear) => {

    const fetchPromises = [
      fetchData('transreport', selectedYear),
      fetchData('verifiedusers', selectedYear)
    ];

    try {

      const [
        setYearData,
        VerifiedData,
      ] = await Promise.all(fetchPromises);

      if (setYearData) {
        
        const reportNo = generateReportNumber(admin_type); 

        const reportNum = {
            report_no: reportNo,
            admin_type: admin_type,
            date_processed: new Date().toISOString(),
        };

        await axios.post(`${Base_Url}report/store/${admin_type}`, reportNum);

        console.log('Report stored successfully');

        const pdf = new jsPDF();

          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(12);
          pdf.text("CITY GOVERNMENT OF MANILA", 15, 15);
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);
          pdf.text("Registry Administrative Report", 15, 19);
          pdf.text("Report No.: " + reportNo, 15, 23);

          const additionalTextX = pdf.internal.pageSize.width - 50;
          const additionalTextY = 15;
          const additionalText = [
            { text: "As of Year:", bold: true },
              selectedYear
          ];

          additionalText.forEach((item, index) => {
            const text = typeof item === 'string' ? item : item.text;
            const isBold = typeof item === 'object' && item.bold;
            pdf.setFont(isBold ? "helvetica" : "helvetica", isBold ? "bold" : "normal");
            pdf.text(text, additionalTextX, additionalTextY + (index * 4));
          });

          // Function to repeat a symbol to form a line
          function repeatSymbol(symbol, count) {
            return symbol.repeat(count);
          }

          // Define the symbol and the number of repetitions
          const symbol = "\u2022"; // Unicode for a bullet point symbol
          const repetitions = 146; // Adjust the number of repetitions as needed

          const firstTableData = [
            ['Verified User', verifiedUsers.length > 0 ? verifiedUsers[0].total_verified : '0',],
            ['Unverified User',  verifiedUsers.length > 0 ? verifiedUsers[0].total_unverified : '0', ],
            ['Total Users', verifiedUsers.length > 0 ? verifiedUsers[0].total_users : '0',]]

          // Sample data for the first table
          pdf.autoTable({
          startY: 38, // Start the first table below the line of symbols
          head: [['User Demographics', 'Total Count']], // Header for the first table
          body: firstTableData,
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
        const textYPosition2 = pdf.autoTable.previous.finalY + 126; // Adjust the Y position
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.text(lineOfSymbols2, textXPosition2, textYPosition2);
          
          const noteText = [
            `I hereby certify that the provided information is accurate and has been carefully reviewed. This report depicts the`,
            `financial and operational performance of Registry Administrative Report as of ${selectedYear}. Any identified`,
            `discrepancies or errors should be reported promptly for correction.`
        ];   
        const noteXPosition = 15; // Adjust as needed
        const noteYPosition = pdf.autoTable.previous.finalY + 130; // Adjust the Y position

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
            startY: pdf.autoTable.previous.finalY + 170,
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
            
        const signatureData2 = [['Registry Admin']];
        pdf.autoTable({
            startY: pdf.autoTable.previous.finalY - 16,
            head: [['Registry Administrative']],
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

        // Add footer to each page
        const totalPages = pdf.internal.getNumberOfPages();
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        pdf.setPage(pageNum);

        // Generate footer text with pageNum
        const currentDate = new Date();
        const formattedDate1 = currentDate.toLocaleDateString('en-US', {
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
        const fullName = "Registry Administrative";
        const footerText = `Generated on ${formattedDate1}, at ${formattedTime} by ${fullName}`;

        // Add footer text to each page
        const footerTextX = 15;
        const footerTextY = pdf.internal.pageSize.height - 15;
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.text(footerText, footerTextX, footerTextY);

        // Calculate the width of the page number text
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        const pageNumberText = `Page ${pageNum} of ${totalPages}`;
        const pageNumberTextWidth = pdf.getStringUnitWidth(pageNumberText) * pdf.internal.getFontSize();

        // Calculate the position for page number
        const pageNumberTextX = pdf.internal.pageSize.width - (-19) - pageNumberTextWidth;
        const pageNumberTextY = pdf.internal.pageSize.height - 15;

        // Add page number
        pdf.text(pageNumberText, pageNumberTextX, pageNumberTextY);
        }

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

  

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (
      verifiedUsers &&
      topRegions &&
      topProvinces &&
      topCities
      ) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, []);


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
                <AdminBanner adminType={'UR'} generateReports={generateReports} />
  
                <div className="grid grid-cols-12 gap-6">
                  <URstats verifiedUsers={verifiedUsers}/>
                  <TopRegions topRegions={topRegions} />
                  <TopProvinces topProvinces={topProvinces} />
                  <TopCities topCities={topCities} />
                </div>
              </>
            )}
          </div>
          <AdminFooter />
        </main>
      </div>
    </div>
  );  
}

export default AdminDashURForm;