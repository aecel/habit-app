import CardLegend from "../components/CardLegend"
import Instructions from "../components/Instructions"
import NothingHere from "../components/NothingHere"
import StatsCard from "../components/StatsCard"
import { useHabits } from "../useHabits"

const Stats = () => {
  const habits = useHabits().habits
  const allHabits = habits.map((habit) => {
    return <StatsCard habit={habit} key={habit.readId()} />
  })

  return (
    <div className="cards-route-container">
      {allHabits.length === 0 ? (
        <NothingHere text={`Click on "Add Habit" to start forming habits!`} />
      ) : (
        <div>
          <Instructions />
          <div id="Stats" className="cards-route">
            {allHabits}
          </div>
        </div>
      )}
    </div>
  )
}

export default Stats
