import CalendarCard from "../components/CalendarCard"
import { useHabits } from "../useHabits"

const Calendar = () => {
  const habits = useHabits().habits

  return (
    <div id="Calendar">
      {habits.map((habit) => {
        return <CalendarCard habit={habit} key={habit.readId()} />
      })}
    </div>
  )
}

export default Calendar
