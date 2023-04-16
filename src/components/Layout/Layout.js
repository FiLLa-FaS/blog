import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../Header'

function Layout({ classElement }) {
  return (
    <div className={classElement}>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
