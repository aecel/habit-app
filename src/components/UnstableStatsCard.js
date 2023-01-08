import { getMonthFromNum } from "../calendarFunctions"
import { useSettings } from "../useSettings"
import BarChart from "./BarChart"
import CardOptions from "./CardOptions"
import ProgressDoughnutChart from "./ProgressDoughnutChart"

const UnstableStatsCard = ({ habit }) => {
  const colors = useSettings().colors
  const textColor = colors.textColor
  const barColor = colors.moreGreen

  const today = new Date()
  const yearNow = today.getFullYear()
  const monthNow = getMonthFromNum(today.getMonth() + 1)
  const dayNow = today.getDate()

  const dataArray = habit.countGreenTasksThisYear()

  const dataRangeText = `${monthNow} ${dayNow} ${
    yearNow - 1
  } - ${monthNow} ${dayNow} ${yearNow}`

  return (
    <div className="stats-card" key={habit.readId()}>
      <div className="stats-card-title">
        {habit.readName()}
        <div className="sub-text">{dataRangeText}</div>
      </div>
      <BarChart
        textColor={textColor}
        dataArray={dataArray}
        barColor={barColor}
      />
      <div className="card-bottom"></div>
      <CardOptions habit={habit} />
      <ProgressDoughnutChart habit={habit} />
    </div>
  )
}

export default UnstableStatsCard
