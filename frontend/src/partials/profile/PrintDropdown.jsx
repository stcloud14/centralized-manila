import React from 'react';

    const PrintDropdown = () => {
        return (
            <>
                <option value="0" className='dark:bg-[#3d3d3d]'>Select What to Print</option>
                <option value="Front" className='dark:bg-[#3d3d3d]'>Front (P50)</option>
                <option value="Back" className='dark:bg-[#3d3d3d]'>Back (P50)</option>
                <option value="Front and Back" className='dark:bg-[#3d3d3d]'>Front and Back (P100)</option>
            </>

            );
        };

export default PrintDropdown;