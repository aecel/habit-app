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
      <div>Tap a gray circle once to mark the task as "done"</div>
      <div>Tap it twice to mark the task as "partially done"</div>
      <div>A partially done task still counts towards your streak</div>
      <div>You can hide these instructions by changing the settings</div>
    </div>
  )
}

export default Instructions
