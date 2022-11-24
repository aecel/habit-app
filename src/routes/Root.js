import { Outlet } from "react-router-dom"
import "../styles/style.css"

import ReactTooltip from "react-tooltip"
import { HabitsProvider } from "../useHabits.js"
import { SettingsProvider } from "../useSettings"
import NavBar from "../components/NavBar"
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
