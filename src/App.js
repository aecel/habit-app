import { useEffect, useState } from "react"
import newHabit from "./newHabit.js"

const App = () => {
  const habit1 = newHabit({ name: "Habit 1 established", established: true })
  const habit2 = newHabit({ name: "Habit 2 unestablished", established: false })
  const [habits, setHabits] = useState([habit1, habit2])
  const [settings, setSettings] = useState({
    theme: "dark",
    daysToEstablishHabit: 66,
    
  })

  const createHabit = (habit) => {
    const nextHabits = [...habits]
    nextHabits.push(habit)
    setHabits(nextHabits)
  }

  const readEstablishedHabits = () => {
    return habits.filter((habit) => {
      return habit.readProperties().established === true
    })
  }

  const readUnestablishedHabits = () => {
    return habits.filter((habit) => {
      return habit.readProperties().established === false
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

  useEffect(() => {
    console.log(readEstablishedHabits())
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <main></main>
      </header>
    </div>
  )
}

export default App
