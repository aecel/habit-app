import { useEffect } from "react"
import HabitCard from "../components/HabitCard"
import { useHabits } from "../useHabits"

const Home = () => {
  const habitFunctions = useHabits().habitFunctions
  const readUnstableHabits = habitFunctions.readUnstableHabits
  return (
    <div id="Home" className="cards-route">
      {readUnstableHabits().map((habit) => {
        return <HabitCard habit={habit} key={habit.readId()} />
      })}
    </div>
  )
}

export default Home
