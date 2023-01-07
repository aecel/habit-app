import BarChart from "../components/BarChart"
import NothingHere from "../components/NothingHere"
import StatsCard from "../components/StatsCard"
import getMonthFromNum from "../getMonthFromNum"
import { useHabits } from "../useHabits"
import { useSettings } from "../useSettings"

const Stats = () => {
  const habits = useHabits().habits
  const allHabits = habits.map((habit) => {
    return <StatsCard habit={habit} key={habit.readId()} />
  })

  const colors = useSettings().colors
  const textColor = colors.textColor
  const barColor = colors.moreGreen

  const today = new Date()
  const yearNow = today.getFullYear()
  const monthNow = getMonthFromNum(today.getMonth() + 1)
  const countGreenTasksThisYear =
    useHabits().habitFunctions.countGreenTasksThisYear
  const greenTaskArray = countGreenTasksThisYear()
  const totalCount = greenTaskArray.reduce(
    (total, currentValue) => total + currentValue,
    0
  )
  return (
    <>
      {allHabits.length === 0 ? (
        <NothingHere text={`Click on "Add Habit" to start forming habits!`} />
      ) : (
        <div className="cards-route-container">
          <div id="Stats" className="cards-route">
            <div className="stats-card-chart">
              <div className="stats-card-title">
                Number of Green/Gold Tasks This Year<br></br>
                ({monthNow} {yearNow - 1} - {monthNow} {yearNow})
              </div>
              <BarChart textColor={textColor} dataArray={greenTaskArray} />
              <div className="stats-card-text">
                Total Green/Gold Tasks: {totalCount}
              </div>
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
