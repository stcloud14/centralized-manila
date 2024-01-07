import React from 'react';
import BarChart from '../../charts/BarChart03';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function Card05() {

    const chartData = {
        labels: ['Reasons'],
        datasets: [
          {
            label: 'Label 1',
            data: [131],
            backgroundColor: tailwindConfig().theme.colors.indigo[500],
            hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
            barPercentage: 1,
            categoryPercentage: 1,
          },
          {
            label: 'Label 2',
            data: [100],
            backgroundColor: tailwindConfig().theme.colors.indigo[800],
            hoverBackgroundColor: tailwindConfig().theme.colors.indigo[900],
            barPercentage: 1,
            categoryPercentage: 1,
          },
          {
            label: 'Label 3',
            data: [81],
            backgroundColor: tailwindConfig().theme.colors.slate[200],
            hoverBackgroundColor: tailwindConfig().theme.colors.slate[300],
            barPercentage: 1,
            categoryPercentage: 1,
          },
        ],
      };

    return (
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
            <div className="px-5 pt-5">
                {/* <header className="flex justify-between items-start mb-2">
                
                <img src={Icon} width="32" height="32" alt="Icon 01" />
                
                <EditMenu align="right" className="relative inline-flex">
                    <li>
                    <Link className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3" to="#0">
                        Option 1
                    </Link>
                    </li>
                    <li>
                    <Link className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3" to="#0">
                        Option 2
                    </Link>
                    </li>
                    <li>
                    <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">
                        Remove
                    </Link>
                    </li>
                </EditMenu>
                </header> */}
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Text 1</h2>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Sales</div>
                <div className="flex items-start">
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">$24,780</div>
                <div className="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full">+49%</div>
                </div>
            </div>
            
            {/* Chart built with Chart.js 3 */}
            <div className="grow">
                {/* Change the height attribute to adjust the chart height */}
                <BarChart data={chartData} width={595} height={48} />
            </div>
        </div>
    )

}

export default Card05