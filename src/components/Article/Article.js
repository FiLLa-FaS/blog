import React from 'react'
import Markdown from 'markdown-to-jsx'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { articlesFullArticle } from '../../store/selectors'

import classes from './Article.module.scss'

function Article({ classElement }) {
  const article = useSelector(articlesFullArticle)

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
                <time dateTime="20-05-2020" className={classes['card-full__user-date']}>
                  {article.author.createdAt}
                </time>
              </div>
              <img src={article.author.image} alt="user" className={classes['card-full__user-picture']} />
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
