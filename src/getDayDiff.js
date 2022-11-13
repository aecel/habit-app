// Get the time difference of date1 and date2 in days
const getDayDiff = (date1, date2) => {
  if (date1 && date2) {
    const msPerDay = 1000 * 60 * 60 * 24

    // Convert dates to UTC
    // For cases where the two dates span a DST change
    const date1Utc = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    )

    const date2Utc = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    )

    const diffTime = Math.abs(date1Utc - date2Utc)
    const diffDays = Math.floor(diffTime / msPerDay)
    // return diffTime / 1000 + " seconds"
    // return diffTime + " milliseconds"
    // return diffDays + " days"

    return diffDays
  } if (date1 === undefined && date2 === undefined) {
    return "Both dates are undefined"
  } else if (date1 === undefined) {
    return "Date 1 is undefined"
  } else if (date2 === undefined) {
    return "Date 2 is undefined"
  } else if (date1 === "" && date2 === "") {
    return "Both dates are empty strings"
  } else if (date1 === "") {
    return "Date 1 is an empty string"
  } else if (date2 === "") {
    return "Date 2 is an empty string"
  } else {
    return "What have you done lol"
  }
}

export default getDayDiff
