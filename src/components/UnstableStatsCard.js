import { useSettings } from "../useSettings"
import CardOptions from "./CardOptions"
import ProgressDoughnutChart from "./ProgressDoughnutChart"

const UnstableStatsCard = ({ habit }) => {
  const settings = useSettings().settings
  const colors = useSettings().colors

  return (
    <div className="stats-card" key={habit.readId()}>
      <div className="stats-card-title">{habit.readName()}</div>

      <div className="card-bottom"></div>

      <CardOptions habit={habit} />
    </div>
  )
}

export default UnstableStatsCard
