import brightGreenCheck from "../images/card-assets/bright-check.svg"
import darkGreenCheck from "../images/card-assets/dark-check.svg"

import doneCheckDark from "../images/card-assets/check-done-dark.svg"
import halfCheckDark from "../images/card-assets/check-half-dark.svg"
import doneCheckLight from "../images/card-assets/check-done-light.svg"
import halfCheckLight from "../images/card-assets/check-half-light.svg"
import { useSettings } from "../useSettings"

const CardLegend = () => {
  const settings = useSettings().settings
  const theme = settings.theme
  const cardLegend = settings.cardLegend

  return (
    <div
      className="card-legend"
      style={{
        display: `${cardLegend === "on" ? "flex" : "none"}`,
      }}
    >
      <div className="card-legend-item">
        <div
          className="card-legend-circle"
          style={{
            backgroundColor: `${
              theme === "dark" ? "rgb(58, 58, 58)" : "white"
            }`,
          }}
        ></div>
        <div>Task not done</div>
      </div>
      <div className="card-legend-item">
        <img
          className="card-legend-svg"
          alt=""
          src={theme === "dark" ? darkGreenCheck : brightGreenCheck}
        />
        <img
          className="card-legend-svg"
          alt=""
          src={theme === "dark" ? halfCheckDark : halfCheckLight}
        />
        <div>Task partially done</div>
      </div>
      <div className="card-legend-item">
        <img
          className="card-legend-svg"
          alt=""
          src={theme === "dark" ? brightGreenCheck : darkGreenCheck}
        />
        <img
          className="card-legend-svg"
          alt=""
          src={theme === "dark" ? doneCheckDark : doneCheckLight}
        />
        <div>Task done</div>
      </div>
    </div>
  )
}

export default CardLegend
