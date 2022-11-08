import getBlankCalendar from "./getBlankCalendar"

const newHabit = ({
  name = "",
  id = window.crypto.randomUUID(),
  stable = false,
  calendar = getBlankCalendar(),
  period = "daily",
  number = 1, // for each period
  trigger = "",
  reward = "",
  streakForReward = 15,
  lastUpdated = "",
  dateCreated = new Date(),
}) => {
  // const addAYear = (calendarObj) => {
  //   // Get the latest year of the calendar object input
  //   const index = calendarObj.length - 1
  //   const latestYear = Object.keys(calendarObj)[index]

  //   // Append the next year to the calendar object
  //   const yearToAdd = calendarObject.getCalendar([latestYear + 1])
  //   calendarObj.push(yearToAdd)
  // }

  const readProperties = () => {
    return {
      name,
      id,
      stable,
      calendar,
      period,
      number,
      trigger,
      reward,
      streakForReward,
      lastUpdated,
      dateCreated,
    }
  }

  const readName = () => name
  const readId = () => id
  const readStable = () => stable
  const readCalendar = () => calendar
  const readPeriod = () => period
  const readNumber = () => number
  const readTrigger = () => trigger
  const readReward = () => reward
  const readStreakForReward = () => streakForReward
  const readLastUpdated = () => {
    if (lastUpdated !== "") {
      const date =
        lastUpdated.getFullYear() +
        "-" +
        String(lastUpdated.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(lastUpdated.getDate()).padStart(2, "0")
      const time =
        String(lastUpdated.getHours()).padStart(2, "0") +
        ":" +
        String(lastUpdated.getMinutes()).padStart(2, "0") +
        ":" +
        String(lastUpdated.getSeconds()).padStart(2, "0")

      return date + " " + time
    } else {
      return "Never"
    }
  }
  const readDateCreated = () => {
    const date =
      dateCreated.getFullYear() +
      "-" +
      String(dateCreated.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(dateCreated.getDate()).padStart(2, "0")
    const time =
      String(dateCreated.getHours()).padStart(2, "0") +
      ":" +
      String(dateCreated.getMinutes()).padStart(2, "0") +
      ":" +
      String(dateCreated.getSeconds()).padStart(2, "0")

    return date + " " + time
  }

  // Returns an updated newHabit clone
  const updateProperties = ({
    newName,
    newStable,
    newCalendar,
    newPeriod,
    newNumber,
    newTrigger,
    newReward,
    newStreakForReward,
  }) => {
    const clone = readProperties()
    if (newName) clone.name = newName
    if (newStable !== null && newStable !== undefined) clone.stable = newStable
    if (newCalendar) clone.calendar = newCalendar
    if (newPeriod) clone.period = newPeriod
    if (newNumber) clone.number = newNumber
    if (newTrigger) clone.trigger = newTrigger
    if (newReward) clone.reward = newReward
    if (newStreakForReward) clone.streakForReward = newStreakForReward
    return newHabit(clone)
  }

  // Returns an updated newHabit clone
  const updateDay = ({ year, month, day, taskDone, taskNotes }) => {
    const calendarClone = calendar
    if (taskDone) calendarClone[year][month][day].done = taskDone
    if (taskNotes) calendarClone[year][month][day].notes = taskNotes
    lastUpdated = new Date()
    return updateProperties({ newCalendar: calendarClone })
  }

  // Returns an updated newHabit clone
  const triToggleDay = ({ year, month, day }) => {
    const calendarClone = calendar
    const currentTaskDone = calendarClone[year][month][day].done
    if (currentTaskDone === "") {
      calendarClone[year][month][day].done = "so true"
    } else if (currentTaskDone === "so true") {
      calendarClone[year][month][day].done = "half-assed"
    } else if (currentTaskDone === "half-assed") {
      calendarClone[year][month][day].done = ""
    }

    lastUpdated = new Date()
    return updateProperties({ newCalendar: calendarClone })
  }

  const countGreenTasks = () => {
    let count = 0
    for (const year in calendar) {
      for (const month in calendar[year]) {
        for (const day in calendar[year][month]) {
          if (calendar[year][month][day].done !== "") {
            count++
          }
        }
      }
    }
    return count
  }

  const getStreaks = () => {
    let streaks = []
    let currentCount = 0
    let previousDay = ""
    for (const year in calendar) {
      for (const month in calendar[year]) {
        for (const day in calendar[year][month]) {
          if (calendar[year][month][day].done !== "") {
            previousDay = "green"
            currentCount++
          } else if (
            calendar[year][month][day].done === "" &&
            previousDay === ""
          ) {
            previousDay = ""
          } else if (
            calendar[year][month][day].done === "" &&
            previousDay === "green" &&
            currentCount > 0
          ) {
            streaks.push(currentCount)
            currentCount = 0
          }
        }
      }
    }

    return streaks
  }

  const getMaxStreak = () => {
    const longestStreak = Math.max(...getStreaks())
    if (longestStreak === -Infinity) return 0
    return longestStreak
  }

  // Will only work if future days cannot be changed
  const getCurrentStreak = () => {
    const streaks = getStreaks()

    if (streaks.length > 0) {
      return streaks[streaks.length - 1]
    } else {
      return 0
    }
  }

  return {
    readName,
    readId,
    readStable,
    readCalendar,
    readPeriod,
    readNumber,
    readTrigger,
    readReward,
    readStreakForReward,
    readLastUpdated,
    readDateCreated,
    updateProperties,
    updateDay,
    triToggleDay,
    countGreenTasks,
    getStreaks,
    getMaxStreak,
    getCurrentStreak,
  }
}

export default newHabit
