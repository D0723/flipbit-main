import React from "react";
import { Line, Chart } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useSelector } from "react-redux";

Chart.register(StreamingPlugin, zoomPlugin);

function TradingChart() {
  const { selectionCoinType } = useSelector(state => state.coin);
  const data = {
    datasets: [{
      label: "Coin Price",
      borderColor: 'rgb(255, 205, 86)',
      borderDash: [3, 0],
      fill: false,
      data: [],
      lineTension: 0.3
    }
    ]
  }

  const options = {
    plugins:{
      zoom: {
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
        },
        pan: {
          enabled: true,
          onPanStart({chart, point}) {
            const area = chart.chartArea;
            const w25 = area.width * 0.25;
            const h25 = area.height * 0.25;
            if (point.x < area.left + w25 || point.x > area.right - w25
              || point.y < area.top + h25 || point.y > area.bottom - h25) {
              return false; // abort
            }
          },
          mode: 'xy'
        }
      },
    },
    layout : {
      padding: {
        bottom: 70,
        top: 20
      }
    },
    scales: {
      x: {
        type: 'realtime',
        realtime: {
          delay: 750,
          duration:30000,
          onRefresh: chart => {
            chart.data.datasets.forEach(dataset => {
              dataset.data.push({
                x: Date.now(),
                y: getCoinPrice()
              });
            });
          }
        }
      }
    }
  }

  const getCoinPrice = () => {
    var coinPrice = localStorage.getItem('updatedBitcoinPrice');
    if(selectionCoinType === 'BTC') {
      coinPrice = localStorage.getItem('updatedBitcoinPrice');
    }
    if(selectionCoinType === 'ETH') {
      coinPrice = localStorage.getItem('updatedEthereumPrice');
    }
    if(selectionCoinType === 'SOL') {
      coinPrice = localStorage.getItem('updatedSolanaPrice');
    }
    if(selectionCoinType === 'ADA') {
      coinPrice = localStorage.getItem('updatedAPEPrice');
    }
    if(selectionCoinType === 'APE') {
      coinPrice = localStorage.getItem('updatedADAPrice');
    }

    if(parseFloat(coinPrice) == NaN || parseFloat(coinPrice) == 0)
      return null;
    else return parseFloat(coinPrice);
  }

	return (
        <>
          <Line
              data={data}
              options={options}
            />
        </>
  ) 
}
export default TradingChart;