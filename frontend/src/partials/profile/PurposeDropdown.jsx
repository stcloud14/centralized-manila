import React from 'react';

    const PurposeDropdown = () => {
        return (
            <>
                <option value="0" className='dark:bg-[#3d3d3d]'>Select Purpose</option>
                <option value="1" className='dark:bg-[#3d3d3d]'>Claim Benefits / Loan</option>
                <option value="2" className='dark:bg-[#3d3d3d]'>Passport / Travel</option>
                <option value="3" className='dark:bg-[#3d3d3d]'>School Requirements</option>
                <option value="4" className='dark:bg-[#3d3d3d]'>Employment Local</option>
                <option value="5" className='dark:bg-[#3d3d3d]'>Employment Abroad</option>
            </>

            );
        };

export default PurposeDropdown;