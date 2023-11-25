import React from 'react';

const CityDropdown= () => {
    return (
      <>
        <option value="0" className='dark:bg-[#3d3d3d]'selected>Select Municipal</option>
        <option value="1" className='dark:bg-[#3d3d3d]'>Manila</option>
        <option value="2"className='dark:bg-[#3d3d3d]'>Quezon City</option>
        <option value="3"className='dark:bg-[#3d3d3d]'>Davao</option>
        <option value="4"className='dark:bg-[#3d3d3d]'>Caloocan City</option>
        <option value="5"className='dark:bg-[#3d3d3d]'>Canagatan</option>
        <option value="6"className='dark:bg-[#3d3d3d]'>Taguig City</option>
        <option value="7"className='dark:bg-[#3d3d3d]'>Pasig City</option>
        <option value="8"className='dark:bg-[#3d3d3d]'>Valenzuela</option>
        <option value="9"className='dark:bg-[#3d3d3d]'>City of Paranaque</option>
        <option value="10"className='dark:bg-[#3d3d3d]'>Bacoor</option>
        <option value="11"className='dark:bg-[#3d3d3d]'>Tondo</option>
      </>
    );
  };


export default CityDropdown;