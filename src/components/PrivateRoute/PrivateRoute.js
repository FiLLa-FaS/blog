import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { authorizationIsLoggedIn } from '../../store/selectors'

function PrivateRoute() {
  const loggedIn = useSelector(authorizationIsLoggedIn)

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute
