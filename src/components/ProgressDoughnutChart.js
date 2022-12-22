import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

const ProgressDoughnutChart = ({ habit }) => {
  ChartJS.register(ArcElement, Tooltip, Legend)
  const data = {
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        // label: "# of Votes",
        data: [
          habit.getCurrentStreak(),
          habit.readDaysToStableHabit() - habit.getCurrentStreak(),
        ],
        backgroundColor: ["rgb(20, 88, 32)", "rgb(242,242,242)"],
        borderWidth: 0,
        cutout: "80%",
      },
    ],
  }
  return (
    <div
      className="progress-doughnut-container"
      style={{
        position: "absolute",
        top: "6px",
        right: "10px",
        height: "45px",
        width: "45px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "22px",
          right: "13px",
          fontSize: "0.6rem",
        }}
      >
        {habit.getPercentageToStable()}
      </div>
      <Doughnut data={data} />
    </div>
  )
}

export default ProgressDoughnutChart
