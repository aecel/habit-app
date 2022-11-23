import { useEffect, useState } from "react"
import getDayDiff from "../getDayDiff"
import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"

const TestHabitCards = () => {
  const habits = useHabits().habits
  const habitFunctions = useHabits().habitFunctions
  const triToggleDay = habitFunctions.triToggleDay

  const today = new Date()
  const dayNow = today.getDate()
  const monthNow = today.getMonth() + 1
  const yearNow = today.getFullYear()

  const settings = useSettings().settings

  const [deepGreen, setDeepGreen] = useState("")
  const [green, setGreen] = useState("")

  const darkGray = "#1e242d"
  const darkerGray = "#0D1117"

  useEffect(() => {
    if (settings.theme === "light") {
      setGreen("#006D32")
      setDeepGreen("#39D353")
    } else {
      setGreen("#39D353")
      setDeepGreen("#006D32")
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
              <div className="calendar">
                {Object.entries(habit.readCalendar()[yearNow][monthNow]).map(
                  (day) => {
                    return (
                      <div
                        key={day[0]}
                        className="day"
                        onClick={
                          dayNow >= day[0]
                            ? () => {
                                triToggleDay({
                                  id: habit.readId(),
                                  year: yearNow,
                                  month: monthNow,
                                  day: day[0],
                                })
                              }
                            : () => {}
                        }
                        style={
                          dayNow >= day[0]
                            ? {
                                cursor: "pointer",
                                backgroundColor: `${
                                  day[1]["done"] === "so true"
                                    ? `${green}`
                                    : day[1]["done"] === "half-assed"
                                    ? `${deepGreen}`
                                    : "var(--bg-color)"
                                }`,
                                color: `${
                                  day[1]["done"] === "so true" ||
                                  day[1]["done"] === "half-assed"
                                    ? "var(--white)"
                                    : "var(--dark-gray)"
                                }`,
                              }
                            : {
                                backgroundColor: "var(--card-color)",
                              }
                        }
                      >
                        {day[0]}
                      </div>
                    )
                  }
                )}
              </div>
              <div className="year-calendar">
                {Object.entries(habit.readCalendar()[yearNow]).map((month) => {
                  return Object.entries(month[1]).map((day) => {
                    return (
                      <div
                        key={day[0]}
                        data-key={day[0]}
                        className="year-calendar-day"
                        onClick={
                          (dayNow >= day[0] && monthNow === Number(month[0])) ||
                          monthNow > month[0]
                            ? () => {
                                triToggleDay({
                                  id: habit.readId(),
                                  year: yearNow,
                                  month: month[0],
                                  day: day[0],
                                })
                              }
                            : () => {}
                        }
                        style={
                          (dayNow >= day[0] && monthNow === Number(month[0])) ||
                          monthNow > month[0]
                            ? {
                                cursor: "pointer",
                                backgroundColor: `${
                                  day[1]["done"] === "so true"
                                    ? `${green}`
                                    : day[1]["done"] === "half-assed"
                                    ? `${deepGreen}`
                                    : "var(--bg-color)"
                                }`,
                                color: `${
                                  day[1]["done"] === "so true" ||
                                  day[1]["done"] === "half-assed"
                                    ? "var(--white)"
                                    : "var(--dark-gray)"
                                }`,
                              }
                            : {
                                backgroundColor: "var(--card-color)",
                              }
                        }
                      >
                        {day[0]}
                      </div>
                    )
                  })
                })}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default TestHabitCards
