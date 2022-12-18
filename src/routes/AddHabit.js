import { useEffect, useRef, useState } from "react"
import AddHabitModal from "../components/AddHabitModal"
import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"

const AddHabit = () => {
  const settings = useSettings().settings
  const habitFunctions = useHabits().habitFunctions
  const createHabit = habitFunctions.createHabit
  const readUnstableHabits = habitFunctions.readUnstableHabits
  const formRef = useRef()
  const modalRef = useRef()
  const inputNameRef = useRef()

  const submitAddHabitForm = (form) => {
    const formData = new FormData(form)
    const name = formData.get("habit-name")
    const stability = formData.get("stability")
    let stable
    if (stability === "stable") {
      stable = true
    } else {
      stable = false
    }
    const trigger = formData.get("trigger")
    const immediateReward = formData.get("immediate-reward")

    const properties = {
      name,
      stable,
      trigger,
      immediateReward,
      daysToStableHabit: settings.daysToStableHabit,
      daysToBreakHabit: settings.daysToBreakHabit,
    }
    createHabit(properties)
    form.reset()
  }

  // We only use this name for the AddHabitModal pop-up
  const [habitName, setHabitName] = useState()

  const onSubmit = (event) => {
    setHabitName(inputNameRef.current.value)
    const modal = modalRef.current
    event.preventDefault()
    submitAddHabitForm(formRef.current)
    modal.style.display = "block"
    setTimeout(() => {
      modal.style.display = "none"
    }, 5000)
  }

  // For checking if maximum number of unstable habits is reached
  // If limit has been reached, the radio button input for unstable habit is disabled
  const unstableHabitRef = useRef()
  const unstableLabelRef = useRef()
  useEffect(() => {
    const unstableHabit = unstableHabitRef.current
    const unstableLabel = unstableLabelRef.current
    if (readUnstableHabits().length >= settings.unstableHabitLimit) {
      unstableHabit.disabled = true
      unstableHabit.defaultChecked = false
      const mainText = unstableLabel.getElementsByClassName("unstable-text")[0]
      mainText.style.textDecoration = "line-through"
      const subtext = unstableLabel.getElementsByClassName("sub-text")[0]
      subtext.style.whiteSpace = "pre-line"
      subtext.textContent =
        "Limit has been reached. \r\nGo to settings to add more."
    } else {
      unstableHabit.defaultChecked = true
    }
  }, [settings.unstableHabitLimit, readUnstableHabits])

  return (
    <div id="AddHabit">
      <div id="add-habit-card">
        <h3>Add a Habit</h3>
        <div>All items with an asterisk (*) are required</div>
        <form id="add-habit-form" ref={formRef} action="" onSubmit={onSubmit}>
          <div className="form-item">
            <label htmlFor="habit-name">Name of Habit *</label>
            <input
              ref={inputNameRef}
              id="habit-name"
              name="habit-name"
              type="text"
              required
            />
          </div>
          <div className="form-item-radios">
            <label>What kind of habit is this? *</label>
            <div className="form-item-radio">
              <input
                id="unstable"
                name="stability"
                type="radio"
                value="unstable"
                ref={unstableHabitRef}
                required
              />
              <label htmlFor="unstable" ref={unstableLabelRef}>
                <div className="unstable-text">
                  This is a habit I want to form.
                </div>
                <div className="sub-text"></div>
              </label>
            </div>
            <div className="form-item-radio">
              <input
                id="stable"
                name="stability"
                type="radio"
                value="stable"
                required
              />
              <label htmlFor="stable">
                This is a stable habit. <br></br>
                <div className="sub-text">
                  I have been doing this daily <br></br>for 66 days or more
                </div>
              </label>
            </div>
          </div>
          <div className="form-item">
            <label htmlFor="trigger">
              Trigger <br></br>
              <div className="sub-text">
                What am I doing before or after the habit?
              </div>
            </label>
            <textarea
              id="trigger"
              name="trigger"
              type="text"
              placeholder="After I wake up or Before I go out"
            />
          </div>
          <div className="form-item">
            <label htmlFor="immediate-reward">
              Immediate Reward <br></br>
              <div className="sub-text">
                What do I get to have/do when I do the task?
              </div>
            </label>
            <textarea
              id="immediate-reward"
              name="immediate-reward"
              type="text"
              placeholder="I get to have a glass of water or I get to take a deep breath"
            />
          </div>
          <button id="add-habit-submit" type="submit">
            Add Habit
          </button>
          <AddHabitModal name={habitName} modalRef={modalRef} />
        </form>
      </div>
    </div>
  )
}

export default AddHabit
