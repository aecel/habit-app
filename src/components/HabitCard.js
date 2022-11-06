import { useHabits } from "../App"

const HabitCard = () => {
  const habits = useHabits().habits
  const today = new Date()
  //   const dayNow = String(today.getDate()).padStart(2, "0")
  const monthNow = String(today.getMonth() + 1).padStart(2, "0")
  const yearNow = today.getFullYear()

  return (
    <>
      <div className="habit-cards">
        {habits.map((habit) => {
          return (
            <div key={habit.readProperties().id} className="habit-card">
              <p>Title: {habit.readProperties().name}</p>
              <p>Id: {habit.readProperties().id}</p>
              <p>Stable: {habit.readProperties().stable ? "true" : "false"}</p>
              <div className="calendar">
                {Object.entries(habit.readCalendar()[yearNow][monthNow]).map(
                  (day) => {
                    return (
                      <div
                        key={day[0]}
                        className="day"
                        style={{
                          backgroundColor: `${
                            day[1]["done"] === "true"
                              ? "#39D353"
                              : day[1]["done"] === "half-assed"
                              ? "#0E4429"
                              : "#161B22"
                          }`,
                        }}
                      >
                        {day[0]}
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default HabitCard
