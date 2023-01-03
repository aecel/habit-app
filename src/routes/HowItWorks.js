const HowItWorks = () => {
  const rules = [
    "There are two categories of habits: stable and unstable.",
    "On average, it takes 66 days to form a habit, but the time can vary depending on the person and the habit (from 18 to 254 days).",
    "The default streak needed to change an unstable habit to a stable habit is 66 days.",
    "If a stable habit is a daily task and you miss three days, it will be demoted to an unstable habit. When this happens, you can optionally provide a reason for breaking the habit.",
    "You can only add one to three unstable habits at a time to avoid feeling overwhelmed. These are your main focus.",
    "You can add any number of stable habits.",
    "You can edit your progress on any day (marking it as complete or incomplete). The app will not punish you for not checking it every day.",
    "If you have been working on an unstable habit for 66 days (or the number of days you set), it will be promoted to a stable habit.",
    "There is a warning if a stable habit is close to being demoted to an unstable habit (e.g., if it has not been completed for two consecutive days).",
    "There is an option to partially complete a task to encourage daily consistency (e.g., flossing only your bottom teeth instead of all of them). This will still count towards your streak towards promotion to a stable habit.",
  ]
  return (
    <div className="cards-route-container">
      <div id="HowItWorks" className="cards-route">
        {rules.map((rule) => {
          return (
            <div className="rule-container" key={rules.indexOf(rule) + 1}>
              <div className="rule-number">{rules.indexOf(rule) + 1}</div>
              <div className="rule">{rule}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HowItWorks
