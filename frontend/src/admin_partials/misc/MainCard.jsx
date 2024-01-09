import React, { useState, useEffect } from 'react';
import BarChart from '../../charts/BarChart01';
import { tailwindConfig } from '../../utils/Utils';

function MainCard({ transStats }) {

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  


  console.log(transStats.taxpayment)

  useEffect(() => {
    if (transStats) {
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, []);


  const chartData = isDataLoaded ?
    {
      labels: [
      '10-01-2023',
      '11-01-2023', '12-01-2023', '01-01-2024',
    ],
    datasets: [
      // Light blue bars
      {
        label: 'RPTAX Payment',
        data: transStats.taxpayment,
        backgroundColor: '#0057e7',
        hoverBackgroundColor: '#0741a3',
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'RPTAX Clearance',
        data: transStats.taxclearance,
        backgroundColor: '#3078f0',
        hoverBackgroundColor: '#2660bf',
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Red bars
      {
        label: 'Business Permit',
        data: transStats.buspermit,
        backgroundColor: '#d62d20',
        hoverBackgroundColor: tailwindConfig().theme.colors.red[700],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Red bars
      {
        label: 'CTC/Cedula',
        data: transStats.cedulacert,
        backgroundColor: '#ffa700',
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[700],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Red bars
      {
        label: 'Birth Certificate',
        data: transStats.birthcert,
        backgroundColor: '#008744',
        hoverBackgroundColor: tailwindConfig().theme.colors.green[900],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Red bars
      {
        label: 'Death Certificate',
        data: transStats.deathcert,
        backgroundColor: '#17bf6c',
        hoverBackgroundColor: '#0e7844',
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Red bars
      {
        label: 'Marriage Certificate',
        data: transStats.marriagecert,
        backgroundColor: '#78ffbc',
        hoverBackgroundColor: '#428a66',
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  } : null ;

    return (
      <div className="flex flex-col col-span-full bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-[#3d3d3d]">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Service Statistics  
        <span className="font-thin text-slate-500 dark:text-slate-400 pl-2">(Total Transactions)</span>
        </h2>
      </header>
      {/* {chartData && <BarChart data={chartData} width={595} height={248} />} */}
      {chartData && <BarChart data={chartData} width={595} height={248} />}
    </div>
    )

}

export default MainCard