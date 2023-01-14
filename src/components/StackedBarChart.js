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
import getRandomGreenArray from "../getRandomGreenArray"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Change such that it graphs from last year same month
const StackedBarChart = ({ textColor, dataArray, total }) => {

  const options = {
    // elements: {
    //   bar: {
    //     borderWidth: 1,
    //   }
    // },
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
  const greenArray = getRandomGreenArray(dataArray.length)
  const dataObjectArray = dataArray.map((array) => {
    return {
      label: `${array.name}`,
      data: array.array,
      backgroundColor: greenArray[dataArray.indexOf(array)],
      borderColor: "white"
    }
  })

  const data = {
    labels: labels,
    datasets: dataObjectArray,
  }
  
  return (
    <div>
      <div className="bar-chart-container">
        <Bar options={options} data={data} />
      </div>
      <div className="stats-card-text">
        Total Green/Gold Tasks: {total}
      </div>
    </div>
  )
}

export default StackedBarChart
