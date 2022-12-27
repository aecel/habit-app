import { useSettings } from "../useSettings"

const Instructions = () => {
  const instructions = useSettings().settings.instructions
  return (
    <div
      className="instructions"
      style={{
        display: `${instructions === "on" ? "flex" : "none"}`,
      }}
    >
      <div>Tap circle once to mark the task as "done"</div>
      <div>Tap circle twice to mark the task as "partially done"</div>
      <div>A partially done task still counts towards your streak</div>
      <div>
        You can turn off these instructions<br></br>by
        changing the settings
      </div>
    </div>
  )
}

export default Instructions
