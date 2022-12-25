import peepoSad from "../images/peepo-sad.gif"

const ErrorElement = () => {
  return (
    <div
      style={{
        margin: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
        color: "var(--text-color)",
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
    </div>
  )
}

export default ErrorElement
