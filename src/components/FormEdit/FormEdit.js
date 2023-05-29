/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import { editUserData } from '../../store/authorizationSlice'
import { authorizationUser } from '../../store/selectors'

import classes from './FormEdit.module.scss'

function FormEdit() {
  const dispatch = useDispatch()
  const currentUser = useSelector(authorizationUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    const newUser = {}
    if (data.avatarUrlEdit && data.avatarUrlEdit !== '' && data.avatarUrlEdit !== currentUser.user.image) {
      newUser.image = data.avatarUrlEdit
    }
    if (data.emailEdit && data.emailEdit !== '' && data.emailEdit !== currentUser.user.email) {
      newUser.email = data.emailEdit
    }
    if (data.passwordEdit && data.passwordEdit !== '' && data.passwordEdit !== currentUser.user.password) {
      newUser.password = data.passwordEdit
    }
    if (data.usernameEdit && data.usernameEdit !== '' && data.usernameEdit !== currentUser.user.username) {
      newUser.username = data.usernameEdit
    }

    const editUserInfo = editUserData({ userData: newUser, token: currentUser.user.token })
    dispatch(editUserInfo)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <fieldset className={classes.form__fieldset}>
        <label className={classes.form__label}>
          Username
          <input
            type="text"
            placeholder="Username"
            className={`
      ${classes.form__input}
      ${errors.username && classes['form__input--invalid']}  
      `}
            {...register('usernameEdit', {
              minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
              maxLength: { value: 20, message: 'Your username cannot be longer than 20 characters' },
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'You can only use lowercase English letters and numbers',
              },
            })}
          />
        </label>
        {errors.usernameEdit && <span className={classes.form__error}>{errors.usernameEdit.message}</span>}
        <label className={classes.form__label}>
          Email address
          <input
            type="email"
            placeholder="Email address"
            className={`
      ${classes.form__input}
      ${errors.username && classes['form__input--invalid']}  
      `}
            {...register('emailEdit', {
              pattern: {
                value: /^[a-z0-9]+@[a-z0-9]+?\.[a-z]{2,3}$/,
                message: 'Email should contain only lowercase letters and @ symbol',
              },
            })}
          />
        </label>
        {errors.emailEdit && <span className={classes.form__error}>{errors.emailEdit.message}</span>}
        <label className={classes.form__label}>
          New password
          <input
            type="password"
            placeholder="New password"
            className={`
      ${classes.form__input}
      ${errors.username && classes['form__input--invalid']}  
      `}
            {...register('passwordEdit', {
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
              maxLength: { value: 40, message: 'Your password cannot be longer than 40 characters' },
            })}
          />
        </label>
        {errors.passwordEdit && <span className={classes.form__error}>{errors.passwordEdit.message}</span>}
        <label className={classes.form__label}>
          Avatar Image (url)
          <input
            type="url"
            placeholder="Avatar image"
            className={`
      ${classes.form__input}
      ${errors.username && classes['form__input--invalid']}  
      `}
            {...register('avatarUrlEdit', {})}
          />
        </label>
        {errors.avatarUrlEdit && <span className={classes.form__error}>{errors.avatarUrlEdit.message}</span>}
      </fieldset>
      <fieldset className={classes.form__fieldset}>
        <button type="submit" className={classes.form__button}>
          Save
        </button>
      </fieldset>
    </form>
  )
}

export default FormEdit
