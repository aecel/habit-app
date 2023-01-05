import { useSettings } from "../useSettings"
import BarChart from "./BarChart"
import CardOptions from "./CardOptions"
import ProgressDoughnutChart from "./ProgressDoughnutChart"

const UnstableStatsCard = ({ habit }) => {
  const settings = useSettings().settings
  const colors = useSettings().colors
  const textColor = colors.textColor
  const barColor = colors.moreGreen

  const dataArray = habit.countGreenTasksByYear(2022)

  return (
    <div className="stats-card" key={habit.readId()}>
      <div className="stats-card-title">{habit.readName()}</div>
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
