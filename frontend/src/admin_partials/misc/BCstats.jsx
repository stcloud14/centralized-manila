import React, { useState, useEffect } from 'react';
import BarChart from '../../charts/BarChart03';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function BCstats({ birthCert }) {

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (birthCert) {
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, []);


  const chartData = isDataLoaded ? {
        labels: ['Reasons'],
        datasets: [
          {
            label: 'Pending',
            data: [birthCert.Pending],
            backgroundColor: tailwindConfig().theme.colors.yellow[400],
            hoverBackgroundColor: tailwindConfig().theme.colors.yellow[500],
            barPercentage: 1,
            categoryPercentage: 1,
          },
          {
            label: 'Paid',
            data: [birthCert.Paid],
            backgroundColor: tailwindConfig().theme.colors.emerald[400],
            hoverBackgroundColor: tailwindConfig().theme.colors.emerald[500],
            barPercentage: 1,
            categoryPercentage: 1,
          },
          {
            label: 'Canceled',
            data: [birthCert.Canceled],
            backgroundColor: tailwindConfig().theme.colors.slate[400],
            hoverBackgroundColor: tailwindConfig().theme.colors.slate[500],
            barPercentage: 1,
            categoryPercentage: 1,
          },
          {
            label: 'Rejected',
            data: [birthCert.Rejected],
            backgroundColor: tailwindConfig().theme.colors.red[500],
            hoverBackgroundColor: tailwindConfig().theme.colors.red[600],
            barPercentage: 1,
            categoryPercentage: 1,
          },
          {
            label: 'Expired',
            data: [birthCert.Expired],
            backgroundColor: tailwindConfig().theme.colors.blue[500],
            hoverBackgroundColor: tailwindConfig().theme.colors.blue[600],
            barPercentage: 1,
            categoryPercentage: 1,
          },
        ],
      }
    : null;


    return (
        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
            <div className="px-5 pt-5">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Birth Certificate</h2>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Total Transactions</div>
                <div className="flex items-start">
                {birthCert && <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{birthCert.Total}</div>}
                </div>
            </div>
            
            {/* Chart built with Chart.js 3 */}
            <div className="grow">
                {/* Change the height attribute to adjust the chart height */}
                {chartData && <BarChart data={chartData} width={595} height={48} />}
            </div>
        </div>
    )

}

export default BCstats