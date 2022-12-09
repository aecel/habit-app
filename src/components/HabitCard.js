import { useEffect, useState } from "react"
import WeekCalendar from "../components/WeekCalendar"
import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"
import starDark from "../images/card-assets/star-dark.svg"
import starLight from "../images/card-assets/star-light.svg"

const HabitCard = ({ habit }) => {
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
    <div
      className={
        habit.isStable()
          ? settings.theme === "dark"
            ? "dark-habit-card habit-card"
            : "light-habit-card habit-card"
          : "habit-card"
      }
    >
      {habit.isStable() ? (
        settings.theme === "dark" ? (
          <img className="card-star" src={starDark} alt="" />
        ) : (
          <img className="card-star" src={starLight} alt="" />
        )
      ) : (
        <></>
      )}
      {/* <h3
        style={{
          // marginTop: "0px",
          marginBottom: "0px",
          // textAlign: "center",
        }}
      >
        {habit.readName()}
      </h3> */}
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
}

export default HabitCard
