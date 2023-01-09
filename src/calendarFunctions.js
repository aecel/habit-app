const getMonthFromNum = (num) => {
  const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  return monthArray[num - 1]
}

const getReadableDate = (dateTime) => {
  const date =
    dateTime.getFullYear() +
    "-" +
    String(dateTime.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(dateTime.getDate()).padStart(2, "0")
  const time =
    String(dateTime.getHours()).padStart(2, "0") +
    ":" +
    String(dateTime.getMinutes()).padStart(2, "0") +
    ":" +
    String(dateTime.getSeconds()).padStart(2, "0")

  return date + " " + time
}

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate()
}

const getPreviousMonth = ({ year, month }) => {
  if (month === 1) {
    return { year: year - 1, month: 12 }
  } else {
    return { year: year, month: month - 1 }
  }
}

const getPreviousDay = ({ year, month, day }) => {
  if (month === 1 && day === 1) {
    return { year: year - 1, month: 12, day: 31 }
  } else if (day === 1) {
    return {
      year: year,
      month: month - 1,
      day: getDaysInMonth(year, month - 1),
    }
  } else {
    return { year: year, month, day: day - 1 }
  }
}

const getNextMonth = ({ year, month }) => {
  if (month === 12) {
    return { year: year + 1, month: 1 }
  } else {
    return { year: year, month: month + 1 }
  }
}

const getNextDay = ({ year, month, day }) => {
  if (month === 12 && day === 31) {
    return { year: year + 1, month: 1, day: 1 }
  } else if (day === getDaysInMonth(year, month)) {
    return { year: year, month: month + 1, day: 1 }
  } else {
    return { year: year, month: month, day: day + 1 }
  }
}

// Gets this week Sun to Sat
// Different from getThisWeekArray
// Not used anymore in Week Calendar component
const getThisWeek = ({ year, month, day }) => {
  const today = new Date(year, month - 1, day)

  // todayNum is a number representing the day of the week (Sunday is 0)
  const todayNum = today.getDay()
  //   console.log("todayNum: " + todayNum)
  let weekArray = []

  // firstDay is the first sunday of the week
  let dayReference = { year: year, month: month, day: day }
  let firstDay = dayReference
  for (let i = 0; i < todayNum; i++) {
    firstDay = getPreviousDay(dayReference)
    dayReference = firstDay
  }

  //   push sunday into the array first and then the next 6 days
  let dayToPush = firstDay
  for (let i = 0; i < 7; i++) {
    weekArray.push(dayToPush)
    dayToPush = getNextDay(dayToPush)
  }
  return weekArray
}

const getDayName = ({ year, month, day }) => {
  const date = new Date(year, month - 1, day)
  const dayNum = date.getDay()
  const dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  return dayArray[dayNum]
}

// Gets this week, from today to six days ago
// Different from getThisWeek
// contains dayName (Sunday, Monday, etc.)
// Used in Week Calendar component
const getThisWeekArray = ({ year, month, day }) => {
  let weekArray = []

  let dayReference = {
    year: year,
    month: month,
    day: day,
  }

  // unshift today into the array first and then the previous 6 days
  // object looks like this:
  // {year, month, day, dayName}
  let dayToPush = dayReference
  for (let i = 0; i < 7; i++) {
    const dayNameToAdd = {
      dayName: getDayName({
        year: dayToPush.year,
        month: dayToPush.month,
        day: dayToPush.day,
      }),
    }
    const objectToPush = { ...dayToPush, ...dayNameToAdd }
    weekArray.unshift(objectToPush)
    dayToPush = getPreviousDay(dayToPush)
  }
  return weekArray
}

// Counts days from last year, same day
const getThisYearArray = ({ year, month, day }) => {
  let yearArray = []

  let dayReference = {
    year: year,
    month: month,
    day: day,
  }

  // unshift today into the array first and then the previous 6 days
  // object looks like this:
  // {year, month, day, dayName}
  let dayToPush = dayReference
  for (let i = 0; i < 366; i++) {
    const dayNameToAdd = {
      dayName: getDayName({
        year: dayToPush.year,
        month: dayToPush.month,
        day: dayToPush.day,
      }),
    }
    const objectToPush = { ...dayToPush, ...dayNameToAdd }
    yearArray.unshift(objectToPush)
    dayToPush = getPreviousDay(dayToPush)
  }

  return yearArray
}

// ["Jan Last Year" -> "Jan This Year"]
// ["Jan", "Feb", ... "Jan"]
// length: 13
// Used for charts that need this array as labels
const getThisYearInMonthsArray = () => {
  const today = new Date()
  const yearNow = today.getFullYear()
  const monthNow = today.getMonth() + 1

  let monthArray = []
  let month = { year: yearNow, month: monthNow }
  for (let i = 0; i < 13; i++) {
    monthArray.unshift(getMonthFromNum(month.month))
    month = getPreviousMonth(month)
  }

  return monthArray
}

export {
  getMonthFromNum,
  getReadableDate,
  getDaysInMonth,
  getPreviousMonth,
  getPreviousDay,
  getNextMonth,
  getNextDay,
  getThisWeek,
  getThisWeekArray,
  getThisYearArray,
  getThisYearInMonthsArray,
}
