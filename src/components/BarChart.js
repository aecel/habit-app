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
          font: {
            size: 10,
          },
          color: `${textColor}`,
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
      },
      x: {
        ticks: {
          color: `${textColor}`,
          font: {
            size: 8,
          },
        },
      },
    },
  }

  const today = new Date()
  const monthNow = today.getMonth() + 1

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

  return (
    <div className="bar-chart-container">
      <Bar options={options} data={data} />
    </div>
  )
}

export default BarChart
