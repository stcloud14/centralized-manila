import React from 'react';

const TransTypeDropdown = () => {
  return (
    <>
      <option value="All" className="dark:bg-[#3d3d3d]">Select Type</option>
      <option value="Real Property Tax Payment" className="dark:bg-[#3d3d3d]">Real Property Tax Payment</option>
      <option value="Real Property Tax Clearance" className="dark:bg-[#3d3d3d]">Real Property Tax Clearance</option>
      <option value="Business Permit" className="dark:bg-[#3d3d3d]">Business Permit</option>
      <option value="Community Tax Certificate" className="dark:bg-[#3d3d3d]">Community Tax Certificate</option>
      <option value="Birth Certificate" className="dark:bg-[#3d3d3d]">Birth Certificate</option>
      <option value="Death Certificate" className="dark:bg-[#3d3d3d]">Death Certificate</option>
      <option value="Marriage Certificate" className="dark:bg-[#3d3d3d]">Marriage Certificate</option>
    </>
  );
};

export default TransTypeDropdown;
