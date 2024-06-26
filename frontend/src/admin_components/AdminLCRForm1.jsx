import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom'; 
import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';

import AdminLCRBirthView from '../admin_partials/admin_modals/AdminLCRBirthView';
import AdminLCRMarriageView from '../admin_partials/admin_modals/AdminLCRMarriageView';
import AdminLCRDeathView from '../admin_partials/admin_modals/AdminLCRDeathView';

import AdminLCRRequests from '../admin_partials/admin_cards/AdminLCRRequests';

const AdminLCRForm1 =()=>{

  const { admin_type, admin_uname } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [Reload, setReload] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('Admin_token');
    
    const checkToken = async (token) => {
      try{
        const response = await axios.get(`${Base_Url}admintoken/protect-token-admin/${admin_type}/${admin_uname}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const adminType = response.data.admin_type;
        console.log("response", response)
        if (adminType === 'lcr_admin') {
            setReload(false);
        } else {
            window.location.href = '/indexadmin';
        }
      } catch {
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

  const Base_Url = process.env.Base_Url;

  const [birthCert, setBirthCert] = useState([]);
  const [deathCert, setDeathCert] = useState([]);
  const [marriageCert, setMarriageCert] = useState([]);
  console.log("userrole", admin_type)


  const fetchUserTransaction = async () => {
    try {
      const res = await axios.get(`${Base_Url}adminlcr/`);
      setBirthCert(res.data.birthcert);
      setDeathCert(res.data.deathcert);
      setMarriageCert(res.data.marriagecert);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateData = () => {
    fetchUserTransaction();
  };

  useEffect(() => {
    fetchUserTransaction();
  }, []);  

  const fetchExpiredTransaction = async () => {
    try {
      await axios.post(`${Base_Url}email/updateexpired`);
      console.log('Sent emails')
      
    } catch (err) {
      console.log(err);
    }
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

    if(Reload){
      return
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
          {/*  Banner */}
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-sm rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
              <h1 className="font-medium text-center text-slate-700 dark:text-white">Local Civil Registry</h1>
              <h1 className="mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300">Transactions</h1>

              <div className="flex items-center justify-center space-x-6 text-xs">
                <div className="flex items-center">
                  <div className="w-4 h-1 mr-2 bg-[#008744] dark:bg-[#026b37]"></div>
                  <p className="text-slate-700 dark:text-white">Birth Certificate</p>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-1 mr-2 bg-[#17bf6c]"></div>
                  <p className="text-slate-700 dark:text-white">Death Certificate</p>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-1 mr-2 bg-[#78ffbc]"></div>
                  <p className="text-slate-700 dark:text-white">Marriage Certificate</p>
                </div>
              </div>
            </div>
          </div>

          {/*  Two Sections */}
          <div className="grid grid-cols-1 gap-4 mx-4 my-4">
            
            <AdminLCRRequests
              birthCert={birthCert}
              deathCert={deathCert}
              marriageCert={marriageCert}
              handleUpdateData={handleUpdateData}
            />

          </div>

          <AdminFooter />
        </main>
        {/*<AdminLCRBirthView
        />
        <AdminLCRDeathView
        />
        <AdminLCRMarriageView
        />*/}
        
      </div>
    </div>
  );
}

export default AdminLCRForm1;