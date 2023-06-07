/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  createArticleApi,
  deleteArticleApi,
  favoriteArticleApi,
  getArticlesApi,
  unfavoriteArticleApi,
  updateArticleApi,
} from '../services/apiService'

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async ({ page, token }) => {
  const articlesPack = await getArticlesApi(page, token)
  return articlesPack
})

export const createNewArticle = createAsyncThunk('authorization/createNewArticle', async ({ article, token }) => {
  const articleTemplate = await createArticleApi({ article }, token)
  return articleTemplate
})

export const updateArticle = createAsyncThunk('authorization/updateArticle', async ({ article, slug, token }) => {
  const articleTemplate = await updateArticleApi({ article }, slug, token)
  return articleTemplate
})

export const deleteArticle = createAsyncThunk('authorization/deleteArticle', async ({ slug, token }) => {
  const articleTemplate = await deleteArticleApi(slug, token)
  return articleTemplate
})

export const favoriteArticle = createAsyncThunk('authorization/favoriteArticle', async ({ slug, token }) => {
  const articleTemplate = await favoriteArticleApi(slug, token)
  return articleTemplate
})

export const unfavoriteArticle = createAsyncThunk('authorization/unfavoriteArticle', async ({ slug, token }) => {
  const articleTemplate = await unfavoriteArticleApi(slug, token)
  return articleTemplate
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
    [createNewArticle.pending]: (state) => {
      state.isLoading = true
      state.hasError = false
    },
    [createNewArticle.fulfilled]: (state) => {
      state.isLoading = false
      state.hasError = false
    },
    [createNewArticle.rejected]: (state) => {
      state.isLoading = false
      state.hasError = true
    },
    [updateArticle.pending]: (state) => {
      state.isLoading = true
      state.hasError = false
    },
    [updateArticle.fulfilled]: (state) => {
      state.isLoading = false
      state.hasError = false
    },
    [updateArticle.rejected]: (state) => {
      state.isLoading = false
      state.hasError = true
    },
    [deleteArticle.pending]: (state) => {
      state.isLoading = true
      state.hasError = false
    },
    [deleteArticle.fulfilled]: (state) => {
      state.isLoading = false
      state.hasError = false
    },
    [deleteArticle.rejected]: (state) => {
      state.isLoading = false
      state.hasError = true
    },
    [favoriteArticle.pending]: (state) => {
      state.isLoading = true
      state.hasError = false
    },
    [favoriteArticle.fulfilled]: (state, action) => {
      state.isLoading = false
      state.hasError = false
      if (action.payload.article.slug === state.fullArticle.slug) {
        state.fullArticle = action.payload.article
      }
      state.articles = state.articles.map((article) => {
        if (action.payload.article.slug === article.slug) {
          return { ...article, favorited: true, favoritesCount: article.favoritesCount + 1 }
        }
        return article
      })
    },
    [favoriteArticle.rejected]: (state) => {
      state.isLoading = false
      state.hasError = true
    },
    [unfavoriteArticle.pending]: (state) => {
      state.isLoading = true
      state.hasError = false
    },
    [unfavoriteArticle.fulfilled]: (state, action) => {
      state.isLoading = false
      state.hasError = false
      if (action.payload.article.slug === state.fullArticle.slug) {
        state.fullArticle = action.payload.article
      }
      state.articles = state.articles.map((article) => {
        if (action.payload.article.slug === article.slug) {
          return { ...article, favorited: false, favoritesCount: article.favoritesCount - 1 }
        }
        return article
      })
    },
    [unfavoriteArticle.rejected]: (state) => {
      state.isLoading = false
      state.hasError = true
    },
  },
})

export const { setPage, getFullArticle } = articlesSlice.actions

export default articlesSlice.reducer
