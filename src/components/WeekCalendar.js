import { getThisWeek } from "../calendarFunctions"

const WeekCalendar = ({
  habit,
  year,
  month,
  day,
  yearNow,
  monthNow,
  dayNow,
  triToggleDay,
  moreGreen,
  lessGreen,
  doneCheck,
  halfCheck,
}) => {
  const weekArray = getThisWeek({ year: year, month: month, day: day })
  return (
    <div className="week-calendar-container">
      <div className="week-calendar">
        <div className="week-calendar-day-label">Sun</div>
        <div className="week-calendar-day-label">Mon</div>
        <div className="week-calendar-day-label">Tue</div>
        <div className="week-calendar-day-label">Wed</div>
        <div className="week-calendar-day-label">Thu</div>
        <div className="week-calendar-day-label">Fri</div>
        <div className="week-calendar-day-label">Sat</div>
        {weekArray.map((date) => {
          return <div class="week-calendar-day-number">{date.day}</div>
        })}
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
                    }
                  : {}
              }
            >
              {habit.readCalendar()[date.year][date.month][date.day]["done"] ===
                "Done completely" ||
              habit.readCalendar()[date.year][date.month][date.day]["done"] ===
                "Half-assed" ? (
                <img
                  className="week-calendar-day-icon"
                  alt=""
                  src={
                    habit.readCalendar()[date.year][date.month][date.day][
                      "done"
                    ] === "Done completely"
                      ? doneCheck
                      : habit.readCalendar()[date.year][date.month][date.day][
                          "done"
                        ] === "Half-assed"
                      ? halfCheck
                      : "none"
                  }
                />
              ) : (
                <div className="week-calendar-day-circle"></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeekCalendar
