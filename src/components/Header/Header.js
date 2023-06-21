import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import UiButton from '../UiButton'
import Image from '../Image'
import { authorizationUser } from '../../store/selectors'
import { logOut } from '../../store/authorizationSlice'
import userIcon from '../../assets/images/Final-Avatar.png'

import classes from './Header.module.scss'

function Header() {
  const dispatch = useDispatch()
  const currentUser = useSelector(authorizationUser)

  const onLogOut = () => {
    dispatch(logOut())
  }

  return (
    <header className={classes.header}>
      <h1 className={classes.header__title}>
        <Link to="/" className={classes.header__link}>
          Realworld Blog
        </Link>
      </h1>
      {currentUser.user && (
        <div className={classes.header__container}>
          <Link to="/new-article" className={classes.header__link}>
            <UiButton small accent>
              Create article
            </UiButton>
          </Link>

          <Link to="/profile" className={classes.header__link}>
            <div className={classes.header__user}>
              <p className={classes.header__username}>{currentUser.user.username}</p>
              <Image url={currentUser.user.image ? currentUser.user.image : ''} placeholder={userIcon} />
            </div>
          </Link>
          <UiButton onClickFunction={onLogOut} large>
            Log Out
          </UiButton>
        </div>
      )}
      {!currentUser.user && (
        <div className={classes.header__buttons}>
          <Link to="/sign-in" className={classes.header__link}>
            <UiButton borderless>Sign In</UiButton>
          </Link>
          <Link to="/sign-up" className={classes.header__link}>
            <UiButton large accent>
              Sign Up
            </UiButton>
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
