import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';
import defaultImage from '../images/default_img.png';
import chiefImg from '../images/CHIEF.png'
import rptaxImg from '../images/RPTAX.png'
import businessImg from '../images/BP.png'
import cedulaImg from '../images/CTC.png'
import lcrImg from '../images/LCR.png'
import urImg from '../images/UR.png'

const AdminDropdownProfile = ({ align, admin_type, userImage }) => {

  let imageUrl;
  let userName;

  switch (admin_type) {
    case 'chief_admin':
      imageUrl = userImage ? userImage : chiefImg;
      userName = 'CHIEF ADMIN';
      break;
    case 'rptax_admin':
        imageUrl = userImage ? userImage : rptaxImg;
        userName = 'RPTAX ADMIN';
        break;
    case 'business_admin':
        imageUrl = userImage ? userImage : businessImg;
        userName = 'BUSINESS PERMIT ADMIN';
        break;
    case 'cedula_admin':
        imageUrl = userImage ? userImage : cedulaImg;
        userName = 'CTC/CEDULA ADMIN';
        break;
    case 'lcr_admin':
        imageUrl = userImage ? userImage : lcrImg;
        userName = 'LOCAL CIVIL REGISTRY ADMIN';
        break;
    case 'registry_admin':
        imageUrl = userImage ? userImage : urImg;
        userName = 'REGISTRY ADMIN';
        break;
    default:
        imageUrl = defaultImage;
        userName = 'UNKNOWN';
        break;
}


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);


  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });



  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        
        <img
          name='userImage' 
          className="inline-block h-10 w-10 rounded-full object-cover object-center"
          src={imageUrl}
        />
        <div className="flex items-center truncate">
          {/* <span className="truncate ml-2 mr-1 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">{userName}</span> */}
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#3d3d3d] py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-[#3d3d3d]">
            <div className="font-medium text-slate-800 dark:text-slate-100">{userName}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 italic">Administrator</div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-slate-400 hover:text-blue-500 dark:hover:text-blue-600 flex items-center py-1 px-3"
                to={`/admin_settings/${admin_type}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </Link> 
            </li>
            <li>
              <Link
                className="font-medium text-sm text-slate-400 hover:text-blue-500 dark:hover:text-blue-600 flex items-center py-1 px-3"
                to="/indexadmin"
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.reload= (`/indexadmin`);
                  setDropdownOpen(false);
                  setDropdownOpen(!dropdownOpen)}}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default AdminDropdownProfile;