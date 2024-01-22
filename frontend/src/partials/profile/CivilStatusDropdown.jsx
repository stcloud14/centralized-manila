import React from 'react';

    const CivilStatusDropdown = () => {
        return (
            <>
           <option value="0" className='dark:bg-[#3d3d3d]'>Select Civil Status</option>
           <option value="1" className='dark:bg-[#3d3d3d]'>Single</option>
           <option value="2" className='dark:bg-[#3d3d3d]'>Married</option>
           <option value="3" className='dark:bg-[#3d3d3d]'>Separated</option>
           <option value="4" className='dark:bg-[#3d3d3d]'>Widowed</option>
            </>

            );
        };

export default CivilStatusDropdown;
