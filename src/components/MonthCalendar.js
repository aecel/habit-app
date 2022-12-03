import getMonthFromNum from "../getMonthFromNum"

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
    <div className="month-calendar-container">
      <div className="month-calendar-label">
        {getMonthFromNum(month)} {year}
      </div>
      <div
        className="month-calendar"
        style={{
          "--start-of-month-day": startOfMonthDay,
        }}
      >
        <div className="month-calendar-day-label">Sun</div>
        <div className="month-calendar-day-label">Mon</div>
        <div className="month-calendar-day-label">Tue</div>
        <div className="month-calendar-day-label">Wed</div>
        <div className="month-calendar-day-label">Thu</div>
        <div className="month-calendar-day-label">Fri</div>
        <div className="month-calendar-day-label">Sat</div>
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
                        day[1]["done"] === "Done completely"
                          ? `${moreGreen}`
                          : day[1]["done"] === "Half-assed"
                          ? `${lessGreen}`
                          : "var(--bg-color)"
                      }`,
                      color: `${
                        day[1]["done"] === "Done completely" ||
                        day[1]["done"] === "Half-assed"
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
    </div>
  )
}

export default MonthCalendar
