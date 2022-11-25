import ConfirmationModal from "../components/ConfirmationModal"
import peepoSad from "../images/peepo-sad.gif"

const ErrorElement = () => {
  const popUpModal = () => {
    const modal = document.getElementById("ConfirmationModal")
    modal.style.display = "block"
  }
  return (
    <div
      style={{
        margin: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
      }}
    >
      <img
        src={peepoSad}
        alt="Peepo Sad"
        style={{
          marginTop: "10%",
          width: "320px",
          height: "auto",
          borderRadius: "50%",
        }}
      />
      Error
      <button onClick={popUpModal}>Click to Test ConfirmationModal</button>
      <ConfirmationModal
        func={() => {
          console.log("Clicked Yes!")
        }}
        text="Are you sure you want to blah blah blah blah blah blah blah?"
      />
    </div>
  )
}

export default ErrorElement
