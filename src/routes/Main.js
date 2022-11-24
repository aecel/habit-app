import { Outlet } from "react-router-dom"
import ReactTooltip from "react-tooltip"
import NavBar from "../components/NavBar"
import { useSettings } from "../useSettings"

const Main = () => {
  const settings = useSettings().settings
  return (
    <div
      className="Root"
      style={{
        "--text-color": `var(--${settings.theme}-theme-text)`,
        "--bg-color": `var(--${settings.theme}-theme-bg)`,
        "--card-color": `var(--${settings.theme}-theme-card)`,
      }}
    >
      <div className="top-ghost-div"></div>
      <Outlet />
      <NavBar />
      <div className="bottom-ghost-div"></div>
      <ReactTooltip />
    </div>
  )
}

export default Main
