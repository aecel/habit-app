import { useState } from "react"
import newHabit from "./newHabit.js"

const App = () => {
  const [habits, setHabits] = useState({})

  const sampleHabit = {
    name: "",
    id: window.crypto.randomUUID(),
    established: false,
    progressObject: {},
    currentStreak: 0,
    longestStreak: 0,
    period: "daily",
    number: 1, // for each period
    missedTimes: 0,
    trigger: "",
    reward: "",
    streakForReward: 15,
    lastUpdated: "",
  }

  // Progress Array
  const sampleProgressArray = [
    {
      date: "",
      finished: "half-assed", // Was the task done this date? true, false, or half-assed
      notes: "",
    },
  ]

  const habit1 = newHabit({})
  const habit2 = newHabit({})

  console.table(habit1.getProperties().progressObject)
  return (
    <div className="App">
      <header className="App-header">
        <main>
        </main>
      </header>
    </div>
  )
}

export default App
