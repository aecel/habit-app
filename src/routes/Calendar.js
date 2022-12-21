import CalendarCard from "../components/CalendarCard"
import NothingHere from "../components/NothingHere"
import { useHabits } from "../useHabits"

const Calendar = () => {
  const habits = useHabits().habits
  const calendarCards = habits.map((habit) => {
    return <CalendarCard habit={habit} key={habit.readId()} />
  })

  return (
    <div id="Calendar">
      {calendarCards.length === 0 ? <NothingHere /> : calendarCards}
    </div>
  )
}

export default Calendar
