import React from 'react';

const getStatusColors = (statusType) => {
  switch (statusType) {
    case 'Pending':
      return { bgColor: 'bg-yellow-200', textColor: 'text-yellow-800'};
    case 'Paid':
      return { bgColor: 'bg-emerald-200', textColor: 'text-emerald-800'};
    case 'Canceled':
      return { bgColor: 'bg-slate-200', textColor: 'text-slate-800'};
    case 'Rejected':
      return { bgColor: 'bg-red-200', textColor: 'text-red-800'};
    case 'Expired':
      return { bgColor: 'bg-orange-200', textColor: 'text-orange-800'};
    case 'Processing':
      return { bgColor: 'bg-purple-200', textColor: 'text-purple-800' };
    case 'Complete':
      return { bgColor: 'bg-blue-200', textColor: 'text-blue-800' };
    default:
      return { bgColor: 'bg-gray-200', textColor: 'text-black'};
  }
};

const StatusBadgeMobile = ({ statusType }) => {
  const { bgColor, textColor} = getStatusColors(statusType);


  return (
    <div className="flex relative">
      <span className={`text-[0.65rem] flex justify-center ml-1 py-0.5 rounded-full ${bgColor} ${textColor} w-24`}>
        <span className="font-semibold">{statusType}</span>
      </span>
    </div>
  );
};

export default StatusBadgeMobile;