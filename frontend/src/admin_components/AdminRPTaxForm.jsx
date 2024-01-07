import React, { useState } from 'react';
import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';
import AdminRPTaxClearanceModal from '../admin_partials/admin_modals/AdminRPTaxClearanceModal';
import AdminRPTaxPaymentModal from '../admin_partials/admin_modals/AdminRPTaxPaymentModal';
import AdminRPTaxRejectModal from '../admin_partials/admin_modals/AdminRPTaxRejectModal';

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
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
              <h1 className='font-medium text-center text-slate-700 dark:text-white'>Real Property Tax</h1>
              <h1 className='mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300'>Tax Payment and Tax Clearance Requests</h1> 
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-6 gap-2">
                {/* Tax Clearance Sample */}
                <div className="bg-white dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm mb-4 flex flex-col">
                  <div className="text-xs font-semibold text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-sm px-4 py-1.5">
                    Transaction ID:
                  </div>

                  <div className="flex-grow px-4 pt-5 pb-4">
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type: Tax Clearance</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">TDN: </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">PIN:   </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date Processed:   </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Time Processed:   </div>
                    <div className="flex justify-start items-center text-xs text-slate-600 dark:text-slate-300 my-1">
                      <span>Status:</span>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Amount Paid: P</div>
                  </div>

                  <div className="px-4 pb-5 space-x-4 flex justify-between items-center group">
                    <div onClick={handleOpenModal3} className="flex justify-center items-center text-center cursor-pointer p-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-sm mt-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                      <span className="text-xs font-normal">&nbsp;Reject</span>
                    </div>
                    <div onClick={handleOpenModal} className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span className="text-xs font-normal">&nbsp;Process</span>
                    </div>
                  </div>
                </div>

                {/* Tax Payment Sample */}
                <div className="bg-white dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm mb-4 flex flex-col">
                  <div className="text-xs font-semibold text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-sm px-4 py-1.5">
                    Transaction ID:
                  </div>

                  <div className="flex-grow px-4 pt-5 pb-4">
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type: Tax Payment</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Account Name:   </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">TDN: </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">PIN:   </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">From:   </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">To:   </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date Processed:   </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Time Processed:   </div>
                    <div className="flex justify-start items-center text-xs text-slate-600 dark:text-slate-300 my-1">
                      <span>Status:</span>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Amount Paid: P</div>
                  </div>

                  <div className="px-4 pb-5 space-x-4 flex justify-between items-center group">
                    <div className="flex justify-center items-center text-center cursor-pointer p-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-sm mt-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                      <span className="text-xs font-normal">&nbsp;Reject</span>
                    </div>
                    <div onClick={handleOpenModal2} className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span className="text-xs font-normal">&nbsp;Process</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
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