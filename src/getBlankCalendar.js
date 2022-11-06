const calendarObject = require("calendar-object")
const today = new Date()
// const dayNow = String(today.getDate()).padStart(2, "0")
// const monthNow = String(today.getMonth() + 1).padStart(2, "0")
const yearNow = today.getFullYear()

// console.log(dayNow + " " + monthNow + " " + yearNow)

const getBlankCalendar = () => {
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

  return blankCalendar
}

// To access a date:
// calendar[year][month][day]
// e.g
// calendar[2022][12][1] = { some data }

export default getBlankCalendar
