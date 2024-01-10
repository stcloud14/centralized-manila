import React, { useState } from 'react';

const getStatusColors = (statusType) => {
  switch (statusType) {
    case 'Pending':
      return { bgColor: 'bg-yellow-200', textColor: 'text-yellow-800', text: <p>Awaiting payment. Please pay the required amount.</p>};
    case 'Paid':
      return { bgColor: 'bg-green-200', textColor: 'text-green-800', text: <p>The transaction is presently undergoing processing.</p> };
    case 'Canceled':
      return { bgColor: 'bg-slate-200', textColor: 'text-slate-800', text: <p>The transaction is canceled.</p> };
    case 'Rejected':
      return { bgColor: 'bg-red-200', textColor: 'text-red-800', text: <p>The transaction has been rejected. Potential causes include:<br/>
                                                                          <div className='ml-1'>• Incorrect or incomplete documentation submitted.</div>
                                                                          <div className='ml-1'>• Failure to adhere to specific procedural requirements.</div>
                                                                          <div className='ml-1'>• Inconsistent or conflicting details in the submitted paperwork.</div>
                                                                          <div className='ml-1'>• Non-compliance with City Hall regulations.</div>
                                                                          <div className='ml-1'>• No records found.</div>
                                                                          </p>
                                                                         };
    case 'Expired':
      return { bgColor: 'bg-blue-200', textColor: 'text-blue-800', text: <p>The transaction has expired due to non-payment.</p> };
    default:
      return { bgColor: 'bg-gray-200', textColor: 'text-black'};
  }
};

const StatusBadgeMobile = ({ statusType }) => {
  const { bgColor, textColor, text } = getStatusColors(statusType);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const togglePopover = () => {
    setPopoverVisible(!popoverVisible);
  };

  const getPopoverStyles = () => {
    if (!popoverVisible) {
      return { display: 'none' };
    }

    // Adjust these values based on your layout and styling
    const smallScreenSize = 600; // Replace with your preferred size threshold
    const currentScreenSize = window.innerWidth;
    
    const popoverStyles = {
      position: 'absolute',
    };
    
    if (currentScreenSize < smallScreenSize) {
      popoverStyles.top = '-20px'; // Adjust as needed for small screens
      popoverStyles.left = '85px'; // Adjust as needed for small screens
    } else {
      popoverStyles.top = '-20px'; // Adjust as needed for larger screens
      popoverStyles.left = '-240px'; // Adjust as needed for larger screens
    }

    return popoverStyles;
  };

  return (
    <div className="flex relative">
      <span className={`text-[0.65rem] flex justify-center ml-1 py-0.5 rounded-full ${bgColor} ${textColor} w-24`}>
        <span className="font-semibold">{statusType}</span>
        <button onClick={togglePopover} type="button">
          <svg
            className="w-4 h-4 ms-2 ${bgColor}"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Show information</span>
        </button>

        <div
          id="popover-description"
          role="tooltip"
          style={getPopoverStyles()}
          className={`inline-block transition-opacity duration-300  bg-white dark:bg-[#212121] text-slate-700 dark:text-white border-gray-200 dark:border-gray-800 rounded-lg shadow-xl`}
        >
          <div className="p-3 text-[10px] sm:text-xs w-[200px] sm:w-[300px] space-y-2 text-left">
            {text}
            </div>
            </div>
      </span>
    </div>
  );
};
  

export default StatusBadgeMobile;