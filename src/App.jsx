import React from 'react'
import Register from './pages/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    }
  ])

  return (
    <>
      <RouterProvider router={routes}>

      </RouterProvider>
    </>
  )
}

export default App