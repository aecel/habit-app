import React from "react"
import ReactDOM from "react-dom/client"
import { createHashRouter, RouterProvider } from "react-router-dom"
import TestHabitCards from "./components/TestHabitCards"
import AddHabit from "./routes/AddHabit"
import ErrorElement from "./routes/ErrorElement"
// import App from "./App"
import Root from "./routes/Root"

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
            element: <TestHabitCards />,
          },
          {
            path: "/testhabits",
            element: <TestHabitCards />,
          },
          {
            path: "/allhabits",
            element: <></>,
          },
          {
            path: "/yearcalendar",
            element: <></>,
          },
          {
            path: "/stablehabits",
            element: <></>,
          },
          {
            path: "/stats",
            element: <></>,
          },
          {
            path: "/settings",
            element: <></>,
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
