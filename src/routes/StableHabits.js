import HabitCard from "../components/HabitCard"
import { useHabits } from "../useHabits"

const StableHabits = () => {
  const habitFunctions = useHabits().habitFunctions
  const readStableHabits = habitFunctions.readStableHabits

  return (
    <div id="StableHabits">
      {readStableHabits().map((habit) => {
        return <HabitCard habit={habit} />
      })}
    </div>
  )
}

export default StableHabits
