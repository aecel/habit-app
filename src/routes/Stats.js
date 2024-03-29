import { getMonthFromNum } from "../calendarFunctions"
import {
  getGoldColorArray,
  getGreenColorArray,
  getShadesArray,
} from "../colorFunctions"
import NothingHere from "../components/NothingHere"
import PolarAreaChart from "../components/PolarAreaChart"
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
  const cardColor = colors.cardColor

  const today = new Date()
  const yearNow = today.getFullYear()
  const monthNow = getMonthFromNum(today.getMonth() + 1)
  const dayNow = today.getDate()

  const getTop5UnstableHabits = useHabits().habitFunctions.getTop5UnstableHabits
  const top5UnstableHabits = getTop5UnstableHabits()
  const greenColorArray = getGreenColorArray()

  const getTop5StableHabits = useHabits().habitFunctions.getTop5StableHabits
  const top5StableHabits = getTop5StableHabits()
  const goldColorArray = getGoldColorArray()

  const getTop5Habits = useHabits().habitFunctions.getTop5Habits
  const top5Habits = getTop5Habits()

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
            <PolarAreaChart
              title="Top 5 Habits This Year"
              textColor={textColor}
              cardColor={cardColor}
              dataArray={top5Habits}
              dataRangeText={dataRangeText}
              barColorArray={getShadesArray("#145820")}
            />
            <StackedBarChart
              title="Top 5 Stable Habits This Year"
              textColor={textColor}
              cardColor={cardColor}
              dataArray={top5StableHabits}
              dataRangeText={dataRangeText}
              barColorArray={goldColorArray}
            />
            <StackedBarChart
              title="Top 5 Unstable Habits This Year"
              textColor={textColor}
              cardColor={cardColor}
              dataArray={top5UnstableHabits}
              dataRangeText={dataRangeText}
              barColorArray={greenColorArray}
            />
            {/* {allHabits} */}
          </div>
        </div>
      )}
    </>
  )
}

export default Stats
