import { getMonthFromNum } from "../calendarFunctions"
import BarChart from "../components/BarChart"
import NothingHere from "../components/NothingHere"
import StackedBarChart from "../components/StackedBarChart"
import StatsCard from "../components/StatsCard"
import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"

const Stats = () => {
  const habits = useHabits().habits
  const allHabits = habits.map((habit) => {
    return <StatsCard habit={habit} key={habit.readId()} />
  })

  const colors = useSettings().colors
  const textColor = colors.textColor

  const today = new Date()
  const yearNow = today.getFullYear()
  const monthNow = getMonthFromNum(today.getMonth() + 1)
  const dayNow = today.getDate()

  const countGreenTasksArray = useHabits().habitFunctions.countGreenTasksArray
  const greenTaskArray = countGreenTasksArray()

  const dataRangeText = `${monthNow} ${dayNow} ${
    yearNow - 1
  } - ${monthNow} ${dayNow} ${yearNow}`

  return (
    <>
      {allHabits.length === 0 ? (
        <NothingHere text={`Click on "Add Habit" to start forming habits!`} />
      ) : (
        <div className="cards-route-container">
          <div id="Stats" className="cards-route">
            <div className="stats-card-chart">
              <div className="stats-card-title">
                Number of Green/Gold Tasks This Year
                <div className="sub-text">{dataRangeText}</div>
              </div>
              <StackedBarChart
                textColor={textColor}
                dataArray={greenTaskArray}
              />
              <div className="card-bottom"></div>
            </div>
            {allHabits}
          </div>
        </div>
      )}
    </>
  )
}

export default Stats
