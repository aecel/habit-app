import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import ReactTooltip from "react-tooltip"
import NavBar from "../components/NavBar"
import { useSettings } from "../useSettings"

const Main = () => {
  const settings = useSettings().settings
  const theme = settings.theme
  const textColor = `var(--${theme}-theme-text)`
  const bgColor = `var(--${theme}-theme-bg)`
  const cardColor = `var(--${theme}-theme-card)`

  // Setting the main document bg color here
  // Doesn't work when on style.css for some reason
  // Maybe because it's above <div id="root"> ???
  useEffect(() => {
    const html = document.getElementsByTagName("html")[0]
    html.style.backgroundColor = bgColor
    const body = document.getElementsByTagName("body")[0]
    body.style.backgroundColor = bgColor
    // body.style.margin = "0"
  }, [bgColor])

  return (
    <div
      id="Main"
      style={{
        "--text-color": textColor,
        "--bg-color": bgColor,
        "--card-color": cardColor,
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
