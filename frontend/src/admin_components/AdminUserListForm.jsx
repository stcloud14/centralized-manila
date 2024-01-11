import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';
import UserListDesktop from '../admin_partials/admin_userregistry/userlistDesktop';
import UserListMobile from '../admin_partials/admin_userregistry/userlistMobile';
import AdminUserViewModal from '../admin_partials/admin_modals/AdminUserViewModal';
import AdminUserEditModal from '../admin_partials/admin_modals/AdminUserEditModal';
import AdminUserDeleteModal from '../admin_partials/admin_modals/AdminUserDeleteModal';


const AdminUserListForm = () => {

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
      setIsModalOpen(true);
    }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const handleOpenModal2 = () => {
      setIsModalOpen2(true);
    }
  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
  };

  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const handleOpenModal3 = () => {
      setIsModalOpen3(true);
    }
  const handleCloseModal3 = () => {
    setIsModalOpen3(false);
  };

const logoSrc = '../src/images/mnl_footer.svg';

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
              <UserListMobile handleOpenModal={handleOpenModal} handleOpenModal2={handleOpenModal2} handleOpenModal3={handleOpenModal3}/>
            ) : (
              // For Desktop View
              <UserListDesktop handleOpenModal={handleOpenModal} handleOpenModal2={handleOpenModal2} handleOpenModal3={handleOpenModal3}/>
            )}
          </div>
          <AdminFooter logo={logoSrc} />
        </main>
        <AdminUserViewModal
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
        />
        <AdminUserEditModal
          isOpen2={isModalOpen2}
          handleClose2={handleCloseModal2}
        />
        <AdminUserDeleteModal
          isOpen3={isModalOpen3}
          handleClose3={handleCloseModal3}
        />
      </div>
    </div>
  );
}

export default AdminUserListForm;
