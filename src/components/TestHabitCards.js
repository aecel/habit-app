import { useEffect, useRef, useState } from "react"
import getDayDiff from "../getDayDiff"
import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"
import ConfirmationModal from "./ConfirmationModal"
import YearCalendar from "./YearCalendar"

const TestHabitCards = () => {
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

  const confirmationModalRef = useRef()
  const popUpModal = () => {
    const modal = confirmationModalRef.current
    modal.style.display = "block"
  }

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
      <div className="test-habit-cards">
        {habits.map((habit) => {
          return (
            <div key={habit.readId()} className="test-habit-card">
              <div>Title: {habit.readName()}</div>
              <div>Id: {habit.readId()}</div>
              <div>Stable: {habit.isStable() ? "Sooo truue" : "False"}</div>
              <div>Trigger: {habit.readTrigger()}</div>
              <div>Immediate Reward: {habit.readImmediateReward()}</div>
              <div>Date Created: {habit.readDateCreated()}</div>
              <div>Green Tasks: {habit.countGreenTasks()}</div>
              <div>Streaks: {JSON.stringify(habit.getStreaks())}</div>
              <div>Longest Streak: {habit.getMaxStreak()}</div>
              <div>Current Streak: {habit.getCurrentStreak()}</div>
              <div>
                Last Updated:{" "}
                {habit.getLastUpdated() !== undefined
                  ? habit.readLastUpdated()
                  : "It's undefined bruh"}
              </div>
              <div>Last Missed Streak: {habit.getLastMissedStreak()}</div>
              <div>Days to Stabilize Habit: {habit.readDaysToStableHabit()}</div>
              <div>Days to Break Habit: {habit.readDaysToBreakHabit()}</div>
              <div>
                Day Diff: {getDayDiff(new Date(), habit.getLastUpdated())} days
              </div>
              <div>
                Is Update Needed? {habit.isUpdateNeeded() ? "Yeppers" : "Nope"}
              </div>
              <div>
                Is it about to be demoted?{" "}
                {habit.isAboutToBeDemoted() ? "Yep" : "Nope"}
              </div>
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
        <button onClick={popUpModal}>Click to Test ConfirmationModal</button>
        <ConfirmationModal
          modalRef={confirmationModalRef}
          func={() => {
            console.log("Clicked Yes!")
          }}
          text="Are you sure you want to blah blah blah blah blah blah blah?"
        />
      </div>
    </>
  )
}

export default TestHabitCards
