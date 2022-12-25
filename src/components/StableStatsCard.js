import { useSettings } from "../useSettings"
import CardOptions from "./CardOptions"
import CardStar from "./CardStar"
import CardWarning from "./CardWarning"

const StableStatsCard = ({ habit }) => {
  const settings = useSettings().settings
  const colors = useSettings().colors

  return (
    <div className="stats-card" key={habit.readId()}>
      <CardStar habit={habit} />
      <div className="stats-card-title">{habit.readName()}</div>

      <div className="card-bottom"></div>

      <CardWarning habit={habit} />
      <CardOptions habit={habit} />
    </div>
  )
}

export default StableStatsCard
