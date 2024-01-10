import React, { useState, useEffect, useRef } from 'react';

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

const StatusBadgeModal = ({ statusType }) => {
  const { bgColor, textColor, text } = getStatusColors(statusType);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef(null);
  const isMobileView = window.innerWidth < 600; // Adjust the threshold for mobile view

  const togglePopover = () => {
    if (isMobileView) {
      setPopoverVisible(!popoverVisible);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobileView) {
      setPopoverVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobileView) {
      setPopoverVisible(false);
    }
  };

  const handleInteraction = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setPopoverVisible(false);
    }
  };

  useEffect(() => {
    const eventTypes = isMobileView ? ['click', 'touchstart'] : ['mouseenter'];

    eventTypes.forEach((eventType) => {
      document.addEventListener(eventType, handleInteraction);
    });

    return () => {
      eventTypes.forEach((eventType) => {
        document.removeEventListener(eventType, handleInteraction);
      });
    };
  }, [isMobileView]);

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
      popoverStyles.left = '-230px'; // Adjust as needed for larger screens
    }

    return popoverStyles;
  };

  return (
    <div className="flex relative" ref={popoverRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span className={`text-[0.65rem] flex justify-center ml-1 py-0.5 rounded-full ${bgColor} ${textColor} w-24`}>
        <span className="font-semibold">{statusType}</span>
        <button
          onClick={togglePopover}
          type="button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
          </svg>
        </button>

        <div
          id="popover-description"
          role="tooltip"
          style={getPopoverStyles()}
          className={`inline-block transition-opacity duration-300 bg-gray-50 dark:bg-[#333333] text-slate-700 dark:text-white border-gray-200 dark:border-gray-800 rounded-lg shadow-xl`}
        >
          <div className="p-3 text-[10px] sm:text-xs w-[150px] sm:w-[300px] text-left">
            {text}
          </div>
        </div>
      </span>
    </div>
  );
};

export default StatusBadgeModal;