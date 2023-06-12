import React from 'react'
import PropTypes from 'prop-types'

import classes from './UiButton.module.scss'

function UiButton({ small, large, borderless, accent, onClickFunction, children }) {
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

UiButton.defaultProps = {
  small: false,
  large: false,
  borderless: false,
  accent: false,
  onClickFunction() {},
}

UiButton.propTypes = {
  small: PropTypes.bool,
  large: PropTypes.bool,
  borderless: PropTypes.bool,
  accent: PropTypes.bool,
  onClickFunction: PropTypes.func,
}

export default UiButton
