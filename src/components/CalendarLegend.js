import { useSettings } from "../useSettings"

const CalendarLegend = () => {
  const settings = useSettings().settings
  const theme = settings.theme
  const cardLegend = settings.cardLegend
  const colors = useSettings().colors
  const moreGreen = colors.moreGreen
  const lessGreen = colors.lessGreen
  const moreGold = colors.moreGold
  const lessGold = colors.lessGold

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
        <div
          className="card-legend-circle"
          style={{
            backgroundColor: lessGreen,
          }}
        ></div>
        <div
          className="card-legend-circle"
          style={{
            backgroundColor: lessGold,
          }}
        ></div>
        <div>Task partially done</div>
      </div>
      <div className="card-legend-item">
        <div
          className="card-legend-circle"
          style={{
            backgroundColor: moreGreen,
          }}
        ></div>
        <div
          className="card-legend-circle"
          style={{
            backgroundColor: moreGold,
          }}
        ></div>
        <div>Task done</div>
      </div>
    </div>
  )
}

export default CalendarLegend
