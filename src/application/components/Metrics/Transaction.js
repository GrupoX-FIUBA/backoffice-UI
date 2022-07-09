import React, { useEffect, useRef, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Loader from '../Loader/loader';
import { getTransactionMetric } from '../../repository/metrics';
import { useAuth } from '../../../context/authContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Transaction() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({})
  const messagesEndRef = useRef(null)
  const {user} = useAuth();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        //color white
        labels: {
          color: '#fff',
        }
      },
      title: {
        display: true,
        text: 'Deposits vs Payments in ETH. (Last 7 days)',
        //color white
        fontColor: '#fff',
        color: '#fff',
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
      const data = await getTransactionMetric(user.accessToken);
      const parsedData = paseData(data);
      setData(parsedData);
      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const paseData = (data) => {
    return {
      labels: data.days,
      datasets: [
        {
          label: 'Deposits',
          data: data.deposits,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Payment',
          data: data.payments,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }
  }

  return (
    <div className='text-white bg-gray-700 rounded-md'>
      {loading ? <Loader/> :
      <Bar options={options} data={data} />}
      <div ref={messagesEndRef} />
      </div>
  )
}
