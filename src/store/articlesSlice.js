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
    status: 'idle',
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
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'finished'
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.status = 'rejected'
      })
      .addCase(createNewArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createNewArticle.fulfilled, (state) => {
        state.status = 'finished'
      })
      .addCase(createNewArticle.rejected, (state) => {
        state.status = 'rejected'
      })
      .addCase(updateArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.status = 'finished'
      })
      .addCase(updateArticle.rejected, (state) => {
        state.status = 'rejected'
      })
      .addCase(deleteArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.status = 'finished'
      })
      .addCase(deleteArticle.rejected, (state) => {
        state.status = 'rejected'
      })
      .addCase(favoriteArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(favoriteArticle.fulfilled, (state, action) => {
        state.status = 'finished'
        if (action.payload.article.slug === state.fullArticle.slug) {
          state.fullArticle = action.payload.article
        }
        state.articles = state.articles.map((article) => {
          if (action.payload.article.slug === article.slug) {
            return { ...article, favorited: true, favoritesCount: article.favoritesCount + 1 }
          }
          return article
        })
      })
      .addCase(favoriteArticle.rejected, (state) => {
        state.status = 'rejected'
      })
      .addCase(unfavoriteArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(unfavoriteArticle.fulfilled, (state, action) => {
        state.status = 'finished'
        if (action.payload.article.slug === state.fullArticle.slug) {
          state.fullArticle = action.payload.article
        }
        state.articles = state.articles.map((article) => {
          if (action.payload.article.slug === article.slug) {
            return { ...article, favorited: false, favoritesCount: article.favoritesCount - 1 }
          }
          return article
        })
      })
      .addCase(unfavoriteArticle.rejected, (state) => {
        state.status = 'rejected'
      })
  },
})

export const { setPage, getFullArticle } = articlesSlice.actions

export default articlesSlice.reducer
