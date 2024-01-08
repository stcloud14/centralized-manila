import React from 'react';
import BarChart from '../../charts/BarChart01';
import { tailwindConfig } from '../../utils/Utils';

function Card07() {

  // const [servicePerf, setServicePerf] = useState([]);
  // const [dataLoaded, setDataLoaded] = useState(false);

  // console.log(servicePerf)

  // useEffect(() => {
  //   const fetchServicePerf = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:8800/admin/serviceperf/`);
  //       setServicePerf(res.data);
  //       setDataLoaded(true);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchServicePerf();
  // }, []);

  const chartData = { labels: [
      '11-01-2022',
      '12-01-2022', '01-01-2023', '02-01-2023',
    ],
    datasets: [
      // Light blue bars
      {
        label: 'RPTAX Payment',
        data: [
          5, 10, 7, 8,
        ],
        backgroundColor: tailwindConfig().theme.colors.blue[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[700],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'RPTAX Clearance',
        data: [
          3, 4, 2, 2,
        ],
        backgroundColor: tailwindConfig().theme.colors.indigo[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Red bars
      {
        label: 'Business Permit',
        data: [
          1, 4, 6, 3,
        ],
        backgroundColor: tailwindConfig().theme.colors.red[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.red[700],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Red bars
      {
        label: 'CTC/Cedula',
        data: [
          2, 5, 2, 4,
        ],
        backgroundColor: tailwindConfig().theme.colors.yellow[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[700],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Red bars
      {
        label: 'Birth Certificate',
        data: [
          7, 1, 3, 4,
        ],
        backgroundColor: tailwindConfig().theme.colors.pink[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.pink[700],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Red bars
      {
        label: 'Death Certificate',
        data: [
          4, 8, 3, 4,
        ],
        backgroundColor: tailwindConfig().theme.colors.violet[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.violet[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Red bars
      {
        label: 'Marriage Certificate',
        data: [
          2, 3, 4, 5,
        ],
        backgroundColor: tailwindConfig().theme.colors.orange[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[700],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  } ;

    return (
      <div className="flex flex-col col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Service Statistics  
        <span className="font-thin text-slate-500 dark:text-slate-400 pl-2">(Total Transactions Per Month)</span>
        </h2>
      </header>
      {/* {chartData && <BarChart data={chartData} width={595} height={248} />} */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
    )

}

export default Card07