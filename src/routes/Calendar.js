import CalendarCard from "../components/CalendarCard"
import CalendarLegend from "../components/CalendarLegend"
import Instructions from "../components/Instructions"
import NothingHere from "../components/NothingHere"
import { useHabits } from "../useHabits"

const Calendar = () => {
  const habits = useHabits().habits
  const calendarCards = habits.map((habit) => {
    return <CalendarCard habit={habit} key={habit.readId()} />
  })

  return (
    <>
      {calendarCards.length === 0 ? (
        <NothingHere text={`Click on "Add Habit" to start forming habits!`} />
      ) : (
        <div className="cards-route-container">
          <Instructions />
          <div id="Calendar">{calendarCards}</div>
          <CalendarLegend />
        </div>
      )}
    </>
  )
}

export default Calendar
