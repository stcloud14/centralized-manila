import React from 'react';
import LineChart from '../../charts/LineChart02';
import { tailwindConfig } from '../../utils/Utils';

function Revenue() {

    const chartData = {
      labels: [
        '12-01-2020',
        '01-01-2021',
        '02-01-2021',
        '03-01-2021',
        '04-01-2021',
        '05-01-2021',
        '06-01-2021',
        '07-01-2021',
        '08-01-2021',
        '09-01-2021',
        '10-01-2021',
        '11-01-2021',
        '12-01-2021',
        '01-01-2022',
        '02-01-2022',
        '03-01-2022',
        '04-01-2022',
        '05-01-2022',
        '06-01-2022',
        '07-01-2022',
        '08-01-2022',
        '09-01-2022',
        '10-01-2022',
        '11-01-2022',
        '12-01-2022',
        '01-01-2023',
      ],
      datasets: [
        // blue line
        {
          label: 'Current',
          data: [73, 64, 73, 69, 104, 104, 164, 164, 120, 120, 120, 148, 142, 104, 122, 110, 104, 152, 166, 233, 268, 252, 284, 284, 333, 323],
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
        // red line
        {
          label: 'Previous',
          data: [184, 86, 42, 378, 42, 243, 38, 120, 0, 0, 42, 0, 84, 0, 276, 0, 124, 42, 124, 88, 88, 215, 156, 88, 124, 64],
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
        // yellow line
        {
          label: 'Average',
          data: [122, 170, 192, 86, 102, 124, 115, 115, 56, 104, 0, 72, 208, 186, 223, 188, 114, 162, 200, 150, 118, 118, 76, 122, 230, 268],
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