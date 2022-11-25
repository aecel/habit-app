import { useRef } from "react"

const ConfirmationModal = ({ text, func }) => {
  const modalRef = useRef()
  const closeModal = () => {
    modalRef.current.style.display = "none"
  }
  const funcAndCloseModal = () => {
    func()
    closeModal()
  }
  return (
    <div id="ConfirmationModal" ref={modalRef}>
      <div className="confirmation-box">
        <span className="close" onClick={closeModal}>
          &times;
        </span>

        <p className="confirmation-text">{text}</p>
        <div className="side-by-side-buttons">
          <button onClick={funcAndCloseModal}>Yes</button>
          <button onClick={closeModal} className="no-button">
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
