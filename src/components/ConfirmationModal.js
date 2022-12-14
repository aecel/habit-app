import { useEffect, useRef } from "react"

const ConfirmationModal = ({ triggerRef, text, func }) => {
  const modalRef = useRef()
  const popUpModal = () => {
    const modal = modalRef.current
    modal.style.display = "block"
    // console.log("add event listener")
  }
  const closeModal = () => {
    modalRef.current.style.display = "none"
  }
  const funcAndCloseModal = () => {
    func()
    closeModal()
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
    <div id="ConfirmationModal" ref={modalRef}>
      <div className="confirmation-box">
        <span className="close-modal" onClick={closeModal}>
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
