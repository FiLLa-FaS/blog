const API_BASE = 'https://blog.kata.academy/api/'

export async function getArticlesApi(page = 1, token = '') {
  const res = await fetch(`${API_BASE}articles?limit=20&offset=${20 * page - 20}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${token}` },
  })

  if (!res.ok) {
    throw new Error(`Could not fetch ${API_BASE}articles, received ${res.status}`)
  }
  const body = await res.json()
  return body
}

export async function createArticleApi(articleData, token) {
  const res = await fetch(`${API_BASE}articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${token}` },
    body: JSON.stringify(articleData),
  })

  if (!res.ok) {
    throw new Error(`Could not create article, received ${res.status}`)
  }
  const body = await res.json()
  return body
}

export async function updateArticleApi(articleData, slug, token) {
  const res = await fetch(`${API_BASE}articles/${slug}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${token}` },
    body: JSON.stringify(articleData),
  })

  if (!res.ok) {
    throw new Error(`Could not update article, received ${res.status}`)
  }
  const body = await res.json()
  return body
}

export async function deleteArticleApi(slug, token) {
  const res = await fetch(`${API_BASE}articles/${slug}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${token}` },
  })

  if (!res.ok) {
    throw new Error(`Could not delete article, received ${res.status}`)
  }
  return true
}

export async function favoriteArticleApi(slug, token) {
  const res = await fetch(`${API_BASE}articles/${slug}/favorite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${token}` },
  })

  if (!res.ok) {
    throw new Error(`Could not favorite article, received ${res.status}`)
  }
  const body = await res.json()
  return body
}

export async function unfavoriteArticleApi(slug, token) {
  const res = await fetch(`${API_BASE}articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${token}` },
  })

  if (!res.ok) {
    throw new Error(`Could not unfavorite article, received ${res.status}`)
  }
  const body = await res.json()
  return body
}

export async function signUpApi(user) {
  const res = await fetch(`${API_BASE}users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(user),
  })

  if (!res.ok) {
    const errors = await res.json()
    return errors
  }
  const body = await res.json()
  return body
}

export async function signInApi(user) {
  const res = await fetch(`${API_BASE}users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(user),
  })

  if (!res.ok) {
    const errors = await res.json()
    return errors
  }
  const body = await res.json()
  return body
}

export async function getUserApi(token) {
  const res = await fetch(`${API_BASE}user`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Could not fetch ${API_BASE}/user, received ${res.status}`)
  }
  const body = await res.json()
  return body
}

export async function editUserDataApi(userData, token) {
  const res = await fetch(`${API_BASE}user`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${token}` },
    body: JSON.stringify(userData),
  })

  if (!res.ok) {
    const errors = await res.json()
    return errors
  }

  const body = await res.json()
  return body
}
