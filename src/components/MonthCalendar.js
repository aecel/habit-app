const MonthCalendar = ({
  habit,
  year,
  month,
  yearNow,
  monthNow,
  dayNow,
  triToggleDay,
  moreGreen,
  lessGreen,
}) => {
  // Gets the first day of the month
  // represented by a num (Sun = 1)
  // This is for shifting the first square in the month grid
  const startOfMonthDay = new Date(year, month - 1, 1).getDay() + 1

  return (
    <div
      className="month-calendar"
      style={{
        "--start-of-month-day": startOfMonthDay,
      }}
    >
      {Object.entries(habit.readCalendar()[year][month]).map((day) => {
        return (
          <div
            key={day[0]}
            className="month-calendar-day"
            onClick={
              year < yearNow ||
              (year === yearNow && month < monthNow) ||
              (year === yearNow && month === monthNow && dayNow >= day[0])
                ? () => {
                    triToggleDay({
                      id: habit.readId(),
                      year: year,
                      month: month,
                      day: day[0],
                    })
                  }
                : () => {}
            }
            style={
              year < yearNow ||
              (year === yearNow && month < monthNow) ||
              (year === yearNow && month === monthNow && dayNow >= day[0])
                ? {
                    cursor: "pointer",
                    backgroundColor: `${
                      day[1]["done"] === "so true"
                        ? `${moreGreen}`
                        : day[1]["done"] === "half-assed"
                        ? `${lessGreen}`
                        : "var(--bg-color)"
                    }`,
                    color: `${
                      day[1]["done"] === "so true" ||
                      day[1]["done"] === "half-assed"
                        ? "var(--white)"
                        : "var(--dark-gray)"
                    }`,
                  }
                : {
                    backgroundColor: "var(--card-color)",
                  }
            }
          >
            {day[0]}
          </div>
        )
      })}
    </div>
  )
}

export default MonthCalendar
