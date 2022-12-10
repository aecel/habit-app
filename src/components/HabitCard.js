import StableHabitCard from "./StableHabitCard"
import UnstableHabitCard from "./UnstableHabitCard"

const HabitCard = ({ habit }) => {
  return habit.isStable() ? (
    <StableHabitCard habit={habit} />
  ) : (
    <UnstableHabitCard habit={habit} />
  )
}

export default HabitCard