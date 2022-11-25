import { useRef } from "react"

const AddHabitModal = ({ name }) => {
  const modalRef = useRef()
  const onClick = () => {
    modalRef.current.style.display = "none"
  }
  return (
    <div id="AddHabitModal" ref={modalRef}>
      <span className="close" onClick={onClick}>
        &times;
      </span>
      <p className="modal-text">{JSON.stringify(name)} added to your habits</p>
    </div>
  )
}

export default AddHabitModal
