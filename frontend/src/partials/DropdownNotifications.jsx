import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Transition from '../utils/Transition';
import Notifications from './Notifications';
import { useParams } from 'react-router-dom';

function DropdownNotifications({ align }) {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  console.log(notifications)

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const { user_id } = useParams();

  const [isDropdownOpen1, setDropdownOpen1] = useState(false);

  const toggleDropdown1 = () => {
    setDropdownOpen1(!isDropdownOpen1);
  };

  useEffect(() => {
    const fetchUserNotification = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/notifications/${user_id}`);
        setNotificationCount(res.data.notif_count);
        setNotifications(res.data.user_notif);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserNotification();
}, []);


const handleRead = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`http://localhost:8800/notifications/markread/${user_id}`);
    setDropdownOpen1(false);

    if (response.status === 200) {
      try {
        const res = await axios.get(`http://localhost:8800/notifications/${user_id}`);
        setNotificationCount(res.data.notif_count);
        setNotifications(res.data.user_notif);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.error('ERROR:', response.statusText);
    }
  } catch (err) {
    console.error('Transaction error:', err);
  }
};


  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current || !trigger.current) return;

      // Check if the click is outside the dropdown and trigger button
      if (!dropdown.current.contains(target) && !trigger.current.contains(target)) {
        setDropdownOpen(false);
        setDropdownOpen1(false);
      }
    };

    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]); 

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (keyCode === 27) {
        setDropdownOpen(false);
        setDropdownOpen1(false);
      }
    };

    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);


  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-[#2b2a2a] dark:hover:bg-[#3d3d3d] rounded-full ${dropdownOpen && 'bg-slate-200'}`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Notifications</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-500 dark:text-zinc-400">
            <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
        </svg>
        {notificationCount > 0 ? 
        <div className="absolute -top-[0.30rem] -right-[0.30rem] w-[1.17rem] h-[1.17rem] bg-rose-500 border-2 border-white dark:border-[#181818] rounded-full flex items-center justify-center text-[0.55rem] text-white font-semibold">
          <span>{notificationCount}</span>
        </div>
        : null}
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full md:-mr-0 -mr-[6rem] md:min-w-[19rem] min-w-[16rem] bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#3d3d3d] pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
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
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500  pt-1.5 pb-2 px-4">NOTIFICATIONS
            <div className="flex items-center">
              <button type="button" onClick={toggleDropdown1} className="w-6 h-6 rounded-full hover:text-slate-500 dark:hover:text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </button>

              {isDropdownOpen1 && (
                <div className="absolute right-6 top-9 w-[200px] origin-top-right flex group items-center py-2 px-3 bg-white text-slate-500 hover:bg-slate-100 dark:hover:bg-[#3d3d3d] dark:bg-[#212121] dark:text-slate-400 border border-slate-200 dark:border-[#3d3d3d] rounded-sm shadow-md z-20 cursor-pointer">
                  <button onClick={handleRead}>
                    <span className="flex items-center group">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                      </svg>
                      <span className='font-medium'>Mark all as read</span>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          
          <Notifications notifications={notifications} />

        </div>
      </Transition>
    </div>
  )
}

export default DropdownNotifications;