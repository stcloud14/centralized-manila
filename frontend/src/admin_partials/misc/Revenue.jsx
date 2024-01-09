import React from 'react';
import LineChart from '../../charts/LineChart02';
import { tailwindConfig } from '../../utils/Utils';

function Revenue() {

    const chartData = {
      labels: [
        '10-01-2023',
        '11-01-2023',
        '12-01-2023',
        '01-01-2024',
      ],
      datasets: [
        {
          label: 'RPTAX Payment',
          data: [12, 15, 13, 5],
          borderColor: tailwindConfig().theme.colors.blue[600],
          fill: false,
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.blue[600],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[600],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
        },
        {
          label: 'RPTAX Clearance',
          data: [5, 9, 11, 3],
          borderColor: tailwindConfig().theme.colors.red[500],
          fill: false,
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.red[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.red[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
        },
        {
          label: 'Business Permit',
          data: [1, 4, 13, 16],
          borderColor: tailwindConfig().theme.colors.green[500],
          fill: false,
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.green[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.green[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
        },
        {
          label: 'CTC/Cedula',
          data: [9, 13, 13, 3],
          borderColor: tailwindConfig().theme.colors.yellow[500],
          fill: false,
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.yellow[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.yellow[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
        },
        {
          label: 'Birth Certificate',
          data: [15, 20, 19, 13],
          borderColor: tailwindConfig().theme.colors.yellow[500],
          fill: false,
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.yellow[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.yellow[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
        },
        {
          label: 'Death Certificate',
          data: [12, 0, 20, 4],
          borderColor: tailwindConfig().theme.colors.yellow[500],
          fill: false,
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.yellow[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.yellow[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
        },
        {
          label: 'Marriage Certificate',
          data: [10, 10, 19, 12],
          borderColor: tailwindConfig().theme.colors.yellow[500],
          fill: false,
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.yellow[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.yellow[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
        },
      
      ],
    };

    return (
      <div className="flex flex-col col-span-full bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-[#3d3d3d]">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Revenue</h2>
      </header>
      {/* {chartData && <BarChart data={chartData} width={595} height={248} />} */}
      <LineChart data={chartData} width={595} height={248} />
    </div>
    )

}

export default Revenue