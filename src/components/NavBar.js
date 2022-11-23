import addHabitSvg from "../images/navlinks/addhabit.svg"
import allHabitsSvg from "../images/navlinks/allhabits.svg"
import calendarSvg from "../images/navlinks/calendar.svg"
import homeSvg from "../images/navlinks/home.svg"
import settingsSvg from "../images/navlinks/settings.svg"
import stableHabitsSvg from "../images/navlinks/stablehabits.svg"
import statsSvg from "../images/navlinks/stats.svg"
import testHabitsSvg from "../images/navlinks/testhabits.svg"

import addHabitSvgBlack from "../images/navlinks/addhabit-black.svg"
import allHabitsSvgBlack from "../images/navlinks/allhabits-black.svg"
import calendarSvgBlack from "../images/navlinks/calendar-black.svg"
import homeSvgBlack from "../images/navlinks/home-black.svg"
import settingsSvgBlack from "../images/navlinks/settings-black.svg"
import stableHabitsSvgBlack from "../images/navlinks/stablehabits-black.svg"
import statsSvgBlack from "../images/navlinks/stats-black.svg"
import testHabitsSvgBlack from "../images/navlinks/testhabits-black.svg"
import { NavLink } from "react-router-dom"
import { useSettings } from "../useSettings"

const NavBar = () => {
  const settings = useSettings().settings

  return (
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
          <img
            className="header-tab-svg"
            src={settings.theme === "dark" ? testHabitsSvg : testHabitsSvgBlack}
            alt=""
          />
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
          <img
            className="header-tab-svg"
            src={settings.theme === "dark" ? allHabitsSvg : allHabitsSvgBlack}
            alt=""
          />
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
          <img
            className="header-tab-svg"
            src={settings.theme === "dark" ? calendarSvg : calendarSvgBlack}
            alt=""
          />
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
          <img
            className="header-tab-svg"
            src={settings.theme === "dark" ? homeSvg : homeSvgBlack}
            alt=""
          />
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
          <img
            className="header-tab-svg"
            src={
              settings.theme === "dark" ? stableHabitsSvg : stableHabitsSvgBlack
            }
            alt=""
          />
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
          <img
            className="header-tab-svg"
            src={settings.theme === "dark" ? statsSvg : statsSvgBlack}
            alt=""
          />
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
          <img
            className="header-tab-svg"
            src={settings.theme === "dark" ? settingsSvg : settingsSvgBlack}
            alt=""
          />
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
          <img
            className="header-tab-svg"
            src={settings.theme === "dark" ? addHabitSvg : addHabitSvgBlack}
            alt=""
          />
        </NavLink>
      </nav>
    </footer>
  )
}

export default NavBar
