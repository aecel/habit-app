import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"
import CardOptions from "./CardOptions"
import CardStar from "./CardStar"
import MonthCalendar from "./MonthCalendar"
import YearCalendar from "./YearCalendar"
import CardWarning from "./CardWarning"
import { useEffect, useRef } from "react"
import party from "party-js"

const StableCalendarCard = ({ habit }) => {
  const habitFunctions = useHabits().habitFunctions
  const triToggleDay = habitFunctions.triToggleDay
  const habitDaysToGo = habit.getDaysToGo()

  const today = new Date()
  const dayNow = today.getDate()
  const monthNow = today.getMonth() + 1
  const yearNow = today.getFullYear()

  const colors = useSettings().colors
  const moreGold = colors.moreGold
  const lessGold = colors.lessGold

  // Sparkle effect when a habit gets promoted
  const habitCardRef = useRef()
  useEffect(() => {
    const habitCard = habitCardRef.current
    if (habitDaysToGo === 0) {
      party.sparkles(habitCard, {
        // Specify further (optional) configuration here.
        count: party.variation.range(10, 25),
        speed: party.variation.range(50, 300),
      })
    }
  }, [habitDaysToGo])

  return (
    <div className="calendar-card" key={habit.readId()} ref={habitCardRef}>
      <CardStar habit={habit} />
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

      <CardWarning habit={habit} />
      <CardOptions habit={habit} />
    </div>
  )
}

export default StableCalendarCard
