import HabitCard from "../components/HabitCard"
import NothingHere from "../components/NothingHere"
import { useHabits } from "../useHabits"

const StableHabits = () => {
  const habitFunctions = useHabits().habitFunctions
  const readStableHabits = habitFunctions.readStableHabits
  const stableHabits = readStableHabits().map((habit) => {
    return <HabitCard habit={habit} key={habit.readId()} />
  })

  return (
    <div id="StableHabits" className="cards-route">
      {stableHabits.length === 0 ? <NothingHere /> : stableHabits}
    </div>
  )
}

export default StableHabits
