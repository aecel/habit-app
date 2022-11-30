const YearCalendar = ({
  habit,
  year,
  yearNow,
  monthNow,
  dayNow,
  triToggleDay,
  moreGreen,
  lessGreen,
}) => {
  // Gets the first day of the year
  // represented by a num (Sun = 1)
  // This is for shifting the first square in the calendar grid
  const jan1day = new Date(year, 0, 1).getDay() + 1

  return (
    <div class="year-calendar-container">
      <div className="year-calendar-months">
        <div className="year-calendar-month">Sun</div>
        <div className="year-calendar-month">Mon</div>
        <div className="year-calendar-month">Tue</div>
        <div className="year-calendar-month">Wed</div>
        <div className="year-calendar-month">Thu</div>
        <div className="year-calendar-month">Fri</div>
        <div className="year-calendar-month">Sat</div>
      </div>
      <div
        className="year-calendar"
        style={{
          "--jan-1-day": jan1day,
        }}
      >
        {Object.entries(habit.readCalendar()[year]).map((month) => {
          return Object.entries(month[1]).map((day) => {
            return (
              <div
                key={day[0]}
                data-key={day[0]}
                className="year-calendar-day"
                onClick={
                  (year === yearNow &&
                    dayNow >= day[0] &&
                    monthNow === Number(month[0])) ||
                  (year === yearNow && monthNow > month[0]) ||
                  year < yearNow
                    ? () => {
                        triToggleDay({
                          id: habit.readId(),
                          year: year,
                          month: month[0],
                          day: day[0],
                        })
                      }
                    : () => {}
                }
                style={
                  (year === yearNow &&
                    dayNow >= day[0] &&
                    monthNow === Number(month[0])) ||
                  (year === yearNow && monthNow > month[0]) ||
                  year < yearNow
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
                {/* {day[0]} */}
              </div>
            )
          })
        })}
      </div>
    </div>
  )
}

export default YearCalendar
