import toBeDemotedSvg from "../images/card-assets/to-be-demoted.svg"
import ReactTooltip from "react-tooltip"

const CardWarning = ({ habit }) => {
  const tooltipText = `You are about to break this habit. <br /> Put a check in the last ${habit.readDaysToBreakHabit()} days <br />to prevent this from happening.`
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
