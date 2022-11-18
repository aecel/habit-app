import { useHabits } from "./Root"

const AddHabit = () => {
  const habitFunctions = useHabits().habitFunctions
  const submitAddHabitForm = habitFunctions.submitAddHabitForm

  return (
    <div id="AddHabit">
      <form id="add-habit-form">
        <div>All items with asterisk (*) are required</div>
        <div className="form-item">
          <label htmlFor="habit-name">Name of Habit *</label>
          <input id="habit-name" name="habit-name" type="text" required />
        </div>
        <div className="form-item-radios">
          <label>What kind of habit is this? *</label>
          <div className="form-item-radio">
            <input id="unstable" name="stability" type="radio" value="unstable" defaultChecked />
            <label htmlFor="unstable">This is a habit I want to form</label>
          </div>
          <div className="form-item-radio">
            <input id="stable" name="stability" type="radio" value="stable"/>
            <label htmlFor="stable">
              This is a stable habit <br></br>(I have been doing this daily for
              66 days or more)
            </label>
          </div>
        </div>
        <div className="form-item">
          <label htmlFor="trigger">
            Trigger <br></br>(What am I doing before or after the habit?)
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
            Immediate Reward <br></br>(What do I get to have/do when I do the
            task?)
          </label>
          <textarea
            id="immediate-reward"
            name="immediate-reward"
            type="text"
            placeholder="I get to have a glass of water or I get to take a deep breath"
          />
        </div>
        <button
          id="add-habit-submit"
          type="submit"
          onClick={submitAddHabitForm}
        >
          Add Habit
        </button>
      </form>
    </div>
  )
}

export default AddHabit
