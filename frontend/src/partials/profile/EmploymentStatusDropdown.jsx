import React from 'react';

    const EmploymentStatusDropdown = () => {
        return (
            <>
                     <option value="0" className='dark:bg-[#3d3d3d]'>Select Employment Status</option>
                    <option value="EMPLOYEE_FULLTIME" className='dark:bg-[#3d3d3d]'>Employed - Full Time</option>
                    <option value="EMPLOYEE_PARTTIME" className='dark:bg-[#3d3d3d]'>Employed - Part Time</option>
                    <option value="UNEMPLOYED" className='dark:bg-[#3d3d3d]'>Unemployed</option>
                    <option value="WORKER" className='dark:bg-[#3d3d3d]'>Worker</option>
            </>

            );
        };

export default EmploymentStatusDropdown;
