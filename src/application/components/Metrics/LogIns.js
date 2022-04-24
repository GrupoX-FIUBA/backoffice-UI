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
        position: 'top',
        onClick: null,
        labels: {
          //change color of labels on chart js
          generateLabels: function(chart) {
            //change color
            return chart.data.datasets.map(function(dtsts, i) {
              //change color
              return {
                text: dtsts.label,
                fillStyle: dtsts.borderColor,
                fontSize: 12,
                fontStyle: 'bold',
                fontColor: '#fff',
                lineHeight: 1.2,
              }
            });
          }
        }
      },
    },
  };
  export const data = {
  labels,
  datasets: [
    {
      label: 'With Email & Password',
      data: [10,10,10,20,30,40,30],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'With federated identity',
      data: [10,0,10,0,30,35,0],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function LogInsMetric() {
  return (
    <div className='text-white'><Line options={options} data={data} /></div>
  )
}
