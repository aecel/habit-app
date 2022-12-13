import { useRef } from "react"
import ReactTooltip from "react-tooltip"
import { useHabits } from "../useHabits"

const CardOptions = ({ habit }) => {
  const habitFunctions = useHabits().habitFunctions
  const deleteHabit = habitFunctions.deleteHabit

  const cardOptionsPopUpRef = useRef()
  const togglePopUp = () => {
    if (cardOptionsPopUpRef.current.style.display === "flex") {
      cardOptionsPopUpRef.current.style.display = "none"
    } else {
      cardOptionsPopUpRef.current.style.display = "flex"
    }
  }

  return (
    <div className="card-options">
      <div className="card-options-popup" ref={cardOptionsPopUpRef}>
        <div className="card-options-popup-circle" data-tip="More Info"></div>
        <div className="card-options-popup-circle" data-tip="Edit"></div>
        <div
          className="card-options-popup-circle"
          data-tip="Delete"
          onClick={() => {
            deleteHabit(habit.readId())
          }}
        ></div>
      </div>
      <div
        className="card-options-button"
        data-tip="Card Options"
        onClick={togglePopUp}
      >
        <div className="card-options-circle"></div>
        <div className="card-options-circle"></div>
        <div className="card-options-circle"></div>
      </div>
      <ReactTooltip />
    </div>
  )
}

export default CardOptions
