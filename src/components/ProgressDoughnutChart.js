import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import ReactTooltip from "react-tooltip"

const ProgressDoughnutChart = ({ habit }) => {
  let chartDataTip
  if (habit.getDaysToGo() === 1) {
    chartDataTip = "1 day to go"
  } else {
    chartDataTip = `${habit.getDaysToGo()} days to go`
  }

  ChartJS.register(ArcElement, Tooltip, Legend)
  const data = {
    datasets: [
      {
        data: [habit.getCurrentStreak(), habit.getDaysToGo()],
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      data-tip={chartDataTip}
      data-for="doughnut"
    >
      <div
        style={{
          position: "absolute",
          top: "5px",
          right: "0px",
          fontSize: "0.6rem",
          height: "45px",
          width: "45px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {habit.getPercentageToStable()}
      </div>
      <Doughnut data={data} />
      <ReactTooltip place="left" id="doughnut" />
    </div>
  )
}

export default ProgressDoughnutChart
