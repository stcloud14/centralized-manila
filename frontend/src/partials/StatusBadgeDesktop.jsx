import React from 'react';

const getStatusColors = (statusType) => {
    switch (statusType) {
      case 'Pending':
        return { bgColor: 'bg-yellow-200', textColor: 'text-yellow-800' };
      case 'Paid':
        return { bgColor: 'bg-green-200', textColor: 'text-green-800' };
      case 'Canceled':
        return { bgColor: 'bg-slate-200', textColor: 'text-slate-800' };
      case 'Rejected':
        return { bgColor: 'bg-red-200', textColor: 'text-red-800' };
      case 'Expired':
        return { bgColor: 'bg-blue-200', textColor: 'text-blue-800' };
      default:
        return { bgColor: 'bg-grey-200', textColor: 'text-black-800' };
    }
};

const StatusBadgeDesktop = ({ statusType }) => {
    
    const { bgColor, textColor } = getStatusColors(statusType);
  
    return (
        <span className={`px-10 py-1 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
        {statusType}
      </span>
    );
};
  

export default StatusBadgeDesktop;