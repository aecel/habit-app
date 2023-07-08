import React from "react"
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import { PolarArea } from "react-chartjs-2"

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

const PolarAreaChart = ({
  title,
  textColor,
  dataArray,
  dataRangeText,
  barColorArray,
  cardColor,
}) => {
  const options = {
    scales: {
      r: {
        // pointLabels: {
        //   color: "red",
        //   display: true,
        // },
        ticks: {
          color: textColor,
          backdropColor: cardColor,
        },
        grid: {
          color: textColor,
        },
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
            size: 14,
          },
          color: textColor,
          boxWidth: 20,
        },
      },
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
        backgroundColor: barColorArray,
        borderWidth: 1,
        borderColor: cardColor,
        color: textColor,
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
