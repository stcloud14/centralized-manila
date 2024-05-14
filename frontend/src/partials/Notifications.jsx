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
        <ul className="h-[21.2rem] overflow-y-auto">
            {notifications?.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 h-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mb-2">
              <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
            </svg>
            <p className="text-center text-xs">No new notifications</p>
          </div>
          ) : (
            notifications?.map((notif) => (
              <li key={notif.id} className="border-b border-slate-200 dark:border-[#3d3d3d] last:border-0">
                <div className="py-2 px-4 hover:bg-slate-50 dark:hover:bg-[#242424] flex items-center justify-between">
                  <span className="block md:text-sm text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{notif.title}</p>
                    <p dangerouslySetInnerHTML={{ __html: notif.message.replace(/className/g, 'class') }} />
                    <span className="block text-xs font-normal text-slate-400 dark:text-slate-500">
                      <span className="text-[0.7rem]">{formatDate(notif.date)}</span>
                    </span>
                  </span>

                  {notif.is_read === 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#0866ff" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0866ff" className="w-3 h-3 ml-2" style={{ flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  ) : null}
                </div>
              </li>
            ))
          )}

        </ul>
  )
}

export default Notifications;