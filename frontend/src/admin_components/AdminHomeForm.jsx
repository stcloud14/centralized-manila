import React, { useState } from 'react';
import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';
import AdminBanner from '../admin_partials/AdminBanner';

import ServicePerf from '../admin_partials/misc/ServicePerf';
import Card06 from '../admin_partials/misc/Card06';
import Card07 from '../admin_partials/misc/Card07';

import RPstats from '../admin_partials/misc/RPstats';
import RCstats from '../admin_partials/misc/RCstats';
import CTCstats from '../admin_partials/misc/CTCstats';
import BPstats from '../admin_partials/misc/BPstats';
import BCstats from '../admin_partials/misc/BCstats';
import DCstats from '../admin_partials/misc/DCstats';
import MCstats from '../admin_partials/misc/MCstats';

const AdminHomeForm =()=>{

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logoSrc = '../src/images/mnl_footer.svg';

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
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <AdminBanner />

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              
              <ServicePerf />
              <RPstats/>
              <RCstats />
              <BPstats />
              <CTCstats />
              <BCstats />
              <DCstats />
              <MCstats />

              <Card06 />
              <Card07 />

            </div>

          </div>
          <AdminFooter logo={logoSrc} />
        </main>
      </div>
    </div>
  );
}

export default AdminHomeForm;