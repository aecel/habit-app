import { useSettings } from "../useSettings"
import BarChart from "./BarChart"
import CardOptions from "./CardOptions"
import CardStar from "./CardStar"
import CardWarning from "./CardWarning"

const StableStatsCard = ({ habit }) => {
  const settings = useSettings().settings
  const colors = useSettings().colors
  const textColor = colors.textColor
  const barColor = colors.moreGold

  const dataArray = habit.countGreenTasksByYear(2022)

  return (
    <div className="stats-card" key={habit.readId()}>
      <CardStar habit={habit} />
      <div className="stats-card-title">{habit.readName()}</div>
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
