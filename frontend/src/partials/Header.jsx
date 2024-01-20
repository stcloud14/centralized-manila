import React, { useState } from 'react';

import Notifications from './DropdownNotifications';
import ThemeToggle from './ThemeToggle';
import DropdownProfile from './DropdownProfile';

function Header({ sidebarOpen, setSidebarOpen, userName }) {

  return (
    <header className="sticky top-0 bg-white dark:bg-[#181818] border-b border-slate-200 dark:border-[#3d3d3d] z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Notifications align="right" />
            
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 dark:bg-[#3d3d3d] border-none" />
            <DropdownProfile align="right" userName={userName}/>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
