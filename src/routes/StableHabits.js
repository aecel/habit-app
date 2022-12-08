import { useEffect, useState } from "react"
import WeekCalendar from "../components/WeekCalendar"
import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"

const StableHabits = () => {
  const habits = useHabits().habits
  const habitFunctions = useHabits().habitFunctions
  const readStableHabits = habitFunctions.readStableHabits
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
    <div id="StableHabits">
      {readStableHabits().map((habit) => {
        return (
          <div className="stable-habits-card" key={habit.readId()}>
            <h3
              style={{
                // marginTop: "0px",
                marginBottom: "0px",
                // textAlign: "center",
              }}
            >
              {habit.readName()}
            </h3>
            <WeekCalendar
              habit={habit}
              year={yearNow}
              month={monthNow}
              day={dayNow}
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

export default StableHabits
