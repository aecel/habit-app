import getThisWeek from "../getThisWeek"

const WeekCalendar = ({
  habit,
  yearNow,
  monthNow,
  dayNow,
  triToggleDay,
  moreGreen,
  lessGreen,
}) => {
  const weekArray = getThisWeek({ yearNow, monthNow, dayNow })

  return (
    <div className="week-calendar-container">
      <div className="week-calendar-label">
        {/* {getMonthFromNum(monthNow)} {yearNow} */}
        This week
      </div>
      <div className="week-calendar">
        <div className="week-calendar-day-label">Sun</div>
        <div className="week-calendar-day-label">Mon</div>
        <div className="week-calendar-day-label">Tue</div>
        <div className="week-calendar-day-label">Wed</div>
        <div className="week-calendar-day-label">Thu</div>
        <div className="week-calendar-day-label">Fri</div>
        <div className="week-calendar-day-label">Sat</div>
        {weekArray.map((date) => {
          return (
            <div
              key={date.day}
              className="week-calendar-day"
              onClick={
                date.year < yearNow ||
                (date.year === yearNow && date.month < monthNow) ||
                (date.year === yearNow &&
                  date.month === monthNow &&
                  date.day <= dayNow)
                  ? () => {
                      triToggleDay({
                        id: habit.readId(),
                        year: date.year,
                        month: date.month,
                        day: date.day,
                      })
                    }
                  : () => {}
              }
              style={
                date.year < yearNow ||
                (date.year === yearNow && date.month < monthNow) ||
                (date.year === yearNow &&
                  date.month === monthNow &&
                  date.day <= dayNow)
                  ? {
                      cursor: "pointer",
                      backgroundColor: `${
                        habit.readCalendar()[date.year][date.month][date.day][
                          "done"
                        ] === "Done completely"
                          ? `${moreGreen}`
                          : habit.readCalendar()[date.year][date.month][
                              date.day
                            ]["done"] === "Half-assed"
                          ? `${lessGreen}`
                          : "var(--bg-color)"
                      }`,
                    }
                  : { backgroundColor: "var(--card-color)" }
              }
            >
              {date.day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeekCalendar
