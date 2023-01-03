const HowItWorks = () => {
  const rules = [
    "There are two types of habits: stable and unstable. It typically takes 66 days to form a habit, but the time may vary based on the person and the habit (between 18 and 254 days).",
    "To change an unstable habit to a stable habit, you must maintain the habit for 66 days (or the number of days you set).",
    "You can only add up to three unstable habits at a time to prevent feeling overwhelmed. These are your main focus. You can add any number of stable habits.",
    "If you miss three days  (or the number of days you set) of a daily stable habit, it will be demoted to an unstable habit.",
    "You can partially complete a task (e.g., flossing only your bottom teeth) to encourage daily consistency. This will still count towards your streak towards promotion to a stable habit.",
    "There is a warning if a stable habit is close to being demoted to an unstable habit (e.g., if it has not been completed for two consecutive days).",
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
