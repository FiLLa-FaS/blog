/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { signUpApi, signInApi, getUserApi, editUserDataApi } from '../services/apiService'

export const signUp = createAsyncThunk('authorization/signUp', async (userData) => {
  const user = await signUpApi(userData)
  return user
})

export const signIn = createAsyncThunk('authorization/signIn', async (userData) => {
  const user = await signInApi(userData)
  return user
})

export const getUserData = createAsyncThunk('authorization/getUserData', async (token) => {
  const user = await getUserApi(token)
  return user
})

export const editUserData = createAsyncThunk('authorization/editUserData', async ({ userData, token }) => {
  const user = await editUserDataApi({ user: userData }, token)
  return user
})

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    user: {},
    isLoggedIn: false,
    hasError: false,
    status: 'idle',
    errors: {},
    token: null,
  },
  reducers: {
    logOut(state) {
      state.user = {}
      state.isLoggedIn = false
      state.errors = {}
      localStorage.removeItem('token')
    },
  },
  extraReducers: {
    [signUp.pending]: (state) => {
      state.status = 'loading'
      state.hasError = false
    },
    [signUp.fulfilled]: (state, action) => {
      if (action.payload.errors) {
        state.status = 'finished'
        state.hasError = true
        state.errors = action.payload.errors
      } else {
        state.status = 'finished'
        state.hasError = false
        state.errors = {}
      }
    },
    [signUp.rejected]: (state, action) => {
      state.hasError = true
      state.status = 'finished'
      state.errors = action.payload
    },
    [signIn.pending]: (state) => {
      state.status = 'loading'
      state.hasError = false
    },
    [signIn.fulfilled]: (state, action) => {
      if (action.payload.errors) {
        state.status = 'finished'
        state.hasError = true
        state.errors = action.payload.errors
      } else {
        state.status = 'finished'
        state.isLoggedIn = true
        state.hasError = false
        state.token = action.payload.user.token
        state.errors = {}
      }
    },
    [signIn.rejected]: (state, action) => {
      state.hasError = true
      state.status = 'finished'
      state.errors = action.payload
    },
    [getUserData.pending]: (state) => {
      state.status = 'loading'
      state.hasError = false
      state.errors = {}
    },
    [getUserData.fulfilled]: (state, action) => {
      state.status = 'finished'
      state.isLoggedIn = true
      state.hasError = false
      state.user = action.payload
      state.token = localStorage.getItem('token')
    },
    [getUserData.rejected]: (state) => {
      state.hasError = true
      state.status = 'finished'
    },
    [editUserData.pending]: (state) => {
      state.status = 'loading'
      state.hasError = false
      state.errors = {}
    },
    [editUserData.fulfilled]: (state, action) => {
      if (action.payload.errors) {
        state.status = 'finished'
        state.hasError = true
        state.errors = action.payload.errors
      } else {
        state.status = 'finished'
        state.hasError = false
        state.user = action.payload
      }
    },
    [editUserData.rejected]: (state) => {
      state.hasError = true
      state.status = 'finished'
    },
  },
})

export const { logOut } = authorizationSlice.actions

export default authorizationSlice.reducer
