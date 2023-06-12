import React from 'react'
import PropTypes from 'prop-types'
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

ArticleFormLayout.defaultProps = {
  classElement: '',
  create: false,
  edit: false,
}

ArticleFormLayout.propTypes = {
  classElement: PropTypes.string,
  create: PropTypes.bool,
  edit: PropTypes.bool,
}

export default ArticleFormLayout
