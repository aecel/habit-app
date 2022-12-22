import NothingHere from "../components/NothingHere"
import StatsCard from "../components/StatsCard"
import { useHabits } from "../useHabits"

const Stats = () => {
  const habits = useHabits().habits
  const allHabits = habits.map((habit) => {
    return <StatsCard habit={habit} key={habit.readId()} />
  })

  return (
    <div id="Stats" className="cards-route">
      {allHabits.length === 0 ? (
        <NothingHere text={`Click on "Add Habit" to start forming habits!`} />
      ) : (
        allHabits
      )}
    </div>
  )
}

export default Stats
