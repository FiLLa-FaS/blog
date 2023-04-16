import React from 'react'
import { useSelector } from 'react-redux'
import BarLoader from 'react-spinners/BarLoader'
import { v4 as uuidv4 } from 'uuid'

import Card from '../Card'
import CustomPagination from '../CustomPagination'
import { articlesArr, articlesError, articlesStatus } from '../../store/selectors'

import classes from './CardList.module.scss'

function CardList({ classElement }) {
  const articles = useSelector(articlesArr)
  const error = useSelector(articlesError)
  const status = useSelector(articlesStatus)

  const renderArticles = () => {
    if (error) {
      return <p>Что-то пошло не так</p>
    }
    return (
      <>
        {status && !error && (
          <BarLoader width="100%" color="#2196f3" cssOverride={{ position: 'absolute', top: '0' }} />
        )}
        {articles && (
          <>
            <ul className={`${classes.cards} ${classElement}`}>
              {articles.map((article) => (
                <li key={uuidv4()} className={classes.cards__item}>
                  <Card article={article} />
                </li>
              ))}
            </ul>
            <CustomPagination />
          </>
        )}
      </>
    )
  }

  return <div className={classes['cards-list']}>{renderArticles()}</div>
}

export default CardList
