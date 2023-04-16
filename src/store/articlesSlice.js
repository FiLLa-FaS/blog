/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import getArticlesApi from '../services/apiService'

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (page) => {
  const articlesPack = await getArticlesApi(page)
  return articlesPack
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articlesCount: null,
    fullArticle: {},
    page: 1,
    isLoading: false,
    hasError: false,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload
    },
    getFullArticle(state, action) {
      const currentArticle = state.articles.find((article) => article.slug === action.payload)
      state.fullArticle = currentArticle
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.isLoading = true
      state.hasError = false
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.isLoading = false
      state.articles = action.payload.articles
      state.articlesCount = action.payload.articlesCount
    },
    [fetchArticles.rejected]: (state) => {
      state.hasError = true
      state.isLoading = false
    },
  },
})

export const { setPage, getFullArticle } = articlesSlice.actions

export default articlesSlice.reducer
