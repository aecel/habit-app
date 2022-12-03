const getThisWeek = ({ yearNow, monthNow, dayNow }) => {
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate()
  }

  //   const getPreviousMonth = ({ year, month }) => {
  //     if (month === 1) {
  //       return { year: year - 1, month: 12 }
  //     } else {
  //       return { year: year, month: month - 1 }
  //     }
  //   }

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

  //   const getNextMonth = ({ year, month }) => {
  //     if (month === 12) {
  //       return { year: year + 1, month: 1 }
  //     } else {
  //       return { year: year, month: month + 1 }
  //     }
  //   }

  const getNextDay = ({ year, month, day }) => {
    if (month === 12 && day === 31) {
      return { year: year + 1, month: 1, day: 1 }
    } else if (day === getDaysInMonth(year, month)) {
      return { year: year, month: month + 1, day: 1 }
    } else {
      return { year: year, month: month, day: day + 1 }
    }
  }

  const today = new Date(yearNow, monthNow - 1, dayNow)

  // todayNum is a number representing the day of the week (Sunday is 0)
  const todayNum = today.getDay()
  //   console.log("todayNum: " + todayNum)
  let weekArray = []

  // firstDay is the first sunday of the week
  let dayReference = { year: yearNow, month: monthNow, day: dayNow }
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

export default getThisWeek
