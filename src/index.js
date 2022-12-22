import React from "react"
import ReactDOM from "react-dom/client"
import { createHashRouter, RouterProvider } from "react-router-dom"
import TestHabitCards from "./components/TestHabitCards"
import AddHabit from "./routes/AddHabit"
import AllHabits from "./routes/AllHabits"
import Calendar from "./routes/Calendar"
import ErrorElement from "./routes/ErrorElement"
import Home from "./routes/Home"
import Root from "./routes/Root"
import Settings from "./routes/Settings"
import StableHabits from "./routes/StableHabits"
import Stats from "./routes/Stats"

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorElement />,
    children: [
      {
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/testhabits",
            element: <TestHabitCards />,
          },
          {
            path: "/allhabits",
            element: <AllHabits />,
          },
          {
            path: "/yearcalendar",
            element: <Calendar />,
          },
          {
            path: "/stablehabits",
            element: <StableHabits />,
          },
          {
            path: "/stats",
            element: <Stats />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
          {
            path: "/addhabit",
            element: <AddHabit />,
          },
        ],
      },
    ],
  },
])
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RouterProvider router={router} />)
