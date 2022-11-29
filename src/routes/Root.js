import "../styles/style.css"
import { HabitsProvider } from "../useHabits.js"
import { SettingsProvider } from "../useSettings"
import Main from "./Main"

const Root = () => {

  return (
    <SettingsProvider>
      <HabitsProvider>
        <Main />
      </HabitsProvider>
    </SettingsProvider>
  )
}

export default Root
