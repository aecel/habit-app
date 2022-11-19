import { NavLink, Outlet } from "react-router-dom"
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
import { HabitsProvider } from "../useHabits.js"

const Root = () => {
  return (
    <HabitsProvider>
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
    </HabitsProvider>
  )
}

export default Root
