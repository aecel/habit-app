import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"
import CardOptions from "./CardOptions"
import CardStar from "./CardStar"
import MonthCalendar from "./MonthCalendar"
import YearCalendar from "./YearCalendar"

const StableCalendarCard = ({ habit }) => {
  const habitFunctions = useHabits().habitFunctions
  const triToggleDay = habitFunctions.triToggleDay

  const today = new Date()
  const dayNow = today.getDate()
  const monthNow = today.getMonth() + 1
  const yearNow = today.getFullYear()

  const colors = useSettings().colors
  const moreGold = colors.moreGold
  const lessGold = colors.lessGold

  return (
    <div className="calendar-card" key={habit.readId()}>
      <CardStar />
      <div className="calendar-card-title">{habit.readName()}</div>
      <MonthCalendar
        habit={habit}
        yearNow={yearNow}
        monthNow={monthNow}
        dayNow={dayNow}
        triToggleDay={triToggleDay}
        moreGreen={moreGold}
        lessGreen={lessGold}
      />
      <YearCalendar
        habit={habit}
        yearNow={yearNow}
        monthNow={monthNow}
        dayNow={dayNow}
        triToggleDay={triToggleDay}
        moreGreen={moreGold}
        lessGreen={lessGold}
      />
      <div className="card-bottom"></div>
      <CardOptions habit={habit} />
    </div>
  )
}

export default StableCalendarCard
