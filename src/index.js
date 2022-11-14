import React from "react"
import ReactDOM from "react-dom/client"
import { createHashRouter, RouterProvider } from "react-router-dom"
// import App from "./App"
import Root from "./routes/Root"

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <></>,
    children: [
      {
        errorElement: <></>,
        children: [
          {
            index: true,
            element: <></>,
          },
          {
            path: "/something1",
            element: <></>,
          },
        ],
      },
    ],
  },
])
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RouterProvider router={router} />)
