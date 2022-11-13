import { useHabits } from "../App"

const HabitCard = () => {
  const habits = useHabits().habits
  const habitFunctions = useHabits().habitFunctions
  const triToggleDay = habitFunctions.triToggleDay
  const updateStable = habitFunctions.updateStable

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
              <p>Stable: {habit.isStable() ? "Sooo truue" : "False"}</p>
              <p>Date Created: {habit.readDateCreated()}</p>
              <p>Green Tasks: {habit.countGreenTasks()}</p>
              <p>Streaks: {JSON.stringify(habit.getStreaks())}</p>
              <p>Longest Streak: {habit.getMaxStreak()}</p>
              <p>Current Streak: {habit.getCurrentStreak()}</p>
              <p>Last Updated: {habit.readLastUpdated()}</p>
              <p>Last Missed Streak: {habit.getLastMissedStreak()}</p>
              <p>Days to Stabilize Habit: {habit.readDaysToStableHabit()}</p>
              <p>Days to Break Habit: {habit.readDaysToBreakHabit()}</p>
              <p>Day Diff: {habit.getDayDiff()} days</p>
              <p>Is Update Needed? {habit.isUpdateNeeded() ? "Yeppers" : "Nope"}</p>
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
                          updateStable(habit.readId())
                          console.log(typeof habit.getDayDiff())
                        }}
                        style={{
                          cursor: "pointer",
                          backgroundColor: `${
                            day[1]["done"] === "so true"
                              ? "#39D353"
                              : day[1]["done"] === "half-assed"
                              ? "#006D32"
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
