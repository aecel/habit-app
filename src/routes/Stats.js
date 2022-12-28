import BarChart from "../components/BarChart"
import Instructions from "../components/Instructions"
import NothingHere from "../components/NothingHere"
import StatsCard from "../components/StatsCard"
import { useHabits } from "../useHabits"

const Stats = () => {
  const habits = useHabits().habits
  const allHabits = habits.map((habit) => {
    return <StatsCard habit={habit} key={habit.readId()} />
  })

  return (
    <>
      {allHabits.length === 0 ? (
        <NothingHere text={`Click on "Add Habit" to start forming habits!`} />
      ) : (
        <div className="cards-route-container">
          <Instructions />
          <div id="Stats" className="cards-route">
            <div className="stats-card-chart">
              <div
                style={{
                  width: "310px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // backgroundColor: "white",
                  boxSizing: "border-box",
                }}
              >
                <BarChart />
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
