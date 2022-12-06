// import { useEffect, useState } from "react"
import { useHabits } from "../useHabits"
// import { useSettings } from "../useSettings"

const AllHabits = () => {
  const habits = useHabits().habits
  // const habitFunctions = useHabits().habitFunctions
  // const triToggleDay = habitFunctions.triToggleDay

  // const today = new Date()
  // const dayNow = today.getDate()
  // const monthNow = today.getMonth() + 1
  // const yearNow = today.getFullYear()

  // const settings = useSettings().settings

  // const [lessGreen, setLessGreen] = useState("")
  // const [moreGreen, setMoreGreen] = useState("")

  // useEffect(() => {
  //   if (settings.theme === "light") {
  //     setMoreGreen("#006D32")
  //     setLessGreen("#39D353")
  //   } else {
  //     setMoreGreen("#39D353")
  //     setLessGreen("#006D32")
  //   }
  // }, [settings.theme])

  return (
    <div id="AllHabits">
      {habits.map((habit) => {
        return (
          <div key={habit.readId()} className="all-habits-card">
            <h3
              style={{
                marginBottom: "0px",
              }}
            >
              {habit.readName()}
            </h3>
          </div>
        )
      })}
    </div>
  )
}

export default AllHabits
