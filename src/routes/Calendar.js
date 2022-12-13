import { useEffect, useState } from "react"
import CardStar from "../components/CardStar"
import MonthCalendar from "../components/MonthCalendar"
import YearCalendar from "../components/YearCalendar"
import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"

const Calendar = () => {
  const habits = useHabits().habits
  const habitFunctions = useHabits().habitFunctions
  const triToggleDay = habitFunctions.triToggleDay

  const today = new Date()
  const dayNow = today.getDate()
  const monthNow = today.getMonth() + 1
  const yearNow = today.getFullYear()

  const settings = useSettings().settings
  const colors = useSettings().colors
  const moreGreen = colors.moreGreen
  const lessGreen = colors.lessGreen

  return (
    <div id="Calendar">
      {habits.map((habit) => {
        return (
          <div className="calendar-card" key={habit.readId()}>
            {habit.isStable() ? <CardStar /> : <></>}
            <div
              style={{
                marginBottom: "0px",
              }}
            >
              {habit.readName()}
            </div>
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
          </div>
        )
      })}
    </div>
  )
}

export default Calendar
