import { useSettings } from "../useSettings"
import testHabitsSvg from "../images/navlinks/testhabits.svg"
import testHabitsSvgBlack from "../images/navlinks/testhabits-black.svg"
import addHabitSvg from "../images/navlinks/addhabit.svg"
import addHabitSvgBlack from "../images/navlinks/addhabit-black.svg"
import settingsSvg from "../images/navlinks/settings.svg"
import settingsSvgBlack from "../images/navlinks/settings-black.svg"

const Instructions = () => {
  const instructions = useSettings().settings.instructions
  const theme = useSettings().settings.theme
  return (
    <div
      className="instructions"
      style={{
        display: `${instructions === "on" ? "flex" : "none"}`,
      }}
    >
      <div>
        Go to
        <img
          className="instructions-icon"
          src={theme === "dark" ? testHabitsSvg : testHabitsSvgBlack}
          alt=""
        />
        "How it Works" if this is your first time here
      </div>
      <div>Tap a gray circle once to mark the task as done</div>
      <div>Tap it twice to mark the task as partially done</div>
      <div>
        Add a new habit card by going to
        <img
          className="instructions-icon"
          src={theme === "dark" ? addHabitSvg : addHabitSvgBlack}
          alt=""
        />
        "Add Habit"
      </div>
      {/* <div>A partially done task still counts towards your streak</div> */}
      <div>
        You can hide these instructions by going to
        <img
          className="instructions-icon"
          src={theme === "dark" ? settingsSvg : settingsSvgBlack}
          alt=""
        />
        "Settings"
      </div>
    </div>
  )
}

export default Instructions
