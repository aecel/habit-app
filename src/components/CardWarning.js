import toBeDemotedSvg from "../images/card-assets/to-be-demoted.svg"
import ReactTooltip from "react-tooltip"

const CardWarning = ({ habit }) => {
  const tooltipText = `To prevent demotion to an unstable habit,<br />check the last ${habit.readDaysToBreakHabit()} days`
  return habit.isAboutToBeDemoted() ? (
    <div className="to-be-demoted-container">
      <img
        className="to-be-demoted-svg"
        data-tip={tooltipText}
        data-for="warning"
        alt=""
        src={toBeDemotedSvg}
      />

      <ReactTooltip multiline={true} id="warning" place="right" />
    </div>
  ) : (
    <></>
  )
}

export default CardWarning
