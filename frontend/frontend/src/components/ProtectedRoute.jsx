import React from "react"
import ErrorAcceso from "../pages/ErrorAcceso"

function ProtectedRoute({ isAuth, children }) {
  if (!isAuth) {
    return <ErrorAcceso />
  }
  return children
}

export default ProtectedRoute
