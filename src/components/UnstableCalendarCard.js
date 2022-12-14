import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"
import CardOptions from "./CardOptions"
import MonthCalendar from "./MonthCalendar"
import ProgressDoughnutChart from "./ProgressDoughnutChart"
import YearCalendar from "./YearCalendar"

const UnstableCalendarCard = ({ habit }) => {
  const habitFunctions = useHabits().habitFunctions
  const triToggleDay = habitFunctions.triToggleDay

  const today = new Date()
  const dayNow = today.getDate()
  const monthNow = today.getMonth() + 1
  const yearNow = today.getFullYear()

  const colors = useSettings().colors
  const moreGreen = colors.moreGreen
  const lessGreen = colors.lessGreen

  return (
    <div className="calendar-card" key={habit.readId()}>
      <div className="calendar-card-title">{habit.readName()}</div>
      <MonthCalendar
        habit={habit}
        yearNow={yearNow}
        monthNow={monthNow}
        dayNow={dayNow}
        triToggleDay={triToggleDay}
        moreGreen={moreGreen}
        lessGreen={lessGreen}
      />
      <YearCalendar
        habit={habit}
        yearNow={yearNow}
        monthNow={monthNow}
        dayNow={dayNow}
        triToggleDay={triToggleDay}
        moreGreen={moreGreen}
        lessGreen={lessGreen}
      />
      <div className="card-bottom"></div>
      <CardOptions habit={habit} />
      <ProgressDoughnutChart habit={habit} />
    </div>
  )
}

export default UnstableCalendarCard
