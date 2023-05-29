import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from './articlesSlice'
import authorizationReducer from './authorizationSlice'

export default configureStore({
  reducer: {
    articles: articlesReducer,
    authorization: authorizationReducer,
  },
})
