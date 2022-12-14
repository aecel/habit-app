import { useRef } from "react"
import ReactTooltip from "react-tooltip"
import { useHabits } from "../useHabits"
import ConfirmationModal from "./ConfirmationModal"

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

  const deleteRef = useRef()

  return (
    <div className="card-options">
      <div className="card-options-popup" ref={cardOptionsPopUpRef}>
        <div className="card-options-popup-circle" data-tip="More Info"></div>
        <div className="card-options-popup-circle" data-tip="Edit"></div>
        <div
          className="card-options-popup-circle"
          data-tip="Delete"
          ref={deleteRef}
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
      <ConfirmationModal
        triggerRef={deleteRef}
        text={`Are you sure you want to delete "${habit.readName()}"?`}
        func={() => {
          deleteHabit(habit.readId())
        }}
      />
    </div>
  )
}

export default CardOptions
