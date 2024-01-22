import React from 'react';

    const StatusTypeDropdown = () => {
        return (
            <>
                      <option value="" className="text-slate-700 bg-white dark:text-slate-200 dark:bg-[#3d3d3d]">Select Status</option>
                      <option value="Pending" className="bg-yellow-200 text-yellow-800">Pending</option>
                      <option value="Paid" className="bg-green-200 text-green-800">Paid</option>
                      <option value="Processing" className="bg-blue-200 text-blue-800">Processing</option>
                      <option value="Complete" className="bg-pink-200 text-pink-800">Complete</option>
                      <option value="Rejected" className="text-red-800 bg-red-200">Rejected</option>
                      <option value="Canceled" className="bg-slate-200 text-slate-800">Canceled</option>
                      <option value="Expired" className="bg-orange-200 text-orange-800">Expired</option>
            </>

            );
        };

export default StatusTypeDropdown;
