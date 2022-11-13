import getBlankCalendar from "./getBlankCalendar"
import getDayDiff from "./getDayDiff"
import getReadableDate from "./getReadableDate"

const today = new Date()
const dayNow = today.getDate()
const monthNow = today.getMonth() + 1
const yearNow = today.getFullYear()

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
  daysToStableHabit = 66,
  daysToBreakHabit = 3,
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
      daysToStableHabit,
      daysToBreakHabit,
    }
  }

  const readName = () => name
  const readId = () => id
  const isStable = () => stable
  const readCalendar = () => calendar
  const readPeriod = () => period
  const readNumber = () => number
  const readTrigger = () => trigger
  const readReward = () => reward
  const readStreakForReward = () => streakForReward
  const readLastUpdated = () => {
    if (!lastUpdated) {
      return "It's undefined, bruh"
    } else if (lastUpdated !== "") {
      return getReadableDate(lastUpdated)
    } else {
      return "Never"
    }
  }
  const readDateCreated = () => {
    return getReadableDate(dateCreated)
  }
  const readDaysToStableHabit = () => daysToStableHabit
  const readDaysToBreakHabit = () => daysToBreakHabit

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
    newLastUpdated,
    newDaysToStableHabit,
    newDaysToBreakHabit,
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
    if (newLastUpdated) clone.lastUpdated = newLastUpdated
    if (newDaysToStableHabit) clone.daysToStableHabit = newDaysToStableHabit
    if (newDaysToBreakHabit) clone.daysToBreakHabit = newDaysToBreakHabit
    return newHabit(clone)
  }

  // Returns an updated newHabit clone
  const updateDay = ({ year, month, day, taskDone, taskNotes }) => {
    const calendarClone = calendar
    if (taskDone) calendarClone[year][month][day].done = taskDone
    if (taskNotes) calendarClone[year][month][day].notes = taskNotes
    return updateProperties({
      newCalendar: calendarClone,
      newLastUpdated: new Date(),
    })
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

    return updateProperties({
      newCalendar: calendarClone,
      newLastUpdated: new Date(),
    })
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

  const dateOfLastGreenTask = () => {
    let date = []
    for (const year in calendar) {
      for (const month in calendar[year]) {
        for (const day in calendar[year][month]) {
          if (calendar[year][month][day].done !== "") {
            date = [year, month, day]
          }
        }
      }
    }
    return date
  }

  // Last Missed Streak does not count today
  // so you still have a chance to do your task and make it green
  const getLastMissedStreak = () => {
    let count = 0
    const date = dateOfLastGreenTask()
    for (let year = date[0]; year <= yearNow; year++) {
      for (let month = date[1]; month <= monthNow; month++) {
        for (let day = date[2]; day < dayNow; day++) {
          if (calendar[year][month][day].done === "") {
            count++
          }
        }
      }
    }
    return count
  }

  const getCurrentStreak = () => {
    const streaks = getStreaks()

    if (streaks.length > 0 && getLastMissedStreak() < daysToBreakHabit) {
      return streaks[streaks.length - 1]
    } else {
      return 0
    }
  }

  // Returns a clone of newHabit
  // It's kinda working
  // const updateStable = () => {
  //   if (!stable && getCurrentStreak() >= daysToStableHabit) {
  //     return updateProperties({ newStable: true })
  //   } else if (stable && getLastMissedStreak() >= daysToBreakHabit) {
  //     return updateProperties({ newStable: false })
  //   } else {
  //     return updateProperties({})
  //   }
  // }

  const getDemotionWarning = () => {
    if (stable && daysToBreakHabit() - 1 === getLastMissedStreak()) {
      return "Your stable habit is about to be demoted!"
    } else {
      return null
    }
  }

  const isUpdateNeeded = () => {
    if (lastUpdated && lastUpdated !== "") {
      if (getDayDiff(new Date(), lastUpdated) >= 14) {
        return true
      } else {
        return false
      }
    }
    return false
  }

  return {
    readName,
    readId,
    isStable,
    readCalendar,
    readPeriod,
    readNumber,
    readTrigger,
    readReward,
    readStreakForReward,
    readLastUpdated,
    readDateCreated,
    readDaysToStableHabit,
    readDaysToBreakHabit,
    updateProperties,
    updateDay,
    triToggleDay,
    countGreenTasks,
    getStreaks,
    getMaxStreak,
    getCurrentStreak,
    getLastMissedStreak,
    // updateStable,
    getDemotionWarning,
    getDayDiff,
    isUpdateNeeded,
  }
}

export default newHabit
