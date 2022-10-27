const calendarObject = require("calendar-object")
const yearNow = new Date().getFullYear()

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
  established = false,
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
  const getProperties = () => {
    return {
      name,
      id,
      established,
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

  const editProperties = ({
    newName,
    newEstablished,
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
    if (newName) name = newName
    if (newEstablished !== null && newEstablished !== undefined)
      established = newEstablished
    if (newProgressObject) progressObject = newProgressObject
    if (newCurrentStreak) currentStreak = newCurrentStreak
    if (newLongestStreak) longestStreak = newLongestStreak
    if (newPeriod) period = newPeriod
    if (newNumber) number = newNumber
    if (newMissedTimes) missedTimes = newMissedTimes
    if (newTrigger) trigger = newTrigger
    if (newReward) reward = newReward
    if (newStreakForReward) streakForReward = newStreakForReward
    if (newLastUpdated) lastUpdated = newLastUpdated
  }

  return { getProperties, editProperties }
}

export default newHabit
