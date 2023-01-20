import { useRef } from "react"
import ReactTooltip from "react-tooltip"
import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"
import ConfirmationModal from "./ConfirmationModal"

import infoDark from "../images/card-assets/info-dark.svg"
import infoLight from "../images/card-assets/info-light.svg"
import editDark from "../images/card-assets/edit-dark.svg"
import editLight from "../images/card-assets/edit-light.svg"
import deleteDark from "../images/card-assets/delete-dark.svg"
import deleteLight from "../images/card-assets/delete-light.svg"
import HabitInfoModal from "./HabitInfoModal"
import HabitEditModal from "./HabitEditModal"

const CardOptions = ({ habit }) => {
  const habitFunctions = useHabits().habitFunctions
  const settings = useSettings().settings
  const theme = settings.theme
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
  const moreInfoRef = useRef()
  const editRef = useRef()

  return (
    <div className="card-options">
      <div className="card-options-popup" ref={cardOptionsPopUpRef}>
        <div
          className="card-options-popup-circle"
          data-tip="More Info"
          ref={moreInfoRef}
          onClick={togglePopUp}
        >
          <img
            className="card-options-svg"
            alt=""
            src={theme === "dark" ? infoDark : infoLight}
          />
        </div>
        <div
          className="card-options-popup-circle"
          data-tip="Edit"
          ref={editRef}
          onClick={togglePopUp}
        >
          <img
            className="card-options-svg"
            alt=""
            src={theme === "dark" ? editDark : editLight}
          />
        </div>
        <div
          className="card-options-popup-circle"
          data-tip="Delete"
          ref={deleteRef}
          onClick={togglePopUp}
        >
          <img
            className="card-options-svg"
            alt=""
            src={theme === "dark" ? deleteDark : deleteLight}
          />
        </div>
      </div>
      <div
        className="card-options-button"
        // data-tip="Card Options"
        onClick={togglePopUp}
      >
        <div className="card-options-circle"></div>
        <div className="card-options-circle"></div>
        <div className="card-options-circle"></div>
      </div>
      <ReactTooltip />
      <ConfirmationModal
        triggerRef={deleteRef}
        text={`Are you sure you want to delete \r\n"${habit.readName()}"?`}
        func={() => {
          deleteHabit(habit.readId())
        }}
      />
      <HabitInfoModal triggerRef={moreInfoRef} habit={habit} />
      <HabitEditModal triggerRef={editRef} habit={habit} />
    </div>
  )
}

export default CardOptions
