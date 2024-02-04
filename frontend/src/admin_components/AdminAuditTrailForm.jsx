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
  const [originalAuditTrail, setOriginalAuditTrail] = useState([]);

  const [searchInput, setSearchInput] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDatee, setSelectedDatee] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');


  useEffect(() => {
    const fetchAuditTrail = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/audittrail/`);
        setAuditTrail(res.data);
        setOriginalAuditTrail(res.data);
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

  const handleSearch = () => {
    const filteredAuditTrails = originalAuditTrail.filter((transaction) => {
      const transactionId = transaction.id_no?.toString().toUpperCase();
  
      return (
        transactionId &&
        transactionId.includes(searchInput) &&
        (!selectedDate || !selectedDatee) &&
        (!selectedType || selectedType === 'All' || parseInt(selectedType) === 0 || transaction.admin === selectedType) &&
        (!selectedStatus || selectedStatus === 'All' || transaction.activity.toLowerCase() === selectedStatus.toLowerCase())
      );
    });
  
    setAuditTrail([...filteredAuditTrails]);
  };
   
  const handleClearFilter = () => {
    setSearchInput('');
    setAuditTrail(originalAuditTrail);
    setSelectedDate('');
    setSelectedDatee('');
    setSelectedStatus('');
    setSelectedType('');
    setSelectedStatus('');
    setSelectedType('');
  };

  // For handle sorting and filtering
  // useEffect(() => {
  // }, [auditTrail, selectedDate, selectedDatee, selectedType, selectedStatus]);


  const handleInputChange = (e) => {
    const selectedType = e.target.value;
    console.log("Dropdown Value Changed:", selectedType);
    setSelectedType(selectedType);
  };
  
  const handleInputChange2 = (e) => {
    const selectedStatus = e.target.value;
    console.log("Dropdown Value Changed:", selectedStatus);
    setSelectedStatus(selectedStatus);
  };

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
              <AuditMobile
              auditTrail={auditTrail} 
              searchInput={searchInput}   
              setSearchInput={setSearchInput}
              handleSearch={handleSearch} 
              handleClearFilter={handleClearFilter}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedDatee={selectedDatee}
              setSelectedDatee={setSelectedDatee}
              selectedStatus={selectedStatus}
              handleInputChange={handleInputChange}
              handleInputChange2={handleInputChange2}
              selectedType={selectedType}
              />
            ) : (
              // For Desktop View
              <AuditDesktop 
              auditTrail={auditTrail} 
              searchInput={searchInput}   
              setSearchInput={setSearchInput}
              handleSearch={handleSearch} 
              handleClearFilter={handleClearFilter}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedDatee={selectedDatee}
              setSelectedDatee={setSelectedDatee}
              selectedStatus={selectedStatus}
              handleInputChange={handleInputChange}
              handleInputChange2={handleInputChange2}
              selectedType={selectedType}
              />
            )}
          </div>
          <AdminFooter logo={logoSrc} />
        </main>

      </div>
    </div>
  );
}

export default  AdminAuditTrailForm;
