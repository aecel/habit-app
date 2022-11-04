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

  const getIndexById = (id) => {
    // Get index of a habit if you give the id
    // Returns -1 if id does not exist
    const targetHabit = habits.filter((habit) => {
      return habit.readProperties().id === id
    })[0]
    const index = habits.indexOf(targetHabit)
    return index
  }

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

  const updateHabit = (id, propertiesToEdit) => {
    // propertiesToEdit sample:
    // {
    //   newSomethijng: "hellp",
    //   newOtherThiing: 2133,
    // }
    const nextHabits = [...habits]
    const index = getIndexById(id)
    const habitToEdit = nextHabits[index]
    const updatedHabit = habitToEdit.updateProperties(propertiesToEdit)
    nextHabits[index] = updatedHabit

    setHabits(nextHabits)
  }

  const deleteHabit = (id) => {
    const nextHabits = [...habits]
    const index = getIndexById(id)
    if (index !== -1) {
      nextHabits.splice(index, 1)
    }
    setHabits(nextHabits)
  }

  const promoteHabit = (id) => {
    const nextHabits = [...habits]
    const index = getIndexById(id)
    nextHabits[index].updateProperties({ newStable: true })
    setHabits(nextHabits)
  }

  const demoteHabit = (id) => {
    const nextHabits = [...habits]
    const index = getIndexById(id)
    nextHabits[index].updateProperties({ newStable: false })
    setHabits(nextHabits)
  }

  const updateSettings = (propertiesToEdit) => {
    // propertiesToEdit sample:
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
    // updateSettings({
    //   theme: "light",
    //   daysToStableHabit: 15,
    //   unstableHabitLimit: 5,
    //   daysToBreakHabit: 10,
    // })
    console.log(getIndexById("doesntexistlul"))
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
