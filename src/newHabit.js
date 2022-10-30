const calendarObject = require("calendar-object")
const today = new Date()
const dayNow = String(today.getDate()).padStart(2, "0")
const monthNow = String(today.getMonth() + 1).padStart(2, "0") // Jan is 0
const yearNow = today.getFullYear()

console.log(dayNow + " " + monthNow + " " + yearNow)

// This is a calendar object of 3 years: last year, this year, and next year
const blankCalendar = calendarObject.getCalendar(
  [yearNow - 1],
  [yearNow],
  [yearNow + 1]
)

// To access a date:
// calendar[year][month][day]
// e.g
// calendar[2022][12][1] = { some data }

const newHabit = ({
  name = "",
  id = window.crypto.randomUUID(),
  stable = false,
  progressObject = blankCalendar,
  currentStreak = 0,
  longestStreak = 0,
  period = "daily",
  number = 1, // for each period
  missedTimes = 0,
  trigger = "",
  reward = "",
  streakForReward = 15,
  lastUpdated = "",
}) => {
  const readProperties = () => {
    return {
      name,
      id,
      stable,
      progressObject,
      currentStreak,
      longestStreak,
      period,
      number,
      missedTimes,
      trigger,
      reward,
      streakForReward,
      lastUpdated,
    }
  }

  const updateProperties = ({
    newName,
    newStable,
    newProgressObject,
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
    const clone = {
      name,
      id,
      stable,
      progressObject,
      currentStreak,
      longestStreak,
      period,
      number,
      missedTimes,
      trigger,
      reward,
      streakForReward,
      lastUpdated,
    }
    if (newName) clone.name = newName
    if (newStable !== null && newStable !== undefined)
      clone.stable = newStable
    if (newProgressObject) clone.progressObject = newProgressObject
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

  const updateDay = ({ year, month, day, taskFinished, taskNotes }) => {
    progressObject[year][month][day] = {
      finished: taskFinished,
      notes: taskNotes,
    }
  }

  return { name, id, readProperties, updateProperties, updateDay }
}

export default newHabit
