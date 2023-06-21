import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import { notification } from 'antd'
import { useSelector } from 'react-redux'

import { articlesError, authorizationHasError } from '../../store/selectors'
import Header from '../Header'

function Layout({ classElement }) {
  const errorArticles = useSelector(articlesError)
  const errorAuthorization = useSelector(authorizationHasError)
  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    const openNotification = () => {
      api.open({
        message: 'Ошибка',
        description: 'Во время выполнения действия произошла ошибка, попробуйте позже',
        duration: 5,
      })
    }

    if (errorArticles || errorAuthorization) {
      openNotification()
    }
  }, [errorArticles, errorAuthorization, api])

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
