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
import { getUserMetricPasswordRecoveries } from '../../repository/metrics';
import Loader from '../Loader/loader';
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

export default function PasswordRecoveriesMetric({setClickable}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({})
  const messagesEndRef = useRef(null)
  const {user} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserMetricPasswordRecoveries(user.accessToken);
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
          label: 'Quantity',
          data: data.values,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ],
    }
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [loading]);

  return (
    <div className='text-white bg-gray-700 rounded-md'>
      {loading ? <Loader /> :
      <Line options={options} data={data} />}
      <div ref={messagesEndRef} />
      </div>
  )
}
