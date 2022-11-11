import { createContext, useContext, useEffect, useState } from "react"
import HabitCard from "./components/HabitCard.js"
import newHabit from "./newHabit.js"
import "./styles/style.css"

const HabitContext = createContext()
export const useHabits = () => useContext(HabitContext)
const App = () => {
  const habit1 = newHabit({ name: "Stable Habit", stable: true })
  const habit2 = newHabit({
    name: "Unstable Habit",
    stable: false,
    daysToStableHabit: 3,
  })
  const defaultSettings = {
    theme: "dark",
    daysToStableHabit: 66,
    unstableHabitLimit: 1,
    daysToBreakHabit: 3,
  }
  const [habits, setHabits] = useState([habit1, habit2])
  const [settings, setSettings] = useState(defaultSettings)

  const getIndexById = (id) => {
    // Get index of a habit if you give the id
    // Returns -1 if id does not exist
    const targetHabit = habits.filter((habit) => {
      return habit.readId() === id
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
      return habit.isStable() === true
    })
  }

  const readUnstableHabits = () => {
    return habits.filter((habit) => {
      return habit.isStable() === false
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

  const updateDay = ({ id, year, month, day, taskDone, taskNotes }) => {
    const nextHabits = [...habits]
    const index = getIndexById(id)
    const habitToEdit = nextHabits[index]
    const updatedHabit = habitToEdit.updateDay({
      year,
      month,
      day,
      taskDone,
      taskNotes,
    })
    nextHabits[index] = updatedHabit
    setHabits(nextHabits)
  }

  const triToggleDay = ({ id, year, month, day }) => {
    const nextHabits = [...habits]
    const index = getIndexById(id)
    console.log(id)
    const habitToEdit = nextHabits[index]
    const updatedHabit = habitToEdit.triToggleDay({
      year,
      month,
      day,
    })
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

  const promoteHabit = (index) => {
    const nextHabits = [...habits]
    const updatedHabit = nextHabits[index].updateProperties({ newStable: true })
    nextHabits[index] = updatedHabit
    setHabits(nextHabits)
  }

  const demoteHabit = (index) => {
    const nextHabits = [...habits]
    const updatedHabit = nextHabits[index].updateProperties({
      newStable: false,
    })
    nextHabits[index] = updatedHabit
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

  const updateStable = (id) => {
    const nextHabits = [...habits]
    const index = getIndexById(id)
    const habitToUpdate = nextHabits[index]
    if (
      !habitToUpdate.isStable() &&
      habitToUpdate.getCurrentStreak() >= habitToUpdate.readDaysToStableHabit()
    ) {
      promoteHabit(index)
    } else if (
      habitToUpdate.isStable() &&
      habitToUpdate.getLastMissedStreak() >=
        habitToUpdate.readDaysToBreakHabit()
    ) {
      demoteHabit(index)
    }
  }

  const habitFunctions = {
    getIndexById,
    createHabit,
    readStableHabits,
    readUnstableHabits,
    updateHabit,
    updateDay,
    triToggleDay,
    deleteHabit,
    promoteHabit,
    demoteHabit,
    updateSettings,
    updateStable,
  }

  useEffect(() => {
    // deleteHabit(habit1.readId())
    updateDay({
      id: habit1.readId(),
      year: 2022,
      month: 11,
      day: 4,
      taskDone: "half-assed",
    })
    updateDay({
      id: habit1.readId(),
      year: 2022,
      month: 11,
      day: 5,
      taskDone: "half-assed",
    })
    updateDay({
      id: habit1.readId(),
      year: 2022,
      month: 11,
      day: 6,
      taskDone: "so true",
    })
    updateDay({
      id: habit2.readId(),
      year: 2022,
      month: 11,
      day: 1,
      taskDone: "half-assed",
    })
  }, [])

  useEffect(() => {
    // console.table(habits)
    console.log("Stable Habit")
    console.table(Object.entries(habits[0].readCalendar()[2022][11]))
    console.log("Unstable Habit")
    console.table(Object.entries(habits[1].readCalendar()[2022][11]))
  }, [habits])

  return (
    <HabitContext.Provider
      value={{
        habits: habits,
        settings: settings,
        habitFunctions: habitFunctions,
      }}
    >
      <div className="App">
        <HabitCard />
      </div>
    </HabitContext.Provider>
  )
}

export default App
