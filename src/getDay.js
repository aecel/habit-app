const getDay = (year, month, day) => {
  const date = new Date(year, month, day)
  const dayNum = date.getDay()
  const dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  return dayArray[dayNum]
}

export default getDay