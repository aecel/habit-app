import { Outlet } from "react-router-dom"
import "../styles/style.css"

import ReactTooltip from "react-tooltip"
import { HabitsProvider } from "../useHabits.js"
import { SettingsProvider } from "../useSettings"
import NavBar from "../components/NavBar"

const Root = () => {
  return (
    <SettingsProvider>
      <HabitsProvider>
        <div className="Root">
          <div className="top-ghost-div"></div>
          <Outlet />
          <NavBar />
          <div className="bottom-ghost-div"></div>
          <ReactTooltip />
        </div>
      </HabitsProvider>
    </SettingsProvider>
  )
}

export default Root
