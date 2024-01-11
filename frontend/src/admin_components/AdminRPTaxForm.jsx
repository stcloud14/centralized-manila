import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';
import AdminRPTaxClearanceModal from '../admin_partials/admin_modals/AdminRPTaxClearanceModal';
import AdminRPTaxPaymentModal from '../admin_partials/admin_modals/AdminRPTaxPaymentModal';
import AdminRPTaxRejectModal from '../admin_partials/admin_modals/AdminRPTaxRejectModal';
import AdminRPTaxRequests from '../admin_partials/admin_cards/AdminRPTaxRequests';
import AdminRPTaxProcessing from '../admin_partials/admin_cards/AdminRPTaxProcessing';

const AdminRPTaxForm =()=>{

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logoSrc = '../src/images/mnl_footer.svg';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
      setIsModalOpen(true);
    }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleProcessSubmit = () => {
    setIsModalOpen(false);
  };

  const handleProcessModal = (event) => {
    event.stopPropagation();
    console.log('Processing')
  };

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const handleOpenModal2 = () => {
      setIsModalOpen2(true);
    }
  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
  };
  const handleProcessSubmit2 = () => {
    setIsModalOpen2(false);
  };

  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const handleOpenModal3 = () => {
      setIsModalOpen3(true);
    }
  const handleCloseModal3 = () => {
    setIsModalOpen3(false);
  };
  const handleReject = () => {
    setIsModalOpen3(false);
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
            
            <AdminRPTaxRequests />
            <AdminRPTaxProcessing />

            

          </div>

          <AdminFooter logo={logoSrc} />
        </main>

        <AdminRPTaxClearanceModal
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          handleProcess={handleProcessSubmit}
        />
        <AdminRPTaxPaymentModal
          isOpen2={isModalOpen2}
          handleClose2={handleCloseModal2}
          handleProcess2={handleProcessSubmit2}
        />
        <AdminRPTaxRejectModal
          isOpen3={isModalOpen3}
          handleClose3={handleCloseModal3}
          handleReject={handleReject}
        />

      </div>
    </div>
  );
}

export default AdminRPTaxForm;