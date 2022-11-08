import { useHabits } from "../App"

const HabitCard = () => {
  const habits = useHabits().habits
  const habitFunctions = useHabits().habitFunctions
  const triToggleDay = habitFunctions.triToggleDay

  const today = new Date()
  //   const dayNow = String(today.getDate()).padStart(2, "0")
  const monthNow = today.getMonth() + 1
  const yearNow = today.getFullYear()

  return (
    <>
      <div className="habit-cards">
        {habits.map((habit) => {
          return (
            <div key={habit.readId()} className="habit-card">
              <p>Title: {habit.readName()}</p>
              <p>Id: {habit.readId()}</p>
              <p>Stable: {habit.readStable() ? "Sooo truue" : "False"}</p>
              <p>Date Created: {habit.readDateCreated()}</p>
              <p>Green Tasks: {habit.countGreenTasks()}</p>
              <p>Streaks: {JSON.stringify(habit.getStreaks())}</p>
              <p>Longest Streak: {habit.getMaxStreak()}</p>
              <p>Current Streak: {habit.getCurrentStreak()}</p>
              <p>Last Updated: {habit.readLastUpdated()}</p>
              <div className="calendar">
                {Object.entries(habit.readCalendar()[yearNow][monthNow]).map(
                  (day) => {
                    return (
                      <div
                        key={day[0]}
                        className="day"
                        onClick={() => {
                          console.log(day[0])
                          triToggleDay({
                            id: habit.readId(),
                            year: yearNow,
                            month: monthNow,
                            day: day[0],
                          })
                        }}
                        style={{
                          cursor: "pointer",
                          backgroundColor: `${
                            day[1]["done"] === "so true"
                              ? "#26A641"
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
