import CalendarCard from "../components/CalendarCard"
import CardLegend from "../components/CardLegend"
import Instructions from "../components/Instructions"
import NothingHere from "../components/NothingHere"
import { useHabits } from "../useHabits"

const Calendar = () => {
  const habits = useHabits().habits
  const calendarCards = habits.map((habit) => {
    return <CalendarCard habit={habit} key={habit.readId()} />
  })

  return (
    <div className="cards-route-container">
      {calendarCards.length === 0 ? (
        <NothingHere text={`Click on "Add Habit" to start forming habits!`} />
      ) : (
        <div>
          <Instructions />
          <div id="Calendar">{calendarCards}</div>
        </div>
      )}
    </div>
  )
}

export default Calendar
