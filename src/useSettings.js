import { createContext, useContext, useState } from "react"

const SettingsContext = createContext()
export const useSettings = () => useContext(SettingsContext)
export const SettingsProvider = ({ children }) => {
  const defaultSettings = {
    theme: "dark",
    daysToStableHabit: 66,
    unstableHabitLimit: 1,
    daysToBreakHabit: 3,
  }
  const [settings, setSettings] = useState(defaultSettings)

  const updateSettings = (propertiesToEdit) => {
    const nextSettings = { ...settings }
    for (const property in propertiesToEdit) {
      nextSettings[property] = propertiesToEdit[property]
    }
    setSettings(nextSettings)
  }

  const revertToDefaultSettings = () => {
    setSettings(defaultSettings)
  }

  const settingFunctions = {
    updateSettings,
    revertToDefaultSettings
  }
  
  return (
    <SettingsContext.Provider
      value={{
        settings: settings,
        settingFunctions: settingFunctions,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}