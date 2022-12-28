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

const options = {
  offset: true,
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Bar Chart",
    // },
  },
}

const labels = ["January", "February", "March", "April", "May", "June", "July"]

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        "rgb(255, 99, 132, 0.2)",
        "rgb(255, 159, 64, 0.2)",
        "rgb(255, 205, 86, 0.2)",
        "rgb(75, 192, 192, 0.2)",
        "rgb(54, 162, 235, 0.2)",
        "rgb(153, 102, 255, 0.2)",
        "rgb(201, 203, 207, 0.2)",
      ],

      //   clip: false,
      //   minBarLength: 100,
    },
  ],
}

const BarChart = () => {
  return <Bar options={options} data={data} />
}

export default BarChart
