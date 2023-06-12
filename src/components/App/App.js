import React, { useEffect } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchArticles } from '../../store/articlesSlice'
import { getUserData } from '../../store/authorizationSlice'
import { articlesCurrentPage, authorizationToken } from '../../store/selectors'
import CardList from '../CardList'
import Article from '../Article'
import ArticleFormLayout from '../ArticleFormLayout'
import Layout from '../Layout'
import Popup from '../Popup/Popup'
import PrivateRoute from '../PrivateRoute'

import classes from './App.module.scss'

function App() {
  const dispatch = useDispatch()
  const currentPage = useSelector(articlesCurrentPage)
  const currentToken = useSelector(authorizationToken)

  useEffect(() => {
    dispatch(getUserData(localStorage.getItem('token')))
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchArticles({ page: currentPage, token: currentToken }))
  }, [dispatch, currentPage, currentToken])

  return (
    <Routes>
      <Route path="/" element={<Layout classElement={classes.app} />}>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route index element={<CardList classElement={classes.app__cards} />} />
        <Route path="articles" element={<CardList classElement={classes.app__cards} />} />
        <Route path="articles/:slug" element={<Article classElement={classes.app__cards} />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="articles/:slug/edit" element={<ArticleFormLayout classElement={classes.app__cards} edit />} />
          <Route path="profile" element={<Popup edit />} />
          <Route path="new-article" element={<ArticleFormLayout classElement={classes.app__cards} create />} />
        </Route>
        <Route path="sign-in" element={<Popup signIn />} />
        <Route path="sign-up" element={<Popup signUp />} />

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

// TODO: вынести отдельно цвета и шрифты в переменные
// TODO: решить вопрос с the same key в списках
// TODO: сделать уведомление об успешных/неуспешных действиях для статей и авторизации
// TODO: не забыть выключить исключения eslint
// TODO: настроить общие кнопки везде (сейчас кусками UiButton, а кусками теги кнопок)
// TODO: почекать нейминг и возможно поменять (особенно форма для создания/редактирования, разбивка на краткую/полную статью и так далее)
// TODO: редирект после отправки форм
// TODO: дисейблить кнопку после отправки форм
// TODO: лайки не меняются, если поставить их в полной статье, а потом вернуться в список карточек

// adamsmasher, fillafastest@gmail.com, 12345678
