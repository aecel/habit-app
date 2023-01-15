import { createContext, useContext, useEffect, useState } from "react"
import getArrayTotal from "./getArrayTotal"
import newHabit from "./newHabit"

const HabitContext = createContext()
export const useHabits = () => useContext(HabitContext)
export const HabitsProvider = ({ children }) => {
  const [postUpdate, setPostUpdate] = useState(false)

  const habit1 = newHabit({
    name: "Flossing",
    stable: true,
    lastUpdated: new Date("2022-10-30"),
  })
  const habit2 = newHabit({
    name: "Going to bed early",
    stable: false,
    daysToStableHabit: 5,
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

  // calendarUpdate and stableUpdate were separated
  // to have a delay in between
  // So that the doughnut chart can be seen updating to 100%
  // before being promoted to a stable habit
  const triToggleDay = ({ id, year, month, day }) => {
    // propertiesToEdit sample:
    // {
    //   newSomethijng: "hellp",
    //   newOtherThiing: 2133,
    // }
    const nextHabits = [...habits]
    const index = getIndexById(id)
    const habitToEdit = nextHabits[index]
    const [calendarUpdate, stableUpdate] = habitToEdit.triToggleDay({
      year,
      month,
      day,
    })
    nextHabits[index] = calendarUpdate
    setHabits(nextHabits)

    // Wait half a second before updating stability
    setTimeout(() => {
      const nextNextHabits = [...habits]
      nextNextHabits[index] = stableUpdate
      setHabits(nextNextHabits)
    }, 500)
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

  const updateHabit = ({ id, properties }) => {
    const nextHabits = [...habits]
    const index = getIndexById(id)
    const habitToUpdate = nextHabits[index]
    const updatedHabit = habitToUpdate.updateProperties(properties)
    nextHabits[index] = updatedHabit
    setHabits(nextHabits)
  }

  // Updates the habit stability
  // Updates stable habits to unstable upon opening the app
  // Use functional state updates to prevent bugs lmao
  const updateHabitStability = ({ id }) => {
    setHabits((currHabits) => {
      const nextHabits = [...currHabits]
      const index = getIndexById(id)
      const habitToUpdate = nextHabits[index]

      const updatedHabit = habitToUpdate.updateStability()
      nextHabits[index] = updatedHabit
      // console.log(
      //   "next habits: ",
      //   nextHabits.map((h) => `${h.readName()} s: ${h.isStable()}`)
      // )

      return nextHabits
    })
  }

  const deleteHabit = (id) => {
    const nextHabits = [...habits]
    const index = getIndexById(id)
    if (index !== -1) {
      nextHabits.splice(index, 1)
      setHabits(nextHabits)
    }
  }

  const countGreenTasksByYear = () => {
    let arrayToBeAdded = []
    let countArray = []

    for (const habit of habits) {
      arrayToBeAdded = habit.countGreenTasksByYear()

      if (countArray.length === 0) {
        countArray = arrayToBeAdded
      } else {
        for (let i = 0; i < countArray.length - 1; i++) {
          countArray[i] = countArray[i] + arrayToBeAdded[i]
        }
      }
    }

    return countArray
  }

  // Counts green tasks from last year, same day
  const countGreenTasksThisYear = () => {
    let arrayToBeAdded = []
    let countArray = []

    for (const habit of habits) {
      arrayToBeAdded = habit.countGreenTasksThisYear()

      if (countArray.length === 0) {
        countArray = arrayToBeAdded
      } else {
        for (let i = 0; i < countArray.length; i++) {
          countArray[i] = countArray[i] + arrayToBeAdded[i]
        }
      }
    }

    // console.log(countArray)
    return countArray
  }

  // Counts green tasks from last year, same day
  // In array form [habitObj1, habitObj2...]
  const countGreenTasksArray = () => {
    let arrayToBeAdded = []
    let countArray = []

    for (const habit of habits) {
      arrayToBeAdded = habit.countGreenTasksThisYear()
      const habitObj = {
        name: habit.readName(),
        array: arrayToBeAdded,
        total: getArrayTotal(arrayToBeAdded),
      }
      countArray.push(habitObj)
    }

    // console.log(countArray)
    return countArray
  }

  // Adds years to calendar when a new year comes or
  // the app has not been opened in a long time
  const addYearsToCalendar = ({ id }) => {
    setHabits((currHabits) => {
      const nextHabits = [...currHabits]
      const index = getIndexById(id)
      const habitToUpdate = nextHabits[index]
      const newCalendar = habitToUpdate.addYears(habitToUpdate.readCalendar())

      const updatedHabit = habitToUpdate.updateProperties({
        newCalendar: newCalendar,
      })
      nextHabits[index] = updatedHabit
      return nextHabits
    })
  }

  // const promoteHabit = (index) => {
  //   const nextHabits = [...habits]
  //   const updatedHabit = nextHabits[index].updateProperties({ newStable: true })
  //   nextHabits[index] = updatedHabit
  //   setHabits(nextHabits)
  // }

  // const demoteHabit = (index) => {
  //   const nextHabits = [...habits]
  //   const updatedHabit = nextHabits[index].updateProperties({
  //     newStable: false,
  //   })
  //   nextHabits[index] = updatedHabit
  //   setHabits(nextHabits)
  // }

  const habitFunctions = {
    getIndexById,
    createHabit,
    readStableHabits,
    readUnstableHabits,
    triToggleDay,
    updateDay,
    updateHabit,
    updateHabitStability,
    deleteHabit,
    countGreenTasksByYear,
    countGreenTasksThisYear,
    countGreenTasksArray,
    // promoteHabit,
    // demoteHabit,
  }

  useEffect(() => {
    // deleteHabit(habit1.readId())
    updateDay({
      id: habit1.readId(),
      year: 2022,
      month: 11,
      day: 4,
      taskDone: "Partially done",
    })
    updateDay({
      id: habit1.readId(),
      year: 2022,
      month: 11,
      day: 5,
      taskDone: "Partially done",
    })
    updateDay({
      id: habit1.readId(),
      year: 2022,
      month: 11,
      day: 6,
      taskDone: "Done completely",
    })
    updateDay({
      id: habit1.readId(),
      year: 2022,
      month: 12,
      day: 19,
      taskDone: "Done completely",
    })
    updateDay({
      id: habit1.readId(),
      year: 2023,
      month: 1,
      day: 4,
      taskDone: "Done completely",
    })
    updateDay({
      id: habit2.readId(),
      year: 2022,
      month: 11,
      day: 1,
      taskDone: "Partially done",
    })

    setPostUpdate(true)
  }, [])

  useEffect(() => {
    if (!postUpdate) return

    // Updates the habit properties on load
    // Updates habit stability and calendar
    for (const habit of habits) {
      updateHabitStability({ id: habit.readId() })
      addYearsToCalendar({ id: habit.readId() })
    }
    // console.table(habits)
    // console.log("Stable Habit Table:")
    // console.table(Object.entries(habits[0].readCalendar()[2022]))
    // console.log("Unstable Habit Table:")
    // console.table(Object.entries(habits[1].readCalendar()[2022]))
  }, [postUpdate])

  // useEffect(() => {
  //   console.log("============================")
  //   for (const habit of habits) {
  //     console.log("Name: " + habit.readName() + ", Stable: " + habit.isStable())
  //   }
  // }, [habits])

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
