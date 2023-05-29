import React from 'react'
import Markdown from 'markdown-to-jsx'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { Popconfirm } from 'antd'

import Image from '../Image'
import { articlesFullArticle, authorizationToken, authorizationUser } from '../../store/selectors'
import { deleteArticle } from '../../store/articlesSlice'
import userIcon from '../../assets/Final-Avatar.png'

import classes from './Article.module.scss'

function Article({ classElement }) {
  const article = useSelector(articlesFullArticle)
  const currentUser = useSelector(authorizationUser)
  const currentToken = useSelector(authorizationToken)
  const dispatch = useDispatch()

  function formatDate(releaseD) {
    if (releaseD && releaseD !== '') {
      return format(parseISO(releaseD), 'MMMM d, y')
    }
    return false
  }

  const onArticleDelete = () => {
    const articleInfo = deleteArticle({ slug: article.slug, token: currentToken })
    dispatch(articleInfo)
    // TODO: статья удалилась, но в редаксе все rejected
  }

  return (
    <>
      {article.slug && (
        <article className={`${classes['card-full']} ${classElement}`}>
          <div className={classes['card-full__wrapper']}>
            <div className={classes['card-full__column']}>
              <div className={classes['card-full__heading']}>
                <h2 className={classes['card-full__title']}>{article.title}</h2>
                <div className={classes['card-full__like']}>
                  <button type="button" className={classes['card-full__like-icon']} aria-label="Like button" />
                  <p className={classes['card-full__like-amount']}>{article.favoritesCount}</p>
                </div>
              </div>
              <ul className={classes['card-full__tags']}>
                {article.tagList.length !== 0 &&
                  article.tagList.map((tag) => (
                    <li key={tag} className={classes['card-full__tag-item']}>
                      <span className={classes['card-full__tag']}>{tag}</span>
                    </li>
                  ))}
              </ul>
              <p className={classes['card-full__text']}>{article.description}</p>
            </div>
            <div className={classes['card-full__user']}>
              <div className={classes['card-full__user-info']}>
                <h3 className={classes['card-full__user-name']}>{article.author.username}</h3>
                <time dateTime={article.createdAt} className={classes['card-full__user-date']}>
                  {formatDate(article.createdAt)}
                </time>
              </div>
              <Image url={article.author.image} placeholder={userIcon} />
              {currentUser?.user?.username && currentUser.user.username === article.author.username && (
                <>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => onArticleDelete()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button type="button" className={classes['card-full__button-delete']}>
                      Delete
                    </button>
                  </Popconfirm>

                  <Link to={`/articles/${article.slug}/edit`}>
                    <button type="button" className={classes['card-full__button-edit']}>
                      Edit
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className={classes['card-full__markdown']}>
            <Markdown>{article.body}</Markdown>
          </div>
        </article>
      )}
      {!article.slug && (
        <p>
          Такой страницы не существует. Вернуться на <Link to="/">главную</Link>
        </p>
      )}
    </>
  )
}

export default Article
