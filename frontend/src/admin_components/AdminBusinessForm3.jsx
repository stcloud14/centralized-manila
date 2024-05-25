import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom'; // Import useLocation from react-router-dom
import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';

import AdminBPView from '../admin_partials/admin_modals/AdminBPView';

import AdminBusinessCharge from '../admin_partials/admin_cards/AdminBusinessCharge';



const AdminBusinessForm3 =()=>{
  const { admin_type } = useParams();
  const Base_Url = process.env.Base_Url;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  

  const [isLoading, setIsLoading] = useState(true);
  const [isFetchedData, setIsFetchedData] = useState(false);

  const [businessPermit, setBusinessPermit] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [busOffice, setBusOffice] = useState(null);

  const [Reload, setReload] = useState(true)


  useEffect(() => {
    const token = localStorage.getItem('token');
    
    const checkToken = async (token) => {

            const response = await axios.get(`${Base_Url}token/protect-token-admin/admin/${admin_type}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { admin_type } = response.data;
            if (admin_type === 'business_admin') {
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
  
  const fetchUserTransaction = async () => {
    try {
        const res = await axios.get(`${Base_Url}adminbp/charges/`);
        console.log('Response:', res.data);

        const { businesspermit, businesspermit1 } = res.data;

        const busOfficeArray = [];
        const businessDataArray = [];

        Object.keys(businesspermit1).forEach(transactionId => {
            const busOffice = businesspermit1[transactionId].bus_office;
            const busActivity = businesspermit1[transactionId].bus_activity;

            busOfficeArray.push({ transaction_id: transactionId, bus_office: busOffice });
            businessDataArray.push({ transaction_id: transactionId, ...busActivity });
        });
        
        setBusinessData(businessDataArray);

        console.log('Bus Office:', busOfficeArray);
        console.log('Business Data:', businessDataArray);

        setBusinessPermit(businesspermit);
        setBusOffice(busOfficeArray);

        console.log('FETCHED DATA');
        setIsFetchedData(true);

    } catch (err) {
        console.log(err);
    }
};

  const fetchExpiredTransaction = async () => {
    try {
      await axios.post(`${Base_Url}email/updateexpired`);
      console.log('Sent emails')
      
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateData = () => {
    fetchUserTransaction();
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            await fetchExpiredTransaction();

            await fetchUserTransaction();
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
  }, []);

    useEffect(() => {
      if (isFetchedData) {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    }, [isFetchedData]);

  if(Reload){
    return;
  }

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* AdminSidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/*  Contents Area */}
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
          
          {!isLoading && (
          <>
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-sm rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
              <h1 className="font-medium text-center text-slate-700 dark:text-white">Business Permit</h1>
              <h1 className="mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300">Transactions</h1>

              <div className="flex items-center justify-center space-x-6 text-xs">
                <div className="flex items-center">
                  <div className="w-4 h-1 mr-2 bg-[#d62d20]"></div>
                  <p className="text-slate-700 dark:text-white">Business Permit</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mx-4 my-4">
            
            <AdminBusinessCharge
            busOffice={busOffice}
            businessData={businessData}
            businessPermit = {businessPermit}
            handleUpdateData={handleUpdateData}
            />
          </div>
          </>
          )}

          <AdminFooter />
        </main>

      </div>
    </div>
  );
}

export default AdminBusinessForm3;