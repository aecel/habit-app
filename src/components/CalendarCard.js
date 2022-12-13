import StableCalendarCard from "./StableCalendarCard"
import UnstableCalendarCard from "./UnstableCalendarCard"

const CalendarCard = ({ habit }) => {
  return habit.isStable() ? (
    <StableCalendarCard habit={habit} />
  ) : (
    <UnstableCalendarCard habit={habit} />
  )
}

export default CalendarCard
