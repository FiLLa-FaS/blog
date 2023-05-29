import React from 'react'
import { useSelector } from 'react-redux'

import { articlesFullArticle } from '../../store/selectors'
import ArticleForm from '../ArticleForm/ArticleForm'

function ArticleFormLayout({ classElement, create, edit }) {
  const article = useSelector(articlesFullArticle)

  const renderForm = () => {
    if (create) {
      return <ArticleForm classElement={classElement} />
    }

    if (edit) {
      return <ArticleForm classElement={classElement} formData={article} />
    }

    return false
  }

  return <>{renderForm()}</>
}

export default ArticleFormLayout
