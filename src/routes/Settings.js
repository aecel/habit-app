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
          <div className="form-item">
            <label htmlFor="daysToStableHabit">
              Number of Days to Stabilize Habit
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
              Number of Days to Break a Stable Habit
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
        <p>-----------------------------------------------------</p>
        <p>Theme: {settings.theme}</p>
        <p>Days to Stabilize Habit: {settings.daysToStableHabit}</p>
        <p>Days to Break Habit: {settings.daysToBreakHabit}</p>
        <p>Maximum Number of Unstable Habits: {settings.unstableHabitLimit}</p>
      </div>
    </div>
  )
}

export default Settings
