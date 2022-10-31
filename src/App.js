import { useEffect, useState } from "react"
import newHabit from "./newHabit.js"

const App = () => {
  const habit1 = newHabit({ name: "Stable Habit", stable: true })
  const habit2 = newHabit({ name: "Unstable Habit", stable: false })
  const [habits, setHabits] = useState([habit1, habit2])
  const [settings, setSettings] = useState({
    theme: "dark",
    daysToStableHabit: 66,
    unstableHabitLimit: 1,
    daysToBreakHabit: 3,
  })

  const createHabit = (habit) => {
    const nextHabits = [...habits]
    nextHabits.push(habit)
    setHabits(nextHabits)
  }

  const readStableHabits = () => {
    return habits.filter((habit) => {
      return habit.readProperties().stable === true
    })
  }

  const readUnstableHabits = () => {
    return habits.filter((habit) => {
      return habit.readProperties().stable === false
    })
  }

  const updateHabit = (index, propertiesToEdit) => {
    // {
    //   newSomethijng: "hellp",
    //   newOtherThiing: 2133,
    // }
    const nextHabits = [...habits]
    const habitToEdit = nextHabits[index]
    const updatedHabit = habitToEdit.updateProperties(propertiesToEdit)

    nextHabits[index] = updatedHabit

    setHabits(nextHabits)
  }

  const deleteHabit = (habit) => {
    const nextHabits = [...habits]
    const index = nextHabits.indexOf(habit)
    if (index !== -1) {
      nextHabits.splice(index, 1)
    }
    setHabits(nextHabits)
  }

  const promoteHabit = () => {}

  const demoteHabit = () => {
    const nextHabits = [...habits]
    const stableHabits = readStableHabits()
    for (const stableHabit of stableHabits) {
      // check if missed streak >= daysToBreakHabit (from settings)
      // then update to stable: false
    }
  }

  const updateSettings = (propertiesToEdit) => {
    // {
    //   theme: "dark",
    //   daysToStableHabit: 66,
    //   unstableHabitLimit: 1,
    //   daysToBreakHabit: 3,
    // }
    const nextSettings = { ...settings }
    for (const property in propertiesToEdit) {
      nextSettings[property] = propertiesToEdit[property]
    }

    setSettings(nextSettings)
  }

  useEffect(() => {
    updateSettings({
      theme: "light",
      daysToStableHabit: 15,
      unstableHabitLimit: 5,
      daysToBreakHabit: 10,
    })
  }, [])

  useEffect(() => {
    console.log(settings)
  }, [settings])

  return (
    <div className="App">
      <header className="App-header">
        <main></main>
      </header>
    </div>
  )
}

export default App
