import unstableHabitPng from "../images/how-it-works/unstable-habit.png"
import stableHabitPng from "../images/how-it-works/stable-habit.png"
import warningPng from "../images/how-it-works/warning.png"
import daysToGoPng from "../images/how-it-works/days-to-go.png"

const HowItWorks = () => {
  const rules = [
    "It typically takes 66 days to form a habit, but the time may vary based on the person and the habit (between 18 and 254 days).",
    "There are two types of habits: stable and unstable. To change an unstable habit to a stable habit, you must maintain the habit for 66 days (or the number of days you set).",
    "You can partially complete a task (e.g., flossing only your bottom teeth) to encourage daily consistency. This will still count towards your streak towards promotion to a stable habit. Tap a gray circle once to mark the task as done. Tap it twice to mark the task as partially done.",
    "You can only add up to three unstable habits at a time to prevent feeling overwhelmed. These are your main focus. You can add any number of stable habits.",
    "If you miss three days (or the number of days you set) of a stable habit, it will be demoted to an unstable habit.",
    "There is a warning if a stable habit is close to being demoted to an unstable habit (e.g., if it has not been completed for three consecutive days).",
  ]
  return (
    <div className="cards-route-container">
      <div id="HowItWorks" className="cards-route">
        {rules.map((rule) => {
          return (
            <div className="rule-container" key={rules.indexOf(rule) + 1}>
              <div className="rule-number">{rules.indexOf(rule) + 1}</div>
              <div className="rule">{rule}</div>
              {rules.indexOf(rule) + 1 === 2 ? (
                <div className="rule-png-container">
                  <img className="rule-png" src={unstableHabitPng} alt="" />
                  <div>Unstable Habit</div>
                  <img className="rule-png" src={stableHabitPng} alt="" />
                  <div>Stable Habit</div>
                </div>
              ) : (
                ""
              )}
              {rules.indexOf(rule) + 1 === 3 ? (
                <div className="rule-png-container">
                  <img className="rule-png" src={daysToGoPng} alt="" />
                </div>
              ) : (
                ""
              )}
              {rules.indexOf(rule) + 1 === 6 ? (
                <div className="rule-png-container">
                  <img className="rule-png" src={warningPng} alt="" />
                </div>
              ) : (
                ""
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HowItWorks
