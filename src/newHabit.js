const calendarObject = require("calendar-object")
const today = new Date()
// const dayNow = String(today.getDate()).padStart(2, "0")
// const monthNow = String(today.getMonth() + 1).padStart(2, "0")
const yearNow = today.getFullYear()

// console.log(dayNow + " " + monthNow + " " + yearNow)

// This is a calendar object of 3 years: last year, this year, and next year
const blankCalendar = calendarObject.getCalendar(
  [yearNow - 1],
  [yearNow],
  [yearNow + 1]
)

for (const year in blankCalendar) {
  for (const month in blankCalendar[year]) {
    for (const day in blankCalendar[year][month]) {
      // initial state of a day in the calendar
      blankCalendar[year][month][day] = {
        done: "",
        notes: "",
      }
    }
  }
}

// To access a date:
// calendar[year][month][day]
// e.g
// calendar[2022][12][1] = { some data }

const newHabit = ({
  name = "",
  id = window.crypto.randomUUID(),
  stable = false,
  calendar = blankCalendar,
  currentStreak = 0,
  longestStreak = 0,
  period = "daily",
  number = 1, // for each period
  missedTimes = 0,
  trigger = "",
  reward = "",
  streakForReward = 15,
  lastUpdated = "",
  dateCreated = new Date(),
}) => {
  const addAYear = (calendarObj) => {
    // Get the latest year of the calendar object input
    const index = calendarObj.length - 1
    const latestYear = Object.keys(calendarObj)[index]

    // Append the next year to the calendar object
    const yearToAdd = calendarObject.getCalendar([latestYear + 1])
    calendarObj.push(yearToAdd)
  }

  const readProperties = () => {
    return {
      name,
      id,
      stable,
      calendar,
      currentStreak,
      longestStreak,
      period,
      number,
      missedTimes,
      trigger,
      reward,
      streakForReward,
      lastUpdated,
      dateCreated,
    }
  }

  // Returns an updated newHabit clone
  const updateProperties = ({
    newName,
    newStable,
    newCalendar,
    newCurrentStreak,
    newLongestStreak,
    newPeriod,
    newNumber,
    newMissedTimes,
    newTrigger,
    newReward,
    newStreakForReward,
    newLastUpdated,
  }) => {
    const clone = readProperties()
    if (newName) clone.name = newName
    if (newStable !== null && newStable !== undefined) clone.stable = newStable
    if (newCalendar) clone.calendar = newCalendar
    if (newCurrentStreak) clone.currentStreak = newCurrentStreak
    if (newLongestStreak) clone.longestStreak = newLongestStreak
    if (newPeriod) clone.period = newPeriod
    if (newNumber) clone.number = newNumber
    if (newMissedTimes) clone.missedTimes = newMissedTimes
    if (newTrigger) clone.trigger = newTrigger
    if (newReward) clone.reward = newReward
    if (newStreakForReward) clone.streakForReward = newStreakForReward
    if (newLastUpdated) clone.lastUpdated = newLastUpdated
    return newHabit(clone)
  }

  // Returns an updated newHabit clone
  const updateDay = ({ year, month, day, taskDone, taskNotes }) => {
    const calendarClone = calendar
    if (taskDone) calendarClone[year][month][day].done = taskDone
    if (taskNotes) calendarClone[year][month][day].notes = taskNotes
    return updateProperties({ newCalendar: calendarClone })
  }

  const triToggleDay = ({ year, month, day }) => {
    const calendarClone = calendar
    const currentTaskDone = calendarClone[year][month][day].done
    if (currentTaskDone === "") {
      calendarClone[year][month][day].done = "true"
    } else if (currentTaskDone === "true") {
      calendarClone[year][month][day].done = "half-assed"
    } else if (currentTaskDone === "half-assed") {
      calendarClone[year][month][day].done = ""
    }
    return updateProperties({ newCalendar: calendarClone })
  }

  return {
    name,
    id,
    stable,
    calendar,
    readProperties,
    updateProperties,
    updateDay,
    triToggleDay,
  }
}

export default newHabit
