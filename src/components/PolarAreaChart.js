import React from "react"
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import { PolarArea } from "react-chartjs-2"
import { getThisYearInMonthsArray } from "../calendarFunctions"
import { getShadesArray } from "../colorFunctions"

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

// Change such that it graphs from last year same month
const PolarAreaChart = ({
  title,
  textColor,
  dataArray,
  dataRangeText,
  barColorArray,
  cardColor,
}) => {
  const options = {
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
  }

  const dataLabels = dataArray.map((habitObj) => habitObj.name)
  const dataTotal = dataArray.map((habitObj) => habitObj.total)

  const data = {
    labels: dataLabels,
    datasets: [
      {
        // label: "# of Votes",
        data: dataTotal,
        backgroundColor: getShadesArray("#145820"),
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="stats-card-chart">
      <div className="stats-card-title">
        {title}
        <div className="sub-text">{dataRangeText}</div>
        <div className="sub-sub-text">"Done" or "Partially done" tasks</div>
      </div>
      <div className="stacked-bar-chart-container">
        <PolarArea options={options} data={data} />
      </div>
    </div>
  )
}

export default PolarAreaChart
