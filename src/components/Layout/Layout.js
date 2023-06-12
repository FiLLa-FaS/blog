import React from 'react'
import PropTypes from 'prop-types'
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

Layout.defaultProps = {
  classElement: '',
}

Layout.propTypes = {
  classElement: PropTypes.string,
}

export default Layout
