import { useHabits } from "../App"

const HabitCard = () => {
  const habits = useHabits().habits

  return (
    <>
      <div className="habit-cards">
        {habits.map((habit) => {
          return (
            <div className="habit-card">
              <p>Title: {habit.readProperties().name}</p>
              <p>Id: {habit.readProperties().id}</p>
              <p>Stable: {habit.readProperties().stable}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default HabitCard
