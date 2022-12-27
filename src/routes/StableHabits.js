import CardLegend from "../components/CardLegend"
import HabitCard from "../components/HabitCard"
import Instructions from "../components/Instructions"
import NothingHere from "../components/NothingHere"
import { useHabits } from "../useHabits"

const StableHabits = () => {
  const habitFunctions = useHabits().habitFunctions
  const readStableHabits = habitFunctions.readStableHabits
  const stableHabits = readStableHabits().map((habit) => {
    return <HabitCard habit={habit} key={habit.readId()} />
  })

  return (
    <div className="cards-route-container">
      {stableHabits.length === 0 ? (
        <NothingHere text={"Promote a habit to see them here!"} />
      ) : (
        <div>
          <Instructions />
          <div id="StableHabits" className="cards-route">
            {stableHabits}
          </div>
          <CardLegend />
        </div>
      )}
    </div>
  )
}

export default StableHabits
