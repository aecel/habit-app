import { getThisWeek } from "../calendarFunctions"

const WeekCalendarOld = ({
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
}) => {
  const weekArray = getThisWeek({ year: year, month: month, day: day })
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
                            ]["done"] === "Partially done"
                          ? `${lessGreen}`
                          : "var(--bg-color)"
                      }`,
                      color: `${
                        habit.readCalendar()[date.year][date.month][date.day][
                          "done"
                        ] === "Done completely" ||
                        habit.readCalendar()[date.year][date.month][date.day][
                          "done"
                        ] === "Partially done"
                          ? "var(--white)"
                          : "var(--dark-gray)"
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

export default WeekCalendarOld
