import React from 'react'

import FormSignUp from '../FormSignUp'
import FormSignIn from '../FormSignIn'
import FormEdit from '../FormEdit'

import classes from './Popup.module.scss'

function Popup({ signUp, signIn, edit }) {
  const renderTitle = () => {
    if (signUp) {
      return 'Create new account'
    }
    if (signIn) {
      return 'Sign In'
    }
    if (edit) {
      return 'Edit Profile'
    }
    return 'Title'
  }

  const renderForm = () => {
    if (signUp) {
      return <FormSignUp />
    }
    if (signIn) {
      return <FormSignIn />
    }
    if (edit) {
      return <FormEdit />
    }
    return false
  }
  return (
    <div className={classes.popup}>
      <div className={classes.popup__container}>
        <h2 className={classes.popup__title}>{renderTitle()}</h2>
        {renderForm()}
      </div>
    </div>
  )
}

export default Popup
