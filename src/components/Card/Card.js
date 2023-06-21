import React from 'react'
import PropTypes from 'prop-types'
import { notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

import { getFullArticle, favoriteArticle, unfavoriteArticle } from '../../store/articlesSlice'
import { authorizationIsLoggedIn, authorizationToken } from '../../store/selectors'
import Image from '../Image'
import userIcon from '../../assets/images/Final-Avatar.png'

import classes from './Card.module.scss'

function Card({ article }) {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(authorizationIsLoggedIn)
  const currentArticleSlug = article.slug
  const currentToken = useSelector(authorizationToken)

  const [api, contextHolder] = notification.useNotification()

  const openNotification = () => {
    api.open({
      message: 'Требуется авторизация',
      description: 'Для этого действия требуется авторизация на странице',
      duration: 5,
    })
  }

  const handleClick = (slug) => {
    dispatch(getFullArticle(slug))
  }

  const handleLike = (slug) => {
    if (!isLoggedIn) {
      openNotification()
      return false
    }
    const data = {
      slug,
      token: currentToken,
    }

    if (article.favorited) {
      dispatch(unfavoriteArticle(data))
    } else {
      dispatch(favoriteArticle(data))
    }
    return false
  }

  function formatDate(releaseD) {
    if (releaseD && releaseD !== '') {
      return format(parseISO(releaseD), 'MMMM d, y')
    }
    return false
  }

  return (
    <article className={classes.card}>
      {contextHolder}
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
            <button
              type="button"
              className={`${classes['card__like-icon']} ${article.favorited ? classes['card__like-icon--marked'] : ''}`}
              aria-label="Like button"
              onClick={() => handleLike(currentArticleSlug)}
            />
            <p className={classes['card__like-amount']}>{article.favoritesCount}</p>
          </div>
        </div>
        <ul className={classes.card__tags}>
          {article?.tagList?.length !== 0 &&
            article?.tagList?.map((tag) => (
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

Card.defaultProps = {
  article: null,
}

Card.propTypes = {
  article: PropTypes.shape({
    author: PropTypes.shape({
      following: PropTypes.bool.isRequired,
      image: PropTypes.string,
      username: PropTypes.string.isRequired,
    }),
    body: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    favorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
}

export default Card
