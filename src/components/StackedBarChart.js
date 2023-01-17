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
        borderWidth: 2,
      },
    },
    maintainAspectRatio: false,
    offset: true,
    responsive: true,
    plugins: {
      legend: {
        align: "start",
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
        stacked: true,
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
        stacked: true,
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
  const dataObjectArray = dataArray.map((array) => {
    return {
      label: `${array.name}`,
      data: array.array,
      backgroundColor: barColorArray[dataArray.indexOf(array) % 5],
      borderColor: `${cardColor}`,
      // borderColor: "#f2f2f2",
    }
  })

  const data = {
    labels: labels,
    datasets: dataObjectArray,
  }

  return (
    <div className="stats-card-chart">
      <div className="stats-card-title">
        {title}
        <div className="sub-text">{dataRangeText}</div>
        <div className="sub-sub-text">"Done" or "Partially done" tasks</div>
      </div>
      <div className="stacked-bar-chart-container">
        <Bar options={options} data={data} />
      </div>
      {/* <div className="card-bottom"></div> */}
    </div>
  )
}

export default StackedBarChart
