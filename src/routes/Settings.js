import { useSettings } from "../useSettings"

const Settings = () => {
  const settings = useSettings().settings
  const settingFunctions = useSettings().settingFunctions
  const updateSettings = settingFunctions.updateSettings

  const isPositiveInteger = (value) => {
    if (Number.isInteger(Number(value)) && Number(value) >= 1) {
      return true
    }
    return false
  }

  const updateTheme = (event) => {
    const theme = event.target.value
    updateSettings({ theme: `${theme}` })
  }

  const updateInstructions = (event) => {
    const instructions = event.target.value
    updateSettings({ instructions: `${instructions}` })
  }

  const updateLegend = (event) => {
    const legend = event.target.value
    updateSettings({ cardLegend: `${legend}` })
  }

  const updateIntegerSettingProperty = (event) => {
    const propertyKey = event.target.id
    const property = {}
    if (isPositiveInteger(event.target.value)) {
      property[`${propertyKey}`] = event.target.value
      updateSettings(property)
    }
  }

  return (
    <div id="Settings">
      <div id="settings-card">
        <h3>Settings</h3>
        <p>
          Warning: All changes will take effect immediately without
          confirmation.
        </p>
        <form id="settings-form" action="">
          <div className="form-item-radios">
            <label>Theme</label>
            <div className="form-item-radio">
              <input
                id="dark"
                name="theme"
                type="radio"
                value="dark"
                checked={settings.theme === "dark"}
                onChange={updateTheme}
              />
              <label htmlFor="dark">Dark</label>
            </div>
            <div className="form-item-radio">
              <input
                id="light"
                name="theme"
                type="radio"
                value="light"
                checked={settings.theme === "light"}
                onChange={updateTheme}
              />
              <label htmlFor="light">Light</label>
            </div>
          </div>

          <div className="form-item-radios">
            <label>
              Text Instructions on Top
              <div className="sub-text">
                Shows/hides the text instructions on All Habits, Stable Habits,
                and Calendar
              </div>
            </label>
            <div className="form-item-radio">
              <input
                id="instructions-on"
                name="instructions"
                type="radio"
                value="on"
                checked={settings.instructions === "on"}
                onChange={updateInstructions}
              />
              <label htmlFor="instructions-on">Show</label>
            </div>
            <div className="form-item-radio">
              <input
                id="instructions-off"
                name="instructions"
                type="radio"
                value="off"
                checked={settings.instructions === "off"}
                onChange={updateInstructions}
              />
              <label htmlFor="instructions-off">Hide</label>
            </div>
          </div>

          <div className="form-item-radios">
            <label>
              Legend at the Bottom
              <div className="sub-text">
                Shows/hides the legend on All Habits, Stable Habits, and
                Calendar
              </div>
            </label>
            <div className="form-item-radio">
              <input
                id="legend-on"
                name="legend"
                type="radio"
                value="on"
                checked={settings.cardLegend === "on"}
                onChange={updateLegend}
              />
              <label htmlFor="legend-on">Show</label>
            </div>
            <div className="form-item-radio">
              <input
                id="legend-off"
                name="legend"
                type="radio"
                value="off"
                checked={settings.cardLegend === "off"}
                onChange={updateLegend}
              />
              <label htmlFor="legend-off">Hide</label>
            </div>
          </div>
          <div className="form-item">
            <label htmlFor="daysToStableHabit">
              Number of Days to Stabilize a Habit<br></br>
              <div className="sub-text">
                This will only apply to newly added unstable habits.<br></br>
                <br></br>
                66 is the average, but it can take anywhere from <br></br>
                18 days to 254 days for people to form a new habit.
              </div>
            </label>
            <input
              id="daysToStableHabit"
              name="daysToStableHabit"
              type="text"
              value={settings.daysToStableHabit}
              onChange={updateIntegerSettingProperty}
            />
          </div>
          <div className="form-item">
            <label htmlFor="daysToBreakHabit">
              Grace Period (days)<br></br>
              <div className="sub-text">
                The number of days to break a stable habit.
                Also the number of days that will break your streak towards
                stabilizing an unstable habit.
                This will only apply to newly added habits.
              </div>
            </label>
            <input
              id="daysToBreakHabit"
              name="daysToBreakHabit"
              type="text"
              value={settings.daysToBreakHabit}
              onChange={updateIntegerSettingProperty}
            />
          </div>
          <div className="form-item">
            <label htmlFor="unstableHabitLimit">
              Maximum Number of Unstable Habits
              <div className="sub-text">
                These are the habits you want to form.<br></br>
                It is advised to focus on only a few.<br></br>
                1-3 is recommended to prevent being overwhelmed.
              </div>
            </label>
            <input
              id="unstableHabitLimit"
              name="unstableHabitLimit"
              type="text"
              value={settings.unstableHabitLimit}
              onChange={updateIntegerSettingProperty}
            />
          </div>
        </form>
        {/* <p>-----------------------------------------------------</p>
        <p>Theme: {settings.theme}</p>
        <p>Days to Stabilize Habit: {settings.daysToStableHabit}</p>
        <p>Days to Break Habit: {settings.daysToBreakHabit}</p>
        <p>Maximum Number of Unstable Habits: {settings.unstableHabitLimit}</p> */}
      </div>
    </div>
  )
}

export default Settings
