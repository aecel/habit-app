import { useEffect, useState } from "react"
import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"
import doneCheckDark from "../images/card-assets/check-done-dark.svg"
import halfCheckDark from "../images/card-assets/check-half-dark.svg"
import doneCheckLight from "../images/card-assets/check-done-light.svg"
import halfCheckLight from "../images/card-assets/check-half-light.svg"
import WeekCalendar from "./WeekCalendar"
import CardStar from "./CardStar"

const StableHabitCard = ({ habit }) => {
  const habitFunctions = useHabits().habitFunctions
  const triToggleDay = habitFunctions.triToggleDay

  const today = new Date()
  const dayNow = today.getDate()
  const monthNow = today.getMonth() + 1
  const yearNow = today.getFullYear()

  const settings = useSettings().settings

  const colors = useSettings().colors
  const moreGold = colors.moreGold

  return (
    <div
      className={
        settings.theme === "dark"
          ? "dark-habit-card habit-card"
          : "light-habit-card habit-card"
      }
    >
      <div
        className="card-color-bar"
        style={{
          backgroundColor: moreGold,
        }}
      ></div>
      <CardStar />
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
      <div className="card-options">
        <div className="card-options-circle"></div>
        <div className="card-options-circle"></div>
        <div className="card-options-circle"></div>
      </div>
    </div>
  )
}

export default StableHabitCard
