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
  immediateReward = "",
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
      immediateReward,
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
  const readImmediateReward = () => immediateReward
  const readReward = () => reward
  const readStreakForReward = () => streakForReward
  const readLastUpdated = () => {
    if (lastUpdated === "") {
      return "Never"
    } else {
      return getReadableDate(lastUpdated)
    }
  }
  const readDateCreated = () => {
    return getReadableDate(dateCreated)
  }
  const readDaysToStableHabit = () => daysToStableHabit
  const readDaysToBreakHabit = () => daysToBreakHabit

  const getLastUpdated = () => lastUpdated

  // Returns an updated newHabit clone
  const updateProperties = ({
    newName,
    newStable,
    newCalendar,
    newPeriod,
    newNumber,
    newTrigger,
    newImmediateReward,
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
    if (newImmediateReward) clone.immediateReward = newImmediateReward
    if (newReward) clone.reward = newReward
    if (newStreakForReward) clone.streakForReward = newStreakForReward
    if (newLastUpdated) clone.lastUpdated = newLastUpdated
    if (newDaysToStableHabit) clone.daysToStableHabit = newDaysToStableHabit
    if (newDaysToBreakHabit) clone.daysToBreakHabit = newDaysToBreakHabit

    return newHabit(clone)
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
    if (date.length === 0) return Infinity
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

  const getCalculatedStable = () => {
    let calculatedStable = stable
    if (!stable && getCurrentStreak() >= daysToStableHabit) {
      calculatedStable = true
    } else if (stable && getLastMissedStreak() >= daysToBreakHabit) {
      calculatedStable = false
    }

    return calculatedStable
  }

  // Returns an updated newHabit clone
  const updateDay = ({ year, month, day, taskDone, taskNotes }) => {
    const calendarClone = calendar
    if (taskDone) calendarClone[year][month][day].done = taskDone
    if (taskNotes) calendarClone[year][month][day].notes = taskNotes
    return updateProperties({
      newStable: getCalculatedStable(),
      newCalendar: calendarClone,
      newLastUpdated: new Date(),
    })
  }

  const triToggleDay = ({ year, month, day }) => {
    const calendarClone = calendar
    const currentTaskDone = calendarClone[year][month][day].done
    if (currentTaskDone === "") {
      calendarClone[year][month][day].done = "Done completely"
    } else if (currentTaskDone === "Done completely") {
      calendarClone[year][month][day].done = "Half-assed"
    } else if (currentTaskDone === "Half-assed") {
      calendarClone[year][month][day].done = ""
    }

    return updateProperties({
      newStable: getCalculatedStable(),
      newCalendar: calendarClone,
      newLastUpdated: new Date(),
    })
  }

  const isAboutToBeDemoted = () => {
    if (stable && daysToBreakHabit - 1 === getLastMissedStreak()) {
      return true
    } else {
      return false
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

  const getPercentageToStable = () => {
    const percent = Math.round(getCurrentStreak() / daysToStableHabit)
    return percent
  }

  return {
    readName,
    readId,
    isStable,
    readCalendar,
    readPeriod,
    readNumber,
    readTrigger,
    readImmediateReward,
    readReward,
    readStreakForReward,
    readLastUpdated,
    readDateCreated,
    readDaysToStableHabit,
    readDaysToBreakHabit,
    getLastUpdated,
    updateProperties,
    countGreenTasks,
    getStreaks,
    getMaxStreak,
    getCurrentStreak,
    getLastMissedStreak,
    triToggleDay,
    updateDay,
    isAboutToBeDemoted,
    isUpdateNeeded,
    getPercentageToStable,
  }
}

export default newHabit
