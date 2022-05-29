import React, { useEffect, useRef, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, getElementAtEvent } from 'react-chartjs-2';
import EmptyModal from '../Modals/EmptyModal';
import Loader from '../Loader/loader';
import { getBySubscriptionMetric } from '../../repository/metrics';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ByUserMetric({setClickable}) {
    const chartRef = useRef();
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [moreInfo, setMoreInfo] = useState()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null)

    useEffect(() => {
      const fetchData = async() => {
        const data = await getBySubscriptionMetric();
        // const parsedData = paseData(data);
        // setData(parsedData);
        // setLoading(false);
        // setClickable();
      }
      fetchData();
    }, [])
    
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [loading]);

  return (
    <div className='py-40 bg-gray-700 rounded-md'>
    <div className='h-96'>
        {showMoreInfo && <EmptyModal closeModal={() => setShowMoreInfo(false)}>
            <div className='text-white'>
                {moreInfo}
            </div>
            </EmptyModal>}
            {loading ? <Loader/> :
          <div></div>
          }
          <div ref={messagesEndRef} />
    </div>
    </div>
  )
}
