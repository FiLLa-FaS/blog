/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import PropTypes from 'prop-types'
import { useForm, useFieldArray } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'

import { articlesCurrentPage, authorizationToken } from '../../store/selectors'
import { fetchArticles, createNewArticle, updateArticle } from '../../store/articlesSlice'

import classes from './ArticleForm.module.scss'

function ArticleForm({ classElement, formData }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  })

  const currentPage = useSelector(articlesCurrentPage)
  const currentToken = useSelector(authorizationToken)
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    const article = {
      article: {
        title: data.articleTitle,
        description: data.articleDescription,
        body: data.articleText,
        tagList: [],
      },
      token: currentToken,
      slug: formData ? formData.slug : '',
    }
    data.tagList.map(({ tag }) => {
      article.article.tagList.push(tag)
      return false
    })
    if (formData) {
      const articleInfo = updateArticle(article)
      dispatch(articleInfo).then(() => dispatch(fetchArticles({ page: currentPage, token: currentToken })))
      // Апдейт статьи срабатывает с одного клика
    } else {
      const articleInfo = createNewArticle(article)
      dispatch(articleInfo).then(() => dispatch(fetchArticles({ page: currentPage, token: currentToken })))
      // Создание статьи срабатывает с одного клика
    }
  }

  return (
    <div className={`${classes['article-form']} ${classElement}`}>
      <h2 className={classes['article-form__title']}>{formData ? 'Edit article' : 'Create new article'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={classes['article-form__form']}>
        <label htmlFor="article-form-title" className={classes['article-form__label']}>
          Title
          <input
            id="article-form-title"
            type="text"
            className={classes['article-form__input']}
            placeholder="title"
            defaultValue={formData ? formData.title : ''}
            {...register('articleTitle', {
              required: 'This field is required',
              maxLength: { value: 5000, message: 'Your title cannot be longer than 5000 characters' },
            })}
          />
        </label>
        {errors.articleTitle && (
          <span className={classes['article-form__input-error']}>{errors.articleTitle.message}</span>
        )}
        <label htmlFor="article-form-description" className={classes['article-form__label']}>
          Short description
          <input
            id="article-form-description"
            type="text"
            className={classes['article-form__input']}
            placeholder="short description"
            defaultValue={formData ? formData.description : ''}
            {...register('articleDescription', {
              required: 'This field is required',
            })}
          />
        </label>
        {errors.articleDescription && (
          <span className={classes['article-form__input-error']}>{errors.articleDescription.message}</span>
        )}
        <label htmlFor="article-form-body" className={classes['article-form__label']}>
          Text
          <textarea
            id="article-form-body"
            type="text"
            className={`${classes['article-form__input']} ${classes['article-form__input--type--textarea']}`}
            placeholder="text"
            defaultValue={formData ? formData.body : ''}
            {...register('articleText', {
              required: 'This field is required',
            })}
          />
        </label>
        {errors.articleText && (
          <span className={classes['article-form__input-error']}>{errors.articleText.message}</span>
        )}
        <fieldset className={classes['article-form__tags']}>
          <h3 className={classes['article-form__tags-title']}> Tags</h3>
          <div className={classes['article-form__tags-container']}>
            {fields?.length !== 0 && (
              <div className={classes['article-form__tags-column']}>
                {fields?.map((field, index) => (
                  <div key={field.id} className={classes['article-form__tags-row']}>
                    <input
                      type="text"
                      placeholder="tag"
                      className={`${classes['article-form__input']} ${classes['article-form__input--type--tag']}`}
                      {...register(`tagList.${index}.tag`)}
                    />
                    <button
                      type="button"
                      className={`${classes['article-form__button']} ${classes['article-form__button--type--delete']}`}
                      onClick={() => remove(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              type="button"
              className={`${classes['article-form__button']} ${classes['article-form__button--type--add']}`}
              onClick={() => {
                append({ tag: '' })
              }}
            >
              Add tag
            </button>
          </div>
        </fieldset>
        <button
          type="submit"
          className={`${classes['article-form__button']} ${classes['article-form__button--type--submit']}`}
        >
          Send
        </button>
      </form>
    </div>
  )
}

ArticleForm.defaultProps = {
  classElement: '',
  formData: null,
}

ArticleForm.propTypes = {
  classElement: PropTypes.string,
  formData: PropTypes.shape({
    author: PropTypes.shape({
      following: PropTypes.bool.isRequired,
      image: PropTypes.string,
      username: PropTypes.string.isRequired,
    }),
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    favorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }),
}

export default ArticleForm

// TODO: редактирование тегов не работает, поэтому его тут нет
