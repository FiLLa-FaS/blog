import React from 'react'

import UiButton from '../UiButton'

import classes from './Header.module.scss'

function Header() {
  return (
    <header className={classes.header}>
      <h1 className={classes.header__title}>Realworld Blog</h1>
      <div className={classes.header__buttons}>
        <UiButton borderless>Sign In</UiButton>
        <UiButton large accent>
          Sign Up
        </UiButton>
      </div>
    </header>
  )
}

export default Header
