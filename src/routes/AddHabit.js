const AddHabit = () => {
  return (
    <div id="AddHabit">
      <form id="add-habit-form">
        <label htmlFor="habit-name">Name of Habit</label>
        <input id="habit-name" name="habit-name" type="text" required />
        <label htmlFor="stable">
          This is a stable habit (I have been doing this daily for 66 days or more)
        </label>
        <input id="stable" name="stable" type="checkbox" />
        <label htmlFor="trigger">
          Trigger (What am I doing before or after the habit?)
        </label>
        <input id="trigger" name="trigger" type="text" />
        <label htmlFor="immediate-reward">
          Immediate Reward (What do I get to have/do when I do the task?)
        </label>
        <input id="immediate-reward" name="immediate-reward" type="text" />
        <button id="add-habit-submit" type="submit">Add Habit</button>
      </form>
    </div>
  )
}

export default AddHabit
