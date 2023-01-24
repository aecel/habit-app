import {
  getDayDiff,
  getReadableDate,
  getThisYearArray,
} from "./calendarFunctions"
import getBlankCalendar from "./getBlankCalendar"

// const today = new Date()
// const dayNow = today.getDate()
// const monthNow = today.getMonth() + 1
// const yearNow = today.getFullYear()

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
  // Returns the calendarObject + next years
  // Used in addYearsToCalendar in useHabits
  // Actually doesn't need to be here but I don't know where else to put it
  const addYears = (calendarObject) => {
    const today = new Date()
    const yearNow = today.getFullYear()

    // Get the latest year of the calendar object
    const index = Object.keys(calendarObject).length - 1
    const latestYear = Number(Object.keys(calendarObject)[index])
    const yearNext = latestYear + 1

    const yearDiff = yearNow - latestYear
    let yearArray = []
    if (yearDiff <= 0) {
      return calendarObject
    } else {
      for (let i = 0; i < yearDiff; i++) {
        yearArray.push([yearNext + i])
      }
    }
    const calObject = require("calendar-object")

    const yearsToAdd = calObject.getCalendar(...yearArray)
    for (const year in yearsToAdd) {
      for (const month in yearsToAdd[year]) {
        for (const day in yearsToAdd[year][month]) {
          // initial state of a day in the calendar
          yearsToAdd[year][month][day] = {
            done: "",
            notes: "",
          }
        }
      }
    }

    // Append the next years to the calendar object
    const newCalendar = Object.assign(calendarObject, yearsToAdd)

    console.table(newCalendar)
    return newCalendar
  }

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

  const countGreenTasksByYear = () => {
    // const today = new Date()
    // const yearNow = today.getFullYear()
    const year = 2022
    let count = 0
    let countArray = []
    for (const month in calendar[year]) {
      for (const day in calendar[year][month]) {
        if (calendar[year][month][day].done !== "") {
          count++
        }
      }
      countArray.push(count)
      count = 0
    }

    return countArray
  }

  // Counts green tasks from last year, same day
  const countGreenTasksThisYear = () => {
    let count = 0
    let countArray = []

    const today = new Date()
    const dayNow = today.getDate()
    const monthNow = today.getMonth() + 1
    const yearNow = today.getFullYear()
    const todayObj = { year: yearNow, month: monthNow, day: dayNow }

    const yearArray = getThisYearArray(todayObj)

    let currentMonth = yearArray[0].month
    let currentYear = yearArray[0].year
    for (const currentDay of yearArray) {
      if (
        currentMonth !== currentDay.month ||
        currentYear !== currentDay.year
      ) {
        currentMonth = currentDay.month
        currentYear = currentDay.year
        countArray.push(count)
        count = 0
      } else if (
        currentDay.day === dayNow &&
        currentDay.month === monthNow &&
        currentDay.year === yearNow
      ) {
        if (
          calendar[currentDay.year][currentDay.month][currentDay.day].done !==
          ""
        ) {
          count++
        }
        countArray.push(count)
      }

      if (
        calendar[currentDay.year][currentDay.month][currentDay.day].done !== ""
      ) {
        count++
      }
    }

    return countArray
  }

  // returns an array like this
  // [4,5,1,...]
  // represents streaks (partially done tasks included)
  // "done", "partially done", "done", "", "partially done", ""
  // becomes [3,1]
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

  // returns an array like this
  // [4,5,1,...]
  // represents streaks (partially done tasks included)
  // "done", "partially done", "done", "", "partially done", ""
  // becomes [3,1,1,1]
  const getStreaksAndBlanks = () => {
    let streaks = []
    let currentCount = 0
    let currentCountBlank = 0
    let previousDay = "none"
    for (const year in calendar) {
      for (const month in calendar[year]) {
        for (const day in calendar[year][month]) {
          if (
            previousDay === "none" &&
            calendar[year][month][day].done !== ""
          ) {
            currentCount++
            previousDay = "green"
          } else if (
            calendar[year][month][day].done !== "" &&
            previousDay === "" &&
            currentCountBlank > 0
          ) {
            streaks.push(currentCountBlank)
            currentCountBlank = 0
            currentCount = 1
            previousDay = "green"
          } else if (
            calendar[year][month][day].done === "" &&
            previousDay === "green" &&
            currentCount > 0
          ) {
            streaks.push(currentCount)
            currentCount = 0
            currentCountBlank = 1
            previousDay = ""
          } else if (calendar[year][month][day].done !== "") {
            previousDay = "green"
            currentCount++
          } else if (
            calendar[year][month][day].done === "" &&
            previousDay === ""
          ) {
            currentCountBlank++
            previousDay = ""
          }
        }
      }
    }

    return streaks
  }

  const getAdjustedStreaks = () => {
    const adjustStreak = (streaks) => {
      let adjustedStreaks = []
      let prevMerged = false

      for (let i = 0; i < streaks.length; i++) {
        if (i % 2 !== 0) {
          if (streaks[i] < daysToBreakHabit && !prevMerged) {
            adjustedStreaks.push(streaks[i - 1] + streaks[i + 1])
            prevMerged = true
          } else if (streaks[i] < daysToBreakHabit && prevMerged) {
            adjustedStreaks[adjustedStreaks.length - 1] =
              adjustedStreaks[adjustedStreaks.length - 1] + streaks[i + 1]
            prevMerged = true
          } else if (!prevMerged) {
            adjustedStreaks.push(streaks[i - 1])
            adjustedStreaks.push(streaks[i])
            prevMerged = false
          } else {
            adjustedStreaks.push(streaks[i])
            prevMerged = false
          }
        }

        if (i === streaks.length - 1 && !prevMerged) {
          adjustedStreaks.push(streaks[i])
        }
      }

      return adjustedStreaks
    }

    const streakNeedsAdjusting = (streak) => {
      if (streak.length < 3) {
        return false
      }
      for (let i = 0; i < streak.length; i++) {
        if (i % 2 !== 0 && streak[i] < daysToBreakHabit) {
          return true
        }
      }

      return false
    }

    const streaks = getStreaksAndBlanks()
    let adjustedStreaks = streaks
    if (streakNeedsAdjusting(adjustedStreaks)) {
      adjustedStreaks = adjustStreak(adjustedStreaks)
    }

    // let count = 0
    // while (checkIfStreakNeedsAdjusting(adjustedStreaks) && count <= 100) {
    //   count++
    //   adjustedStreaks = adjustStreak(adjustedStreaks)
    // }

    return adjustedStreaks
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
    const date = dateOfLastGreenTask()

    if (date.length === 0) return Infinity

    const yearNum = Number(date[0])
    const monthNum = Number(date[1])
    const dayNum = Number(date[2])
    const date1 = new Date()
    const date2 = new Date(`${monthNum}/${dayNum}/${yearNum}`)

    const count = getDayDiff(date1, date2)

    return count
  }

  const getCurrentStreak = () => {
    // This is the code before
    // Enable if you don't want the grace period
    // Makes the app stricter / no gaps towards streak
    // const streaks = getStreaks()
    const streaks = getAdjustedStreaks()

    if (streaks.length > 0) {
      return streaks[streaks.length - 1]
    } else {
      return 0
    }
  }

  const getCalculatedStable = () => {
    let calculatedStable = stable
    if (!stable && getCurrentStreak() >= daysToStableHabit) {
      calculatedStable = true
    } else if (stable && getLastMissedStreak() > daysToBreakHabit) {
      calculatedStable = false
    }

    return calculatedStable
  }

  const updateStability = () => {
    const newStable = getCalculatedStable()
    return updateProperties({
      newStable: newStable,
    })
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

  // calendarUpdate and stableUpdate were separated
  // to have a delay in between
  // So that the doughnut chart can be seen updating to 100%
  // before being promoted to a stable habit
  const triToggleDay = ({ year, month, day }) => {
    const calendarClone = calendar
    const currentTaskDone = calendarClone[year][month][day].done
    if (currentTaskDone === "") {
      calendarClone[year][month][day].done = "Done completely"
    } else if (currentTaskDone === "Done completely") {
      calendarClone[year][month][day].done = "Partially done"
    } else if (currentTaskDone === "Partially done") {
      calendarClone[year][month][day].done = ""
    }

    const calendarUpdate = updateProperties({
      newCalendar: calendarClone,
      newLastUpdated: new Date(),
    })

    const stableUpdate = updateProperties({
      newStable: getCalculatedStable(),
    })

    return [calendarUpdate, stableUpdate]
  }

  const isAboutToBeDemoted = () => {
    if (stable && daysToBreakHabit - 1 < getLastMissedStreak()) {
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
    const percent = Math.round((getCurrentStreak() / daysToStableHabit) * 100)
    if (percent > 100) {
      return "100%"
    }
    const percentString = `${percent}%`
    return percentString
  }

  // returns days to go before habit stabilizes
  const getDaysToGo = () => {
    return daysToStableHabit - getCurrentStreak()
  }

  return {
    addYears,
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
    countGreenTasksByYear,
    countGreenTasksThisYear,
    getStreaks,
    getStreaksAndBlanks,
    getAdjustedStreaks,
    getMaxStreak,
    getCurrentStreak,
    updateStability,
    getLastMissedStreak,
    triToggleDay,
    updateDay,
    isAboutToBeDemoted,
    isUpdateNeeded,
    getPercentageToStable,
    getDaysToGo,
  }
}

export default newHabit
