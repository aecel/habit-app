import { useEffect, useRef } from "react"
import { getMonthFromNum } from "../calendarFunctions"
import { useSettings } from "../useSettings"
import BarChart from "./BarChart"

const HabitInfoModal = ({ triggerRef, habit }) => {
  const colors = useSettings().colors
  const textColor = colors.textColor
  const barColorGold = colors.moreGold
  const barColorGreen = colors.moreGreen

  const dataArray = habit.countGreenTasksThisYear()

  const today = new Date()
  const yearNow = today.getFullYear()
  const monthNow = getMonthFromNum(today.getMonth() + 1)
  const dayNow = today.getDate()

  const dataRangeText = `${monthNow} ${dayNow} ${
    yearNow - 1
  } - ${monthNow} ${dayNow} ${yearNow}`

  const modalRef = useRef()
  const popUpModal = () => {
    const modal = modalRef.current
    modal.style.display = "flex"
  }
  const closeModal = () => {
    modalRef.current.style.display = "none"
  }
  useEffect(() => {
    const trigger = triggerRef.current
    trigger.addEventListener("click", popUpModal)

    return () => {
      trigger.removeEventListener("click", popUpModal)
    }
  }, [triggerRef])
  return (
    <div id="HabitInfoModal" ref={modalRef} onClick={closeModal}>
      <div className="habit-info-box" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={closeModal}>
          &times;
        </span>
        <div style={{ fontWeight: "bold" }}>{habit.readName()}</div>
        <div>{habit.isStable() ? "Stable Habit" : "Unstable Habit"}</div>
        <div>Trigger: {habit.readTrigger()}</div>
        <div>Immediate Reward: {habit.readImmediateReward()}</div>
        <div>Green/Gold Tasks: {habit.countGreenTasks()}</div>
        <div>Longest Streak: {habit.getMaxStreak()}</div>
        <div>Current Streak: {habit.getCurrentStreak()}</div>
        <div>Days to Stabilize Habit: {habit.readDaysToStableHabit()}</div>
        <div>Days to Break Habit: {habit.readDaysToBreakHabit()}</div>
        <div>
          Is it about to be demoted?{" "}
          {habit.isAboutToBeDemoted() ? "Yep" : "Nope"}
        </div>
        <div>Date Created: {habit.readDateCreated()}</div>
        <div>Last Updated: {habit.readLastUpdated()}</div>
        <div className="stats-card-title">
          {habit.readName()}
          <div className="sub-text">{dataRangeText}</div>
        </div>
        <BarChart
          textColor={textColor}
          dataArray={dataArray}
          barColor={habit.isStable() ? barColorGold : barColorGreen}
        />
      </div>
    </div>
  )
}

export default HabitInfoModal
