import HabitCard from "../components/HabitCard"
import NothingHere from "../components/NothingHere"
import { useHabits } from "../useHabits"

const AllHabits = () => {
  const habits = useHabits().habits
  const allHabits = habits.map((habit) => {
    return <HabitCard habit={habit} key={habit.readId()} />
  })
  return (
    <div id="AllHabits" className="cards-route">
      {allHabits.length === 0 ? (
        <NothingHere text={`Click on "Add Habit" to start forming habits!`} />
      ) : (
        allHabits
      )}
    </div>
  )
}

export default AllHabits
