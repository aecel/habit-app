import { useEffect, useState } from "react"
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

  const [lessGreen, setLessGreen] = useState("")
  const [moreGreen, setMoreGreen] = useState("")

  useEffect(() => {
    if (settings.theme === "light") {
      setMoreGreen("#006D32")
      setLessGreen("#39D353")
    } else {
      setMoreGreen("#39D353")
      setLessGreen("#006D32")
    }
  }, [settings.theme])
  return (
    <div id="Calendar">
      {habits.map((habit) => {
        return (
          <div className="calendar-card" key={habit.readId()}>
            <div
              style={{
                marginBottom: "0px",
              }}
            >
              {habit.readName()}
            </div>
            {/* <YearCalendar
              habit={habit}
              year={yearNow - 1}
              yearNow={yearNow}
              monthNow={monthNow}
              dayNow={dayNow}
              triToggleDay={triToggleDay}
              moreGreen={moreGreen}
              lessGreen={lessGreen}
            /> */}
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
