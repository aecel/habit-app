import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"
import doneCheckDark from "../images/card-assets/check-done-dark.svg"
import halfCheckDark from "../images/card-assets/check-half-dark.svg"
import doneCheckLight from "../images/card-assets/check-done-light.svg"
import halfCheckLight from "../images/card-assets/check-half-light.svg"
import WeekCalendar from "./WeekCalendar"
import CardStar from "./CardStar"
import CardOptions from "./CardOptions"
import CardWarning from "./CardWarning"
import { useEffect, useRef } from "react"
import party from "party-js"

const StableHabitCard = ({ habit }) => {
  const habitFunctions = useHabits().habitFunctions
  const triToggleDay = habitFunctions.triToggleDay
  const habitDaysToGo = habit.getDaysToGo()

  const today = new Date()
  const dayNow = today.getDate()
  const monthNow = today.getMonth() + 1
  const yearNow = today.getFullYear()

  const settings = useSettings().settings

  const colors = useSettings().colors
  const moreGold = colors.moreGold

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
    <div
      className={
        settings.theme === "dark"
          ? "dark-habit-card habit-card"
          : "light-habit-card habit-card"
      }
      ref={habitCardRef}
    >
      <div
        className="card-color-bar"
        style={{
          backgroundColor: moreGold,
        }}
      ></div>
      <CardStar habit={habit} />
      <div
        className="habit-card-title"
        style={{
          color: `${
            settings.theme === "light" ? moreGold : "var(--text-color)"
          }`,
        }}
      >
        {habit.readName()}
      </div>
      <WeekCalendar
        habit={habit}
        year={yearNow}
        month={monthNow}
        day={dayNow}
        yearNow={yearNow}
        monthNow={monthNow}
        dayNow={dayNow}
        triToggleDay={triToggleDay}
        doneCheck={settings.theme === "dark" ? doneCheckDark : doneCheckLight}
        halfCheck={settings.theme === "dark" ? halfCheckDark : halfCheckLight}
      />
      <div className="card-bottom"></div>

      <CardWarning habit={habit} />
      <CardOptions habit={habit} />
    </div>
  )
}

export default StableHabitCard
