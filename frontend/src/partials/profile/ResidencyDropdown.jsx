import React from 'react';

    const ResidencyDropdown = () => {
        return (
            <>
                <option value="0" className='dark:bg-[#3d3d3d]'>Select Residency Status</option>
                <option value="1" className='dark:bg-[#3d3d3d]'>Resident</option>
                <option value="2" className='dark:bg-[#3d3d3d]'>Non-Resident</option>
            </>

            );
        };

export default ResidencyDropdown;
