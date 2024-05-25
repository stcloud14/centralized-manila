import React from 'react';

    const EmploymentStatusDropdown = () => {
        return (
            <>
                     <option value="0" className='dark:bg-[#3d3d3d]'>Select Employment Status</option>
                    <option value="EMPLOYED" className='dark:bg-[#3d3d3d]'>Employed </option>
                    <option value="UNEMPLOYED" className='dark:bg-[#3d3d3d]'>Unemployed</option>
            </>

            );
        };

export default EmploymentStatusDropdown;
