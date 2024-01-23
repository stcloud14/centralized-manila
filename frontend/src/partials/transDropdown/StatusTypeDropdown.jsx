import React from 'react';

    const StatusTypeDropdown = () => {
        return (
            <>
                      <option value="All" className="text-slate-700 bg-white dark:text-slate-200 dark:bg-[#3d3d3d] font-semibold">Select Status</option>
                      <option value="Pending" className="bg-yellow-200 text-yellow-800 font-semibold">Pending</option>
                      <option value="Paid" className="bg-emerald-200 text-emerald-800 font-semibold">Paid</option>
                      <option value="Processing" className="bg-purple-200 text-purple-800 font-semibold">Processing</option>
                      <option value="Complete" className="bg-blue-200 text-blue-800 font-semibold">Complete</option>
                      <option value="Rejected" className="bg-red-200 text-red-800 font-semibold">Rejected</option>
                      <option value="Canceled" className="bg-slate-200 text-slate-800 font-semibold">Canceled</option>
                      <option value="Expired" className="bg-orange-200 text-orange-800 font-semibold">Expired</option>
            </>

            );
        };

export default StatusTypeDropdown;
