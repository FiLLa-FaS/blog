/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { signUp } from '../../store/authorizationSlice'
import { authorizationErrors, authorizationStatus, authorizationHasError } from '../../store/selectors'
import UiButton from '../UiButton'

import classes from './FormSignUp.module.scss'

function FormSignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const signUpErrors = useSelector(authorizationErrors)
  const currentStatus = useSelector(authorizationStatus)
  const hasError = useSelector(authorizationHasError)

  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const user = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    }
    const registerInfo = signUp(user)

    dispatch(registerInfo).then((result) => {
      if (currentStatus === 'finished' && !hasError && !result.error) {
        navigate('/')
      }
    })

    if (Object.keys(signUpErrors).length !== 0) {
      const entries = Object.entries(signUpErrors)
      entries.forEach((entry) => {
        setError(entry[0], {
          type: 'server',
          message: entry[1],
        })
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <fieldset className={classes.form__fieldset}>
        <label htmlFor="form-signup-username" className={classes.form__label}>
          Username
          <input
            id="form-signup-username"
            type="text"
            placeholder="Username"
            className={`
      ${classes.form__input}
      ${errors.username && classes['form__input--invalid']}  
      `}
            {...register('username', {
              required: 'This field is required',
              minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
              maxLength: { value: 20, message: 'Your username cannot be longer than 20 characters' },
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'You can only use lowercase English letters and numbers',
              },
            })}
          />
        </label>
        {errors.username && <span className={classes.form__error}>{errors.username.message}</span>}
        <label htmlFor="form-signup-email" className={classes.form__label}>
          Email address
          <input
            id="form-signup-email"
            type="email"
            placeholder="Email address"
            className={`
      ${classes.form__input}
      ${errors.email && classes['form__input--invalid']}  
      `}
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /^[a-z0-9]+@[a-z0-9]+?\.[a-z]{2,3}$/,
                message: 'Email should contain only lowercase letters and @ symbol',
              },
            })}
          />
        </label>
        {errors.email && <span className={classes.form__error}>{errors.email.message}</span>}
        <label htmlFor="form-signup-password" className={classes.form__label}>
          Password
          <input
            id="form-signup-password"
            type="password"
            placeholder="Password"
            className={`
      ${classes.form__input}
      ${errors.password && classes['form__input--invalid']}  
      `}
            {...register('password', {
              required: 'This field is required',
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
              maxLength: { value: 40, message: 'Your password cannot be longer than 40 characters' },
            })}
          />
        </label>
        {errors.password && <span className={classes.form__error}>{errors.password.message}</span>}
        <label htmlFor="form-signup-password-repeat" className={classes.form__label}>
          Repeat password
          <input
            id="form-signup-password-repeat"
            type="password"
            placeholder="Repeat password"
            className={`
      ${classes.form__input}
      ${errors.passwordConfirm && classes['form__input--invalid']}  
      `}
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) => value === watch('password') || 'Passwords dont match',
            })}
          />
        </label>
        {errors.passwordConfirm && <span className={classes.form__error}>{errors.passwordConfirm.message}</span>}
      </fieldset>
      <fieldset className={`${classes.form__fieldset} ${classes['form__fieldset--type--agreement']}`}>
        <label
          htmlFor="form-signup-agreement"
          className={`${classes.form__label} ${classes['form__label--type--agreement']}`}
        >
          <input
            id="form-signup-agreement"
            type="checkbox"
            className={classes.form__checkbox}
            {...register('agreement', {
              required: 'This field is required',
            })}
          />
          I agree to the processing of my personal information
        </label>
        {errors.agreement && <span className={classes.form__error}>{errors.agreement.message}</span>}
      </fieldset>
      <fieldset className={classes.form__fieldset}>
        <UiButton classElement={classes.form__button} submit disabled={currentStatus === 'loading'}>
          Create
        </UiButton>
        <p className={classes.form__additional}>
          Already have an account?&ensp;
          <Link to="/sign-in" className={classes.form__switch}>
            Sign in.
          </Link>
        </p>
      </fieldset>
    </form>
  )
}

export default FormSignUp
