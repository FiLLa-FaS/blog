import React, { useEffect } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchArticles } from '../../store/articlesSlice'
import { articlesCurrentPage } from '../../store/selectors'
import CardList from '../CardList'
import Article from '../Article'
import Layout from '../Layout'

import classes from './App.module.scss'

function App() {
  const dispatch = useDispatch()
  const currentPage = useSelector(articlesCurrentPage)

  useEffect(() => {
    dispatch(fetchArticles(currentPage))
  }, [dispatch, currentPage])

  return (
    <Routes>
      <Route path="/" element={<Layout classElement={classes.app} />}>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route index element={<CardList classElement={classes.app__cards} />} />
        <Route path="articles" element={<CardList classElement={classes.app__cards} />} />
        <Route path="articles/:slug" element={<Article classElement={classes.app__cards} />} />
        <Route
          path="*"
          element={
            <p>
              Такой страницы не найдено. Вернуться на <Link to="/">главную</Link>
            </p>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
