const API_BASE = 'https://blog.kata.academy/api/'

async function getArticlesApi(page = 1) {
  const res = await fetch(`${API_BASE}/articles?limit=20&offset=${20 * page - 20}`)

  if (!res.ok) {
    throw new Error(`Could not fetch ${API_BASE}/articles, received ${res.status}`)
  }
  const body = await res.json()
  return body
}

export default getArticlesApi
