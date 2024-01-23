import React from 'react';

    const BusinessTypeDropdown = () => {
        return (
            <>
                      <option value="0" className='dark:bg-[#3d3d3d]'>Select Business Type</option>
                      <option value="1" label="Sole Proprietorship" className='dark:bg-[#3d3d3d]'>Sole Proprietorship</option>
                      <option value="2" label="One Person Corporation" className='dark:bg-[#3d3d3d]'>One Person Corporation</option>
                      <option value="3" label="Partnership" className='dark:bg-[#3d3d3d]'>Partnership</option>
                      <option value="4" label="Corporation" className='dark:bg-[#3d3d3d]'>Corporation</option>
                      <option value="5" label="Cooperative" className='dark:bg-[#3d3d3d]'>Cooperative</option>
            </>

            );
        };

export default BusinessTypeDropdown;
