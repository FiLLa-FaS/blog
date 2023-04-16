import React from 'react'

import classes from './UiButton.module.scss'

function UiButton({ large, borderless, accent, children }) {
  return (
    <button
      type="button"
      className={`
      ${classes.button} 
      ${borderless && classes['button--type--borderless']} 
      ${large && classes['button--size--large']}
      ${accent && classes['button--type--accent']}`}
    >
      {children}
    </button>
  )
}

export default UiButton
