import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';
import ModalTransaction from '../partials/transactionModal/ModalTransaction';
import AuditMobile from '../admin_partials/audit_trail/auditMobile';
import AuditDesktop from '../admin_partials/audit_trail/auditDesktop';


const  AdminAuditTrailForm = () => {
  

  const location = useLocation();
  const { pathname } = location;
  const user_id = pathname.split("/")[2];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [auditTrail, setAuditTrail] = useState();


  useEffect(() => {
    const fetchAuditTrail = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/audittrail/`);
        setAuditTrail(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAuditTrail();
  }, [user_id]);

  

  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const logoSrc = '../src/images/mnl_footer.svg';



  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* AdminSidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="overflow-y-auto">
          <div className="flex flex-col justify-between mx-4 mt-4">
                 
            {isMobileView ? (           
              // For Mobile View
              <AuditMobile  />
            ) : (
              // For Desktop View
              <AuditDesktop auditTrail={auditTrail} />
            )}
          </div>
          <AdminFooter logo={logoSrc} />
        </main>

      </div>
    </div>
  );
}

export default  AdminAuditTrailForm;
