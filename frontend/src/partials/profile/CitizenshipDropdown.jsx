import React from 'react';

    const CitizenshipDropdown = () => {
        return (
            <>
                 <option value="0" className='dark:bg-[#3d3d3d]'>Select Citizenship</option>
                 <option value="1" className='dark:bg-[#3d3d3d]'>Citizen</option>
                 <option value="2" className='dark:bg-[#3d3d3d]'>Permanent Resident</option>
                 <option value="3" className='dark:bg-[#3d3d3d]'>Temporary Resident</option>
            </>

            );
        };

export default CitizenshipDropdown;
