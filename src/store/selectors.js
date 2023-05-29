export const articlesArr = (state) => state.articles.articles
export const articlesError = (state) => state.articles.hasError
export const articlesStatus = (state) => state.articles.status
export const articlesFullArticle = (state) => state.articles.fullArticle
export const articlesCurrentPage = (state) => state.articles.page
export const articlesPages = (state) => state.articles.articlesCount

export const authorizationUser = (state) => state.authorization.user
export const authorizationToken = (state) => state.authorization.token
export const authorizationStatus = (state) => state.authorization.status
export const authorizationErrors = (state) => state.authorization.errors
export const authorizationIsLoggedIn = (state) => state.authorization.isLoggedIn
