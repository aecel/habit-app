import HabitCard from "../components/HabitCard"
import { useHabits } from "../useHabits"

const AllHabits = () => {
  const habits = useHabits().habits

  return (
    <div id="AllHabits">
      {habits.map((habit) => {
        return <HabitCard habit={habit} />
      })}
    </div>
  )
}

export default AllHabits
