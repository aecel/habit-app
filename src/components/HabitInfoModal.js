import { useEffect, useRef } from "react"

const HabitInfoModal = ({ triggerRef, habit }) => {
  const modalRef = useRef()
  const popUpModal = () => {
    const modal = modalRef.current
    modal.style.display = "flex"
    // console.log("add event listener")
  }
  const closeModal = () => {
    modalRef.current.style.display = "none"
  }
  useEffect(() => {
    const trigger = triggerRef.current
    trigger.addEventListener("click", popUpModal)

    return () => {
      trigger.removeEventListener("click", popUpModal)
      // console.log("remove event listener")
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
        {/* <div>Green Tasks Array: {JSON.stringify(habit.countGreenTasksThisYear())}</div> */}
      </div>
    </div>
  )
}

export default HabitInfoModal
