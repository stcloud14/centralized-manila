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

import RPTAX from '../images/RPTAX.png';
import BP from '../images/BP.png';
import CTC from '../images/CTC.png';
import LCR from '../images/LCR.png';
import UR from '../images/UR.png';
import CHIEF from '../images/CHIEF.png';


const AdminAdminListForm = () => {
    
    const { admin_type, admin_uname } = useParams();
  
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



    const [adminData, setAdminData] = useState([]);

    console.log(filteredAdminApplications)
    console.log(adminData)

  const checkUserImage = async () => {
    try {
      const imagePath = '../../uploads/adminImages/';
      const modifiedApplications = [...filteredAdminApplications];

      for (const application of modifiedApplications) {
        const imageName = application.admin_image;

        if (!imageName) {

          application.userImage = getDefaultImage(application.admin_type);

        } else {

          const isFileExists = await checkFileExists(imagePath, imageName);

          if (isFileExists) {
            const fileData = await fetchFileData(`${imagePath}${imageName}`);
            if (fileData) {
              application.userImage = fileData;
            }
          } else {
            console.log(`File: ${imageName} does not exist.`);
          }
        }
      }

      setAdminData(modifiedApplications);
    } catch (error) {
      console.error('Error checking user image path:', error);
    }
  };

  useEffect(() => {
    checkUserImage();
  }, [filteredAdminApplications]);

  const checkFileExists = async (folderPath, fileName) => {
    try {
      const filePath = `${folderPath}/${fileName}`;
      const response = await fetch(filePath);

      return response.ok;
    } catch (error) {
      console.error('Error checking file existence:', error);
      return false;
    }
  };

  const fetchFileData = async (filePath) => {
    try {
      const response = await fetch(filePath);
  
      if (!response.ok) {
        if (response.status === 404) {
          console.log('File not found.');
        } else {
          throw new Error(`Failed to fetch file from ${filePath}`);
        }
        return null;
      }
  
      const fileData = await response.blob();
  
      if (!fileData || fileData.size === 0) {
        console.log('File data is empty or undefined.');
        return null;
      }
  
      const dataUrl = URL.createObjectURL(fileData);
  
      return dataUrl;
    } catch (error) {
      console.error('Error fetching file data:', error);
      return null;
    }
  };
  

  const getDefaultImage = (admin_type) => {
    switch (admin_type) {
      case 'Chief Admin':
        return CHIEF;
      case 'Real Property Tax Admin':
        return RPTAX;
      case 'Business Permit Admin':
        return BP;
      case 'Cedula / Community Tax Certificate Admin':
        return CTC;
      case 'Local Civil Registry Admin':
        return LCR;
      case 'Registry Admin':
        return UR;
      default:
        return null;
    }
  };

  
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
                  adminApplications={adminData}
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
                  adminApplications={adminData}
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