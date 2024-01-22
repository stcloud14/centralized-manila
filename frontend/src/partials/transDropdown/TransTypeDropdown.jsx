import React from 'react';

    const TransTypeDropdown = () => {
        return (
            <>
                      <option value="0" className="dark:bg-[#3d3d3d]">Select Type</option>
                      <option value="1" className="dark:bg-[#3d3d3d]">Real Property Tax Payment</option>
                      <option value="2" className="dark:bg-[#3d3d3d]">Real Property Tax Clearance</option>
                      <option value="3" className="dark:bg-[#3d3d3d]">Business Permit</option>
                      <option value="4" className="dark:bg-[#3d3d3d]">Community Tax Certificate</option>
                      <option value="5" className="dark:bg-[#3d3d3d]">Birth Certificate</option>
                      <option value="6" className="dark:bg-[#3d3d3d]">Death Certificate</option>
                      <option value="7" className="dark:bg-[#3d3d3d]">Marriage Certificate</option>
            </>

            );
        };

export default TransTypeDropdown;
