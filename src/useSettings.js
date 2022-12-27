import { createContext, useContext, useEffect, useState } from "react"

const SettingsContext = createContext()
export const useSettings = () => useContext(SettingsContext)
export const SettingsProvider = ({ children }) => {
  const defaultSettings = {
    theme: "dark",
    daysToStableHabit: 66,
    unstableHabitLimit: 2,
    daysToBreakHabit: 3,
    instructions: "off",
    cardLegend: "off",
  }
  const [settings, setSettings] = useState(defaultSettings)

  const colorsDark = {
    moreGreen: "#39D353",
    lessGreen: "#006D32",
    moreGold: "#FFD700",
    lessGold: "#605000",
  }

  const colorsLight = {
    moreGreen: "#006D32",
    lessGreen: "#39D353",
    moreGold: "#C0A900",
    lessGold: "#CCC076",
  }

  const [colors, setColors] = useState({})

  useEffect(() => {
    if (settings.theme === "light") {
      setColors(colorsLight)
    } else {
      setColors(colorsDark)
    }
  }, [settings.theme])

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
    revertToDefaultSettings,
  }

  return (
    <SettingsContext.Provider
      value={{
        settings: settings,
        settingFunctions: settingFunctions,
        colors: colors,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
