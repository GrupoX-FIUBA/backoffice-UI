import React, { useEffect, useRef, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, getElementAtEvent } from 'react-chartjs-2';
import EmptyModal from '../Modals/EmptyModal';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BlockedsMetric() {
    const chartRef = useRef();
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [moreInfo, setMoreInfo] = useState()

    const mockedData = {
        labels: ['Enabled Users', 'Blocked Users'],
        datasets: [
          {
            label: 'User Status',
            data: [9, 1],
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
      };

      const [data, setData] = useState(mockedData)

    // useEffect(() => {
    //   //LE PEGO A LA API Y ME DEVUELVE TODOS LOS REGISTROS CON SU TIPO
    //   setData(mockedData);
    // }, [])

    const onClickDoughnut = (event) => {
        if(getElementAtEvent(chartRef.current, event).length < 1)
            return;
        const dataClicked = getElementAtEvent(chartRef.current, event)[0].index;
        setShowMoreInfo(true);
        setMoreInfo('La info de ' + data.labels[dataClicked] + ' es: ' + data.datasets[0].data[dataClicked]);
    }

  return (
    <div className='h-96'>
        {showMoreInfo && <EmptyModal closeModal={() => setShowMoreInfo(false)}>
            <div className='text-white'>
                {moreInfo}
            </div>
            </EmptyModal>}
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
        />
    </div>
  )
}
