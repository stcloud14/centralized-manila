import React from 'react';

    const PrintDropdown = () => {
        return (
            <>
                <option value="0" className='dark:bg-[#3d3d3d]'>Select What to Print</option>
                <option value="1" label="Front" className='dark:bg-[#3d3d3d]'>Front (P50)</option>
                <option value="2" label="Back" className='dark:bg-[#3d3d3d]'>Back (P50)</option>
                <option value="3" label="Front and Back" className='dark:bg-[#3d3d3d]'>Front and Back (P100)</option>
            </>

            );
        };

export default PrintDropdown;