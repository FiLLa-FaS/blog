import React from 'react'

import classes from './UiButton.module.scss'

function UiButton({ small, large, borderless, accent, onClickFunction = () => {}, children }) {
  return (
    <button
      type="button"
      className={`
      ${classes.button} 
      ${borderless && classes['button--type--borderless']} 
      ${large && classes['button--size--large']}
      ${small && classes['button--size--small']}
      ${accent && classes['button--type--accent']}`}
      onClick={() => onClickFunction()}
    >
      {children}
    </button>
  )
}

export default UiButton
