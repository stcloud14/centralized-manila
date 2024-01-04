import React from 'react';

    const CitizenshipDropdown = () => {
        return (
            <>
                 <option value="0" className='dark:bg-[#3d3d3d]'>Select Citizenship</option>
                 <option value="Citizen" className='dark:bg-[#3d3d3d]'>Citizen</option>
                 <option value="Permanent Resident" className='dark:bg-[#3d3d3d]'>Permanent Resident</option>
                 <option value="Temporary Resident" className='dark:bg-[#3d3d3d]'>Temporary Resident</option>
            </>

            );
        };

export default CitizenshipDropdown;
