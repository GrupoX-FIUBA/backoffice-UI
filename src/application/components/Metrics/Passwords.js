import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05', '2022-01-06', '2022-01-07'];
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  export const data = {
  labels,
  datasets: [
    {
      label: 'Quantity',
      data: [0,0,0,1,0,0,9],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

export default function PasswordRecoveriesMetric() {
  return (
    <div className='text-white'><Line options={options} data={data} /></div>
  )
}
