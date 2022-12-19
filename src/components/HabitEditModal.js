import { useEffect, useRef } from "react"

const HabitEditModal = ({ triggerRef, habit }) => {
  const modalRef = useRef()
  const popUpModal = () => {
    const modal = modalRef.current
    modal.style.display = "flex"
    // console.log("add event listener")
  }
  const closeModal = () => {
    modalRef.current.style.display = "none"
  }
  useEffect(() => {
    const trigger = triggerRef.current
    trigger.addEventListener("click", popUpModal)

    return () => {
      trigger.removeEventListener("click", popUpModal)
      // console.log("remove event listener")
    }
  }, [triggerRef])
  return (
    <div id="HabitEditModal" ref={modalRef}>
      <div className="habit-edit-box">
        <span className="close-modal" onClick={closeModal}>
          &times;
        </span>
        <div>Edit</div>
        <div>{habit.readName()}</div>
      </div>
    </div>
  )
}

export default HabitEditModal
