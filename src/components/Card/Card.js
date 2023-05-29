import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

import { getFullArticle } from '../../store/articlesSlice'
import Image from '../Image'
import userIcon from '../../assets/Final-Avatar.png'

import classes from './Card.module.scss'

function Card({ article }) {
  const dispatch = useDispatch()
  const currentArticleSlug = article.slug

  const handleClick = (slug) => {
    dispatch(getFullArticle(slug))
  }

  function formatDate(releaseD) {
    if (releaseD && releaseD !== '') {
      return format(parseISO(releaseD), 'MMMM d, y')
    }
    return false
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
          <time className={classes['card__user-date']}>{formatDate(article.createdAt)}</time>
        </div>
        <Image url={article.author.image} placeholder={userIcon} />
      </div>
    </article>
  )
}

export default Card
