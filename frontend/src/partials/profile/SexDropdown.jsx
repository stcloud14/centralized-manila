import React from 'react';

    const SexDropdown = () => {
        return (
            <>
                <option value="0" className='dark:bg-[#3d3d3d] dark:text-white'>Select Sex</option>
                <option value="1" label="Male" className='dark:bg-[#3d3d3d] dark:text-white'>Male</option>
                <option value="2" label="Female" className='dark:bg-[#3d3d3d] dark:text-white'>Female</option>
            </>

            );
        };

export default SexDropdown;
