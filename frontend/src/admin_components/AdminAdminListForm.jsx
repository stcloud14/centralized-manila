import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';
// import UserListDesktop from '../admin_partials/admin_userregistry/UserListDesktop';
import AdminListDesktop from '../admin_partials/admin_userregistry/AdminListDesktop';
// import UserListMobile from '../admin_partials/admin_userregistry/UserListMobile';
import AdminListMobile from '../admin_partials/admin_userregistry/AdminListMobile';
// import AdminUserViewModal from '../admin_partials/admin_modals/AdminUserViewModal';
import AdminAdminViewModal from '../admin_partials/admin_modals/AdminAdminViewModals';


const AdminAdminListForm = () => {
    const { user_id } = useParams();
    const { admin_type, admin_uname } = useParams();
    // const location = useLocation();
   //  const { pathname } = location;
   //  const user_id = pathname.split("/")[2];
  
    const [adminApplications, setAdminApplications] = useState();
    const [filteredAdminApplications, setFilteredAdminApplications] = useState([]);
  
    const [Reload, setReload] = useState(true)
  
    useEffect(() => {
      const token = localStorage.getItem('Admin_token');
      
      const checkToken = async (token) => {
  
              const response = await axios.get(`${Base_Url}admintoken/protect-token-admin/${admin_type}/${admin_uname}`, {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });
              const adminType = response.data.admin_type;
              if (adminType === 'chief_admin') {
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
  
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const [selectedTransaction, setSelectedTransaction] = useState(null);
  
    const [searchInput, setSearchInput] = useState('');
    const [searchFname, setSearchFname] = useState('');
    const [searchLname, setSearchLname] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const Base_Url = process.env.Base_Url;
  
    useEffect(() => {
        const fetchUserApplications = async () => {
          try {
            const res = await axios.get(`${Base_Url}adminur/adminlist`);
            const { adminList } = res.data;
            setAdminApplications(adminList);
            setFilteredAdminApplications(adminList);
            console.log("adminList", adminList);
          } catch (err) {
            console.log(err);
          }
        };
        fetchUserApplications();
      }, []);

    // const handleSearch = () => {
    //   const filteredURRegistry = userApplications.filter((transaction) => {
    //     const { mobile_no, f_name, l_name, user_email, sex_type, verification_status } = transaction || {};
        
    //     const transactionId = mobile_no?.toString()?.toUpperCase();
    //     const isFNameMatch = !searchFname || f_name?.toString()?.toUpperCase().includes(searchFname);
    //     const isLNameMatch = !searchLname || l_name?.toString()?.toUpperCase().includes(searchLname);
    //     const isEmailMatch = !searchEmail || user_email?.toString()?.includes(searchEmail);
    //     const isIdMatch = transactionId && transactionId.includes(searchInput);
    //     const isTypeMatch = !selectedType || selectedType === 'All' || parseInt(selectedType) === 0 || sex_type === selectedType;
    //     const isStatusMatch = !selectedStatus || selectedStatus === 'All' || verification_status === selectedStatus;
    
    //     return isFNameMatch && isLNameMatch && isEmailMatch && isIdMatch && isTypeMatch && isStatusMatch;
    //   });
    
    //   setFilteredUserApplications(filteredURRegistry);
    // };
  
    // const handleSearch = () => {
    //   const filteredURRegistry = userApplications.filter((transaction) => {
    //     const { mobile_no, f_name, l_name, user_email, sex_type, verification_status } = transaction || {};
        
    //     const transactionId = mobile_no?.toString()?.toUpperCase();
    //     const isFNameMatch = !searchFname || f_name?.toString()?.toUpperCase().includes(searchFname);
    //     const isLNameMatch = !searchLname || l_name?.toString()?.toUpperCase().includes(searchLname);
    //     const isEmailMatch = !searchEmail || user_email?.toString()?.includes(searchEmail);
    //     const isIdMatch = transactionId && transactionId.includes(searchInput);
    //     const isTypeMatch = !selectedType || selectedType === 'All' || parseInt(selectedType) === 0 || sex_type === selectedType;
    //     const isStatusMatch = !selectedStatus || selectedStatus === 'All' || verification_status === selectedStatus;
    
    //     return isFNameMatch && isLNameMatch && isEmailMatch && isIdMatch && isTypeMatch && isStatusMatch;
    //   });
    
    //   setFilteredUserApplications(filteredURRegistry);
    // };
  
    const handleSearch = () => {
        const filteredURRegistry = adminApplications.filter((transaction) => {
          const { mobile_no, admin_type } = transaction || {};
      
          const transactionId = mobile_no?.toString()?.toUpperCase();
          const isIdMatch = transactionId && (!searchInput || transactionId.includes(searchInput.toUpperCase()));
          const isTypeMatch = !selectedType || selectedType === 'All' || admin_type === selectedType;
      
          return isIdMatch && isTypeMatch;
        });
      
        setFilteredAdminApplications(filteredURRegistry);
      };
      
    const handleOpenModal = (transaction) => {
      setIsModalOpen(true);
      setSelectedTransaction(transaction);
    }
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedTransaction(null);
    };
  
    const handleInputChange = (e) => {
      const selectedType = e.target.value;
      setSelectedType(selectedType);
    };
    
    const handleInputChange2 = (e) => {
      const selectedStatus = e.target.value;
      setSelectedStatus(selectedStatus);
    };
  
    const handleClearFilter = () => {
      setSearchInput('');
      setSearchFname('');
      setSearchLname('');
      setSearchEmail('');
      setFilteredAdminApplications(adminApplications);
      setSelectedStatus('');
      setSelectedType('');
    };
  
  
    const handleRemoveTransaction = (transaction) => {
  
      const updatedUserApplications = adminApplications.filter(
        (transaction) => transaction.transaction_id !== transaction
      );
    
      setUserApplications(updatedUserApplications);
    };
  
  
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
  
    if(Reload){
      return
    }




    return (
        <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
          {/* Sidebar */}
          <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    
          {/* Content area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* Site header */}
            <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    
            <main className="overflow-y-auto">
              <div className="flex flex-col justify-between mx-4 mt-4">
                
                {isMobileView ? (           
                  // For Mobile View
                  <AdminListMobile 
                  handleOpenModal={handleOpenModal} 
                  adminApplications={filteredAdminApplications}
                  handleSearch={handleSearch}
                  handleClearFilter={handleClearFilter}
                  handleInputChange={handleInputChange}
                  handleInputChange2={handleInputChange2}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  searchFname={searchFname}
                  setSearchFname={setSearchFname}
                  searchLname={searchLname}
                  setSearchLname={setSearchLname}
                  searchEmail={searchEmail}
                  setSearchEmail={setSearchEmail}
                  selectedType={selectedType}
                  selectedStatus={selectedStatus}
                  />
                ) : (
                  // For Desktop View
                  <AdminListDesktop 
                  handleOpenModal={handleOpenModal} 
                  adminApplications={filteredAdminApplications}
                  handleSearch={handleSearch}
                  handleClearFilter={handleClearFilter}
                  handleInputChange={handleInputChange}
                  handleInputChange2={handleInputChange2}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  searchFname={searchFname}
                  setSearchFname={setSearchFname}
                  searchLname={searchLname}
                  setSearchLname={setSearchLname}
                  searchEmail={searchEmail}
                  setSearchEmail={setSearchEmail}
                  selectedType={selectedType}
                  selectedStatus={selectedStatus}
                  />
                )}
              </div>
              <AdminFooter />
            </main>
            <AdminAdminViewModal
              isOpen={isModalOpen}
              handleClose={handleCloseModal}
              selectedTransaction={selectedTransaction}
            />
          </div>
        </div>
      );
    }
    
export default AdminAdminListForm;