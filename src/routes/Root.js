import { createContext, useContext, useEffect, useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import newHabit from "../newHabit.js"
import "../styles/style.css"
import addHabitSvg from "../images/navlinks/addhabit.svg"
import allHabitsSvg from "../images/navlinks/allhabits.svg"
import calendarSvg from "../images/navlinks/calendar.svg"
import homeSvg from "../images/navlinks/home.svg"
import settingsSvg from "../images/navlinks/settings.svg"
import stableHabitsSvg from "../images/navlinks/stablehabits.svg"
import statsSvg from "../images/navlinks/stats.svg"
import testHabitsSvg from "../images/navlinks/testhabits.svg"
import ReactTooltip from "react-tooltip"

const HabitContext = createContext()
export const useHabits = () => useContext(HabitContext)
const Root = () => {
  const habit1 = newHabit({
    name: "Stable Habit",
    stable: true,
    lastUpdated: new Date("2022-10-30"),
  })
  const habit2 = newHabit({
    name: "Unstable Habit",
    stable: false,
    daysToStableHabit: 3,
  })
  const defaultSettings = {
    theme: "dark",
    daysToStableHabit: 66,
    unstableHabitLimit: 1,
    daysToBreakHabit: 3,
  }
  const [habits, setHabits] = useState([habit1, habit2])
  const [settings, setSettings] = useState(defaultSettings)

  const getIndexById = (id) => {
    // Get index of a habit if you give the id
    // Returns -1 if id does not exist
    const targetHabit = habits.filter((habit) => {
      return habit.readId() === id
    })[0]
    const index = habits.indexOf(targetHabit)
    return index
  }

  const createHabit = (habit) => {
    const nextHabits = [...habits]
    nextHabits.push(habit)
    setHabits(nextHabits)
  }

  const readStableHabits = () => {
    return habits.filter((habit) => {
      return habit.isStable() === true
    })
  }

  const readUnstableHabits = () => {
    return habits.filter((habit) => {
      return habit.isStable() === false
    })
  }

  const triToggleDay = ({ id, year, month, day }) => {
    // propertiesToEdit sample:
    // {
    //   newSomethijng: "hellp",
    //   newOtherThiing: 2133,
    // }
    const nextHabits = [...habits]
    const index = getIndexById(id)
    const habitToEdit = nextHabits[index]
    const updatedHabit = habitToEdit.triToggleDay({ year, month, day })
    nextHabits[index] = updatedHabit
    setHabits(nextHabits)
  }

  const updateDay = ({ id, year, month, day, taskDone, taskNotes }) => {
    const nextHabits = [...habits]
    const index = getIndexById(id)
    const habitToEdit = nextHabits[index]
    const updatedHabit = habitToEdit.updateDay({
      year,
      month,
      day,
      taskDone,
      taskNotes,
    })
    nextHabits[index] = updatedHabit
    setHabits(nextHabits)
  }

  const deleteHabit = (id) => {
    const nextHabits = [...habits]
    const index = getIndexById(id)
    if (index !== -1) {
      nextHabits.splice(index, 1)
      setHabits(nextHabits)
    }
  }

  const promoteHabit = (index) => {
    const nextHabits = [...habits]
    const updatedHabit = nextHabits[index].updateProperties({ newStable: true })
    nextHabits[index] = updatedHabit
    setHabits(nextHabits)
  }

  const demoteHabit = (index) => {
    const nextHabits = [...habits]
    const updatedHabit = nextHabits[index].updateProperties({
      newStable: false,
    })
    nextHabits[index] = updatedHabit
    setHabits(nextHabits)
  }

  const updateSettings = (propertiesToEdit) => {
    const nextSettings = { ...settings }
    for (const property in propertiesToEdit) {
      nextSettings[property] = propertiesToEdit[property]
    }
    setSettings(nextSettings)
  }

  const submitAddHabitForm = (form) => {
    // const form = event.target.parentElement
    const formData = new FormData(form)
    const name = formData.get("habit-name")
    const stability = formData.get("stability")
    let stable
    if (stability === "stable") {
      stable = true
    } else {
      stable = false
    }
    const trigger = formData.get("trigger")
    const immediateReward = formData.get("immediate-reward")

    const properties = { name, stable, trigger, immediateReward }
    const habitToCreate = newHabit(properties)
    createHabit(habitToCreate)
    form.reset()
  }

  const habitFunctions = {
    getIndexById,
    createHabit,
    readStableHabits,
    readUnstableHabits,
    triToggleDay,
    updateDay,
    deleteHabit,
    promoteHabit,
    demoteHabit,
    updateSettings,
    submitAddHabitForm,
  }

  useEffect(() => {
    // deleteHabit(habit1.readId())
    updateDay({
      id: habit1.readId(),
      year: 2022,
      month: 11,
      day: 4,
      taskDone: "half-assed",
    })
    updateDay({
      id: habit1.readId(),
      year: 2022,
      month: 11,
      day: 5,
      taskDone: "half-assed",
    })
    updateDay({
      id: habit1.readId(),
      year: 2022,
      month: 11,
      day: 6,
      taskDone: "so true",
    })
    updateDay({
      id: habit2.readId(),
      year: 2022,
      month: 11,
      day: 1,
      taskDone: "half-assed",
    })
  }, [])

  useEffect(() => {
    // console.table(habits)
    console.log("Stable Habit Table:")
    console.table(Object.entries(habits[0].readCalendar()[2022]))
    console.log("Unstable Habit Table:")
    console.table(Object.entries(habits[1].readCalendar()[2022]))
  }, [habits])

  return (
    <HabitContext.Provider
      value={{
        habits: habits,
        settings: settings,
        habitFunctions: habitFunctions,
      }}
    >
      <div className="Root">
        <div className="top-ghost-div"></div>
        <Outlet />
        <footer className="navbar">
          <nav>
            <NavLink
              data-tip="Test Habits"
              to={"/testhabits"}
              id="testhabits"
              className={({ isActive, isPending }) =>
                isActive
                  ? "header-tab chosen-tab"
                  : isPending
                  ? "header-tab"
                  : "header-tab"
              }
            >
              <img className="header-tab-svg" src={testHabitsSvg} alt="" />
            </NavLink>
            <NavLink
              data-tip="All Habits"
              to={"/allhabits"}
              id="allhabits"
              className={({ isActive, isPending }) =>
                isActive
                  ? "header-tab chosen-tab"
                  : isPending
                  ? "header-tab"
                  : "header-tab"
              }
            >
              <img className="header-tab-svg" src={allHabitsSvg} alt="" />
            </NavLink>
            <NavLink
              data-tip="Calendar"
              to={"/yearcalendar"}
              id="yearcalendar"
              className={({ isActive, isPending }) =>
                isActive
                  ? "header-tab chosen-tab"
                  : isPending
                  ? "header-tab"
                  : "header-tab"
              }
            >
              <img className="header-tab-svg" src={calendarSvg} alt="" />
            </NavLink>
            <NavLink
              data-tip="Home"
              to={"/"}
              id="home"
              className={() =>
                window.location.hash === "#/" || window.location.hash === ""
                  ? "header-tab chosen-tab"
                  : "header-tab"
              }
            >
              <img className="header-tab-svg" src={homeSvg} alt="" />
            </NavLink>
            <NavLink
              data-tip="Stable Habits"
              to={"/stablehabits"}
              id="stablehabits"
              className={({ isActive, isPending }) =>
                isActive
                  ? "header-tab chosen-tab"
                  : isPending
                  ? "header-tab"
                  : "header-tab"
              }
            >
              <img className="header-tab-svg" src={stableHabitsSvg} alt="" />
            </NavLink>
            <NavLink
              data-tip="Stats"
              to={"/stats"}
              id="stats"
              className={({ isActive, isPending }) =>
                isActive
                  ? "header-tab chosen-tab"
                  : isPending
                  ? "header-tab"
                  : "header-tab"
              }
            >
              <img className="header-tab-svg" src={statsSvg} alt="" />
            </NavLink>
            <NavLink
              data-tip="Settings"
              to={"/settings"}
              id="settings"
              className={({ isActive, isPending }) =>
                isActive
                  ? "header-tab chosen-tab"
                  : isPending
                  ? "header-tab"
                  : "header-tab"
              }
            >
              <img className="header-tab-svg" src={settingsSvg} alt="" />
            </NavLink>
            <NavLink
              data-tip="Add Habit"
              to={"/addhabit"}
              id="addhabit"
              className={({ isActive, isPending }) =>
                isActive
                  ? "header-tab chosen-tab"
                  : isPending
                  ? "header-tab"
                  : "header-tab"
              }
            >
              <img className="header-tab-svg" src={addHabitSvg} alt="" />
            </NavLink>
          </nav>
        </footer>
        <div className="bottom-ghost-div"></div>
        <ReactTooltip />
      </div>
    </HabitContext.Provider>
  )
}

export default Root
