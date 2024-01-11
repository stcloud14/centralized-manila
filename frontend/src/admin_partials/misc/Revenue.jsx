import React, { useState, useEffect } from 'react';
import LineChart from '../../charts/LineChart02';
import { tailwindConfig } from '../../utils/Utils';

function Revenue({ revenue }) {
  const formatDateArray = (dateArray) => {
    return dateArray.map((date) => {
      const [year, month, day] = date.split('-');
      const formattedDate = `${month}-${day}-${year}`;
      return formattedDate;
    });
  };

  const formattedDateArray = revenue?.latestmonths ? formatDateArray(revenue.latestmonths) : [];

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    if (revenue) {
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, []);


  const chartData = isDataLoaded ?
    {
      labels: formattedDateArray,
      datasets: [
        {
          label: 'RPTAX Payment',
          data: revenue.taxpayment,
          borderColor: '#0057e7',
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
          data: revenue.taxclearance,
          borderColor: '#3078f0',
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
          data: revenue.buspermit,
          borderColor: '#d62d20',
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
          data: revenue.cedulacert,
          borderColor: '#ffa700',
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
          data: revenue.birthcert,
          borderColor: '#008744',
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
          data: revenue.deathcert,
          borderColor: '#17bf6c',
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
          data: revenue.marriagecert,
          borderColor: '#78ffbc',
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
    } : null;

    return (
      <div className="flex flex-col col-span-full bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-[#3d3d3d]">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Gross Revenue</h2>
      </header>
      {/* {chartData && <BarChart data={chartData} width={595} height={248} />} */}
      {chartData && <LineChart data={chartData} width={595} height={248} totalPaid={revenue.totalPaid} />}
    </div>
    )

}

export default Revenue