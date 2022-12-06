import { useState } from "react"
import getMonthFromNum from "../getMonthFromNum"
import leftArrow from "../images/SVG/left-arrow.svg"
import leftArrowBlack from "../images/SVG/left-arrow-black.svg"
import rightArrow from "../images/SVG/right-arrow.svg"
import rightArrowBlack from "../images/SVG/right-arrow-black.svg"
import { getPreviousMonth, getNextMonth } from "../calendarFunctions"
import { useSettings } from "../useSettings"

const MonthCalendar = ({
  habit,
  yearNow,
  monthNow,
  dayNow,
  triToggleDay,
  moreGreen,
  lessGreen,
}) => {
  const settings = useSettings().settings
  const theme = settings.theme
  const [year, setYear] = useState(yearNow)
  const [month, setMonth] = useState(monthNow)

  const setPreviousMonth = () => {
    const previousMonthObj = getPreviousMonth({ year, month })
    const previousMonth = previousMonthObj.month
    const previousMonthYear = previousMonthObj.year
    if (previousMonthYear in habit.readCalendar()) {
      setMonth(previousMonth)
      setYear(previousMonthYear)
    }
  }

  const setNextMonth = () => {
    const nextMonthObj = getNextMonth({ year, month })
    const nextMonth = nextMonthObj.month
    const nextMonthYear = nextMonthObj.year
    if (nextMonthYear in habit.readCalendar()) {
      setMonth(nextMonth)
      setYear(nextMonthYear)
    }
  }

  // Gets the first day of the month
  // represented by a num (Sun = 1)
  // This is for shifting the first square in the month grid
  const startOfMonthDay = new Date(year, month - 1, 1).getDay() + 1

  return (
    <div className="month-calendar-container">
      <div className="month-calendar-top">
        {getPreviousMonth({ year, month }).year in habit.readCalendar() ? (
          <div className="month-calendar-arrow" onClick={setPreviousMonth}>
            <img
              className="month-calendar-arrow-icon"
              src={theme === "dark" ? leftArrow : leftArrowBlack}
              alt=""
            />
          </div>
        ) : (
          <div
            className="year-calendar-arrow"
            style={{ cursor: "unset" }}
          ></div>
        )}
        <div className="month-calendar-label">
          {getMonthFromNum(month)} {year}
        </div>

        {getNextMonth({ year, month }).year in habit.readCalendar() ? (
          <div className="month-calendar-arrow" onClick={setNextMonth}>
            <img
              className="month-calendar-arrow-icon"
              src={theme === "dark" ? rightArrow : rightArrowBlack}
              alt=""
            />
          </div>
        ) : (
          <div
            className="year-calendar-arrow"
            style={{ cursor: "unset" }}
          ></div>
        )}
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
