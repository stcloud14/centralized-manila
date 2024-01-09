import React, { useState, useEffect } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import { tailwindConfig } from '../../utils/Utils';

function TopRegions({ topRegions }) {

  console.log(topRegions)

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (topRegions) {
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, []);


  const chartData = isDataLoaded ?
    {
    labels: topRegions.Regions,
    datasets: [
      {
        label: 'Top Regions',
        data: topRegions.Result,
        backgroundColor: [
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.blue[600],
          tailwindConfig().theme.colors.blue[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.blue[700],
          tailwindConfig().theme.colors.blue[900],
        ],
        borderWidth: 0,
      },
    ],
  } : null;

    return (
        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-[#3d3d3d]">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">Top Regions
              <span className="font-thin text-slate-500 dark:text-slate-400 pl-2">(Users)</span>
              </h2>
            </header>
            
            {/* Chart built with Chart.js 3 */}
            <div className="grow">
                {/* Change the height attribute to adjust the chart height */}
                {chartData && <DoughnutChart data={chartData} width={389} height={260} />}
            </div>
        </div>
    )

}

export default TopRegions