import { createContext, useContext, useEffect, useState } from "react"
import newHabit from "./newHabit"

const HabitContext = createContext()
export const useHabits = () => useContext(HabitContext)
export const HabitsProvider = ({ children }) => {
  
  const habit1 = newHabit({
    name: "Stable Habit",
    stable: true,
    lastUpdated: new Date("2022-10-30"),
  })
  const habit2 = newHabit({
    name: "Unstable Habit",
    stable: false,
    daysToStableHabit: 3,
  })

  const [habits, setHabits] = useState([habit1, habit2])

  const getIndexById = (id) => {
    // Get index of a habit if you give the id
    // Returns -1 if id does not exist
    const targetHabit = habits.filter((habit) => {
      return habit.readId() === id
    })[0]
    const index = habits.indexOf(targetHabit)
    return index
  }

  const createHabit = (habitProperties) => {
    const nextHabits = [...habits]
    const habit = newHabit(habitProperties)
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

  const triToggleDay = ({ id, year, month, day }) => {
    // propertiesToEdit sample:
    // {
    //   newSomethijng: "hellp",
    //   newOtherThiing: 2133,
    // }
    const nextHabits = [...habits]
    const index = getIndexById(id)
    const habitToEdit = nextHabits[index]
    const updatedHabit = habitToEdit.triToggleDay({ year, month, day })
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

  const deleteHabit = (id) => {
    const nextHabits = [...habits]
    const index = getIndexById(id)
    if (index !== -1) {
      nextHabits.splice(index, 1)
      setHabits(nextHabits)
    }
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

  const habitFunctions = {
    getIndexById,
    createHabit,
    readStableHabits,
    readUnstableHabits,
    triToggleDay,
    updateDay,
    deleteHabit,
    promoteHabit,
    demoteHabit,
  }

  useEffect(() => {
    // deleteHabit(habit1.readId())
    // updateDay({
    //   id: habit1.readId(),
    //   year: 2022,
    //   month: 11,
    //   day: 4,
    //   taskDone: "half-assed",
    // })
    // updateDay({
    //   id: habit1.readId(),
    //   year: 2022,
    //   month: 11,
    //   day: 5,
    //   taskDone: "half-assed",
    // })
    // updateDay({
    //   id: habit1.readId(),
    //   year: 2022,
    //   month: 11,
    //   day: 6,
    //   taskDone: "so true",
    // })
    // updateDay({
    //   id: habit2.readId(),
    //   year: 2022,
    //   month: 11,
    //   day: 1,
    //   taskDone: "half-assed",
    // })
  }, [])

  useEffect(() => {
    // console.table(habits)
    // console.log("Stable Habit Table:")
    // console.table(Object.entries(habits[0].readCalendar()[2022]))
    // console.log("Unstable Habit Table:")
    // console.table(Object.entries(habits[1].readCalendar()[2022]))
  }, [habits])

  return (
    <HabitContext.Provider
      value={{
        habits: habits,
        habitFunctions: habitFunctions,
      }}
    >
      {children}
    </HabitContext.Provider>
  )
}
