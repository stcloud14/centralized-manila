import React from 'react';

const RegionDropdown = ({ onChange, value }) => {
  const regionOptions = [
    { value: "", label: 'Select Region' },
    { value: "1", label: 'Region I - Ilocos Region' },
    { value: "2", label: 'Region II - Cagayan Valley' },
    { value: "3", label: 'Region III - Central Luzon' },
    { value: "4", label: 'Region IV-A - Calabarzon' },
    { value: "5", label: 'Mimaropa' },
    { value: "6", label: 'Region V - Bicol Region' },
    { value: "7", label: 'Region VI - Western Visayas' },
    { value: "8", label: 'Region VII - Central Visayas' },
    { value: "9", label: 'Region VIII - Eastern Visayas' },
    { value: "10", label: 'Region IX - Northern Mindanao' },
    { value: "11", label: 'Region X - Zamboanga Peninsula' },
    { value: "12", label: 'Region XI - Davao Region' },
    { value: "13", label: 'Region XII - Soccksargen' },
    { value: "14", label: 'National Capital Region (NCR)' },
    { value: "15", label: 'Cordillera Administrative Region (CAR)' },
    { value: "16", label: 'Autonomous Region in Muslim Mindanao (ARMM)' },
    { value: "17", label: 'Region XIII (Caraga)' },
  ];

  return (
    <>
      {regionOptions.map((option) => (
        <option key={option.value} value={option.value} className='dark:bg-[#3d3d3d]'> {option.value}
          {option.label}
        </option>
      ))}
    </>
  );
};

export default RegionDropdown;
