import React from 'react'
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { setPage } from '../../store/articlesSlice'
import { articlesCurrentPage, articlesPages } from '../../store/selectors'

import classes from './CustomPagination.module.scss'

function CustomPagination() {
  const dispatch = useDispatch()
  const currentPage = useSelector(articlesCurrentPage)
  const pages = useSelector(articlesPages)

  const onPaginationChange = (page) => {
    dispatch(setPage(page))
  }

  return (
    <Pagination
      className={classes.pagination}
      defaultCurrent={1}
      defaultPageSize={20}
      total={pages}
      onChange={onPaginationChange}
      current={currentPage}
      showSizeChanger={false}
    />
  )
}

export default CustomPagination
