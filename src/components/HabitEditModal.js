import { useEffect, useRef, useState } from "react"
import { useHabits } from "../useHabits"

const HabitEditModal = ({ triggerRef, habit }) => {
  const modalRef = useRef()
  const formRef = useRef()
  const habitFunctions = useHabits().habitFunctions
  const updateHabit = habitFunctions.updateHabit

  const popUpModal = () => {
    const modal = modalRef.current
    modal.style.display = "flex"
  }
  const closeModal = () => {
    modalRef.current.style.display = "none"
  }

  const [properties, setProperties] = useState({})
  const changeProperties = (parameter, event) => {
    const nextProperties = { ...properties }
    nextProperties[parameter] = event.target.value
    setProperties(nextProperties)
  }

  const isPositiveInteger = (value) => {
    if (Number.isInteger(Number(value)) && Number(value) >= 1) {
      return true
    }
    return false
  }

  const changeIntegerProperties = (parameter, event) => {
    const nextProperties = { ...properties }
    if (isPositiveInteger(event.target.value)) {
      nextProperties[parameter] = event.target.value
      setProperties(nextProperties)
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const form = formRef.current
    updateHabit({ id: habit.readId(), properties: properties })
    form.reset()
    closeModal()
  }

  useEffect(() => {
    const trigger = triggerRef.current
    trigger.addEventListener("click", popUpModal)

    return () => {
      trigger.removeEventListener("click", popUpModal)
    }
  }, [triggerRef])

  return (
    <div id="HabitEditModal" ref={modalRef}>
      <div className="habit-edit-box">
        <span className="close-modal" onClick={closeModal}>
          &times;
        </span>
        <form id="habit-edit-form" ref={formRef} onSubmit={onSubmit}>
          <div className="form-item">
            <div className="form-item">
              <label htmlFor="edit-habit-name">Name of Habit *</label>
              <input
                id="edit-habit-name"
                name="edit-habit-name"
                type="text"
                defaultValue={habit.readName()}
                onChange={(event) => {
                  changeProperties("newName", event)
                }}
              />
            </div>
            <div className="form-item">
              <label htmlFor="edit-trigger">
                Trigger <br></br>
                <div className="sub-text">
                  What am I doing before or after the habit?
                </div>
              </label>
              <textarea
                id="edit-trigger"
                name="edit-trigger"
                type="text"
                defaultValue={habit.readTrigger()}
                onChange={(event) => {
                  changeProperties("newTrigger", event)
                }}
              />
            </div>
            <div className="form-item">
              <label htmlFor="edit-immediate-reward">
                Immediate Reward <br></br>
                <div className="sub-text">
                  What do I get to have/do when I do the task?
                </div>
              </label>
              <textarea
                id="edit-immediate-reward"
                name="edit-immediate-reward"
                type="text"
                defaultValue={habit.readImmediateReward()}
                onChange={(event) => {
                  changeProperties("newImmediateReward", event)
                }}
              />
            </div>
            <div className="form-item">
              <label htmlFor="edit-days-to-stabilize">
                Number of Days to Stabilize Habit
              </label>
              <input
                id="edit-days-to-stabilize"
                name="edit-days-to-stabilize"
                type="text"
                defaultValue={habit.readDaysToStableHabit()}
                onChange={(event) => {
                  changeIntegerProperties("newDaysToStableHabit", event)
                }}
              />
            </div>
            <div className="form-item">
              <label htmlFor="edit-days-to-break">
                Number of Days to Break Habit
              </label>
              <input
                id="edit-days-to-break"
                name="edit-days-to-break"
                type="text"
                defaultValue={habit.readDaysToBreakHabit()}
                onChange={(event) => {
                  changeIntegerProperties("newDaysToBreakHabit", event)
                }}
              />
            </div>
            <button type="submit">Edit Habit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HabitEditModal
