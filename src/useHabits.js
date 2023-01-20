import { createContext, useContext, useEffect, useState } from "react"
import { getPreviousDay } from "./calendarFunctions"
import getArrayTotal from "./getArrayTotal"
import newHabit from "./newHabit"
import { sortDescendingByProp } from "./sortingFunctions"

const HabitContext = createContext()
export const useHabits = () => useContext(HabitContext)
export const HabitsProvider = ({ children }) => {
  const [postUpdate, setPostUpdate] = useState(false)

  const habit1 = newHabit({
    name: "Flossing",
    stable: false,
    // lastUpdated: new Date("2022-10-30"),
  })
  const habit2 = newHabit({
    name: "Going to bed early",
    stable: false,
    daysToStableHabit: 5,
  })
  const habit3 = newHabit({
    name: "Stretching in the Morning",
    stable: true,
  })

  const [habits, setHabits] = useState([habit1, habit2, habit3])

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
        stable: habit.isStable(),
      }
      countArray.push(habitObj)
    }

    // console.log(countArray)
    return countArray
  }

  const getTop5Habits = () => {
    const habitArray = countGreenTasksArray()

    let topHabitArray = sortDescendingByProp(habitArray, "total")

    if (topHabitArray.length <= 5) {
      // topHabitArray.reverse()
      return topHabitArray
    } else {
      topHabitArray = topHabitArray.slice(0, 5)
      // topHabitArray.reverse()
      return topHabitArray
    }
  }

  const getTop5UnstableHabits = () => {
    const habitArray = countGreenTasksArray()

    const unstableHabitArray = habitArray.filter((habit) => {
      return habit.stable === false
    })

    let topUnstableHabitArray = sortDescendingByProp(
      unstableHabitArray,
      "total"
    )

    if (topUnstableHabitArray.length <= 5) {
      // topUnstableHabitArray.reverse()
      return topUnstableHabitArray
    } else {
      topUnstableHabitArray = topUnstableHabitArray.slice(0, 5)
      // topUnstableHabitArray.reverse()
      return topUnstableHabitArray
    }
  }

  const getTop5StableHabits = () => {
    const habitArray = countGreenTasksArray()

    const stableHabitArray = habitArray.filter((habit) => {
      return habit.stable === true
    })

    let topStableHabitArray = sortDescendingByProp(stableHabitArray, "total")

    if (topStableHabitArray.length <= 5) {
      // topStableHabitArray.reverse()
      return topStableHabitArray
    } else {
      topStableHabitArray = topStableHabitArray.slice(0, 5)
      // topStableHabitArray.reverse()
      return topStableHabitArray
    }
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
    getTop5Habits,
    getTop5UnstableHabits,
    getTop5StableHabits,
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
      id: habit1.readId(),
      year: 2023,
      month: 1,
      day: 14,
      taskDone: "Done completely",
    })
    updateDay({
      id: habit1.readId(),
      year: 2023,
      month: 1,
      day: 15,
      taskDone: "Partially done",
    })
    updateDay({
      id: habit1.readId(),
      year: 2023,
      month: 1,
      day: 16,
      taskDone: "Done completely",
    })
    updateDay({
      id: habit1.readId(),
      year: 2023,
      month: 1,
      day: 17,
      taskDone: "Done completely",
    })
    updateDay({
      id: habit2.readId(),
      year: 2022,
      month: 11,
      day: 1,
      taskDone: "Partially done",
    })
    updateDay({
      id: habit2.readId(),
      year: 2023,
      month: 1,
      day: 16,
      taskDone: "Partially done",
    })
    updateDay({
      id: habit2.readId(),
      year: 2023,
      month: 1,
      day: 17,
      taskDone: "Partially done",
    })

    const today = new Date()
    const dayNow = today.getDate()
    const monthNow = today.getMonth() + 1
    const yearNow = today.getFullYear()

    let day = dayNow
    let month = monthNow
    let year = yearNow
    for (let i = 0; i < 7; i++) {
      let taskDone = "Done completely"
      if (i % 2 === 0) {
        taskDone = "Partially done"
      }
      updateDay({
        id: habit3.readId(),
        year: year,
        month: month,
        day: day,
        taskDone: taskDone,
      })

      const previousDay = getPreviousDay({ year: year, month: month, day: day })
      day = previousDay.day
      month = previousDay.month
      year = previousDay.year
    }
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
