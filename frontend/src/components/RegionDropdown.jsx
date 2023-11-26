import React from 'react';

    const RegionDropdown = ({ onChange, value }) => {
        return (
            <>
            <option value="" className='dark:bg-[#3d3d3d]'>Select Region</option>
            <option value="1" className='dark:bg-[#3d3d3d]'>Region I - Ilocos Region</option>
            <option value="2" className='dark:bg-[#3d3d3d]'>Region II - Cagayan Valley</option>
            <option value="3" className='dark:bg-[#3d3d3d]'>Region III - Central Luzon</option>
            <option value="4" className='dark:bg-[#3d3d3d]'>Region IV-A - Calabarzon</option>
            <option value="5" className='dark:bg-[#3d3d3d]'>Mimaropa</option>
            <option value="6" className='dark:bg-[#3d3d3d]'>Region V - Bicol Region</option>
            <option value="7" className='dark:bg-[#3d3d3d]'>Region VI - Western Visayas</option>
            <option value="8" className='dark:bg-[#3d3d3d]'>Region VII - Central Visayas</option>
            <option value="9" className='dark:bg-[#3d3d3d]'>Region VIII - Eastern Visayas</option>
            <option value="10" className='dark:bg-[#3d3d3d]'>Region IX - Northern Mindanao</option>
            <option value="11" className='dark:bg-[#3d3d3d]'>Region X - Zamboanga Peninsula</option>
            <option value="12" className='dark:bg-[#3d3d3d]'>Region XI - Davao Region</option>
            <option value="13" className='dark:bg-[#3d3d3d]'>Region XII - Soccksargen</option>
            <option value="14" className='dark:bg-[#3d3d3d]'>National Capital Region (NCR) </option>
            <option value="15" className='dark:bg-[#3d3d3d]'>Cordillera Administrative Region (CAR) </option>
            <option value="16" className='dark:bg-[#3d3d3d]'>Autonomous Region in Muslim Mindanao (ARMM)</option>
            <option value="17" className='dark:bg-[#3d3d3d]'>Region XIII (Caraga) </option>
            </>
        );
    };

export default RegionDropdown;
