import React, { useState } from 'react';
import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';
import AdminBanner from '../admin_partials/AdminBanner';

import Card01 from '../admin_partials/misc/Card01';
import Card02 from '../admin_partials/misc/Card02';
import Card03 from '../admin_partials/misc/Card03';
import Card04 from '../admin_partials/misc/Card04';
import Card05 from '../admin_partials/misc/Card05';

import Card07 from '../admin_partials/misc/Card07';

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

              <Card01 />
              <Card02 />
              <Card03 />
              <Card04 />
              <Card05 />
              
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