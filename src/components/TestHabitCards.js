import { useEffect, useState } from "react"
import getDay from "../getDay"
import getDayDiff from "../getDayDiff"
import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"
import MonthCalendar from "./MonthCalendar"
import YearCalendar from "./YearCalendar"

const TestHabitCards = () => {
  const habits = useHabits().habits
  const habitFunctions = useHabits().habitFunctions
  const triToggleDay = habitFunctions.triToggleDay

  const today = new Date()
  const dayNow = today.getDate()
  const monthNow = today.getMonth() + 1
  const yearNow = today.getFullYear()
  console.log(getDay(yearNow, monthNow - 1, dayNow))

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
    <>
      <div className="habit-cards">
        {habits.map((habit) => {
          return (
            <div key={habit.readId()} className="habit-card">
              <p>Title: {habit.readName()}</p>
              <p>Id: {habit.readId()}</p>
              <p>Stable: {habit.isStable() ? "Sooo truue" : "False"}</p>
              <p>Trigger: {habit.readTrigger()}</p>
              <p>Immediate Reward: {habit.readImmediateReward()}</p>
              <p>Date Created: {habit.readDateCreated()}</p>
              <p>Green Tasks: {habit.countGreenTasks()}</p>
              <p>Streaks: {JSON.stringify(habit.getStreaks())}</p>
              <p>Longest Streak: {habit.getMaxStreak()}</p>
              <p>Current Streak: {habit.getCurrentStreak()}</p>
              <p>
                Last Updated:{" "}
                {habit.getLastUpdated() !== undefined
                  ? habit.readLastUpdated()
                  : "It's undefined bruh"}
              </p>
              <p>Last Missed Streak: {habit.getLastMissedStreak()}</p>
              <p>Days to Stabilize Habit: {habit.readDaysToStableHabit()}</p>
              <p>Days to Break Habit: {habit.readDaysToBreakHabit()}</p>
              <p>
                Day Diff: {getDayDiff(new Date(), habit.getLastUpdated())} days
              </p>
              <p>
                Is Update Needed? {habit.isUpdateNeeded() ? "Yeppers" : "Nope"}
              </p>
              <p>
                Is it about to be demoted?{" "}
                {habit.isAboutToBeDemoted() ? "Yep" : "Nope"}
              </p>
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
                year={2021}
                yearNow={yearNow}
                monthNow={monthNow}
                dayNow={dayNow}
                triToggleDay={triToggleDay}
                moreGreen={moreGreen}
                lessGreen={lessGreen}
              />
              <YearCalendar
                habit={habit}
                year={2022}
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
    </>
  )
}

export default TestHabitCards
