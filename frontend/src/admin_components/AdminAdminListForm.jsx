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
    const [searchName, setSearchName] = useState('');
    const [selectedType, setSelectedType] = useState('All');
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

  
      const handleSearch = () => {
        const filteredAdminUR = adminApplications.filter((transaction) => {
          const { mobile_no, admin_type, admin_name } = transaction || {};

          const transactionId = mobile_no?.toString()?.toUpperCase();
          const Name = admin_name?.toString()?.toUpperCase();
          const isAdminTypeMatch = admin_type && (selectedType === 'All' || admin_type.toLowerCase() === selectedType.toLowerCase());
          const isIdMatch = transactionId && (!searchInput || transactionId.includes(searchInput.toUpperCase()));
          const isNameMatch = Name && (!searchName || Name.includes(searchName.toUpperCase()));
    
          return isAdminTypeMatch && isIdMatch && isNameMatch;

        });
    
        setFilteredAdminApplications(filteredAdminUR);
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
  
    const handleClearFilter = async () => {
      setSearchInput('');
      setSearchName('');
      setSelectedType('All');
      try {
        const res = await axios.get(`${Base_Url}adminur/adminlist`);
        const { adminList } = res.data;
        setAdminApplications(adminList);
        setFilteredAdminApplications(adminList);
      } catch (err) {
        console.log(err);
      }
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
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  searchName={searchName}
                  setSearchName={setSearchName}
                  selectedType={selectedType}
                  />
                ) : (
                  // For Desktop View
                  <AdminListDesktop 
                  handleOpenModal={handleOpenModal} 
                  adminApplications={filteredAdminApplications}
                  handleSearch={handleSearch}
                  handleClearFilter={handleClearFilter}
                  handleInputChange={handleInputChange}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  searchName={searchName}
                  setSearchName={setSearchName}
                  selectedType={selectedType}
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