import React, { useState } from 'react'

import classes from './Image.module.scss'

function Image({ url, placeholder }) {
  const [hasError, setHasError] = useState(false)

  const onImageError = () => {
    setHasError(true)
  }

  const onImageLoaded = () => {
    setHasError(false)
  }

  return (
    <>
      <img
        className={classes.image}
        src={url}
        alt="аватар пользователя"
        onError={onImageError}
        onLoad={onImageLoaded}
        style={hasError ? { display: 'none' } : { display: 'block' }}
      />
      {hasError && <img className={classes.image} src={placeholder} alt="постер фильма" />}
    </>
  )
}

export default Image
