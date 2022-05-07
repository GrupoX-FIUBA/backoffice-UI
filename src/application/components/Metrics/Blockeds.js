import React, { useEffect, useRef, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, getElementAtEvent } from 'react-chartjs-2';
import EmptyModal from '../Modals/EmptyModal';
import { getUserMetricBlocks } from '../../repository/metrics';
import Loader from '../Loader/loader';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BlockedsMetric({setClickable}) {
    const chartRef = useRef();
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [moreInfo, setMoreInfo] = useState()
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({})
    const messagesEndRef = useRef(null)

    useEffect(() => {
      const fetchData = async () => {
        const data = await getUserMetricBlocks();
        const parsedData = paseData(data);
        setData(parsedData);
        setLoading(false);
        setClickable();
      }
      fetchData();
    }, [])

  const paseData = (data) => {
    return {
      labels: ['Enabled Users', 'Blocked Users'],
      datasets: [
        {
          label: 'User Status',
          data: [data.enabled, data.disabled],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
  }

    const onClickDoughnut = (event) => {
        if(getElementAtEvent(chartRef.current, event).length < 1)
            return;
        const dataClicked = getElementAtEvent(chartRef.current, event)[0].index;
        setShowMoreInfo(true);
        setMoreInfo('La info de ' + data.labels[dataClicked] + ' es: ' + data.datasets[0].data[dataClicked]);
    }

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
            {loading ? <Loader /> :
        <Doughnut
            ref={chartRef}
            data={data}
            options={{maintainAspectRatio: false,
                plugins: {
                  legend: {
                    onClick: null,
                    labels: {
                        //change color of labels on chart js
                        generateLabels: function(chart) {
                          //change color
                          return chart.data.labels.map(function(label, i) {
                            //change color
                            return {
                              text: label,
                              fillStyle: chart.data.datasets[0].backgroundColor[i],
                              fontSize: 12,
                              fontStyle: 'bold',
                              fontColor: '#fff',
                              lineHeight: 1.2,
                            }
                          });
                        }
                      }
                  }  
                }
            }}
            onClick={onClickDoughnut}
        />}
        <div ref={messagesEndRef} />
    </div>
    </div>
  )
}
