/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { getUserData, signIn } from '../../store/authorizationSlice'
import { authorizationErrors, authorizationToken } from '../../store/selectors'

import classes from './FormSignIn.module.scss'

function FormSignIn() {
  const dispatch = useDispatch()
  const signInErrors = useSelector(authorizationErrors)
  const currentToken = useSelector(authorizationToken)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const user = {
      user: {
        email: data.emailLogin,
        password: data.passwordLogin,
      },
    }
    const registerInfo = await signIn(user)
    await dispatch(registerInfo)

    localStorage.setItem('token', currentToken)

    const userInfo = await getUserData(localStorage.getItem('token'))

    await dispatch(userInfo)

    if (Object.keys(signInErrors).length !== 0) {
      const entries = Object.entries(signInErrors)
      setError('emailLogin', {
        type: 'server',
        message: entries[0][1],
      })
      setError('passwordLogin', {
        type: 'server',
        message: entries[0][1],
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <fieldset className={classes.form__fieldset}>
        <label htmlFor="form-signin-email" className={classes.form__label}>
          Email address
          <input
            id="form-signin-email"
            type="email"
            placeholder="Email address"
            className={`
      ${classes.form__input}
      ${errors.emailLogin && classes['form__input--invalid']}  
      `}
            {...register('emailLogin', {
              required: 'This field is required',
              pattern: {
                value: /^[a-z0-9]+@[a-z0-9]+?\.[a-z]{2,3}$/,
                message: 'Email should contain only lowercase letters and @ symbol',
              },
            })}
          />
        </label>
        {errors.emailLogin && <span className={classes.form__error}>{errors.emailLogin.message}</span>}
        <label htmlFor="form-signin-password" className={classes.form__label}>
          Password
          <input
            id="form-signin-password"
            type="password"
            placeholder="Password"
            className={`
      ${classes.form__input}
      ${errors.passwordLogin && classes['form__input--invalid']}  
      `}
            {...register('passwordLogin', {
              required: 'This field is required',
            })}
          />
        </label>
        {errors.passwordLogin && <span className={classes.form__error}>{errors.passwordLogin.message}</span>}
      </fieldset>
      <fieldset className={classes.form__fieldset}>
        <button type="submit" className={classes.form__button}>
          Login
        </button>
        <p className={classes.form__additional}>
          Don&#39;t have an account?&ensp;
          <Link to="/sign-up" className={classes.form__switch}>
            Sign Up.
          </Link>
        </p>
      </fieldset>
    </form>
  )
}

export default FormSignIn
