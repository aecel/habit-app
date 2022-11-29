const YearCalendar = ({
  habit,
  yearNow,
  monthNow,
  dayNow,
  triToggleDay,
  moreGreen,
  lessGreen,
}) => {
  return (
    <div className="year-calendar">
      {Object.entries(habit.readCalendar()[yearNow]).map((month) => {
        return Object.entries(month[1]).map((day) => {
          return (
            <div
              key={day[0]}
              data-key={day[0]}
              className="year-calendar-day"
              onClick={
                (dayNow >= day[0] && monthNow === Number(month[0])) ||
                monthNow > month[0]
                  ? () => {
                      triToggleDay({
                        id: habit.readId(),
                        year: yearNow,
                        month: month[0],
                        day: day[0],
                      })
                    }
                  : () => {}
              }
              style={
                (dayNow >= day[0] && monthNow === Number(month[0])) ||
                monthNow > month[0]
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
  )
}

export default YearCalendar
