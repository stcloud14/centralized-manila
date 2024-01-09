import React from 'react';
import BarChart from '../../charts/BarChart01';
import { tailwindConfig } from '../../utils/Utils';

function MainCard() {

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
      '10-01-2022',
      '11-01-2022', '12-01-2022', '01-01-2023',
    ],
    datasets: [
      // Light blue bars
      {
        label: 'RPTAX Payment',
        data: [
          5, 10, 7, 8,
        ],
        backgroundColor: '#0057e7',
        hoverBackgroundColor: '#0741a3',
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'RPTAX Clearance',
        data: [
          3, 4, 2, 2,
        ],
        backgroundColor: '#3078f0',
        hoverBackgroundColor: '#2660bf',
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Red bars
      {
        label: 'Business Permit',
        data: [
          1, 4, 6, 3,
        ],
        backgroundColor: '#d62d20',
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
        backgroundColor: '#ffa700',
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
        backgroundColor: '#008744',
        hoverBackgroundColor: tailwindConfig().theme.colors.green[900],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Red bars
      {
        label: 'Death Certificate',
        data: [
          4, 8, 3, 4,
        ],
        backgroundColor: '#17bf6c',
        hoverBackgroundColor: '#0e7844',
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Red bars
      {
        label: 'Marriage Certificate',
        data: [
          2, 3, 4, 5,
        ],
        backgroundColor: '#78ffbc',
        hoverBackgroundColor: '#428a66',
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  } ;

    return (
      <div className="flex flex-col col-span-full bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-[#3d3d3d]">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Service Statistics  
        <span className="font-thin text-slate-500 dark:text-slate-400 pl-2">(Total Transactions)</span>
        </h2>
      </header>
      {/* {chartData && <BarChart data={chartData} width={595} height={248} />} */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
    )

}

export default MainCard