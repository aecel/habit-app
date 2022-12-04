import { useEffect, useState } from "react"
import WeekCalendar from "../components/WeekCalendar"
import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"

const Home = () => {
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
    <div id="Home">
      {habits.map((habit) => {
        return (
          <div className="home-card" key={habit.readId()}>
            <h3
              style={{
                marginBottom: "0px",
                textAlign: "center",
              }}
            >
              {habit.readName()}
            </h3>
            <WeekCalendar
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

export default Home
