import nothingHerePng from "../images/nothing-here.svg"
const NothingHere = ({text}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <img
        style={{
          height: "auto",
          width: "300px",
        }}
        src={nothingHerePng}
        alt=""
      />
      <div className="nothing-here-text">There's nothing in here.</div>
      {text ? <div className="nothing-here-text">{text}</div> : <></>}
    </div>
  )
}

export default NothingHere
