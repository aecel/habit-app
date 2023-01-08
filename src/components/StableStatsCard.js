import { getMonthFromNum } from "../calendarFunctions"
import { useSettings } from "../useSettings"
import BarChart from "./BarChart"
import CardOptions from "./CardOptions"
import CardStar from "./CardStar"
import CardWarning from "./CardWarning"

const StableStatsCard = ({ habit }) => {
  const colors = useSettings().colors
  const textColor = colors.textColor
  const barColor = colors.moreGold

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
      <CardStar habit={habit} />
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

      <CardWarning habit={habit} />
      <CardOptions habit={habit} />
    </div>
  )
}

export default StableStatsCard
