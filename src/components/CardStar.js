import ReactTooltip from "react-tooltip"
import starDark from "../images/card-assets/star-dark.svg"
import starLight from "../images/card-assets/star-light.svg"
import { useSettings } from "../useSettings"

const CardStar = ({ habit }) => {
  const settings = useSettings().settings
  const starDataTip = `Current Streak: ${habit.getCurrentStreak()} <br /> Best Streak: ${habit.getMaxStreak()}`
  return (
    <div className="card-star-container" data-tip={starDataTip} data-for="star">
      <img
        className="card-star"
        src={settings.theme === "dark" ? starDark : starLight}
        alt=""
      />
      <ReactTooltip multiline={true} id="star" place="left" />
    </div>
  )
}

export default CardStar
