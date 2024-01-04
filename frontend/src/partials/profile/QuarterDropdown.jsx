import React from 'react';

    const QuarterDropdown = () => {
        return (
            <>
              <option value="0" className='dark:bg-[#3d3d3d]'>Select Period</option>
              <option value="1st Quarter" className='dark:bg-[#3d3d3d]'>1st Quarter</option>
              <option value="2nd Quarter"className='dark:bg-[#3d3d3d]'>2nd Quarter</option>
              <option value="3rd Quarter"className='dark:bg-[#3d3d3d]'>3rd Quarter</option>
              <option value="4th Quarter"className='dark:bg-[#3d3d3d]'>4th Quarter</option>
            </>

            );
        };

export default QuarterDropdown;
