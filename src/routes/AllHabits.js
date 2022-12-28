import CardLegend from "../components/CardLegend"
import HabitCard from "../components/HabitCard"
import Instructions from "../components/Instructions"
import NothingHere from "../components/NothingHere"
import { useHabits } from "../useHabits"

const AllHabits = () => {
  const habits = useHabits().habits
  const allHabits = habits.map((habit) => {
    return <HabitCard habit={habit} key={habit.readId()} />
  })
  return (
    <>
      {allHabits.length === 0 ? (
        <NothingHere text={`Click on "Add Habit" to start forming habits!`} />
      ) : (
        <div className="cards-route-container">
          <Instructions />
          <div id="AllHabits" className="cards-route">
            {allHabits}
          </div>
          <CardLegend />
        </div>
      )}
    </>
  )
}

export default AllHabits
