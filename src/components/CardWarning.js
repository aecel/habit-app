import toBeDemotedSvg from "../images/card-assets/to-be-demoted.svg"
import ReactTooltip from "react-tooltip"

const CardWarning = ({ habit }) => {
  return habit.isAboutToBeDemoted() ? (
    <div className="to-be-demoted-container">
      <img
        className="to-be-demoted-svg"
        data-tip={`You are about to break this habit. Immediately put a check in the last ${habit.readDaysToBreakHabit()} days to prevent this from happening.`}
        alt=""
        src={toBeDemotedSvg}
      />

      <ReactTooltip />
    </div>
  ) : (
    <></>
  )
}

export default CardWarning
