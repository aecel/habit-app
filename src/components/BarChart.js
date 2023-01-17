import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { getThisYearInMonthsArray } from "../calendarFunctions"
import getArrayTotal from "../getArrayTotal"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Change such that it graphs from last year same month
const BarChart = ({ textColor, dataArray, barColor }) => {
  if (!barColor) {
    barColor = "#145820"
  }

  const options = {
    maintainAspectRatio: false,
    offset: true,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        color: "#fff",
        labels: {
          padding: 20,
          font: {
            size: 10,
          },
          color: `${textColor}`,
          boxWidth: 20,
        },
      },
      // title: {
      //   display: true,
      //   text: "Chart.js Bar Chart",
      // },
    },
    scales: {
      y: {
        ticks: {
          color: `${textColor}`,
          font: {
            size: 8,
          },
        },
        grid: {
          color: "transparent",
        },
        border: {
          color: "transparent",
        },
      },
      x: {
        ticks: {
          color: `${textColor}`,
          font: {
            size: 8,
          },
        },
        grid: {
          color: "transparent",
        },
        border: {
          color: "rgb(128, 128, 128)",
        },
      },
    },
  }

  const labels = getThisYearInMonthsArray()

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Green/Gold Tasks",
        data: dataArray,
        backgroundColor: [`${barColor}`],
        //   clip: false,
        //   minBarLength: 100,
      },
    ],
  }

  const totalCount = getArrayTotal(dataArray)
  return (
    <div>
      <div className="bar-chart-container">
        <Bar options={options} data={data} />
      </div>
      <div className="stats-card-text">
        Total Green/Gold Tasks: {totalCount}
      </div>
    </div>
  )
}

export default BarChart
