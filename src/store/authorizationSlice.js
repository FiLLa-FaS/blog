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
    status: 'idle',
    errors: {},
    token: null,
  },
  reducers: {
    logOut(state) {
      state.user = {}
      state.isLoggedIn = false
      state.errors = {}
      state.status = 'idle'
      localStorage.removeItem('token')
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading'
        state.errors = {}
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (action.payload.errors) {
          state.status = 'rejected'
          state.errors = action.payload.errors
        } else {
          state.status = 'finished'
          state.errors = {}
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'rejected'
        state.errors = action.payload
      })
      .addCase(signIn.pending, (state) => {
        state.status = 'loading'
        state.errors = {}
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload.errors) {
          state.status = 'rejected'
          state.errors = action.payload.errors
        } else {
          state.status = 'finished'
          state.isLoggedIn = true
          state.token = action.payload.user.token
          state.errors = {}
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'rejected'
        state.errors = action.payload
      })
      .addCase(getUserData.pending, (state) => {
        state.status = 'loading'
        state.errors = {}
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'finished'
        state.isLoggedIn = true
        state.user = action.payload
        state.token = localStorage.getItem('token')
      })
      .addCase(getUserData.rejected, (state) => {
        state.status = 'rejected'
      })
      .addCase(editUserData.pending, (state) => {
        state.status = 'loading'
        state.errors = {}
      })
      .addCase(editUserData.fulfilled, (state, action) => {
        if (action.payload.errors) {
          state.status = 'rejected'
          state.errors = action.payload.errors
        } else {
          state.status = 'finished'
          state.user = action.payload
        }
      })
      .addCase(editUserData.rejected, (state) => {
        state.status = 'rejected'
      })
  },
})

export const { logOut } = authorizationSlice.actions

export default authorizationSlice.reducer
