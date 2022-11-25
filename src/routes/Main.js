import { Outlet } from "react-router-dom"
import ReactTooltip from "react-tooltip"
import NavBar from "../components/NavBar"
import { useSettings } from "../useSettings"

const Main = () => {
  const settings = useSettings().settings
  const theme = settings.theme

  return (
    <div
      id="Main"
      style={{
        "--text-color": `var(--${theme}-theme-text)`,
        "--bg-color": `var(--${theme}-theme-bg)`,
        "--card-color": `var(--${theme}-theme-card)`,
      }}
    >
      <div className="top-ghost-div"></div>
      <Outlet />
      <div className="bottom-ghost-div"></div>
      <NavBar />
      <ReactTooltip />
    </div>
  )
}

export default Main