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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = ({ textColor }) => {
  const options = {
    maintainAspectRatio: false,
    offset: true,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        color: "fff",
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
        },
      },
      x: {
        ticks: {
          color: `${textColor}`,
        },
      },
    },
  }

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ]

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: ["#145820"],
        //   clip: false,
        //   minBarLength: 100,
      },
    ],
  }

  return <Bar options={options} data={data} />
}

export default BarChart
