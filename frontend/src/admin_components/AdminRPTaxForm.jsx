import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';

import AdminRPView from '../admin_partials/admin_modals/AdminRPView';
import AdminRPExpired from '../admin_partials/admin_modals/AdminRPExpired';
import AdminRPProcess from '../admin_partials/admin_modals/AdminRPProcess';
import AdminRPReject from '../admin_partials/admin_modals/AdminRPReject';
import AdminRPDone from '../admin_partials/admin_modals/AdminRPDone';

import AdminRPTaxRequests from '../admin_partials/admin_cards/AdminRPTaxRequests';
import AdminRPTaxProcessing from '../admin_partials/admin_cards/AdminRPTaxProcessing';



const AdminRPTaxForm =()=>{

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logoSrc = '../src/images/mnl_footer.svg';

  // View Details Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
      setIsModalOpen(true);
    }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

   // Expired Modal
   const [isModalOpen2, setIsModalOpen2] = useState(false);
   const handleOpenModal2 = () => {
       setIsModalOpen2(true);
     }
   const handleCloseModal2 = () => {
     setIsModalOpen2(false);
   };

   // Process Modal
   const [isModalOpen3, setIsModalOpen3] = useState(false);
   const handleOpenModal3 = () => {
       setIsModalOpen3(true);
     }
   const handleCloseModal3 = () => {
     setIsModalOpen3(false);
   };

   // Reject Modal
   const [isModalOpen4, setIsModalOpen4] = useState(false);
   const handleOpenModal4 = () => {
       setIsModalOpen4(true);
     }
   const handleCloseModal4 = () => {
     setIsModalOpen4(false);
   };

   // Done Modal
   const [isModalOpen5, setIsModalOpen5] = useState(false);
   const handleOpenModal5 = () => {
       setIsModalOpen5(true);
     }
   const handleCloseModal5 = () => {
     setIsModalOpen5(false);
   }




  const handleProcessModal = (event) => {
    event.stopPropagation();
    console.log('Processing')
  };

  

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
              <h1 className="font-medium text-center text-slate-700 dark:text-white">Real Property Tax</h1>
              <h1 className="mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300">Transactions</h1>

              <div className="flex items-center justify-center space-x-6 text-xs">
                <div className="flex items-center">
                  <div className="w-4 h-1 mr-2 bg-blue-500"></div>
                  <p className="text-slate-700 dark:text-white">Tax Clearance</p>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-1 mr-2 bg-[#0057e7]"></div>
                  <p className="text-slate-700 dark:text-white">Tax Payment</p>
                </div>
              </div>
            </div>
          </div>

          {/*  Two Sections */}
          <div className="grid grid-cols-12 gap-4 mx-4 my-4">
            
            <AdminRPTaxRequests
            handleOpenModal={handleOpenModal}
            handleOpenModal2={handleOpenModal2}
            handleOpenModal3={handleOpenModal3}
            />
            <AdminRPTaxProcessing
            handleOpenModal={handleOpenModal}
            handleOpenModal4={handleOpenModal4}
            handleOpenModal5={handleOpenModal5}
            />

          </div>

          <AdminFooter logo={logoSrc} />
        </main>

        <AdminRPView
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
        />
        <AdminRPExpired
          isOpen2={isModalOpen2}
          handleClose2={handleCloseModal2}
        />
        <AdminRPProcess
          isOpen3={isModalOpen3}
          handleClose3={handleCloseModal3}
        />
        <AdminRPReject
          isOpen4={isModalOpen4}
          handleClose4={handleCloseModal4}
        />
        <AdminRPDone
          isOpen5={isModalOpen5}
          handleClose5={handleCloseModal5}
        />
      </div>
    </div>
  );
}

export default AdminRPTaxForm;