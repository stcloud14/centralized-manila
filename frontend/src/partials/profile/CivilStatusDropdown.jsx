import React from 'react';

    const CivilStatusDropdown = () => {
        return (
            <>
           <option value="0" className='dark:bg-[#3d3d3d]'>Select Civil Status</option>
           <option value="SINGLE" className='dark:bg-[#3d3d3d]'>Single</option>
           <option value="MARRIED" className='dark:bg-[#3d3d3d]'>Married</option>
           <option value="SEPARATED" className='dark:bg-[#3d3d3d]'>Separated</option>
           <option value="WIDOWED" className='dark:bg-[#3d3d3d]'>Widowed</option>
            </>

            );
        };

export default CivilStatusDropdown;
