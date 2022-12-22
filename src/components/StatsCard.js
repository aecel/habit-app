import StableStatsCard from "./StableStatsCard"
import UnstableStatsCard from "./UnstableStatsCard"

const StatsCard = ({ habit }) => {
  return habit.isStable() ? (
    <StableStatsCard habit={habit} />
  ) : (
    <UnstableStatsCard habit={habit} />
  )
}

export default StatsCard
