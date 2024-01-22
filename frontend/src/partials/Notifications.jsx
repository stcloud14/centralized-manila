import React, { useState, useRef, useEffect } from 'react';

function Notifications({ notifications }) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const timeDifference = today - date;
        const diffInSeconds = Math.floor(timeDifference / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
    
        if (diffInDays === 0) {
          // Today
          if (diffInHours > 0) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
          } else if (diffInMinutes > 0) {
            return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
          } else {
            return 'Just now';
          }
        } else if (diffInDays === 1) {
          // Yesterday
          return 'Yesterday at ' + formatTime(date);
        } else if (diffInDays <= 7) {
          // Within the last week
          const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
          return `${dayOfWeek} at ${formatTime(date)}`;
        } else {
          // More than a week ago
          const dayOfMonth = date.getDate();
          const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
          return `${dayOfMonth} ${month} at ${formatTime(date)}`;
        }
      };
    
      const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
      };


  return (
        <ul>
            {notifications.map((notif) => (
            <li key={notif.id} className="border-b border-slate-200 dark:border-[#3d3d3d] last:border-0">
              <div
                className="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-[#242424]"
              >
                <span className="block text-sm mb-2">
                    <span className="font-medium text-slate-800 dark:text-slate-100">{notif.title}</span>
                    <span>{notif.message}</span>
                    <span className="block text-xs font-normal text-slate-400 dark:text-slate-500">
                        <span>{formatDate(notif.date)}</span>
                        {/* <span >&nbsp; {notif.time}</span> */}
                    </span>
                </span>
              </div>
            </li>
            ))}
        </ul>
  )
}

export default Notifications;