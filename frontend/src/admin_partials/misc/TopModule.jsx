import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function TopModule() {

  const [servicePerf, setServicePerf] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  console.log(servicePerf)

  useEffect(() => {
    const fetchServicePerf = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/admin/serviceperf/`);
        setServicePerf(res.data);
        setDataLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchServicePerf();
  }, []);

  
     
  const chartData = dataLoaded
  ? {
    labels: [
      'Real Property Tax Payment', 
      'Real Property Tax Clearance', 
      'Business Permit', 
      'Community Tax Certificate', 
      'Birth Certificate', 
      'Death Certificate', 
      'Marriage Certificate', 
      
    ],
    datasets: [
      {
        label: 'Service Performance',
        data: servicePerf,
        // data: [
        //   35, 30, 35, 40, 20, 15, 50
        // ],
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.indigo[800],
          tailwindConfig().theme.colors.red[600],
          tailwindConfig().theme.colors.green[500],
          tailwindConfig().theme.colors.yellow[400],
          tailwindConfig().theme.colors.orange[500],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.indigo[900],
          tailwindConfig().theme.colors.red[600],
          tailwindConfig().theme.colors.green[500],
          tailwindConfig().theme.colors.yellow[400],
          tailwindConfig().theme.colors.orange[500],
        ],
        borderWidth: 0,
      },
    ],
  } : null;

    return (
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-[#3d3d3d]">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">Service Performance</h2>
            </header>
            {/* Chart built with Chart.js 3 */}
            <div className="grow">
              {/* Change the height attribute to adjust the chart height */}
              {chartData && <DoughnutChart data={chartData} width={389} height={260} />}
            </div>
        </div>
    )

}

export default TopModule