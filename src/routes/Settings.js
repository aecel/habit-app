import { useSettings } from "../useSettings"

const Settings = () => {
  const settings = useSettings().settings

  return (
    <div id="Settings">
      <div id="settings-card">
        <p>Theme: {settings.theme}</p>
        <p>Days to Stabilize Habit: {settings.daysToStableHabit}</p>
        <p>Days to Break Habit: {settings.daysToBreakHabit}</p>
        <p>Maximum Number of Unstable Habits: {settings.unstableHabitLimit}</p>
      </div>
    </div>
  )
}

export default Settings
