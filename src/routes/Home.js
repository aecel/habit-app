import HabitCard from "../components/HabitCard"
import NothingHere from "../components/NothingHere"
import { useHabits } from "../useHabits"

const Home = () => {
  const habitFunctions = useHabits().habitFunctions
  const readUnstableHabits = habitFunctions.readUnstableHabits
  const unstableHabits = readUnstableHabits().map((habit) => {
    return <HabitCard habit={habit} key={habit.readId()} />
  })

  return (
    <div id="Home" className="cards-route">
      {unstableHabits.length === 0 ? (
        <NothingHere text={`Click on "Add Habit" to start forming habits!`} />
      ) : (
        unstableHabits
      )}
    </div>
  )
}

export default Home
