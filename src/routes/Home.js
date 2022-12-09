import HabitCard from "../components/HabitCard"
import { useHabits } from "../useHabits"

const Home = () => {
  const habitFunctions = useHabits().habitFunctions
  const readUnstableHabits = habitFunctions.readUnstableHabits

  return (
    <div id="Home">
      {readUnstableHabits().map((habit) => {
        return <HabitCard habit={habit} />
      })}
    </div>
  )
}

export default Home
