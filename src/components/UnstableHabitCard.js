import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"
import brightCheck from "../images/card-assets/bright-check.svg"
import darkCheck from "../images/card-assets/dark-check.svg"
import WeekCalendar from "./WeekCalendar"
import CardOptions from "./CardOptions"
import ProgressDoughnutChart from "./ProgressDoughnutChart"

const UnstableHabitCard = ({ habit }) => {
  const habitFunctions = useHabits().habitFunctions
  const triToggleDay = habitFunctions.triToggleDay

  const today = new Date()
  const dayNow = today.getDate()
  const monthNow = today.getMonth() + 1
  const yearNow = today.getFullYear()

  const settings = useSettings().settings
  const colors = useSettings().colors
  const moreGreen = colors.moreGreen

  return (
    <div className="habit-card">
      {/* <div
        className="card-color-bar"
        style={{
          backgroundColor: "var(--dark-green)",
        }}
      ></div> */}
      <div
        className="habit-card-title"
        style={{
          color: `${
            settings.theme === "light" ? moreGreen : "var(--text-color)"
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
        doneCheck={settings.theme === "dark" ? brightCheck : darkCheck}
        halfCheck={settings.theme === "dark" ? darkCheck : brightCheck}
      />
      <div className="card-bottom"></div>
      <CardOptions habit={habit} />

      <ProgressDoughnutChart habit={habit} />
    </div>
  )
}

export default UnstableHabitCard
