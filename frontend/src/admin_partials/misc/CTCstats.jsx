import React, { useState, useEffect } from 'react';
import BarChart from '../../charts/BarChart03';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

  const CTCstats = React.memo(({ cedulaCert }) => {

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (cedulaCert) {
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
            data: [cedulaCert.Pending],
            backgroundColor: tailwindConfig().theme.colors.yellow[400],
            hoverBackgroundColor: tailwindConfig().theme.colors.yellow[500],
            barPercentage: 1,
            categoryPercentage: 1,
          },
          {
            label: 'Paid',
            data: [cedulaCert.Paid],
            backgroundColor: tailwindConfig().theme.colors.emerald[400],
            hoverBackgroundColor: tailwindConfig().theme.colors.emerald[500],
            barPercentage: 1,
            categoryPercentage: 1,
          },
          {
            label: 'Canceled',
            data: [cedulaCert.Canceled],
            backgroundColor: tailwindConfig().theme.colors.slate[400],
            hoverBackgroundColor: tailwindConfig().theme.colors.slate[500],
            barPercentage: 1,
            categoryPercentage: 1,
          },
          {
            label: 'Rejected',
            data: [cedulaCert.Rejected],
            backgroundColor: tailwindConfig().theme.colors.red[500],
            hoverBackgroundColor: tailwindConfig().theme.colors.red[600],
            barPercentage: 1,
            categoryPercentage: 1,
          },
          {
            label: 'Expired',
            data: [cedulaCert.Expired],
            backgroundColor: tailwindConfig().theme.colors.orange[500],
            hoverBackgroundColor: tailwindConfig().theme.colors.orange[600],
            barPercentage: 1,
            categoryPercentage: 1,
          },
          {
            label: 'Processing',
            data: [cedulaCert.Processing],
            backgroundColor: tailwindConfig().theme.colors.purple[600],
            hoverBackgroundColor: tailwindConfig().theme.colors.purple[700],
            barPercentage: 1,
            categoryPercentage: 1,
          },
          {
            label: 'Complete',
            data: [cedulaCert.Complete],
            backgroundColor: tailwindConfig().theme.colors.blue[500],
            hoverBackgroundColor: tailwindConfig().theme.colors.blue[600],
            barPercentage: 1,
            categoryPercentage: 1,
          },
        ],
      }
    : null;


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
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Community Tax Certificate (CTC) or Cedula</h2>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Total Transactions</div>
                <div className="flex items-start">
                {cedulaCert && <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{cedulaCert.Total}</div>}
                {/* <div className="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full">+49%</div> */}
                </div>
            </div>
            
            {/* Chart built with Chart.js 3 */}
            <div className="grow">
                {/* Change the height attribute to adjust the chart height */}
                {chartData && <BarChart data={chartData} width={595} height={48} />}
            </div>
        </div>
    )

});

export default CTCstats