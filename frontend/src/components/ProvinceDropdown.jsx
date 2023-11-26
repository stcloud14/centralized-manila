import React from 'react';

    const ProvinceDropdown = ({ onChange, value, selectedRegion }) => {
        const provinceOptions = [
            { value: '1A1', label: 'Ilocos Norte', region: '1' },
            { value: '1A2', label: 'Ilocos Sur', region: '1' },
            { value: '1A3', label: 'La Union', region: '1' },
            { value: '1A4', label: 'Pangasinan', region: '1' },
            { value: '2A1', label: 'Batanes', region: '2' },
            { value: '2A2', label: 'Cagayan', region: '2' },
            { value: '2A3', label: 'Isabela', region: '2' },
            { value: '2A4', label: 'Nueva Viscaya', region: '2' },
            { value: '2A5', label: 'Quirino', region: '2' },
            { value: '3A1', label: 'Aurora', region: '3' },
            { value: '3A2', label: 'Bataan', region: '3' },
            { value: '3A3', label: 'Bulacan', region: '3' },
            { value: '3A4', label: 'Nueva Ecija', region: '3' },
            { value: '3A5', label: 'Pampanga', region: '3' },
            { value: '3A6', label: 'Tarlac', region: '3' },
            { value: '3A7', label: 'Zambales', region: '3' },
            { value: '4A1', label: 'Batangas', region: '4' },
            { value: '4A2', label: 'Cavite', region: '4' },
            { value: '4A3', label: 'Laguna', region: '4' },
            { value: '4A4', label: 'Rizal', region: '4' },
            { value: '4A5', label: 'Quezon', region: '4' },
            { value: '5A1', label: 'Occidental Mindoro', region: '5' },
            { value: '5A2', label: 'Orriental Mindoro', region: '5' },
            { value: '5A3', label: 'Marinduque', region: '5' },
            { value: '5A4', label: 'Romblon', region: '5' },
            { value: '5A5', label: 'Palawan', region: '5' },
            { value: '6A1', label: 'Albay', region: '6' },
            { value: '6A2', label: 'Camarines Norte', region: '6' },
            { value: '6A3', label: 'Camarines Sur', region: '6' },
            { value: '6A4', label: 'Catanduanes', region: '6' },
            { value: '6A5', label: 'Masbate', region: '6' },
            { value: '6A6', label: 'Sorsogon', region: '6' },
            { value: '7A1', label: 'Aklan', region: '7' },
            { value: '7A2', label: 'Antique', region: '7' },
            { value: '7A3', label: 'Capiz', region: '7' },
            { value: '7A4', label: 'Ilo-ilo', region: '7' },
            { value: '7A5', label: 'Guimaras', region: '7' },
            { value: '8A1', label: 'Bohol', region: '8' },
            { value: '8A2', label: 'Cebu', region: '8' },
            { value: '8A3', label: 'Siquijor', region: '8' },
            { value: '9A1', label: 'Eastern Samar', region: '9' },
            { value: '9A2', label: 'Leyte', region: '9' },
            { value: '9A3', label: 'Nothern Samar', region: '9' },
            { value: '9A4', label: 'Western Samar (Samar)', region: '9' },
            { value: '9A5', label: 'Southern Leyte', region: '9' },
            { value: '9A6', label: 'Biliran', region: '9' },
            { value: '10A1', label: 'Zamboanga del Norte', region: '10'	 },
            { value: '10A2', label: 'Zamboanga del Sur', region: '10'	 },
            { value: '10A3', label: 'Zamboanga Sibugay', region: '10'	 },
            { value: '11A1', label: 'Bukidnon', region: '11'	 },
            { value: '11A2', label: 'Camiguin', region: '11'	 },
            { value: '11A3', label: 'Lanao Del Norte', region: '11'	 },
            { value: '11A4', label: 'Misamis Occidental', region: '11'	 },
            { value: '11A5', label: 'Misamis Oriental', region: '11' },
            { value: '12A2', label: 'Davao Del Norte', region: '12'	 },
            { value: '12A3', label: 'Davao Del Sur', region: '12'	 },
            { value: '12A4', label: 'Davao Oriental', region: '12'	 },
            { value: '12A5', label: 'Davao De Oro', region: '12' },
            { value: '13A1', label: 'Cotabato', region: '13'	 },
            { value: '13A2', label: 'Sarangani', region: '13'	 },
            { value: '13A3', label: 'South Cotabato', region: '13'	 },
            { value: '13A4', label: 'Sultan Kudarat', region: '13'	 },
            //NCR
                // ------------------------------->

            { value: '15A1', label: 'Abra', region: '15'	 },
            { value: '15A2', label: 'Apayao', region: '15'	 },
            { value: '15A3', label: 'Benguet', region: '15' },
            { value: '15A4', label: 'Ifugao', region: '15'	 },
            { value: '16A1', label: 'Lanao del Sur', region: '16'	 },
            { value: '16A2', label: 'Maguindanao', region: '16'	 },
            { value: '16A3', label: 'Basilan', region: '16'	 },
            { value: '16A4', label: 'Sulu', region: '16'	 },
            { value: '16A5', label: 'Tawi-Tawi', region: '16'	 },
            { value: '17A1', label: 'Agusan del Norte', region: '17'	 },
            { value: '17A2', label: 'Agusan del Sur', region: '17'	 },
            { value: '17A3', label: 'Surigao del Norte', region: '17'	 },
            { value: '17A4', label: 'Surigao del Sur', region: '17'	 },
            { value: '17A5', label: 'Dinagat Islands', region: '17'	 },
            
        ];

        const filteredProvinces = provinceOptions.filter(
            (province) => province.region === selectedRegion
        );

        return (
            <>
            <option value="" className='dark:bg-[#3d3d3d]'>Select Province</option>
            {filteredProvinces.map((option) => (
                <option key={option.value} value={option.value} className='dark:bg-[#3d3d3d]'>
                {option.label}
                </option>
            ))}
            </>
        );
    };

export default ProvinceDropdown;
