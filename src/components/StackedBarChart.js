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
import getRandomGreen from "../getRandomGreen"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Change such that it graphs from last year same month
const StackedBarChart = ({ textColor, dataArray, barColor }) => {
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
        stacked: true,
        ticks: {
          color: `${textColor}`,
          font: {
            size: 8,
          },
        },
      },
      x: {
        stacked: true,
        ticks: {
          color: `${textColor}`,
          font: {
            size: 8,
          },
        },
      },
    },
  }

  const labels = getThisYearInMonthsArray()

  const dataObjectArray = dataArray.map((array) => {
    return {
      label: "Green/Gold Tasks",
      data: array,
      backgroundColor: getRandomGreen(),
    }
  })

  const data = {
    labels: labels,
    datasets: dataObjectArray,
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

export default StackedBarChart
