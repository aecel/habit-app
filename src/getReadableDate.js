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

export default getReadableDate
