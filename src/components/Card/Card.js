import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { getFullArticle } from '../../store/articlesSlice'

import classes from './Card.module.scss'

function Card({ article }) {
  const dispatch = useDispatch()
  const currentArticleSlug = article.slug

  const handleClick = (slug) => {
    dispatch(getFullArticle(slug))
  }

  return (
    <article className={classes.card}>
      <div className={classes.card__column}>
        <div className={classes.card__heading}>
          <h2 className={classes.card__title}>
            <Link
              to={`/articles/${currentArticleSlug}`}
              onClick={() => handleClick(currentArticleSlug)}
              className={classes.card__link}
            >
              {article.title}
            </Link>
          </h2>

          <div className={classes.card__like}>
            <button type="button" className={classes['card__like-icon']} aria-label="Like button" />
            <p className={classes['card__like-amount']}>{article.favoritesCount}</p>
          </div>
        </div>
        <ul className={classes.card__tags}>
          {article.tagList.length !== 0 &&
            article.tagList.map((tag) => (
              <li key={tag} className={classes['card__tag-item']}>
                <span className={classes.card__tag}>{tag}</span>
              </li>
            ))}
        </ul>
        <p className={classes.card__text}>{article.description}</p>
      </div>
      <div className={classes.card__user}>
        <div className={classes['card__user-info']}>
          <h3 className={classes['card__user-name']}>{article.author.username}</h3>
          <time dateTime="20-05-2020" className={classes['card__user-date']}>
            {article.author.createdAt}
          </time>
        </div>
        <img src={article.author.image} alt="user" className={classes['card__user-picture']} />
      </div>
    </article>
  )
}

export default Card
