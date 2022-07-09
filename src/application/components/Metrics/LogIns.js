import React, { useEffect, useRef, useState } from 'react'
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
import Loader from '../Loader/loader';
import { getUserMetricLogIns } from '../../repository/metrics';
import { useAuth } from '../../../context/authContext';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export default function LogInsMetric({setClickable}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({})
  const messagesEndRef = useRef(null)
  const {user} = useAuth();

  const options = {
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

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserMetricLogIns(user.accessToken);
      const parsedData = paseData(data);
      setData(parsedData);
      setLoading(false);
      setClickable();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const paseData = (data) => {
    return {
      labels: data.dates,
      datasets: [
        {
          label: 'With Email & Password',
          data: data.ep,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'With federated identity',
          data: data.fi,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }
  }

  return (
    <div className='text-white bg-gray-700 rounded-md'>
      {loading ? <Loader/> :
      <Line options={options} data={data} />}
      <div ref={messagesEndRef} />
      </div>
  )
}
