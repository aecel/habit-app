import { useEffect, useRef, useState } from "react"
import ReactTooltip from "react-tooltip"
import leftArrow from "../images/SVG/left-arrow.svg"
import leftArrowBlack from "../images/SVG/left-arrow-black.svg"
import rightArrow from "../images/SVG/right-arrow.svg"
import rightArrowBlack from "../images/SVG/right-arrow-black.svg"
import { useSettings } from "../useSettings"
import { getMonthFromNum } from "../calendarFunctions"

const YearCalendar = ({
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

  const setPreviousYear = () => {
    if (year - 1 in habit.readCalendar()) {
      setYear(year - 1)
    }
  }

  const setNextYear = () => {
    if (year + 1 in habit.readCalendar()) {
      setYear(year + 1)
    }
  }

  // Gets the first day of the year
  // represented by a num (Sun = 1)
  // This is for shifting the first square in the calendar grid
  const jan1day = new Date(year, 0, 1).getDay() + 1
  const yearCalendarRef = useRef()
  const getDayTooltip = (day, month) => {
    if (day[1]["done"] !== "") {
      return (
        day[1]["done"] +
        " on " +
        getMonthFromNum(Number(month[0])) +
        " " +
        day[0] +
        " " +
        year
      )
    } else {
      return getMonthFromNum(Number(month[0])) + " " + day[0] + " " + year
    }
  }

  useEffect(() => {
    // This makes the scroll be horizontal even if you scroll vertically or horizontally
    const yearCalendar = yearCalendarRef.current
    yearCalendar.addEventListener("wheel", function (e) {
      if (e.deltaY > 0 || e.deltaX > 0) {
        yearCalendar.scrollLeft += 15
        e.preventDefault()
      } else if (e.deltaY <= 0 || e.deltaX <= 0) {
        yearCalendar.scrollLeft -= 15
        e.preventDefault()
      }
    })
  }, [])

  useEffect(() => {
    // This makes the calendar scroll to the end by default
    const yearCalendar = yearCalendarRef.current
    yearCalendar.scrollLeft = yearCalendar.scrollWidth
  }, [year])

  return (
    <div className="year-calendar-container">
      <div className="year-calendar-top">
        {year - 1 in habit.readCalendar() ? (
          <div className="year-calendar-arrow" onClick={setPreviousYear}>
            <img
              className="year-calendar-arrow-icon"
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
        <div className="year-calendar-label">{year}</div>

        {year + 2 in habit.readCalendar() ? (
          <div className="year-calendar-arrow" onClick={setNextYear}>
            <img
              className="year-calendar-arrow-icon"
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
      <div className="year-calendar-grid">
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
          ref={yearCalendarRef}
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
                  data-tip={getDayTooltip(day, month)}
                  className="year-calendar-day"
                  // onClick={
                  //   (year === yearNow &&
                  //     dayNow >= day[0] &&
                  //     monthNow === Number(month[0])) ||
                  //   (year === yearNow && monthNow > month[0]) ||
                  //   year < yearNow
                  //     ? () => {
                  //         triToggleDay({
                  //           id: habit.readId(),
                  //           year: year,
                  //           month: month[0],
                  //           day: day[0],
                  //         })
                  //       }
                  //     : () => {}
                  // }
                  style={
                    (year === yearNow &&
                      dayNow >= day[0] &&
                      monthNow === Number(month[0])) ||
                    (year === yearNow && monthNow > month[0]) ||
                    year < yearNow
                      ? {
                          // cursor: "pointer",
                          backgroundColor: `${
                            day[1]["done"] === "Done completely"
                              ? `${moreGreen}`
                              : day[1]["done"] === "Partially done"
                              ? `${lessGreen}`
                              : "var(--bg-color)"
                          }`,
                          color: `${
                            day[1]["done"] === "Done completely" ||
                            day[1]["done"] === "Partially done"
                              ? "var(--white)"
                              : "var(--dark-gray)"
                          }`,
                        }
                      : {
                          // backgroundColor: "var(--card-color)",
                          display: "none",
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
      <ReactTooltip />
    </div>
  )
}

export default YearCalendar
