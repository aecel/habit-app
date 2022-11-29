const MonthCalendar = ({
  habit,
  yearNow,
  monthNow,
  dayNow,
  triToggleDay,
  moreGreen,
  lessGreen,
}) => {
  return (
    <div className="month-calendar">
      {Object.entries(habit.readCalendar()[yearNow][monthNow]).map((day) => {
        return (
          <div
            key={day[0]}
            className="month-calendar-day"
            onClick={
              dayNow >= day[0]
                ? () => {
                    triToggleDay({
                      id: habit.readId(),
                      year: yearNow,
                      month: monthNow,
                      day: day[0],
                    })
                  }
                : () => {}
            }
            style={
              dayNow >= day[0]
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
