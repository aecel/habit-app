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
const StackedBarChart = ({
  title,
  textColor,
  cardColor,
  dataArray,
  dataRangeText,
  barColorArray,
}) => {
  const options = {
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
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
      label: `${array.name}`,
      data: array.array,
      backgroundColor: barColorArray[dataArray.indexOf(array) % 5],
      borderColor: `${cardColor}`,
    }
  })

  console.log(dataObjectArray)

  const data = {
    labels: labels,
    datasets: dataObjectArray,
  }

  return (
    <div className="stats-card-chart">
      <div className="stats-card-title">
        {title}
        <div className="sub-text">{dataRangeText}</div>
      </div>
      <div className="bar-chart-container">
        <Bar options={options} data={data} />
      </div>
      <div className="card-bottom"></div>
    </div>
  )
}

export default StackedBarChart
