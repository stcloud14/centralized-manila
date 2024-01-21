import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Transition from '../utils/Transition';
import { useParams } from 'react-router-dom';

function Notifications({ dropdownOpen, setDropdownOpen }) {

    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    const { user_id } = useParams();

    useEffect(() => {
        const fetchUserTransaction = async () => {
          try {
            const res = await axios.get(`http://localhost:8800/notifications/${user_id}`);
            setNotifications(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchUserTransaction();
    }, []);

    console.log(notifications)


  return (
        <ul>
            {notifications.map((notif) => (
            <li className="border-b border-slate-200 dark:border-[#3d3d3d] last:border-0">
              <div
                className="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-[#242424]"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2">
                    <span className="font-medium text-slate-800 dark:text-slate-100">{notif.title}</span>
                    <span>{notif.message}</span>
                    <span className="block text-xs font-normal text-slate-400 dark:text-slate-500">
                        <span>{notif.date}</span>
                        <span >&nbsp; {notif.time}</span>
                    </span>
                </span>
              </div>
            </li>
            ))}
        </ul>
  )
}

export default Notifications;