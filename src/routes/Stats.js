import BarChart from "../components/BarChart"
import NothingHere from "../components/NothingHere"
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

  const countGreenTasksByYear = useHabits().habitFunctions.countGreenTasksByYear
  const greenTaskArray = countGreenTasksByYear(2022)
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
                Number of Green/Gold Tasks This Year
              </div>
              <div
                style={{
                  width: "310px",
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // backgroundColor: "white",
                  boxSizing: "border-box",
                }}
              >
                <BarChart textColor={textColor} dataArray={greenTaskArray} />
              </div>
              <div>Total Green/Gold Tasks: {totalCount}</div>
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
