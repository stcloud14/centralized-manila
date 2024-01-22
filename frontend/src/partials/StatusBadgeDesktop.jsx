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
      return { bgColor: 'bg-orange-200', textColor: 'text-orange-800' };
    case 'Processing':
      return { bgColor: 'bg-blue-200', textColor: 'text-blue-800' };
     case 'Complete':
      return { bgColor: 'bg-pink-200', textColor: 'text-pink-800'};
    default:
      return { bgColor: 'bg-gray-200', textColor: 'text-black' };
  }
};

const StatusBadgeDesktop = ({ statusType }) => {
    
  const { bgColor, textColor } = getStatusColors(statusType);

  return (
    <div className="flex text-center">
      <span className={`text-xs py-0.5 font-semibold rounded-full ${bgColor} ${textColor} w-24`}>
        {statusType}
      </span>
    </div>
  );
};
  

export default StatusBadgeDesktop;