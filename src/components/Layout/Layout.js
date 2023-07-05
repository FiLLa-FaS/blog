import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import { notification } from 'antd'
import { useSelector } from 'react-redux'

import { articlesStatus, authorizationStatus } from '../../store/selectors'
import Header from '../Header'

function Layout({ classElement }) {
  const articleStatus = useSelector(articlesStatus)
  const authStatus = useSelector(authorizationStatus)
  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    const openNotification = () => {
      api.open({
        message: 'Ошибка',
        description: 'Во время выполнения действия произошла ошибка, попробуйте позже',
        duration: 5,
      })
    }

    if (articleStatus === 'rejected' || authStatus === 'rejected') {
      openNotification()
    }
  }, [articleStatus, authStatus, api])

  return (
    <div className={classElement}>
      {contextHolder}
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
