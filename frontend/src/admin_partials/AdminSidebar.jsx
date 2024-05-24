import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import logo from '../images/mnl.svg';
import AdminSidebarLinkGroup from './AdminSidebarLinkGroup';

function AdminSidebar({ sidebarOpen, setSidebarOpen }) {

  const { admin_type } = useParams(); 

  const location = useLocation();
  const pathname = location.pathname;

  const trigger = useRef(null);
  const sidebar = useRef(null);


  const getAdminDashLink = (admin_type) => {
    switch (admin_type) {
      case 'chief_admin':
        return `/admin_dash_chief/${admin_type}`;
      case 'rptax_admin':
        return `/admin_dash_rp/${admin_type}`;
      case 'business_admin':
        return `/admin_dash_bp/${admin_type}`;
      case 'cedula_admin':
        return `/admin_dash_ctc/${admin_type}`;
      case 'lcr_admin':
        return `/admin_dash_lcr/${admin_type}`;
      case 'registry_admin':
        return `/admin_dash_ur/${admin_type}`;
      default:
        return '/';
    }
  };

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);


  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-[#181818] p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}  
        <div className="flex justify-between mt-3 mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>

          {/* Logo */}
          <NavLink end to={getAdminDashLink(admin_type)} className="block">
              <img src={logo} width="32" height="32" viewBox="0 0 50 50"/>
          </NavLink>
          
        </div>

        {/* Links */}
        <div className="space-y-8">

          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Menu</span>
            </h3>
            <ul className="submenu mt-3 text-slate-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-600">
            
              {/* DASHBOARD STARTS HERE */}

              {/* Dashboard chief_admin */}
              {admin_type === 'chief_admin'  ? (
              <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
                <NavLink 
                end 
                to={`/admin_dash_chief/${admin_type}`}
                  className={({ isActive }) =>
                  'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-600')
                }
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 w-6 h-6">
                      <path className='fill-slate-500' fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              ) : null}

              {/* Dashboard Real Property Tax */}
              {admin_type === 'rptax_admin'  ? (
              <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
                <NavLink 
                end 
                to={`/admin_dash_rp/${admin_type}`}
                  className={({ isActive }) =>
                  'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-600')
                }
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 w-6 h-6">
                      <path className='fill-slate-500' fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              ) : null}

              {/* Dashboard Business Permit */}
              {admin_type === 'business_admin'  ? (
              <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
                <NavLink 
                end 
                to={`/admin_dash_bp/${admin_type}`}
                  className={({ isActive }) =>
                  'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-600')
                }
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 w-6 h-6">
                      <path className='fill-slate-500' fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              ) : null} 

              {/* Dashboard CTC / Cedula */}
              {admin_type === 'cedula_admin'  ? (
              <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
                <NavLink 
                end 
                to={`/admin_dash_ctc/${admin_type}`}
                  className={({ isActive }) =>
                  'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-600')
                }
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 w-6 h-6">
                      <path className='fill-slate-500' fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              ) : null} 
        
              {/* Dashboard Local Civil Registry */}
              {admin_type === 'lcr_admin'  ? (
              <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
                <NavLink 
                end 
                to={`/admin_dash_lcr/${admin_type}`}
                  className={({ isActive }) =>
                  'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-600')
                }
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 w-6 h-6">
                      <path className='fill-slate-500' fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              ) : null} 

              {/* Dashboard Registry */}
              {admin_type === 'registry_admin'  ? (
              <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
                <NavLink 
                end 
                to={`/admin_dash_ur/${admin_type}`}
                  className={({ isActive }) =>
                  'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-600')
                }
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 w-6 h-6">
                      <path className='fill-slate-500' fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              ) : null} 

              {/* END OF DASHBOARD  */}

              {/* Chief Admin */}
              {admin_type === 'chief_admin' ? (
              <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
              <NavLink 
              end 
              to={`/admin_add_admin/${admin_type}`}
                className={({ isActive }) =>
                'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-600')
              }
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 w-6 h-6">
                    <path className='fill-slate-500' fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Add Administrator
                  </span>
                </div>
              </NavLink>
            </li>
              ) : null}

              {/* Real Property Tax */}
              {admin_type === 'rptax_admin' ? (
              <AdminSidebarLinkGroup activecondition={pathname.includes('settings')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className="block text-slate-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-600 truncate transition duration-150"
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="shrink-0 w-6 h-6">
                              <path className="fill-slate-400" d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875z" />
                              <path className="fill-slate-400" d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 001.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 001.897 1.384C6.809 12.164 9.315 12.75 12 12.75z" />
                              <path className="fill-slate-500" d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 15.914 9.315 16.5 12 16.5z" />
                              <path className="fill-slate-500" d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 19.664 9.315 20.25 12 20.25z" />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Real Property Tax
                            </span>
                          </div>
                         
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end to={admin_type === 'chief_admin' ? `/admin_rptax3/${admin_type}` : `/admin_rptax3/${admin_type}`}

                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-400 hover:text-blue-500')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                               Tax Charges
                              </span>
                            </NavLink>
                          </li>

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end to={admin_type === 'chief_admin' ? `/admin_rptax1/${admin_type}` : `/admin_rptax1/${admin_type}`}

                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-400 hover:text-blue-500')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Awaiting Payments
                              </span>
                            </NavLink>
                          </li>

                          <li className="mb-1 last:mb-0">
                            <NavLink
                            end to={admin_type === 'chief_admin' ? `/admin_rptax2/${admin_type}` : `/admin_rptax2/${admin_type}`}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-400 hover:text-blue-500')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Processing Section
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </AdminSidebarLinkGroup>
              ) : null}

              {/* Business Permit */}
              {admin_type === 'business_admin' ? (
              <AdminSidebarLinkGroup activecondition={pathname.includes('settings')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className="block text-slate-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-600 truncate transition duration-150"
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 w-6 h-6">
                              <path className="fill-slate-400" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z" clipRule="evenodd" />
                              <path className="fill-slate-500" d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Business Permit
                            </span>
                          </div>
                    
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                            end to={admin_type === 'chief_admin' ? `/admin_business3/${admin_type}` : `/admin_business3/${admin_type}`}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-400 hover:text-blue-500')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Permit Charges
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                            end to={admin_type === 'chief_admin' ? `/admin_business1/${admin_type}` : `/admin_business1/${admin_type}`}

                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-400 hover:text-blue-500')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Awaiting Payments
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                            end to={admin_type === 'chief_admin' ? `/admin_business2/${admin_type}` : `/admin_business2/${admin_type}`}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-400 hover:text-blue-500')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Processing Section
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </AdminSidebarLinkGroup>
              ) : null}

              {/* CTC / Cedula */}
              {admin_type === 'cedula_admin' ? (
              <AdminSidebarLinkGroup activecondition={pathname.includes('settings')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className="block text-slate-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-600 truncate transition duration-150"
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 w-6 h-6">
                            <path fillRule="evenodd" className='fill-slate-400' d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z" clipRule="evenodd" />
                          </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              CTC / Cedula
                            </span>
                          </div>
                     
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                            end to={admin_type === 'chief_admin' ? `/admin_cedula1/${admin_type}` : `/admin_cedula1/${admin_type}`}

                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-400 hover:text-blue-500')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Transaction Requests
                              </span>
                            </NavLink>
                          </li>

                          <li className="mb-1 last:mb-0">
                            <NavLink
                            end to={admin_type === 'chief_admin' ? `/admin_cedula2/${admin_type}` : `/admin_cedula2/${admin_type}`}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-400 hover:text-blue-500')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Processing Section
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </AdminSidebarLinkGroup>
              ) : null}

              {/* Local Civil Registry */}
              {admin_type === 'lcr_admin' ? (
               <AdminSidebarLinkGroup activecondition={pathname.includes('settings')}>
               {(handleClick, open) => {
                 return (
                   <React.Fragment>
                     <a
                       href="#0"
                       className="block text-slate-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-600 truncate transition duration-150"
                       onClick={(e) => {
                         e.preventDefault();
                         sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                       }}
                     >
                       <div className="flex items-center justify-between">
                         <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 w-6 h-6">
                            <path className="fill-slate-400" d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
                          </svg>
                           <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                             Local Civil Registry
                           </span>
                         </div>
                         <div className="flex shrink-0 ml-2">
                           <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                             <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                           </svg>
                         </div>
                       </div>
                     </a>
                     <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                       <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                         <li className="mb-1 last:mb-0">
                           <NavLink
                           end to={admin_type === 'chief_admin' ? `/admin_lcr1/${admin_type}` : `/admin_lcr1/${admin_type}`}

                             className={({ isActive }) =>
                               'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-400 hover:text-blue-500')
                             }
                           >
                             <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                             Transaction Requests
                             </span>
                           </NavLink>
                         </li>

                         <li className="mb-1 last:mb-0">
                           <NavLink
                           end to={admin_type === 'chief_admin' ? `/admin_lcr2/${admin_type}` : `/admin_lcr2/${admin_type}`}
                             className={({ isActive }) =>
                               'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-400 hover:text-blue-500')
                             }
                           >
                             <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                               Processing Section
                             </span>
                           </NavLink>
                         </li>
                       </ul>
                     </div>
                   </React.Fragment>
                 );
               }}
             </AdminSidebarLinkGroup>
              ) : null}

              {/* {admin_type === 'chief_admin' || admin_type === 'lcr_admin' ? (
              <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
                <NavLink
                end to={admin_type === 'chief_admin' ? `/admin_lcr/${admin_type}` : `/admin_lcr/${admin_type}`}
                    className={({ isActive }) =>
                      'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-600')
                    }
                  >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 w-6 h-6">
                      <path className="fill-slate-400" d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Local Civil Registry
                    </span>
                  </div>
                </NavLink>
              </li>
              ) : null} */}

              {/* Registry */}
              {admin_type === 'registry_admin' ? (
              <AdminSidebarLinkGroup activecondition={pathname.includes('settings')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className="block text-slate-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-600 truncate transition duration-150"
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 w-6 h-6">
                              <path className='fill-slate-400' fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                              <path className='fill-slate-500' d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Registry
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end to={admin_type === 'chief_admin' ? `/admin_userlist/${admin_type}` : `/admin_userlist/${admin_type}`}

                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-400 hover:text-blue-500')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                User List
                              </span>
                            </NavLink>
                          </li>

                          <li className="mb-1 last:mb-0">
                            <NavLink
                             end to={admin_type === 'chief_admin' ? `/admin_verifyreqs/${admin_type}` : `/admin_verifyreqs/${admin_type}`}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-400 hover:text-blue-500')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                User Verification
                              </span>
                            </NavLink>
                          </li>
                         </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </AdminSidebarLinkGroup>
              ) : null}

            </ul>
          </div>
          
          {/* Maintenance group */}
          <div>
          {admin_type === 'chief_admin'  ? (
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Maintenance</span>
            </h3>
                         ) : null}
            {admin_type === 'chief_admin'  ? (
            <ul className="submenu mt-3 text-slate-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-600">
              {/* Audit Trails */}
              <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
                <NavLink end to={`/admin_audittrail/${admin_type}`}
                  className={({ isActive }) =>
                  'block transition duration-150 truncate ' + (isActive ? 'text-emerald-500' : 'text-slate-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-600')
                }
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 w-6 h-6">
                      <path className='fill-slate-400' d="M5.507 4.048A3 3 0 0 1 7.785 3h8.43a3 3 0 0 1 2.278 1.048l1.722 2.008A4.533 4.533 0 0 0 19.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008Z" />
                      <path className='fill-slate-500' fillRule="evenodd" d="M1.5 10.5a3 3 0 0 1 3-3h15a3 3 0 1 1 0 6h-15a3 3 0 0 1-3-3Zm15 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm2.25.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM4.5 15a3 3 0 1 0 0 6h15a3 3 0 1 0 0-6h-15Zm11.25 3.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM19.5 18a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Audit Trail
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
             ) : null}
          </div>
        </div>

      

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
